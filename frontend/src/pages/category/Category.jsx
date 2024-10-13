import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RcipeList from "../../components/recipes/RecipeList";
import { recipes } from "../../dummyData";
import "./category.css";

const Category = () => {

    const { category } = useParams();

    useEffect(() => {
      window.scrollTo(0,0);
    }, []);

    return (
    <div className="category">
        <h1 className="category-title">{category} recipes</h1>
        <RcipeList recipes={recipes} />
    </div> );
}

export default Category;
