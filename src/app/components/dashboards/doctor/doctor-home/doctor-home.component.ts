import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {DoctorNew} from '../../../../interfaces/doctor-new';
import {Router} from '@angular/router';
@Component({
  selector: 'app-doctor-home',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css'
})
export class DoctorHomeComponent implements OnInit{
  // @ts-ignore
  Doctor: DoctorNew;
  APIUrl = 'http://127.0.0.1:8000/api/doctor/';

  constructor(private http: HttpClient, private authService: AuthService, private auth: AuthService, private router: Router) {
    // Initialize Doctor to an empty object
    this.Doctor = {} as DoctorNew;
  }

  ngOnInit(): void {
    this.http.get<any>(this.APIUrl + 'profile', {
      headers: this.auth.getAuthHeaders()
    }).subscribe(data => {
      this.Doctor = data.doctor;
    }, (error) => console.error('Error:', error))
  }
  logout() {
    // Clear immediately to update the UI
    this.authService.clearToken();
    this.authService.clearUser();
    this.router.navigate(['/login']);

    // Then notify backend
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {},
    });
  }
}
