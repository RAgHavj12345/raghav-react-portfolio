import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Galaxy from './Galaxy';
import ScrollFloat from './ScrollFloat';
import StarBorder from './StarBorder';
import GlareHover from './GlareHover';
import './App.css';
import './GlareHover.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // <-- import icons

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
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
          <a href="#home" className="logo" onClick={closeMenu}>RJ</a>

          <div className={isMenuOpen ? 'hamburger active' : 'hamburger'} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            <li className="mobile-socials">
              <a href="https://github.com/raghavj12345" className="mobile-social-link" target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" className="mobile-social-link" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </li>
          </ul>

          <div className="nav-socials">
            <a href="https://github.com/raghavj12345" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" /> LinkedIn
            </a>
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

      {/* Remaining sections unchanged */}
    </div>
  );
};

export default App;
