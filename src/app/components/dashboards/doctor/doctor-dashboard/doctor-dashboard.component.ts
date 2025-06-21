import { Component, OnInit } from '@angular/core';
import { Doctor, DoctorDisplay } from '../../../../interfaces/doctor';
import { DoctorService } from '../../../../services/doctor.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
    displayDoctor?: DoctorDisplay;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('auth_currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.role_id == 2) {
        this.displayDoctor = this.doctorService.getDoctorDisplayByUserId(user.id);
      }
    }
  }
}


