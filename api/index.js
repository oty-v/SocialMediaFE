import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return error.response
});

export const getApiData = async (route) => await axios.get(route)

export const createPost = async (postData) => await axios.post('/posts', postData)

export const editPost = async (postData) => await axios.put(`/posts/${postData.id}`, postData)

export const deletePost = async (postID) => await axios.delete(`/posts/${postID}`)
