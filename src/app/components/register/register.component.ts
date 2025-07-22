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



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{11}$/)],
        ],
        role_id:[5],
        profile_description: [''] ,
         date_of_birth: [''],
        gender: [''],
        address: [''],
        // doctor
        specialty_id: [''],
        years_of_experience: [''],
        appointment_fee: [''],
       
      },
      { validators: this.passwordMatchValidator }
    );
    this.loadSpecialties();
    this.registerForm.get('role_id')?.valueChanges.subscribe(roleId => {
      this.isDoctor = roleId == 2;    
    });
  }
  loadSpecialties(){
    this.auth.getSpecialties().subscribe({
      next: (res) => {
        // console.log(res.specialties);
        this.specialties = res.specialties;
      },
      error: (err) => {
        console.error('Error loading specialties', err);
        this.errorMessage = 'Failed to load specialties. Please try again later.';
      }
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

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('email', this.f['email'].value);
    formData.append('password', this.f['password'].value);
    formData.append('password_confirmation', this.f['confirmPassword'].value);
    formData.append('phone', this.f['phone'].value);
    formData.append('role_id', this.f['role_id'].value);
    formData.append('profile_description', this.f['profile_description'].value || 'Patient');
    formData.append('date_of_birth', this.f['date_of_birth'].value);
    formData.append('gender', this.f['gender'].value);
    formData.append('address', this.f['address'].value);
    // check role
    if (this.isDoctor) {
      formData.append('specialty_id', this.f['specialty_id'].value);
      formData.append('years_of_experience', this.f['years_of_experience'].value);
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
        this.auth.saveToken(res.token);
        this.auth.saveUser(res.user);
        if (res.user.role_id === 5) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      },
    });
  }
}
