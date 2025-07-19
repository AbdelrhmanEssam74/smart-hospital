import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(filters: any = {}) {
    let params = new HttpParams();
    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getAppointment(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAppointment(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateAppointment(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteAppointment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateAppointmentStatus(id: number, status: string) {
  return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
}
}
