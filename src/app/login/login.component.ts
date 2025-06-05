import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formValues = this.loginForm.value;
    const storedUsersString = localStorage.getItem('auth_users');

    console.log('Stored users string:', storedUsersString);

    if (!storedUsersString) {
      this.errorMessage = 'No user found! Please register first.';
      return;
    }

    const users = JSON.parse(storedUsersString);
    const user = users.find((u: any) =>
      u.email.toLowerCase() === formValues.email.toLowerCase() &&
      u.password === formValues.password
    );

    if (user) {
      alert('Login successful!');
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
