import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function FavoritesCards({ data, onDelete}) {
  
  const cards = data.map((data) => {

  function handleDelete(){
    fetch(`/api/users/favorites/${data.id}`,{
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => onDelete(data.id))
  }

    return (
      <Card id="favorites" className="col-sm-3 offset-sm-1" key={data.id}>
        <Card.Img variant="top" src={data.image} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle>{data.pick}</Card.Subtitle>
          <Card.Text className="text-truncate">{data.description}</Card.Text>
          <div className="favoritesCardButtons">
          <Link to={`/favorites/${data.id}`} style={{textDecoration: 'none'}}>
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
