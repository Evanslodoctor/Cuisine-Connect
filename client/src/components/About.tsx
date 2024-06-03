import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
    <Container className="about-section">
      <Row>
        <Col lg={8} className="about-left-column">
          <h2>About African Meals</h2>
          <p>African Meals is a platform dedicated to showcasing the rich and diverse culinary traditions of Africa. We believe in celebrating the vibrant flavors, unique ingredients, and cultural significance of African cuisine.</p>
          <p>Our platform serves as a hub for:</p>
          <ul>
            <li>Exploring a wide variety of authentic African recipes</li>
            <li>Sharing your own recipes and culinary experiences</li>
            <li>Connecting with fellow food enthusiasts and experts</li>
          </ul>
        </Col>
        <Col lg={4} className="about-right-column">
          <Row className="social-media-row">
            <Col xs={4}>
              <a href="https://www.facebook.com">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </Col>
            <Col xs={4}>
              <a href="https://www.twitter.com">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </Col>
            <Col xs={4}>
              <a href="https://www.instagram.com">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Col>
          </Row>
          <Row className="mission-vision-row">
            <Col>
              <h3>Our Mission</h3>
              <p>To promote African cuisine and culinary traditions by providing a platform for sharing, learning, and connecting.</p>
            </Col>
          </Row>
          <Row className="mission-vision-row">
            <Col>
              <h3>Our Vision</h3>
              <p>To be the leading source of authentic African recipes and culinary inspiration globally.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
