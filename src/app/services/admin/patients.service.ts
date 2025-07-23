import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/patients'; 

  constructor(private http: HttpClient) {}

  getPatients(name?: string): Observable<any> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(this.apiUrl, { params });
  }

  getPatient(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updatePatient(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
