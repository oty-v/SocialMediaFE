import {SET_POSTS, SET_POST, UPDATE_POST, REMOVE_POST} from "./types";

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
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.splice(state.posts.findIndex(post=>post.id===action.payload.id), 1, action.payload)
            };
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.splice(state.posts.findIndex(post=>post.id===action.payload), 1)
            };
        default:
            return state;
    }
};

export default reducer;