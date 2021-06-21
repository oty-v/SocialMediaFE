import {CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT} from "./types";
import {createAction} from "redux-smart-actions";
import {FETCH_POST} from "../posts/types";

export const createComment = createAction(CREATE_COMMENT, (postId, createdData) => ({
    request: {
        url: `/posts/${postId}/comments`,
        method: 'post',
        data: createdData
    },
    meta: {
        requestKey: postId,
        mutations: {
            [FETCH_POST + postId]: (data, mutationData) => {
                const comments = [mutationData.data, ...data.comments]
                return Object.assign(data, {comments})
            },
        },
    },
}));

export const updateComment = createAction(UPDATE_COMMENT, (postId, commentId, updatedData) => {
    return {
        request: {
            url: `/comments/${commentId}`,
            method: 'put',
            data: updatedData
        },
        meta: {
            requestKey: postId,
            mutations: {
                [FETCH_POST + postId]: (data, mutationData) => {
                    const comments = data.comments.map(comment => (comment.id === commentId ? mutationData.data : comment))
                    return Object.assign(data, {comments})
                },
            },
        },
    }
});

export const deleteComment = createAction(DELETE_COMMENT, (postId, commentId) => ({
    request: {
        url: `/comments/${commentId}`,
        method: 'delete',
    },
    meta: {
        requestKey: postId,
        mutations: {
            [FETCH_POST + postId]: (data) => {
                const comments = data.comments.filter(comment => comment.id !== commentId)
                return Object.assign(data, {comments})
            },
        },
    },
}));