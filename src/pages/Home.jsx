import { useMemo, useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Drinks",
];

export default function Home() {
  const { recipes = [] } = useRecipes();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase().trim();

    return recipes.filter((recipe) => {
      const matchesCategory =
        category === "All" || recipe.category === category;

      const searchableText = [
        recipe.title,
        recipe.description,
        recipe.category,
        ...(Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [recipes, search, category]);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR LITTLE KITCHEN
          </span>

          <h1>
            Good food.
            <br />
            <span>Good mood.</span>
          </h1>

          <p>
            Keep your favorite recipes close, discover your next
            meal, and make every bite a little more special.
          </p>

          <a
            className="button button-primary hero-button"
            href="#recipes"
          >
            Explore recipes
            <span aria-hidden="true"> →</span>
          </a>

          <div className="hero-stats">
            <div>
              <strong>
                {String(recipes.length).padStart(2, "0")}
              </strong>
              <span>Recipes</span>
            </div>

            <div>
              <strong>
                {String(
                  new Set(recipes.map((recipe) => recipe.category))
                    .size
                ).padStart(2, "0")}
              </strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Homemade love</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f17399e?auto=format&fit=crop&w=1200&q=80"
            alt="Freshly prepared food on a table"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80";
            }}
          />

          <div className="hero-image-label">
            <span aria-hidden="true">🍃</span>
            <div>
              <strong>Made with love</strong>
              <span>One recipe at a time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Collection */}
      <section className="recipes-section" id="recipes">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT FAVORITE</span>
            <h2>What sounds good?</h2>
            <p>
              Delicious ideas for every craving and every occasion.
            </p>
          </div>

          <span className="recipe-count">
            {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1 ? "recipe" : "recipes"}
          </span>
        </div>

        {/* Search */}
        <div className="recipe-toolbar">
          <div className="search-box">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              placeholder="Search recipes or ingredients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search recipes or ingredients"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters" aria-label="Recipe categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-button ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Recipe Cards */}
        {filteredRecipes.length > 0 ? (
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">
              🍽️
            </div>

            <h3>No recipes found</h3>

            <p>
              {search
                ? `We couldn't find any recipes matching "${search}". Try another search.`
                : `There are no recipes in the ${category} category yet.`}
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Show all recipes
            </button>
          </div>
        )}
      </section>
    </main>
  );
}