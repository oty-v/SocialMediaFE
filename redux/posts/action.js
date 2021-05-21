import {SET_POST, SET_POSTS, UPDATE_POST, REMOVE_POST} from "./types";
import {createPost, deletePost, editPost, getPost, getUserPosts} from "../../api/posts";

export const setPosts = (posts) => {
    return ({
        type: SET_POSTS,
        payload: posts
    });
}

export const setPost = (post) => {
    return {
        type: SET_POST,
        payload: post
    };
}

export const updatePost = (updatedData) => {
    return {
        type: UPDATE_POST,
        payload: updatedData
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
        const {data: {data: posts}} = await getUserPosts(authorUsername);
        dispatch(setPosts(posts));
    }
}

export const createPostAsync = (createdData) => {
    return async (dispatch) => {
        const {data: {data: post}} = await createPost(createdData);
        dispatch(setPosts(post));
    }
}

export const updatePostAsync = (postId, updatedData) => {
    return async (dispatch) => {
        await editPost(postId, updatedData);
        dispatch(updatePost(updatedData));
        dispatch(setPost(updatedData));
    }
}

export const removePostAsync = (postId) => {
    return async (dispatch) => {
        await deletePost(postId);
        dispatch(removePost(postId))
    }
}