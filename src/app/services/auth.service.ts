import { Injectable } from '@angular/core';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean {
    throw new Error('Method not implemented.');
  }

  private localStorageKey = 'auth_users';

  constructor() { }

  register(newUser: User): boolean {
    const usersString = localStorage.getItem(this.localStorageKey);
    const users: User[] = usersString ? JSON.parse(usersString) : [];

    const emailExists = users.some(user => user.email === newUser.email.toLowerCase());
    if (emailExists) {
      return false;
    }

    users.push(newUser);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): User | null {
    const usersString = localStorage.getItem(this.localStorageKey);
    const users: User[] = usersString ? JSON.parse(usersString) : [];

    const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
    if (user) {
      localStorage.setItem('auth_currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('auth_currentUser');
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem('auth_currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_currentUser');
  }
}
