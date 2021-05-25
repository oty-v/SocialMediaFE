import Cookie from "js-cookie";

import {AUTHENTICATE, DEAUTHENTICATE} from "./types";
import {getProfile, loginUser, logoutUser, registerUser} from "../../api/auth";
import {axiosController} from "../../lib/axiosController";

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

export const getProfileAsync = () => {
    return async (dispatch) => {
        const {data: {data: user}} = await getProfile();
        dispatch(authenticateAction(user));
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