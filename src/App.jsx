import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Animation variants for smooth fade-in and slide-up effect
const fadeInSlideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">RJ</a>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a></li>
          </ul>
        </div>
      </nav>

      <motion.header 
        className="hero"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } }
        }}
      >
        <div className="container">
          <motion.h1 variants={fadeInSlideUp}>Raghav Joshi</motion.h1>
          <motion.h2 variants={fadeInSlideUp}>Aspiring AI & Machine Learning Engineer</motion.h2>
          <motion.p variants={fadeInSlideUp}>Passionate about turning data into actionable insights and building intelligent solutions.</motion.p>
          <motion.div variants={fadeInSlideUp}>
            <a href="mailto:raghavj12321@gmail.com" className="btn">Get In Touch</a>
          </motion.div>
        </div>
      </motion.header>

      <main>
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInSlideUp}
        >
          <div className="container">
            <h3>About Me</h3>
            <p>
              I am a motivated and detail-oriented AI/ML enthusiast with a strong academic foundation in Computer Science. My expertise lies in data analysis and machine learning, with hands-on experience using frameworks like TensorFlow and PyTorch. I am eager to contribute to impactful AI-driven solutions in collaborative environments.
            </p>
          </div>
        </motion.section>

        <motion.section 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInSlideUp}
        >
          <div className="container">
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">Python</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">SQL</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">TensorFlow</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">PyTorch</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">Scikit-Learn</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">Pandas</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">NumPy</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">OpenCV</motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="skill-item">Git & GitHub</motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInSlideUp}
        >
          <div className="container">
            <h3>Featured Project</h3>
            <motion.div className="project-card" whileHover={{ y: -10 }}>
              <h4>Real-Time Face and Behaviour Analysis System</h4>
              <p className="project-status">(In Progress)</p>
              <p>This project integrates computer vision and deep learning to analyze facial expressions and behavioral patterns from a real-time video feed, with applications in retail, HR, and surveillance.</p>
              <p><strong>Tech Stack:</strong> Python, OpenCV, TensorFlow</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInSlideUp}
        >
          <div className="container">
            <h3>View My Full List of Credentials</h3>
            <p>I have completed over 20 job simulations and certification courses. You can view them all on my dedicated certifications page.</p>
            <a href="https://raghavj12345.github.io/Certifications/" className="btn" target="_blank" rel="noopener noreferrer">View All Certifications</a>
          </div>
        </motion.section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Raghav Joshi. Built with React & Framer Motion.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
