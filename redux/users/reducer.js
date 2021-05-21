import {SET_USER, SET_USERS} from "./types";

const initialState = {
    users: [],
    user: {}
};
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default reducer;