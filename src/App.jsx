import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const sections = ['Home', 'About', 'Skills', 'Projects'];

const App = () => {
  const [activeSection, setActiveSection] = useState('Home');

  const renderSection = () => {
    switch (activeSection) {
      case 'About':
        return <AboutSection key="about" />;
      case 'Skills':
        return <SkillsSection key="skills" />;
      case 'Projects':
        return <ProjectsSection key="projects" />;
      default:
        return <HomeSection key="home" />;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        {sections.map(section => (
          <motion.button
            key={section}
            className={`nav-button ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {section}
          </motion.button>
        ))}
      </nav>

      <main className="content-container">
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a>
        <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:raghavj12321@gmail.com">Contact</a>
      </footer>
    </div>
  );
};

// --- Section Components ---

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] } }
};

const HomeSection = () => (
  <motion.section variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
    <h1 className="title">Raghav Joshi</h1>
    <p className="subtitle">Aspiring AI & Machine Learning Engineer</p>
  </motion.section>
);

const AboutSection = () => (
  <motion.section variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
    <h2 className="section-title">About</h2>
    <p className="section-content">
      I am a motivated and detail-oriented AI/ML enthusiast with a strong academic foundation in Computer Science. My passion lies in turning complex data into actionable insights and building impactful, intelligent solutions.
    </p>
  </motion.section>
);

const SkillsSection = () => (
  <motion.section variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
    <h2 className="section-title">Skills</h2>
    <div className="skills-grid">
      {['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'SQL', 'OpenCV', 'Git'].map(skill => (
        <motion.div key={skill} className="skill-item" whileHover={{ scale: 1.1, backgroundColor: '#333' }}>
          {skill}
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const ProjectsSection = () => (
  <motion.section variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
    <h2 className="section-title">Featured Project</h2>
    <motion.div className="project-card" whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
      <h3>Real-Time Face and Behaviour Analysis System</h3>
      <p className="project-status">(In Progress)</p>
      <p>This project integrates computer vision and deep learning to analyze facial expressions and behavioral patterns from a real-time video feed.</p>
      <p className="tech-stack"><strong>Tech:</strong> Python, OpenCV, TensorFlow</p>
    </motion.div>
  </motion.section>
);

export default App;
