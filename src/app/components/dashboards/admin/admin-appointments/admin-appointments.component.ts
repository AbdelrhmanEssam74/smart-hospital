import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../services/admin/appointment.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, HttpClientModule],
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.css']
})
export class AdminAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filters = {
    doctor_name: '',
    patient_name: '',
    status: '',
    doctor_id: '',
    patient_id: ''
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments(this.filters).subscribe(res => {
      this.appointments = res;
    });
  }

  onSearch(): void {
    this.loadAppointments();
  }

  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.loadAppointments();
      });
    }
  }

  updateStatus(id: number, status: string): void {
    if (confirm(`Are you sure you want to mark this as ${status}?`)) {
      this.appointmentService.updateAppointmentStatus(id, status).subscribe(() => {
        this.loadAppointments();
      });
    }
  }
}
