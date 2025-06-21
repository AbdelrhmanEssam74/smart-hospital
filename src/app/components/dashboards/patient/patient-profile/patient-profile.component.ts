import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import appointments from '../../../../../data/data.json';

import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  // profileForm: FormGroup;
    appointments: any[] = [];

  currentUser: any;
  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  currentPatientId: number | null = null;
  showPopup: boolean = false;


  constructor(public authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
    ngOnInit() {
    const CurrentUser = localStorage.getItem('auth_currentUser');
    if (CurrentUser) {
      const userObj = JSON.parse(CurrentUser);
      if (userObj.role_id == 5) {
        this.currentPatientId = userObj.id;
        console.log("Current User:", userObj);
        console.log("Current Patient ID:", this.currentPatientId);
      } else {
        alert('You are not authorized to view appointments.');
        return;
      }
    } else {
      alert('patient information not found in localStorage.');
      return;
    }
        this.appointments = appointments.appointments;
        this.filteredAppointments = this.appointments.filter(
          appt => appt.patient_id === this.currentPatientId
        );
        console.log("All Appointments:", this.appointments);
        console.log("Filtered Appointments:", this.filteredAppointments);
        this.filteredAppointments.forEach(appt => {
          console.log(appt);
        });
  }
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
  // constructor( private fb: FormBuilder,
  //   public authService: AuthService,
  //   private router: Router){
  //   this.currentUser = this.authService.getCurrentUser();
  //   this.profileForm = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', Validators.required],
  //     password: ['', Validators.required]
  //   })
  // }



  // appointments: any[] = [ {
  //     id: 1,
  //     doctor: 'Dr. Sarah Johnson',
  //     specialty: 'Cardiology',
  //     date: '2023-06-15',
  //     time: '10:00 AM',
  //     status: 'Confirmed',
  //     photo: '/assets/images/doctors/doctor1.jpg'
  //   },
  //   {
  //     id: 2,
  //     doctor: 'Dr. Michael Chen',
  //     specialty: 'Neurology',
  //     date: '2023-06-20',
  //     time: '02:30 PM',
  //     status: 'Pending',
  //     photo: '/assets/images/doctors/doctor1.jpg'
  //   },
  //   {
  //     id: 3,
  //     doctor: 'Dr. Emily Wilson',
  //     specialty: 'Pediatrics',
  //     date: '2023-06-25',
  //     time: '11:15 AM',
  //     status: 'Completed',
  //     photo: '/assets/images/doctors/doctor1.jpg'
  //   }
  // ];

  // private getBookedAppointments(): Appointment[] {
  //   return [
  //     {
  //       id: 1,
  //       date: '2023-06-15 10:00',
  //       doctorName: 'Dr. Smith',
  //       reason: 'Annual Checkup',
  //       status: 'Confirmed'
  //     },
  //     {
  //       id: 2,
  //       date: '2023-07-01 14:30',
  //       doctorName: 'Dr. Johnson',
  //       reason: 'Follow-up',
  //       status: 'Pending'
  //     }
  //   ];
  // }
  // this.appointments = this.getBookedAppointments();




   logout(): void {
    this.authService.logout();
  }
  }
