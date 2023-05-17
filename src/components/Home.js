import React, {useState, useEffect} from 'react'
import Slideshow from './Slideshow'
import Container from "react-bootstrap/Container";
import Cards from './Cards';

function Home() {
  const [ourPicks, setOurPicks] = useState([])
  const [popularRecipes, setPopularRecipes] = useState([])
  const [popularCocktails, setPopularCocktails] = useState([])
// Our Picks
  useEffect(() => {
    fetch('http://localhost:3001/ourPicks')
    .then((response) => response.json())
    .then((data) => setOurPicks(data))
  }, [])
// Popular Recipes
  useEffect(() => {
    fetch('http://localhost:3001/recipes?_sort=likes&_order=desc&_limit=5')
    .then((response) => response.json())
    .then((data) => setPopularRecipes(data))
  }, [])
// Popular Cocktails
  useEffect(() => {
    fetch('http://localhost:3001/cocktails?_sort=likes&_order=desc&_limit=5')
    .then((response) => response.json())
    .then((data) => setPopularCocktails(data))
  }, [])

  return (
    <Container>
    <h2 className="page-headings">Newest Recipes</h2>
    <Slideshow />
    <h2 className="page-headings">Our Picks</h2>
    <Cards data={ourPicks} />
    <h2 className="page-headings">Popular Recipes</h2>
    <Cards data={popularRecipes} />
    <h2 className="page-headings">Popular Cocktails</h2>
    <Cards data={popularCocktails} />
    </Container>
  )
}

export default Home