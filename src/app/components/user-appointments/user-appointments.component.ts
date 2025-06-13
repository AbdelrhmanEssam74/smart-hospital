import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../interfaces/appointment';
import {NgClass} from '@angular/common';

export interface User {
  id: string;
  name: string;
  role_id: number;
}

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css'],
  imports: [
    NgClass
  ]
})


export class UserAppointmentsComponent implements OnInit {
  currentUser: User | null = null;
  user_id = '';
  appointments: Appointment [] = []

  constructor(
    private appointmentService: AppointmentService
  ) {
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('current_user');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    if (!this.currentUser || !this.currentUser.id) {
      window.location.href = "/";
      return;
    }
      const userId = this.currentUser.id.toString();
    this.appointments = this.appointmentService.getAppointmentsByUserId(userId)
    console.log("User Appointments:", this.appointments);
  }
}
