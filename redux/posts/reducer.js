import {SET_POSTS, ADD_POSTS, SET_CURSOR_POSTS, SET_POST, ADD_POST, UPDATE_POST, REMOVE_POST} from "./types";

const initialState = {
    posts: [],
    cursor: null,
    post: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case ADD_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case SET_CURSOR_POSTS:
            const cursorPosts = action.payload && action.payload.match(/cursor=(\w+)/)[1]
            return {
                ...state,
                cursor: cursorPosts,
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case UPDATE_POST:
            const updatePostIndex = state.posts.findIndex(post => {
                return post.id === action.payload.id
            })
            state.posts.splice(updatePostIndex, 1, action.payload)
            return {
                ...state
            };
        case REMOVE_POST:
            const removePostIndex = state.posts.findIndex(post => {
                return post.id === action.payload
            })
            state.posts.splice(removePostIndex, 1)
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;