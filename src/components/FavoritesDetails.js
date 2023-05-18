import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";

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
      return <ListGroup.Item>{el}</ListGroup.Item>;
    });
  
    //get <li> items for ingredients
    const mappedInstructions = instructions.map((el) => {
      return <li>{el}</li>;
    });

  return (
    <Container>
    <div className="row">
        <Figure className="col-sm-5">
          <Figure.Image
            src={favoritesDetails.image}
            alt={favoritesDetails.name}
          />
        </Figure>
        <div className="offset-sm-1 col-sm-5 my-auto">
          <h2>
            {favoritesDetails.name + " "}{" "}
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#ff3b3f" }}

            />
          </h2>
          <h4>{favoritesDetails.description}</h4>
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
                <td>{favoritesDetails.preptime}</td>
                <td>{favoritesDetails.cooktime}</td>
                <td>{favoritesDetails.waittime}</td>
                <td>{favoritesDetails.totaltime}</td>
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
  )
}

export default FavoritesDetails