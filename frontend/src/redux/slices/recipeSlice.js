import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: "recipe",
    initialState: {
        recipes: [],
        recipesCount: null,
        recipesCate: [],
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
    }
});

const recipeReducer = recipeSlice.reducer;
const recipeActions = recipeSlice.actions;
export { recipeActions, recipeReducer }
