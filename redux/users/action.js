import {SET_USER, SET_USERS} from "./types";
import {getUser, getUsers} from "../../api/users";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    };
}

export const getUserAsync = (username) => {
    return async (dispatch) => {
        const {data: {data: user}} = await getUser(username);
        dispatch(setUser(user));
    }
}

export const getUsersAsync = () => {
    return async (dispatch) => {
        const {data: {data: users}} = await getUsers();
        dispatch(setUsers(users));
    }
}


