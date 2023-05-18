import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function CockatilsDetails() {
  const { id } = useParams();
  const [cocktailDetails, setcocktailDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  //**PAIRING**/
  const [recipeData, setRecipeData] = useState([]);
  const [recipeCuisine, setRecipeCuisine] = useState("");
  const [displayRecommendation, setDisplayRecommendation] = useState(false);
  const [recommendedBite, setRecommendedBite] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then((r) => r.json())
      .then((data) => setRecipeData(data));
  }, []);
  //**PAIRING**/

  // setting cocktailDetails state
  useEffect(() => {
    fetch(`http://localhost:3001/cocktails/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setcocktailDetails(data);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setLikeCount(data.likes);
      });
  }, [id]);

  //get <li> items for ingredients
  const mappedIngredients = ingredients.map((el) => {
    return <li>{el}</li>;
  });

  //get <li> items for ingredients
  const mappedInstructions = instructions.map((el) => {
    return <li>{el}</li>;
  });

  const handleLikeClick = () => {
    // Make a PATCH request to update the like count on the server
    fetch(`http://localhost:3001/cocktails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: cocktailDetails.likes + 1, // Increment like count by 1
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
    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktailDetails),
    });
  }

  //*** PAIRING ***/

  function findRecipe(cuisine) {
    const filteredRecipes = recipeData.filter(
      (el) => el["cuisine"] && el["cuisine"].includes(cuisine)
    );
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const randomRecipe = filteredRecipes[randomIndex];
    return randomRecipe ? randomRecipe : null;
  }

  let recommendedRecipe = null;

  function getRecipePairing() {
    const drinkType = cocktailDetails["drink-type"];

    switch (drinkType) {
      case "margarita":
        recommendedRecipe = findRecipe("mexican");
        break;
      case "cocktail":
        recommendedRecipe = findRecipe("japanese");
        break;
      case "cocktail":
        recommendedRecipe = findRecipe("chinese");
        break;
      case "cocktail":
        recommendedRecipe = findRecipe("korean");
        break;
      case "cocktail":
        recommendedRecipe = findRecipe("thai");
        break;
      case "sangria":
        recommendedRecipe = findRecipe("italian");
        break;
      case "daiquri":
        recommendedRecipe = findRecipe("greek");
        break;
      case "mojito":
        recommendedRecipe = findRecipe("mediterranean");
        break;
      case "mojito":
        recommendedRecipe = findRecipe("spanish");
        break;
      case "martini":
        recommendedRecipe = findRecipe("french");
        break;
      case "daiquiri":
        recommendedRecipe = findRecipe("caribbean");
        break;
      case "cocktail":
        recommendedRecipe = findRecipe("american");
        break;
      default:
        console.log("no recommendation found");
        break;
    }
    setRecommendedBite(recommendedRecipe);
    setDisplayRecommendation((prev) => !prev);
  }

  const url = `/recipes/${recommendedBite.id}`;

  /** Pairing **/

  return (
    <Container>
      <img src={cocktailDetails.image} alt={cocktailDetails.name} />
      <h2>{cocktailDetails.name}</h2>
      <FontAwesomeIcon
        icon={faHeart}
        style={{ color: "#ff3b3f" }}
        onClick={handleFavorite}
      />
      <FontAwesomeIcon
        icon={faThumbsUp}
        onClick={handleLikeClick}
        style={{
          "--fa-primary-color": "#ff3b3f",
          "--fa-secondary-color": "#c52b30",
        }}
      />
      <p>{likeCount}</p>
      <h4>{cocktailDetails.description}</h4>

      <p>Prep Time: {cocktailDetails.preptime}</p>
      <p>Cook Time: {cocktailDetails.cooktime}</p>
      <p>Additional Time: {cocktailDetails.waittime}</p>
      <p>Total Time: {cocktailDetails.totaltime}</p>

      <button onClick={getRecipePairing}>Recommend a bite?</button>

      <Link to={url}>
        <p display={displayRecommendation ? "" : "none"}>
          {recommendedBite.name}
        </p>
      </Link>

      <h2>Ingredients</h2>
      <ul>{mappedIngredients}</ul>

      <h2>Instructions</h2>
      <ul>{mappedInstructions}</ul>
    </Container>
  );
}

export default CockatilsDetails;
