import Cookie from "js-cookie";

import {AUTHENTICATE, DEAUTHENTICATE, UPDATE_PROFILE} from "./types";
import {getProfile, editProfile, loginUser, logoutUser, registerUser} from "../../api/auth";
import {axiosController} from "../../lib/axiosController";
import { createAction } from 'redux-smart-actions';

export const authenticateAction = (user) => {
    return {
        type: AUTHENTICATE,
        payload: user
    };
};

export const deAuthenticateAction = () => {
    return {
        type: DEAUTHENTICATE,
    };
};

export const updateProfile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        payload: profile
    }
}

export const getProfileAsync = () => {
    return async (dispatch) => {
        const {data: {data: user}} = await getProfile();
        dispatch(authenticateAction(user));
    }
}

export const updateProfileAsync = (profileId, updateData) => {
    return async (dispatch) => {
        const {data: {data: profile}} = await editProfile(profileId, updateData);
        dispatch(updateProfile(profile));
    }
}

export const login = (credentials) => {
    return async (dispatch) => {
        const {data: {data: {access_token: accessToken}}} = await loginUser(credentials);
        Cookie.set("token", accessToken);
        axiosController.setToken(accessToken);
        dispatch(getProfileAsync());
    }
}

export const register = (userData) => {
    return async (dispatch) => {
        const {data: {data: {access_token: accessToken}}} = await registerUser(userData);
        Cookie.set("token", accessToken);
        axiosController.setToken(accessToken);
        dispatch(getProfileAsync());
    }
}

export const logout = () => {
    return async (dispatch) => {
        await logoutUser();
        Cookie.remove("token");
        dispatch(deAuthenticateAction());
    }
}


export const fetchProfile = createAction('FETCH_PROFILE', () => ({
    request: {
        url: `/profile`,
    },
    meta: {
    getData: data => ({
        ...data.data,
    }),
},
}));