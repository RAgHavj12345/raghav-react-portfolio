import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Galaxy from './Galaxy';
import ScrollFloat from './ScrollFloat';
import StarBorder from './StarBorder';
import GlareHover from './GlareHover';
import './App.css';
import './GlareHover.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app-container">
      <Galaxy mouseRepulsion={true} density={1.2} glowIntensity={0.5} saturation={0} hueShift={0} />

      <nav className="navbar">
        <div className="container">
          <div className="nav-header">
            <a href="#home" className="logo" onClick={closeMenu}>RJ</a>
            <div className={isMenuOpen ? 'hamburger active' : 'hamburger'} onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>

          <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            <li className="mobile-socials">
              <a className="mobile-social-link" href="https://github.com/raghavj12345" target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon" /> GitHub
              </a>
              <a className="mobile-social-link" href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" /> LinkedIn
              </a>
            </li>
          </ul>
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
        <motion.div id="about" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <StarBorder color="#ffffffff" speed="5s">
            <ScrollFloat>About Me</ScrollFloat>
            <p>I am a motivated and detail-oriented AI/ML enthusiast with a strong academic foundation in Computer Science. My passion lies in turning complex data into actionable insights and building impactful, intelligent solutions.</p>
          </StarBorder>
        </motion.div>

        <motion.div id="skills" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <StarBorder color="#ffffffff" speed="9s">
            <ScrollFloat>Skills</ScrollFloat>
            <div className="skills-grid">
              {['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'SQL', 'OpenCV', 'Git'].map(skill => (
                <GlareHover key={skill} glareOpacity={0.2} glareSize={200} transitionDuration={600}>
                  <motion.div className="skill-item" whileHover={{ y: -5, backgroundColor: '#ffffff', color: '#000000' }}>
                    {skill}
                  </motion.div>
                </GlareHover>
              ))}
            </div>
          </StarBorder>
        </motion.div>

        <motion.div id="projects" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <StarBorder color="#ffffffff" speed="9s">
            <ScrollFloat>Featured Project</ScrollFloat>
            <GlareHover glareColor="#ffffff" glareOpacity={0.3} glareAngle={-30} glareSize={300} transitionDuration={800} playOnce={false} style={{ width: "100%", height: "100%" }}>
              <motion.div className="project-card" whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(255,255,255,0.1)' }}>
                <h3>Real-Time Face and Behaviour Analysis System</h3>
                <p className="project-status">(In Progress)</p>
                <p>This project integrates computer vision and deep learning to analyze facial expressions and behavioral patterns from a real-time video feed.</p>
                <p className="tech-stack"><strong>Tech:</strong> Python, OpenCV, TensorFlow</p>
              </motion.div>
            </GlareHover>
          </StarBorder>
        </motion.div>

        <motion.div id="contact" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
          <StarBorder color="#ffffffff" speed="6s">
            <ScrollFloat>Get In Touch</ScrollFloat>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!</p>
            <a href="mailto:raghavj12321@gmail.com" className="btn">Say Hello</a>
          </StarBorder>
        </motion.div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Raghav Joshi.</p>
      </footer>
    </div>
  );
};

export default App;
