import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipes } from "../context/RecipeContext";

export default function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const handleAdd = (recipe) => {
    const savedRecipe = addRecipe(recipe);
    navigate(`/recipe/${savedRecipe.id}`);
  };

  return (
    <section className="form-page">
      <div className="page-intro">
        <span className="eyebrow">ADD SOMETHING DELICIOUS</span>
        <h1>Share a recipe <span>with your future self.</span></h1>
        <p>Save the ingredients and steps so your next cooking session is easy.</p>
      </div>
      <div className="form-panel">
        <div className="form-panel-heading"><span className="panel-icon">🍳</span></div>
        <RecipeForm onSubmit={handleAdd} />
      </div>
    </section>
  );
}