import {axiosController} from "../lib/axiosController";

export const getPostComments = (postId) => axiosController.instance.get(`/posts/${postId}/comments`);

// export const getPost = (postId) => axiosController.instance.get(`/posts/${postId}`);

export const createComment = (postId, commentData) => axiosController.instance.post(`/posts/${postId}/comments`, commentData);

export const editComment = (commentData) => axiosController.instance.put(`/comments/${commentData.id}`, commentData);

export const deleteComment = (commentId) => axiosController.instance.delete(`/comments/${commentId}`,);