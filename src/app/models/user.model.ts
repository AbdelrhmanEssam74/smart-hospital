export interface User {
    id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string; // 'patient' or 'doctor'

}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
