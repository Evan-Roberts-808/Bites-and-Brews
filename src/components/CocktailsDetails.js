import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

function CockatilsDetails() {
  const { id } = useParams();
  const [cocktailDetails, setcocktailDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // setting cocktailDetails state
  useEffect(() => {
    fetch(`http://localhost:3001/cocktails/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setcocktailDetails(data);
      });
  }, [id]);

  // setting ingredients state
  useEffect(() => {
    fetch(`http://localhost:3001/cocktails/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setIngredients(data.ingredients);
      });
  }, [id]);

  // setting instructions state
  useEffect(() => {
    fetch(`http://localhost:3001/cocktails/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setInstructions(data.instructions);
      });
  }, [id]);

  //get <li> items for ingredients
  const mappedIngredients = ingredients.map((el) => {
    return <li>{el}</li>
  })

  //get <li> items for ingredients
  const mappedInstructions = instructions.map((el) => {
    return <li>{el}</li>
  })

  return (
    <Container>
      <img src={cocktailDetails.image} alt={cocktailDetails.name} />
      <h2>{cocktailDetails.name}</h2>
      <h4>{cocktailDetails.description}</h4>

      <p>Prep Time: {cocktailDetails.preptime}</p>
      <p>Cook Time: {cocktailDetails.cooktime}</p>
      <p>Additional Time: {cocktailDetails.waittime}</p>
      <p>Total Time: {cocktailDetails.totaltime}</p>

      <h2>Ingredients</h2>
      <ul>{mappedIngredients}</ul>

      <h2>Instructions</h2>
      <ul>{mappedInstructions}</ul>
    </Container>
  );
}

export default CockatilsDetails;
