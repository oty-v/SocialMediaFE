import {STORE_POSTS_LIST} from "../actions/ActionConstants";


const postsListReducer = (state = [], action) => {
    switch (action.type) {
        case STORE_POSTS_LIST:
            return action.payload;
        default:
            return state;
    }
};

export default postsListReducer;