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

export const axiosController = new AxiosController({
    baseURL: process.env.API_URL,
});

axiosController.instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    return error.response
});