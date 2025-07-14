import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  //  create a new appointment => Ahmed abdelhalim
  sendAppointmentToBackend(appointment: Appointment): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments/patient`, appointment, {
      withCredentials: true
    });
  }
  // get all appointments for the current patient => Ahmed abdelhalim
    getAppointmentsForCurrentPatient(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/mine`, {
      withCredentials: true,
    });
  }
// get patient id from backend => Ahmed abdelhalim
  getPatientIdFromBackend(): Observable<{ patient_id: number }> {
    return this.http.get<{ patient_id: number }>(`${this.baseUrl}/patient/id`, {
      withCredentials: true
    });
  }
  
// get appointments by patient id => Ahmed abdelhalim
getAppointmentsByUserId(patientId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/appointments/patient/${patientId}`, {
    withCredentials: true
  });
}

// delete an appointment by id => Ahmed abdelhalim
deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/patient/${id}`, {
      withCredentials: true
    });
  }

  // update an appointment by id => Ahmed abdelhalim
  updateAppointment(id: number, updatedData: Partial<Appointment>): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/patient/${id}`, updatedData, {
      withCredentials: true
    });
  }
}
