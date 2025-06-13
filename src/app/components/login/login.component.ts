import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {users} from '../../../data/data.json';
// patient_profile
import { AuthService } from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
//  master


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
  

// patient_profile
  constructor(private fb: FormBuilder,
    private authServ: AuthService,
    private router: Router

  ) {
  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
//  master
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
// patient_profile
    if (user.role_id === 2) {
      console.log(user);
    this.router.navigateByUrl('/doctor');
    console.log(user.role_id);
} else if (user.role_id === 5) { 
    this.router.navigateByUrl('/patient_profile');
}
      alert('Login successful!');

      this.notificationService.success("Form submitted successfully!");
//  master
      this.errorMessage = '';
      const currentUser = {
        id: user.id,
        role_id: user.role_id,
        name: user.name
      };
// patient_profile

    localStorage.setItem('auth_currentUser', JSON.stringify(user));

      window.location.href = "/";
      localStorage.setItem('current_user', JSON.stringify(currentUser));
//  master
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }

}
