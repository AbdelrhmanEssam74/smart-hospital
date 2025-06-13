import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { users } from '../../../data/data.json';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
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

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
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
      const currentUser = {
        id: user.id,
        role_id: user.role_id,
        name: user.name
      };

      localStorage.setItem('auth_currentUser', JSON.stringify(user));
      localStorage.setItem('current_user', JSON.stringify(currentUser));

      if (user.role_id === 2) {
        this.router.navigateByUrl('/doctor');
      } else if (user.role_id === 5) {
        this.router.navigateByUrl('/patient_profile');
      }

      this.notificationService.success("Form submitted successfully!");
      this.errorMessage = '';

      // You can optionally keep or remove this if router.navigateByUrl is used
      // window.location.href = "/";
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
