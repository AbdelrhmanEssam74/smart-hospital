import { Injectable } from '@angular/core';
import data from '../../data/data.json';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private data = data;

  constructor() { }

    getPatients(): Patient[] {
    return this.data.patients.map(patient => {
      const user = patient.user_id ? this.data.users.find(u => u.id === patient.user_id) : null;
       
      return {
        ...patient,
        user: user ? {
          name: user.name,
          email: user.email,
          image: user.image,
          profile_description: user.profile_description
        } : undefined
      };
    });
  }
}
