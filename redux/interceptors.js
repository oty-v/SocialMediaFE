import {toast} from "react-toastify";

export const onError = async (error) => {
    toast.error(error.toString())
    throw error;
};