import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupPage from "./SignupPage"; // Import your signup page component

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, navigate to the dashboard
      navigate("/dashboard");
    } else {
      // Otherwise, user is not logged in
      setLoggedIn(false);
    }
  }, [navigate]);

  return (
    <Container fluid className="home-container">
      {loggedIn ? (
        // If user is logged in, redirect to dashboard
        <SignupPage />
      ) : (
        // Otherwise, show the carousel
        <Carousel
          controls={false}
          indicators={false}
          interval={3000}
          pause={false}
        >
          <Carousel.Item>
            <div
              className="carousel-background"
              style={{
                backgroundImage: `url('/background/slide1.jpg')`,
              }}
            >
              <div className="carousel-text text-center">
                <h1>Welcome to Cuisine Connect!</h1>
                <p>Share and discover amazing recipes.</p>
                <Button as="a" href="/signup" variant="primary">
                  Register Now
                </Button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="carousel-background"
              style={{
                backgroundImage: `url('/background/slide2.jpg')`,
              }}
            >
              <div className="carousel-text text-center">
                <h1>Explore New Recipes</h1>
                <p>Find recipes that inspire you to cook.</p>
                <Button as="a" href="/signup" variant="primary">
                  Register Now
                </Button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="carousel-background"
              style={{
                backgroundImage: `url('/background/slide3.jpg')`,
              }}
            >
              <div className="carousel-text text-center">
                <h1>Join Our Community</h1>
                <p>Connect with other food enthusiasts.</p>
                <Button as="a" href="/signup" variant="primary">
                  Register Now
                </Button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      )}
    </Container>
  );
};

export default Home;
