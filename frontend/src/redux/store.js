import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { recipeReducer } from "./slices/recipeSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        recipe: recipeReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
