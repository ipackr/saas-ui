import {
  all, put, call, takeLatest, StrictEffect,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { logger } from '@percona/platform-core';
import {
  signIn, signUp, signOut, getProfile, updateProfile, refreshSession,
} from 'core/api/auth';
import {
  GetProfileResponse,
  RefreshSessionResponse,
  RequestError,
  SignInResponse,
  SignUpResponse,
} from 'core/api/types';
import { Messages } from 'core/api/messages';
import { toast } from 'react-toastify';
import { Routes } from 'core/routes';
import { history } from 'core/history';
import { HTTP_STATUS } from 'core/api';
import {
  authRefreshAction,
  authLoginAction,
  authSignupAction,
  authLogoutAction,
  authGetProfileAction,
  authUpdateProfileAction,
} from './auth.reducer';

// Refresh Session

type AuthRefreshSessionRequestGenerator = Generator<
  StrictEffect, void, AxiosResponse<RefreshSessionResponse>
>;

export function* authRefreshSessionRequest(): AuthRefreshSessionRequestGenerator {
  try {
    const { data } = yield call(refreshSession);

    yield put(authRefreshAction.success({ email: data.email }));
  } catch (e: any) {
    logger.error(e.message || e);

    yield put(authRefreshAction.failure(e as RequestError));
  }
}

// Login

type AuthLoginActionRequest = ReturnType<typeof authLoginAction.request>;
type AuthLoginRequestGenerator = Generator<StrictEffect, void, SignInResponse>;

export function* authLoginRequest(action: AuthLoginActionRequest): AuthLoginRequestGenerator {
  try {
    yield call(signIn, action.payload);

    yield put(authLoginAction.success({ email: action.payload.email }));
  } catch (e) {
    yield put(authLoginAction.failure(e as RequestError));
  }
}

type AuthLoginActionFailure = ReturnType<typeof authLoginAction.failure>;
type AuthLoginFailureGenerator = Generator<StrictEffect, void, never>;

export function* authLoginFailure(action: AuthLoginActionFailure): AuthLoginFailureGenerator {
  if (action.payload.code === HTTP_STATUS.UNAUTHORIZED) {
    yield call([toast, toast.error], action.payload.message);
  } else {
    yield call([toast, toast.error], Messages.signInFailed);
    console.error(action.payload);
  }
}

type AuthLoginActionSuccess = ReturnType<typeof authLoginAction.success>;
type AuthLoginSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authLoginSuccess(action: AuthLoginActionSuccess): AuthLoginSuccessGenerator {
  yield call([toast, toast.success], `${Messages.signInSucceeded} ${action.payload.email}`);
  history.replace(Routes.root);
}

// Signup

type AuthSignupActionRequest = ReturnType<typeof authSignupAction.request>;
type AuthSignupRequestGenerator = Generator<StrictEffect, void, SignUpResponse>;

export function* authSignupRequest(action: AuthSignupActionRequest): AuthSignupRequestGenerator {
  try {
    yield call(signUp, action.payload);

    yield put(authSignupAction.success());
  } catch (e) {
    yield put(authSignupAction.failure(e as RequestError));
  }
}

type AuthSignupActionFailure = ReturnType<typeof authSignupAction.failure>;
type AuthSignupFailureGenerator = Generator<StrictEffect, void, never>;

export function* authSignupFailure(action: AuthSignupActionFailure): AuthSignupFailureGenerator {
  yield call([toast, toast.error], Messages.signUpFailed);
  console.error(action.payload);
}

type AuthSignupSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authSignupSuccess(): AuthSignupSuccessGenerator {
  yield call([toast, toast.success], Messages.signUpSucceeded);
  history.replace(Routes.login);
}

// Logout

type AuthLogoutRequestGenerator = Generator<StrictEffect, void, never>;

export function* authLogoutRequest(): AuthLogoutRequestGenerator {
  try {
    yield call(signOut);

    yield put(authLogoutAction.success());
  } catch (e) {
    yield put(authLogoutAction.failure(e as RequestError));
  }
}

type AuthLogoutActionFailure = ReturnType<typeof authLogoutAction.failure>;
type AuthLogoutFailureGenerator = Generator<StrictEffect, void, never>;

export function* authLogoutFailure(action: AuthLogoutActionFailure): AuthLogoutFailureGenerator {
  yield call([toast, toast.error], Messages.signOutFailed);
  console.error(action.payload);
}

type AuthLogoutSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authLogoutSuccess(): AuthLogoutSuccessGenerator {
  yield call([toast, toast.success], Messages.signOutSucceeded);
  history.replace(Routes.root);
}

// Get Profile

type AuthGetProfileRequestGenerator = Generator<StrictEffect, void, AxiosResponse<GetProfileResponse>>;

export function* authGetProfileRequest(): AuthGetProfileRequestGenerator {
  try {
    const { data } = yield call(getProfile);

    yield put(authGetProfileAction.success({
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
    }));
  } catch (e) {
    yield put(authGetProfileAction.failure(e as RequestError));
  }
}

type AuthGetProfileActionFailure = ReturnType<typeof authGetProfileAction.failure>;
type AuthGetProfileFailureGenerator = Generator<StrictEffect, void, never>;

export function* authGetProfileFailure(action: AuthGetProfileActionFailure):
AuthGetProfileFailureGenerator {
  yield call([toast, toast.error], Messages.genericAPIFailure);
  console.error(action.payload);
  history.replace(Routes.root);
}

// Update Profile

type AuthUpdateProfileActionRequest = ReturnType<typeof authUpdateProfileAction.request>;
type AuthUpdateProfileRequestGenerator = Generator<StrictEffect, void, Response>;

export function* authUpdateProfileRequest(
  action: AuthUpdateProfileActionRequest): AuthUpdateProfileRequestGenerator {
  try {
    yield call(updateProfile, action.payload);

    yield put(authUpdateProfileAction.success());
  } catch (e) {
    yield put(authUpdateProfileAction.failure(e as RequestError));
  }
}

type AuthUpdateProfileActionFailure = ReturnType<typeof authUpdateProfileAction.failure>;
type AuthUpdateProfileFailureGenerator = Generator<StrictEffect, void, never>;

export function* authUpdateProfileFailure(action: AuthUpdateProfileActionFailure):
AuthUpdateProfileFailureGenerator {
  if (action.payload.code === HTTP_STATUS.BAD_REQUEST) {
    yield call([toast, toast.error], action.payload.message);
  } else {
    yield call([toast, toast.error], Messages.genericAPIFailure);
    console.error(action.payload);
  }
}

type AuthUpdateProfileSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authUpdateProfileSuccess(): AuthUpdateProfileSuccessGenerator {
  yield call([toast, toast.success], Messages.updateProfileSucceeded);
}

export function* authSagas() {
  yield all([
    takeLatest(authRefreshAction.request, authRefreshSessionRequest),
    takeLatest(authLoginAction.request, authLoginRequest),
    takeLatest(authLoginAction.success, authLoginSuccess),
    takeLatest(authLoginAction.failure, authLoginFailure),
    takeLatest(authSignupAction.request, authSignupRequest),
    takeLatest(authSignupAction.success, authSignupSuccess),
    takeLatest(authSignupAction.failure, authSignupFailure),
    takeLatest(authLogoutAction.request, authLogoutRequest),
    takeLatest(authLogoutAction.success, authLogoutSuccess),
    takeLatest(authLogoutAction.failure, authLogoutFailure),
    takeLatest(authGetProfileAction.request, authGetProfileRequest),
    takeLatest(authGetProfileAction.failure, authGetProfileFailure),
    takeLatest(authUpdateProfileAction.request, authUpdateProfileRequest),
    takeLatest(authUpdateProfileAction.failure, authUpdateProfileFailure),
    takeLatest(authUpdateProfileAction.success, authUpdateProfileSuccess),
  ]);
}
