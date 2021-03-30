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

export const createPost = async (route, postData) => await axios.post(route, postData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(error => ({
            error,
            post: null,
        }),
    );

export const editPost = async (route, elementData) => await axios.put(`${route}/${elementData.id}`, elementData)
    .then(res => ({
        error: false,
        post: res.data,
    }))
    .catch(error => ({
            error,
            post: null,
        }),
    );

export const deleteData = async (route, elementID) => await axios.delete(`${route}/${elementID}`)
    .then((res) => ({
        error: false,
    }))
    .catch(error => ({
            error
        }),
    );
