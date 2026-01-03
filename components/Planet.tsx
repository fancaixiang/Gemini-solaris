import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, EllipseCurve, BufferGeometry, AdditiveBlending } from 'three';
import { Html } from '@react-three/drei';
import { PlanetData } from '../types';

interface PlanetProps {
  data: PlanetData;
  simulationSpeed: number;
  isPaused: boolean;
  showOrbits: boolean;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

export const Planet: React.FC<PlanetProps> = ({ 
  data, 
  simulationSpeed, 
  isPaused, 
  showOrbits,
  isSelected,
  onSelect
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Random start angle so planets aren't all aligned
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const angleRef = useRef(initialAngle);

  // Orbit Path Geometry
  const orbitGeometry = useMemo(() => {
    const curve = new EllipseCurve(
      0, 0,            // ax, aY
      data.distance, data.distance, // xRadius, yRadius
      0, 2 * Math.PI,  // aStartAngle, aEndAngle
      false,           // aClockwise
      0                // aRotation
    );
    const points = curve.getPoints(100);
    const geometry = new BufferGeometry().setFromPoints(points);
    // Rotate to lie flat on XZ plane
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }, [data.distance]);

  useFrame((state, delta) => {
    if (!isPaused && meshRef.current) {
      // Update angle
      angleRef.current += (data.speed * delta * simulationSpeed * 0.1); // 0.1 factor to calm it down
      
      const x = Math.cos(angleRef.current) * data.distance;
      const z = Math.sin(angleRef.current) * data.distance;
      
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += delta; // Self rotation
    }
  });

  return (
    <group>
      {/* Orbit Line */}
      {showOrbits && (
        <line geometry={orbitGeometry}>
          <lineBasicMaterial attach="material" color="#444" opacity={0.3} transparent />
        </line>
      )}

      {/* Planet Group - Moves along orbit */}
      <group 
        ref={meshRef}
        position={[Math.cos(initialAngle) * data.distance, 0, Math.sin(initialAngle) * data.distance]}
      >
        {/* Actual Planet Sphere */}
        <mesh 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data.name);
          }}
          onPointerOver={(e) => { 
            e.stopPropagation();
            document.body.style.cursor = 'pointer'; 
            setHovered(true);
          }}
          onPointerOut={() => { 
            document.body.style.cursor = 'auto'; 
            setHovered(false);
          }}
        >
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial 
            color={data.color} 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>

        {/* Atmosphere/Glow Effect */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshBasicMaterial 
            color={data.color} 
            transparent 
            opacity={0.15} 
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Selection Indicator */}
        {isSelected && (
          <mesh scale={[1.3, 1.3, 1.3]}>
            <sphereGeometry args={[data.size, 32, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} wireframe />
          </mesh>
        )}

        {/* Planet Label (Visible when hovered or selected) */}
        <Html distanceFactor={15} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          <div 
            className={`flex flex-col items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 transition-opacity duration-300 transform -translate-y-full mt-[-10px] ${isSelected || hovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-white font-bold text-sm leading-none">{data.nameCN}</span>
            <span className="text-white/60 text-[10px] font-mono leading-none mt-1">{data.name}</span>
          </div>
        </Html>

        {/* Saturn's Rings */}
        {data.ring && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.ring.innerRadius, data.ring.outerRadius, 64]} />
            <meshStandardMaterial color={data.ring.color} side={2} transparent opacity={0.8} />
          </mesh>
        )}
      </group>
    </group>
  );
};