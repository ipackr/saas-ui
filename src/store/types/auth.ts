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
    role?: string;
  },
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
}
