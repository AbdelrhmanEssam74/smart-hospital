export interface DoctorAppointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  payment_status: 'paid' | 'unpaid' | 'refunded';
  notes: string;
  patient: {
    id: number;
    user_id: number;
    medical_record_number: string;
    date_of_birth: string;
    gender: string;
    phone: string;
    user: {
      id: number;
      name: string;
      phone: string | null;
      image: string | null;
      created_at: string;
    };
  };
}
