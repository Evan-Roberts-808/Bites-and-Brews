import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";

function RecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [form, setForm] = useState("");
  const [search, setSearch] = useState("");

  const [cuisineFilter, setCuisineFilter] = useState("");

  //offCanvas states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => setAllRecipes(data));
  }, []);

  function handleChange(e) {
    setForm(e.target.value);
    console.log(form);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(form);
  }

  function handleSearch(newSearch) {
    setSearch(newSearch);
  }

  function handleCuisineFilter(e) {
    setCuisineFilter(e.target.value);
  }

  console.log(allRecipes);

  const searchedRecipes = [...allRecipes].filter((el) => {
    const searchMatch = el.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch = cuisineFilter === el.cuisine || cuisineFilter === "";
    return searchMatch && filterMatch;
  });

  //random recipe

  function getRandomRecipe() {
    const filteredRecipes = allRecipes.filter((el) => {
      const totalTime = parseInt(el.totaltime);
      return totalTime <=30;
    });

    const randomIndex = Math.floor(Math.random()  * filteredRecipes.length)
    const randomRecipe = filteredRecipes[randomIndex]

    console.log(randomRecipe)
  }

  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <select name="cuisine" id="cuisine" onChange={handleCuisineFilter}>
            <option value="">Select by cuisine</option>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
            <option value="korean">Korean</option>
            <option value="thai">Thai</option>
            <option value="italian">Italian</option>
            <option value="greek">Greek</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="caribbean">Caribbean</option>
            <option value="american">American</option>
          </select>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="row">
        <h2>Recipes</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChange(e)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#FF3B3F" }}
            type="submit"
          />
        </form>
        <button onClick={getRandomRecipe}>Show random recipe!</button>
        <button onClick={toggleShow}>Filter</button>
      </div>
      <Cards data={searchedRecipes} />
    </Container>
  );
}

export default RecipesPage;
