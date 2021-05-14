import {STORE_POST} from "../actions/ActionConstants";


const postsListReducer = (state=[], action) => {
    switch (action.type) {
        case STORE_POST:
            return action.payload;
        default:
            return state;
    }
};

export default postsListReducer;