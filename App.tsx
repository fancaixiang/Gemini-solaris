import React, { useState } from 'react';
import { SolarSystem } from './components/SolarSystem';
import { InfoPanel } from './components/InfoPanel';
import { ControlPanel } from './components/ControlPanel';
import { PLANETS } from './constants';
import { SimulationState } from './types';
import { Sparkles, Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPlanetName, setSelectedPlanetName] = useState<string | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    speed: 1,
    isPaused: false,
    showOrbits: true,
  });

  const selectedPlanet = PLANETS.find(p => p.name === selectedPlanetName);

  const handleUpdateState = (updates: Partial<SimulationState>) => {
    setSimulationState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden font-sans">
      
      {/* Background Title / Branding */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tighter">
          SOLARIS
        </h1>
        <p className="text-white/40 text-sm flex items-center gap-2 mt-1">
          <Sparkles size={12} /> Interactive 3D Model
        </p>
      </div>

      {/* Main 3D Scene */}
      <SolarSystem 
        simulationState={simulationState}
        selectedPlanet={selectedPlanetName}
        onSelectPlanet={setSelectedPlanetName}
      />

      {/* Side Information Panel */}
      <InfoPanel 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanetName(null)} 
      />

      {/* Bottom Controls */}
      <ControlPanel 
        state={simulationState} 
        onUpdate={handleUpdateState} 
      />

      {/* Planet Selector Quick Nav (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
        <div className="bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-white/10">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 px-1">Quick Select</p>
          <div className="grid grid-cols-4 gap-2">
            {PLANETS.map(p => (
              <button
                key={p.name}
                onClick={() => setSelectedPlanetName(p.name)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
                  selectedPlanetName === p.name 
                    ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]' 
                    : 'border-transparent hover:border-white/30 hover:bg-white/10'
                }`}
                title={p.name}
              >
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: p.color }}
                />
              </button>
            ))}
            <button
               onClick={() => setSelectedPlanetName(null)}
               className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white border border-transparent hover:border-white/30"
               title="Clear Selection"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default App;