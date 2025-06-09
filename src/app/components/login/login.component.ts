import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {users} from '../../../data/data.json';


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

    const user = users.find((u: any) =>
      u.email.toLowerCase() === formValues.email.toLowerCase() &&
      u.password === formValues.password
    );

    if (user) {
      alert('Login successful!');
      this.errorMessage = '';
      const currentUser = {
        id: user.id,
        role_id: user.role_id,
        name: user.name
      };

      localStorage.setItem('current_user', JSON.stringify(currentUser));
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }

}
