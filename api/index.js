import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const getApiData = async (route) => await axios.get(route)
    .then(res => ({
        error: false,
        data: res.data,
    }))
    .catch(err => ({
            error: err,
        }),
    );

export const createPost = async (postData) => await axios.post("/posts", postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(err => ({
            error: err,
        }),
    );

export const editPost = async (postID, postData) => await axios.put(`/posts/${postID}`, postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(err => ({
            error: err,
        }),
    );

export const deletePost = async (postID) => await axios.delete(`/posts/${postID}`)
    .then((res) => ({
        error: false,
    }))
    .catch(err => ({
            error: err,
        }),
    );
