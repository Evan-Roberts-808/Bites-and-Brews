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
  const initialForm = {
    ingredients: [],
    instructions: [],
  }
  const [formData, setFormData] = useState(initialForm);
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    fetch(`https://bitesandbrews.onrender.com/favorites/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setFavoritesDetails(data);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setFormData({
          ingredients: data.ingredients,
          instructions: data.instructions, 
      });
    }
  )}, [id]);

    //get <li> items for ingredients
    const mappedIngredients = ingredients.map((el) => {
      return <ListGroup.Item>{el}</ListGroup.Item>;
    });
  
    //get <li> items for ingredients
    const mappedInstructions = instructions.map((el) => {
      return <li>{el}</li>;
    });

    function handleEditForm(e){
      e.preventDefault();
      fetch(`https://bitesandbrews.onrender.com/favorites/${favoritesDetails.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(formData)
      })
      .then((response) => response.json())
      .then((updatedData) => {
      setIngredients(updatedData.ingredients);
      setInstructions(updatedData.instructions);
      setFormData({
        ingredients: updatedData.ingredients,
        instructions: updatedData.instructions,
      });
      setEdit(false);
    });
    }

    function handleEditSwitch(){
      setEdit(prevEdit => !prevEdit)
    }

  return (
    <Container>
    {!edit ? (
      <>
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
            <button onClick={handleEditSwitch} className="editButton" >Edit</button>
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
      </>
    ) : (
      <>
  <form className="row d-flex justify-content-center" onSubmit={handleEditForm}>
  <div className="col-sm-6">
    <label>Ingredients:</label>
    <ul>
      {formData.ingredients.map((ingredient, index) => (
        <li key={index}>
          <input
            type="text"
            className="form-control"
            value={ingredient}
            onChange={(e) => {
              const updatedIngredients = [...formData.ingredients];
              updatedIngredients[index] = e.target.value;
              setFormData((prevForm) => ({
                ...prevForm,
                ingredients: updatedIngredients,
              }));
            }}
          />
        </li>
      ))}
      <li>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            setFormData((prevForm) => ({
              ...prevForm,
              ingredients: [...prevForm.ingredients, ""],
            }))
          }
        >
          Add Ingredient
        </button>
      </li>
    </ul>
  </div>

  <div className="col-sm-6">
    <label>Instructions:</label>
    <ol>
      {formData.instructions.map((instruction, index) => (
        <li key={index}>
          <input
            type="text"
            className="form-control"
            value={instruction}
            onChange={(e) => {
              const updatedInstructions = [...formData.instructions];
              updatedInstructions[index] = e.target.value;
              setFormData((prevForm) => ({
                ...prevForm,
                instructions: updatedInstructions,
              }));
            }}
          />
        </li>
      ))}
      <li>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            setFormData((prevForm) => ({
              ...prevForm,
              instructions: [...prevForm.instructions, ""],
            }))
          }
        >
          Add Instruction
        </button>
      </li>
    </ol>
  </div>

  <div className="col-sm-12 text-center">
    <button type="submit" className="btn submit-btn">
      Submit
    </button>
    <button type="button" className="btn cancel-btn" onClick={handleEditSwitch}>
      Cancel
    </button>
  </div>
</form>
</>
)}
    </Container>
  )
}

export default FavoritesDetails