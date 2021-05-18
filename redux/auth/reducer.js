import {AUTHENTICATE, DEAUTHENTICATE} from "./types";


const initialState = {
    isLoggedIn: false,
    user: {}
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DEAUTHENTICATE:
            return {
                isLoggedIn: false,
                user: {}
            };
        case AUTHENTICATE:
            return {
                isLoggedIn: true,
                user: action.payload
            };
        default:
            return state;
    }
};

export default reducer;