import {
  takeEvery, all, select, call,
} from 'redux-saga/effects';
import { saveState } from 'store/persistence/engine';
import { authLoginAction, authLogoutAction } from 'store/auth/auth.reducer';
import { AppState } from 'store/types';

export function* save() {
  const state: AppState = yield select();

  yield call(saveState, state);
}

export function* persistenceSagas() {
  yield all([
    takeEvery(authLoginAction.success, save),
    takeEvery(authLoginAction.failure, save),
    takeEvery(authLogoutAction.success, save),
    takeEvery(authLogoutAction.failure, save),
  ]);
}
