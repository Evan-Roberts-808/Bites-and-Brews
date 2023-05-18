import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Cards({ data }) {

  const cards = data.map((data) => {
    const url = data.type === "recipes" ? `/recipes/${data.id}` : `/cocktails/${data.id}`;
    return (
      <Card className="col-sm-3 offset-sm-1" key={data.id}>
        <Card.Img variant="top" src={data.image} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle>{data.pick}</Card.Subtitle>
          <Card.Text className="text-truncate">{data.description}</Card.Text>
          <Link to={url} style={{textDecoration: 'none'}}>
            <button>View Recipe</button>
          </Link>
        </Card.Body>
      </Card>
    );
  });

  return <div className="row justify-content-center">{cards}</div>;
}

export default Cards;
