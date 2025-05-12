import React from 'react';
import { useNeuroshard } from '../context/NeuroshardContext';
import { BrainCircuit, Lightbulb, Share2, DollarSign } from 'lucide-react';

const SuggestedActions: React.FC = () => {
  const { suggestedActions } = useNeuroshard();
  
  // Helper function to get action icon
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'training':
        return <BrainCircuit size={18} className="text-blue-400" />;
      case 'sharing':
        return <Share2 size={18} className="text-purple-400" />;
      case 'earning':
        return <DollarSign size={18} className="text-amber-400" />;
      default:
        return <Lightbulb size={18} className="text-indigo-400" />;
    }
  };
  
  // Helper function to get action button style
  const getActionButtonStyle = (type: string) => {
    switch (type) {
      case 'training':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'sharing':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'earning':
        return 'bg-amber-600 hover:bg-amber-700 text-white';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    }
  };
  
  // Helper function to get action card style
  const getActionCardStyle = (type: string) => {
    switch (type) {
      case 'training':
        return 'border-blue-600/30 bg-gradient-to-br from-slate-900 to-blue-950/30';
      case 'sharing':
        return 'border-purple-600/30 bg-gradient-to-br from-slate-900 to-purple-950/30';
      case 'earning':
        return 'border-amber-600/30 bg-gradient-to-br from-slate-900 to-amber-950/30';
      default:
        return 'border-indigo-600/30 bg-gradient-to-br from-slate-900 to-indigo-950/30';
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-indigo-900/50 p-4 shadow-lg h-full">
      <h2 className="text-lg font-semibold text-indigo-300 mb-4">Suggested Actions</h2>
      
      <div className="space-y-4">
        {suggestedActions.map((action) => (
          <div 
            key={action.id} 
            className={`border rounded-lg p-4 ${getActionCardStyle(action.type)} transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
          >
            <div className="flex items-start mb-3">
              <div className="p-2 rounded-full bg-slate-800/80 mr-3">
                {getActionIcon(action.type)}
              </div>
              
              <div>
                <h3 className="text-white font-medium">{action.title}</h3>
              </div>
            </div>
            
            <p className="text-indigo-300/80 text-sm mb-4">{action.description}</p>
            
            <button className={`px-3 py-1.5 rounded-md text-sm font-medium ${getActionButtonStyle(action.type)}`}>
              {action.actionText}
            </button>
          </div>
        ))}
        
        <div className="border border-indigo-600/20 rounded-lg p-4 bg-indigo-900/10 text-center">
          <p className="text-indigo-300 text-sm mb-3">Seeking more insights?</p>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/30">
            Generate Suggestions
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedActions;