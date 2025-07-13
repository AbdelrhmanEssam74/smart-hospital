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
  imagePreview: SafeUrl | string = '';

  constructor(private fb: FormBuilder, 
        private patientService: PatientService,
 private router: Router,
    private sanitizer: DomSanitizer
) {

    this.editForm = this.fb.group({
      name: [this.currentUser?.firstName || '', Validators.required],
      email: [this.currentUser?.email || '',[Validators.required, Validators.email],],
      phone: [this.currentUser?.phone || '', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: [''],
      address: ['', [Validators.maxLength(255)]],
      image: [null]

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
        this.isLoading = false;
      }
    });
  }

  // 

   onFileSelected(event: any) {
    const file = event.target?.files?.[0] || event.addedFiles?.[0];
    if (file) {
      if (file.size > 2097152) {
        this.errorMessage = 'File size should be less than 2MB';
        return;
      }

      this.selectedImage = file;
      this.errorMessage = '';
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      this.editForm.patchValue({ image: file });
      this.editForm.get('image')?.updateValueAndValidity();
    }
  }

  onRemoveImage() {
    this.selectedImage = null;
    this.imagePreview = this.currentUser?.image || 'assets/images/default-profile.png';
    this.editForm.patchValue({ image: null });
  }

 
}
