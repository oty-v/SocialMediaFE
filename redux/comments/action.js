import {SET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT} from "./types";
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

export const updateComment = (updatedComment) => {
    return {
        type: UPDATE_COMMENT,
        payload: updatedComment
    };
}


export const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        payload: commentId
    };
}

export const getCommentsAsync = (postId) => {
    return async (dispatch) => {
        const {data: {data: comments}} = await getPostComments(postId);
        dispatch(setComments(comments));
    }
}

export const updateCommentAsync = (commentId, updatedData) => {
    return async (dispatch) => {
        const {data: {data: updatedComment}} = await editComment(commentId, updatedData);
        dispatch(updateComment(updatedComment));
    }
}

export const removeCommentAsync = (commentId) => {
    return async (dispatch) => {
        await deleteComment(commentId);
        dispatch(removeComment(commentId));
    }
}

export const createCommentAsync = (postId, createdData) => {
    return async (dispatch) => {
        const {data: {data: comment}} = await createComment(postId, createdData);
        dispatch(addComment(comment));
    }
}

