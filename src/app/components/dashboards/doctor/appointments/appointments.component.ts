import { Component, OnInit } from '@angular/core';
import appointments from '../../../../../data/data.json';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  imports: [FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  currentDoctorId: number = 0;
  selectedAppointment: any = null;
  showPopup: boolean = false;


  ngOnInit() {
    const currentUser = localStorage.getItem('auth_currentUser');
    if (currentUser) {
      const userObj = JSON.parse(currentUser);
      if (userObj.role_id == 2) {
        this.currentDoctorId = userObj.id;
        console.log("Current User:", userObj);
        console.log("Current Doctor ID:", this.currentDoctorId);
      } else {
        alert('You are not authorized to view appointments.');
        return;
      }
    } else {
      alert('Doctor information not found in localStorage.');
      return;
    }


    this.appointments = appointments.appointments;
    this.filteredAppointments = this.appointments.filter(
      appt => appt.doctor_id === this.currentDoctorId

    );
    console.log("All Appointments:", this.appointments);
    console.log("Filtered Appointments:", this.filteredAppointments);
    this.filteredAppointments.forEach(appt => {
      console.log(appt);
    });

  }
acceptAppointment(appointmentId: number): void {
  const index = this.filteredAppointments.findIndex(appt => appt.id === appointmentId);
  if (index !== -1) {
    this.filteredAppointments[index].status = 'confirmed';
    alert(`Appointment #${appointmentId} has been confirmed.`);
  }
}

deleteAppointment(appointmentId: number): void {
  const confirmDelete = confirm(`Are you sure you want to delete appointment #${appointmentId}?`);
  if (confirmDelete) {
    this.filteredAppointments = this.filteredAppointments.filter(appt => appt.id !== appointmentId);
    alert(`Appointment #${appointmentId} has been deleted.`);
  }
}
viewAppointment(appointmentId: number): void {
  const appointment = this.filteredAppointments.find(appt => appt.id === appointmentId);
  if (appointment) {
    this.selectedAppointment = appointment;
    this.showPopup = true;
  }
}

closePopup(): void {
  this.showPopup = false;
  this.selectedAppointment = null;
}
}
