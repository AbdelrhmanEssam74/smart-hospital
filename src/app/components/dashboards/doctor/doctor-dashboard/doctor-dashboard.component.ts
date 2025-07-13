import {Component, OnInit} from '@angular/core';
import {DoctorNew} from '../../../../interfaces/doctor-new';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  today_appointments: any
  today_appointments_count: number = 0
  upcoming_appointments_count: number = 0
  recent_patient : any
  APIUrl = 'http://127.0.0.1:8000/api/doctor/';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.http.get<any>(this.APIUrl + 'appointments', {
      headers: this.auth.getAuthHeaders()
    }).subscribe(data => {
      const appointments = data.appointments || [];
      this.today_appointments = appointments.filter((appt: any) => this.isToday(appt.appointment_date))
      this.recent_patient = appointments.filter((appt: any) => this.isToday(appt.appointment_date))[0].patient;
      console.log(this.recent_patient)
      this.today_appointments_count = appointments.filter((appt: any) => this.isToday(appt.appointment_date)).length;
      this.upcoming_appointments_count = appointments.filter((appt: any) => this.isUpcoming(appt)).length;
    }, (error) => console.error('Error:', error))
  }

  isToday(dateString: string): boolean {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return (
      today.getFullYear() === appointmentDate.getFullYear() &&
      today.getMonth() === appointmentDate.getMonth() &&
      today.getDate() === appointmentDate.getDate()
    );
  }

  isUpcoming(date: any): boolean {
    const today = new Date();
    const appointmentDate = new Date(date.appointment_date);
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate.getTime() > today.getTime() && date.status === 'pending';
  }
}


