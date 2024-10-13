import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart } from 'lucide-react';
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import { recipes } from "../../dummyData";
import "./recipe-details.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateRecipeModal from "./UpdateRecipeModal";

const RecipeDetails = () => {

    const { id } = useParams();
    const recipe = recipes.find((p) => p._id === parseInt(id));
    const [updaterecipe, setUpdaterecipe] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

    // Update Image Submit Handler
    const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.error("There is no Image!");
    console.log("image uploaded successfully")
    }

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
            swal("Your recipe has been deleted!", {
                icon: "success",
            });
        } else {
            swal("Your recipe is safe!", {
                icon: "info",
            });
        }
    });
};

    return (
        <section className="recipe-details">
            <div className="recipe-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : recipe.image} alt="" className="recipe-details-image" />
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
            </div>
            <h1 className="recipe-details-title">{recipe.title}</h1>
            <div className="recipe-details-cook-time">
                <i className="bi bi-clock"></i>
                <span>Cook Time: {recipe.cookTime} minutes</span>
            </div>
            <div className="recipe-details-user-info">
                <img src={recipe.chef.image} alt="" className="recipe-details-user-image" />
                <div className="recipe-details-user">
                <strong>
                    <Link to="/profile/1">{recipe.chef.username}</Link>
                </strong>
                <span>{recipe.createdAt}</span>
                </div>
            </div>
            <p className="recipe-details-description">
                {recipe.description} ... Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
                ratione sint animi illo id accusamus obcaecati dolore voluptatibus
                aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
                Laboriosam rem quod, explicabo similique aliquam unde sed vel
                distinctio, fugiat ab aperiam odio nesciunt quas?
            </p>
            <p className="recipe-details-ingredients">
                {recipe.ingredients} ... Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
                ratione sint animi illo id accusamus obcaecati dolore voluptatibus
                aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
                Laboriosam rem quod, explicabo similique aliquam unde sed vel
                distinctio, fugiat ab aperiam odio nesciunt quas?
            </p>
            <p className="recipe-details-instructions">
                {recipe.instructions} ... Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
                ratione sint animi illo id accusamus obcaecati dolore voluptatibus
                aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
                Laboriosam rem quod, explicabo similique aliquam unde sed vel
                distinctio, fugiat ab aperiam odio nesciunt quas?
            </p>
            <div className="recipe-details-icon-wrapper">
                <div className="recipe-likes">
                        <Heart className="heart-icon" />
                        <small>{recipe.likes.length} likes</small>
                    </div>
                <div>
                <i
                    onClick={() => setUpdaterecipe(true)}
                    className="bi bi-pencil-square"
                ></i>
                <i onClick={deleterecipeHandler} className="bi bi-trash-fill"></i>
                </div>
            </div>
            <AddComment />
            <CommentList />
            {updaterecipe && <UpdateRecipeModal setUpdaterecipe={setUpdaterecipe} recipe={recipe} />}
            </section>
        );
    };

export default RecipeDetails;
