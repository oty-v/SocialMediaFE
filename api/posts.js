import {axiosController} from "../lib/axiosController";

export const getUserPosts = (username) => axiosController.instance.get(`/users/${username}/posts`);

export const getPost = (postId) => axiosController.instance.get(`/posts/${postId}`);

export const createPost = (postData) => axiosController.instance.post('/posts', postData);

export const editPost = (postId, postData) => axiosController.instance.put(`/posts/${postId}`, postData);

export const deletePost = (postId) => axiosController.instance.delete(`/posts/${postId}`,);