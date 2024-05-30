import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UploadImage = ({ recipeId }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("Image", image);

      const response = await axios.post(
        `http://localhost:3000/api/recipes/${recipeId}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setSuccess("Image uploaded successfully!");
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

  return (
    <Container className="mt-5">
      <h1 className="text-center">Upload Image</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="image">
          <Form.Label>Choose Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Upload Image
        </Button>
      </Form>
    </Container>
  );
};

export default UploadImage;
