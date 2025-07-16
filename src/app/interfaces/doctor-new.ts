export interface DoctorNew {
  user_id: number;
  specialty_id: number;
  appointment_fee:string,
  experience_years: number;
  specialty: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    role_id: number;
    name: string;
    email: string | null;
    phone: string | null;
    image: string | null;
    profile_description: string | null;
    role: {
      id: number;
      name: string;
      created_at: string | null;
      updated_at: string | null;
    };
  };
}
