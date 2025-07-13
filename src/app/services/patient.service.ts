import { Injectable } from '@angular/core';
import data from '../../data/data.json';
import { Patient } from '../interfaces/patient';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patient`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}


  
  getPatients(): Observable<any> {
     return this.httpClient.get(`${this.apiUrl}/profile`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  
  updatePatientProfile(data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/profile/update`, data, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
