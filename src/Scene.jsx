import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Icosahedron, Box } from '@react-three/drei';
import { MathUtils } from 'three';

// This component creates a single floating shape
function FloatingShape({ geometry, position, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed.x;
      meshRef.current.rotation.y += delta * rotationSpeed.y;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial color="#555555" roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

// This component creates the entire field of shapes
function BackgroundShapes() {
  const shapes = useMemo(() => {
    const shapeArray = [];
    const geometries = [
      <Torus args={[1, 0.2, 16, 100]} />,
      <Icosahedron args={[1, 0]} />,
      <Box args={[1, 1, 1]} />,
    ];

    for (let i = 0; i < 50; i++) {
      shapeArray.push({
        id: i,
        geometry: geometries[i % 3],
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
        ],
        rotationSpeed: {
          x: Math.random() * 0.1,
          y: Math.random() * 0.1,
        },
      });
    }
    return shapeArray;
  }, []);

  return (
    <group>
      {shapes.map(shape => (
        <FloatingShape key={shape.id} {...shape} />
      ))}
    </group>
  );
}

// This is the main Scene component
export default function Scene() {
  const cameraRef = useRef();

  useFrame((state) => {
    const { mouse } = state;
    if (cameraRef.current) {
      // Camera parallax effect
      cameraRef.current.position.x = MathUtils.lerp(cameraRef.current.position.x, mouse.x * 1.5, 0.05);
      cameraRef.current.position.y = MathUtils.lerp(cameraRef.current.position.y, -mouse.y * 1.5, 0.05);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50, ref: cameraRef }}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      <BackgroundShapes />
    </Canvas>
  );
}
