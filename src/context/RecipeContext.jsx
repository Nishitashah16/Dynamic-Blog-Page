import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "recipebook-recipes-v1";
const FAVORITES_KEY = "recipebook-favorites-v1";

const starterRecipes = [
  {
    id: "r1",
    title: "Creamy Garlic Pasta",
    category: "Dinner",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    description:
      "Creamy garlic pasta tossed with parmesan, herbs, and a rich, silky sauce.",
    ingredients: [
      "200 g pasta",
      "3 garlic cloves, minced",
      "2 tbsp butter",
      "1/2 cup cream",
      "1/2 cup grated parmesan",
      "Salt and black pepper to taste",
      "Fresh parsley",
    ],
    instructions: [
      "Boil pasta in salted water according to the packet instructions.",
      "Melt butter in a pan over medium heat and sauté garlic until fragrant.",
      "Add cream, parmesan, salt, and pepper. Stir until the sauce thickens.",
      "Add the cooked pasta and toss until evenly coated.",
      "Garnish with fresh parsley and serve warm.",
    ],
  },
  {
    id: "r2",
    title: "Avocado Toast",
    category: "Breakfast",
    time: 10,
    servings: 1,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description:
      "Crispy sourdough topped with creamy avocado, lemon, chilli flakes, and fresh herbs.",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "1 tsp lemon juice",
      "1/4 tsp chilli flakes",
      "Salt and black pepper to taste",
      "Fresh coriander or parsley",
    ],
    instructions: [
      "Toast the bread until golden and crispy.",
      "Cut the avocado in half, remove the stone, and scoop the flesh into a bowl.",
      "Mash the avocado with lemon juice, salt, and black pepper.",
      "Spread the avocado mixture over the toasted bread.",
      "Sprinkle with chilli flakes and fresh herbs. Serve immediately.",
    ],
  },
  {
    id: "r3",
    title: "Rainbow Buddha Bowl",
    category: "Lunch",
    time: 30,
    servings: 2,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description:
      "A colorful, nourishing bowl with quinoa, crunchy vegetables, chickpeas, and a zesty lemon dressing.",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cucumber",
      "1 carrot",
      "1 cup cooked chickpeas",
      "1 cup shredded red cabbage",
      "1 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook the quinoa according to the packet instructions and let it cool slightly.",
      "Wash and chop the cucumber, grate the carrot, and shred the cabbage.",
      "Place the cooked quinoa and chickpeas in serving bowls.",
      "Arrange the prepared vegetables over the quinoa.",
      "Whisk olive oil, lemon juice, salt, and pepper to make the dressing.",
      "Drizzle the dressing over the bowls and serve.",
    ],
  },
];

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : starterRecipes;
    } catch {
      return starterRecipes;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error("Could not save recipes:", error);
    }
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Could not save favorites:", error);
    }
  }, [favorites]);

  // Add a new recipe
  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: recipe.id || `recipe-${Date.now()}`,
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : [],
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions
        : [],
    };

    setRecipes((current) => [newRecipe, ...current]);
    return newRecipe;
  };

  // Update an existing recipe
  const updateRecipe = (id, updates) => {
    setRecipes((current) =>
      current.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updates, id } : recipe
      )
    );
  };

  // Delete a recipe and remove it from favorites
  const deleteRecipe = (id) => {
    setRecipes((current) =>
      current.filter((recipe) => recipe.id !== id)
    );

    setFavorites((current) =>
      current.filter((favoriteId) => favoriteId !== id)
    );
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  // Check if a recipe is a favorite
  const isFavorite = (id) => favorites.includes(id);

  // Get all favorite recipes
  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  const value = {
    recipes,
    setRecipes,
    favorites,
    setFavorites,
    favoriteRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    isFavorite,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

// Access recipe data and actions from any child component
// eslint-disable-next-line react-refresh/only-export-components
export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(
      "useRecipes must be used inside a RecipeProvider"
    );
  }

  return context;
}