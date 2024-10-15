import { Link } from "react-router-dom";
import "./recipes.css";

const RecipeItem = ({ recipe, username, userId }) => {
    const profileLink = userId ? `/profile/${userId}` : `/profile/${recipe?.chef._id}`;
    return (
        <div className="recipe-item">
            <div className="recipe-item-image-wrapper">
            <img src={recipe?.image.url} alt="" className="recipe-item-image" />
            </div>
            <div className="recipe-item-info-wrapper">
                <div className="recipe-item-info">
                    <div className="recipe-item-author">
                        <strong>Recipe by: </strong>
                        <Link className="recipe-item-username" to={profileLink}>{username ? username : recipe?.chef.username}</Link>
                    </div>
                    <div className="recipe-item-date">
                        {new Date(recipe?.createdAt).toDateString()}
                    </div>
                </div>
                <div className="recipe-item-details">
                    <h4 className="recipe-item-title">{recipe?.title}</h4>
                    <Link className="recipe-item-category" to={`/recipes/categories/${recipe.category}`}>
                        {recipe?.category}
                    </Link>
                </div>
                <p className="recipe-item-description" >
                    {recipe?.description}
                </p>
                <Link className="recipe-item-link" to={`/recipes/details/${recipe?._id}`} >
                    Read More...
                </Link>
            </div>
        </div>
     );
}

export default RecipeItem;
