import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

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
    <Container fluid className="m-0 p-0" 
    style={{
      background: `url(/background/slide4.jpg)`,
      backgroundSize: `cover`,
      height: `100vh`,
      }}>
      <Container fluid className="signup-page w-100 h-100 m-0 p-0 position-relative" style={{width: `100vw`}}>
        {/* <div style={{color: `white`}} className="sevillana-regular">
          <h2>
            Sign in to share your own beautiful recipes
          </h2>
        </div> */}
        <Form className="bg-white text-success d-flex flex-column align-items-center p-5 h-100 fw-semibold position-absolute end-0 top-0" style={{minWidth: `50vw`}}> 
          <div className="text-center">
            <Link className="d-flex justify-content-center" to="/">
              <Image src="https://img.freepik.com/free-psd/abstract-3d-web-logo-typographical-transparent-psd_460848-17964.jpg?size=626&ext=jpg&ga=GA1.1.1972000078.1716376540&semt=ais_user" className="w-25 h-25"></Image>
            </Link>
            <h3>
              Welcome to Cuisine Connect
            </h3>
          </div>
          <Form.Group className="mt-3 w-75" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3 w-75" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3 w-75" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" onClick={handleSignup} className="mt-5 w-50">
            Signup
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default SignupPage;
