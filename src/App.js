import React, {useState} from 'react'
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
import CocktailsDetails from "./components/CocktailsDetails";
import FavoritesDetails from "./components/FavoritesDetails"; 
import Footer from "./components/Footer";

function App() {

  //DARK MODE
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'AppDark' : 'App'}>
      <Header darkMode={darkMode} updateDarkMode={() => setDarkMode((prev) => !prev)}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipes" element={<RecipesPage darkMode={darkMode}/>} />
        <Route path="cocktails" element={<CocktailsPage darkMode={darkMode}/>} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="submit" element={<SubmitRecipe />} />
        <Route path="recipes/:id" element={<RecipesDetails />} />
        <Route path="cocktails/:id" element={<CocktailsDetails />} />
        <Route path="favorites/:id" element={<FavoritesDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
