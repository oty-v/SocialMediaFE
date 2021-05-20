import {SET_POSTS, SET_POST} from "./types";

const initialState = {
    posts: [],
    post: {}
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload
            };
        default:
            return state;
    }
};

export default reducer;