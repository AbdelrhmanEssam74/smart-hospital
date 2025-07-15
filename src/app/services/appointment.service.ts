import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient , private auth: AuthService) {}
  //  create a new appointment => Ahmed abdelhalim
  sendAppointmentToBackend(appointment: Appointment): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments/patient`, appointment, {
      headers: this.auth.getAuthHeaders()
    });
  }
  // get all appointments for the current patient => Ahmed abdelhalim
    getAppointmentsForCurrentPatient(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/mine`, {
      headers: this.auth.getAuthHeaders()
    });
  }
// get patient id from backend => Ahmed abdelhalim
  getPatientIdFromBackend(): Observable<{ patient_id: number }> {
    return this.http.get<{ patient_id: number }>(`${this.baseUrl}/patient/id`, {
      headers: this.auth.getAuthHeaders()
    });
  }

// get appointments by patient id => Ahmed abdelhalim
getAppointmentsByUserId(patientId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/appointments/patient/${patientId}`, {
    headers: this.auth.getAuthHeaders()
  });
}

// delete an appointment by id => Ahmed abdelhalim
deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/patient/${id}`, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // update an appointment by id => Ahmed abdelhalim
  updateAppointment(id: number, updatedData: Partial<Appointment>): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/patient/${id}`, updatedData, {
      headers: this.auth.getAuthHeaders()
    });
  }
}
