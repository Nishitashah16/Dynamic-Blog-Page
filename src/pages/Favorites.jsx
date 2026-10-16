import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { recipes, favorites } = useRecipes();
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <section className="favorites-page">
      <div className="page-intro">
        <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
        <h1>Recipes to <span>make again.</span></h1>
        <p>The recipes you have saved for another delicious day.</p>
      </div>
      {favoriteRecipes.length ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🤍</span>
          <h3>Your favorites live here</h3>
          <p>Explore recipes and tap the heart icon to save them for later.</p>
          <Link to="/" className="button button-primary">Explore recipes</Link>
        </div>
      )}
    </section>
  );
}