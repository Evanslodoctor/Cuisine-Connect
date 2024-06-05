import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Baselayout from './Baselayout';
import RecipeCardSmall from './RecipeCard';

const UserDashboard = ({ isLoggedIn }) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hour, setHour] = useState(0);
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
      const response = await axios.get('cuisine-connect-production.up.railway.app/api/recipes/');
      // Sort recipes by average rating in descending order
      const sortedRecipes = response.data.sort((a, b) => b.AverageRating - a.AverageRating);
      setPopularRecipes(sortedRecipes);
    } catch (error) {
      console.error('Failed to fetch popular recipes:', error);
    }
  };

  const getCurrentHpur = () => {
    const now = new Date()
    setHour(now.getHours())
  }

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
    <Baselayout>
      <Container className={`mt-1 dashboard ${darkMode ? 'dark' : 'light'}`}>
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
                <h4>Good morning, User</h4>
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search through your recipes"
                      value={searchKeyword}
                      className="w-50"
                      onChange={handleSearch}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Button variant="outline-dark" onClick={toggleSidebar} className={`menu-button ${darkMode ? 'dark' : 'light'}`}>{sidebarExpanded ? 'Close' : 'Menu'}</Button>
              </Col>
            </Row>
            <Row className="mt-4">
              {popularRecipes.slice(0, 6).map(recipe => (
                // <Col key={recipe.RecipeID} xs={12} md={6} lg={4} className="mb-4">
                //   <Link to={`/recipe/${recipe.RecipeID}`} className="recipe-link">
                //     <Card className="h-100 recipe-card" style={{ backgroundImage: `url(${recipe.Image})` }}>
                //       <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                //         <Card.Title className="text-center mb-3 recipe-text">{recipe.Title}</Card.Title>
                //         <Button variant="primary">View Recipe</Button>
                //       </Card.Body>
                //     </Card>
                //   </Link>
                // </Col>
                <Col className="col-xl-4">
                  <RecipeCardSmall title={recipe.Title}
                  image={recipe.Image}
                  rating={recipe.AverageRating}
                  noOfRating={recipe.NumberOfRatings}
                  id={recipe.RecipeID}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Baselayout>
  );
}

export default UserDashboard;
