import React, { useState } from "react";

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
    meat: [""],
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
        type: 'recipes',
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
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={handlePOST}>
      <label>
        Recipe Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter recipe name"
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter recipe description"
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </label>
      <label>
        Prep Time:
        <input
          type="text"
          name="preptime"
          value={formData.preptime}
          onChange={handleChange}
          placeholder="Enter prep time"
        />
      </label>
      <label>
        Wait Time:
        <input
          type="text"
          name="waittime"
          value={formData.waittime}
          onChange={handleChange}
          placeholder="Enter wait time"
        />
      </label>
      <label>
        Cook Time:
        <input
          type="text"
          name="cooktime"
          value={formData.cooktime}
          onChange={handleChange}
          placeholder="Enter cook time"
        />
      </label>
      <label>
        Total Time:
        <input
          type="text"
          name="totaltime"
          value={formData.totaltime}
          onChange={handleChange}
          placeholder="Enter total time"
        />
      </label>
      <label>
        Serving:
        <input
          type="number"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          placeholder="Enter servings"
        />
      </label>
      <label>
        Ingredients:
        <ul>
          {formData.ingredients.map((ingredient, index) => (
            <li key={index}>
              <input
                type="text"
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
      </label>
      <label>
        Instructions:
        <ol>
          {formData.instructions.map((instruction, index) => (
            <li key={index}>
              <input
                type="text"
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
      </label>
      <label>
        Cuisine:
        <select name="cuisine" value={formData.cuisine} onChange={handleChange}>
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
      </label>
      <label>
        Course:
        <select name="course" value={formData.course} onChange={handleChange}>
          <option value="">Select a course</option>
          <option value="appetizer">Appetizer</option>
          <option value="main_course">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="side">Side</option>
        </select>
      </label>
      <label>
        Vegetarian:
        <select
          name="vegetarian"
          value={formData.vegetarian}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>
      <label>
        Meat:
        <ul>
          {formData.meat.map((meat, index) => (
            <li key={index}>
              <input
                type="text"
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
      </label>
      <label>
        Contains:
        <ul>
          {formData.contains.map((item, index) => (
            <li key={index}>
              <input
                type="text"
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
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubmitRecipe;
