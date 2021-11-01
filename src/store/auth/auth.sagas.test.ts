import { runSaga, Saga } from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import { Messages } from 'core/api/messages';

import * as authApi from 'core/api/auth';
import { toast } from 'react-toastify';
import {
  GetProfileResponse, RequestError,
} from 'core/api/types';
import { HTTP_STATUS } from 'core/api';
import { AxiosResponse } from 'axios';
import {
  authSagas,
  authGetProfileRequest,
  authGetProfileFailure,
  authUpdateProfileRequest,
  authUpdateProfileSuccess,
  authUpdateProfileFailure,
} from './auth.sagas';
import {
  authGetProfileAction,
  authUpdateProfileAction,
} from './auth.reducer';

const TEST_EMAIL = 'test@test.test';
const TEST_MESSAGE = 'test';
const TEST_FIRST_NAME = 'Firstname';
const TEST_LAST_NAME = 'Lastname';

type Action = PayloadAction<string, any>;

let consoleError: jest.SpyInstance;
let toastError: jest.SpyInstance;
let toastSuccess: jest.SpyInstance;
let dispatchedActions: Action[];

const runSagaPromise = (saga: Saga, payload?: any) => runSaga({
  dispatch: (action: Action) => {
    dispatchedActions.push(action);
  },
}, saga, { payload }).toPromise();

describe('Auth Sagas', () => {
  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    toastError = jest.spyOn(toast, 'error');
    toastSuccess = jest.spyOn(toast, 'success');
    dispatchedActions = [];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  xtest('authSagas calls the right function on auth actions', () => {
    const genObj = authSagas();
    const expected = all([
      takeLatest(authGetProfileAction.request, authGetProfileRequest),
      takeLatest(authGetProfileAction.failure, authGetProfileFailure),
      takeLatest(authUpdateProfileAction.request, authUpdateProfileRequest),
      takeLatest(authUpdateProfileAction.failure, authUpdateProfileFailure),
      takeLatest(authUpdateProfileAction.success, authUpdateProfileSuccess),
    ]);

    expect(genObj.next().value).toEqual(expected);
  });

  test('authSagas should be done on next iteration', () => {
    const genObj = authSagas();

    genObj.next();
    expect(genObj.next().done).toBe(true);
  });

  test('authGetProfileRequest succeeds', async () => {
    const getProfile = jest.spyOn(authApi, 'getProfile').mockImplementation(() => Promise.resolve(
      {
        data: {
          email: 'test@test.test',
          first_name: 'Firstname',
          last_name: 'test@test.test',
        },
      } as AxiosResponse<GetProfileResponse>,
    ));

    await runSagaPromise(authGetProfileRequest as Saga);

    expect(dispatchedActions).toEqual([authGetProfileAction.success({
      email: 'test@test.test',
      firstName: 'Firstname',
      lastName: 'test@test.test',
    })]);

    expect(getProfile).toHaveBeenCalledTimes(1);

    getProfile.mockRestore();
  });

  test('authGetProfileRequest fails', async () => {
    const error = { code: HTTP_STATUS.NOT_FOUND };

    const getProfile = jest.spyOn(authApi, 'getProfile').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authGetProfileRequest as Saga);

    expect(dispatchedActions).toEqual([authGetProfileAction.failure(error as RequestError)]);
    expect(getProfile).toHaveBeenCalledTimes(1);

    getProfile.mockRestore();
  });

  test('authGetProfileFailure', async () => {
    await runSagaPromise(authGetProfileFailure as Saga, TEST_MESSAGE);

    expect(toastError).toBeCalledTimes(1);
    expect(toastError).toBeCalledWith(Messages.genericAPIFailure);
    expect(consoleError).toBeCalledTimes(1);
    expect(consoleError).toBeCalledWith(TEST_MESSAGE);
  });

  test('authUpdateProfileRequest succeeds', async () => {
    const updateProfile = jest.spyOn(authApi, 'updateProfile').mockImplementation(() => Promise.resolve({} as AxiosResponse));

    await runSagaPromise(authUpdateProfileRequest as Saga, {
      firstName: TEST_FIRST_NAME,
      lastName: TEST_LAST_NAME,
    });

    expect(dispatchedActions).toEqual([authUpdateProfileAction.success()]);

    expect(updateProfile).toHaveBeenCalledWith({ firstName: TEST_FIRST_NAME, lastName: TEST_LAST_NAME });
    expect(updateProfile).toHaveBeenCalledTimes(1);

    updateProfile.mockRestore();
  });

  test('authUpdateProfileRequest fails', async () => {
    const error = { code: HTTP_STATUS.BAD_REQUEST };
    const updateProfile = jest.spyOn(authApi, 'updateProfile').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authUpdateProfileRequest as Saga, { email: TEST_EMAIL });

    expect(dispatchedActions).toEqual([authUpdateProfileAction.failure(error as RequestError)]);

    expect(updateProfile).toHaveBeenCalledTimes(1);

    updateProfile.mockRestore();
  });

  test('authUpdateProfileFailure (invalid argument)', async () => {
    await runSagaPromise(
      authUpdateProfileFailure as Saga,
      { code: HTTP_STATUS.BAD_REQUEST, message: TEST_MESSAGE },
    );

    expect(dispatchedActions).toEqual([]);
    expect(toastError).toHaveBeenCalledWith(TEST_MESSAGE);
    expect(toastError).toHaveBeenCalledTimes(1);
  });

  test('authUpdateProfileFailure (generic error)', async () => {
    const error = { code: HTTP_STATUS.INTERNAL_SERVER_ERROR };

    await runSagaPromise(authUpdateProfileFailure as Saga, { code: HTTP_STATUS.INTERNAL_SERVER_ERROR });

    expect(dispatchedActions).toEqual([]);
    expect(toastError).toHaveBeenCalledWith(Messages.genericAPIFailure);
    expect(toastError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  test('authUpdateProfileSuccess', async () => {
    await runSagaPromise(authUpdateProfileSuccess as Saga);

    expect(toastSuccess).toBeCalledTimes(1);
    expect(toastSuccess).toBeCalledWith(Messages.updateProfileSucceeded);
  });
});
