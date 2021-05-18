import {SET_COMMENTS, ADD_COMMENTS} from "./types";
import {toast} from "react-toastify";
import {createComment, getPostComments} from "../../api/comments";

export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        payload: comments
    };
}

export const updateComments = (postId, sendChanges) => {
    return async (dispatch) => {
        try {
            if (sendChanges) {
                await sendChanges();
            }
            const {data: {data: comments}} = await getPostComments(postId);
            dispatch(setComments(comments));
        } catch (error) {
            toast.error(error.toString())
        }
    }
}

export const addComments = (postId, inputs) => {
    return async (dispatch) => {
        try {
            const {data: {data: comment}} = await createComment(postId, inputs);
            dispatch({
                type: ADD_COMMENTS,
                payload: {
                    ...comment
                }
            });
        } catch (error) {
            toast.error(error.toString())
        }
    }
}