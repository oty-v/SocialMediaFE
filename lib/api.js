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

export const registerUser = (userData) => api.instance.post(`/register`, userData);

export const loginUser = (userData) => api.instance.post(`/login`, userData);

export const logoutUser = () => api.instance.post(`/logout`);

export const getProfile = () => api.instance.get("/profile");

export const getUser = (username) => api.instance.get(`/users/${username}`);

export const getUsers = () => api.instance.get(`/users`);

export const getUserPosts = (username) => api.instance.get(`/users/${username}/posts`);

export const getPost = (postId) => api.instance.get(`/posts/${postId}`);

export const createPost = (postData) => api.instance.post('/posts', postData);

export const editPost = (postData) => api.instance.put(`/posts/${postData.id}`, postData);

export const deletePost = (postId) => api.instance.delete(`/posts/${postId}`,);