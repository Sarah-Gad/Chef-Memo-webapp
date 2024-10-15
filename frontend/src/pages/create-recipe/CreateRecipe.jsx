import "./create-recipe.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../redux/apiCalls/recipeApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const { loading, isRecipeCreated } = useSelector(state => state.recipe);
    const { categories } = useSelector(state => state.category);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [category, setCategory] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [file, setFile] = useState(null);

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
        if (!file) return toast.error("Recipe Image is required");
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("ingredients", ingredients);
        formData.append("instructions", instructions);
        formData.append("cookTime", cookTime);
        formData.append("category", category);
        dispatch(createRecipe(formData));
        };

    const navigate = useNavigate();
    useEffect(() => {
        if(isRecipeCreated) {
            navigate("/")
        }
        window.scrollTo(0,0);
    }, [isRecipeCreated, navigate]);

    useEffect(() => {
        dispatch(fetchCategories());
      }, []);

    return (
        <section className="create-recipe">
        <h1 className="create-recipe-title">Add Your Signature Dish</h1>
        <form onSubmit={formSubmitHandler} className="create-recipe-form">
            <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Name Your Dish"
            className="create-recipe-input"
            />
            <select
            className="create-recipe-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option disabled value="">
                Select A Category
            </option>
            {categories.map(category => <option key={category._id} value={category.title}>{category.title}</option>)}
            </select>
            <textarea
            className="create-recipe-textarea"
            placeholder="Recipe Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            ></textarea>
            <textarea
            className="create-recipe-textarea"
            placeholder="Recipe ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
            ></textarea>
            <textarea
            className="create-recipe-textarea"
            placeholder="Recipe instructions"
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
            <input
            className="create-recipe-upload"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="create-recipe-btn">
            {
                loading ? "Loading the recipe..." : "Add recipe"
            }
            </button>
        </form>
        </section>
    );
    };

    export default CreateRecipe;
