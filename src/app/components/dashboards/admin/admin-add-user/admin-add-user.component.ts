import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserControlService } from '../../../../services/admin/user-control.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css',
})
export class AdminAddUserComponent {
  userForm: FormGroup;

  specialties: any[] = [];
  isSubmitting = false;
  isDoctor = false;
  selectedImage: File | null = null;
  selectedLicenseFile: File | null = null;
  userId: any | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserControlService,
    private router: Router,
    private auth: AuthService
  ) {
    this.userForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
        role_id: [5],
        address: [''],
        gender: [''],
        date_of_birth: ['', [this.dateOfBirthValidator.bind(this)]],
        profile_description: [''],
        // doctor records
        specialty_id: [''],
        license_number: [''],
        years_of_experience: [''],
        appointment_fee: [''],
      },
      { validators: this.passwordMatchValidator }
    );

    this.loadSpecialties();
    this.userForm.get('role_id')?.valueChanges.subscribe((roleId) => {
      this.isDoctor = roleId == 2;
    });
  }

  loadSpecialties() {
    this.auth.getSpecialties().subscribe({
      next: (res) => {
        // console.log(res.specialties);
        this.specialties = res.specialties;
      },
      error: (err) => {
        console.error('Error loading specialties', err);
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('email', this.f['email'].value);
    formData.append('password', this.f['password'].value);
    formData.append('password_confirmation', this.f['confirmPassword'].value);
    formData.append('phone', this.f['phone'].value);
    formData.append('role_id', this.f['role_id'].value);
    formData.append(
      'profile_description',
      this.f['profile_description'].value || 'Patient'
    );
    formData.append('date_of_birth', this.f['date_of_birth'].value);
    formData.append('gender', this.f['gender'].value);
    formData.append('address', this.f['address'].value);
    // check role
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

    this.userService.createUser(formData).subscribe({
      next: (res) => this.router.navigate(['/admin/admin-home']),
      error: (err) => {
        if (err.status === 422) {
          Object.keys(err.error.errors).forEach((key) => {
            const control = this.userForm.get(key);
            if (control) {
              control.setErrors({ serverError: err.error.errors[key][0] });
            }
          });
        }
      },
    });
  }
  // valid date
  dateOfBirthValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { futureDate: true };
    }
    return null;
  }

  onLicenseFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedLicenseFile = file;
    }
  }
}
