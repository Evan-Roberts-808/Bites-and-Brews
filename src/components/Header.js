import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";


function Header({ updateDarkMode }) {

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to='/'><img
            src="https://raw.githubusercontent.com/Evan-Roberts-808/phase-2/master/.github/images/Logo.svg"
            alt="Bites&Brews Logo"
            width="250"
            height="150"
            className="d-inline-block align-top"
          />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="custom-header justify-content-end"
            style={{ width: "100%" }}
          >
            <Nav.Link as={Link} to='recipes'>Recipes</Nav.Link>
            <Nav.Link as={Link} to='cocktails'>Cocktails</Nav.Link>
            <Nav.Link as={Link} to='favorites'>Favorites</Nav.Link>
            <Nav.Link as={Link} to='submit'>Submit Your Recipe</Nav.Link>
            <button onClick={updateDarkMode}>Toggle Mode</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
