import * as Types from './Types';
import axios from 'axios';
import { BASE } from '../Constants';

function attempt() {
    return {
        type: Types.ATTEMPT,
    };
}

function success() {
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


function logoutHelper() {
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
        .then(res => dispatch(success()))
        .catch(err => dispatch(error(err)));
    };
}

export function login(email, password) {
    return function(dispatch) {
        dispatch(attempt());

        return axios.post(BASE + '/auth/login', {
            email,
            password
        })
        .then(res => dispatch(success()))
        .catch(err => dispatch(error(err)));
    }
}


export function logout() {
  return function(dispatch) {
    dispatch(attempt());

    return axios.get(BASE + '/auth/logout')
      .then(res => dispatch(logoutHelper()))
      .catch(err => dispatch(error(err)));

  }
}