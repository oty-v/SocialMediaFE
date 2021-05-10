import {axiosController} from "../lib/axiosController";

export const getUser = (username) => axiosController.instance.get(`/users/${username}`);

export const getUsers = () => axiosController.instance.get(`/users`);