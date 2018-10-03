import * as Types from './Types';

const initialState = {
  user: false,
  attempting: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ATTEMPT:
      return {
        ...state,
        attempting: true,
        user: false,
        error: '',
      };
    case Types.ERROR:
      return {
        ...state,
        attempting: false,
        user: false,
        error: action.error,
      };
    case Types.SUCCESS:
      return {
        ...state,
        attempting: false,
        error: '',
        user: true,
      };
    case Types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}