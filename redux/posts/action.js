import {SET_POST, SET_POSTS, ADD_POSTS, SET_CURSOR_POSTS, ADD_POST, UPDATE_POST, REMOVE_POST} from "./types";
import {createPost, deletePost, editPost, getPost, getUserPosts} from "../../api/posts";
import {createAction} from "redux-smart-actions";

export const setPosts = (posts) => {
    return ({
        type: SET_POSTS,
        payload: posts,
    });
}

export const addPosts = (posts) => {
    return {
        type: ADD_POSTS,
        payload: posts,
    };
}

export const setCursorPosts = (srcCursorPosts) => {
    return {
        type: SET_CURSOR_POSTS,
        payload: srcCursorPosts
    }
}

export const setPost = (post) => {
    return {
        type: SET_POST,
        payload: post
    };
}

export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post
    };
}

export const updatePost = (updatedPost) => {
    return {
        type: UPDATE_POST,
        payload: updatedPost
    };
}


export const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        payload: postId
    };
}

export const getPostAsync = (postId) => {
    return async (dispatch) => {
        const {data: {data: post}} = await getPost(postId);
        dispatch(setPost(post));
    }
}

export const getPostsAsync = (authorUsername, cursor) => {
    return async (dispatch) => {
        const {data: {data: posts, links: {next: nextPosts}}} = await getUserPosts(authorUsername, cursor);
        dispatch(setCursorPosts(nextPosts));
        if (cursor) {
            dispatch(addPosts(posts));
        } else {
            dispatch(setPosts(posts));
        }
    }
}

export const createPostAsync = (createdData) => {
    return async (dispatch) => {
        const {data: {data: post}} = await createPost(createdData);
        dispatch(addPost(post));
    }
}

export const updatePostAsync = (postId, updatedData) => {
    return async (dispatch) => {
        const {data: {data: updatedPost}} = await editPost(postId, updatedData);
        dispatch(updatePost(updatedPost));
        dispatch(setPost(updatedPost));
    }
}

export const removePostAsync = (postId) => {
    return async (dispatch) => {
        await deletePost(postId);
        dispatch(removePost(postId))
    }
}

export const fetchUserPosts = createAction('FETCH_USER_POSTS', (username, cursor) => ({
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

export const fetchPost = createAction('FETCH_POST', id => ({
    request: [{url: `/posts/${id}`}, {url: `/posts/${id}/comments`}],
    meta: {
        getData: data => ({
            ...data[0].data,
            comments: data[1].data,
        }),
    },
}));