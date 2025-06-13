export interface Appointment {
  patient_id: string;
  patientName: string;
  doctor_id: string;
  gender: string;
  date: string;
  email: string;
  phone: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  message: string;
}

/**
 * {
 *     "userId": 1
 *     "name": "abdo",
 *     "doctorId": 9,
 *     "gender": "Male",
 *     "date": "2025-06-14",
 *     "time": "17:52",
 *     "message": "",
 * }
 */
