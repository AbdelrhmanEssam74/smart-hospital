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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string | null = null;
  isLoading: boolean = false; // Added loading state

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.successMessage = navigation?.extras.state?.['message'] || null;
    // Clear the message after displaying it
    if (this.successMessage) {
      setTimeout(() => this.successMessage = null, 5000);
    }
  }

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

    this.isLoading = true; // Show loading spinner
    this.errorMessage = ''; // Clear previous errors

    this.auth.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.auth.getProfile().subscribe({
          next: (profile) => {
            this.auth.saveUser(profile);
            this.isLoading = false; // Hide loading spinner
            
            // check if role is doctor
            if (profile.data.role.id === 2) {
              this.router.navigate(['/doctor']);
            } else if (profile.data.role.id === 1) {
              this.router.navigate(['/admin']);
            } else if (profile.data.role.id === 5) {
              this.auth.saveUser(profile);
              this.router.navigate(['/home']);
            }
          },
          error: () => {
            this.isLoading = false; // Hide loading spinner
            this.errorMessage = 'Failed to load user data';
          },
        });
      },
      error: (error) => {
        this.isLoading = false; // Hide loading spinner
        console.error('Login failed', error.error.status_code);
        // if status code is 403, redirect to /doctor-status
        if (error.error.status_code === 403) {
          this.router.navigate(['/doctor-status']);
          return;
        }
        this.errorMessage = error.error.message || 'Login failed';
      },
    });
  }
}