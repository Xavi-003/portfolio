import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useTheme } from '../context/ThemeContext';
import man_with_lap from '../assets/main.jpeg';

const IDEWrapper = styled.div`
  font-family: 'Fira Code', monospace;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#d4d4d4' : '#1e1e1e')};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  max-width: 1200px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  
`;

const LeftSide = styled.div`
  flex: 1;
  padding: 2em;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => (props.theme === 'dark' ? '#d4d4d4' : '#1e1e1e')};
`;

const RightSide = styled.div`
  flex: 1;
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.theme === 'dark' ? '#333333' : '#f4f4f4')};
`;

const HeaderBar = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f1f1f1')};
  padding: 0.5em 1em;
  color: ${(props) => (props.theme === 'dark' ? '#ccc' : '#333')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tabs = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#252526' : '#eaeaea')};
  display: flex;
  border-bottom: 2px solid ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ccc')};
`;

const Tab = styled.div`
  padding: 0.5em 1em;
  cursor: pointer;
  color: ${(props) => (props.theme === 'dark' ? '#ccc' : '#1e1e1e')};
  background-color: ${(props) =>
    props.active ? (props.theme === 'dark' ? '#1e1e1e' : '#d0d0d0') : 'transparent'};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#d0d0d0')};
  }
`;

const TextArea = styled.div`
  padding: 1em;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  min-height: 300px;
  font-size: 1.2em;
  color: ${(props) => (props.theme === 'dark' ? '#d4d4d4' : '#1e1e1e')};
  white-space: pre-wrap;
  margin-top: 1em;
`;

const EditorText = styled.span`
  display: inline-block;
  font-size: 1.2em;
`;

const ImageContainer = styled.div`
  max-width: 80%;
  img {
    width: 100%;
    border-radius: 8px;
  }
`;

function Main() {
  const { theme } = useTheme(); // Access the current theme from the context
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('index.js'); // Active tab state
  const fullText = `Antony Xavier B.E\nHi, I'm a passionate web developer with expertise in creating responsive, user-friendly, and dynamic web applications. Let's build something amazing together!`;

  useEffect(() => {
    let currentIndex = 0;
    const typingEffect = setInterval(() => {
      setText((prevText) => prevText + fullText[currentIndex]);
      currentIndex += 1;
      if (currentIndex === fullText.length) {
        clearInterval(typingEffect);
      }
    }, 50); // Adjust the typing speed (in milliseconds)

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <Container
      fluid
      className={`d-flex vh-100 justify-content-center align-items-center bg-${theme === 'dark' ? 'dark' : 'light'
        }`}
    >
      <IDEWrapper theme={theme}>
        {/* Left Side (VS Code-like content) */}
        <LeftSide theme={theme}>
          <HeaderBar theme={theme}>
            <div>VS Code - Portfolio</div>
            <Button
              variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
              size="sm"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              Download Resume
            </Button>
          </HeaderBar>

          {/* Tabs */}
          <Tabs theme={theme}>
            <Tab
              active={activeTab === 'index.js'}
              theme={theme}
              onClick={() => setActiveTab('index.js')}
            >
              index.js
            </Tab>
            <Tab
              active={activeTab === 'styles.css'}
              theme={theme}
              onClick={() => setActiveTab('styles.css')}
            >
              styles.css
            </Tab>
            <Tab
              active={activeTab === 'README.md'}
              theme={theme}
              onClick={() => setActiveTab('README.md')}
            >
              README.md
            </Tab>
          </Tabs>

          {/* Code Editor Text */}
          <TextArea theme={theme}>
            <EditorText>{text}</EditorText>
          </TextArea>
        </LeftSide>

        {/* Right Side (Image) */}
        <RightSide theme={theme}>
          <ImageContainer>
            <img
              src={man_with_lap}
              alt="Web Developer Portfolio"
              className="img-fluid"
            />
          </ImageContainer>
        </RightSide>
      </IDEWrapper>
    </Container>
  );
}

export default Main;
