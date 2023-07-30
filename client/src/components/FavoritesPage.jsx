import React, { useState, useEffect } from "react";
import FavoritesCards from "./FavoritesCards";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function FavoritesPage() {
  const [allFavorites, setAllFavorites] = useState([])
  const [form, setForm] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('https://bitesandbrews.onrender.com/favorites')
    .then(response => response.json())
    .then((data) => setAllFavorites(data))
  }, [])

  function handleChange(e) {
    setForm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(form);
  }

  function handleSearch(newSearch) {
    setSearch(newSearch);
  }

  function handleDelete(deletedRecipe){
    const updatedFavorites = [...allFavorites].filter((favorite) => favorite.id !== deletedRecipe)
    setAllFavorites(updatedFavorites)
  }

  const searchedFavorites = [...allFavorites].filter((el) => {
    const searchMatch = el.name.toLowerCase().includes(search.toLowerCase());
    return searchMatch;
  });

  return (
    <Container>
        <h2>Favorites</h2>
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
        </div>
      </div>
      <FavoritesCards data={searchedFavorites} onDelete={handleDelete}/>
    </Container>
  )
}

export default FavoritesPage