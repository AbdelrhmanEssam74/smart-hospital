import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import {
  DoctorPatientRelation,
  PatientNew,
} from '../../../../interfaces/patient-new';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { PatientService } from '../../../../services/patient.service';
interface MedicalReport {
  id: number;
  title: string;
  file_path: string;
  report_date: string;
  image_url: string;
  description:string;
}
@Component({
  selector: 'app-patient-profiles',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass],
  templateUrl: './patient-profiles.component.html',
  styleUrl: './patient-profiles.component.css',
})
export class PatientProfilesComponent implements OnInit {
  patients: PatientNew[] = [];
  loading = true;

  // eport
  selectedPatient: any | null = null;
  patientReports: MedicalReport[] = [];
  showReportsModal = false;
  reportsLoading = false;
  reportError = '';

  // image
  previewImageUrl: string = '';
  showImagePreviewModal = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.loading = true;
    this.http
      .get<any>('http://127.0.0.1:8000/api/doctor/patients', {
        headers: this.auth.getAuthHeaders(),
      })
      .subscribe({
        next: (res) => {
          const rawPatients = (res.data || res).map(
            (rel: DoctorPatientRelation) => rel.patient
          );
          const uniquePatientsMap = new Map<number, any>();
          rawPatients.forEach((patient: { id: number }) => {
            if (!uniquePatientsMap.has(patient.id)) {
              uniquePatientsMap.set(patient.id, patient);
            }
          });
          this.patients = Array.from(uniquePatientsMap.values());
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching patients:', err);
          this.loading = false;
        },
      });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  // reports
  viewPatientReports(patient: PatientNew): void {
    this.selectedPatient = patient;
    this.reportsLoading = true;
    this.showReportsModal = true;
    this.reportError = '';

    this.patientService.getPatientReports(patient.id).subscribe({
      next: (reports: any) => {
        this.patientReports = reports.map((report: any) => ({
          ...report,
          image_url: `http://127.0.0.1:8000/storage/${report.file_path}`,
        }));
        this.reportsLoading = false;
      },
      error: (err) => {
        console.error('Error fetching reports:', err);
        this.reportError =
          err.error?.message || 'Failed to load patient reports';
        this.reportsLoading = false;
      },
    });
  }

  openImagePreview(imageUrl: string): void {
    this.previewImageUrl = imageUrl;
    this.showImagePreviewModal = true;
  }

  closeImagePreview(): void {
    this.showImagePreviewModal = false;
    this.previewImageUrl = '';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  closeReportsModal(): void {
    this.showReportsModal = false;
    this.selectedPatient = null;
    this.patientReports = [];
  }
}
