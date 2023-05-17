import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

function RecipesDetails() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // setting RecipeDetails state
  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setRecipeDetails(data);
      });
  }, [id]);
  // setting ingredients state

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setIngredients(data.ingredients);
      });
  }, [id]);
  // setting instructions state

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
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
      <img src={recipeDetails.image} alt={recipeDetails.name} />
      <h2>{recipeDetails.name}</h2>
      <h4>{recipeDetails.description}</h4>

      <p>Prep Time: {recipeDetails.preptime}</p>
      <p>Cook Time: {recipeDetails.cooktime}</p>
      <p>Additional Time: {recipeDetails.waittime}</p>
      <p>Total Time: {recipeDetails.totaltime}</p>

      <h2>Ingredients</h2>
      <ul>{mappedIngredients}</ul>

      <h2>Instructions</h2>
      <ul>{mappedInstructions}</ul>
    </Container>
  );
}

export default RecipesDetails;
