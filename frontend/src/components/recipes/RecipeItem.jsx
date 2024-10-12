import { Link } from "react-router-dom";
import "./recipes.css";

const RecipeItem = ({ recipe }) => {
    return (
        <div className="recipe-item">
            <div className="recipe-item-image-wrapper">
                <img src={recipe.image} alt="" className="recipe-item-image" />
            </div>
            <div className="recipe-item-info-wrapper">
                <div className="recipe-item-info">
                    <div className="recipe-item-author">
                        <strong>Recipe by: </strong>
                        <Link className="recipe-item-username" to="/profile/1">{recipe.chef.username}</Link>
                    </div>
                    <div className="recipe-item-date">
                        {new Date(recipe.createdAt).toDateString()}
                    </div>
                </div>
                <div className="recipe-item-details">
                    <h4 className="recipe-item-title">{recipe.title}</h4>
                    <Link className="recipe-item-category" to={`/recipes/categories/${recipe.category}`}>
                        {recipe.category}
                    </Link>
                </div>
                <p className="recipe-item-description" >
                    {recipe.description}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius fuga, unde nesciunt ab saepe eligendi dicta id, aliquam doloremque at rerum aliquid numquam magnam excepturi distinctio blanditiis, ex obcaecati! Quod.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius fuga, unde nesciunt ab saepe eligendi dicta id, aliquam doloremque at rerum aliquid numquam magnam excepturi distinctio blanditiis, ex obcaecati! Quod.
                </p>
                <Link className="recipe-item-link" to={`/recipes/details/${recipe._id}`} >
                    Read More...
                </Link>
            </div>
        </div>
     );
}

export default RecipeItem;
