import {SET_POSTS, SET_POST} from "./types";

const initialState = {
    posts: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                posts: action.payload
            };
        case SET_POST:
            return {
                posts: action.payload
            };
        default:
            return state;
    }
};

export default reducer;