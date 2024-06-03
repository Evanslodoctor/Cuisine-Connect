import React, { useState } from 'react'
import "../assets/styles/Baselayout.css"
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import Footer from './Footer';

function Baselayout({children}: any) {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  const isLoggedIn = localStorage.getItem("token") !== null;
  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };


  return (
    <div className="p-0 m-0">
      <Navbar expand="sm" className='bg-transparent w-100'>
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <Link to="/" className="h-25">
              <img src="/logo/logo_2.svg"
              alt="logo" className='w-75 h-75'/>
            </Link>
            <h4>
              Africuisine Connect
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='p-2 justify-content-center'>
            {/* <Form className="m-0 p-0 col-6">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search recipes by name or keywords"
                  value={searchKeyword}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Form> */}
            <Nav as="ul" id="baselayout-nav">
              {isLoggedIn ? (
              <>
                <Nav.Item as='li'>
                  <Nav.Link as={NavLink} id="nav-link" to="/add-recipe">
                    Add Recipes
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                  <Nav.Link as={NavLink} id="nav-link" to="/view-recipes">
                    View Recipes
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                  <Button className='btn btn-danger' onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Item>
              </>
              ) : (
              <>
                <Nav.Item as='li'>
                  <Nav.Link as={NavLink} id="nav-link" to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                  <Nav.Link as={NavLink} id="nav-link" to="/signup">
                    Signup
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='p-0 m-0'>
        {children}
      </Container>
      <Footer/>
    </div>
  )
}

export default Baselayout