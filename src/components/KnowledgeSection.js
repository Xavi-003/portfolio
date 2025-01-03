import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

function KnowledgeSection() {
  const { theme } = useTheme();

  const knowledgeItems = [
    { title: "Web Development", description: "In-depth knowledge of modern web technologies.", icon: "🌐" },
    { title: "Cloud Computing", description: "Experience with cloud services like AWS.", icon: "☁️" },
    { title: "DevOps", description: "Skilled in CI/CD and automation tools.", icon: "⚙️" },
    { title: "Database Management", description: "Proficient in SQL and NoSQL databases.", icon: "💾" },
    { title: "UI/UX Design", description: "Focused on intuitive interfaces.", icon: "🎨" },
    { title: "Cybersecurity", description: "Understanding of security best practices.", icon: "🔒" },
  ];

  const sectionStyle = {
    backgroundColor: theme === "dark" ? "#212529" : "#f8f9fa",
    color: theme === "dark" ? "#ffffff" : "#212529",
    margin: "0",
    padding: "2rem 0",
  };

  return (
    <section id="knowledge" style={sectionStyle}>
      <Container>
        <h2 className="text-center mb-4">Knowledge Areas</h2>
        <Row className="g-4 justify-content-center">
          {knowledgeItems.map((item, index) => (
            <Col key={index} md={4} sm={6} xs={12} >
              <Card
                className="shadow border-0"
                style={{
                  backgroundColor: theme === "dark" ? "#495057" : "#ffffff",
                  color: theme === "dark" ? "#f8f9fa" : "#212529",
                }}
              >
                <Card.Body className="text-center d-flex flex-column">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    {item.icon}
                  </div>
                  <Card.Title className="mb-2">{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <div className="mt-auto"> {/* Ensures consistent spacing */}
                    {/* Additional content if needed */}
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

export default KnowledgeSection;
