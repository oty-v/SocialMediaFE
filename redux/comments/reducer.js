import {SET_COMMENTS, ADD_COMMENTS} from "./types";

const initialState = {
    comments: []
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                comments: action.payload
            };
        case ADD_COMMENTS:
            return {
                comments: [...state.comments, action.payload]
            };
        default:
            return state;
    }
};

export default commentsReducer;