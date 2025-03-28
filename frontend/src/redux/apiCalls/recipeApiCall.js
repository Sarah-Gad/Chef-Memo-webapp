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

export function getRecipe(recipeId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/recipes/${recipeId}`)
            dispatch(recipeActions.setRecipe(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function recipeLike(recipeId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/recipes/like/${recipeId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(recipeActions.setLike(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function updateRecipeImage(newImage, recipeId) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/recipes/update-image/${recipeId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data",
                }
            });
            toast.success("New recipe image updated successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function updateRecipe(newRecipe, recipeId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/recipes/${recipeId}`, newRecipe, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(recipeActions.setRecipe(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function deleteRecipe(recipeId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/recipes/${recipeId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(recipeActions.deleteRecipe(data.recipeId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};
