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
            const updateCommentIndex = state.comments.findIndex(comment => {
                return comment.id === action.payload.id
            })
            state.comments.splice(updateCommentIndex, 1, action.payload)
            return {
                ...state,
            };
        case REMOVE_COMMENT:
            const removeCommentIndex = state.comments.findIndex(comment => {
                return comment.id === action.payload
            })
            state.comments.splice(removeCommentIndex, 1)
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default commentsReducer;