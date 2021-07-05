import {FETCH_USER, FETCH_USERS} from "./types";
import {createAction} from "redux-smart-actions";

export const fetchUsers = createAction(FETCH_USERS, (query,page = 1) => ({
    request: {
        url: `/users`,
        params: {
            page,
            username: !!query ? query : undefined,
        },
    },
    meta: {
        requestKey: page,
        requestsCapacity: 2,
        getData: data => ({
            users: data.data,
            lastPage: data.meta.last_page,
            searchQuery: query||null,
        }),
    },
}));

export const fetchUser = createAction(FETCH_USER, (username) => ({
    request: {
        url: `/users/${username}`,
    },
    meta: {
        requestKey: username,
        requestsCapacity: 5,
        getData: data => ({
            ...data.data,
        }),
    },
}));