import React, { useState, useRef, useEffect } from 'react';
import { useNeuroshard } from '../context/NeuroshardContext';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

const MiniChat: React.FC = () => {
  const { chatMessages, addChatMessage } = useNeuroshard();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addChatMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-indigo-500/20 transition-all hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-slate-900 border border-indigo-900/50 rounded-lg shadow-2xl w-80 sm:w-96 overflow-hidden animate-fade-scale-in">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 px-4 py-3 flex justify-between items-center border-b border-indigo-700/30">
            <h3 className="text-white font-medium flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              Talk to your Neuroshard
            </h3>
            <div className="flex items-center space-x-2">
              <button onClick={toggleMinimize} className="text-white/70 hover:text-white">
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button onClick={toggleChat} className="text-white/70 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-4">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender === 'user' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-800 border border-indigo-700/30 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="border-t border-indigo-900/30 p-4">
                <div className="flex">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask your Neuroshard something..."
                    className="flex-1 bg-slate-800 rounded-l-lg px-4 py-2 text-white border border-indigo-700/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                  <button 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-4 py-2"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniChat;