import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const App = () => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <a href="#home" className="logo">RJ</a>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a></li>
        </ul>
      </nav>

      <header id="home" className="hero">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } }
          }}
        >
          <motion.h1 variants={sectionVariants}>Raghav Joshi</motion.h1>
          <motion.p variants={sectionVariants} className="subtitle">Aspiring AI & Machine Learning Engineer</motion.p>
          <motion.a variants={sectionVariants} href="mailto:raghavj12321@gmail.com" className="btn">Contact Me</motion.a>
        </motion.div>
      </header>

      <main>
        <motion.section
          id="about"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h2 className="section-title">About Me</h2>
          <p>I am a motivated and detail-oriented AI/ML enthusiast with a strong academic foundation in Computer Science. My passion lies in turning complex data into actionable insights and building impactful, intelligent solutions.</p>
        </motion.section>

        <motion.section
          id="skills"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'SQL', 'OpenCV', 'Git'].map(skill => (
              <motion.div key={skill} className="skill-item" whileHover={{ y: -5, backgroundColor: '#2a2a2a' }}>
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="section-title">Featured Project</h2>
          <motion.div className="project-card" whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
            <h3>Real-Time Face and Behaviour Analysis System</h3>
            <p className="project-status">(In Progress)</p>
            <p>This project integrates computer vision and deep learning to analyze facial expressions and behavioral patterns from a real-time video feed.</p>
            <p className="tech-stack"><strong>Tech:</strong> Python, OpenCV, TensorFlow</p>
          </motion.div>
        </motion.section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Raghav Joshi. Let's Get It.</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/raghavj12345" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
