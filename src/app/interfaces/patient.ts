export interface Patient {
  id: number;
  user_id:number;
  medical_record_number: string;
  gender: string;
  address: string;
  phone: string;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}
