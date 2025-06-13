import { Component , HostListener  } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
    currentUser: any = null;

    constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
  logout() {
    this.authService.logout();
    this.currentUser = null;
    window.location.reload(); 
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }
}
