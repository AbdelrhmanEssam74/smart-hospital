import {Component, OnInit} from '@angular/core';
import {DoctorAppointment} from '../../../../interfaces/doctor-appointment';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {NotificationService} from '../../../../services/notification.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    return value?.length > limit ? value.substring(0, limit) + trail : value || '';
  }
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointments: DoctorAppointment[] = [];
  showPopup: boolean = false;
  selectedAppointment: any = null;
  payment_status: string = '';
  clicked_cancel: boolean = false;
  APIUrl = 'http://127.0.0.1:8000/api/doctor/';

  filter = {
    date: '',
    time: '',
    status: ''
  };

  constructor(private http: HttpClient, private auth: AuthService, private notify: NotificationService) {
  }

  ngOnInit() {
    this.http.get(this.APIUrl + 'appointments', {
      headers: this.getAuthHeaders()
    }).subscribe(
      (data: any) => this.appointments = data.appointments,
      (error) => console.error('Error:', error)
    );
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${this.auth.getToken()}`});
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  isPastAppointment(dateString: string): boolean {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  }
formatTo12Hour(time: string): string {
  const [hour, minute] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

  get filteredAppointments() {
    return this.appointments.filter(appt => {
      const matchesDate = !this.filter.date || appt.appointment_date === this.filter.date;
      const matchesTime = !this.filter.time || appt.start_time === this.filter.time;
      const matchesStatus = !this.filter.status || appt.status === this.filter.status;
      return matchesDate && matchesTime && matchesStatus;
    });
  }

  acceptAppointment(appointmentId: number, updatedData: any, dateData: any): void {
    const today = new Date();
    const selectedDate = new Date(dateData.date);
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
          const index = this.appointments.findIndex(appt => appt.id === appointmentId);
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

  CancelledAppointment(appointmentId: number, appointmentDate: string, currentStatus: string, payment_status: string): void {
    const today = new Date();
    const selectedDate = new Date(appointmentDate);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.notify.warning('You cannot cancel a past appointment.');
      return;
    }
    if (payment_status === 'paid' || this.payment_status === 'paid') {
      this.clicked_cancel = true;
      this.notify.info('You cannot cancel a paid appointment.');
      return;
    }
    if (currentStatus === 'cancelled' || currentStatus === 'completed') {
      this.clicked_cancel = true;
      this.notify.info('Only confirmed or pending appointments can be cancelled.');
      return;
    }
    // get payment status
    this.http.get(this.APIUrl + 'appointments/' + appointmentId + '/payment/status', {
      headers: this.getAuthHeaders()
    }).subscribe(
      (res:any)=>{
        this.payment_status = res.appointment.payment_status;
      },
      (error)=>{
        console.log(error)
      }
    )

    const updatedData = {id: appointmentId, status: 'cancelled'};
    this.http.put(this.APIUrl + 'appointments/' + appointmentId + '/status', updatedData, {
      headers: this.getAuthHeaders()
    }).subscribe(
      (updatedAppointment: any) => {
        this.clicked_cancel = true;
        const index = this.appointments.findIndex(appt => appt.id === appointmentId);
        if (index !== -1) {
          this.appointments[index].status = updatedAppointment.appointment.status;
        }
        this.notify.success('Appointment cancelled successfully');
      },
      (error) => {
        console.error(error);
        this.notify.error('Failed to cancel appointment');
      }
    );
  }

  viewAppointment(appointmentId: number): void {
    const appointment = this.appointments.find(appt => appt.id === appointmentId);
    if (appointment) {
      this.selectedAppointment = {
        patientName: appointment.patient?.user?.name || 'N/A',
        gender: appointment.patient?.gender || 'N/A',
        date: appointment.appointment_date,
        startTime: appointment.start_time,
        endTime: appointment.end_time,
        payment_status: appointment.payment_status,
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

  calculateDuration(startTime: string, endTime: string): string {
    if (!startTime || !endTime) return 'N/A';
    try {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      const diff = end.getTime() - start.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } catch (e) {
      return 'N/A';
    }
  }
}
