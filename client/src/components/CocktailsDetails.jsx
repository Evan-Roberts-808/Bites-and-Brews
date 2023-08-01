import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function CocktailsDetails() {
  const { id } = useParams();
  const [cocktailDetails, setcocktailDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false)

  //**PAIRING**/
  const [recipeData, setRecipeData] = useState([]);
  const [displayRecommendation, setDisplayRecommendation] = useState(false);
  const [recommendedBite, setRecommendedBite] = useState([]);
  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then((data) => setRecipeData(data));
  }, []);
  //**PAIRING**/

  // setting cocktailDetails state
  useEffect(() => {
    fetch(`/cocktails/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setcocktailDetails(data);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setLikeCount(data.likes);
      });
  }, [id]);

  //get <li> items for ingredients
  const mappedIngredients = ingredients.map((el, index) => {
    return <ListGroup.Item key={index}><span>{el}</span></ListGroup.Item>;
  });

  //get <li> items for ingredients
  const mappedInstructions = instructions.map((el, index) => {
    return <li key={index}>{el}</li>;
  });

  const handleLikeClick = () => {
    // Make a PATCH request to update the like count on the server
    fetch(`/cocktails/${id}`, {
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
    setIsFavorite(prevIsFavorite => !prevIsFavorite)
    fetch("/users/favorites", {
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
        const cocktailCuisines = [
          "japanese",
          "chinese",
          "korean",
          "thai",
          "american",
        ];
        const randomCocktailIndex = Math.floor(
          Math.random() * cocktailCuisines.length
        );
        const randomCocktailCuisine = cocktailCuisines[randomCocktailIndex];
        recommendedRecipe = findRecipe(randomCocktailCuisine);
        break;
      case "sangria":
        recommendedRecipe = findRecipe("italian");
        break;
      case "daquiri":
        const daquiriCuisines = [
          "greek",
          "caribbean"
        ]
        const randomDaquiriIndex = Math.floor(
          Math.random() * daquiriCuisines.length
        )
        const randomDaquiriCuisine = daquiriCuisines[randomDaquiriIndex]
        recommendedRecipe = findRecipe(randomDaquiriCuisine);
        break;
      case "mojito":
        const mojitoCuisines = ["mediterranean", "spanish"];
        const randomMojitoIndex = Math.floor(
          Math.random() * mojitoCuisines.length
        );
        const randomMojitoCuisine = mojitoCuisines[randomMojitoIndex];
        recommendedRecipe = findRecipe(randomMojitoCuisine);
        break;
      case "martini":
        recommendedRecipe = findRecipe("french");
        break;
      case "cosmopolitan":
        recommendedRecipe = findRecipe("american");
        break;
      case "hurricane":
        recommendedRecipe = findRecipe("caribbean");
        break;
      case "negroni":
        recommendedRecipe = findRecipe("italian");
        break;
      case "bloody mary":
        recommendedRecipe = findRecipe("american");
        break;
      case "bellini":
        recommendedRecipe = findRecipe("italian");
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
      <div className="row">
        <Figure className="col-sm-5">
          <Figure.Image
            src={cocktailDetails.image}
            alt={cocktailDetails.name}
          />
        </Figure>
        <div className="offset-sm-1 col-sm-5 my-auto">
          <h2>
            {cocktailDetails.name + " "}{" "}
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: isFavorite ? "#ff3b3f" : "#A9A9A9" }}
              onClick={handleFavorite}
              className={isFavorite ? "active" : ""}
            />
          </h2>
          <h4>{cocktailDetails.description}</h4>
          <p>
            <label>Likes:</label>
            {likeCount + " "}
            <FontAwesomeIcon
              icon={faThumbsUp}
              onClick={handleLikeClick}
              style={{
                color: "#ff3b3f",
              }}
            />
          </p>
          <button onClick={getRecipePairing}>Recommend a bite?</button>
          <Link to={url}>
            <p className="recommended-link" display={displayRecommendation ? "" : "none"}>
              {recommendedBite.name}
            </p>
          </Link>
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
                <td>{cocktailDetails.preptime}</td>
                <td>{cocktailDetails.cooktime}</td>
                <td>{cocktailDetails.waittime}</td>
                <td>{cocktailDetails.totaltime}</td>
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
  );
}

export default CocktailsDetails;
