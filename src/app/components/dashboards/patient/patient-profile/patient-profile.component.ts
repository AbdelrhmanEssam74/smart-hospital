import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  isEditing = false;
  currentUser: any;

  constructor(public authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
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



  appointments: any[] = [ {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'Confirmed',
      photo: '/assets/images/doctors/doctor1.jpg'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: '2023-06-20',
      time: '02:30 PM',
      status: 'Pending',
      photo: '/assets/images/doctors/doctor1.jpg'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Wilson',
      specialty: 'Pediatrics',
      date: '2023-06-25',
      time: '11:15 AM',
      status: 'Completed',
      photo: '/assets/images/doctors/doctor1.jpg'
    }
  ];
   
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

  logout(): void {
    this.authService.logout();
  }
  }

