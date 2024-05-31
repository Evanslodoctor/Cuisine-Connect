import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Reload the page to restart the app
    window.location.reload();
  };

  return (
    <Navbar  variant="dark" expand="lg" className="fixed-top navbar">
      <Navbar.Brand as={Link} to="/">
      Flavor Fusion
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact activeClassName="active-link">
            Home
          </Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={NavLink} to="/add-recipe" activeClassName="active-link">
                Add Recipe
              </Nav.Link>
              <Nav.Link as={NavLink} to="/update-recipe" activeClassName="active-link">
                Update Recipes
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" activeClassName="active-link">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup" activeClassName="active-link">
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
