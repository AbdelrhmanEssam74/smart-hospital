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
      image: 'assets/images/banner/banner1.png',
      title: 'Trusted Doctors, Modern Care',
      description: 'Professional medical experts ready to serve you.'
    },
    {
      image: 'assets/images/banner/banner2.png',
      title: 'Book Your Visit In Seconds',
      description: 'Simple. Fast. Accessible from anywhere.'
    },
    {
      image: 'assets/images/banner/banner3.png',
      title: 'Compassionate Nursing Support',
      description: 'Helping hands when you need them most.'
    }
  ];
}
