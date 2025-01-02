import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

function Header() {
    const { theme } = useTheme(); // Access the current theme
    const [activeLink, setActiveLink] = useState(""); // State to track active link

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <Navbar
            expand="lg"
            className={`py-3 text-center ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
        >
            <Container>
                <Nav className="mx-auto" style={{ gap: "2rem" }}>
                    <Nav.Link
                        href="#work"
                        onClick={() => handleLinkClick("work")}
                        className={`d-flex align-items-center fw-bold ${theme === 'dark' ? 'text-light' : 'text-dark'} ${activeLink === "work" ? 'bg-primary text-white' : ''}`}
                        style={{
                            borderRadius: "50px",
                            padding: "0.5rem 1rem",
                        }}
                    >
                        Work <span className="ms-1 text-muted">/</span>
                    </Nav.Link>
                    <Nav.Link
                        href="#about"
                        onClick={() => handleLinkClick("about")}
                        className={`${theme === 'dark' ? 'text-light' : 'text-muted'} ${activeLink === "about" ? 'bg-primary text-white' : ''}`}
                   
                        style={{
                          borderRadius: "50px",
                          padding: "0.5rem 1rem",
                      }}>
                        About
                    </Nav.Link>
                    <Nav.Link
                        href="#play"
                        onClick={() => handleLinkClick("play")}
                        className={`${theme === 'dark' ? 'text-light' : 'text-muted'} ${activeLink === "play" ? 'bg-primary text-white' : ''}`}
                        style={{
                          borderRadius: "50px",
                          padding: "0.5rem 1rem",
                      }}
                    >
                        Play
                    </Nav.Link>
                    <Nav.Link
                        href="#notes"
                        onClick={() => handleLinkClick("notes")}
                        className={`${theme === 'dark' ? 'text-light' : 'text-muted'} ${activeLink === "notes" ? 'bg-primary text-white' : ''}`}
                        style={{
                          borderRadius: "50px",
                          padding: "0.5rem 1rem",
                      }}
                    >
                        Notes
                    </Nav.Link>
                    <Nav.Link
                        href="#contact"
                        onClick={() => handleLinkClick("contact")}
                        className={`${theme === 'dark' ? 'text-light' : 'text-muted'} ${activeLink === "contact" ? 'bg-primary text-white' : ''}`}
                        style={{
                          borderRadius: "50px",
                          padding: "0.5rem 1rem",
                      }}
                   >
                        Contact
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
