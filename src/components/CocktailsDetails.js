import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

function CockatilsDetails() {
  const { id } = useParams();
  const [cocktailDetails, setcocktailDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [likeCount, setLikeCount] = useState(0);


  // setting cocktailDetails state
  useEffect(() => {
    fetch(`http://localhost:3001/cocktails/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setcocktailDetails(data);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setLikeCount(data.likes)
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

  const handleLikeClick = () => {
    // Make a PATCH request to update the like count on the server
    fetch(`http://localhost:3001/cocktails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: cocktailDetails.likes + 1, // Increment like count by 1
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLikeCount(data.likes); // Update like count in state with the updated value from the server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <img src={cocktailDetails.image} alt={cocktailDetails.name} />
      <h2>{cocktailDetails.name}</h2>
      <FontAwesomeIcon
        icon={faThumbsUp}
        onClick={handleLikeClick}
        style={{
          "--fa-primary-color": "#ff3b3f",
          "--fa-secondary-color": "#c52b30",
        }}
      />
      <p>{likeCount}</p>
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
