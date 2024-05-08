import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewRecipe = ({ isLoggedIn }) => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/${recipeID}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeID]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleRateRecipe = async () => {
    try {
      await axios.post(`http://localhost:3000/api/recipes/${recipeID}/rate`, { rating });
      // Refresh the recipe data after rating
      const response = await axios.get(`http://localhost:3000/api/recipes/${recipeID}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Failed to rate recipe:", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await axios.post(`http://localhost:3000/api/recipes/${recipeID}/favorite`);
      setIsFavorite(true);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  return (
    <Container className="mt-5">
      {recipe ? (
        <>
          <Row>
            <Col>
              <h2>{recipe.Title}</h2>
              <p>{recipe.Description}</p>
              <p>Cuisine Type: {recipe.CuisineType}</p>
              <p>Dietary Tags: {recipe.DietaryTags}</p>
              <p>Difficulty Level: {recipe.DifficultyLevel}</p>
              <p>Average Rating: {recipe.AverageRating}</p>
              <p>Number of Ratings: {recipe.NumberOfRatings}</p>
              {isLoggedIn && (
                <>
                  <Form.Group>
                    <Form.Label>Rate this recipe:</Form.Label>
                    <Form.Control as="select" value={rating} onChange={handleRatingChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" onClick={handleRateRecipe}>Rate</Button>
                  {!isFavorite && (
                    <Button variant="outline-primary" onClick={handleAddToFavorites} className="ml-2">Add to Favorites</Button>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3>Ingredients:</h3>
              <ul>
                {recipe.Ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3>Instructions:</h3>
              <p>{recipe.Instructions}</p>
            </Col>
          </Row>
        </>
      ) : (
        <p>Loading recipe...</p>
      )}
    </Container>
  );
};

export default ViewRecipe;
