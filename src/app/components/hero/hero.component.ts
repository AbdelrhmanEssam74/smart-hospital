

import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  slides = [
    {
      image: '/assets/images/banner/banner1.jpg',
      title: 'We Care For Your Health',
      description: 'Our expert doctors and modern facilities ensure the best care for every patient.'
    },
    {
      image: '/assets/images/banner/banner2.jpg',
      title: 'Book Appointments Easily',
      description: 'Use our online system to schedule your visit with a doctor in seconds.'
    },
    {
      image: '/assets/images/banner/banner3.jpg',
      title: 'Your Health, Our Priority',
      description: 'From emergency to general care — we are with you at every step.'
    }
  ];
}
