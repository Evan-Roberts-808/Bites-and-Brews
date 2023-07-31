import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function Header({ darkMode, updateDarkMode }) {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg">
    {user ? (
      <>
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
            <Nav.Link as={Link} to='recipes'>Bites</Nav.Link>
            <Nav.Link as={Link} to='cocktails'>Brews</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="profile-details">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="favorites">Favorites</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="submit">Submit Your Own</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <button id="darkModeButton" onClick={updateDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </>
    ) : (
      <>
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
            <Nav.Link as={Link} to='recipes'>Bites</Nav.Link>
            <Nav.Link as={Link} to='cocktails'>Brews</Nav.Link>
            <Nav.Link as={Link} to='signup'>Sign Up</Nav.Link>
            <Nav.Link as={Link} to='login'>Login</Nav.Link>
            <button id="darkModeButton" onClick={updateDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </>
    )}
      
    </Navbar>
  );
}

export default Header;
