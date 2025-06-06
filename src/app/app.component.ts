import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,ListDoctorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-hospital';
}
