import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

function ContactSection() {
  const { theme } = useTheme();

  const sectionStyle = {
    backgroundColor: theme === "dark" ? "#212529" : "#e9ecef",
    color: theme === "dark" ? "#ffffff" : "#212529",
    margin: "0",
    padding: "2rem 0",
  };

  const contactDetails = [
    {
      label: "Email",
      value: "xavier.developer03@gmail.com",
      link: "mailto:xavier.developer03@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/Xavi-003",
      link: "https://github.com/Xavi-003",
    },
  ];

  return (
    <section id="contact" style={sectionStyle}>
      <Container>
        <h2 className="text-center mb-4">Contact</h2>
        <Row className="g-4 justify-content-center">
          {contactDetails.map((contact, index) => (
            <Col key={index} md={6} sm={12} xs={12} className="d-flex align-items-center">
              <div
                className="p-3 w-100 shadow-sm border-0"
                style={{
                  backgroundColor: theme === "dark" ? "#495057" : "#ffffff",
                  color: theme === "dark" ? "#f8f9fa" : "#212529",
                  borderRadius: "0.5rem",
                }}
              >
                <h5>{contact.label}</h5>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme === "dark" ? "#f8f9fa" : "#007bff" }}
                >
                  {contact.value}
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ContactSection;
