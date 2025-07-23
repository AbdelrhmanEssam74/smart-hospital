import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../services/admin/doctor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification.service';
@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  selectedDoctor: any = null;
  searchName: string = '';
  statusFilter: string = '';
  specialtyFilter: string = '';
  specialties: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  constructor(private doctorService: DoctorService, private notify:NotificationService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.filterDoctors();
        this.calculateTotalPages();
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
        // Handle error (show toast/message)
      }
    });
  }

  loadSpecialties(): void {
    // this.doctorService.getSpecialties().subscribe({
    //   next: (data) => {
    //     this.specialties = data;
    //   },
    //   error: (err) => {
    //     console.error('Error loading specialties:', err);
    //   }
    // });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterDoctors();
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const nameMatch = doctor.user?.name?.toLowerCase().includes(this.searchName.toLowerCase());
      const emailMatch = doctor.user?.email?.toLowerCase().includes(this.searchName.toLowerCase());
      const specialtyMatch = doctor.specialty?.toLowerCase().includes(this.searchName.toLowerCase());
      const statusMatch = this.statusFilter ? doctor.status === this.statusFilter : true;
      const doctorSpecialtyMatch = this.specialtyFilter ? doctor.specialty === this.specialtyFilter : true;

      return (nameMatch || emailMatch || specialtyMatch) && statusMatch && doctorSpecialtyMatch;
    });

    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredDoctors.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPaginatedDoctors(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDoctors.slice(startIndex, startIndex + this.itemsPerPage);
  }

  approveDoctor(doctorId: number): void {
    if (confirm('Are you sure you want to approve this doctor?')) {
      this.doctorService.updateDoctorStatus(doctorId, 'accepted').subscribe({
        next: (e) => {
          this.loadDoctors();
          this.notify.success('Doctor approved successfully!');
        },
        error: (err) => {
          this.notify.error('Failed to approve doctor. Please try again.');
        }
      });
    }
  }

  rejectDoctor(doctorId: number): void {
    if (confirm('Are you sure you want to reject this doctor?')) {
      this.doctorService.updateDoctorStatus(doctorId, 'rejected').subscribe({
        next: () => {
          this.loadDoctors();
          this.notify.success('Doctor rejected successfully!');
        },
        error: (err) => {
          this.notify.error('Failed to reject doctor. Please try again.');
          console.error('Error rejecting doctor:', err);
        }
      });
    }
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.loadDoctors();
          // Show success toast/notification
        },
        error: (err) => {
          console.error('Error deleting doctor:', err);
          // Show error toast/notification
        }
      });
    }
  }

  editDoctor(doctor: any): void {
    this.selectedDoctor = doctor;
    // Open edit modal
    // this.editModal.show();
  }

  viewDoctorDetails(doctor: any): void {
    this.selectedDoctor = doctor;
    // Open details modal
    // this.detailsModal.show();
  }

  selectDoctor(doctor: any): void {
    this.selectedDoctor = doctor;
  }

  openAddDoctorModal(): void {
    // Reset selected doctor and open add modal
    this.selectedDoctor = null;
    // this.addModal.show();
  }

  resetFilters(): void {
    this.searchName = '';
    this.statusFilter = '';
    this.specialtyFilter = '';
    this.currentPage = 1;
    this.filterDoctors();
  }
}
