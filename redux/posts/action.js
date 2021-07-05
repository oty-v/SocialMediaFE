import {FETCH_POST, FETCH_USER_POSTS, FETCH_TAG_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST} from "./types";
import {createAction} from "redux-smart-actions";

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

export const fetchTagPosts = createAction(FETCH_TAG_POSTS, (tag, cursor = '') => ({
    request: {
        url: `/tags/${tag}/posts`,
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
    request: {
        url: `/posts/${postId}`
    },
    meta: {
        requestKey: postId,
        requestsCapacity: 2,
        getData: data => {
            return ({
                ...data.data,
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

export const updatePost = createAction(UPDATE_POST, (updatedData, postId, cursor) => ({
    request: {
        url: `/posts/${postId}`,
        method: 'put',
        data: updatedData
    },
    meta: {
        requestKey: cursor || postId,
        mutations: {
            [FETCH_USER_POSTS + cursor]: (data, mutationData) => {
                const posts = data.posts.map(post =>
                    post.id === postId ? mutationData.data : post
                )
                return Object.assign(data, {posts})
            },
            [FETCH_TAG_POSTS + cursor]: (data, mutationData) => {
                const posts = data.posts.map(post =>
                    post.id === postId ? mutationData.data : post
                )
                return Object.assign(data, {posts})
            },
            [FETCH_POST + postId]: (data, mutationData) => Object.assign(data, mutationData.data)
        },
    },
}));

export const deletePost = createAction(DELETE_POST, (postId, cursor) => ({
    request: {
        url: `/posts/${postId}`,
        method: 'delete',
    },
    meta: {
        requestKey: cursor || postId,
        mutations: {
            [FETCH_USER_POSTS + cursor]: (data) => {
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1)
                return data
            },
            [FETCH_TAG_POSTS + cursor]: (data) => {
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1)
                return data
            },
            [FETCH_POST + postId]: () => {},
        },
    },
}));