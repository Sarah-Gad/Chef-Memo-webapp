import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart } from 'lucide-react';
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import "./recipe-details.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateRecipeModal from "./UpdateRecipeModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, getRecipe, recipeLike, updateRecipeImage } from "../../redux/apiCalls/recipeApiCall";

const RecipeDetails = () => {
    const dispatch = useDispatch();
    const { recipe } = useSelector(state => state.recipe)
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
    const [updaterecipe, setUpdaterecipe] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getRecipe(id));
    }, [id]);

    // Update Image Submit Handler
    const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.error("There is no Image!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateRecipeImage(formData, recipe?._id));
    }
    const navigate = useNavigate();
    //Delete recipe Handler
    const deleterecipeHandler = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this recipe!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            dispatch(deleteRecipe(recipe?._id));
            navigate(`/profile/${user?._id}`);
        }
    });
};

    return (
        <section className="recipe-details">
            <div className="recipe-details-image-wrapper">
            <img src={file ? URL.createObjectURL(file) : recipe?.image.url} alt="" className="recipe-details-image" />
            {user?._id === recipe?.chef?._id && (
              <form onSubmit={updateImageSubmitHandler} className="update-recipe-image-form">
                <label className="update-recipe-label" htmlFor="file">
                    <i className="bi bi-image-fill"></i> Select new image
                </label>
                <input
                    style={{ display: "none" }}
                    type="file"
                    name="file"
                    id="file"
                    onChange={e => setFile(e.target.files[0])}
                />
                <button type="submit">upload</button>
                </form>
                )}
            </div>
            <h1 className="recipe-details-title">{recipe?.title}</h1>
            <div className="recipe-details-cook-time">
                <i className="bi bi-clock"></i>
                <span>Cook Time: {recipe?.cookTime} minutes</span>
            </div>
            <div className="recipe-details-user-info">
            <img src={recipe?.chef.profilePhoto.url} alt="" className="recipe-details-user-image" />
                <div className="recipe-details-user">
                <strong>
                <Link to={`/profile/${recipe?.chef._id}`}>{recipe?.chef.username}</Link>
                </strong>
                <span>{new Date(recipe?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="recipe-details-description">
                {recipe?.description}
            </p>
            <p className="recipe-details-ingredients">
                {recipe?.ingredients}
            </p>
            <p className="recipe-details-instructions">
                {recipe?.instructions}
            </p>
            <div className="recipe-details-icon-wrapper">
                <div className="recipe-likes">
                {
                user && (
                  <Heart onClick={() => dispatch(recipeLike(id))} className={
                    recipe?.likes.includes(user?._id)
                    ? "heart-icon-fill"
                    : "heart-icon"
                  } />
                )
              }
                    <small>{recipe?.likes?.length} likes</small>
                </div>
                {user?._id === recipe?.chef?._id && (
                <div>
                <i
                    onClick={() => setUpdaterecipe(true)}
                    className="bi bi-pencil-square"
                ></i>
                <i onClick={deleterecipeHandler} className="bi bi-trash-fill"></i>
                </div>
                )}
            </div>
            {
            user ? <AddComment recipeId={recipe?._id}/> :
            <p className="recipe-details-info-write" >
              to write a comment, you should login first
            </p>
            }
            <CommentList comments={recipe?.comments} />
            {updaterecipe && <UpdateRecipeModal setUpdaterecipe={setUpdaterecipe} recipe={recipe} />}
            </section>
        );
    };

export default RecipeDetails;
