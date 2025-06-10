import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private appointments$ = new BehaviorSubject<any[]>([]);
  private slots$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.http.get<any>('../../data/data.json').subscribe(data => {
      this.appointments$.next(data.appointments || []);
      this.slots$.next(data.slots || []);
    });
  }

  getAppointments(): Observable<any[]> {
    return this.appointments$.asObservable();
  }

  getSlots(): Observable<any[]> {
    return this.slots$.asObservable();
  }

  addSlot(slot: any) {
    const current = this.slots$.getValue();
    this.slots$.next([...current, { id: current.length + 1, ...slot }]);
  }

  addAppointment(appointment: any) {
    const current = this.appointments$.getValue();
    this.appointments$.next([...current, { id: current.length + 1, ...appointment }]);
  }
}
// This service is responsible for managing appointments and slots.
// It loads initial data from a JSON file and provides methods to get, add, and update appointments and slots.
// The appointments and slots are stored in BehaviorSubjects, allowing components to subscribe to changes.
// The service uses HttpClient to fetch data from a local JSON file.
// The addSlot and addAppointment methods update the respective BehaviorSubjects with new data.
// This allows components to reactively update their views when new slots or appointments are added.
