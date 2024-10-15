import { recipeActions } from "../slices/recipeSlice"
import request from "../../utils/request"
import { toast } from "react-toastify"

export function fetchRecipes(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/recipes?pageNumber=${pageNumber}`)
            dispatch(recipeActions.setRecipes(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function getRecipesCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/recipes/count`)
            dispatch(recipeActions.setRecipesCount(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function fetchRecipesBasedOnCate(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/recipes?category=${category}`)
            dispatch(recipeActions.setRecipesCate(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function createRecipe(newRecipe) {
    return async (dispatch, getState) => {
        try {
            dispatch(recipeActions.setLoading());
            await request.post(`/api/recipes`, newRecipe, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            })
            dispatch(recipeActions.setIsRecipeCretaed());
            setTimeout(() => dispatch(recipeActions.clearIsRecipeCretaed()), 2000);
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(recipeActions.clearLoading());
        }
    }
};
