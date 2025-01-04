import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

function ProjectsSection() {
  const { theme } = useTheme();

  const projects = [
    {
      title: "Project A",
      description: "A brief description of Project A.",
      link: "https://github.com/username/project-a",
    },
    {
      title: "Project B",
      description: "A brief description of Project B.",
      link: "https://github.com/username/project-b",
    },
    {
      title: "Project C",
      description: "A brief description of Project C.",
      link: "https://github.com/username/project-c",
    },
  ];

  const sectionStyle = {
    backgroundColor: theme === "dark" ? "#212529" : "#e9ecef",
    color: theme === "dark" ? "#ffffff" : "#212529",
    margin: "0",
    padding: "2rem 0",
  };

  return (
    <section id="projects" style={sectionStyle}>
      <Container>
        <h2 className="text-center mb-4">Projects</h2>
        <Row className="g-4">
          <Col md={4} sm={6} xs={12} className="d-flex justify-content-start">
            <Card
              className="h-100 shadow border-0"
              style={{
                backgroundColor: theme === "dark" ? "#495057" : "#ffffff",
                color: theme === "dark" ? "#f8f9fa" : "#212529",
              }}
            >
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="mb-2">{projects[0].title}</Card.Title>
                <Card.Text>{projects[0].description}</Card.Text>
                <div className="mt-auto">
                  <a
                    href={projects[0].link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center">
            <Card
              className="h-100 shadow border-0"
              style={{
                backgroundColor: theme === "dark" ? "#495057" : "#ffffff",
                color: theme === "dark" ? "#f8f9fa" : "#212529",
              }}
            >
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="mb-2">{projects[1].title}</Card.Title>
                <Card.Text>{projects[1].description}</Card.Text>
                <div className="mt-auto">
                  <a
                    href={projects[1].link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12} className="d-flex justify-content-end">
            <Card
              className="h-100 shadow border-0"
              style={{
                backgroundColor: theme === "dark" ? "#495057" : "#ffffff",
                color: theme === "dark" ? "#f8f9fa" : "#212529",
              }}
            >
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="mb-2">{projects[2].title}</Card.Title>
                <Card.Text>{projects[2].description}</Card.Text>
                <div className="mt-auto">
                  <a
                    href={projects[2].link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProjectsSection;
