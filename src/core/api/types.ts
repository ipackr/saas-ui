export interface RequestBody {
  [key: string]: any;
}

export interface RequestError {
  code: number;
  message: string;
}
export interface RefreshSessionResponse {
  email: string;
  expireTime?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  sessionId: string;
  expireTime?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignUpResponse {
  sessionId: string;
  expireTime?: string;
}

export interface GetProfileResponse {
  email: string;
  first_name: string;
  last_name: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export type SignUp = ({ email, firstName, lastName, password }: SignUpRequest) =>
  Promise<SignUpResponse>;

export type GetProfile = () => Promise<GetProfileResponse>;

export type UpdateProfile = ({ firstName, lastName }: UpdateProfileRequest) =>
  Promise<Response>;
