import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import { AuthService } from '../../../../services/auth.service';
import { PatientService } from '../../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../../services/payment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  showPopup: boolean = false;
  patientData: any;
  currentUser: any;
  isLoading = true;
  isAppointmentsLoading = true;
  errorMessage: string = '';
  //
  profileForm!: FormGroup;
  patient: any;
  //  reports 
  medicalReports: any[] = [];
  isReportsLoading = false;
  selectedReportFile: any | null = null;
  newReport = {
    title: '',
    description: '',
    report_date: new Date().toISOString().split('T')[0] 
  };
  selectedFile: File | null = null;
  isUploading = false;


  showReportModal = false;
  reportForm: FormGroup;

  
// 
  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    report_date: [new Date().toISOString().split('T')[0]],
    file: [null, Validators.required]
  });
  }

  ngOnInit(): void {
    this.loadPatientProfile();
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      date_of_birth: [''],
      gender: [''],
      address: [''],
      profile_description: [''],
      image: [null],
    });
  }

  loadPatientProfile(): void {
    this.patientService.getPatients().subscribe({
      next: (response: any) => {
        this.currentUser = response.User;
        this.patientData = this.currentUser?.patient || response.currentUser?.patient;
        this.isLoading = false;
        this.loadAppointments();
        this.loadMedicalReports();
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load patient profile';
        this.isLoading = false;
        this.isAppointmentsLoading = false;
      },
    });
  }

  loadAppointments(): void {
    this.isAppointmentsLoading = true;
    this.appointmentService.getAppointmentsForCurrentPatient().subscribe({
      next: (response: any) => {
        const appointments = response.data;
        this.filteredAppointments = appointments.map((item: any) => ({
          id: item.appointment?.id,
          doctorname: item.doctor?.name,
          specialty: item.doctor?.specialization,
          appointment_fee: item.doctor?.appointment_fee,
          gender: item.patient?.gender,
          phone: item.patient?.phone,
          date: item.appointment?.appointment_date,
          startTime: item.appointment?.start_time,
          endTime: item.appointment?.end_time,
          notes: item.appointment?.notes,
          status: item.appointment?.status,
          payment_method: item.appointment?.payment_method,
          payment_status: item.appointment?.payment_status,
        }));
        this.isAppointmentsLoading = false;
      },
      error: (error: any) => {
        console.error('Failed to load appointments:', error);
        this.isAppointmentsLoading = false;
      },
    });
  }

  payWithPayPal(appointmentId: number): void {
    this.paymentService.payWithPayPal(appointmentId).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 'success' && res.url) {
          window.open(res.url, '_blank');
        } else {
          alert(res.message || 'Failed to initiate PayPal transaction.');
        }
      },
      error: (err: any) => {
        console.error('PayPal Error:', err);
        alert('Error occurred during PayPal payment.');
      },
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  deleteAppointment(appointmentId: number): void {
    if (confirm(`Are you sure you want to delete appointment #${appointmentId}?`)) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe({
        next: () => {
          this.filteredAppointments = this.filteredAppointments.filter(
            (appt) => appt.id !== appointmentId
          );
        },
        error: (err: any) => console.error('Failed to delete appointment:', err),
      });
    }
  }

  viewAppointment(appointmentId: number): void {
    const appointment = this.filteredAppointments.find((appt) => appt.id === appointmentId);
    if (appointment) {
      this.selectedAppointment = appointment;
      this.showPopup = true;
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedAppointment = null;
  }
  // reports
 loadMedicalReports(): void {
    this.isReportsLoading = true;
    this.patientService.getReports().subscribe({
        next: (reports: any) => {
            this.medicalReports = reports;
            this.isReportsLoading = false;
        },
        error: (err) => {
            console.error('Failed to load medical reports:', err);
            this.isReportsLoading = false;
        }
    });
}

  onReportFileChange(event: any): void {
    this.selectedReportFile = event.target.files[0];
  }

 uploadMedicalReport(): void {
    if (this.reportForm.invalid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('title', this.reportForm.value.title);
    formData.append('description', this.reportForm.value.description);
    formData.append('report_date', this.reportForm.value.report_date);
    formData.append('report', this.selectedFile);

    this.patientService.uploadReport(formData).subscribe({
        next: () => {
          console.log(formData);
            this.loadMedicalReports();
            this.resetReportForm();
            this.showReportModal = false;
        },
        error: (err) => {
            console.error('Failed to upload report:', err);
        }
    });
}

  deleteMedicalReport(reportId: number): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.patientService.deleteReport(reportId).subscribe({
        next: () => {
          this.loadMedicalReports();
        },
        error: (err) => {
          console.error('Failed to delete report:', err);
        }
      });
    }
  }

  resetReportForm(): void {
    this.newReport = {
      title: '',
      description: '',
      report_date: new Date().toISOString().split('T')[0]
    };
    this.selectedReportFile = null;
  }

  getReportUrl(path: string): string {
    return `${environment.apiUrl}/storage/${path}`;
  }
 onFileChange(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.reportForm.patchValue({
      file: file
    });
    this.reportForm.get('file')?.updateValueAndValidity();
  }
}
}
