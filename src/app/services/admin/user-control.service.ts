import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../../interfaces/user-admin';

@Injectable({
  providedIn: 'root'
})
export class UserControlService {
  private usersURL = `${environment.apiUrl}/admin/users`;
  constructor(private httpClient :HttpClient, private authService: AuthService) { }

    getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.usersURL);
  }

    getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.usersURL}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

 createUser(userData: any): Observable<any> {
  return this.httpClient.post<any>(this.usersURL, userData, {
      headers: this.authService.getAuthHeaders(),
    });
}
  updateUser(user_id: number, userData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.usersURL}/${user_id}`, userData, {
      headers: this.authService.getAuthHeaders()
    });
  }
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.usersURL}/${id}`);
  }
}
