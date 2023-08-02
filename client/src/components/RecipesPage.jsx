import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";

function RecipesPage({darkMode}) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [form, setForm] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [loading, setLoading] = useState(true);

  //offCanvas states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    fetch("/recipes", {
      headers:{
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setAllRecipes(data)
        setLoading(false)
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
    setCurrentPage(1)
  }

  function handleCuisineFilter(e) {
    setCuisineFilter(e.target.value);
    setCurrentPage(1)
  }

  // filters by searchterm or filter settings
  const searchedRecipes = [...allRecipes].filter((el) => {
    const searchMatch = el.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch = cuisineFilter === el.cuisine || cuisineFilter === "";
    return searchMatch && filterMatch;
  });


    // Functionality for React Bootstrap Pagination
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = searchedRecipes.slice(
      indexOfFirstRecipe,
      indexOfLastRecipe
    );
  
    const totalPages = Math.ceil(searchedRecipes.length / recipesPerPage);
  
    function handlePageChange(pageNumber) {
      setCurrentPage(pageNumber);
    }

    function renderPageNumbers() {
      const pageNumbers = [];
      const limit = 3; // Number of page numbers to display before and after ellipsis
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
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
        if (currentPage <= limit + 1) {
          for (let i = 1; i <= limit + 2; i++) {
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
        } else if (currentPage >= totalPages - limit) {
          pageNumbers.push(
            <Pagination.Item
              key={1}
              active={1 === currentPage}
              onClick={() => handlePageChange(1)}
            >
              {1}
            </Pagination.Item>
          );
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis2" />);
          for (let i = totalPages - (limit + 1); i <= totalPages; i++) {
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
              {1}
            </Pagination.Item>
          );
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis3" />);
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
          pageNumbers.push(<Pagination.Ellipsis key="ellipsis4" />);
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
  
      return pageNumbers;
    }

  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose} scroll backdrop={false}>
        <Offcanvas.Header closeButton className={darkMode ? "offcanvas-header-dark" : ""}>
          <Offcanvas.Title className={darkMode ? "offcanvas-title-dark" : ""}>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={darkMode ? "offcanvas-header-dark" : ""}>
          <select className="custom-select" name="cuisine" id="cuisine" onChange={handleCuisineFilter}>
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
      <h2>Bites</h2>
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
      <Cards data={currentRecipes} />
      <div className="pagination-container d-flex justify-content-center">
      <Pagination>
          {renderPageNumbers()}
        </Pagination>
      </div>
    </Container>
  );
}

export default RecipesPage;
