
// src/app/app.config.ts
import { ApplicationConfig , provideZoneChangeDetection } from '@angular/core';
import { provideRouter ,withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),
    AuthService
  ]
};

