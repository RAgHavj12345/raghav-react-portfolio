// src/Scene.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MathUtils, Vector3, Color } from 'three';

// Utility: Bright random colors
function getRandomBrightColor() {
  const hue = Math.floor(Math.random() * 360);
  return new Color(`hsl(${hue}, 100%, 70%)`);
}

function DriftingShape({ isSphere, position, rotation, scale, speed }) {
  const meshRef = useRef();
  const color = useMemo(() => getRandomBrightColor(), []);

  useFrame((_, delta) => {
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
    <mesh ref={meshRef} position={position} rotation={[rotation.x, rotation.y, rotation.z]} scale={scale}>
      {isSphere ? <sphereGeometry args={[1, 16, 16]} /> : <boxGeometry args={[1, 1, 1]} />}
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function BackgroundShapes() {
  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      const isSphere = Math.random() > 0.5;
      const pos = new Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
      if (pos.length() < 8) pos.normalize().multiplyScalar(8 + Math.random() * 8);
      arr.push({
        id: i,
        isSphere,
        position: pos,
        rotation: new Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        scale: Math.random() * 0.3 + 0.2,
        speed: Math.random() * 0.2 + 0.1,
      });
    }
    return arr;
  }, []);

  return <group>{shapes.map(shape => <DriftingShape key={shape.id} {...shape} />)}</group>;
}

function MainShapes() {
  const mainRef = useRef();
  const orbitRef = useRef();

  useFrame((state, delta) => {
    const { mouse } = state;

    if (mainRef.current) {
      mainRef.current.rotation.x = MathUtils.lerp(mainRef.current.rotation.x, mouse.y * 0.5, 0.05);
      mainRef.current.rotation.y = MathUtils.lerp(mainRef.current.rotation.y, mouse.x * 0.5, 0.05);
    }

    if (orbitRef.current) {
      orbitRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      orbitRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
      orbitRef.current.rotation.y += delta * 0.5;
    }

    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.x * 1.5, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, -mouse.y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <motion.group>
      <TorusKnot ref={mainRef} args={[1, 0.3, 128, 16]}>
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.5} />
      </TorusKnot>
      <mesh ref={orbitRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </motion.group>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      <BackgroundShapes />
      <MainShapes />
    </Canvas>
  );
}
