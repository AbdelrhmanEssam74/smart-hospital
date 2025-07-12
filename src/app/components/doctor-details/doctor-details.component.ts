import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DoctorDisplay, User } from '../../interfaces/doctor';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
  providers: [DatePipe],
})
export class DoctorDetailsComponent implements OnInit {
  doctorId: number | null = null;
  doctor: DoctorDisplay | null = null;
  availableSlots: any[] = [];
  availableDates: string[] = [];
  availableTimes: string[] = [];
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  isLoading: boolean = true;



  appointment: Appointment = {
    patient_id: '',
    patientName: '',
    doctor_id: '',
    gender: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    status: 'pending',
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private notifications: NotificationService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef) {}

    // api
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.doctorId = +params['id'];
      this.loadDoctorDetails();
      this.loadDoctorSlots(this.doctorId);

    });
  }
  // doctor details data
  loadDoctorDetails() {
    if (!this.doctorId) return;
    this.isLoading = true;
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.isLoading = false;
        // console.log('id', this.doctorId);
        // console.log('getDoctorById function', doctor);
      },
    });
  }
  // available slots
  loadDoctorSlots(id: number) {
    this.doctorService.getDoctorSlots(id).subscribe({
      next: (slots) => {
          this.availableSlots = slots;
          this.availableDates = this.getAvailableDates();

      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading slots:', err);
      },
    });
  }

  // 
  formatTime(time: string): string {
    return time.substring(0, 5); 
  }

  getAvailableDates(): string[] {
    if (!this.availableSlots || this.availableSlots.length === 0) {
      console.log('No available slots');
      return [];
    }
    const uniqueDates = [
      ...new Set(this.availableSlots.map((slot) => slot.date)),
    ];
    const sortedDates = uniqueDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    console.log('Available dates for doctor:', this.doctorId, sortedDates);
    return sortedDates;
  }

  getAvailableTimes(): string[] {
    if (
      !this.selectedDate ||
      !this.availableSlots ||
      this.availableSlots.length === 0
    ) {
      console.log('No available times for selected date:', this.selectedDate);
      return [];
    }

    const times = this.availableSlots
      .filter((slot) => slot.date === this.selectedDate)
      .map((slot) => slot.time);

    console.log('Times for selected date:', times);
    return times;
  }

  formatDisplayDay(date: string): string {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayIndex = new Date(date).getDay();
    const dayName = dayNames[dayIndex];
    return `${dayName} (${date})`;
  }

  onDateChange() {
    this.selectedTime = null;
    if (this.selectedDate) {
      this.availableTimes = this.getAvailableTimes();
      console.log('Selected date:', this.selectedDate);
      console.log('Available times:', this.availableTimes);
    }
  }

  onTimeChange() {
    console.log('Selected time:', this.selectedTime);
    this.cdr.detectChanges();
  }

  submitForm(form: NgForm) {
    if (this.isLoading) return;

    const currentUser = JSON.parse(
      localStorage.getItem('auth_currentUser') || '{}'
    );

    if (!currentUser?.id) {
      this.notifications.error('You must be logged in to book an appointment.');
      return;
    }

    if (!form.valid || !this.selectedDate || !this.selectedTime) {
      this.notifications.error('Please fill in all required fields.');
      return;
    }

    const appointment: Appointment = {
      patient_id: currentUser.id.toString(),
      patientName: currentUser.name || this.appointment.patientName,
      doctor_id: this.doctorId?.toString() || '',
      gender: this.appointment.gender,
      email: this.appointment.email,
      phone: this.appointment.phone,
      date: this.selectedDate,
      time: this.selectedTime,
      status: 'pending',
      message: this.appointment.message,
    };

    this.appointmentService.saveAppointmentToLocal(appointment);
    this.notifications.success('Appointment booked successfully!');

    // Reset form
    form.resetForm();
    this.selectedDate = null;
    this.selectedTime = null;
    this.appointment = {
      patient_id: '',
      patientName: '',
      doctor_id: '',
      gender: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      status: 'pending',
      message: '',
    };

    this.cdr.detectChanges();
  }
}
