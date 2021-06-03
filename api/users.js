import {axiosController} from "../lib/axiosController";

export const getUser = (username) => axiosController.instance.get(`/users/${username}`);

export const getUsers = (query, page) => axiosController.instance.get(`/users?page=${page}${query}`);