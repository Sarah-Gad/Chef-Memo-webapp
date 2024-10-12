import RcipeList from "../../components/recipes/RecipeList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./home.css";
import { recipes, categories } from "../../dummyData";

const Home = () => {
    return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">The secret ingredient is always love!</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest Recipes</div>
      <div className="home-container">
        <RcipeList recipes={recipes.slice(0, 3)} />
        <Sidebar categories={categories} />
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
