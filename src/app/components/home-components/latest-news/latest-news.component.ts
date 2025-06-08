import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  standalone: true,
    imports: [
    ],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent {
  blogPosts = [
    {
      image: '/assets/images/blog/blog1.jpeg',
      date: '15 DEC 24',
      created: 'August 10, 2020',
      comments: 2,
      title: 'Give Abundantly Their Likeness To Gathered.',
      description: 'Him make two a blessed creeping won male earth form was appear morning divided on dry...'
    },
    {
      image: '/assets/images/blog/blog2.jpeg',
      date: '12 JUN 25',
      created: 'August 10, 2020',
      comments: 2,
      title: 'Your Medical Records Likeness Are Safe.',
      description: 'Him make two a blessed creeping won male earth form was appear morning divided on dry...'
    },
    {
      image: '/assets/images/blog/blog3.jpeg',
      date: '12 MAR 25',
      created: 'August 10, 2020',
      comments: 2,
      title: 'Best USA Medical Hospitals And Clinics.',
      description: 'Him make two a blessed creeping won male earth form was appear morning divided on dry...'
    }
  ];

}
