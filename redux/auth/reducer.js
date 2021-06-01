import {AUTHENTICATE, DEAUTHENTICATE, UPDATE_PROFILE} from "./types";


const initialState = {
    isLoggedIn: false,
    profile: {}
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DEAUTHENTICATE:
            return {
                isLoggedIn: false,
                profile: {}
            };
        case AUTHENTICATE:
            return {
                isLoggedIn: true,
                profile: action.payload
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }
};

export default reducer;