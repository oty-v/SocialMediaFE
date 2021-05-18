import {axiosController} from "../lib/axiosController";

export const getPostComments = (postId) => axiosController.instance.get(`/posts/${postId}/comments`);

export const createComment = (postId, commentData) => axiosController.instance.post(`/posts/${postId}/comments`, commentData);

export const editComment = (commentId, updatedData) => axiosController.instance.put(`/comments/${commentId}`, updatedData);

export const deleteComment = (commentId) => axiosController.instance.delete(`/comments/${commentId}`,);