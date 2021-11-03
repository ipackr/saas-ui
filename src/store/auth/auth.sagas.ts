import {
  all, put, call, takeLatest, StrictEffect,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { signIn, getProfile, updateProfile } from 'core/api/auth';
import {
  GetProfileResponse,
  RequestError,
  SearchOrganizationMembersResponse,
  SearchOrganizationsResponse,
  SignInResponse,
} from 'core/api/types';
import { Messages } from 'core/api/messages';
import { toast } from 'react-toastify';
import { Routes, history } from 'core';
import { HTTP_STATUS } from 'core/api';
import { searchOrgs, searchOrgMembers } from 'core/api/orgs';
import {
  authLoginAction,
  authLogoutAction,
  authGetProfileAction,
  authUpdateProfileAction,
} from './auth.reducer';

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

// Logout

type AuthLogoutRequestGenerator = Generator<StrictEffect, void, never>;

export function* authLogoutRequest(): AuthLogoutRequestGenerator {
  try {
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

type UserOrgsRequest = [AxiosResponse<GetProfileResponse>, AxiosResponse<SearchOrganizationsResponse>];
type UsersRequest = AxiosResponse<SearchOrganizationMembersResponse>;

export function* authGetProfileRequest() {
  try {
    const [ { data: profileData }, { data: orgData }]: UserOrgsRequest =
      yield all([call(getProfile), call(searchOrgs)]);
    const { email, first_name, last_name } = profileData;
    // We are assuming one org per user, as for now
    const [ { id: orgId = '', name: orgName} ] = orgData.orgs || [];

    const { data: memberData }: UsersRequest = yield call(searchOrgMembers, orgId);
    const ownUser = (memberData.members || []).find((member) => member.username === email);

    yield put(authGetProfileAction.success({
      email,
      firstName: first_name,
      lastName: last_name,
      org: {
        id: orgId,
        name: orgName,
        role: ownUser ? ownUser.role : '',
      },
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
    takeLatest(authLoginAction.request, authLoginRequest),
    takeLatest(authLoginAction.success, authLoginSuccess),
    takeLatest(authLoginAction.failure, authLoginFailure),
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
