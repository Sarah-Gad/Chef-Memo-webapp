import "./recipes-page.css";
import { categories } from "../../dummyData";
import { useEffect, useState } from "react";
import RcipeList from "../../components/recipes/RecipeList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, getRecipesCount } from "../../redux/apiCalls/recipeApiCall";

const RECIPE_PER_PAGE = 3;
const RecipesPage = () => {
    const dispatch = useDispatch();
    const { recipesCount, recipes } = useSelector(state => state.recipe)
    const [currentPage, setCurrentPage] = useState(1);
    const pages = Math.ceil(recipesCount / RECIPE_PER_PAGE);

    useEffect(() => {
      dispatch(fetchRecipes(currentPage))
      window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
      dispatch(getRecipesCount());
    }, []);

    return (
    <>
      <section className="recipes-page">
        <RcipeList recipes={recipes} />
        <Sidebar categories={categories} />
      </section>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default RecipesPage;
