import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://127.0.0.1:8000/api/contacts'; 

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
