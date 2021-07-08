import Cookie from "js-cookie";

import {createAction} from 'redux-smart-actions';

export const register = createAction('AUTHENTICATE', (userData) => ({
    request: {
        url: `/register`,
        method: 'post',
        data: {...userData},
    },
    meta: {
        getData: data => {
            const accessToken = data.data.access_token;
            Cookie.set("token", accessToken)
            return {accessToken}
        },
    },
}));

export const login = createAction('AUTHENTICATE', (credentials) => ({
    request: {
        url: `/login`,
        method: 'post',
        data: {...credentials},
    },
    meta: {
        getData: data => {
            const accessToken = data.data.access_token;
            Cookie.set("token", accessToken)
            return {accessToken}
        },
    },
}));

export const logout = createAction('DEAUTHENTICATE', () => ({
    request: {
        url: `/logout`,
        method: 'post',
    },
    meta: {
        onSuccess: (response) => {
            Cookie.remove("token");
            return response;
        },
    },
}));

export const fetchProfile = createAction('FETCH_PROFILE', () => ({
    request: {
        url: `/profile`,
    },
    meta: {
        getData: data => data.data,
    },
}));

export const updateProfile = createAction('UPDATE_PROFILE', (profileId, profileData) => ({
    request: {
        url: `/profiles/${profileId}`,
        method: 'post',
        data: profileData,
    },
    meta: {
        mutations: {
            [fetchProfile]: (data, mutationData) => mutationData,
        },
    },
}));