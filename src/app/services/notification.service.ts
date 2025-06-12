import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  getNotification(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  show(notification: Notification) {
    this.notificationSubject.next(notification);
  }

  success(message: string, duration = 3000) {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration = 3000) {
    this.show({ type: 'error', message, duration });
  }

  info(message: string, duration = 3000) {
    this.show({ type: 'info', message, duration });
  }

  warning(message: string, duration = 3000) {
    this.show({ type: 'warning', message, duration });
  }
}
