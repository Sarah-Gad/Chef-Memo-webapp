import "./profile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import RecipeItem from "../../components/recipes/RecipeItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { MoonLoader } from "react-spinners";

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(state => state.profile);
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [id]);

  const navigate = useNavigate();
  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/");
    };
    window.scrollTo(0,0);
  }, [navigate, isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.error("There is no image provided!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser())
      };
    });
  };

  if(loading) {
    return (
      <div className="profile-loader" >
        <MoonLoader />
      </div>
    )
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
        <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url } alt="" className="profile-image" />
        { user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={e => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">upload</button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
        {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>Member Since: </strong>
          <span>
            {new Date(profile?.createdAt).toDateString()}
          </span>
        </div>
        { user?._id === profile?._id && (
          <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
        )}
      </div>
      <div className="profile-recipes-list">
      <h2 className="profile-recipes-list-title">Recipes of {profile?.username} </h2>
      {profile?.recipes?.length > 0 ? (
          profile.recipes.map(recipe => (
            <RecipeItem key={recipe._id} recipe={recipe} username={profile?.username} userId={profile?._id} />
          ))
        ) : (
          <p className="no-recipes-message">No recipes have been added yet.</p>
      )}
      </div>
      { user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      )}
      {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
