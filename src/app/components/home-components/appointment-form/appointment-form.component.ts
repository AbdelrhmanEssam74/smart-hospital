import {Component, Input} from '@angular/core';
import {AppointmentService} from '../../../services/appointment.service';
import {Appointment} from '../../../interfaces/appointment'
import {FormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {
  @Input() doctorId: number | null = null
  formData: Appointment = {
    name: '',
    phone: '',
    gender: '',
    department: '',
    date: '',
    time: ''
  }

  constructor(private appointmentService: AppointmentService) {
  }

  submitAppointment() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || "{}")
    if (!currentUser){}
    alert('You must be logged in to book an appointment.');
    return
  }
}

