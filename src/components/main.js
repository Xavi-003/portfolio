import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '../context/ThemeContext'; // Access theme context
import man_with_lap from '../assets/main.jpeg'; // Replace with the correct path to your image

function Main() {
  const { theme } = useTheme(); // Access current theme

  return (
    <Container fluid
      className={`d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-${theme === 'dark' ? 'dark text-white' : 'light text-dark'
        }`}
    >
      <Row className="align-items-center">
        {/* Left Column: Text Section */}
        <Col md={6} className="text-center text-md-start pe-md-5">
          <h1 className="mb-3">
            Antony Xavier <sub style={{ fontSize: '0.6em', verticalAlign: 'baseline' }}>B.E</sub>
          </h1>
          <p className="lead">
            Hi, I'm a passionate web developer with expertise in creating responsive, user-friendly, and dynamic web applications.
            Let's build something amazing together!
          </p>
          <Button
            variant={theme === 'dark' ? 'light' : 'dark'}
            size="lg"
            className="fw-bold"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            Download Resume
          </Button>
        </Col>

        {/* Right Column: Image Section */}
        <Col md={6} className="text-center">
          <img
            src={man_with_lap}
            alt="Web Developer Portfolio"
            className="img-fluid"
            style={{ maxWidth: '75%' }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
