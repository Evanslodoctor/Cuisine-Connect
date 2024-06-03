import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Baselayout from "./Baselayout";
//import "./ViewRecipe.css"; // Ensure this path is correct

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
    <Baselayout>
      <Container className="mt-5 viewrecipe">
        {recipe ? (
          <>
            <Row className="gap-3">
              <Col className="bg-light p-3 rounded-3 col-sm-4">
                <div className="d-flex flex-column align-items-center">
                  <Image src={recipe.Image ? recipe.Image : ("/background/slide2.jpg")} className="w-75 h-50 m-3  rounded-4"/>
                  <h2 className="text-center">{recipe.Title}</h2>
                </div>
                <div className="mx-5 my-4">
                  <p>Dietary Tags: {recipe.DietaryTags}</p>
                  <p>Difficulty Level: {recipe.DifficultyLevel}</p>
                </div>
                <Row className="mx-5 my-4">
                  <Col>
                    <p>Average: {Math.round(recipe.AverageRating * 10) / 10} |</p>
                  </Col>
                  <Col>
                    <p>| Ratings: {recipe.NumberOfRatings}</p>
                  </Col>
                </Row>
              </Col>
              <Col className="bg-light rounded-3 p-3">
                <h3>Description</h3>
                <p>{recipe.Description}</p>
                <h3>Ingredients:</h3>
                {Array.isArray(recipe.Ingredients) ? (
                  recipe.Ingredients.map((ingredient, index) => (
                    <p key={index}>{ingredient}</p>
                  ))
                ) : (
                  <p>{recipe.Ingredients}</p>
                )}

                <h3>Instructions:</h3>
                {recipe.Instructions.split("\n").map((instruction, index) => (
                  <p key={index}>{instruction}</p>
                ))}

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
    </Baselayout>
  );
};

export default ViewRecipe;
