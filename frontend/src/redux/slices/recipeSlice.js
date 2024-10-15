import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: "recipe",
    initialState: {
        recipes: [],
        recipesCount: null,
        recipesCate: [],
        loading: false,
        isRecipeCreated: false,
    },
    reducers: {
        setRecipes(state, action) {
            state.recipes = action.payload;
        },
        setRecipesCount(state, action) {
            state.recipesCount = action.payload;
        },
        setRecipesCate(state, action) {
            state.recipesCate = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsRecipeCretaed(state) {
            state.isRecipeCreated = true;
            state.loading = false;
        },
        clearIsRecipeCretaed(state) {
            state.isRecipeCreated = false;
        },
    }
});

const recipeReducer = recipeSlice.reducer;
const recipeActions = recipeSlice.actions;
export { recipeActions, recipeReducer }
