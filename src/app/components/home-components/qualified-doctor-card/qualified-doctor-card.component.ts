import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-qualified-doctor-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './qualified-doctor-card.component.html',
  styleUrl: './qualified-doctor-card.component.css'
})
export class QualifiedDoctorCardComponent {
  @Input() doctor: any;
}
