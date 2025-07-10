import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
 editForm: FormGroup;
  currentUser: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // this.currentUser = this.authService.getCurrentUser();
    
    this.editForm = this.fb.group({
      firstName: [this.currentUser?.firstName || '', Validators.required],
      lastName: [this.currentUser?.lastName || '', Validators.required],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      phone: [this.currentUser?.phone || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    const updatedUser = {
      ...this.currentUser,
      ...this.editForm.value
    };

    const usersString = localStorage.getItem('current_user');
    let users = usersString ? JSON.parse(usersString) : [];
    
    users = users.map((user: any) => 
      user.id === this.currentUser.id ? updatedUser : user
    );
    
    localStorage.setItem('auth_users', JSON.stringify(users));
    localStorage.setItem('auth_currentUser', JSON.stringify(updatedUser));
    
    this.successMessage = 'Profile updated successfully!';
    this.errorMessage = '';
  }
}
