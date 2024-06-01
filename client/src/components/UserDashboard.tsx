import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = ({ isLoggedIn }) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchPopularRecipes();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (searchKeyword === '') {
      fetchPopularRecipes();
    } else {
      const filteredRecipes = popularRecipes.filter(recipe => 
        recipe.Title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setPopularRecipes(filteredRecipes);
    }
  }, [searchKeyword, popularRecipes]);

  const fetchPopularRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/recipes/');
      // Sort recipes by average rating in descending order
      const sortedRecipes = response.data.sort((a, b) => b.AverageRating - a.AverageRating);
      setPopularRecipes(sortedRecipes);
    } catch (error) {
      console.error('Failed to fetch popular recipes:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container className={`mt-5 dashboard ${darkMode ? 'dark' : 'light'}`}>
      <Row>
        {sidebarExpanded && (
          <Col md={3}>
            <div className="sidebar">
              <h5>Menu</h5>
              <ul>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/update-recipe">Update Recipe</Link></li>
                <li><Link to="/add-recipe">Add Recipe</Link></li>
              </ul>
              <h5>Viewing Mode</h5>
              <Button variant="outline-dark" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
            </div>
          </Col>
        )}
        <Col xs={sidebarExpanded ? 9 : 12}>
          <Row>
            <Col>
              <Button variant="outline-dark" onClick={toggleSidebar} className={`menu-button ${darkMode ? 'dark' : 'light'}`}>{sidebarExpanded ? 'Close' : 'Menu'}</Button>
            </Col>
            <Col>
              <h2>User Dashboard</h2>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search recipes by name or keywords"
                    value={searchKeyword}
                    onChange={handleSearch}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="mt-4">
            {popularRecipes.slice(0, 6).map(recipe => (
              <Col key={recipe.RecipeID} xs={12} md={6} lg={4} className="mb-4">
                <Link to={`/recipe/${recipe.RecipeID}`} className="recipe-link">
                  <Card className="h-100 recipe-card" style={{ backgroundImage: `url(${recipe.Image})` }}>
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <Card.Title className="text-center mb-3 recipe-text">{recipe.Title}</Card.Title>
                      <Button variant="primary">View Recipe</Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
