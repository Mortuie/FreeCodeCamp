import * as Types from './Types';
import axios from 'axios';
import { BASE } from '../Constants';

function loginAttempt() {
    return {
        type: Types.LOGIN_ATTEMPT,
    };
}

function loginSuccess(user) {
    return {
        type: Types.LOGIN_SUCCESS,
        user
    };
}

function loginError(error) {
    return {
        type: Types.LOGIN_ERROR,
        error
    };
}

export function register(email, password) {
    return function(dispatch) {
        dispatch(loginAttempt());

        return axios.post(BASE + '/auth/register', {
            email,
            password
        })
        .then(res => dispatch(loginSuccess(res.data)))
        .catch(err => dispatch(loginError(err)));
    };
}