import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorhomeService } from '../../../services/doctorhome.service';
import { QualifiedDoctorCardComponent } from '../qualified-doctor-card/qualified-doctor-card.component';

@Component({
  selector: 'app-qualified-doctor',
  standalone: true,
  imports: [CommonModule, QualifiedDoctorCardComponent],
  templateUrl: './qualified-doctor.component.html',
  styleUrl: './qualified-doctor.component.css'
})
export class QualifiedDoctorComponent implements OnInit {
  doctors: any[] = [];

  constructor(private doctorService: DoctorhomeService) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          image: this.cleanImageUrl(doc.image),
          specialty: doc.specialty?.name || 'Unknown',
          social: doc.social || []
        }));
      },
      error: (err) => console.error('Error fetching doctors:', err)
    });
  }

  cleanImageUrl(url: string): string {
    return url.replace('storage/storage', 'storage').replace('storage/http://', '');
  }
  trackDoctor(index: number, doctor: any) {
  return doctor.name;
}

}
