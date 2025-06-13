import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../interfaces/appointment';
import {NgClass} from '@angular/common';
import {DoctorService} from '../../services/doctor.service';

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
  doctorMap: { [doctorId: string]: any } = {};

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
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
    this.appointments = this.appointmentService.getAppointmentsByUserId(userId);

    this.appointments.forEach(appt => {
      const doctorId = appt.doctor_id;
      const doctor = this.doctorService.getDoctorDisplayByUserId(+doctorId); // assume method returns one doctor
      if (doctor) {
        this.doctorMap[doctorId] = doctor;
      }
    });
  }
  deleteAppointment(appointment: Appointment) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointment);
      this.appointments = this.appointmentService.getAppointmentsByUserId(this.currentUser!.id.toString());
    }
  }


}
