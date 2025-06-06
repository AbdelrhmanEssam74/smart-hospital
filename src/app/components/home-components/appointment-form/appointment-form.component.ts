import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment-form',
  imports: [],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {
  showForm = false;
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
