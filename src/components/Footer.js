import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer text-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <h5>About Us</h5>
            <p>Bites & Brews started in the spring of 2023. Our vision: to provide a deliciously, interactive cooking experience for all cooking levels. We offer 300+ food and drink recipes, from a variety of cuisines.</p>
          </div>
          <div className="col-sm-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <Link to="/"><li>Home</li></Link>
              <Link to="recipes"><li>Recipes</li></Link>
              <Link to="cocktails"><li>Cocktails</li></Link>
              <Link to="favorites"><li>Favorites</li></Link>
              <Link to="submit"><li>Submit Yours</li></Link>
            </ul>
          </div>
          <div className="col-sm-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>123 Street, City, Country</li>
              <li>+1234567890</li>
              <li>support@BitesandBrews.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>&copy; 2023 Bites & Brews. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
