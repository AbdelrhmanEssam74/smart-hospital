import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorComponent } from '../doctor/doctor.component';

@Component({
  selector: 'app-list-doctor',
  imports: [CommonModule,FormsModule,DoctorComponent],
  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.css'
})
export class ListDoctorComponent {
  doctors: any[] = [];
  constructor(private doctorService: DoctorService) {}
 ngOnInit(): void {
    this.doctors = this.doctorService.getDoctors();
  }
}
