// interfaces/doctor.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  profile_description: string;
}

export interface Specialty {
  id: number;
  name: string;
}


export interface Doctor {
  id: number;
  user_id: number;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  profile_description?: string;
  specialty_id: number;
  license_number: string;
  years_of_experience: number;
  created_at: string;
  updated_at: string;
  user?: User;
  specialty?: Specialty;
}

export interface DoctorDisplay {
  id: number;
  user_id: number;
  name?: string;
  gender?:string;
  email?: string;
  phone?: string;
  image?: string;
  profile_description?: string;
  specialty?: string;
  license_number: string;
  years_of_experience: number;
}
