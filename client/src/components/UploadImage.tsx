import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UploadImage = () => {
  const { uniqueId } = useParams();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    </Container>
  );
};

export default UploadImage;
