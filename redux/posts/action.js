import {SET_POST, SET_POSTS, ADD_POSTS, SET_NEXT_POSTS, ADD_POST, UPDATE_POST, REMOVE_POST} from "./types";
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

export const setNextPosts = (nextPosts) => {
    return {
        type: SET_NEXT_POSTS,
        payload: nextPosts
    };
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
        dispatch(setNextPosts(nextPosts));
        dispatch(setPosts(posts));
    }
}

export const getNextPostsAsync = (authorUsername, srcCursorPosts) => {
    return async (dispatch) => {
        const cursor = srcCursorPosts.match(/cursor=[^&]*/g);
        const {data: {data: posts, links:{next: nextPosts}}} = await getUserPosts(authorUsername, cursor);
        dispatch(setNextPosts(nextPosts));
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