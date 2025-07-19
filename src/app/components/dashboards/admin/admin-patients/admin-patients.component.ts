import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../../services/admin/patients.service';

@Component({
  selector: 'app-admin-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {
  patients: any[] = [];
  searchName: string = '';
  loading: boolean = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;

    this.patientService.getPatients(this.searchName).subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading patients:', err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.loadPatients();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
    deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe(() => {
        this.loadPatients();
      });
    }
  }
}
