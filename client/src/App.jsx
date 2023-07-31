import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./stylesheets/styles.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileDetails from "./components/ProfileDetails.jsx";
import RecipesPage from "./components/RecipesPage";
import CocktailsPage from "./components/CocktailsPage";
import FavoritesPage from "./components/FavoritesPage";
import SubmitRecipe from "./components/SubmitRecipe";
import RecipesDetails from "./components/RecipesDetails";
import CocktailsDetails from "./components/CocktailsDetails";
import FavoritesDetails from "./components/FavoritesDetails"; 
import Footer from "./components/Footer";
import { UserContext } from "./context/UserContext";

function App() {

  //DARK MODE
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user == null){
      fetch('/check_session')
      .then(response => {
        if (response.ok) {
          response.json().then(user => {setUser(user)})
        }
      })
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className={darkMode ? 'AppDark' : 'App'}>
        <Router>
          <Header darkMode={darkMode} updateDarkMode={() => setDarkMode((prev) => !prev)}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile-details" element={<ProfileDetails />} />
              <Route path="recipes" element={<RecipesPage darkMode={darkMode}/>} />
              <Route path="cocktails" element={<CocktailsPage darkMode={darkMode}/>} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="submit" element={<SubmitRecipe />} />
              <Route path="recipes/:id" element={<RecipesDetails />} />
              <Route path="cocktails/:id" element={<CocktailsDetails />} />
              <Route path="favorites/:id" element={<FavoritesDetails />} />
            </Routes>
          <Footer />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
