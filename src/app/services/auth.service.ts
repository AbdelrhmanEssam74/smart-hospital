import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private localStorageKey = 'auth_users';
  private currentUserKey = 'current_user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private getStoredUser(): User | null {
    const userString = localStorage.getItem(this.currentUserKey);
    return userString ? JSON.parse(userString) : null;
  }

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
// patient_profile
      localStorage.setItem('current_user', JSON.stringify(user));

      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      this.currentUserSubject.next(user);
//  master
      return user;
    }
    return null;
  }

  logout(): void {
//  patient_profile
    localStorage.removeItem('current_user');
  }

getCurrentUser(): User | null {
  const userString = localStorage.getItem('auth_currentUser');
  console.log('User from localStorage:', userString);
  return userString ? JSON.parse(userString) : null;
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('current_user');

    localStorage.removeItem(this.currentUserKey);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
//  master
  }
}
