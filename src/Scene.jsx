import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MathUtils, Vector3 } from 'three';

// This component creates the field of small, floating shapes in the background
function BackgroundShapes() {
    const shapes = useMemo(() => {
        const shapeArray = [];
        // Increase the number of shapes for a denser field
        for (let i = 0; i < 80; i++) {
            const isSphere = Math.random() > 0.5;
            const position = new Vector3(
                // Bring them closer to the center
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            // Ensure no shapes are too close to the main object
            if (position.length() < 8) {
                position.normalize().multiplyScalar(8 + Math.random() * 8);
            }

            const rotation = new Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            // Make them significantly larger and more visible
            const scale = Math.random() * 0.4 + 0.2;
            const speed = Math.random() * 0.1 + 0.05;
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

// This component defines a single drifting shape
function DriftingShape({ isSphere, position, rotation, scale, speed }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * speed * 0.2;
            meshRef.current.rotation.y += delta * speed * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={[rotation.x, rotation.y, rotation.z]} scale={scale}>
            {isSphere ? <sphereGeometry args={[1, 16, 16]} /> : <boxGeometry args={[1, 1, 1]} />}
            {/* Make the color black for maximum contrast */}
            <meshBasicMaterial color="#000000" wireframe />
        </mesh>
    );
}


// This component defines the main interactive shapes
function MainShapes() {
  const mainShapeRef = useRef();
  const orbitingShapeRef = useRef();

  useFrame((state, delta) => {
    const { mouse } = state;
    
    // Animate the main shape
    if (mainShapeRef.current) {
      mainShapeRef.current.rotation.x += delta * 0.1;
      mainShapeRef.current.rotation.y += delta * 0.1;

      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;
      mainShapeRef.current.rotation.x = MathUtils.lerp(mainShapeRef.current.rotation.x, targetRotationX, 0.05);
      mainShapeRef.current.rotation.y = MathUtils.lerp(mainShapeRef.current.rotation.y, targetRotationY, 0.05);
    }
    
    // Animate the orbiting shape
    if (orbitingShapeRef.current) {
        orbitingShapeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
        orbitingShapeRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
        orbitingShapeRef.current.rotation.y += delta * 0.5;
    }

    // Camera parallax effect
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.x * 1.5, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, -mouse.y * 1.5, 0.05);
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
        <meshBasicMaterial color="#333333" wireframe />
      </mesh>
    </motion.group>
  );
}

// This is the main Scene component that you'll import into App.jsx
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <color attach="background" args={['#ffffff']} />
      {/* Stars are temporarily removed to ensure shapes are visible */}
      {/* <Stars radius={150} depth={50} count={5000} factor={5} saturation={0} fade speed={1} /> */}
      <BackgroundShapes />
      <MainShapes />
    </Canvas>
  );
}
