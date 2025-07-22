import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private adminUrl = `${environment.apiUrl}`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getDashboardData(): Observable<any> {
    return this.httpClient.get(`${this.adminUrl}/admin/dashboard-data`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAdminProfile(): Observable<any> {
    return this.httpClient.get(`${this.adminUrl}/admin/profile`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateAdminProfile(profileData: any): Observable<any> {
    return this.httpClient.put(`${this.adminUrl}/admin/profile/update`, profileData, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateProfileImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.httpClient.post(
      `${this.adminUrl}/admin/profile/update_image`,
      formData,
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }
  // mamage recently registered doctors
  getPendingDoctors() {
    return this.httpClient.get<any[]>(`${this.adminUrl}/manage_pending_doctors`);
  }

  approveDoctor(doctorId: number) {
    return this.httpClient.post(`${this.adminUrl}/approve-doctor/${doctorId}`, {});
  }

  rejectDoctor(doctorId: number, reason: string) {
    return this.httpClient.post(`${this.adminUrl}/reject-doctor/${doctorId}`, { reason });
  }

  getDoctorLicence(doctorId:number):Observable<any>{
    return this.httpClient.get<any>(
      `${this.adminUrl}/doctor/${doctorId}/licence`, 
        {
            headers: this.authService.getAuthHeaders(),
        } 
    )
  }
}
