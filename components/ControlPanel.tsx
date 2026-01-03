import React from 'react';
import { Play, Pause, Eye, EyeOff, FastForward } from 'lucide-react';
import { SimulationState } from '../types';

interface ControlPanelProps {
  state: SimulationState;
  onUpdate: (updates: Partial<SimulationState>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ state, onUpdate }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 z-10 shadow-2xl">
      
      {/* Play/Pause */}
      <button 
        onClick={() => onUpdate({ isPaused: !state.isPaused })}
        className="text-white hover:text-blue-400 transition-colors focus:outline-none"
        title={state.isPaused ? "Resume" : "Pause"}
      >
        {state.isPaused ? <Play fill="currentColor" size={24} /> : <Pause fill="currentColor" size={24} />}
      </button>

      <div className="h-8 w-px bg-white/20 mx-1"></div>

      {/* Speed Slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 uppercase font-bold w-12 text-right">Speed</span>
        <input 
          type="range" 
          min="0.1" 
          max="5" 
          step="0.1" 
          value={state.speed}
          onChange={(e) => onUpdate({ speed: parseFloat(e.target.value) })}
          className="w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
        />
        <span className="text-xs font-mono w-8 text-blue-300">{state.speed.toFixed(1)}x</span>
      </div>

      <div className="h-8 w-px bg-white/20 mx-1"></div>

      {/* Toggle Orbits */}
      <button 
        onClick={() => onUpdate({ showOrbits: !state.showOrbits })}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${state.showOrbits ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        {state.showOrbits ? <Eye size={18} /> : <EyeOff size={18} />}
        <span className="hidden sm:inline">Orbits</span>
      </button>

    </div>
  );
};