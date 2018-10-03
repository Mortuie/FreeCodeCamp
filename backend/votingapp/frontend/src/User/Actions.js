import * as Types from './Types';
import axios from 'axios';
import { BASE } from '../Constants';

function attempt() {
    return {
        type: Types.ATTEMPT,
    };
}

function success(user) {
    return {
        type: Types.SUCCESS,
    };
}

function error(error) {
    return {
        type: Types.ERROR,
        error: error.response.data.message
    };
}


function logout() {
    return {
        type: Types.LOGOUT,
    }
}

export function register(email, password) {
    return function(dispatch) {
        dispatch(attempt());

        return axios.post(BASE + '/auth/register', {
            email,
            password
        })
        .then(res => dispatch(success(res.data.user)))
        .catch(err => dispatch(error(err)));
    };
}