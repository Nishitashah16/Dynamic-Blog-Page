import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeCard({ recipe }) {
  const { favorites, toggleFavorite } = useRecipes();
  const isFavorite = favorites.includes(recipe.id);

  return (
    <article className="recipe-card">
      <div className="card-image-wrap">
        <img
          src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
          alt={recipe.title}
          loading="lazy"
        />
        <span className="category-pill">{recipe.category}</span>
        <button
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          type="button"
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >{isFavorite ? "❤️" : "🤍"}</button>
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span>⏱ {recipe.time} min</span>
          <span>{recipe.difficulty}</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="card-bottom">
          <span className="servings">🍽️ {recipe.servings} servings</span>
          <Link className="text-link" to={`/recipe/${recipe.id}`}>View recipe</Link>
        </div>
      </div>
    </article>
  );
}