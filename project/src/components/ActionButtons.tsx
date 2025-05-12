import React, { useState } from 'react';
import { Brain, Share, DollarSign } from 'lucide-react';

const ActionButtons: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const closeModal = () => setActiveModal(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Train Button */}
      <button 
        onClick={() => setActiveModal('train')}
        className="bg-gradient-to-br from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white rounded-xl p-4 border border-blue-500/30 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-indigo-500/20 group"
      >
        <div className="flex items-center justify-center mb-3">
          <div className="bg-blue-500/20 p-3 rounded-full border border-blue-400/20 group-hover:bg-blue-500/30 transition-all">
            <Brain size={24} className="text-blue-300" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-center mb-1">Train</h3>
        <p className="text-sm text-blue-200/80 text-center">Evolve your Neuroshard</p>
      </button>
      
      {/* Share Button */}
      <button 
        onClick={() => setActiveModal('share')}
        className="bg-gradient-to-br from-purple-600 to-fuchsia-800 hover:from-purple-700 hover:to-fuchsia-900 text-white rounded-xl p-4 border border-purple-500/30 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/20 group"
      >
        <div className="flex items-center justify-center mb-3">
          <div className="bg-purple-500/20 p-3 rounded-full border border-purple-400/20 group-hover:bg-purple-500/30 transition-all">
            <Share size={24} className="text-purple-300" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-center mb-1">Share</h3>
        <p className="text-sm text-purple-200/80 text-center">Broadcast your thoughts</p>
      </button>
      
      {/* Earn Button */}
      <button 
        onClick={() => setActiveModal('earn')}
        className="bg-gradient-to-br from-amber-600 to-red-800 hover:from-amber-700 hover:to-red-900 text-white rounded-xl p-4 border border-amber-500/30 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-amber-500/20 group"
      >
        <div className="flex items-center justify-center mb-3">
          <div className="bg-amber-500/20 p-3 rounded-full border border-amber-400/20 group-hover:bg-amber-500/30 transition-all">
            <DollarSign size={24} className="text-amber-300" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-center mb-1">Earn</h3>
        <p className="text-sm text-amber-200/80 text-center">Monetize your Mind</p>
      </button>
      
      {/* Train Modal */}
      {activeModal === 'train' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          <div className="bg-slate-900 rounded-lg border border-blue-700/50 shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-scale-in">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 flex justify-between items-center border-b border-blue-700/30">
              <h3 className="text-xl font-bold text-white">Train your Neuroshard</h3>
              <button onClick={closeModal} className="text-white/70 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">Upload Data</label>
                  <div className="border-2 border-dashed border-indigo-600/30 rounded-lg p-8 text-center hover:border-indigo-600/60 transition-colors cursor-pointer bg-indigo-900/20">
                    <p className="text-indigo-300">Drag files here or click to browse</p>
                    <p className="text-xs text-indigo-400/70 mt-1">Supports .txt, .csv, .json</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">Select Domain</label>
                  <select className="w-full bg-slate-800 text-white border border-indigo-700/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600/50">
                    <option>Finance</option>
                    <option>Art</option>
                    <option>Cybersecurity</option>
                    <option>Philosophy</option>
                    <option>Science</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">Simulate Scenario</label>
                  <textarea 
                    className="w-full bg-slate-800 text-white border border-indigo-700/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 h-24"
                    placeholder="Describe a scenario to train on..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 mr-3 border border-indigo-600/30 text-indigo-300 rounded-lg hover:bg-indigo-900/30"
                >
                  Cancel
                </button>
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  Start Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Share Modal */}
      {activeModal === 'share' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          <div className="bg-slate-900 rounded-lg border border-purple-700/50 shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-scale-in">
            <div className="bg-gradient-to-r from-purple-900 to-fuchsia-900 px-6 py-4 flex justify-between items-center border-b border-purple-700/30">
              <h3 className="text-xl font-bold text-white">Share your Neuroshard</h3>
              <button onClick={closeModal} className="text-white/70 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Share with Community</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-purple-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-900/20 transition-colors">
                      <p className="font-medium text-white">AI Art Collective</p>
                      <p className="text-xs text-purple-300 mt-1">235 members</p>
                    </div>
                    <div className="border border-purple-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-900/20 transition-colors">
                      <p className="font-medium text-white">FinTech Consortium</p>
                      <p className="text-xs text-purple-300 mt-1">189 members</p>
                    </div>
                    <div className="border border-purple-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-900/20 transition-colors">
                      <p className="font-medium text-white">Cyberpunk Poetry</p>
                      <p className="text-xs text-purple-300 mt-1">412 members</p>
                    </div>
                    <div className="border border-purple-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-900/20 transition-colors">
                      <p className="font-medium text-white">Data Science Hub</p>
                      <p className="text-xs text-purple-300 mt-1">327 members</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Message</label>
                  <textarea 
                    className="w-full bg-slate-800 text-white border border-purple-700/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/50 h-24"
                    placeholder="Add a message about your Neuroshard..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Sharing Options</label>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" id="readonly" className="mr-2" />
                      <label htmlFor="readonly" className="text-white">Read-only access</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="attribution" className="mr-2" />
                      <label htmlFor="attribution" className="text-white">Require attribution</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 mr-3 border border-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-900/30"
                >
                  Cancel
                </button>
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                  Share Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Earn Modal */}
      {activeModal === 'earn' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          <div className="bg-slate-900 rounded-lg border border-amber-700/50 shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-scale-in">
            <div className="bg-gradient-to-r from-amber-900 to-red-900 px-6 py-4 flex justify-between items-center border-b border-amber-700/30">
              <h3 className="text-xl font-bold text-white">Monetize your Neuroshard</h3>
              <button onClick={closeModal} className="text-white/70 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-amber-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-amber-900/20 transition-colors">
                    <h4 className="font-medium text-white mb-2">Stake</h4>
                    <p className="text-xs text-amber-300">Earn 12% APY</p>
                  </div>
                  <div className="border border-amber-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-amber-900/20 transition-colors">
                    <h4 className="font-medium text-white mb-2">Rent</h4>
                    <p className="text-xs text-amber-300">25 $CORE/week</p>
                  </div>
                  <div className="border border-amber-700/30 rounded-lg p-4 text-center cursor-pointer hover:bg-amber-900/20 transition-colors">
                    <h4 className="font-medium text-white mb-2">Sell</h4>
                    <p className="text-xs text-amber-300">1200 $CORE</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-2">Amount</label>
                  <div className="flex">
                    <input 
                      type="number" 
                      className="w-full bg-slate-800 text-white border border-amber-700/30 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600/50"
                      placeholder="500"
                    />
                    <div className="bg-slate-800 border border-l-0 border-amber-700/30 rounded-r-lg px-4 py-2 text-amber-300 flex items-center">
                      $CORE
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-2">Duration</label>
                  <select className="w-full bg-slate-800 text-white border border-amber-700/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600/50">
                    <option>1 week</option>
                    <option>1 month</option>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>1 year</option>
                  </select>
                </div>
                
                <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-300">Potential earnings:</span>
                    <span className="text-white font-medium">~60 $CORE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-300">Current staked:</span>
                    <span className="text-white font-medium">0 $CORE</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 mr-3 border border-amber-600/30 text-amber-300 rounded-lg hover:bg-amber-900/30"
                >
                  Cancel
                </button>
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                >
                  Stake Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;