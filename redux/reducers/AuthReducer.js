import {AUTHENTICATE, DEAUTHENTICATE} from "../actions/ActionConstants";


const initialState = {
    isLoggedIn: false,
    user: {}
}


const authReducer = (state = initialState, action) => {
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

export default authReducer;