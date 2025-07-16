import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { DoctorNew } from '../../../../interfaces/doctor-new';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileDoctor: DoctorNew = {
    user_id: 0,
    specialty_id: 0,
    appointment_fee:'',
    experience_years: 0,
    specialty: {
      id: 0,
      name: ''
    },
    user: {
      id: 0,
      role_id: 0,
      name: '',
      email: null,
      phone: null,
      image: null,
      profile_description: null,
      role: {
        id: 0,
        name: '',
        created_at: null,
        updated_at: null
      }
    }
  };

  profileImage: string | ArrayBuffer | null = null;
  isSaving = false;
  maxFileSize = 2 * 1024 * 1024; // 2MB
  selectedFile: File | null = null;
  APIUrl = 'http://127.0.0.1:8000/api/doctor/';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

  loadDoctorProfile(): void {
    this.http.get<any>(this.APIUrl + 'profile', {
      headers: this.auth.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.profileDoctor = data.doctor;
        console.log(this.profileDoctor)
        if (this.profileDoctor.user?.image) {
          this.profileImage = this.profileDoctor.user.image;
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      if (this.selectedFile.size > this.maxFileSize) {
        alert('File size exceeds 2MB limit');
        return;
      }

      if (!this.selectedFile.type.match(/image\/*/)) {
        alert('Only image files are allowed');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.isSaving = true;

    const formData = new FormData();
    const safe = (value: any): string => value ?? '';


    formData.append('name', safe(this.profileDoctor.user.name));
    formData.append('email', safe(this.profileDoctor.user.email));
    formData.append('phone', safe(this.profileDoctor.user.phone));
    formData.append('appointment_fee', safe(this.profileDoctor.appointment_fee));
    formData.append('profile_description', safe(this.profileDoctor.user.profile_description));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put(this.APIUrl + 'profile/update', formData, {
      headers: this.auth.getAuthHeaders()
    }).subscribe({
      next: (res: any) => {
        this.isSaving = false;
        alert('Profile updated successfully!');
        this.router.navigate(['/doctor/profile']);
      },
      error: (err) => {
        this.isSaving = false;
        console.error(err);
        const errorMessages = err.error?.errors
          ? Object.values(err.error.errors).flat().join('\n')
          : err.error?.message || 'An error occurred';
        alert('Update failed:\n' + errorMessages);
      }
    });
  }


  cancel(): void {
    if (confirm('Are you sure you want to discard your changes?')) {
      this.router.navigate(['/doctor/profile']);
    }
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
