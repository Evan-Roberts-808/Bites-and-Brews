import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Slideshow() {
  const [recipesArray, setRecipesArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes?_sort=id&_order=desc&_limit=5")
      .then((r) => r.json())
      .then((data) => setRecipesArray(data));
  }, []);

  const mappedRecipes = [...recipesArray].map((el) => {


    return (
      <Carousel.Item key={el.id}>
        <Link to={`/recipes/${el.id}`}>
          <img className="d-block w-100" src={el.image} alt={el.name} />
        </Link>
        <Carousel.Caption>
          <h3>{el.name}</h3>
          <p>{el.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return <Carousel fade>{mappedRecipes}</Carousel>;
}

export default Slideshow;
