import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const { data } = await request.get("/api/categories")
            dispatch(categoryActions.setCategories(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};
