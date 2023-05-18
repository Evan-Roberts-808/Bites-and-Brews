import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";

function RecipesDetails() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false)

  // setting RecipeDetails state
  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setRecipeDetails(data);
        setLikeCount(data.likes);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
      });
  }, [id]);

  //get <li> items for ingredients
  const mappedIngredients = ingredients.map((el) => {
    return <ListGroup.Item>{el}</ListGroup.Item>;
  });

  //get <li> items for ingredients
  const mappedInstructions = instructions.map((el) => {
    return <li>{el}</li>;
  });

  const handleLikeClick = () => {
    // Make a PATCH request to update the like count on the server
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: recipeDetails.likes + 1, // Increment like count by 1
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

  function handleFavorite() {
    setIsFavorite(prevIsFavorite => !prevIsFavorite)
    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeDetails),
    });
  }

  return (
    <Container>
      <div className="row">
        <Figure className="col-sm-5">
          <Figure.Image src={recipeDetails.image} alt={recipeDetails.name} />
        </Figure>
        <div className="offset-sm-1 col-sm-5 my-auto">
          <h2>
            {recipeDetails.name + " "}
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: isFavorite ? "#ff3b3f" : "#A9A9A9" }}
              onClick={handleFavorite}
              id="heartIcon"
              className={isFavorite ? "active" : ""}
            />
          </h2>
          <h4>{recipeDetails.description}</h4>
         <p>
         <label>Likes:</label>
         {" " + likeCount}
            {" "}
            <FontAwesomeIcon
              icon={faThumbsUp}
              onClick={handleLikeClick}
              style={{
                color: "#ff3b3f",
              }}
            />{" "}
          </p>
          <Table striped className="custom-table">
            <thead>
              <tr>
                <th>Prep Time</th>
                <th>Cook Time</th>
                <th>Additional Time</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{recipeDetails.preptime}</td>
                <td>{recipeDetails.cooktime}</td>
                <td>{recipeDetails.waittime}</td>
                <td>{recipeDetails.totaltime}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row">
        <Card id="ingredients" className="col-sm-5 align-self-start">
          <Card.Header>Ingredients</Card.Header>
          <ListGroup variant="flush">{mappedIngredients}</ListGroup>
        </Card>
        <div className="offset-sm-1 col-sm-5">
          <h2>Instructions</h2>
          <ol>{mappedInstructions}</ol>
        </div>
      </div>
    </Container>
  );
}

export default RecipesDetails;
