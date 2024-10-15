import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: "recipe",
    initialState: {
        recipes: [],
        recipesCount: null,
        recipesCate: [],
        loading: false,
        isRecipeCreated: false,
        recipe: null,
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
        setRecipe(state, action) {
            state.recipe = action.payload;
        },
        setLike(state, action) {
            state.recipe.likes = action.payload.likes;
        },
        deleteRecipe(state, action) {
            state.recipes = state.recipes.filter(r => r._id !== action.payload);
        },
        addComment(state, action) {
            state.recipe.comments.push(action.payload);
        },
        updateComment(state, action) {
            state.recipe.comments = state.recipe.comments.map(comment =>
                comment._id === action.payload._id ? action.payload : comment
            )
        },
        deleteComment(state, action) {
            const comment = state.recipe.comments.find(c => c._id === action.payload);
            const commentIndex = state.recipe.comments.indexOf(comment);
            state.recipe.comments.splice(commentIndex, 1);
        }
    }
});

const recipeReducer = recipeSlice.reducer;
const recipeActions = recipeSlice.actions;
export { recipeActions, recipeReducer }
