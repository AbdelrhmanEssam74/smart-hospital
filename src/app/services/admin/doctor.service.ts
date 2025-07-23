// src/app/services/admin/doctor.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private baseUrl = 'http://127.0.0.1:8000/api/admin/doctors';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getDoctors(name: string = ''): Observable<any> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    return this.http.get(this.baseUrl, { params });
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateDoctor(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  // update doctor status
  // using this api /doctor/{id}/status/accepted
  updateDoctorStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status/${status}`, {});
  }
}
