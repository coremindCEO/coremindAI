// Neuroshard Types
export interface SkillNode {
  id: string;
  name: string;
  value: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export interface Connection {
  source: string;
  target: string;
  strength: number;
}

export interface PersonalityTrait {
  trait: string;
  value: number;
}

export interface Neuroshard {
  id: string;
  name: string;
  tagline: string;
  level: number;
  levelTitle: string;
  personalityTraits: PersonalityTrait[];
  stats: {
    trainingSessions: number;
    coreEarned: number;
    projectsShared: number;
    reputation: number;
  };
  skills: SkillNode[];
  connections: Connection[];
}

// Activity Types
export interface Activity {
  id: string;
  type: 'training' | 'sharing' | 'earning';
  title: string;
  timestamp: Date;
  details?: string;
}

// Suggested Action Types
export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  actionText: string;
  type: 'training' | 'earning' | 'sharing';
}

// Chat Message Types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'neuroshard';
  content: string;
  timestamp: Date;
}