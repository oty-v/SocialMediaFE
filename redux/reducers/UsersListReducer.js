import {STORE_USERS_LIST} from "../actions/ActionConstants";


const usersListReducer = (state=[], action) => {
    switch (action.type) {
        case STORE_USERS_LIST:
            return action.payload;
        default:
            return state;
    }
};

export default usersListReducer;