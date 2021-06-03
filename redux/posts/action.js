import {SET_POST, SET_POSTS, ADD_POSTS, SET_CURSOR_POSTS, ADD_POST, UPDATE_POST, REMOVE_POST} from "./types";
import {createPost, deletePost, editPost, getPost, getUserPosts} from "../../api/posts";

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

export const getPostsAsync = (authorUsername) => {
    return async (dispatch) => {
        const {data: {data: posts, links:{next: nextPosts}}} = await getUserPosts(authorUsername);
        dispatch(setCursorPosts(nextPosts));
        dispatch(setPosts(posts));
    }
}

export const getNextPostsAsync = (authorUsername, cursor) => {
    return async (dispatch) => {
        const {data: {data: posts, links:{next: nextPosts}}} = await getUserPosts(authorUsername, cursor);
        dispatch(setCursorPosts(nextPosts));
        dispatch(addPosts(posts));
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