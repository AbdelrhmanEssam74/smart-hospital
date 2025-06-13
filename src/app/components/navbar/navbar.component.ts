// patient_profile
import { Component , HostListener  } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

    constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
  logout() {
    this.authService.logout();
    this.currentUser = null;
    window.location.reload(); 
  }

  login: boolean | null = false;
  userInitial: string = '';

  constructor(private router: Router, private authService: AuthService) {}
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
    }
  }


  logout() {
    this.authService.logout();
    this.login = false;
    this.userInitial = '';
    this.router.navigate(['/login']);
  }

}
