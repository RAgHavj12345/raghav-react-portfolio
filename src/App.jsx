import React from 'react';
import './App.css';
import GlareHover from './GlareHover';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">YourLogo</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-socials">
            <a href="https://github.com/raghavj12345" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
          >
            <h1 className="hero-title">Hover Me</h1>
          </GlareHover>
          <p className="subtitle">I'm a frontend developer who builds delightful user experiences.</p>
          <a className="btn" href="#projects">See Projects</a>
        </div>
      </header>

      <main>
        <section className="content-section" id="about">
          <h2>About Me</h2>
          <p>This is the about section. Add more details here.</p>
        </section>

        <section className="content-section" id="projects">
          <h2>Projects</h2>
          <div className="project-card">
            <h3>Project Name</h3>
            <p className="project-status">In Progress</p>
            <p className="tech-stack">React, CSS, JavaScript</p>
          </div>
        </section>

        <section className="content-section" id="contact">
          <h2>Contact</h2>
          <p>Feel free to reach out via GitHub or LinkedIn.</p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 Raghav Joshi. All rights reserved.</p>

        {/* Mobile Social Links */}
        <ul className="mobile-socials">
          <li>
            <a
              href="https://github.com/raghavj12345"
              className="mobile-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/raghav-joshi-687a02373"
              className="mobile-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
