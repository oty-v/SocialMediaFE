import {createAction} from "redux-smart-actions";

export const fetchUsers = createAction('FETCH_USERS', (query, page = 1) => ({
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
            searchQuery: query || null,
        }),
    },
}));

export const fetchUser = createAction('FETCH_USER', (username) => ({
    request: {
        url: `/users/${username}`,
    },
    meta: {
        requestKey: username,
        requestsCapacity: 5,
        getData: data => data.data,
    },
}));

export const fetchUserFollowings = createAction('FETCH_USER_FOLLOWINGS', (username) => ({
    request: {
        url: `/users/${username}/followings`
    },
    meta: {
        requestKey: username,
        requestsCapacity: 5,
        getData: data => data.data,
    }
}))

export const fetchUserFollowers = createAction('FETCH_USER_FOLLOWERS', (username) => ({
    request: {
        url: `/users/${username}/followers`
    },
    meta: {
        requestKey: username,
        requestsCapacity: 5,
        getData: data => data.data,
    }
}))

export const followUser = createAction('FOLLOW_USER', (username, authUser) => ({
    request: {
        url: `/users/${username}/follow`,
        method: 'post'
    },
    meta: {
        requestKey: username,
        mutations: {
            [fetchUserFollowers + username]: (data) => [authUser, ...data],
            [fetchUserFollowings + authUser?.username]: (data) => [{username: username}, ...data],
        }
    }
}))

export const unfollowUser = createAction('UNFOLLOW_USER', (username, authUsername) => ({
    request: {
        url: `/users/${username}/unfollow`,
        method: 'post'
    },
    meta: {
        requestKey: username,
        mutations: {
            [fetchUserFollowers + username]: (data) => {
                const userIndex = data.findIndex(user => user.username === authUsername)
                data.splice(userIndex, 1)
                return [...data]
            },
            [fetchUserFollowings + authUsername]: (data) => {
                const userIndex = data.findIndex(user => user.username === username)
                data.splice(userIndex, 1)
                return [...data]
            },
        }
    }
}))