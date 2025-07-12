import {Component, OnInit} from '@angular/core';
import {DoctorAppointment} from '../../../../interfaces/doctor-appointment';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {NotificationService} from '../../../../services/notification.service'

@Component({
  selector: 'app-appointments',
  imports: [FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: DoctorAppointment[] = [];
  showPopup: boolean = false;
  APIUrl = 'http://127.0.0.1:8000/api/doctor/'
  selectedAppointment: any = null;
  trackById(index: number, item: DoctorAppointment): number {
    return item.id;
  }

  constructor(private http: HttpClient, private auth: AuthService, private notify: NotificationService) {
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
  }

  ngOnInit() {
    this.http.get(this.APIUrl + 'appointments', {
      headers: this.getAuthHeaders()
    }).subscribe(
      (data: any) => {
        this.appointments = data.appointments;
        console.log(this.appointments)
      },
      (error) => {
        console.log('Error:', error)
      }
    )
  }
  acceptAppointment(appointmentId: number, updatedData: any, dateData: any): void {
    const today = new Date();
    const selectedDate = new Date(dateData.date);

    // Strip time for accurate date comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (updatedData.status === 'confirmed') {
      if (selectedDate < today) {
        this.notify.warning("You can't confirm an appointment scheduled in the past.");
        return;
      }

      this.http.put(this.APIUrl + 'appointments/' + appointmentId + '/status', updatedData, {
        headers: this.getAuthHeaders()
      }).subscribe(
        (updatedAppointment: any) => {
          const index = this.appointments.findIndex((appt: any) => appt.id === appointmentId);
          if (index !== -1) {
            this.appointments[index].status = updatedAppointment.appointment.status;
          }
          this.notify.success('Appointment confirmed successfully');
        },
        (error) => {
          console.log(error);
          this.notify.error('Failed to confirm appointment');
        }
      );
    } else {
      this.notify.info('Only pending appointments can be confirmed.');
    }
  }

  isPastAppointment(dateString: string): boolean {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  }


  CancelledAppointment(appointmentId: number, appointmentDate: string, currentStatus: string): void {
    const today = new Date();
    const selectedDate = new Date(appointmentDate);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.notify.warning('You cannot cancel a past appointment.');
      return;
    }

    if (currentStatus === 'confirmed') {
      this.notify.info('Confirmed appointments cannot be cancelled.');
      return;
    }
    const updatedData = { id: appointmentId, status: 'cancelled' };

    this.http.put(this.APIUrl + 'appointments/' + appointmentId + '/status', updatedData, {
      headers: this.getAuthHeaders()
    }).subscribe(
      (updatedAppointment: any) => {
        const index = this.appointments.findIndex((appt: any) => appt.id === appointmentId);
        if (index !== -1) {
          this.appointments[index].status = updatedAppointment.appointment.status;
        }
        this.notify.success('Appointment Cancelled Successfully');
      },
      (error) => {
        console.error(error);
        this.notify.error('Failed to Cancel Appointment');
      }
    );
  }



  viewAppointment(appointmentId: number): void {
    const appointment = this.appointments.find((appt: any) => appt.id === appointmentId);
    if (appointment) {
      this.selectedAppointment = {
        patientName: appointment.patient?.user?.name || 'N/A',
        gender: appointment.patient?.gender || 'N/A',
        date: appointment.appointment_date,
        startTime: appointment.start_time,
        endTime: appointment.end_time,
        notes: appointment.notes,
        status: appointment.status
      };
      this.showPopup = true;
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedAppointment = null;
  }
}
