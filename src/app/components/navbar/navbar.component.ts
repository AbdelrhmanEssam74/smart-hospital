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
  userRole: string = '';;


  constructor(private router: Router, private authService: AuthService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

     ngOnInit() {
    const currentUser = localStorage.getItem('auth_currentUser');

    if (currentUser) {
      const userObj = JSON.parse(currentUser);

      this.login = true;
      this.userInitial = userObj.name.trim().charAt(0).toUpperCase();

      if (userObj.role_id === 2) {
        this.userRole = 'doctor';
      } else if (userObj.role_id === 5) {
        this.userRole = 'patient';
      } else {
        this.userRole = 'other';
      }
    } else {
      this.login = false;
      this.userInitial = '';
      this.userRole = '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
