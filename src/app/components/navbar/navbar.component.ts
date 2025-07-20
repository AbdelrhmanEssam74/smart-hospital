import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { User } from '../../interfaces/user';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [NgClass, RouterLink, RouterLinkActive, CommonModule],
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  login = false;
  userInitial = '';
  userRole = '';
  userImage = '';
  // @ts-ignore
  user: User = {};

  constructor(private router: Router, private authService: AuthService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.login = !!user;
      this.user = user?.data;

      if (this.login) {
        this.userInitial = this.user.name?.trim()?.charAt(0) || '';
        this.userImage = this.user.image || '';
        if (this.user.role?.id === 2) {
          this.userRole = 'Doctor';
        }
        else if (this.user.role?.id === 1) {
          this.userRole = 'Admin';
        }
         else if (this.user.role?.id === 5) {
          this.userRole = 'Patient';
        } else {
          this.userRole = '';
        }
      } else {
        this.userInitial = '';
        this.userRole = '';
        this.userImage = '';
      }
    });
  }

  logout() {
    // Clear immediately to update the UI
    this.authService.clearToken();
    this.authService.clearUser();
    this.router.navigate(['/login']);

    // Then notify backend
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {},
    });
  }
}
