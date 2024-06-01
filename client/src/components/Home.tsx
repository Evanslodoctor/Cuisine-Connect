import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupPage from "./SignupPage";
import About from "./About";
//import "./Home.css"; // Import the custom CSS for Home

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  return (
    <Container fluid className="home-container">
      {loggedIn ? (
        <SignupPage />
      ) : (
        <>
          <Carousel
            controls={false}
            indicators={false}
            interval={3000}
            pause={false}
            className="carousel-reduced-size"
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
          <About /> {/* About section below the carousel */}
        </>
      )}
    </Container>
  );
};

export default Home;
