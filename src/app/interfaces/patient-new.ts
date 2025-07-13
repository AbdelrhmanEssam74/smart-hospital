export interface PatientUser {
  id: number;
  name: string;
  email: string;
  image: string | null;
}

export interface PatientNew {
  id: number;
  user_id: number;
  medical_record_number: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  user: PatientUser;
}
export interface DoctorPatientRelation {
  doctor_id: number;
  patient_id: number;
  patient: PatientNew;
}
