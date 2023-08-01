import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function FavoritesCards({ data, onDelete }) {
  const cards = data.map((item) => {
    // Check if it's a recipe or cocktail
    const isRecipe = "recipe" in item;
    const id = item.id;
    // Access the properties based on the type
    const image = isRecipe ? item.recipe.image : item.cocktail.image;
    const name = isRecipe ? item.recipe.name : item.cocktail.name;
    const description = isRecipe
      ? item.recipe.description
      : item.cocktail.description;

    function handleDelete() {
      fetch(`/api/users/favorites/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => onDelete(id));
    }

    return (
      <Card id="favorites" className="col-sm-3 offset-sm-1" key={id}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{item.pick}</Card.Subtitle>
          <Card.Text className="text-truncate">{description}</Card.Text>
          <div className="favoritesCardButtons">
            <Link to={`/favorites/${id}`} style={{ textDecoration: "none" }}>
              <button>View Recipe</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </Card.Body>
      </Card>
    );
  });

  return <div className="row justify-content-center">{cards}</div>;
}

export default FavoritesCards;
