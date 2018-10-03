import * as Types from './Types';

const initialState = {
  user: {},
  attempting: false,
  error: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_ATTEMPT:
      return {
        ...state,
        attempting: true,
      };
    case Types.LOGIN_ERROR:
      return {
        ...state,
        attempting: false,
        error: action.error,
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        attempting: false,
        error: {},
        user: action.user,
      };
    case Types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}