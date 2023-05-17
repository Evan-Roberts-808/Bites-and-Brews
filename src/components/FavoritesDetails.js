import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";

function FavoritesDetails() {
  const { id } = useParams();
  const [favoritesDetails, setFavoritesDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/favorites/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setFavoritesDetails(data);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
      });
  }, [id]);

    //get <li> items for ingredients
    const mappedIngredients = ingredients.map((el) => {
      return <li>{el}</li>;
    });
  
    //get <li> items for ingredients
    const mappedInstructions = instructions.map((el) => {
      return <li>{el}</li>;
    });

  return (
    <Container>
<img src={favoritesDetails.image} alt={favoritesDetails.name} />
      <h2>{favoritesDetails.name}</h2>
      <FontAwesomeIcon icon={faHeart} style={{color: "#ff3b3f",}}/>
      <h4>{favoritesDetails.description}</h4>
      <p>Prep Time: {favoritesDetails.preptime}</p>
      <p>Cook Time: {favoritesDetails.cooktime}</p>
      <p>Additional Time: {favoritesDetails.waittime}</p>
      <p>Total Time: {favoritesDetails.totaltime}</p>
      <h2>Ingredients</h2>
      <ul>{mappedIngredients}</ul>
      <h2>Instructions</h2>
      <ul>{mappedInstructions}</ul>
    </Container>
  )
}

export default FavoritesDetails