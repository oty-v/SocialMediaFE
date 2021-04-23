import axios from "axios";
import {parseCookies} from "./parseCookies";
import Cookie from "js-cookie";

const api = axios.create({
    baseURL: process.env.API_URL,
});

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    return error.response
});

export const registerUser = async (userData) => await api.post(`/register`, userData);

export const loginUser = async (userData) => await api.post(`/login`, userData);

export const logoutUser = async (token) => await api.get(`/logout`, {
    headers:
        { authorization: `Bearer ${token}` }
});

export const getProfile = async (token) => await api.get("/profile", {
    headers:
        { authorization: `Bearer ${token}` }
});

export const getUser = async (token, username) => await api.get(`/users/${username}`, {
    headers:
        { authorization: `Bearer ${token}` }
});

export const getUserPosts = async (token, username) => await api.get(`/users/${username}/posts`, {
    headers:
        { authorization: `Bearer ${token}` }
});

export const getPost = async (token, postId) => await api.get(`/posts/${postId}`, {
    headers:
        { authorization: `Bearer ${token}` }
});

export const createPost = async (token, postData) => await api.post('/posts', postData, {
    headers:
        { authorization: `Bearer ${token}` }
});

export const editPost = async (token, postData) => await api.put(`/posts/${postData.id}`, postData, {
    headers:
        { authorization: `Bearer ${token}` }
});

export const deletePost = async (token, postId) => await api.delete(`/posts/${postId}`, {
    headers:
        { authorization: `Bearer ${token}` }
});