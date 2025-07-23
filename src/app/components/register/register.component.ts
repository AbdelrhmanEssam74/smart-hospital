import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';
  selectedImage: File | null = null;
  selectedLicenseFile: File | null = null;
  isDoctor: boolean = false;
  specialties: any[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      role_id: ['', [Validators.required, Validators.pattern(/^(2|5)$/)]],
      date_of_birth: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
        (control: AbstractControl) => {
          const date = new Date(control.value);
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          if (age < 24 || age > 80) {
            return { invalidAge: true };
          }
          return null;
        },
      ]],
      gender: [''],
      address: [''],
      specialty_id: [''],
      years_of_experience: [''],
      appointment_fee: [''],
      license_file: [''],
    },
    { validators: this.passwordMatchValidator }
  );

  this.loadSpecialties();

  this.registerForm.get('role_id')?.valueChanges.subscribe((roleId) => {
    this.isDoctor = roleId == 2;

    const specialty = this.registerForm.get('specialty_id');
    const years = this.registerForm.get('years_of_experience');
    const fee = this.registerForm.get('appointment_fee');
    const license = this.registerForm.get('license_file');

    if (this.isDoctor) {
      specialty?.setValidators([Validators.required]);
      years?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(7),
        Validators.max(60),
      ]);
      fee?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]);
      license?.setValidators([
        Validators.pattern(/^(?!.*\s).+\.pdf$/),
      ]);
    } else {
      specialty?.clearValidators();
      years?.clearValidators();
      fee?.clearValidators();
      license?.clearValidators();
    }

    specialty?.updateValueAndValidity();
    years?.updateValueAndValidity();
    fee?.updateValueAndValidity();
    license?.updateValueAndValidity();
  });
}

  loadSpecialties() {
    this.auth.getSpecialties().subscribe({
      next: (res) => {
        this.specialties = res.specialties;
      },
      error: (err) => {
        console.error('Error loading specialties', err);
        this.errorMessage =
          'Failed to load specialties. Please try again later.';
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onLicenseFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedLicenseFile = file;
    }
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('email', this.f['email'].value);
    formData.append('password', this.f['password'].value);
    formData.append('password_confirmation', this.f['confirmPassword'].value);
    formData.append('phone', this.f['phone'].value);
    formData.append('role_id', this.f['role_id'].value);
    formData.append('date_of_birth', this.f['date_of_birth'].value);
    formData.append('gender', this.f['gender'].value);
    formData.append('address', this.f['address'].value);

    if (this.isDoctor) {
      formData.append('specialty_id', this.f['specialty_id'].value);
      formData.append(
        'years_of_experience',
        this.f['years_of_experience'].value
      );
      formData.append('appointment_fee', this.f['appointment_fee'].value);

      if (this.selectedLicenseFile) {
        formData.append('license_file', this.selectedLicenseFile);
      }
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.auth.register(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.auth.saveToken(res.token);
        this.auth.saveUserImage(res.user);
        // Check user role and redirect accordingly
        if (res.user.role_id === 2) {
          // Doctor role
          this.router.navigate(['/doctor-status'], {
            state: {
              message: 'Registration successful! Your account is under review.',
              user: res.user,
            },
          });
        } else {
          // Patient or other roles
          this.router.navigate(['/login'], {
            state: {
              message: 'Registration successful! Please login to continue.',
              success: true,
            },
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      },
    });
  }
}
