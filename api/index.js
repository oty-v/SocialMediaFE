import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

export const getApiData = async (route) => await axios.get(route)
    .then(response => ({
        data: response.data,
        error: false
    }))
    .catch(error => ({
        data: null,
        error: error.message
    }));

export const createPost = async (postData) => await axios.post('/posts', postData)
    .then(response => ({
        data: response.data,
        error: false
    }))
    .catch(error => ({
        data: null,
        error: error.message
    }));

export const editPost = async (postData) => await axios.put(`/posts/${postData.id}`, postData)
    .then(response => ({
        data: response.data,
        error: false
    }))
    .catch(error => ({
        data: null,
        error: error.message
    }));

export const deletePost = async (postID) => await axios.delete(`/posts/${postID}`)
    .then(response => ({
        data: response.data,
        error: false
    }))
    .catch(error => ({
        data: null,
        error: error.message
    }));