import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand" aria-label="RecipeBook home">
          <span className="brand-icon">🍳</span>
          <span>recipe<span className="brand-accent">book</span></span>
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Explore</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/add-recipe" className="nav-add">+ Add recipe</NavLink>
        </nav>
      </div>
    </header>
  );
}