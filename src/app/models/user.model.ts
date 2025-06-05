export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
