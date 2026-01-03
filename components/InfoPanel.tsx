import React, { useEffect, useState } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PlanetData, PlanetInfoState } from '../types';
import { getPlanetDetails } from '../services/geminiService';

interface InfoPanelProps {
  planet: PlanetData | undefined;
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onClose }) => {
  const [aiInfo, setAiInfo] = useState<PlanetInfoState>({
    loading: false,
    content: null,
    error: null,
  });

  useEffect(() => {
    if (planet) {
      setAiInfo({ loading: true, content: null, error: null });
      
      const fetchData = async () => {
        try {
          const text = await getPlanetDetails(planet.name);
          setAiInfo({ loading: false, content: text, error: null });
        } catch (e) {
          setAiInfo({ loading: false, content: null, error: "Failed to load AI data." });
        }
      };
      
      fetchData();
    }
  }, [planet]);

  if (!planet) return null;

  return (
    <div className="absolute top-4 right-4 w-96 max-h-[calc(100vh-2rem)] flex flex-col bg-black/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl z-20 transition-all animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full shadow-[0_0_10px_currentColor]" 
            style={{ backgroundColor: planet.color, color: planet.color }} 
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white tracking-wide">{planet.nameCN}</h2>
            <span className="text-xs text-white/50 tracking-wider uppercase">{planet.name}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        
        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <span className="block text-gray-400 text-xs uppercase mb-1">Distance (AU)</span>
            <span className="text-white font-mono text-lg">{(planet.distance / 22).toFixed(2)}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <span className="block text-gray-400 text-xs uppercase mb-1">Orbital Speed</span>
            <span className="text-white font-mono text-lg">{planet.speed.toFixed(2)}x</span>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 col-span-2">
             <span className="block text-gray-400 text-xs uppercase mb-1">Summary</span>
             <p className="text-gray-200 leading-relaxed">{planet.description}</p>
          </div>
        </div>

        {/* AI Content Section */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-3 text-purple-300">
            <Sparkles size={16} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">AI Insights (Gemini)</h3>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-4 border border-white/10 min-h-[150px]">
            {aiInfo.loading ? (
              <div className="flex flex-col items-center justify-center h-40 space-y-3 text-purple-200/50">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-xs">Consulting the archives...</span>
              </div>
            ) : aiInfo.error ? (
              <div className="text-red-400 text-sm p-2">{aiInfo.error}</div>
            ) : (
              <div className="prose prose-invert prose-sm prose-p:text-gray-300 prose-headings:text-purple-100 prose-strong:text-white">
                <ReactMarkdown>{aiInfo.content || ''}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};