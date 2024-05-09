import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewRecipe = () => {
  const { recipeID } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token is not present
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/recipes/${recipeID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeID, navigate]);

  const handleRatingChange = async (value) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if token is not present
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/recipes/${recipeID}/rate`,
        { rating: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the recipe data after rating
      const response = await axios.get(
        `http://localhost:3000/api/recipes/${recipeID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipe(response.data);
    } catch (error) {
      console.error("Failed to rate recipe:", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if token is not present
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/recipes/${recipeID}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
              <p>Description: {recipe.Description}</p>
              <p>Cuisine Type: {recipe.CuisineType}</p>
              <p>Dietary Tags: {recipe.DietaryTags}</p>
              <p>Difficulty Level: {recipe.DifficultyLevel}</p>
              <p>Average Rating: {recipe.AverageRating}</p>
              <p>Number of Ratings: {recipe.NumberOfRatings}</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3>Ingredients:</h3>
              {Array.isArray(recipe.Ingredients) ? (
                recipe.Ingredients.map((ingredient, index) => (
                  <p key={index}>{ingredient}</p>
                ))
              ) : (
                <p>{recipe.Ingredients}</p>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3>Instructions:</h3>
              {recipe.Instructions.split("\n").map((instruction, index) => (
                <p key={index}>{instruction}</p>
              ))}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form.Group>
                <Form.Label>Rate this recipe:</Form.Label>
                <Form.Check
                  type="checkbox"
                  id={`rating-star`}
                  label="Rate"
                  onChange={(e) => handleRatingChange(e.target.checked ? 5 : 0)}
                  className="d-inline-block"
                />
              </Form.Group>
              {!isFavorite && (
                <Button
                  variant="outline-primary"
                  onClick={handleAddToFavorites}
                  className="mt-2"
                >
                  Add to Favorites
                </Button>
              )}
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
