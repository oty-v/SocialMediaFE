import {axiosController} from "../lib/axiosController";

export const registerUser = (userData) => axiosController.instance.post(`/register`, userData);

export const loginUser = (userData) => axiosController.instance.post(`/login`, userData);

export const logoutUser = () => axiosController.instance.post(`/logout`);

export const getProfile = () => axiosController.instance.get("/profile");