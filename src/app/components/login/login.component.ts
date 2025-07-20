import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
 loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.auth.getProfile().subscribe({
          next: (profile) => {
            this.auth.saveUser(profile);

            // check if role is doctor - Abdelrhman
            if(profile.data.role.id === 2){
              this.router.navigate(['/doctor']);
            }else if(profile.data.role.id === 1){
              this.router.navigate(['/admin']);
            }else if(profile.data.role.id === 5){
              this.auth.saveUser(profile);
              this.router.navigate(['/home']);
            }
          },
          error: () => {
            this.errorMessage = 'Failed to load user data'

;
          },
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      },
    });
  }
}
