import "./update-recipe.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../redux/apiCalls/recipeApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdateRecipeModal = ( { setUpdaterecipe, recipe }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);
    const [category, setCategory] = useState(recipe.category);
    const [cookTime, setCookTime] = useState(recipe.cookTime);

    // From Submit Handler
    const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Recipe Name is required");
    if (category.trim() === "") return toast.error("Recipe Category is required");
    if (description.trim() === "")
        return toast.error("Recipe Description is required");
    if (ingredients.trim() === "")
        return toast.error("Recipe ingredients are required");
    if (instructions.trim() === "")
        return toast.error("Recipe instructions are required");
    if (!cookTime) return toast.error("Recipe Cook Time is required");
    dispatch(updateRecipe({ title, description, category, ingredients,instructions, cookTime }, recipe?._id));
    setUpdaterecipe(false);
    };

    useEffect(() => {
      dispatch(fetchCategories());
    }, []);

    return (
    <div className="update-recipe">
      <form onSubmit={formSubmitHandler} className="update-recipe-form">
        <abbr title="close">
          <i
            onClick={() => setUpdaterecipe(false)}
            className="bi bi-x-circle-fill update-recipe-form-close"
          ></i>
        </abbr>
        <h1 className="update-recipe-title">Update recipe</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-recipe-input"
        />
        <select
          className="update-recipe-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {
            categories.map(category => <option key={category._id} value={category.title}>{category.title}</option>)
          }
        </select>
        <textarea
          className="update-recipe-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <textarea
          className="update-recipe-textarea"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="5"
        ></textarea>
        <textarea
          className="update-recipe-textarea"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows="5"
        ></textarea>
        <input
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            type="number"
            min="1"
            placeholder="Cook Time in Minutes"
            className="create-recipe-cooktime"
        />
        <button type="submit" className="update-recipe-btn">
          Update recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipeModal;
