export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at: string | null;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface MeResponse {
  user: User;
}
