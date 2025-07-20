import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserControlService } from '../../../../services/admin/user-control.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-user',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css'
})
export class AdminAddUserComponent {
userForm: FormGroup;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Doctor' },
    { id: 5, name: 'Patient' }
  ];
  isSubmitting = false;
  userId:any|null = null;

constructor(
    private fb: FormBuilder,
    private userService: UserControlService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      role_id: ['', Validators.required],
      address: [''],
      gender: [''],
      date_of_birth: [''],
      profile_description: [''],
    },
        { validators: this.passwordMatchValidator }
);
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

  const userData = {
    name: this.f['name'].value,
    email: this.f['email'].value,
    password: this.f['password'].value,
    password_confirmation: this.f['confirmPassword'].value,
    phone: this.f['phone'].value,
    role_id: this.f['role_id'].value,
    profile_description: this.f['profile_description'].value,
    date_of_birth: this.f['date_of_birth'].value,
    gender: this.f['gender'].value,
    address: this.f['address'].value
  };

    this.userService.createUser(userData).subscribe({
    next: (res) => this.router.navigate(['/admin/admin-home']),
    error: (err) => {
      if (err.status === 422) {
        Object.keys(err.error.errors).forEach(key => {
          const control = this.userForm.get(key);
          if (control) {
            control.setErrors({ serverError: err.error.errors[key][0] });
          }
        });
      }
    }

  });
}
}
