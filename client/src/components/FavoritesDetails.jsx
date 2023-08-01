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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/users/favorites/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setFavoritesDetails(data);
        const isRecipes = "recipe" in data;
        setFormData({
          ingredients: isRecipes ? data.recipe.ingredients : data.cocktail.ingredients,
          instructions: isRecipes ? data.recipe.instructions : data.cocktail.instructions,
        });
        setLoading(false)
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

    const isRecipe = "recipe" in favoritesDetails;
    const image = isRecipe ? favoritesDetails.recipe.image : favoritesDetails.cocktail.image;
    const name = isRecipe ? favoritesDetails.recipe.name : favoritesDetails.cocktail.name;
    const description = isRecipe ? favoritesDetails.recipe.description : favoritesDetails.cocktail.description;
    const ingredient = isRecipe ? favoritesDetails.recipe.ingredients : favoritesDetails.cocktail.ingredients;
    const instruction = isRecipe ? favoritesDetails.recipe.instructions : favoritesDetails.cocktail.instructions;
    const preptime = isRecipe ? favoritesDetails.recipe.preptime : favoritesDetails.cocktail.preptime;
    const cooktime = isRecipe ? favoritesDetails.recipe.cooktime : favoritesDetails.cocktail.cooktime;
    const waittime = isRecipe ? favoritesDetails.recipe.waittime : favoritesDetails.cocktail.waittime;
    const totaltime = isRecipe ? favoritesDetails.recipe.totaltime : favoritesDetails.cocktail.totaltime;

    const mappedIngredients = ingredient.map((el) => {
      return <ListGroup.Item>{el}</ListGroup.Item>;
    });
  
    const mappedInstructions = instruction.map((el) => {
      return <li>{el}</li>;
    });

    function handleEditForm(e){
      e.preventDefault();
      console.log("formData:", formData);
      fetch(`/users/favorites/${favoritesDetails.id}`, {
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
            src={image}
            alt={name}
          />
        </Figure>
        <div className="offset-sm-1 col-sm-5 my-auto">
          <h2>
            {name + " "}{" "}
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#ff3b3f" }}

            />
            {/* <button onClick={handleEditSwitch} className="editButton" >Edit</button> */}
          </h2>
          <h4>{description}</h4>
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
                <td>{preptime}</td>
                <td>{cooktime}</td>
                <td>{waittime}</td>
                <td>{totaltime}</td>
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