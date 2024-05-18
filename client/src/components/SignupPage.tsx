import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, navigate to the login page
      navigate("/login");
    }
  }, [navigate]);

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/", {
        username,
        email,
        password,
        role: "regular user", // Assuming new users are regular users by default
      });
      // Handle successful signup
      console.log("Signup successful:", response.data);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      // Handle signup error
      console.error("Signup failed:", error);
    }
  };

  return (
    <Container className="mt-5 signup_page">
      <h2 className="mb-4">Signup</h2>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSignup} className="mt-3">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default SignupPage;
