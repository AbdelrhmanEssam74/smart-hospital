import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DoctorComponent } from '../doctor/doctor.component';

@Component({
  selector: 'app-list-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorComponent],
  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.css'
})
export class ListDoctorComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  paginatedDoctors: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  searchTerm: string = '';
  searchForm: FormGroup;

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      specialty: ['']
    });
  }

  ngOnInit(): void {
    this.doctors = this.doctorService.getDoctorDisplayList();
    this.filteredDoctors = [...this.doctors];
    this.updatePagination();
  }

  filterDoctors() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor => {
      const name = doctor.name?.toLowerCase() || '';
      const specialization = doctor.specialty?.toLowerCase() || '';
      return name.includes(term) || specialization.includes(term);
    });

    this.currentPage = 1; // نرجع لأول صفحة بعد الفلترة
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDoctors = this.filteredDoctors.slice(start, end);
    this.totalPages = Math.ceil(this.filteredDoctors.length / this.itemsPerPage);
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
