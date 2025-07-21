import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorhomeService {

  private apiUrl = 'http://localhost:8000/api/doctors/four';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
