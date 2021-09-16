import { AxiosResponse } from 'axios';
import { Api, ENDPOINTS } from 'core/api';
import {
  GetProfileResponse,
  RefreshSessionResponse,
  RequestBody,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateProfileRequest,
} from './types';

export const refreshSession = () => Api.post<RequestBody, AxiosResponse<RefreshSessionResponse>>(
  Auth.RefreshSession, {},
);

const { Auth } = ENDPOINTS;

export const signIn = ({ email, password }: SignInRequest) => Api
  .post<SignInRequest, AxiosResponse<SignInResponse>>(Auth.SignIn, { email, password });

export const signUp = ({ email, firstName, lastName }: SignUpRequest) => Api
  .post<SignUpRequest, SignUpResponse>(
    Auth.SignUp, { email, password: '', firstName, lastName },
  );

export const signOut = () => Api.post<RequestBody>(Auth.SignOut, {});

export const getProfile = () => Api
  .post<RequestBody, AxiosResponse<GetProfileResponse>>(Auth.GetProfile, {});

export const updateProfile = ({ firstName, lastName }: UpdateProfileRequest) => Api
  .post<UpdateProfileRequest>(Auth.UpdateProfile, { firstName, lastName });
