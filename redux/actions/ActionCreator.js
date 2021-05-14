import {AUTHENTICATE, DEAUTHENTICATE, STORE_USERS_LIST, STORE_POSTS_LIST, STORE_POST, STORE_COMMENTS_LIST} from "./ActionConstants";

export const authenticateAction = (user) => {
    return {
        type: AUTHENTICATE,
        payload: user
    };
};


export const deAuthenticateAction = () => {
    return {
        type: DEAUTHENTICATE,
    };
};

export const storeUsersListAction = (users) => {
    return {
        type: STORE_USERS_LIST,
        payload: users
    };
}

export const storePostsListAction = (posts) => {
    return {
        type: STORE_POSTS_LIST,
        payload: posts
    };
}


export const storePostAction = (post) => {
    return {
        type: STORE_POST,
        payload: post
    };
}

export const storeCommentsListAction = (comments) => {
    return {
        type: STORE_COMMENTS_LIST,
        payload: comments
    };
}
