import { recipeActions } from "../slices/recipeSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/comments", newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(recipeActions.addComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function updateComment(commentId, newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/comments/${commentId}`, newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(recipeActions.updateComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(recipeActions.deleteComment(commentId));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};
