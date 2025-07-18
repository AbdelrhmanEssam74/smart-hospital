import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contacts';

  constructor(private http: HttpClient) {}

  // Get all contacts (for admin)
  getContacts(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  // Send contact form
  sendMessage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { withCredentials: true });
  }
}
