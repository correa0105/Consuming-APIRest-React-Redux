import * as typesActions from '../typesActions';

export function loginRequest(payload) {
  return {
    type: typesActions.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: typesActions.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: typesActions.LOGIN_FAILURE,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: typesActions.REGISTER_REQUEST,
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: typesActions.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: typesActions.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: typesActions.REGISTER_FAILURE,
    payload,
  };
}
