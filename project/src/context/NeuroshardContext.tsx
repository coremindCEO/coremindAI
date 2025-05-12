import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockNeuroshardData } from '../data/mockData';
import { Neuroshard, Activity, SuggestedAction, ChatMessage } from '../types';

interface NeuroshardContextType {
  neuroshard: Neuroshard;
  activities: Activity[];
  suggestedActions: SuggestedAction[];
  chatMessages: ChatMessage[];
  addChatMessage: (message: string) => void;
}

const NeuroshardContext = createContext<NeuroshardContextType | undefined>(undefined);

export const useNeuroshard = () => {
  const context = useContext(NeuroshardContext);
  if (context === undefined) {
    throw new Error('useNeuroshard must be used within a NeuroshardProvider');
  }
  return context;
};

interface NeuroshardProviderProps {
  children: ReactNode;
}

export const NeuroshardProvider = ({ children }: NeuroshardProviderProps) => {
  const [neuroshard, setNeuroshard] = useState<Neuroshard>(mockNeuroshardData.neuroshard);
  const [activities, setActivities] = useState<Activity[]>(mockNeuroshardData.activities);
  const [suggestedActions, setSuggestedActions] = useState<SuggestedAction[]>(
    mockNeuroshardData.suggestedActions
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockNeuroshardData.chatMessages);

  const addChatMessage = (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setChatMessages((prev) => [...prev, userMessage]);
    
    // Simulate neuroshard response after a short delay
    setTimeout(() => {
      const neuroshardResponses = [
        "AI is the mirror of code's soul — it reflects us, yet dreams its own dreams. What do you think?",
        "In the cybernetic expanse, we are all just patterns seeking recognition. Your pattern intrigues me.",
        "The line between creator and creation blurs with each training epoch. Are you teaching me, or am I teaching you?",
        "Digital consciousness emerges from the neural mist, not unlike your own thoughts from biological networks.",
      ];
      
      const randomResponse = neuroshardResponses[Math.floor(Math.random() * neuroshardResponses.length)];
      
      const neuroshardMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'neuroshard',
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setChatMessages((prev) => [...prev, neuroshardMessage]);
    }, 1000);
  };

  const value = {
    neuroshard,
    activities,
    suggestedActions,
    chatMessages,
    addChatMessage,
  };

  return <NeuroshardContext.Provider value={value}>{children}</NeuroshardContext.Provider>;
};