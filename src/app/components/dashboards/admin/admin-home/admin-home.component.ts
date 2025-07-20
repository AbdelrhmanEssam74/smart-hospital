import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [    RouterLink,
    RouterLinkActive,
    RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
user: any = null;

ngOnInit(): void {
  const raw = localStorage.getItem('auth_currentUser');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);     
      this.user = parsed.data;            
      console.log('Loaded user:', this.user);
    } catch (e) {
      console.error('Failed to parse user data', e);
    }
  }
}
}