import { profileActions } from "../slices/profileSlice";
import { authActions } from '../slices/authSlice';
import request from "../../utils/request"
import { toast } from "react-toastify";

export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/profile/${userId}`)
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request
            .post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            dispatch(authActions.setUserPhoto(data.profilePhoto));
            toast.success(data.message);
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto = data?.profilePhoto;
            localStorage.setItem("userInfo", JSON.stringify(user));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function updateProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request
            .put(`/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUserName(data.username));
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.username;
            localStorage.setItem("userInfo", JSON.stringify(user));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};

export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading());
            const { data } = await request
            .delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(profileActions.setIsProfileDeleted());
            setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
            toast.success(data?.message);
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(profileActions.clearLoading());
        }
    }
};
