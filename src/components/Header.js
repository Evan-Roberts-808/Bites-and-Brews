 import React from 'react'
 import Container from 'react-bootstrap/Container';
 import Nav from 'react-bootstrap/Nav';
 import Navbar from 'react-bootstrap/Navbar';
 
 function Header() {
   return (
     <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="#home"><img src="https://raw.githubusercontent.com/Evan-Roberts-808/phase-2/master/.github/images/Logo.svg" alt="logo" width="250" height="150" className="d-inline-block align-top"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link>Recipes</Nav.Link>
                    <Nav.Link>Cocktails</Nav.Link>
                    <Nav.Link>Favorites</Nav.Link>
                    <Nav.Link>Submit Your Recipe</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
     </Navbar>
   )
 }
 
 export default Header