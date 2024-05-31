import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UploadImage = () => {
  const { uniqueId } = useParams();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("uniqueId", uniqueId);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes/upload-image",
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

  return (
    <Container className="mt-5 upload-image-container">
      <h1 className="text-center">Upload Recipe Image</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="image">
          <Form.Label>Recipe Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UploadImage;
