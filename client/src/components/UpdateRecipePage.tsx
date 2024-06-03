import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const UpdateRecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [newCuisineType, setNewCuisineType] = useState('');
  const [newImage, setNewImage] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.Title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [recipes, searchTerm]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      setError('Error fetching recipes');
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchRecipeDetails = async (recipeID) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/recipes/${recipeID}`);
      const recipe = response.data;
      setNewTitle(recipe.Title);
      setNewDescription(recipe.Description);
      setNewIngredients(recipe.Ingredients);
      setNewInstructions(recipe.Instructions);
      setNewCuisineType(recipe.CuisineType);
      setNewImage(recipe.Image);
    } catch (error) {
      setError('Error fetching recipe details');
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/recipes/${selectedRecipe}`, {
        Title: newTitle,
        Description: newDescription,
        Ingredients: newIngredients,
        Instructions: newInstructions,
        CuisineType: newCuisineType,
        Image: newImage
      });
      setSuccessMessage('Recipe updated successfully');
      console.log('Recipe updated:', response.data);
    } catch (error) {
      setError('Error updating recipe');
      console.error('Error updating recipe:', error);
    }
  };

  const handleRecipeSelection = (recipeID) => {
    setSelectedRecipe(recipeID);
    fetchRecipeDetails(recipeID);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Update Recipe</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form.Group>
        <Form.Label>Search or Add Recipe Title</Form.Label>
        <input
          type="text"
          className="form-control"
          placeholder="Search or Add Recipe Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Recipe to Update</Form.Label>
        <select
          className="form-control"
          onChange={(e) => handleRecipeSelection(e.target.value)}
          value={selectedRecipe}
        >
          <option value="">Select Recipe</option>
          {filteredRecipes.map((recipe) => (
            <option key={recipe.RecipeID} value={recipe.RecipeID}>{recipe.Title}</option>
          ))}
        </select>
      </Form.Group>
      {selectedRecipe && (
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCuisineType">
                <Form.Label>Cuisine Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Cuisine Type"
                  value={newCuisineType}
                  onChange={(e) => setNewCuisineType(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Ingredients"
                  value={newIngredients}
                  onChange={(e) => setNewIngredients(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Instructions"
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Row>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Image URL"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                    />
                  </Col>
                  <Col sm={4} className="d-flex align-items-center justify-content-center">
                    {newImage ? (
                      <Image src={newImage} roundedCircle style={{ width: '70px', height: '70px' }} />
                    ) : (
                      <FontAwesomeIcon icon={faImage} size="3x" />
                    )}
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" onClick={handleUpdate}>Update Recipe</Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdateRecipePage;
