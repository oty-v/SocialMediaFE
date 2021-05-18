import {SET_USERS} from "./types";


const reducer = (state=[], action) => {
    switch (action.type) {
        case SET_USERS:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;