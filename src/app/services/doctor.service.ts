import { Injectable } from '@angular/core';
import { ApiResponse, Doctor, DoctorDisplay } from '../interfaces/doctor';
import data from '../../data/data.json';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  // 
  private data = data;
  private doctors: Doctor[] = this.data.doctors;
  private doctorDisplayList: DoctorDisplay[] = [];
  // 

  //Api
  private apiUrl = `${environment.apiUrl}/doctors`;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // all doctors
  getAllDoctors(): Observable<DoctorDisplay[]> {
    return this.httpClient
      .get<{ doctors: DoctorDisplay[] }>(`${this.apiUrl}`)
      .pipe(map((doctor) => doctor.doctors || []));
  }
  //by id
  getDoctorById(id: number): Observable<DoctorDisplay> {
    // console.log(id);
    return this.httpClient
      .get<ApiResponse<DoctorDisplay>>(`${this.apiUrl}/${id}`)
      .pipe(
        map((doctor) => {
          return doctor.data;
        })
      );
  }

  // search
  searchDoctors(searchTerm: string): Observable<DoctorDisplay[]> {
    if (!searchTerm.trim()) {
      return of([]);
    }
    return this.httpClient
      .get<ApiResponse<DoctorDisplay[]>>(
        `${this.apiUrl}/search/${encodeURIComponent(searchTerm)}`
      )
      .pipe(
        map((response) => response.data || []),
        catchError((error) => {
          console.error('Search error:', error);
          return of([]);
        })
      );
  }

  //slots for specific doctor by id
  getDoctorSlots(id: number): Observable<{date: string, slots: DoctorDisplay[]}[]> {
    return this.httpClient
    .get<any>(`${this.apiUrl}/${id}/time_slots`).pipe(
      map(slots => {
          if (slots.success) {
          // console.log('loadDoctorSlots slots', slots); 
        return Object.keys(slots.data).map(date => ({
          date,
          slots: slots.data[date]
        }));
      }
      return [];
    }),
  );
  }

  // display  reports for doctor
  getPatientReports(patientId: number) {
    return this.httpClient.get(`${this.apiUrl}/patients/${patientId}/reports`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  downloadReport(reportId: number) {
    return this.httpClient.get(`${this.apiUrl}/reports/${reportId}`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'blob'
    });
  }
  // 
  
  getDoctorDisplayList() {
    return this.data.doctors.map((doctor) => {
      const user = this.data.users.find((u) => u.id === doctor.user_id);
      const specialty = this.data.specialties.find(
        (s) => s.id === doctor.specialty_id
      );

      return {
        id: doctor.id,
        user_id: doctor.user_id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        image: user?.image,
        profile_description: user?.profile_description,
        specialty: specialty?.name,
        license_number: doctor.license_number,
        years_of_experience: doctor.years_of_experience,
      };
    });
  }
  getDoctorDisplayByUserId(userId: number): DoctorDisplay | undefined {
    return this.doctorDisplayList.find((doc) => doc.user_id === userId);
  }

  getDoctorByUserId(userId: number): Doctor | undefined {
    return this.doctors.find((doctor) => doctor.user_id === userId);
  }
}
