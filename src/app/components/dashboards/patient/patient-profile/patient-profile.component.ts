import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import { AuthService } from '../../../../services/auth.service';
import { PatientService } from '../../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../../../services/payment.service';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  showPopup: boolean = false;
  patientData: any;
  currentUser: any;
  isLoading = true;
  isAppointmentsLoading = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadPatientProfile();
  }

  loadPatientProfile(): void {
    this.patientService.getPatients().subscribe({
      next: (response: any) => {
        this.currentUser = response.User;
        this.patientData = this.currentUser?.patient || response.patient;
        this.isLoading = false;
        this.loadAppointments();
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load patient profile';
        this.isLoading = false;
        this.isAppointmentsLoading = false;
      },
    });
  }

  loadAppointments(): void {
    this.isAppointmentsLoading = true;
    this.appointmentService.getAppointmentsForCurrentPatient().subscribe({
      next: (response: any) => {
        const appointments = response.data;
        this.filteredAppointments = appointments.map((item: any) => ({
          id: item.appointment?.id,
          doctorname: item.doctor?.name,
          specialty: item.doctor?.specialization,
          appointment_fee: item.doctor?.appointment_fee,
          gender: item.patient?.gender,
          phone: item.patient?.phone,
          date: item.appointment?.appointment_date,
          startTime: item.appointment?.start_time,
          endTime: item.appointment?.end_time,
          notes: item.appointment?.notes,
          status: item.appointment?.status,
          payment_method: item.appointment?.payment_method,
          payment_status: item.appointment?.payment_status,
        }));
        this.isAppointmentsLoading = false;
      },
      error: (error: any) => {
        console.error('Failed to load appointments:', error);
        this.isAppointmentsLoading = false;
      },
    });
  }

  payWithPayPal(appointmentId: number): void {
    this.paymentService.payWithPayPal(appointmentId).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 'success' && res.url) {
          window.open(res.url, '_blank');
        } else {
          alert(res.message || 'Failed to initiate PayPal transaction.');
        }
      },
      error: (err: any) => {
        console.error('PayPal Error:', err);
        alert('Error occurred during PayPal payment.');
      },
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  deleteAppointment(appointmentId: number): void {
    if (confirm(`Are you sure you want to delete appointment #${appointmentId}?`)) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe({
        next: () => {
          this.filteredAppointments = this.filteredAppointments.filter(
            (appt) => appt.id !== appointmentId
          );
        },
        error: (err: any) => console.error('Failed to delete appointment:', err),
      });
    }
  }

  viewAppointment(appointmentId: number): void {
    const appointment = this.filteredAppointments.find((appt) => appt.id === appointmentId);
    if (appointment) {
      this.selectedAppointment = appointment;
      this.showPopup = true;
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedAppointment = null;
  }
}
