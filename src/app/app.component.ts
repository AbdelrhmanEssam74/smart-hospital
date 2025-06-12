import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';
import { RouterOutlet } from '@angular/router';
import {NotificationComponent} from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, GoToTopComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-hospital';
}
