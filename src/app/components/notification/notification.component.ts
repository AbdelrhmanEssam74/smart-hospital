import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(notification => {
      this.notifications.push(notification);

      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n !== notification);
      }, notification.duration || 3000);
    });
  }
}
