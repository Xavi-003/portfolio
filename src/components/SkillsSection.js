import React, { useEffect, useState } from 'react';
import { Carousel, ProgressBar } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext'; // Access theme context

function SkillsSection() {
  const { theme } = useTheme(); // Access current theme
  const [skills] = useState([
    { name: 'JavaScript', level: 'Expert', percentage: 90 },
    { name: 'React', level: 'Advanced', percentage: 85 },
    { name: 'Node.js', level: 'Advanced', percentage: 80 },
    { name: 'HTML & CSS', level: 'Expert', percentage: 95 },
    { name: 'Python', level: 'Intermediate', percentage: 70 },
    { name: 'MongoDB', level: 'Intermediate', percentage: 75 },
    { name: 'Docker', level: 'Advanced', percentage: 85 },
    { name: 'GraphQL', level: 'Intermediate', percentage: 65 },
    { name: 'AWS', level: 'Advanced', percentage: 80 },
    { name: 'Vue.js', level: 'Intermediate', percentage: 60 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Split the skills into chunks of 3
  const chunkedSkills = [];
  for (let i = 0; i < skills.length; i += 3) {
    chunkedSkills.push(skills.slice(i, i + 3));
  }

  // Auto-slide skills every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % chunkedSkills.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [chunkedSkills.length]);

  return (
    <section
      id="skills"
      className={`py-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      style={{ minHeight: '100vh' }} // Full height for the section
    >
      <h2 className="text-center mb-4">My Skills</h2>
      <div className="container-fluid px-5"> {/* Use container-fluid for full width */}
        <Carousel
          activeIndex={currentIndex}
          onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
          indicators={false}
          controls={false}
          interval={null}
        >
          {chunkedSkills.map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-around align-items-center">
                {chunk.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-center px-3 flex-grow-1">
                    <h3>{skill.name}</h3>
                    <p><strong>Level:</strong> {skill.level}</p>
                    <ProgressBar
                      now={skill.percentage}
                      label={`${skill.percentage}%`}
                      animated
                      className="my-2"
                      variant={theme === 'dark' ? 'success' : 'success'}
                      style={{ height: '1rem' }} // Ensure consistent height
                    />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default SkillsSection;
