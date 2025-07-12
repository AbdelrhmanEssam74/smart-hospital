import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DoctorComponent } from '../doctor/doctor.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorComponent],
  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.css',
})
export class ListDoctorComponent implements OnInit {
  filteredDoctors: any[] = [];
  paginatedDoctors: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  searchTerm: string = '';

  doctors: any[] = [];

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filteredDoctors = [...this.doctors];

    this.updatePagination();
    // all doctors api
    this.loadAllDoctors();
  }

  loadAllDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        // console.log(doctors);
        this.doctors = doctors;
        this.filteredDoctors = [...this.doctors];
        this.updatePagination();
      },
    });
  }
// manage search 
filterDoctors(): void {
  const searchTerm = this.searchTerm.trim();
  if (!searchTerm) {
    this.filteredDoctors = [...this.doctors];
    this.updatePagination();
    return;
  }
  this.doctorService.searchDoctors(searchTerm).subscribe({
    next: (doctors) => {
      this.filteredDoctors = doctors;
      this.currentPage = 1;
      this.updatePagination();
    }
  });
}
// 
  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDoctors = this.filteredDoctors.slice(start, end);
    this.totalPages = Math.ceil(
      this.filteredDoctors.length / this.itemsPerPage
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredDoctors = [...this.doctors];
    this.currentPage = 1;
    this.updatePagination();
  }
}
