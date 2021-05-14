import {STORE_COMMENTS_LIST} from "../actions/ActionConstants";


const commentsListReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_COMMENTS_LIST:
            return action.payload;
        default:
            return state;
    }
};

export default commentsListReducer;