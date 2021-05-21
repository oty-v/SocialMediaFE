import {SET_POST, SET_POSTS} from "./types";
import {deletePost, editPost, getPost, getUserPosts} from "../../api/posts";

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

export const uploadPost = (postId) => {
    return async (dispatch) => {
        const {data: {data: post}} = await getPost(postId);
        dispatch(setPost(post));
    }
}

export const uploadPosts = (authorUsername) => {
    return async (dispatch) => {
        const {data: {data: posts}} = await getUserPosts(authorUsername);
        dispatch(setPosts(posts));
    }
}

export const updatePost = (postId, updatedData) => {
    return async (dispatch) => {
        await editPost(postId, updatedData);
        dispatch(setPost(updatedData));
    }
}

export const removePost = (postId, authorUsername) => {
    return async (dispatch) => {
        await deletePost(postId);
        dispatch(uploadPosts(authorUsername))
    }
}