import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';
import {FormsModule} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-doctor-details',
  imports: [
    FormsModule
  ],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent {
  currentUser: any = null;
  doctorId: number | null = null;
  doctor: any;
  appointment = {
    name: '',
    gender: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: ''
  };
  dateError: string | null = null;
  timeError: string | null = null;
  validateDateAndTime(): void {
    this.dateError = null;
    this.timeError = null;

    const today = new Date();
    const selectedDate = new Date(this.appointment.date);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      this.dateError = "Please select a valid date.";
      return;
    }

    if (selectedDate < today) {
      this.dateError = "Date cannot be in the past.";
      return;
    }

    if (selectedDate.getDay() === 5) {
      this.dateError = "Appointments cannot be scheduled on Fridays.";
      return;
    }

    if (!this.appointment.time) {
      this.timeError = "Time is required.";
      return;
    }

    const [hour, minute] = this.appointment.time.split(':').map(Number);
    const totalMinutes = hour * 60 + minute;

    if (totalMinutes < 8 * 60 || totalMinutes > 20 * 60) {
      this.timeError = "Time must be between 08:00 and 20:00.";
    }
  }

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private notifications: NotificationService
  ) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.doctorId = idParam ? +idParam : null;

      if (this.doctorId !== null) {
        const allDoctors = this.doctorService.getDoctorDisplayList();
        this.doctor = allDoctors.find(d => d.id === this.doctorId);
      }
    });
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
  }

  // send an appointment
  submitForm(form: NgForm) {
    const currentUser = JSON.parse(localStorage.getItem('current_user') || '{}');
    if (!currentUser || !currentUser.id) {
      this.notifications.error("You must be logged in to book an appointment.");
      return;
    }

    if (!(!form.valid || this.validateDateAndTime())) {
      const appointmentData = {
        ...this.appointment,
        doctorId: this.doctorId,
        userId: currentUser.id
      };
      this.notifications.success("Your Appointment Sent Successfully");
      console.log('Sending appointment:', appointmentData);
    } else {
      this.notifications.error("Please fix the errors before submitting.");
      return;
    }
    // Save or send appointment data here
  }

}
