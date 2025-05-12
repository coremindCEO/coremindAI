import React from 'react';
import { useNeuroshard } from '../context/NeuroshardContext';
import { BrainCog, Star, Share2, TrendingUp } from 'lucide-react';
import RadarChart from './charts/RadarChart';

const InfoPanel: React.FC = () => {
  const { neuroshard } = useNeuroshard();

  return (
    <div className="bg-slate-900/50 rounded-xl border border-indigo-900/50 p-4 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Neuroshard Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            {neuroshard.name}
          </h2>
          <p className="text-indigo-300 mt-1 italic">{neuroshard.tagline}</p>
          
          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 text-sm font-medium">
            Level {neuroshard.level} — {neuroshard.levelTitle}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center text-indigo-300 mb-1">
                <BrainCog size={16} className="mr-2" />
                <span className="text-sm font-medium">Training Sessions</span>
              </div>
              <p className="text-xl font-bold text-white">{neuroshard.stats.trainingSessions}</p>
            </div>
            
            <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center text-indigo-300 mb-1">
                <TrendingUp size={16} className="mr-2" />
                <span className="text-sm font-medium">$CORE Earned</span>
              </div>
              <p className="text-xl font-bold text-white">{neuroshard.stats.coreEarned}</p>
            </div>
            
            <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center text-indigo-300 mb-1">
                <Share2 size={16} className="mr-2" />
                <span className="text-sm font-medium">Projects Shared</span>
              </div>
              <p className="text-xl font-bold text-white">{neuroshard.stats.projectsShared}</p>
            </div>
            
            <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center text-indigo-300 mb-1">
                <Star size={16} className="mr-2" />
                <span className="text-sm font-medium">Reputation</span>
              </div>
              <p className="text-xl font-bold text-white">
                {neuroshard.stats.reputation.toFixed(1)} <span className="text-sm text-indigo-300 font-normal">/ 5</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Personality Radar Chart */}
        <div className="flex-1 md:border-l border-indigo-900/50 md:pl-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-indigo-300 mb-4 text-center">Personality Traits</h3>
          <div className="w-full max-w-[240px] mx-auto">
            <RadarChart traits={neuroshard.personalityTraits} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;