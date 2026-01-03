import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { SUN_COLOR, SUN_SIZE } from '../constants';

export const Sun: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Light Source */}
      <pointLight position={[0, 0, 0]} intensity={2.5} distance={300} decay={1} color="#fff" />
      <ambientLight intensity={0.2} />

      {/* Sun Mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN_SIZE, 32, 32]} />
        <meshStandardMaterial 
          color={SUN_COLOR} 
          emissive={SUN_COLOR} 
          emissiveIntensity={2} 
          toneMapped={false}
        />
      </mesh>
      
      {/* Glow effect simulation using a larger inverted sphere or simply point light helper visual */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[SUN_SIZE, 32, 32]} />
        <meshBasicMaterial color={SUN_COLOR} transparent opacity={0.1} side={2} />
      </mesh>
    </group>
  );
};