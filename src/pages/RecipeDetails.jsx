import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, isFavorite, toggleFavorite, deleteRecipe } = useRecipes();
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <main className="details-page">
        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">🍽️</span>
          <h1>Recipe not found</h1>
          <p>This recipe may have been removed or the link is incorrect.</p>
          <Link to="/" className="button button-primary">Explore recipes</Link>
        </div>
      </main>
    );
  }

  const favorite = isFavorite(recipe.id);

  const handleDelete = () => {
    if (window.confirm(`Delete "${recipe.title}"? This cannot be undone.`)) {
      deleteRecipe(recipe.id);
      navigate("/");
    }
  };

  return (
    <main className="details-page">
      <Link className="back-link" to="/">← All recipes</Link>

      <article className="recipe-detail">
        <div className="detail-image-wrap">
          <img
            className="detail-image"
            src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"}
            alt={recipe.title}
          />
        </div>

        <div className="detail-content">
          <div className="detail-heading">
            <div>
              <span className="eyebrow">{recipe.category}</span>
              <h1>{recipe.title}</h1>
              <p className="detail-description">{recipe.description}</p>
            </div>
            <button
              className={`button favorite-toggle ${favorite ? "is-favorite" : ""}`}
              type="button"
              onClick={() => toggleFavorite(recipe.id)}
              aria-pressed={favorite}
            >
              {favorite ? "♥ Saved" : "♡ Save"}
            </button>
          </div>

          <div className="detail-meta">
            <span>⏱ {recipe.time} minutes</span>
            <span>🍽 {recipe.servings} servings</span>
            <span>{recipe.difficulty} difficulty</span>
          </div>

          <div className="detail-columns">
            <section>
              <h2>Ingredients</h2>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={`${ingredient}-${index}`}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Method</h2>
              <ol className="instruction-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`}>
                    <span className="step-number">{index + 1}</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <button className="delete-recipe" type="button" onClick={handleDelete}>
            Delete recipe
          </button>
        </div>
      </article>
    </main>
  );
}