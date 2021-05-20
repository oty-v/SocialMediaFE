import {SET_COMMENTS, ADD_COMMENTS} from "./types";
import {createComment, deleteComment, editComment, getPostComments} from "../../api/comments";

export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        payload: comments
    };
}

export const updateComments = (postId) => {
    return async (dispatch) => {
        const {data: {data: comments}} = await getPostComments(postId);
        dispatch(setComments(comments));
    }
}

export const updateComment = (commentId, updatedData, postId) => {
    return async (dispatch) => {
        await editComment(commentId, updatedData);
        dispatch(updateComments(postId));
    }
}

export const removeComment = (commentId, postId) => {
    return async (dispatch) => {
        await deleteComment(commentId);
        dispatch(updateComments(postId));
    }
}

export const addComments = (postId, inputs) => {
    return async (dispatch) => {
        const {data: {data: comment}} = await createComment(postId, inputs);
        dispatch({
            type: ADD_COMMENTS,
            payload: {
                ...comment
            }
        });
    }
}

