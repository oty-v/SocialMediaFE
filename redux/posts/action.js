import {SET_POST, SET_POSTS} from "./types";
import {editPost, getUserPosts} from "../../api/posts";
import {toast} from "react-toastify";

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

export const updatePosts = (post, sendChanges) => {
    return async (dispatch) => {
        try {
            await sendChanges();
            const {data: {data: posts}} = await getUserPosts(post.author.username);
            dispatch(setPosts(posts));
        } catch (error) {
            toast.error(error.toString())
        }
    }
}

export const updatePost = (post) => {
    return async (dispatch) => {
        try {
            await editPost(post.id, post);
            dispatch(setPost(post));
        } catch (error) {
            toast.error(error.toString())
        }
    }
}