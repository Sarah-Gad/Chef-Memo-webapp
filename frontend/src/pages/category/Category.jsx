import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RcipeList from "../../components/recipes/RecipeList";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesBasedOnCate } from "../../redux/apiCalls/recipeApiCall";

const Category = () => {
    const dispatch = useDispatch();
    const { recipesCate } = useSelector(state => state.recipe)
    const { category } = useParams();

    useEffect(() => {
      dispatch(fetchRecipesBasedOnCate(category))
      window.scrollTo(0,0);
    }, [category]);

    return (
    <div className="category">
      {recipesCate.length === 0 ?
      <>
        <h1 className="category-not-found">
        There are no {category} recipes yet ! Be the first to share your amazing <span>{category}</span> recipes with our community!
        </h1>
      </>
      :
      <>
        <h1 className="category-title">{category} recipes</h1>
        <RcipeList recipes={recipesCate} />
      </>
      }
    </div> );
}

export default Category;
