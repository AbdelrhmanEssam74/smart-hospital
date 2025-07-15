export interface Appointment {
  id?: number;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  message?: string;
  appointment_fee?: number;
}