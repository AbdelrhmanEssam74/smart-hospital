export interface User {
  id: number;
  name:string;
  email : string,
  phone:string,
  image:string,
  profile_description: string,
  email_verified_at: string,
  role: {
    id: number;
    name: string;
  };
    created_at: string,
  updated_at: string
}

