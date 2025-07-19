
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../services/admin/doctor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {
  doctors: any[] = [];
  selectedDoctor: any = null;
  searchName: string = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors(this.searchName).subscribe((data) => {
      this.doctors = data;
    });
  }

  onSearch(): void {
    this.loadDoctors();
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe(() => {
        this.loadDoctors();
      });
    }
  }

  selectDoctor(doctor: any): void {
    this.selectedDoctor = doctor;
  }
}
