import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = localStorage.getItem('auth_token'); // or your auth method

    if (user) {
      // If logged in, redirect to home or dashboard
      this.router.navigate(['/']);
      return false;
    }

    return true; // Allow access if not logged in
  }
}
