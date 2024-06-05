import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import Baselayout from "./Baselayout";

const UploadImage = () => {
  const { uniqueId } = useParams();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("uniqueId", uniqueId);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("imageUrl", imageUrl);
    }

    try {
      const response = await axios.post(
        "http://cuisine-connect-production.up.railway.app/api/recipes/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        setSuccess("Recipe added successfully!");
        setError("");
      } else {
        setError("Failed to upload image. Please try again later.");
        setSuccess("");
      }
    } catch (err) {
      setError(err.response.data.message);
      setSuccess("");
    }
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <Baselayout>
      <Container className={`vh-100 d-flex flex-column justify-content-center ${darkMode ? 'dark' : 'light'}`}>
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
                <Button variant="outline-dark" onClick={toggleDarkMode}>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </div>
            </Col>
          )}
          <Col xs={sidebarExpanded ? 9 : 12}>
            <Row>
              <Col className="text-center mb-4">
                <Button variant="outline-dark" onClick={toggleSidebar} className={`menu-button ${darkMode ? 'dark' : 'light'}`}>
                  {sidebarExpanded ? 'Close' : 'Menu'}
                </Button>
              </Col>
            </Row>
            <h1 className="text-center">Upload Recipe Image</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
              <Form.Group controlId="image">
                <Form.Label>Recipe Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <Form.Group controlId="imageUrl">
                <Form.Label>or Image URL</Form.Label>
                <Form.Control type="text" onChange={handleUrlChange} />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" className="mt-3">
                  Save
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Baselayout>
  );
};

export default UploadImage;
