import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Baselayout from "./Baselayout";

const LoginPage: React.FC = ({ setIsLoggedIn }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [setIsLoggedIn, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://cuisine-connect-production.up.railway.app/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container fluid className="m-0 p-0" 
      style={{
        background: `url(/background/slide4.jpg)`,
        backgroundSize: `cover`,
        height: `100vh`
      }}>
      <Container fluid className="login-page w-100 h-100 m-0 p-0 position-relative" style={{width: `100vw`}}>
        <Form className="bg-white text-success d-flex flex-column align-items-center p-5 h-100 fw-semibold position-absolute end-0 top-0" style={{minWidth: `50vw`}}> 
          <div className="text-center">
            <Link className="d-flex justify-content-center" to="/">
              <Image src="/logo/logo_2.svg"></Image>
            </Link>
            <h3 className="sevillana-regular">
              Welcome Back!
            </h3>
          </div>
          {error && <Alert variant="danger" className='w-75'>{error}</Alert>}
          <Form.Group className='mt-5 w-75' controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mt-3 w-75' controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" className="mt-5 w-50" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default LoginPage;
