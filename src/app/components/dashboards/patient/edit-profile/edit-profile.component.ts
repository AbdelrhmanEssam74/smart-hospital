import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../../../services/patient.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  editForm: FormGroup;
  currentUser: any;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading = false;
selectedImage: File | null = null;
  isImageUploading = false;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
) {
    this.editForm = this.fb.group({
      name: [this.currentUser?.name || '', Validators.required],
      email: [this.currentUser?.email || '',[Validators.required, Validators.email],],
      phone: [this.currentUser?.phone || '', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: [''],
      address: ['', [Validators.maxLength(255)]],
    });
    this.loadCurrentProfile();
  }
loadCurrentProfile() {
    this.patientService.getPatients().subscribe({
      next: (response) => {
        const user = response.User || response.user;
        const patient = user.patient || response.patient;
        this.currentUser = user;
        this.imagePreview = user.image;

        this.editForm.patchValue({
          name: user.name,
          email: user.email,
          phone: patient.phone || user.phone,
          gender: patient.gender,
          date_of_birth: patient.date_of_birth,
          address: patient.address,
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile data';
      }
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.editForm.value;
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.patientService.updatePatientProfile(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Profile updated successfully!';
        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/patient_profile']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update profile';
        this.editForm.get('email')?.setErrors({ duplicate: true });

        this.isLoading = false;
      },
    });
  }

  //image

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
  this.patientService.updateProfileImage(this.selectedImage).subscribe({
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
    this.editForm.patchValue({ image: null });
  }
}
