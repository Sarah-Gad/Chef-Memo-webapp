import "./recipes-page.css";
import { categories, recipes } from "../../dummyData";
import { useEffect } from "react";
import RcipeList from "../../components/recipes/RecipeList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";

const RecipesPage = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
    <>
      <section className="recipes-page">
        <RcipeList recipes={recipes} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default RecipesPage;
