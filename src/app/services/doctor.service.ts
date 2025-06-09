import { Injectable } from '@angular/core';
import { Doctor } from '../interfaces/doctor';
import data from '../../data/data.json';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private data = data;
  private doctors: Doctor[] = [];

  constructor() { 
    this.getDoctors();
  }
  
  getDoctors() {
   return this.data.doctors.map((doctor) => {
      const user = this.data.users.find(u => u.id === doctor.user_id);
      const specialty = this.data.specialties.find(s => s.id === doctor.specialty_id);

      return {
    id: doctor.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        image: user?.image,
        profile_description: user?.profile_description, 
        specialty: specialty?.name,
        license_number: doctor.license_number,
        years_of_experience: doctor.years_of_experience,
      };
    
      })
      

}
  getAllDoctors(): Doctor[] {
    return this.doctors;
  }
   searchDoctors(nameTerm: string, specialtyTerm: string): Doctor[] {
    return this.doctors.filter(doctor => {
      const nameMatch = !nameTerm || 
        doctor.user?.name.toLowerCase().includes(nameTerm.toLowerCase());
      const specialtyMatch = !specialtyTerm || 
        doctor.specialty?.name.toLowerCase().includes(specialtyTerm.toLowerCase());
      return nameMatch  ||specialtyMatch;
    });
  }
}