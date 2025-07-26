/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef, useState, useEffect, memo } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import { easing } from 'maath'

const Lens = memo(function Lens({ children, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/assets/3d/lens.glb')
  const buffer = useFBO()
  const { viewport } = useThree()
  const [scene] = useState(() => new THREE.Scene())

  useFrame((state, delta) => {
    const { gl, pointer, camera } = state
    const v = viewport.getCurrentViewport(camera, [0, 0, 15])
    easing.damp3(ref.current.position, [(pointer.x * v.width) / 2, (pointer.y * v.height) / 2, 15], 0.15, delta)
    
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
})

export default function FluidGlassScene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <Lens />
    </Canvas>
  )
}
