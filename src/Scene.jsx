import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MathUtils } from 'three';

// This component defines the rotating 3D shape
function Shape() {
  const meshRef = useRef();

  // This hook runs on every frame, creating the animation
  useFrame((state, delta) => {
    const { mouse } = state;
    
    // Slowly rotate the shape on its own
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.1;

      // Make the rotation subtly follow the mouse
      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;
      
      // Smoothly interpolate to the target rotation
      meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
      meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    }

    // Make the camera subtly pan with the mouse for a parallax effect
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.x * 2, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, -mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <motion.group>
      {/* Replaced Icosahedron with a more complex TorusKnot */}
      <TorusKnot ref={meshRef} args={[1, 0.3, 100, 16]}>
        {/* The material defines the appearance */}
        <meshBasicMaterial color="#111111" wireframe />
      </TorusKnot>
    </motion.group>
  );
}

// This is the main Scene component that you'll import into App.jsx
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <Shape />
    </Canvas>
  );
}
