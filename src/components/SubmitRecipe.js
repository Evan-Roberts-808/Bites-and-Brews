import React, { useState } from "react";
import Container from "react-bootstrap/Container";

function SubmitRecipe() {
  const initialForm = {
    name: "",
    description: "",
    image: "",
    source: "",
    preptime: "",
    waittime: "",
    cooktime: "",
    totaltime: "",
    servings: 0,
    comments: [],
    likes: 0,
    instructions: [],
    ingredients: [],
    cuisine: "",
    course: "",
    vegetarian: false,
    meat: [],
    contains: [],
  };

  const [formData, setFormData] = useState(initialForm);

  function handlePOST(e) {
    e.preventDefault();
    fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        type: "recipes",
        description: formData.description,
        image: formData.image,
        source: formData.source,
        preptime: formData.preptime,
        waittime: formData.waittime,
        cooktime: formData.cooktime,
        totaltime: formData.totaltime,
        servings: formData.servings,
        comments: [],
        likes: 0,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
        cuisine: formData.cuisine,
        course: formData.course,
        vegetarian: false,
        meat: formData.meat,
        contains: formData.contains,
      }),
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Container>
    <h2 class="page-headings">Submit a Recipe</h2>
      <form className="row d-flex justify-content-center" onSubmit={handlePOST}>
        <div className="col-sm-3">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter recipe name"
          />
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          <label htmlFor="preptime">Prep Time:</label>
          <input
            type="text"
            className="form-control"
            id="preptime"
            name="preptime"
            value={formData.preptime}
            onChange={handleChange}
            placeholder="Enter prep time"
          />
          <label htmlFor="cooktime">Cook Time:</label>
          <input
            type="text"
            className="form-control"
            id="cooktime"
            name="cooktime"
            value={formData.cooktime}
            onChange={handleChange}
            placeholder="Enter cook time"
          />
          <div className="text-area-container">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control resizable"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter recipe description"
            />
          </div>
        </div>

        <div className="col-sm-3 offset-sm-1">
          <label htmlFor="servings">Serving:</label>
          <input
            type="number"
            className="form-control"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            placeholder="Enter servings"
          />
          <label htmlFor="waittime">Wait Time:</label>
          <input
            type="text"
            className="form-control"
            id="waittime"
            name="waittime"
            value={formData.waittime}
            onChange={handleChange}
            placeholder="Enter wait time"
          />
          <label htmlFor="totaltime">Total Time:</label>
          <input
            type="text"
            className="form-control"
            id="totaltime"
            name="totaltime"
            value={formData.totaltime}
            onChange={handleChange}
            placeholder="Enter total time"
          />
           <label>Contains:</label>
          <ul>
            {formData.contains.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  className="form-control"
                  value={item}
                  onChange={(e) => {
                    const updatedContains = [...formData.contains];
                    updatedContains[index] = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      contains: updatedContains,
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
                  setFormData((prevData) => ({
                    ...prevData,
                    contains: [...prevData.contains, ""],
                  }))
                }
              >
                Add Item
              </button>
            </li>
          </ul>
        </div>

        <div className="offset-sm-1 col-sm-3">
          <label htmlFor="cuisine">Cuisine:</label>
          <select
            className="form-control"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          >
            <option value="">Select by cuisine</option>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
            <option value="korean">Korean</option>
            <option value="thai">Thai</option>
            <option value="italian">Italian</option>
            <option value="greek">Greek</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="caribbean">Caribbean</option>
            <option value="american">American</option>
          </select>
          <label htmlFor="vegetarian">Vegetarian:</label>
          <select
            className="form-control"
            id="vegetarian"
            name="vegetarian"
            value={formData.vegetarian}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label htmlFor="course">Course:</label>
          <select
            className="form-control"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select a course</option>
            <option value="appetizer">Appetizer</option>
            <option value="main_course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="side">Side</option>
          </select>
          <label>Meat:</label>
          <ul>
            {formData.meat.map((meat, index) => (
              <li key={index}>
                <input
                  type="text"
                  className="form-control"
                  value={meat}
                  onChange={(e) => {
                    const updatedMeat = [...formData.meat];
                    updatedMeat[index] = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      meat: updatedMeat,
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
                  setFormData((prevData) => ({
                    ...prevData,
                    meat: [...prevData.meat, ""],
                  }))
                }
              >
                Add Meat
              </button>
            </li>
          </ul>
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
                    setFormData((prevData) => ({
                      ...prevData,
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
                  setFormData((prevData) => ({
                    ...prevData,
                    ingredients: [...prevData.ingredients, ""],
                  }))
                }
              >
                Add Ingredient
              </button>
            </li>
          </ul>
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
                    setFormData((prevData) => ({
                      ...prevData,
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
                  setFormData((prevData) => ({
                    ...prevData,
                    instructions: [...prevData.instructions, ""],
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
        </div>
      </form>
    </Container>
  );
}

export default SubmitRecipe;
