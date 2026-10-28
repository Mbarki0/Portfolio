import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, MeshTransmissionMaterial, RoundedBox, Sparkles, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const nodes = [
  [-3.9, 1.9, -0.8],
  [-3.2, -1.7, 0.2],
  [3.7, 2.2, -1],
  [4.1, -1.35, 0.1],
  [0.4, 3.15, -1.5],
]

function NetworkNode({ position, color = '#22d3ee' }) {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.65}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.8} roughness={0.2} />
      </mesh>
      <mesh position={position} scale={1.9}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </Float>
  )
}

function Workstation() {
  const group = useRef()
  const core = useRef()
  const logo = useTexture(`${import.meta.env.BASE_URL}assets/logo.png`)
  logo.colorSpace = THREE.SRGBColorSpace

  useFrame((state, delta) => {
    if (!group.current || !core.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.16 - 0.2, 0.035)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.08 + 0.04, 0.035)
    core.current.rotation.y += delta * 0.32
    core.current.rotation.x += delta * 0.16
  })

  return (
    <group ref={group} position={[0.45, -0.25, 0]}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <group position={[0.2, 0.45, 0]} rotation={[0.03, -0.15, 0]}>
          <RoundedBox args={[4.7, 2.75, 0.22]} radius={0.16} smoothness={4}>
            <meshStandardMaterial color="#0b1026" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          <mesh position={[0, 0, 0.13]}>
            <planeGeometry args={[4.28, 2.34]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.145]}>
            <planeGeometry args={[3.55, 1.65]} />
            <meshBasicMaterial map={logo} transparent alphaTest={0.01} toneMapped={false} />
          </mesh>
          <mesh position={[0, -1.75, -0.1]}>
            <boxGeometry args={[0.18, 0.9, 0.18]} />
            <meshStandardMaterial color="#11182f" metalness={0.8} />
          </mesh>
          <mesh position={[0, -2.22, 0]}>
            <boxGeometry args={[2.1, 0.1, 0.8]} />
            <meshStandardMaterial color="#11182f" metalness={0.8} />
          </mesh>
        </group>
      </Float>

      <group position={[0, -2.62, 0]}>
        <RoundedBox args={[7.6, 0.22, 4.5]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#080d20" metalness={0.7} roughness={0.22} />
        </RoundedBox>
        <gridHelper args={[7.2, 14, '#7c3aed', '#16213f']} position={[0, 0.13, 0]} />
      </group>

      <Float speed={1.8} floatIntensity={0.7} rotationIntensity={0.25}>
        <group ref={core} position={[3.25, -1.15, 0.15]}>
          <mesh>
            <octahedronGeometry args={[0.72, 0]} />
            <MeshTransmissionMaterial color="#22d3ee" thickness={1} transmission={1} roughness={0.05} chromaticAberration={0.08} />
          </mesh>
          <mesh scale={0.52}>
            <octahedronGeometry args={[0.72, 0]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={3} />
          </mesh>
        </group>
      </Float>

      {nodes.map((position, index) => (
        <NetworkNode key={index} position={position} color={index % 2 ? '#a855f7' : '#22d3ee'} />
      ))}
      {nodes.map((position, index) => (
        <Line key={`line-${index}`} points={[position, [3.25, -1.15, 0.15]]} color={index % 2 ? '#a855f7' : '#22d3ee'} lineWidth={0.7} transparent opacity={0.48} />
      ))}
    </group>
  )
}

export default function SystemScene() {
  return (
    <Canvas camera={{ position: [0, 0.2, 10.5], fov: 43 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 5, 5]} color="#22d3ee" intensity={45} />
      <pointLight position={[-5, 1, 4]} color="#a855f7" intensity={35} />
      <spotLight position={[0, 7, 2]} angle={0.45} penumbra={1} intensity={60} color="#ffffff" />
      <Suspense fallback={null}>
        <Workstation />
      </Suspense>
      <Stars radius={45} depth={20} count={900} factor={2.2} saturation={0.8} fade speed={0.35} />
      <Sparkles count={45} scale={[10, 6, 4]} size={1.7} speed={0.35} color="#67e8f9" />
      <fog attach="fog" args={['#050816', 11, 23]} />
    </Canvas>
  )
}
