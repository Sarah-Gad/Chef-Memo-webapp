import RecipeItem from "./RecipeItem";

const RcipeList = ({ recipes }) => {
    return (
    <div className="recipe-list">
        {recipes.map(item => <RecipeItem recipe={item} key={item._id} />)}
    </div>
 );
};

export default RcipeList;
