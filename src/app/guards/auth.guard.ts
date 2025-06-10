import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = localStorage.getItem('current_user');
    if (user) {
      return this.router.parseUrl('/home');
    }

    return true;
  }
}
