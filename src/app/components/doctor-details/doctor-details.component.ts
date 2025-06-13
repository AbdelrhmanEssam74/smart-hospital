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
    day: '',
    time: '',
    message: ''
  };
  daysOfWeek: string[] =
    ['Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Saturday'];

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

    if (!form.valid) {
      this.notifications.error("Please fill in all required fields correctly.");
      return;
    }

    // Add doctorId to the appointment
    const appointmentData = {
      ...this.appointment,
      doctorId: this.doctorId,
      userId: currentUser.id
    };
this.notifications.success("Your Appointment Sent Succe");
    // Submit the appointment
    console.log('Sending appointment:', appointmentData);
    // Here, call your backend service or save to localStorage
  }

}
