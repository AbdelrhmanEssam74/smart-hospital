import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Doctor, DoctorDisplay } from '../../interfaces/doctor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  imports: [RouterLink, CommonModule],
  standalone:true,
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  @Input() doctor?: Doctor;

}
