import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-our-available-services-card',
  imports: [
    NgClass
  ],
  templateUrl: './our-available-services-card.component.html',
  styleUrl: './our-available-services-card.component.css'
})
export class OurAvailableServicesCardComponent {
  @Input() iconClass: string = '';
  @Input() cardTitle: string = '';
  @Input() cardText: string = '';
  @Input() cardStyle: string = '';
}
