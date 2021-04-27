import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_URL,
});

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    return error.response
});

export const registerUser = async (userData) => await api.post(`/register`, userData);

export const loginUser = async (userData) => await api.post(`/login`, userData);

export const logoutUser = async () => await api.post(`/logout`);

export const getProfile = async () => await api.get("/profile");

export const getUser = async (username) => await api.get(`/users/${username}`);

export const getUsers = async () => await api.get(`/users`);

export const getUserPosts = async (username) => await api.get(`/users/${username}/posts`);

export const getPost = async (postId) => await api.get(`/posts/${postId}`);

export const createPost = async (postData) => await api.post('/posts', postData);

export const editPost = async (postData) => await api.put(`/posts/${postData.id}`, postData);

export const deletePost = async (postId) => await api.delete(`/posts/${postId}`, );