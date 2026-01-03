import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { PLANETS } from '../constants';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { SimulationState } from '../types';

interface SolarSystemProps {
  simulationState: SimulationState;
  selectedPlanet: string | null;
  onSelectPlanet: (name: string) => void;
}

export const SolarSystem: React.FC<SolarSystemProps> = ({ 
  simulationState, 
  selectedPlanet, 
  onSelectPlanet 
}) => {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 60, 90], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          maxDistance={250}
          minDistance={10}
        />

        <Sun />

        {PLANETS.map((planet) => (
          <Planet 
            key={planet.name}
            data={planet}
            simulationSpeed={simulationState.speed}
            isPaused={simulationState.isPaused}
            showOrbits={simulationState.showOrbits}
            isSelected={selectedPlanet === planet.name}
            onSelect={onSelectPlanet}
          />
        ))}

        {/* Add grid helper for orientation */}
        <gridHelper args={[300, 30, 0x222222, 0x111111]} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
};