import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Dither from './Dither';
import './App.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app-container">
      <Dither
        waveColor={[0.1, 0.1, 0.1]}
        colorNum={3}
        waveAmplitude={0.2}
        mouseRadius={0.2}
      />

      <nav className="navbar">
        <div className="container">
          <a href="#home" className="logo" onClick={closeMenu}>RJ</a>
          <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
            {['about','skills','projects','contact'].map(sec => (
              <li key={sec}><a href={`#${sec}`} onClick={closeMenu}>{sec.charAt(0).toUpperCase()+sec.slice(1)}</a></li>
            ))}
            <li><a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a></li>
          </ul>
          <div className={isMenuOpen ? 'hamburger active' : 'hamburger'} onClick={toggleMenu}>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </div>
        </div>
      </nav>

      <header id="home" className="hero">
        <motion.div className="hero-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
          <motion.h1 variants={sectionVariants}>Raghav Joshi</motion.h1>
          <motion.p variants={sectionVariants} className="subtitle">Aspiring AI & Machine Learning Engineer</motion.p>
          <motion.a variants={sectionVariants} href="#contact" className="btn">Contact Me</motion.a>
        </motion.div>
      </header>

      <main>
        <motion.section id="about" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
          <h2 className="section-title">About Me</h2>
          <p>I am a motivated and detail‑oriented AI/ML enthusiast with a strong academic foundation in Computer Science...</p>
        </motion.section>

        <motion.section id="skills" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {['Python','TensorFlow','PyTorch','Scikit‑Learn','Pandas','NumPy','SQL','OpenCV','Git'].map(skill => (
              <motion.div key={skill} className="skill-item" whileHover={{ y: -5, backgroundColor: '#ffffff', color: '#000000' }}>{skill}</motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <h2 className="section-title">Featured Project</h2>
          <motion.div className="project-card" whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(255,255,255,0.1)' }}>
            <h3>Real‑Time Face and Behaviour Analysis System</h3>
            <p className="project-status">(In Progress)</p>
            <p>This project integrates computer vision and deep learning to analyze facial expressions and behavioural patterns from a real‑time video feed.</p>
            <p className="tech-stack"><strong>Tech:</strong> Python, OpenCV, TensorFlow</p>
          </motion.div>
        </motion.section>

        <motion.section id="contact" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
          <h2 className="section-title">Get In Touch</h2>
          <p>I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!</p>
          <a href="mailto:raghavj12321@gmail.com" className="btn">Say Hello</a>
        </motion.section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Raghav Joshi.</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/raghavj12345" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
