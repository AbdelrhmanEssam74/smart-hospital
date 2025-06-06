import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 'doctor' | 'patient';
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_users';

  constructor(private router: Router) {}

  register(user: User): boolean {
    const users = this.getUsers();

    // Check if email already exists
    if (users.some(u => u.email === user.email)) {
      return false;
    }

    users.push(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('current_user');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }
}
