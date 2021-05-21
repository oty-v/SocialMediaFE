import {SET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT} from "./types";

const initialState = {
    comments: []
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: state.comments.splice(state.comments.findIndex(comment=>comment.id===action.payload.id), 1, action.payload)
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.splice(state.comments.findIndex(comment=>comment.id===action.payload), 1)
            };
        default:
            return state;
    }
};

export default commentsReducer;