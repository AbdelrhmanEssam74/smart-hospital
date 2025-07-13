import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {DoctorNew} from '../../../../interfaces/doctor-new';

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

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.http.get<any>(this.APIUrl + 'profile', {
      headers: this.auth.getAuthHeaders()
    }).subscribe(data => {
      this.Doctor = data.doctor;
      console.log(this.Doctor)
    }, (error) => console.error('Error:', error))
  }
  logout(){
    this.auth.logout()
  }
}
