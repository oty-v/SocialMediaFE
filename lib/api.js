import axios from "axios";

class AxiosController {
    token;
    instance;

    constructor({baseURL}) {
        this.instance = axios.create({
            baseURL
        })
        this.init();
    }

    setToken(token) {
        this.token = token;
    }

    init() {
        this.instance.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.authorization = `Bearer ${this.token}`;
            }
            return config;
        }, (error) => {
            return error.response
        })
    }
}

export const api = new AxiosController({
    baseURL: process.env.API_URL,
});

api.instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    return error.response
});

export const registerUser = async (userData) => await api.instance.post(`/register`, userData);

export const loginUser = async (userData) => await api.instance.post(`/login`, userData);

export const logoutUser = async () => await api.instance.post(`/logout`);

export const getProfile = async () => await api.instance.get("/profile");

export const getUser = async (username) => await api.instance.get(`/users/${username}`);

export const getUsers = async () => await api.instance.get(`/users`);

export const getUserPosts = async (username) => await api.instance.get(`/users/${username}/posts`);

export const getPost = async (postId) => await api.instance.get(`/posts/${postId}`);

export const createPost = async (postData) => await api.instance.post('/posts', postData);

export const editPost = async (postData) => await api.instance.put(`/posts/${postData.id}`, postData);

export const deletePost = async (postId) => await api.instance.delete(`/posts/${postId}`,);