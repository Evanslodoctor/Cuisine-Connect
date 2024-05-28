import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes",
        {
          Title: title,
          Description: description,
          Ingredients: ingredients.split("\n"),
          Instructions: instructions,
          CuisineType: cuisineType,
          DietaryTags: dietaryTags,
          DifficultyLevel: difficultyLevel,
          CreationDate: new Date(),
          UserUserID: JSON.parse(localStorage.getItem("user")).UserID, // Assuming the user object is stored in localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response && response.data) {
        setSuccess("Recipe added successfully!");
        setError("");
      } else {
        setError("Failed to add recipe. Please try again later.");
        setSuccess("");
      }
    } catch (err) {
      setError(err.response.data.message);
      setSuccess("");
    }
  };

  return (
    <Container className="mt-5 add-recipe-container">
      <h1 className="text-center">Add New Recipe</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form className="ricipe_form" onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="cuisineType">
              <Form.Label>Cuisine Type</Form.Label>
              <Form.Control
                type="text"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="dietaryTags">
              <Form.Label>Dietary Tags</Form.Label>
              <Form.Control
                type="text"
                value={dietaryTags}
                onChange={(e) => setDietaryTags(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="difficultyLevel">
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                as="select"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="ingredients">
          <Form.Label>Ingredients (one per line)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="instructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3">
            Add Recipe
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddRecipe;
