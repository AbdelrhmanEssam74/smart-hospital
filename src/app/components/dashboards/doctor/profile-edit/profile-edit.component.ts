import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {Doctor} from '../../../../interfaces/doctor';
import {DoctorNew} from '../../../../interfaces/doctor-new';
// import { DoctorService } from '../../services/doctor.service';
// import { Specialty } from '../../models/specialty.model';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  // @ts-ignore
  profileDoctor :DoctorNew = []

  profileImage: string | ArrayBuffer | null = null;
  // specialties: Specialty[] = [];
  isSaving = false;
  maxFileSize = 2 * 1024 * 1024; // 2MB
  selectedFile: File | null = null;
  APIUrl = 'http://127.0.0.1:8000/api/doctor/';
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

  loadDoctorProfile(): void {
    this.http.get<any>(this.APIUrl + 'profile', {
      headers: this.auth.getAuthHeaders()
    }).subscribe(data => {
      this.profileDoctor = data.doctor;
      console.log(data)
    }, (error) => console.error('Error:', error))
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

  saveProfile(): void {
    this.isSaving = true;

    const formData = new FormData();

    //  User data
    formData.append('name', this.profileDoctor.user.name || '');
    formData.append('email', this.profileDoctor.user.email || '');
    formData.append('phone', this.profileDoctor.user.phone || '');
    formData.append('profile_description', this.profileDoctor.user.profile_description || '');

    //  Doctor data
    if (this.profileDoctor.specialty?.id != null) {
      formData.append('specialty_id', this.profileDoctor.specialty.id.toString());
    }

    if (this.profileDoctor.experience_years != null) {
      formData.append('experience_years', this.profileDoctor.experience_years.toString());
    }


    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put('http://127.0.0.1:8000/api/doctor/profile/update', formData, {
      headers: this.auth.getAuthHeaders()
    }).subscribe({
      next: (res: any) => {
        this.isSaving = false;
        alert('Profile updated successfully');
        this.router.navigate(['/doctor/profile']);
      },
      error: (err) => {
        this.isSaving = false;
        console.error(err);
        alert('Update failed: ' + (err.error?.message || 'Please check your inputs.'));
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
