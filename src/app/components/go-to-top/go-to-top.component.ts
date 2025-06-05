import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrl: './go-to-top.component.css'
})
export class GoToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible = window.pageYOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth', });
  }
}
