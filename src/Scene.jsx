import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MathUtils } from 'three';

// This component defines the rotating 3D shape
function Shape() {
  const mainShapeRef = useRef();
  const orbitingShapeRef = useRef();

  // This hook runs on every frame, creating the animation
  useFrame((state, delta) => {
    const { mouse } = state;
    
    // Animate the main shape
    if (mainShapeRef.current) {
      // Self-rotation
      mainShapeRef.current.rotation.x += delta * 0.1;
      mainShapeRef.current.rotation.y += delta * 0.1;

      // Mouse-follow rotation
      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;
      mainShapeRef.current.rotation.x = MathUtils.lerp(mainShapeRef.current.rotation.x, targetRotationX, 0.05);
      mainShapeRef.current.rotation.y = MathUtils.lerp(mainShapeRef.current.rotation.y, targetRotationY, 0.05);
    }
    
    // Animate the orbiting shape
    if (orbitingShapeRef.current) {
        orbitingShapeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2.5;
        orbitingShapeRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2.5;
        orbitingShapeRef.current.rotation.y += delta * 0.5;
    }

    // Camera parallax effect
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.x * 2, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, -mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <motion.group>
      {/* Main Shape */}
      <TorusKnot ref={mainShapeRef} args={[1, 0.3, 128, 16]}>
        <meshBasicMaterial color="#111111" wireframe />
      </TorusKnot>
      
      {/* Orbiting Shape */}
      <mesh ref={orbitingShapeRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#555555" wireframe />
      </mesh>
    </motion.group>
  );
}

// This is the main Scene component that you'll import into App.jsx
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <color attach="background" args={['#ffffff']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Shape />
    </Canvas>
  );
}
