import { Component } from '@angular/core';
import {AppointmentFormComponent} from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  imports: [
    AppointmentFormComponent
  ],
  styleUrl: './hero.component.css'
})
export class HeroComponent {


  slides = [
    {
      image: 'assets/images/banner/banner1.png',
      title: 'Trusted Doctors, Modern Care',
      description: 'Professional medical experts ready to serve you.'
    },
    {
      image: 'assets/images/banner/banner2.png',
      title: 'Welcome to the MediPlus',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at blandit dui, ut consequat ex. Vestibulum at ullamcorper leo. Praesent libero odio, gravida ut velit et, mattis laoreet metus.`,
    },
    {
      image: 'assets/images/banner/banner3.png',
      title: 'Compassionate Nursing Support',
      description: 'Helping hands when you need them most.'
    }
  ];


}
