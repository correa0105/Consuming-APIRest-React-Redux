import { call, all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../../services/axios';
import * as typesActions from '../typesActions';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);

    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    toast.success('Login realizado com sucesso!');
    payload.prevPath();
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);

    errors.map((error) => toast.error(error));
    yield put(actions.loginFailure());
  }
}

function* registerRequest({ payload }) {
  const { id, fullname, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        fullname,
        password: password || undefined,
      });

      toast.success('Dados alterados com sucesso!');
      yield put(actions.registerUpdatedSuccess({ fullname, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        fullname,
        password: password || undefined,
      });

      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess(), payload.loginPage());
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      payload.loginPage();
      return yield put(actions.loginFailure());
    }

    errors.map((error) => toast.error(error));
    yield put(actions.registerFailure());
  }

  return null;
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(typesActions.LOGIN_REQUEST, loginRequest),
  takeLatest(typesActions.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(typesActions.REGISTER_REQUEST, registerRequest),
]);
