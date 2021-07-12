import {createAction} from "redux-smart-actions";

export const fetchPostComments = createAction('FETCH_POST_COMMENTS', (postId) => ({
    request: {
        url: `/posts/${postId}/comments`,
    },
    meta: {
        requestKey: postId,
        requestsCapacity: 2,
        getData: data => data.data,
    },
}));

export const createComment = createAction('CREATE_COMMENT', (postId, createdData) => ({
    request: {
        url: `/posts/${postId}/comments`,
        method: 'post',
        data: createdData
    },
    meta: {
        requestKey: postId,
        mutations: {
            [fetchPostComments + postId]: (data, mutationData) => [...data, mutationData.data]
        },
    },
}));

export const updateComment = createAction('UPDATE_COMMENT', (postId, commentId, updatedData) => {
    return {
        request: {
            url: `/comments/${commentId}`,
            method: 'put',
            data: updatedData
        },
        meta: {
            requestKey: commentId,
            mutations: {
                [fetchPostComments + postId]: (data, mutationData) => {
                    return data.map(comment => (comment.id === commentId ? mutationData.data : comment))
                },
            },
        },
    }
});

export const deleteComment = createAction('DELETE_COMMENT', (postId, commentId) => ({
    request: {
        url: `/comments/${commentId}`,
        method: 'delete',
    },
    meta: {
        requestKey: commentId,
        mutations: {
            [fetchPostComments + postId]: (data) => {
                return data.filter(comment => comment.id !== commentId)
            },
        },
    },
}));