import "./profile.css";
import RecipeList from "../../components/recipes/RecipeList";
import { recipes } from "../../dummyData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { getUserProfile } from "../../redux/apiCalls/profileApiCall";

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [id]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.error("There is no image provided!");
    console.log("image uploaded");
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
        swal("Account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Account deletion canceled")
    };
    });
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
        <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url } alt="" className="profile-image" />
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
        <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-recipes-list">
      <h2 className="profile-recipes-list-title">Recipes of {profile?.username} </h2>
        <RecipeList recipes={recipes} />
      </div>
      <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      {updateProfile && <UpdateProfileModal setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
