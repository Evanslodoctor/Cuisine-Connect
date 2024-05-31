import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [mealType, setMealType] = useState("");
  const [customMealType, setCustomMealType] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const africanMeals = [
    "Jollof Rice, Nigeria", "Bunny Chow, South Africa", "Tagine, Morocco", "Injera, Ethiopia",
    "Bobotie, South Africa", "Piri Piri Chicken, Mozambique", "Suya, Nigeria", "Fufu, Ghana",
    "Couscous, Algeria", "Chicken Muamba, Angola", "Sadza, Zimbabwe", "Nyama Choma, Kenya",
    "Shakshuka, Tunisia", "Waakye, Ghana", "Sosaties, South Africa", "Biltong, South Africa",
    "Chapati, Uganda", "Koshari, Egypt", "Moin Moin, Nigeria", "Braaibroodjies, South Africa",
    "Potjiekos, South Africa", "Brochettes, Rwanda", "Matoke, Uganda", "Egusi Soup, Nigeria",
    "Kachumbari, Kenya", "Gored Gored, Ethiopia", "Maafe, Senegal", "Samp and Beans, South Africa",
    "Akara, Nigeria", "Pepper Soup, Nigeria", "Cachupa, Cape Verde", "Fried Plantains, Various",
    "Ndolé, Cameroon", "Palm Nut Soup, Ghana", "Sambaza, Rwanda", "Tibs, Ethiopia",
    "Thieboudienne, Senegal", "Moambe Chicken, Congo", "Chambo, Malawi", "Mofo Gasy, Madagascar",
    "Ugali, Kenya", "Tilapia, Uganda", "Nyembwe Chicken, Gabon", "Matemba, Zimbabwe",
    "Pilau, Tanzania", "Achombo, Cameroon", "Menemen, Egypt", "Mala Mogodu, South Africa",
    "Kedjenou, Ivory Coast", "Alloco, Ivory Coast", "Kahawa, Tanzania", "Roasted Goat, Various",
    "Catfish Pepper Soup, Nigeria", "Zigni, Eritrea", "Ful Medames, Sudan", "Mutura, Kenya",
    "Githeri, Kenya", "Mugoyo, Kenya", "Sautéed Spinach, Kenya", "Nyama na Irio, Kenya",
    "Boerewors, South Africa", "Pap en Vleis, South Africa", "Vetkoek, South Africa",
    "Melktert, South Africa", "Malva Pudding, South Africa", "Amasi, South Africa",
    "Peri Peri Prawns, Mozambique", "Kachumbari, Tanzania", "Machboos, Comoros",
    "Yassa Chicken, Senegal", "Kuku Paka, Kenya", "Liboke ya Malangwa, Congo", "Mbongo Tchobi, Cameroon",
    "Kik Alicha, Ethiopia", "Siga Tibs, Ethiopia", "Gomen, Ethiopia", "Misir Wot, Ethiopia",
    "Ayamase, Nigeria", "Ogi, Nigeria", "Ikokore, Nigeria", "Edikang Ikong, Nigeria",
    "Ofada Rice, Nigeria", "Amala and Ewedu, Nigeria", "Banga Soup, Nigeria", "Efo Riro, Nigeria",
    "Ogbono Soup, Nigeria", "Oha Soup, Nigeria", "Gbegiri, Nigeria", "Bitterleaf Soup, Nigeria",
    "Ata Din Din, Nigeria", "Ewa Agoyin, Nigeria", "Yam Porridge, Nigeria", "Isi Ewu, Nigeria",
    "Ukodo, Nigeria", "Ugba, Nigeria", "Abacha, Nigeria", "Nsala Soup, Nigeria", "Kuli Kuli, Nigeria",
    "Gari Foto, Ghana", "Banku and Tilapia, Ghana", "Kelewele, Ghana", "Kenkey, Ghana",
    "Red Red, Ghana", "Tuo Zaafi, Ghana", "Nkatenkwan, Ghana", "Ampesi, Ghana",
    "Kontomire Stew, Ghana", "Groundnut Soup, Ghana", "Eto, Ghana", "Agushi Stew, Ghana",
    "Bofrot, Ghana", "Chinchinga, Ghana", "Fried Yams, Ghana", "Kyinkyinga, Ghana",
    "Toubani, Benin", "Aloko, Benin", "Moyo, Benin", "Gboma Dessi, Benin", "Kokonte, Ghana",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user")).UserID;
    const uniqueId = `${userId}-${uuidv4()}`;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes",
        {
          Title: title,
          Description: description,
          Ingredients: ingredients.split("\n"),
          Instructions: instructions,
          CuisineType: mealType || customMealType,
          DietaryTags: dietaryTags,
          DifficultyLevel: difficultyLevel,
          CreationDate: new Date(),
          UserUserID: userId, // Correct the variable reference
          UniqueId: uniqueId,
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
        navigate(`/upload-image/${uniqueId}`); // Use uniqueId for navigation
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
      <Form className="recipe_form" onSubmit={handleSubmit}>
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
            <Form.Group controlId="mealType">
              <Form.Label>Meal Type</Form.Label>
              <Form.Control
                as="select"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="">Select a meal type</option>
                {africanMeals.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                type="text"
                placeholder="Or enter a new meal type"
                value={customMealType}
                onChange={(e) => setCustomMealType(e.target.value)}
                className="mt-2"
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
        <Row>
          <Col md={6}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ingredients">
              <Form.Label>Ingredients (one per line)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="instructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3">
            Next
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddRecipe;
