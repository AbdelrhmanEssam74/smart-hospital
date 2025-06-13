import { Component, HostListener, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { NgClass } from '@angular/common';
//  master

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [NgClass, RouterLink, RouterLinkActive],
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isScrolled = false;
//  patient_profile
    currentUser: any = null;

  login: boolean | null = false;
  userInitial: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
//  master

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('current_user') || "{}");
    if (user && user.name) {
      this.login = true;
      this.userInitial = user.name.charAt(0).toUpperCase();
      // Check user role and navigate doctor or patient
      if (user.role_id === 2) {
      this.router.navigate(['/doctor']);
    }
    }
  }


  logout() {
    this.authService.logout();
    this.login = false;
    this.userInitial = '';
    this.router.navigate(['/login']);
  }

}
