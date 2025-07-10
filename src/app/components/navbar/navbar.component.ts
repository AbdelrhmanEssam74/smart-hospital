import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';

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

  constructor(private router: Router, private authService: AuthService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  ngOnInit() {
  this.authService.currentUser$.subscribe((userWrapper) => {
    const user = userWrapper?.data; // ← نحصل على البيانات الحقيقية من داخل data
    if (user) {
      this.login = true;
      this.userInitial = user.name?.trim().charAt(0).toUpperCase() || '';
      this.userImage = user.image || '';

      switch (user.role?.id || user.role_id) {
        case 1:
          this.userRole = 'admin';
          break;
        case 2:
          this.userRole = 'doctor';
          break;
        case 3:
          this.userRole = 'patient';
          break;
        default:
          this.userRole = 'user';
      }
    } else {
      this.login = false;
      this.userInitial = '';
      this.userRole = '';
      this.userImage = '';
    }
  });
}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearToken();
        this.authService.clearUser();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.clearToken();
        this.authService.clearUser();
        this.router.navigate(['/login']);
      },
    });
  }
}
