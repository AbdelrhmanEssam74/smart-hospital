import { Component } from '@angular/core';
import { DashboardService } from '../../../../services/admin/dashboard.service';
import { CommonModule, NgClass } from '@angular/common';

interface license {
  id: number;
  title: string;
  file_path: string;
  report_date: string;
  image_url: string;
  description:string;
}
@Component({
  selector: 'app-admin-mange-doctor',
  standalone:true,
  imports: [CommonModule, NgClass],
  templateUrl: './admin-mange-doctor.component.html',
  styleUrl: './admin-mange-doctor.component.css',
})
export class AdminMangeDoctorComponent {
  pendingDoctors: any[] = [];
  loading = true;

   // license
  licenseUrl: string | null = null;
  showLicenseModal = false;
  licenseLoading = false;
  licenseError = '';
  currentLicenseDoctor: any | null = null;
// image
previewImageUrl: string = '';
showImagePreviewModal = false;



  constructor(private adminService: DashboardService) {
    this.loadPendingDoctors();
  }

  loadPendingDoctors() {
    this.loading = true;
    this.adminService.getPendingDoctors().subscribe({
      next: (doctors) => {
        // console.log(doctors);
        this.pendingDoctors = doctors;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

approveDoctor(doctorId: number) {
    this.adminService.approveDoctor(doctorId).subscribe({
      next: () => {
        this.loadPendingDoctors();
      },
      error: (err) => console.error(err),
    });
  }
  rejectDoctor(doctorId: number, reason: string) {
    this.adminService.rejectDoctor(doctorId, reason).subscribe({
      next: () => {
        this.loadPendingDoctors();
      },
      error: (err) => console.error(err),
    });
  }

    // licence
  viewLicense(doctor: any): void {
    this.currentLicenseDoctor = doctor;
    this.licenseLoading = true;
    this.licenseError = '';
    this.licenseUrl = null;
    this.showLicenseModal = true;

    this.adminService.getDoctorLicence(doctor.id).subscribe({
      next: (response) => {
        // console.log(response);
        if (response) {
          this.licenseUrl = response.license_url;
        } else {
          this.licenseError = 'No license file found';
        }
        this.licenseLoading = false;  
      },
      error: (err) => {
        console.error('Error fetching license:', err);
      }
    });
  }

openImagePreview(imageUrl: string): void {
  this.previewImageUrl = imageUrl;
  this.showImagePreviewModal = true;
}

 

closeLicenseModal(): void {
  this.licenseUrl = null;
  this.currentLicenseDoctor = null;
  this.showLicenseModal = false;
  }
  
}
