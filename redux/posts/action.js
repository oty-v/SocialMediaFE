import {FETCH_POST, FETCH_USER_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST} from "./types";
import {createAction, createThunk} from "redux-smart-actions";

export const fetchUserPosts = createAction(FETCH_USER_POSTS, (username, cursor = '') => ({
    request: {
        url: `/users/${username}/posts`,
        params: {
            cursor,
        },
    },
    meta: {
        requestKey: cursor,
        getData: data => ({
            posts: data.data,
            cursorPosts: data.links.next && data.links.next.match(/cursor=(\w+)/)[1]
        }),
    },
}));

export const fetchPost = createAction(FETCH_POST, postId => ({
    request: [{url: `/posts/${postId}`}, {url: `/posts/${postId}/comments`}],
    meta: {
        requestKey: postId,
        getData: data => {
            console.log(data);
            return ({
                ...data[0].data,
                comments: data[1].data,
            })
        },
    },
}));

export const createPost = createAction(CREATE_POST, (createdData) => ({
    request: {
        url: `/posts/`,
        method: 'post',
        data: createdData
    },
}));

export const updatePost = createAction(UPDATE_POST, (postId, updatedData)  => {
    return {
        request: {
            url: `/posts/${postId}`,
            method: 'put',
            data: updatedData
        },
        meta: {
            requestKey: postId,
            mutations: {
                [FETCH_POST + postId]: (data, mutationData) => Object.assign(data, mutationData.data),
            },
        },
    }
});

export const deletePost = createAction(DELETE_POST, (postId, cursor) => ({
    request: {
        url: `/posts/${postId}`,
        method: 'delete',
    },
    meta: {
        requestKey: postId,
        mutations: {
            [FETCH_POST + postId]: () => null,
        },
    },
}));