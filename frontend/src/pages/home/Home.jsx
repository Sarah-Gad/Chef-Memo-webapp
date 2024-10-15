import RcipeList from "../../components/recipes/RecipeList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./home.css";
import { fetchRecipes } from "../../redux/apiCalls/recipeApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector(state => state.recipe)

  useEffect(() => {
    dispatch(fetchRecipes(1))
  }, []);

    return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">The secret ingredient is always love!</h1>
        </div>
      </div>
      <div className="home-latest-recipe">Latest Recipes</div>
      <div className="home-container">
        <RcipeList recipes={recipes} />
        <Sidebar />
      </div>
      <div className="home-see-recipes-link">
        <Link className="home-link" to="/recipes">
          See All Recipes
        </Link>
      </div>
    </section>
  );
};

export default Home;
