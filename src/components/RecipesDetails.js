import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function RecipesDetails() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  //**COCKTAIL PAIRING */
  const [cocktailData, setCocktailData] = useState([]);
  const [recipeCuisine, setRecipeCuisine] = useState("");
  const [displayRecommendation, setDisplayRecommendation] = useState(false);
  const [recommendedBrew, setRecommendedBrew] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cocktails")
      .then((r) => r.json())
      .then((data) => setCocktailData(data));
  }, []);
  //**COCKTAIL PAIRING */

  // setting RecipeDetails state
  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setRecipeDetails(data);
        setLikeCount(data.likes);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setRecipeCuisine(data.cuisine);
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
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: recipeDetails.likes + 1, // Increment like count by 1
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
      body: JSON.stringify(recipeDetails),
    });
  }

  //***COCKTAIL PAIRING ***/

  function findCocktail(alcohol) {
    const filteredCocktails = cocktailData.filter(
      (el) => el["drink-type"] && el["drink-type"].includes(alcohol)
    );
    const randomIndex = Math.floor(Math.random() * filteredCocktails.length);
    const randomCocktail = filteredCocktails[randomIndex];
    return randomCocktail ? randomCocktail : null;
  }

  let recommendedCocktail = null;

  function getCocktailPairing() {
    const cuisine = recipeDetails.cuisine;

    switch (cuisine) {
      case "mexican":
        recommendedCocktail = findCocktail("margarita");
        break;
      case "japanese":
        recommendedCocktail = findCocktail("cocktail");
        break;
      case "chinese":
        recommendedCocktail = findCocktail("cocktail");
        break;
      case "korean":
        recommendedCocktail = findCocktail("cocktail");
        break;
      case "thai":
        recommendedCocktail = findCocktail("cocktail");
        break;
      case "italian":
        recommendedCocktail = findCocktail("sangria");
        break;
      case "greek":
        recommendedCocktail = findCocktail("daiquri");
        break;
      case "mediterranean":
        recommendedCocktail = findCocktail("mojito");
        break;
      case "spanish":
        recommendedCocktail = findCocktail("mojito");
        break;
      case "french":
        recommendedCocktail = findCocktail("martini");
        break;
      case "caribbean":
        recommendedCocktail = findCocktail("daiquiri");
        break;
      case "american":
        recommendedCocktail = findCocktail("cocktail");
        break;
      default:
        console.log("no recommendation found");
        break;
    }
    setRecommendedBrew(recommendedCocktail);
    setDisplayRecommendation((prev) => !prev);
  }

  const url = `/cocktails/${recommendedBrew.id}`;

  /**Cocktail Pairing */

  return (
    <Container>
      <img src={recipeDetails.image} alt={recipeDetails.name} />
      <h2>{recipeDetails.name}</h2>
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
      <h4>{recipeDetails.description}</h4>
      <p>Prep Time: {recipeDetails.preptime}</p>
      <p>Cook Time: {recipeDetails.cooktime}</p>
      <p>Additional Time: {recipeDetails.waittime}</p>
      <p>Total Time: {recipeDetails.totaltime}</p>
      
      <button onClick={getCocktailPairing}>Recommend a brew?</button>

      <Link to={url}>
        <p display={displayRecommendation ? "" : "none"}>
          {recommendedBrew.name}
        </p>
      </Link>

      <h2>Ingredients</h2>
      <ul>{mappedIngredients}</ul>
      <h2>Instructions</h2>
      <ul>{mappedInstructions}</ul>
    </Container>
  );
}

export default RecipesDetails;
