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
    fetch('https://bitesandbrews.onrender.com/ourPicks')
    .then((response) => response.json())
    .then((data) => setOurPicks(data))
  }, [])
// Popular Recipes
  useEffect(() => {
    fetch('https://bitesandbrews.onrender.com/recipes?_sort=likes&_order=desc&_limit=3')
    .then((response) => response.json())
    .then((data) => setPopularRecipes(data))
  }, [])
// Popular Cocktails
  useEffect(() => {
    fetch('https://bitesandbrews.onrender.com/cocktails?_sort=likes&_order=desc&_limit=3')
    .then((response) => response.json())
    .then((data) => setPopularCocktails(data))
  }, [])

  return (
    <Container>
    <h2 className="page-headings">Newest Bites</h2>
    <Slideshow />
    <h2 className="page-headings">Our Picks</h2>
    <Cards data={ourPicks} />
    <h2 className="page-headings">Popular Bites</h2>
    <Cards data={popularRecipes} />
    <h2 className="page-headings">Popular Brews</h2>
    <Cards data={popularCocktails} />
    </Container>
  )
}

export default Home