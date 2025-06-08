import { Component } from '@angular/core';
import { QualifiedDoctorCardComponent } from '../qualified-doctor-card/qualified-doctor-card.component';

@Component({
  selector: 'app-qualified-doctor',
  standalone: true,
  imports: [QualifiedDoctorCardComponent],
  templateUrl: './qualified-doctor.component.html',
  styleUrl: './qualified-doctor.component.css'
})
export class QualifiedDoctorComponent {
  doctors = [
    {
      name: 'Dr. Andrew Berton',
      specialty: 'Outpatient Surgery',
      image: '/assets/images/doctors/doctor1.jpg',
      social: ['fa-brands fa-facebook-f', 'fa-brands fa-twitter', 'fa-brands fa-google', 'fa-brands fa-instagram']
    },
    {
      name: 'Dr. Wahab Apple',
      specialty: 'Heart Specialist',
      image: '/assets/images/doctors/doctor2.jpg',
      social: ['fa-brands fa-facebook-f', 'fa-brands fa-twitter', 'fa-brands fa-google', 'fa-brands fa-instagram']
    },
    {
      name: 'Dr. Mackenzie',
      specialty: 'Haematology',
      image: '/assets/images/doctors/doctor3.webp',
      social: ['fa-brands fa-facebook-f', 'fa-brands fa-twitter', 'fa-brands fa-google', 'fa-brands fa-instagram']
    },
    {
      name: 'Dr. Mackenzie',
      specialty: 'Haematology',
      image: '/assets/images/doctors/doctor9.jpg',
      social: ['fa-brands fa-facebook-f', 'fa-brands fa-twitter', 'fa-brands fa-google', 'fa-brands fa-instagram']
    }
  ];
}
