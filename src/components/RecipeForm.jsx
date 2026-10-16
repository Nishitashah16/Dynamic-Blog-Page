import { useState } from "react";

const emptyForm = {
  title: "",
  category: "Dinner",
  time: "20",
  servings: "2",
  difficulty: "Easy",
  image: "",
  description: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ingredients = form.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    const instructions = form.instructions
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      setError("Please add a title, description, ingredients, and instructions.");
      return;
    }

    setError("");
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      time: Number(form.time),
      servings: Number(form.servings),
      ingredients,
      instructions,
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field form-field-wide">
          <span>Recipe name</span>
          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="e.g. Sunday tomato soup"
            required
          />
        </label>

        <label className="form-field">
          <span>Category</span>
          <select name="category" value={form.category} onChange={update}>
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"].map(
              (category) => (
                <option key={category}>{category}</option>
              )
            )}
          </select>
        </label>

        <label className="form-field">
          <span>Difficulty</span>
          <select name="difficulty" value={form.difficulty} onChange={update}>
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <option key={difficulty}>{difficulty}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Cooking time (minutes)</span>
          <input
            name="time"
            type="number"
            min="1"
            value={form.time}
            onChange={update}
            required
          />
        </label>

        <label className="form-field">
          <span>Servings</span>
          <input
            name="servings"
            type="number"
            min="1"
            value={form.servings}
            onChange={update}
            required
          />
        </label>

        <label className="form-field form-field-wide">
          <span>Image URL <span className="field-note">(optional)</span></span>
          <input
            name="image"
            type="url"
            value={form.image}
            onChange={update}
            placeholder="https://example.com/your-dish.jpg"
          />
        </label>

        <label className="form-field form-field-wide">
          <span>Short description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={update}
            rows="3"
            placeholder="What makes this recipe special?"
            required
          />
        </label>

        <label className="form-field form-field-wide">
          <span>Ingredients <span className="field-note">(one per line)</span></span>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={update}
            rows="6"
            placeholder={"2 cups flour\n1 cup milk\nA pinch of salt"}
            required
          />
        </label>

        <label className="form-field form-field-wide">
          <span>Instructions <span className="field-note">(one step per line)</span></span>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={update}
            rows="6"
            placeholder={"Preheat the oven.\nMix the ingredients.\nBake until golden."}
            required
          />
        </label>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button className="button button-primary form-submit" type="submit">
        Save recipe <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}