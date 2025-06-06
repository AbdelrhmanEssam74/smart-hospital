import { Component } from '@angular/core';
import {OurAvailableServicesCardComponent} from '../our-available-services-card/our-available-services-card.component';

@Component({
  selector: 'app-our-available-services',
  standalone: true,
  imports: [
    OurAvailableServicesCardComponent
  ],
  templateUrl: './our-available-services.component.html',
  styleUrl: './our-available-services.component.css'
})
export class OurAvailableServicesComponent {
  cards = [
    {
      iconClass: 'fa-solid fa-truck-medical text-light',
      title: '24/7 Ambulance',
      text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis .',
      style: 'ambulance-card'
    },
    {
      iconClass: 'fa-solid fa-kit-medical text-light',
      title: 'Emergency Care',
      text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
      style: 'emergency-card'
    },
    {
      iconClass: 'bi bi-activity',
      title: 'Operation Theater',
      text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
      style: 'Operation-card'
    },
    {
      iconClass: 'fa-solid fa-brain',
      title: 'Cancer Service',
      text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
      style: 'Cancer-card'
    },
    {
      iconClass: 'bi bi-droplet',
      title: 'Blood Test',
      text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
      style: 'Blood-card'
    },
    {
      iconClass: 'bi bi-hospital',
      title: '24/7 Pharmacy',
      text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
      style: 'Pharmacy-card'
    }
  ];

}
