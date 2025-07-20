import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

 private adminUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.httpClient.get(`${this.adminUrl}/admin/dashboard-data`);
  }
}
