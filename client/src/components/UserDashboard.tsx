import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Baselayout from './Baselayout';

const UserDashboard = ({ isLoggedIn }) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchPopularRecipes();
    }
  }, [isLoggedIn, navigate]);

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
    // Filter popular recipes locally based on searchKeyword
    const filteredRecipes = popularRecipes.filter(recipe => 
      recipe.Title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPopularRecipes(filteredRecipes);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Baselayout>
      <Container className="mt-5 darshbord">
        <Row>
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
          <Col className="text-end">
            {/* <Button variant="danger" onClick={handleLogout}>Logout</Button> */}
          </Col>
        </Row>
        <Row className="mt-4">
          {popularRecipes.map(recipe => (
            <Col key={recipe.RecipeID} xs={12} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{recipe.Title}</Card.Title>
                  <Card.Text>Average Rating: {recipe.AverageRating}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/recipe/${recipe.RecipeID}`)}>View Recipe</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Baselayout>
  );
}

export default UserDashboard;
