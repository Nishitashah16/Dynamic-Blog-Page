import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import Favorites from "./pages/Favorites.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}