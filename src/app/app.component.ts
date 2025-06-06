import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, GoToTopComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-hospital';
}
