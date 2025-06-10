import {Injectable} from '@angular/core';

Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  private storageKey = 'appointments';

  getAllAppointments(): any[]{
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : [];
  }
  addAppointment(appointment:any){
    const appointments = this.getAllAppointments()
    appointment.id = Date.now();
    appointments.push(appointment);
    localStorage.setItem(this.storageKey,JSON.stringify(appointments));
  }
  getAppointmentById(id:number){
    return this.getAllAppointments().filter(appointment => appointment.id === id);
  }

}
