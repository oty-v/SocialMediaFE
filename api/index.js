import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

export const getApiData = async (route) => await axios.get(route)
    .then(res => ({
        error: false,
        data: res.data,
    }))
    .catch(error => ({
            error,
            data: null,
        }),
    );

export const createPost = async (postData) => await axios.post('/posts', postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(error => ({
            error,
            post: null,
        }),
    );

export const editPost = async (postData) => await axios.put(`/posts/${postData.id}`, postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(error => ({
            error,
            post: null,
        }),
    );

export const deletePost = async (postID) => await axios.delete(`/posts/${postID}`)
    .then((res) => ({
        error: false,
    }))
    .catch(error => ({
            error
        }),
    );
