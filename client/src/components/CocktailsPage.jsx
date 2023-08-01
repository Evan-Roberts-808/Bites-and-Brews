import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";

function CocktailsPage({darkMode}) {
  const [allCocktails, setAllCocktails] = useState([]);
  const [form, setForm] = useState("");
  const [search, setSearch] = useState("");
  const [alcoholFilter, setAlcoholFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cocktailsPerPage] = useState(6);
  const [loading, setLoading] = useState(true); 

  //offCanvas states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    fetch("/api/cocktails")
      .then((response) => response.json())
      .then((data) => {
        setAllCocktails(data)
        setLoading(false)
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner while waiting
  }

  function handleChange(e) {
    setForm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(form);
  }

  function handleSearch(newSearch) {
    setSearch(newSearch);
    setCurrentPage(1); // Reset to the first page when the search query changes
  }

  function handleAlcoholFilter(e) {
    setAlcoholFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when the alcohol filter changes
  }

  const searchedCocktails = allCocktails.filter((el) => {
    const searchMatch = el.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch =
      alcoholFilter === el["drink-type"] || alcoholFilter === "";
    return searchMatch && filterMatch;
  });

  // Pagination logic
  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
  const currentCocktails = searchedCocktails.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  const totalPages = Math.ceil(searchedCocktails.length / cocktailsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function renderPageNumbers() {
    const pageNumbers = [];
    const limit = 2; // Number of page numbers to display on each side of the current page

    if (totalPages > 1) {
      if (currentPage <= limit + 1) {
        for (let i = 1; i <= Math.min(totalPages, limit * 2 + 1); i++) {
          pageNumbers.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        if (totalPages > limit * 2 + 1) {
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
          pageNumbers.push(
            <Pagination.Item
              key={totalPages}
              active={totalPages === currentPage}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Pagination.Item>
          );
        }
      } else if (currentPage >= totalPages - limit) {
        pageNumbers.push(
          <Pagination.Item
            key={1}
            active={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            1
          </Pagination.Item>
        );
        if (totalPages > limit * 2 + 1) {
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
        }
        for (
          let i = Math.max(1, totalPages - limit * 2);
          i <= totalPages;
          i++
        ) {
          pageNumbers.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
      } else {
        pageNumbers.push(
          <Pagination.Item
            key={1}
            active={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            1
          </Pagination.Item>
        );
        if (totalPages > limit * 2 + 1) {
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
        }
        for (
          let i = currentPage - limit;
          i <= currentPage + limit;
          i++
        ) {
          pageNumbers.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        if (totalPages > limit * 2 + 1) {
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis2" />);
          pageNumbers.push(
            <Pagination.Item
              key={totalPages}
              active={totalPages === currentPage}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Pagination.Item>
          );
        }
      }
    }

    return pageNumbers;
  }

  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose} scroll backdrop={false}>
        <Offcanvas.Header closeButton className={darkMode ? "offcanvas-header-dark" : ""}>
          <Offcanvas.Title className={darkMode ? "offcanvas-title-dark" : ""}>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={darkMode ? "offcanvas-header-dark" : ""}>
          <select className="custom-select" name="alcohol" id="alcohol" onChange={(e) => handleAlcoholFilter(e)}>
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
        <h2>Brews</h2>
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
            <button className="searchButton">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#EFEFEF" }}
              type="submit"
              className="my-auto"
            />
            </button>
          </form>
          <button className="filter-button ml-2" onClick={toggleShow}>
            Filter
          </button>
        </div>
      </div>
      <Cards data={currentCocktails} />
      <div className="pagination-container d-flex justify-content-center">
        <Pagination>{renderPageNumbers()}</Pagination>
      </div>
    </Container>
  );
}

export default CocktailsPage;
