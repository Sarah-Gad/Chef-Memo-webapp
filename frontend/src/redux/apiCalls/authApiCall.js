import { authActions } from "../slices/authSlice";
import request from "../../utils/request"
import { toast } from "react-toastify"

export function loginUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/login", user)
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
};

export function registerUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/register", user)
            dispatch(authActions.register(data.message));
            setTimeout(() => dispatch(authActions.clearRegisterMessage()), 2000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function verifyEmail(userId,token) {
    return async (dispatch) => {
        try {
            await request.get(`/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setIsEmailVerified());
            setTimeout(() => dispatch(authActions.clearRegisterMessage()), 2000);
        } catch (error) {
            console.log(error);
        }
    }
}
