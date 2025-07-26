/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import { MathUtils } from 'three'

// This is the core 3D component with the animation logic
const Lens = ({ children, ...props }) => {
  const ref = useRef()
  const { nodes } = useGLTF('/assets/3d/lens.glb')
  const buffer = useFBO()
  const { viewport } = useThree()
  const [scene] = useState(() => new THREE.Scene())

  // This hook runs on every frame and creates the animation
  useFrame((state, delta) => {
    const { gl, pointer, camera } = state
    
    // This is the corrected animation logic
    if (ref.current) {
      // Calculate the target position based on the mouse pointer
      const targetX = (pointer.x * viewport.width) / 2
      const targetY = (pointer.y * viewport.height) / 2
      
      // Smoothly move the lens towards the target position
      ref.current.position.x = MathUtils.lerp(ref.current.position.x, targetX, 0.1)
      ref.current.position.y = MathUtils.lerp(ref.current.position.y, targetY, 0.1)
    }

    // This part renders the background scene through the lens
    gl.setRenderTarget(buffer)
    gl.setClearColor('#d8d7d7') // A light grey background for the scene
    gl.render(scene, camera)
    gl.setRenderTarget(null)
  })

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={0.25} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.15}
          thickness={5}
          anisotropy={0.01}
          chromaticAberration={0.1}
        />
      </mesh>
    </>
  )
}

// This is the main component you import into App.jsx
export default function FluidGlassScene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <Lens />
    </Canvas>
  )
}
