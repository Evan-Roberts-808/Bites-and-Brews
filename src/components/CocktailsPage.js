import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";

function CocktailsPage() {
  const [allCocktails, setAllCocktails] = useState([]);
  const [form, setForm] = useState("");
  const [search, setSearch] = useState("");

  const [alcoholFilter, setAlcoholFilter] = useState("");

  //offCanvas states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    fetch("http://localhost:3001/cocktails")
      .then((response) => response.json())
      .then((data) => setAllCocktails(data));
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

  function handleAlcoholFilter(e) {
    setAlcoholFilter(e.target.value);
  }

  const searchedCocktails = [...allCocktails].filter((el) => {
    const searchMatch = el.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch = alcoholFilter === el['drink-type'] || alcoholFilter === "";
    return searchMatch && filterMatch;
  });

  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <select name="alcohol" id="alcohol" onChange={(e) => handleAlcoholFilter(e)}>
            <option value="">Filter by drink type</option>
            <option value="mojito">Mojito</option>
            <option value="margarita">Margarita</option>
            <option value="martini">Martini</option>
            <option value="daquiri">Daquiri</option>
            <option value="cocktail">Cocktail</option>
            <option value="cosmopolitan">Cosmopolitan</option>
            <option value="hurricane">Hurricane</option>
            <option value="negroni">Negroni</option>
            <option value="bloody mary">Bloody mary</option>
            <option value="bellini">Bellini</option>
            <option value="sangria">Sangria</option>
          </select>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="row">
        <h2>Cocktails</h2>
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
        <button onClick={toggleShow}>Filter</button>
      </div>
      <Cards data={searchedCocktails} />
    </Container>
  );
}

export default CocktailsPage;
