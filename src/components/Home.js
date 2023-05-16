import React, {useState, useEffect} from 'react'
import Slideshow from './Slideshow'
import Container from "react-bootstrap/Container";
import Cards from './Cards';

function Home() {
  const [ourPicks, setOurPicks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/ourPicks')
    .then((response) => response.json())
    .then((data) => setOurPicks(data))
  }, [])

  console.log(ourPicks)

  return (
    <Container>
    <h2 className="page-headings">Newest Recipes</h2>
    <Slideshow />
    <h2 className="page-headings">Our Picks</h2>
    <Cards data={ourPicks} />
    </Container>
  )
}

export default Home