import {SET_USER, SET_USERS, SET_SEARCH_QUERY} from "./types";

const initialState = {
    users: [],
    currentPage: 1,
    lastPage: 1,
    searchQuery: '',
    user: {}
};
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users,
                currentPage: action.payload.currentPage,
                lastPage: action.payload.lastPage,
            };
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;