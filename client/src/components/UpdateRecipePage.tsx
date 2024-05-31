import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, FormControl, InputGroup } from 'react-bootstrap';

const UpdateRecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  // Add state for other fields as needed

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/recipes/search?keyword=${keyword}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/recipes/${selectedRecipe}`, {
        title: newTitle,
        description: newDescription,
        // Add other fields to update
      });
      console.log('Recipe updated:', response.data);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Update Recipe</h1>
      <Form>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for recipe"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
        </InputGroup>
      </Form>
      <Form.Group>
        <Form.Label>Select Recipe to Update</Form.Label>
        <Form.Control as="select" onChange={(e) => setSelectedRecipe(e.target.value)}>
          <option value="">Select Recipe</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {/* Add form fields for updating recipe */}
      <Button variant="primary" onClick={handleUpdate}>Update Recipe</Button>
    </Container>
  );
};

export default UpdateRecipePage;
