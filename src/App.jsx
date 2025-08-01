import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import Galaxy from './Galaxy';
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

// Data for projects
const projectsData = [
  {
  title: '🔮 EV Adoption Forecaster',
  status: 'Completed & Deployed',
  description: 'A time-series forecasting model deployed as an interactive Streamlit app to predict county-level EV adoption.',
  tech: 'Python, Streamlit, Scikit-learn, Pandas',
  imageUrl: '/images/app-screenshot.png',
  liveUrl: 'https://evchargingprediction-tkfusxpyhmxkvkivseemmf.streamlit.app/',
  githubUrl: 'https://github.com/RAgHavj12345/EV_Charging_Prediction'
  
},
{
  title: '🔧 Predictive Maintenance for Industrial Machinery',
  status: 'Completed & Deployed',
  description: 'An end-to-end ML project on IBM Watsonx.ai to predict industrial equipment failures, achieving 99.6% accuracy.',
  tech: 'Python, IBM Watsonx.ai, AutoAI, Scikit-learn',
  imageUrl: '/images/confusion_matrix.png',
  liveUrl: null,
  githubUrl: 'https://github.com/raghavj12345/Predictive-Maintenance-Project'
},
  {
    title: 'Real-Time Face and Behaviour Analysis System',
    status: 'In Progress',
    description: 'Integrates computer vision and deep learning to analyze facial expressions and behavioral patterns from a real-time video feed.',
    tech: 'Python, OpenCV, TensorFlow',
    imageUrl: null, 
    liveUrl: null, 
    githubUrl: '#' // Replace with the actual link
  }
];

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
          <StarBorder color="#ffffffff" speed="8s">
           <GlareHover glareOpacity={0.2} glareSize={300} transitionDuration={600}>
            <h2>About Me</h2>
            <p>I am a motivated and detail-oriented AI/ML enthusiast with a strong academic foundation in Computer Science. My passion lies in turning complex data into actionable insights and building impactful, intelligent solutions.</p>
            </GlareHover>
          </StarBorder>
        </motion.div>

        <motion.div id="skills" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <StarBorder color="#ffffffff" speed="9s">
            <h2>Skills</h2>
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

        {/* --- REPLACE YOUR PROJECTS SECTION WITH THIS --- */}
<motion.div id="projects" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
  <StarBorder color="#ffffffff" speed="9s">
    <h2>Featured Projects</h2>
    <div className="projects-grid">
      {projectsData.map((project, index) => (
        <GlareHover key={index} glareColor="#ffffff" glareOpacity={0.2} glareAngle={-30} glareSize={400} transitionDuration={800} playOnce={false} style={{ width: "100%", height: "100%" }}>
          <motion.div className="project-card" whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(255,255,255,0.1)' }}>
            {project.imageUrl && (
              <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
                <img src={project.imageUrl} alt={project.title} className="project-image" />
              </a>
            )}
            <h3>{project.title}</h3>
            <p className="project-status">({project.status})</p>
            <p>{project.description}</p>
            <p className="tech-stack"><strong>Tech:</strong> {project.tech}</p>
            <div className="project-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaExternalLinkAlt /> Live App
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        </GlareHover>
      ))}
    </div>
  </StarBorder>
</motion.div>
        <motion.div id="contact" className="content-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
          <StarBorder color="#ffffffff" speed="8s">
          <GlareHover glareOpacity={0.2} glareSize={300} transitionDuration={600}>
            <h2>Get In Touch</h2>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!</p>
            <a href="mailto:raghavj12321@gmail.com" className="btn">Say Hello</a>
          </GlareHover>
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