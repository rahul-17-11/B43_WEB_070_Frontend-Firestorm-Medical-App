import { takeLatest, put, call } from 'redux-saga/effects';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { loginStart, signupStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { User } from '../../types';

function* handleLogin(action: ReturnType<typeof loginStart>) {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );
    const user: User = {
      id: userCredential.user.uid,
      email: userCredential.user.email!,
      name: userCredential.user.displayName || 'User',
      role: 'user',
    };
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

function* handleSignup(action: ReturnType<typeof signupStart>) {
  try {
    const { email, password, name } = action.payload;
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    const user: User = {
      id: userCredential.user.uid,
      email: userCredential.user.email!,
      name: name,
      role: 'user',
    };
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

function* handleLogout() {
  try {
    yield call(signOut, auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export function* watchAuth() {
  yield takeLatest(loginStart.type, handleLogin);
  yield takeLatest(signupStart.type, handleSignup);
  yield takeLatest(logout.type, handleLogout);
}