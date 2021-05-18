import {AUTHENTICATE, DEAUTHENTICATE} from "./types";

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