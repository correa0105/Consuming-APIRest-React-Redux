import * as typesActions from '../typesActions';

import axios from '../../../services/axios';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: false,
  user: {},
};

export default function reducer(state = initialState, action = null) {
  switch (action.type) {
    case typesActions.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case typesActions.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }

    case typesActions.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }

    case typesActions.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case typesActions.REGISTER_UPDATED_SUCCESS: {
      const newState = { ...state };
      newState.user.fullname = action.payload.fullname;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case typesActions.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case typesActions.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}
