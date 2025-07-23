import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { DoctorNew } from '../../../../interfaces/doctor-new';
import {NotificationService} from '../../../../services/notification.service';
import {FormBuilder , FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
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

  originalData: any = {};
  updatedData: any = {};
  isChanged = false;


  profileImage: string | ArrayBuffer | null = null;
  isSaving = false;
  maxFileSize = 2 * 1024 * 1024; // 2MB
  selectedFile: File | null = null;

  APIUrl = 'http://127.0.0.1:8000/api/doctor/';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private notify :NotificationService,
    private formBuilder: FormBuilder
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
        this.originalData = JSON.parse(JSON.stringify(this.profileDoctor));
        if (this.profileDoctor.user?.image) {
          this.profileImage = this.profileDoctor.user.image;
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  onFieldChange(): void {
    const current = JSON.stringify(this.profileDoctor);
    const original = JSON.stringify(this.originalData);
    this.isChanged = current !== original;

    if (this.isChanged) {
      this.updatedData = {
        name: this.profileDoctor.user.name,
        email: this.profileDoctor.user.email,
        phone: this.profileDoctor.user.phone,
        appointment_fee: this.profileDoctor.appointment_fee,
        profile_description: this.profileDoctor.user.profile_description,
        image: this.updatedData?.user?.image || this.profileDoctor.user.image
      };
    }
  }

  profileForm(): void {
    if (!this.isChanged) return;

    this.isSaving = true;

    this.http.put(this.APIUrl + 'profile/update', this.updatedData, {
      headers: this.auth.getAuthHeaders()
    }).subscribe({
      next: (res: any) => {
        this.isSaving = false;
        this.isChanged = false;
        this.originalData = JSON.parse(JSON.stringify(this.profileDoctor));
        console.log(res)
        this.notify.success(res.message);
      },
      error: (err) => {
        this.isSaving = false;
        const errorMessages = err.error?.errors
          ? Object.values(err.error.errors).flat().join('\n')
          : err.error?.message || 'An error occurred';
        alert('Update failed:\n' + errorMessages);
      }
    });
  }


  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > this.maxFileSize) {
        this.notify.warning('File size exceeds 2MB limit');
        return;
      }

      if (!file.type.match(/image\/*/)) {
        this.notify.warning('Only image files are allowed');
        return;
      }

      this.selectedFile = file;

      const formData = new FormData();
      formData.append('image', this.selectedFile); // must match Laravel's input name

      this.http.post<any>(this.APIUrl + 'image/update', formData, {
        headers: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      }).subscribe({
        next: (res) => {
          console.log(res)
          const uploadedPath = res.path;
          this.profileDoctor.user.image = uploadedPath;
          if (!this.updatedData.user) {
            this.updatedData.user = {};
          }
          this.updatedData.user.image = uploadedPath;

          this.notify.success('Image uploaded successfully.');
          // reload the page
          this.loadDoctorProfile();
          const reader = new FileReader();
          reader.onload = () => {
            this.profileImage = reader.result;
          };
          reader.readAsDataURL(file);
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          this.notify.error('Image upload failed.');
        }
      });
    }
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
