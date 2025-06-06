import { Component } from '@angular/core';
import {OurAvailableServicesCardComponent} from '../our-available-services-card/our-available-services-card.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [
    OurAvailableServicesCardComponent,
    NgClass
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  Images = [
    { src: '/assets/images/gallery/img1.jpeg', alt: 'Image 1', spanClass: 'span-2x2 span-small' },
    { src: '/assets/images/gallery/img2.jpeg', alt: 'Image 2', spanClass: 'span-1x2 span-small' },
    { src: '/assets/images/gallery/img3.jpeg', alt: 'Image 3', spanClass: 'span-small' },
    { src: '/assets/images/gallery/img4.jpeg', alt: 'Image 4', spanClass: 'span-1x2 span-small' },
    { src: '/assets/images/gallery/img5.jpeg', alt: 'Image 5', spanClass: 'span-small ' },
    { src: '/assets/images/gallery/img6.jpeg', alt: 'Image 6', spanClass: 'span-2x1 span-small' },
    { src: '/assets/images/gallery/img7.jpeg', alt: 'Image 7', spanClass: 'span-2x1 span-small' },
    { src: '/assets/images/gallery/img8.jpeg', alt: 'Image 8', spanClass: 'span-small' }
  ];
}
