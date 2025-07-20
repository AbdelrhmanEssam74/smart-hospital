export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; 
  role_id: number; 
  role?: {       
    id: number;
    name: string;
  };
  address?: string;
  phone?: string
  gender?: string;
  date_of_birth?: string | Date;
  profile_description?: string;
  image?: string;
}