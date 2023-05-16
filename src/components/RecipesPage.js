import React, {useState, useEffect} from 'react'
import Cards from './Cards'
import Container from "react-bootstrap/Container";

function RecipesPage() {
  const [allRecipes, setAllRecipes] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
    .then(response => response.json())
    .then(data => setAllRecipes(data))
  }, [])

  console.log(allRecipes)

  return (
    <Container>
      <Cards data={allRecipes}/>
    </Container>
  )
}

export default RecipesPage