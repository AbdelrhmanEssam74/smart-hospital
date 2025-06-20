import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [NgClass, RouterLink, RouterLinkActive, NgIf],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  login: boolean = false;
  userInitial: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.login = !!user;
      if (user) {
        const name = user.firstName || user.lastName || '';
        this.userInitial = name.trim().charAt(0).toUpperCase();
        if (user.role === 'doctor') {
          this.router.navigate(['/doctor']);
        }
      } else {
        this.userInitial = '';
      }
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
