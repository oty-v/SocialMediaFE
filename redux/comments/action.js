import {SET_COMMENTS, ADD_COMMENT} from "./types";
import {createComment, deleteComment, editComment, getPostComments} from "../../api/comments";

export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        payload: comments
    };
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export const getCommentsAsync = (postId) => {
    return async (dispatch) => {
        const {data: {data: comments}} = await getPostComments(postId);
        dispatch(setComments(comments));
    }
}

export const updateComment = (commentId, updatedData, postId) => {
    return async (dispatch) => {
        await editComment(commentId, updatedData);
        dispatch(getCommentsAsync(postId));
    }
}

export const removeComment = (commentId, postId) => {
    return async (dispatch) => {
        await deleteComment(commentId);
        dispatch(getCommentsAsync(postId));
    }
}

export const createCommentAsync = (postId, createdData) => {
    return async (dispatch) => {
        const {data: {data: comment}} = await createComment(postId, createdData);
        dispatch(addComment(comment));
    }
}

