import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage: null,
        isEmailVerified: false,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
        register(state, action) {
            state.registerMessage = action.payload;
        },
        clearRegisterMessage(state) {
            state.registerMessage = null;
        },
        setUserPhoto(state, action) {
            state.user.profilePhoto = action.payload;
        },
        setUserName(state, action) {
            state.user.username = action.payload;
        },
        setIsEmailVerified(state) {
            state.isEmailVerified = true;
        },
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer }
