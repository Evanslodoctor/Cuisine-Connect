import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Baselayout from "./Baselayout";

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
      <Container className="mt-5">
        {recipe ? (
          <Container fluid>
            <Row className="gap-3">
              <Col className="p-4 text-center bg-white col-md-4 rounded-4" style={{height: `fit-content`}}>
                <Image className="rounded-4" src={"/background/slide1.jpg"} style={{width: `150px`, height: `150px`}}/>
                <h2>{recipe.Title}</h2>
                <ul className="text-center m-0 p-0" style={{listStyle: `none`}}>
                  <li><strong>Cuisine Type</strong>: {recipe.CuisineType}</li>
                  <li><strong>Dietary Tags</strong>: {recipe.DietaryTags}</li>
                  <li><strong>Difficulty Level</strong>: {recipe.DifficultyLevel}</li>
                  <li className="text-center">
                    <Row className="">
                      <Col>
                        <p className="m-0 p-0">{recipe.AverageRating} <FaStar/></p>
                        <p className="m-0 p-0 text-muted" style={{fontSize: `12px`}}>Average</p>
                      </Col> | 
                      <Col>
                        <p className="m-0 p-0">{recipe.NumberOfRatings}</p>
                        <p className="m-0 p-0 text-muted" style={{fontSize: `12px`}}>Ratings</p>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </Col>
              <Col className="bg-white p-4 rounded-4" style={{overflowY: `scroll`}}>
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
                  <Form.Label>Rate this recipe: </Form.Label>
                  <Form.Check
                    type="checkbox"
                    id={`rating-star`}
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
            <Row className="mt-4">
            </Row>
          </Container>
        ) : (
          <p>Loading recipe...</p>
        )}
      </Container>
    </Baselayout>
  );
};

export default ViewRecipe;
