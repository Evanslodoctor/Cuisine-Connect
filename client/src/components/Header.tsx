import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Reload the page to restart the app
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Navbar.Brand as={Link} to="/">
        Cuisine Connect
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/add-recipe">
                Add Recipe
              </Nav.Link>
              <Nav.Link as={Link} to="/view-recipes">
                View Recipes
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
        {isLoggedIn && (
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
