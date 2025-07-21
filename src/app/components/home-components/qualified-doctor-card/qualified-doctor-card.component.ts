import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-qualified-doctor-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf,RouterLink],
  templateUrl: './qualified-doctor-card.component.html',
  styleUrl: './qualified-doctor-card.component.css'
})
export class QualifiedDoctorCardComponent {
  @Input() doctor: any;
}
