import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  Images = [
    { src: '/assets/images/gallery/img1.jpeg', alt: 'Image 1' },
    { src: '/assets/images/gallery/img2.jpeg', alt: 'Image 2' },
    { src: '/assets/images/gallery/img3.jpeg', alt: 'Image 3' },
    { src: '/assets/images/gallery/img4.jpeg', alt: 'Image 4' },
    { src: '/assets/images/gallery/img5.jpeg', alt: 'Image 5' },
    { src: '/assets/images/gallery/img6.jpeg', alt: 'Image 6' },
    { src: '/assets/images/gallery/img7.jpeg', alt: 'Image 7' },
    { src: '/assets/images/gallery/img8.jpeg', alt: 'Image 8' }
  ];
}
