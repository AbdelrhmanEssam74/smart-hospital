import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

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

  localStorage.setItem('current_user_name', user.firstName);
  localStorage.setItem('current_user_role', user.role);
  localStorage.setItem('current_user_id', user.id.toString()); 

  localStorage.setItem('current_user', JSON.stringify(user));
} else {
  this.errorMessage = 'Invalid email or password!';
}




  }}
