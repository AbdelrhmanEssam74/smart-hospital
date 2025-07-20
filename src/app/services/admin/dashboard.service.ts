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
}
