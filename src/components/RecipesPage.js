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

  const searchedRecipes = [...allRecipes].filter((el) => {
    const searchMatch = el.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch = cuisineFilter === el.cuisine || cuisineFilter === "";
    return searchMatch && filterMatch;
  });

  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose} scroll backdrop={false}>
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
      <h2>Recipes</h2>
      <div className="row justify-content-center search-filter-row">
        <div className="col-sm-12 d-flex justify-content-center">
          {" "}
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleChange(e)}
              className="form-control mr-2"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#EFEFEF" }}
              type="submit"
              className="my-auto"
            />
          </form>
          <button className="filter-button ml-2" onClick={toggleShow}>
            Filter
          </button>
        </div>
      </div>
      <Cards data={searchedRecipes} />
    </Container>
  );
}

export default RecipesPage;
