import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor() { }
   private data = {
    doctors: [
      { id: 1, user_id: 1, specialty_id: 1, license_number: 'LIC001', years_of_experience: 10 },
      { id: 2, user_id: 2, specialty_id: 2, license_number: 'LIC002', years_of_experience: 8 },
      { id: 3, user_id: 3, specialty_id: 3, license_number: 'LIC003', years_of_experience: 5 },
      { id: 4, user_id: 4, specialty_id: 4, license_number: 'LIC004', years_of_experience: 12 },
      { id: 5, user_id: 5, specialty_id: 5, license_number: 'LIC005', years_of_experience: 7 },
      { id: 6, user_id: 6, specialty_id: 1, license_number: 'LIC006', years_of_experience: 15 },
      { id: 7, user_id: 7, specialty_id: 2, license_number: 'LIC007', years_of_experience: 6 },
      { id: 8, user_id: 8, specialty_id: 3, license_number: 'LIC008', years_of_experience: 9 },
      { id: 9, user_id: 9, specialty_id: 4, license_number: 'LIC009', years_of_experience: 11 },
      { id: 10, user_id: 10, specialty_id: 5, license_number: 'LIC010', years_of_experience: 4 }
    ],
    users: [
      {
        id: 1,
        name: 'Dr. Nada Smith',
        email: 'nada.smith@example.com',
        phone: '123-456-7890',
        image: 'assets/images/doctors/doctor1.jpg',
        profile_description: 'Experienced cardiologist with over 10 years in patient care.'
      },
      {
        id: 2,
        name: 'Dr. Emily Johnson',
        email: 'emily.johnson@example.com',
        phone: '234-567-8901',
        image: 'assets/images/doctors/doctor2.jpg',
        profile_description: 'Specialist in dermatology with focus on chronic skin conditions.'
      },
      {
        id: 3,
        name: 'Dr. Michael Brown',
        email: 'michael.brown@example.com',
        phone: '345-678-9012',
        image: 'assets/images/doctors/doctor3.webp',
        profile_description: 'Neurologist with experience in treating complex neurological disorders.'
      },
      {
        id: 4,
        name: 'Dr. Sarah Davis',
        email: 'sarah.davis@example.com',
        phone: '456-789-0123',
        image: 'assets/images/doctors/doctor4.webp',
        profile_description: 'Pediatrician passionate about child health and wellness.'
      },
      {
        id: 5,
        name: 'Dr. William Wilson',
        email: 'william.wilson@example.com',
        phone: '567-890-1234',
        image: 'assets/images/doctors/doctor5.webp',
        profile_description: 'Oncology expert with a focus on patient-centered care.'
      },
      {
        id: 6,
        name: 'Dr. Linda Martinez',
        email: 'linda.martinez@example.com',
        phone: '678-901-2345',
        image: 'assets/images/doctors/doctor6.webp',
        profile_description: 'Cardiologist with a heart for community healthcare.'
      },
      {
        id: 7,
        name: 'Dr. James Anderson',
        email: 'james.anderson@example.com',
        phone: '789-012-3456',
        image: 'assets/images/doctors/doctor7.webp',
        profile_description: 'Dermatologist with a decade of experience in cosmetic procedures.'
      },
      {
        id: 8,
        name: 'Dr. Barbara Thomas',
        email: 'barbara.thomas@example.com',
        phone: '890-123-4567',
        image: 'assets/images/doctors/doctor8.webp',
        profile_description: 'Neurologist who values accurate diagnostics and empathetic care.'
      },
      {
        id: 9,
        name: 'Dr. Christopher Taylor',
        email: 'christopher.taylor@example.com',
        phone: '901-234-5678',
        image: 'assets/images/doctors/doctor9.jpg',
        profile_description: 'Pediatric expert with a child-first approach to medicine.'
      },
      {
        id: 10,
        name: 'Dr. Patricia Moore',
        email: 'patricia.moore@example.com',
        phone: '012-345-6789',
        image: 'assets/images/doctors/doctor10.webp',
        profile_description: 'Oncologist driven by innovation and compassion.'
      }
    ],
    specialties: [
      { id: 1, name: 'Cardiology' },
      { id: 2, name: 'Dermatology' },
      { id: 3, name: 'Neurology' },
      { id: 4, name: 'Pediatrics' },
      { id: 5, name: 'Oncology' }
    ]
  };

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
    });
  }
}
