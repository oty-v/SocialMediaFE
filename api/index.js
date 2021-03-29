import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const getApiData = async (rout) => await axios.get(rout)
    .then(res => ({
        error: false,
        data: res.data, //the content of data depends on rout
    }))
    .catch(() => ({
            error: true,
            data: null,
        }),
    );

export const pushCreatePost = async (postData) => await axios.post("/posts",postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(() => ({
            error: true,
            post: null,
        }),
    );

export const pushEditPost = async (postID,postData) => await axios.put(`/posts/${postID}`,postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(() => ({
            error: true,
            post: null,
        }),
    );

export const pushDeletePost = async (postID) => await axios.delete(`/posts/${postID}`)
    .then(res => ({
        error: false,
    }))
    .catch(() => ({
            error: true,
        }),
    );
