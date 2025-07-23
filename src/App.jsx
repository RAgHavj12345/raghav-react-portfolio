import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Data for our draggable items
const items = [
  {
    type: 'text',
    id: 'name',
    content: 'Raghav Joshi',
    className: 'text-block title',
    initialPos: { top: '15%', left: '10%' }
  },
  {
    type: 'text',
    id: 'subtitle',
    content: 'Aspiring AI & Machine Learning Engineer',
    className: 'text-block subtitle',
    initialPos: { top: '25%', left: '12%' }
  },
  {
    type: 'image',
    id: 'img1',
    src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
    alt: 'Code on a screen',
    className: 'image-block medium',
    initialPos: { top: '40%', left: '5%' }
  },
  {
    type: 'image',
    id: 'img2',
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
    alt: 'Abstract technology background',
    className: 'image-block large',
    initialPos: { top: '10%', left: '60%' }
  },
  {
    type: 'image',
    id: 'img3',
    src: 'https://images.unsplash.com/photo-1620712943543-2858200f745a?q=80&w=2069&auto=format&fit=crop',
    alt: 'Abstract AI art',
    className: 'image-block small',
    initialPos: { top: '65%', left: '75%' }
  },
  {
    type: 'text',
    id: 'links',
    content: (
      <>
        <a href="https://raghavj12345.github.io/Certifications/" target="_blank" rel="noopener noreferrer">Certifications</a>
        <a href="https://www.linkedin.com/in/raghav-joshi-687a02373" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:raghavj12321@gmail.com">Contact</a>
      </>
    ),
    className: 'text-block links',
    initialPos: { bottom: '5%', right: '5%' }
  }
];

const App = () => {
  const constraintsRef = useRef(null);

  return (
    <motion.div className="app-container" ref={constraintsRef}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={item.className}
          style={{ 
            top: item.initialPos.top, 
            left: item.initialPos.left,
            bottom: item.initialPos.bottom,
            right: item.initialPos.right
          }}
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
          whileTap={{ scale: 0.95, zIndex: 10 }}
          whileHover={{ zIndex: 10 }}
        >
          {item.type === 'text' ? (
            item.content
          ) : (
            <img src={item.src} alt={item.alt} draggable="false" />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default App;
