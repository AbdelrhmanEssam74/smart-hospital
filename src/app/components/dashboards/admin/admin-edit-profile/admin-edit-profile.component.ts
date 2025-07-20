import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../../../services/admin/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-profile',
standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-profile.component.html',
  styleUrl: './admin-edit-profile.component.css'
})
export class AdminEditProfileComponent {
  profileForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  currentProfile: any;
  showPasswordFields = false;
// image
 selectedImage: File | null = null;
  isImageUploading = false;
  imagePreview: string | ArrayBuffer | null = null;
  currentUser: any;

 
constructor(private adminApi: DashboardService,
  private router: Router,
  private fb: FormBuilder){
        this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      // address: [''],
      // gender: [''],
      // date_of_birth: [''],
      profile_description: [''],
      current_password: [''],
      new_password: [''],
      new_password_confirmation: ['']
      },
      {validator: this.passwordMatchValidator });
  }

 ngOnInit(): void {
    this.loadProfile();
  }

  passwordMatchValidator(form: FormGroup) {
  const newPassword = form.get('new_password')?.value;
  const confirmPassword = form.get('new_password_confirmation')?.value;
  if (newPassword || confirmPassword) {
      return newPassword === confirmPassword ? null : { mismatch: true };
    }
    return null;
  }

  loadProfile(): void {
    this.isLoading = true;
    this.adminApi.getAdminProfile().subscribe({
      next: (response) => {
        this.imagePreview = response.image;
        this.currentUser = response;
        this.profileForm.patchValue(response);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load profile';
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.profileForm.get('current_password')?.reset();
      this.profileForm.get('new_password')?.reset();
      this.profileForm.get('new_password_confirmation')?.reset();
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = {
    ...this.profileForm.value,
  };
  if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

  
    this.adminApi.updateAdminProfile(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin/admin-home']);
        }, 1000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update profile';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
// image

  onImageSelected(event: Event): void {   
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedImage = input.files[0];
    // show 
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}

  uploadImage(): void {
  if (!this.selectedImage) return;
  
  this.isImageUploading = true;
  this.adminApi.updateProfileImage(this.selectedImage).subscribe({
    next: (response: any) => {
      this.isImageUploading = false;
      if (response.success) {
        this.currentUser.image = response.path;
        this.imagePreview = response.path;
        this.successMessage = 'Image updated successfully!';
        this.selectedImage = null;
        
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      }
    },
    error: (err) => {
      this.isImageUploading = false;
      this.errorMessage = err.error?.message || 'Failed to update image';
    }
  });
}

  onRemoveImage() {
    this.selectedImage = null;
    this.imagePreview = this.currentUser?.image;
    this.profileForm.patchValue({ image: null });
  }
}
