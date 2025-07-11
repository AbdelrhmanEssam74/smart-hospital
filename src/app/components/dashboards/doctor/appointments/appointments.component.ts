import {Component, OnInit} from '@angular/core';
import {DoctorAppointment} from '../../../../interfaces/doctor-appointment';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';

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
  trackById(index: number, item: DoctorAppointment): number {
    return item.id;
  }
  constructor(private http: HttpClient , private auth:AuthService) {
  }
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
  }
  ngOnInit() {
    this.http.get(this.APIUrl + 'appointments', {
      headers : this.getAuthHeaders()
    }).subscribe(
      (data: any) => {
        this.appointments = data.appointments;
        console.log(this.appointments)
      },
      (error)=>{
        console.log('Error:' , error)
      }
    )


  }

  acceptAppointment(appointmentId: number): void {
    console.log(appointmentId)
  }

  deleteAppointment(appointmentId: number): void {


  }

  viewAppointment(appointmentId: number): void {

  }

  closePopup(): void {
    this.showPopup = false;
    // this.selectedAppointment = null;
  }
}
