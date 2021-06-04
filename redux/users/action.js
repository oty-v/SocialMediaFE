import {SET_USER, SET_USERS, SET_SEARCH_QUERY} from "./types";
import {getUser, getUsers} from "../../api/users";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
}

export const setUsers = (users, currentPage, lastPage) => {
    return {
        type: SET_USERS,
        payload: {users, currentPage, lastPage}
    };
}

export const setSearchQuery = (query) => {
    return {
        type: SET_SEARCH_QUERY,
        payload: query,
    };
}

export const getUserAsync = (username) => {
    return async (dispatch) => {
        const {data: {data: user}} = await getUser(username);
        dispatch(setUser(user));
    }
}


export const getUsersAsync = (query, page) => {
    return async (dispatch) => {
        const {
            data: {
                data: users,
                meta: {
                    current_page: currentPage,
                    last_page: lastPage
                }
            }
        } = await getUsers(query ? query : undefined, page);
        dispatch(setUsers(users, currentPage, lastPage));
        if (query) {
            dispatch(setSearchQuery(query));
        } else {
            dispatch(setSearchQuery(null));
        }
    }
}


