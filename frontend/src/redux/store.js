import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { recipeReducer } from "./slices/recipeSlice";
import { categoryReducer } from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        recipe: recipeReducer,
        category: categoryReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
