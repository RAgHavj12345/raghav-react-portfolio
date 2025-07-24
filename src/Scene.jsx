import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MathUtils, Vector3, Color } from 'three';

// Utility: Random bright color generator
function getRandomBrightColor() {
  const hue = Math.floor(Math.random() * 360);
  return new Color(`hsl(${hue}, 100%, 70%)`);
}

// Single drifting shape
function DriftingShape({ isSphere, position, rotation, scale, speed }) {
  const meshRef = useRef();
  const color = useMemo(() => getRandomBrightColor(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y += delta * speed;
      meshRef.current.rotation.x += delta * speed * 0.5;
      meshRef.current.rotation.y += delta * speed * 0.5;

      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={scale}
    >
      {isSphere ? <sphereGeometry args={[1, 16, 16]} /> : <boxGeometry args={[1, 1, 1]} />}
      {/* Always visible, no lighting needed */}
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Field of background shapes
function BackgroundShapes() {
  const shapes = useMemo(() => {
    const shapeArray = [];
    for (let i = 0; i < 80; i++) {
      const isSphere = Math.random() > 0.5;
      const position = new Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      if (position.length() < 8) {
        position.normalize().multiplyScalar(8 + Math.random() * 8);
      }
      const rotation = new Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = Math.random() * 0.3 + 0.2;
      const speed = Math.random() * 0.2 + 0.1;
      shapeArray.push({ id: i, isSphere, position, rotation, scale, speed });
    }
    return shapeArray;
  }, []);

  return (
    <group>
      {shapes.map(shape => (
        <DriftingShape key={shape.id} {...shape} />
      ))}
    </group>
  );
}

// Main interactive shapes
function MainShapes() {
  const mainShapeRef = useRef();
  const orbitingShapeRef = useRef();

  useFrame((state, delta) => {
    const { mouse } = state;

    // Animate main shape
    if (mainShapeRef.current) {
      mainShapeRef.current.rotation.x += delta * 0.1;
      mainShapeRef.current.rotation.y += delta * 0.1;

      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;
      mainShapeRef.current.rotation.x = MathUtils.lerp(
        mainShapeRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      mainShapeRef.current.rotation.y = MathUtils.lerp(
        mainShapeRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    }

    // Orbiting shape motion
    if (orbitingShapeRef.current) {
      orbitingShapeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      orbitingShapeRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
      orbitingShapeRef.current.rotation.y += delta * 0.5;
    }

    // Parallax camera
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.x * 1.5, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, -mouse.y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <motion.group>
      {/* Main central shape */}
      <TorusKnot ref={mainShapeRef} args={[1, 0.3, 128, 16]}>
        <meshStandardMaterial
          color="#0077ff"
          roughness={0.1}
          metalness={0.5}
          emissive="#0077ff"
          emissiveIntensity={0.3}
        />
      </TorusKnot>

      {/* Orbiting small shape */}
      <mesh ref={orbitingShapeRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ff0077"
          roughness={0.4}
          emissive="#ff0077"
          emissiveIntensity={0.4}
        />
      </mesh>
    </motion.group>
  );
}

// Final scene export
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      {/* White background */}
      <color attach="background" args={['#ffffff']} />

      {/* Lights (for main shapes) */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />

      <BackgroundShapes />
      <MainShapes />
    </Canvas>
  );
}
