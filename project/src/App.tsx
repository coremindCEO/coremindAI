import React from 'react';
import NeuroshardViz from './components/NeuroshardViz';
import InfoPanel from './components/InfoPanel';
import ActionButtons from './components/ActionButtons';
import ActivityTimeline from './components/ActivityTimeline';
import SuggestedActions from './components/SuggestedActions';
import MiniChat from './components/MiniChat';
import { NeuroshardProvider } from './context/NeuroshardContext';

function App() {
  return (
    <NeuroshardProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white font-sans overflow-hidden">
        <header className="px-6 py-4 border-b border-indigo-800/30">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              CoreMindAI
            </h1>
            <button className="px-4 py-2 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm font-medium text-indigo-300 hover:bg-indigo-800/50 transition-all">
              Connect Wallet
            </button>
          </div>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Left Sidebar - Activity Timeline */}
          <div className="md:col-span-3 order-3 md:order-1">
            <ActivityTimeline />
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-6 order-1 md:order-2 flex flex-col gap-6">
            <NeuroshardViz />
            <InfoPanel />
            <ActionButtons />
          </div>
          
          {/* Right Sidebar - Suggested Actions */}
          <div className="md:col-span-3 order-2 md:order-3">
            <SuggestedActions />
          </div>
        </main>
        
        {/* Mini Chat */}
        <MiniChat />
      </div>
    </NeuroshardProvider>
  );
}

export default App;