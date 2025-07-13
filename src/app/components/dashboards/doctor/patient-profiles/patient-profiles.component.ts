import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import {DoctorPatientRelation, PatientNew} from '../../../../interfaces/patient-new';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-patient-profiles',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './patient-profiles.component.html',
  styleUrl: './patient-profiles.component.css'
})
export class PatientProfilesComponent implements OnInit {
  patients: PatientNew[] = [];
  loading = true;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }
  fetchPatients(): void {
    this.loading = true;
    this.http.get<any>('http://127.0.0.1:8000/api/doctor/patients', {
      headers: this.auth.getAuthHeaders()
    }).subscribe({
      next: (res) => {
        const rawPatients = (res.data || res).map((rel: DoctorPatientRelation) => rel.patient);
        const uniquePatientsMap = new Map<number, any>();
        rawPatients.forEach((patient: { id: number; }) => {
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
      }
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
