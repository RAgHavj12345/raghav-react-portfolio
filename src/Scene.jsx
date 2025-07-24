import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MathUtils, Vector3 } from 'three';

// This component creates the field of moving shapes in the background
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
            const rotation = new Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
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

// This component defines a single drifting shape
function DriftingShape({ isSphere, position, rotation, scale, speed }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Add drifting motion
            meshRef.current.position.y += delta * speed;
            meshRef.current.rotation.x += delta * speed * 0.5;
            meshRef.current.rotation.y += delta * speed * 0.5;

            // Reset position when it goes off-screen to create a loop
            if (meshRef.current.position.y > 15) {
                meshRef.current.position.y = -15;
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={[rotation.x, rotation.y, rotation.z]} scale={scale}>
            {isSphere ? <sphereGeometry args={[1, 16, 16]} /> : <boxGeometry args={[1, 1, 1]} />}
            {/* Use a solid material that can be lit */}
            <meshStandardMaterial color="#cccccc" roughness={0.8} />
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
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.2} />
      </TorusKnot>
      
      {/* Orbiting Shape */}
      <mesh ref={orbitingShapeRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>
    </motion.group>
  );
}

// This is the main Scene component that you'll import into App.jsx
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <color attach="background" args={['#ffffff']} />
      {/* Add lights to illuminate the solid shapes */}
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={100} />
      
      <BackgroundShapes />
      <MainShapes />
    </Canvas>
  );
}
