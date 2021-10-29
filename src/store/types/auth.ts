import { OrgRole } from 'core/api/roles';

export interface AuthState {
  authCheckCompleted: boolean;
  authenticated: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  pending: boolean;
  org: {
    id: string;
    name: string;
    role: OrgRole;
  },
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LogoutPayload {
  email: string;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
}
