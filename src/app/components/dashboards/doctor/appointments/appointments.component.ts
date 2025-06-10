import { Component, OnInit } from '@angular/core';
import appointments from '../../../../../data/data.json';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  imports: [FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  currentDoctorId: number = 0;

  ngOnInit() {
    const storedId = localStorage.getItem('doctor_id');
    this.currentDoctorId = storedId ? +storedId : 0;

this.appointments = appointments.appointments;

    this.filteredAppointments = this.appointments.filter(
      appt => appt.doctor_id === this.currentDoctorId
    );
  }
}
