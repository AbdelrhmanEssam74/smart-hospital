import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import appointments from '../../../../../data/data.json';

import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../../services/patient.service';

interface Appointment {
  id: number;
  date: string;
  doctorName: string;
  reason: string;
  status: string;
}

@Component({
  selector: 'app-patient-profile',
imports: [
    RouterLink,
    RouterLinkActive, ReactiveFormsModule,
    NgClass],  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {
    appointments: any[] = [];

  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  currentPatientId: number | null = null;
  showPopup: boolean = false;
  // api
  patientData: any; 
 currentUser: any;
  isLoading = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private patientService: PatientService,
  ) {}

  ngOnInit() {
    this.loadPatientProfile();
  }

 loadPatientProfile() {
    this.patientService.getPatients().subscribe({
      next: (response) => {
        console.log('API Response:', response); 
        
        this.currentUser = response.User ;
        this.patientData = this.currentUser?.patient || response.patient;
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load patient profile';
        this.isLoading = false;
      }
    });
  }
  // 
  deleteAppointment(appointmentId: number): void {
  const confirmDelete = confirm(`Are you sure you want to delete appointment #${appointmentId}?`);
  if (confirmDelete) {
    this.filteredAppointments = this.filteredAppointments.filter(appt => appt.id !== appointmentId);
    alert(`Appointment #${appointmentId} has been deleted.`);
  }
}
viewAppointment(appointmentId: number): void {
  const appointment = this.filteredAppointments.find(appt => appt.id === appointmentId);
  if (appointment) {
    this.selectedAppointment = appointment;
    this.showPopup = true;
  }
}

closePopup(): void {
  this.showPopup = false;
  this.selectedAppointment = null;
}



  //  logout(): void {
  //   this.authService.logout();
  // }
  }
