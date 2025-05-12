import React from 'react';
import { useNeuroshard } from '../context/NeuroshardContext';
import { BrainCircuit, Share2, DollarSign } from 'lucide-react';

const ActivityTimeline: React.FC = () => {
  const { activities } = useNeuroshard();
  
  // Helper function to format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInDays === 0) {
      return diffInHours === 0 
        ? 'Just now' 
        : `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Helper function to get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'training':
        return <BrainCircuit size={18} className="text-blue-400" />;
      case 'sharing':
        return <Share2 size={18} className="text-purple-400" />;
      case 'earning':
        return <DollarSign size={18} className="text-amber-400" />;
      default:
        return null;
    }
  };
  
  // Helper function to get activity color
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'training':
        return 'border-blue-600/30 bg-blue-900/10';
      case 'sharing':
        return 'border-purple-600/30 bg-purple-900/10';
      case 'earning':
        return 'border-amber-600/30 bg-amber-900/10';
      default:
        return 'border-indigo-600/30 bg-indigo-900/10';
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-indigo-900/50 p-4 shadow-lg h-full">
      <h2 className="text-lg font-semibold text-indigo-300 mb-4">Activity History</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`border ${getActivityColor(activity.type)} rounded-lg p-3 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
          >
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-slate-800/80 mr-3">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">{activity.title}</h3>
                {activity.details && (
                  <p className="text-indigo-300/70 text-xs mt-1">{activity.details}</p>
                )}
              </div>
              
              <div className="text-xs text-indigo-400/70 ml-2 whitespace-nowrap">
                {formatDate(activity.timestamp)}
              </div>
            </div>
            
            {/* Decorative element */}
            <div 
              className="absolute inset-y-0 left-0 w-1 opacity-70"
              style={{ 
                background: activity.type === 'training' 
                  ? 'linear-gradient(to bottom, #3B82F6, #1E40AF)' 
                  : activity.type === 'sharing'
                  ? 'linear-gradient(to bottom, #8B5CF6, #4C1D95)'
                  : 'linear-gradient(to bottom, #F59E0B, #92400E)'
              }}
            ></div>
          </div>
        ))}
        
        <button className="w-full py-2 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;