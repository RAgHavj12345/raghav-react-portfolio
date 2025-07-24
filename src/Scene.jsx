import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

// This component defines the rotating 3D shape
function Shape() {
  const meshRef = useRef();

  // This hook runs on every frame, creating the animation
  useFrame((state, delta) => {
    // Slowly rotate the shape
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <motion.group>
      <Icosahedron ref={meshRef} args={[1.5, 0]}>
        {/* The material defines the appearance */}
        <meshBasicMaterial color="#111111" wireframe />
      </Icosahedron>
    </motion.group>
  );
}

// This is the main Scene component that you'll import into App.jsx
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      {/* Add some lighting to the scene */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Shape />
    </Canvas>
  );
}
