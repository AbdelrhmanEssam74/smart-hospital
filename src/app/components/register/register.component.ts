import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  roles = ['doctor', 'patient', 'user', 'admin'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;

    const usersString = localStorage.getItem('auth_users');
const users: User[] = usersString ? JSON.parse(usersString) : [];

const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;

const user: User = {
  id: newId,
  firstName: formValue.firstName,
  lastName: formValue.lastName,
  email: formValue.email.toLowerCase(),
  password: formValue.password,
  phone: formValue.phone,
  role: formValue.role
};

    const registered = this.authService.register(user);

    if (registered) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Email already registered';
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
