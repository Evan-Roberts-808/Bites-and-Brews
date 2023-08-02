import React, { useState } from "react";
import Container from "react-bootstrap/Container";

function SubmitRecipe() {
  const initialRecipeForm = {
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

  const initialCocktailForm = {
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
    "drink_type": "",
    "alcohol_type": []
  }

  const [formData, setFormData] = useState(initialRecipeForm);
  const [cocktailForm, setCocktailForm] = useState(initialCocktailForm)

  const [whichForm, setWhichForm] = useState(true)

  function handleSwitch(){
    setWhichForm(prevWhichForm => !prevWhichForm)
  }

  function handlePOST(e) {
    e.preventDefault();
    fetch("/recipe", {
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
    })
    .then(setFormData(initialRecipeForm))
  }

  function handleCocktailPOST(e) {
    e.preventDefault();
    fetch('/cocktail', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: cocktailForm.name,
        type: "cocktail",
        description: cocktailForm.description,
        image: cocktailForm.image,
        source: cocktailForm.source,
        preptime: cocktailForm.preptime,
        waittime: cocktailForm.waittime,
        cooktime: cocktailForm.cooktime,
        totaltime: cocktailForm.totaltime,
        servings: cocktailForm.servings,
        comments: [],
        likes: 0,
        instructions: cocktailForm.instructions,
        ingredients: cocktailForm.ingredients,
        "drink_type": cocktailForm["drink_type"],
        "alcohol_type": cocktailForm["alcohol_type"]

      })
    })
    .then(setCocktailForm(initialCocktailForm))
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleCocktailChange(e) {
    setCocktailForm({
      ...cocktailForm,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Container>
    <button className="formSwitch" onClick={handleSwitch}>{whichForm ? "Show Cocktail Form" : "Show Recipe Form"}</button>
    {whichForm ? (
    <>
    <h2 className="page-headings">Submit a Recipe</h2>
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
           <label>Allergens:</label>
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
    </>
      ) : (
    <>
    <h2 className="page-headings">Submit a Cocktail</h2>
    <form className="row d-flex justify-content-center" onSubmit={handleCocktailPOST}>
  <div className="col-sm-3">
    <label htmlFor="name">Cocktail Name:</label>
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      value={cocktailForm.name}
      onChange={handleCocktailChange}
      placeholder="Enter cocktail name"
    />
    <label htmlFor="image">Image URL:</label>
    <input
      type="text"
      className="form-control"
      id="image"
      name="image"
      value={cocktailForm.image}
      onChange={handleCocktailChange}
      placeholder="Enter image URL"
    />
    <label htmlFor="preptime">Prep Time:</label>
    <input
      type="text"
      className="form-control"
      id="preptime"
      name="preptime"
      value={cocktailForm.preptime}
      onChange={handleCocktailChange}
      placeholder="Enter prep time"
    />
    <label htmlFor="cooktime">Cook Time:</label>
    <input
      type="text"
      className="form-control"
      id="cooktime"
      name="cooktime"
      value={cocktailForm.cooktime}
      onChange={handleCocktailChange}
      placeholder="Enter cook time"
    />
    <div className="text-area-container">
      <label htmlFor="description">Description:</label>
      <textarea
        className="form-control resizable"
        id="description"
        name="description"
        value={cocktailForm.description}
        onChange={handleCocktailChange}
        placeholder="Enter cocktail description"
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
      value={cocktailForm.servings}
      onChange={handleCocktailChange}
      placeholder="Enter servings"
    />
    <label htmlFor="waittime">Wait Time:</label>
    <input
      type="text"
      className="form-control"
      id="waittime"
      name="waittime"
      value={cocktailForm.waittime}
      onChange={handleCocktailChange}
      placeholder="Enter wait time"
    />
    <label htmlFor="totaltime">Total Time:</label>
    <input
      type="text"
      className="form-control"
      id="totaltime"
      name="totaltime"
      value={cocktailForm.totaltime}
      onChange={handleCocktailChange}
      placeholder="Enter total time"
    />
    <label htmlFor="source">Source:</label>
    <input
      type="text"
      className="form-control"
      id="source"
      name="source"
      value={cocktailForm.source}
      onChange={handleCocktailChange}
      placeholder="Enter source"
    />
    <label>Alcohol Type:</label>
    <ul>
      {cocktailForm["alcohol_type"].map((type, index) => (
        <li key={index}>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => {
              const updatedAlcoholTypes = [...cocktailForm["alcohol_type"]];
              updatedAlcoholTypes[index] = e.target.value;
              setCocktailForm((prevForm) => ({
                ...prevForm,
                "alcohol_type": updatedAlcoholTypes,
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
            setCocktailForm((prevForm) => ({
              ...prevForm,
              "alcohol_type": [...prevForm["alcohol_type"], ""],
            }))
          }
        >
          Add Alcohol Type
        </button>
      </li>
    </ul>
  </div>

  <div className="offset-sm-1 col-sm-3">
    <label htmlFor="drink_type">Drink Type:</label>
    <select
      className="form-control"
      id="drink_type"
      name="drink_type"
      value={cocktailForm["drink_type"]}
      onChange={handleCocktailChange}
    >
      <option value="">Select a drink type</option>
      <option value="mojito">Mojito</option>
      <option value="margarita">Margarita</option>
      <option value="martini">Martini</option>
      <option value="daquiri">Daquiri</option>
      <option value="cocktail">Cocktail</option>
      <option value="cosmopolitan">Cosmopolitan</option>
      <option value="hurricane">Hurricane</option>
      <option value="negroni">Negroni</option>
      <option value="bloody mary">Bloody mary</option>
      <option value="bellini">Bellini</option>
      <option value="sangria">Sangria</option>
    </select>
    <label>Ingredients:</label>
    <ul>
      {cocktailForm.ingredients.map((ingredient, index) => (
        <li key={index}>
          <input
            type="text"
            className="form-control"
            value={ingredient}
            onChange={(e) => {
              const updatedIngredients = [...cocktailForm.ingredients];
              updatedIngredients[index] = e.target.value;
              setCocktailForm((prevForm) => ({
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
            setCocktailForm((prevForm) => ({
              ...prevForm,
              ingredients: [...prevForm.ingredients, ""],
            }))
          }
        >
          Add Ingredient
        </button>
      </li>
    </ul>
    <label>Instructions:</label>
    <ol>
      {cocktailForm.instructions.map((instruction, index) => (
        <li key={index}>
          <input
            type="text"
            className="form-control"
            value={instruction}
            onChange={(e) => {
              const updatedInstructions = [...cocktailForm.instructions];
              updatedInstructions[index] = e.target.value;
              setCocktailForm((prevForm) => ({
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
            setCocktailForm((prevForm) => ({
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
  </div>
    </form>
    </>
    )}
    </Container>
  );
}

export default SubmitRecipe;
