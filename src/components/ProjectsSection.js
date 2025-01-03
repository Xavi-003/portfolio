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
        <Row className="g-4 justify-content-center">
          {projects.map((project, index) => (
            <Col key={index} md={4} sm={6} xs={12} className="d-flex align-items-stretch">
              <Card
                className="h-100 shadow border-0"
                style={{
                  backgroundColor: theme === "dark" ? "#495057" : "#ffffff",
                  color: theme === "dark" ? "#f8f9fa" : "#212529",
                }}
              >
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="mb-2">{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <div className="mt-auto">
                    <a
                      href={project.link}
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
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ProjectsSection;
