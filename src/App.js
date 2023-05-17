import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./stylesheets/styles.css";
import Header from "./components/Header";
import Home from "./components/Home";
import RecipesPage from "./components/RecipesPage";
import CocktailsPage from "./components/CocktailsPage";
import FavoritesPage from "./components/FavoritesPage";
import SubmitRecipe from "./components/SubmitRecipe";
import RecipesDetails from "./components/RecipesDetails";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="cocktails" element={<CocktailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="submit" element={<SubmitRecipe />} />
        <Route path="recipes/:id" element={<RecipesDetails />} />
        <Route path="cocktails/:id" element={<RecipesDetails />} />
      </Routes>
    </>
  );
}

export default App;
