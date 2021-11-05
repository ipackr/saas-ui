export interface AuthState {
  authCheckCompleted: boolean;
  authenticated: boolean;
  freshData: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  pending: boolean;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
}
