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
  private reportURL = `${environment.apiUrl}`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // get patient data
  getPatients(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/profile`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  // update data
  updatePatientProfile(formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/profile/update`, formData, {
      headers: this.authService.getAuthHeaders(),
    });
  }
  // Update image
  updateProfileImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.httpClient.post(
      `${this.apiUrl}/profile/update_image`,
      formData,
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }
  // medical reports
  getReports() {
    return this.httpClient.get(`${this.apiUrl}/medical_reports`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
  // uplaod
  uploadReport(formData: FormData) {
    return this.httpClient.post(`${this.apiUrl}/medical_reports`, formData, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteReport(reportId: number) {
    return this.httpClient.delete(
      `${this.apiUrl}/medical_reports/${reportId}`,
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }
  //  reports
getPatientReports(patientId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
        `${this.reportURL}/patients/${patientId}/reports`, 
        {
            headers: this.authService.getAuthHeaders(),
        }
    )
}
}
