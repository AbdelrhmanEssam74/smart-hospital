import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // for backend
import { Observable, of } from 'rxjs';
import {Appointment} from '../interfaces/appointment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private storageKey = 'appointments';

  // Inject HttpClient if you use a real backend
  constructor(private http: HttpClient) {}

  // Save to localStorage
  saveAppointmentToLocal(appointment: any): void {
    const existing = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    existing.push(appointment);
    localStorage.setItem(this.storageKey, JSON.stringify(existing));
  }
  getAppointmentsByUserId(userId: string): any[] {
    const allAppointments = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return allAppointments.filter((a: any) => a.patient_id === userId);
  }
  getAllAppointments(): Appointment[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  deleteAppointment(appointment: Appointment): void {
    const all = this.getAllAppointments().filter(a =>
      !(a.doctor_id === appointment.doctor_id &&
        a.date === appointment.date &&
        a.time === appointment.time &&
        a.patient_id === appointment.patient_id)
    );
    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }


  sendAppointmentToBackend(appointment: any): Observable<any> {
    //  API endpoint
    const url = 'https://your-backend-api.com/appointments';
    return this.http.post(url, appointment);
  }
}
