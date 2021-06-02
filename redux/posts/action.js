import {SET_POST, SET_POSTS, ADD_POSTS, ADD_POST, UPDATE_POST, REMOVE_POST} from "./types";
import {createPost, deletePost, editPost, getPost, getUserPosts} from "../../api/posts";

export const setPosts = (posts, nextPosts) => {
    return ({
        type: SET_POSTS,
        payload: {posts, nextPosts}

    });
}

export const addPosts = (posts, nextPosts) => {
    return {
        type: ADD_POSTS,
        payload: {posts, nextPosts}
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
        dispatch(setPosts(posts, nextPosts));
    }
}

export const getNextPostsAsync = (authorUsername, srcPagePosts) => {
    return async (dispatch) => {
        const pageNumber = srcPagePosts.slice(-1);
        const {data: {data: posts, links:{next: nextPosts}}} = await getUserPosts(authorUsername, pageNumber);
        dispatch(addPosts(posts, nextPosts));
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