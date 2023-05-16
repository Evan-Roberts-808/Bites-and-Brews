import React, {useState, useEffect} from 'react'
import Cards from './Cards'
import Container from "react-bootstrap/Container";

function CocktailsPage() {
  const [allCocktails, setAllCocktails] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/cocktails')
    .then(response => response.json())
    .then(data => setAllCocktails(data))
  }, [])

  return (
    <Container>
      <Cards data={allCocktails}/>
    </Container>
  )
}

export default CocktailsPage