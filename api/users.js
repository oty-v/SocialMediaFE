import {axiosController} from "../lib/axiosController";

export const getUser = (username) => axiosController.instance.get(`/users/${username}`);

export const getUsers = (query) => axiosController.instance.post(`/users`, query);