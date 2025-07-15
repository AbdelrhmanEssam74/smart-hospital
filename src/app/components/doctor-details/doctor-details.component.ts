import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DoctorDisplay } from '../../interfaces/doctor';

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
  availableTimes: any[] = [];
  selectedDate: string | null = null;
  selectedSlot: { start_time: string; end_time: string } | null = null;
  isLoading: boolean = true;

  appointment: Appointment = {
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    start_time: '',
    end_time: '',
    status: 'pending',
    appointment_fee: this.doctor?.appointment_fee || 0,
    notes: '',
  };

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private notifications: NotificationService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.doctorId = +params['id'];
      this.loadDoctorDetails();
      this.loadDoctorSlots(this.doctorId);
    });
  }

  loadDoctorDetails() {
    if (!this.doctorId) return;
    this.isLoading = true;
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.isLoading = false;
      },
    });
  }

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

  formatTime(time: string | null | undefined): string {
    if (!time) return 'Invalid';
    return time.substring(0, 5);
  }

  getAvailableDates(): string[] {
    if (!this.availableSlots || this.availableSlots.length === 0) return [];
    const uniqueDates = [
      ...new Set(this.availableSlots.map((slot) => slot.date)),
    ];
    return uniqueDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }

  getAvailableTimes(): any[] {
    if (!this.selectedDate || !this.availableSlots.length) return [];

    const selectedDayObj = this.availableSlots.find(
      (entry) => entry.date === this.selectedDate
    );

    return selectedDayObj?.slots || [];
  }

  formatDisplayDay(date: string): string {
    const dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];
    const dayIndex = new Date(date).getDay();
    return `${dayNames[dayIndex]} (${date})`;
  }

  onDateChange() {
    this.selectedSlot = null;
    this.availableTimes = this.getAvailableTimes();
  }

  onTimeChange() {
    this.cdr.detectChanges();
  }

  submitForm(form: NgForm) {
    if (this.isLoading) return;

    if (!form.valid || !this.selectedDate || !this.selectedSlot) {
      this.notifications.error('Please fill in all required fields.');
      return;
    }

    // Get patient_id from Laravel API => Ahmed abdelhalim
    this.appointmentService.getPatientIdFromBackend().subscribe({
      next: (response) => {
        const patientId = response.patient_id;

        const appointment: Appointment = {
          patient_id: patientId.toString(),
          doctor_id: this.doctorId?.toString() || '',
          appointment_date: this.selectedDate || '',
          start_time: this.formatTime(this.selectedSlot?.start_time),
          end_time: this.formatTime(this.selectedSlot?.end_time),
          status: 'pending',
          appointment_fee: this.doctor?.appointment_fee || 0,
          notes: this.appointment.notes,
        };

        this.appointmentService.sendAppointmentToBackend(appointment).subscribe({
          next: () => {
            this.notifications.success('Appointment booked successfully!');
            form.resetForm();
            this.resetFormState();
          },
          error: (error) => {
            console.error(error);
            this.notifications.error('Failed to book appointment. Please try again.');
          },
        });
      },
      error: (error) => {
        console.error(error);
        this.notifications.error('You must be logged in to book an appointment.');
      },
    });
  }

  resetFormState() {
    this.selectedDate = null;
    this.selectedSlot = null;
    this.appointment = {
      patient_id: '',
      doctor_id: '',
      appointment_date: '',
      start_time: '',
      end_time: '',
      status: 'pending',
      notes: '',
    };
    this.cdr.detectChanges();
  }
}
