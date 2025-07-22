import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  ValidatorFn,
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
  isAdmin = true;
  isPatient = false;
  selectedImage: File | null = null;
  selectedLicenseFile: File | null = null;

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
        phone: [
          '',
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        role_id: [1, Validators.required],

        // patient fields
        address: [''],
        gender: [''],
        date_of_birth: [''],
        profile_description: [''],

        // doctor fields
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
      this.isAdmin = roleId == 1;
      this.isPatient = roleId == 5;

      this.updateDoctorValidators();
      this.updatePatientValidators();
    });
  }

  updateDoctorValidators() {
    if (this.isDoctor) {
      this.f['specialty_id'].setValidators([Validators.required]);
      this.f['years_of_experience'].setValidators([
        Validators.required,
        Validators.min(0),
      ]);
      this.f['appointment_fee'].setValidators([
        Validators.required,
        Validators.min(0),
      ]);
    } else {
      this.f['specialty_id'].clearValidators();
      this.f['years_of_experience'].clearValidators();
      this.f['appointment_fee'].clearValidators();
    }

    this.f['specialty_id'].updateValueAndValidity();
    this.f['years_of_experience'].updateValueAndValidity();
    this.f['appointment_fee'].updateValueAndValidity();
  }

  updatePatientValidators() {
    if (this.isPatient) {
      this.f['address'].setValidators([Validators.required]);
      this.f['gender'].setValidators([
        Validators.required,
        Validators.pattern(/^(Male|Female)$/i),
      ]);
      this.f['date_of_birth'].setValidators([this.dateNotInFutureValidator()]);
    } else {
      this.f['address'].clearValidators();
      this.f['gender'].clearValidators();
      this.f['date_of_birth'].clearValidators();
    }

    this.f['address'].updateValueAndValidity();
    this.f['gender'].updateValueAndValidity();
    this.f['date_of_birth'].updateValueAndValidity();
  }

  loadSpecialties() {
    this.auth.getSpecialties().subscribe({
      next: (res) => {
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

  passwordMatchValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  dateNotInFutureValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      return inputDate > today ? { futureDate: true } : null;
    };
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('email', this.f['email'].value);
    formData.append('password', this.f['password'].value);
    formData.append('password_confirmation', this.f['confirmPassword'].value);
    formData.append('phone', this.f['phone'].value);
    formData.append('role_id', String(this.f['role_id'].value));

    // Patient fields
    formData.append(
      'profile_description',
      this.f['profile_description'].value || ''
    );
    formData.append('date_of_birth', this.f['date_of_birth'].value || '');
    formData.append('gender', this.f['gender'].value || '');
    formData.append('address', this.f['address'].value || '');

    // Doctor fields
    if (this.isDoctor) {
      formData.append('specialty_id', this.f['specialty_id'].value || '');
      formData.append(
        'years_of_experience',
        this.f['years_of_experience'].value || ''
      );
      formData.append('appointment_fee', this.f['appointment_fee'].value || '');
      if (this.selectedLicenseFile) {
        formData.append('license_file', this.selectedLicenseFile);
      }
    }

    this.userService.createUser(formData).subscribe({
      next: () => {
        this.userForm.reset();
        this.isDoctor = false;
        this.isAdmin = true;
        this.isPatient = false;
        this.selectedImage = null;
        this.selectedLicenseFile = null;
        this.isSubmitting = false;
        this.router.navigate(['/admin/admin-home']);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 422 && err.error?.errors) {
          Object.keys(err.error.errors).forEach((key) => {
            const control = this.userForm.get(key);
            if (control) {
              control.setErrors({ serverError: err.error.errors[key][0] });
            }
          });
        } else {
          console.error('Unknown error:', err);
        }
      },
    });
  }

  onLicenseFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedLicenseFile = file;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}
