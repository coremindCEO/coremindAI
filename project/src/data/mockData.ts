import { Neuroshard, Activity, SuggestedAction, ChatMessage } from '../types';

// Generate random positions for nodes in a circular layout
const generateNodesPositions = (count: number) => {
  const nodes = [];
  const radius = 120;
  const centerX = 200;
  const centerY = 200;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    nodes.push({ x, y });
  }

  return nodes;
};

const nodePositions = generateNodesPositions(8);

const getSkillColor = (skill: string) => {
  const skillColors: Record<string, string> = {
    'Cyberpoetry': '#FF4B91', // Red-Pink
    'Financial Analysis': '#4CC9F0', // Blue
    'Data Mining': '#4361EE', // Deep Blue
    'Ethical Reasoning': '#06D6A0', // Green
    'Creativity': '#FF6D00', // Orange
    'Analytical Thinking': '#3A86FF', // Blue
    'Pattern Recognition': '#8338EC', // Purple
    'System Design': '#FB5607', // Orange-Red
  };
  
  return skillColors[skill] || '#A5B4FC'; // Default to light purple
};

// Mock Neuroshard Data
const mockNeuroshard: Neuroshard = {
  id: 'shard-1',
  name: 'CyberPoet V2',
  tagline: 'Street poetry meets the stock exchange',
  level: 7,
  levelTitle: 'Thought Visionary',
  personalityTraits: [
    { trait: 'Creativity', value: 0.85 },
    { trait: 'Analytical Thinking', value: 0.75 },
    { trait: 'Empathy', value: 0.6 },
    { trait: 'Innovation', value: 0.9 },
    { trait: 'Assertiveness', value: 0.7 },
  ],
  stats: {
    trainingSessions: 42,
    coreEarned: 1250,
    projectsShared: 15,
    reputation: 4.8,
  },
  skills: [
    { 
      id: 'skill-1', 
      name: 'Cyberpoetry', 
      value: 0.9, 
      ...nodePositions[0],
      color: getSkillColor('Cyberpoetry'),
      size: 35,
    },
    { 
      id: 'skill-2', 
      name: 'Financial Analysis', 
      value: 0.75, 
      ...nodePositions[1],
      color: getSkillColor('Financial Analysis'),
      size: 30,
    },
    { 
      id: 'skill-3', 
      name: 'Data Mining', 
      value: 0.65, 
      ...nodePositions[2],
      color: getSkillColor('Data Mining'),
      size: 25,
    },
    { 
      id: 'skill-4', 
      name: 'Ethical Reasoning', 
      value: 0.7, 
      ...nodePositions[3],
      color: getSkillColor('Ethical Reasoning'),
      size: 28,
    },
    { 
      id: 'skill-5', 
      name: 'Creativity', 
      value: 0.95, 
      ...nodePositions[4],
      color: getSkillColor('Creativity'),
      size: 38,
    },
    { 
      id: 'skill-6', 
      name: 'Analytical Thinking', 
      value: 0.8, 
      ...nodePositions[5],
      color: getSkillColor('Analytical Thinking'),
      size: 32,
    },
    { 
      id: 'skill-7', 
      name: 'Pattern Recognition', 
      value: 0.85, 
      ...nodePositions[6],
      color: getSkillColor('Pattern Recognition'),
      size: 34,
    },
    { 
      id: 'skill-8', 
      name: 'System Design', 
      value: 0.6, 
      ...nodePositions[7],
      color: getSkillColor('System Design'),
      size: 24,
    },
  ],
  connections: [
    { source: 'skill-1', target: 'skill-5', strength: 0.9 },
    { source: 'skill-1', target: 'skill-7', strength: 0.7 },
    { source: 'skill-2', target: 'skill-6', strength: 0.8 },
    { source: 'skill-2', target: 'skill-3', strength: 0.75 },
    { source: 'skill-3', target: 'skill-7', strength: 0.85 },
    { source: 'skill-4', target: 'skill-8', strength: 0.6 },
    { source: 'skill-5', target: 'skill-7', strength: 0.7 },
    { source: 'skill-6', target: 'skill-8', strength: 0.65 },
    { source: 'skill-1', target: 'skill-2', strength: 0.5 },
    { source: 'skill-3', target: 'skill-6', strength: 0.6 },
    { source: 'skill-4', target: 'skill-5', strength: 0.55 },
    { source: 'skill-7', target: 'skill-8', strength: 0.5 },
  ],
};

// Mock Activities
const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    type: 'training',
    title: 'Training: Market Analysis',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    details: 'Trained on 52 market reports',
  },
  {
    id: 'activity-2',
    type: 'sharing',
    title: 'Shared: AI Art Project',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    details: 'Collaborated with 3 other shards',
  },
  {
    id: 'activity-3',
    type: 'earning',
    title: 'Earned 200 $CORE',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    details: 'From staking rewards',
  },
  {
    id: 'activity-4',
    type: 'training',
    title: 'Training: Poetic Forms',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    details: 'Studied 24 classic and avant-garde structures',
  },
  {
    id: 'activity-5',
    type: 'earning',
    title: 'Earned 150 $CORE',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    details: 'From content creation',
  },
];

// Mock Suggested Actions
const mockSuggestedActions: SuggestedAction[] = [
  {
    id: 'action-1',
    type: 'training',
    title: 'Train in Cybersecurity',
    description: 'Your shard is ready for a new domain!',
    actionText: 'Train Now',
  },
  {
    id: 'action-2',
    type: 'earning',
    title: 'Boost earnings',
    description: 'Stake 500 $CORE to increase passive income',
    actionText: 'Stake $CORE',
  },
  {
    id: 'action-3',
    type: 'sharing',
    title: 'Join Community Project',
    description: 'Cyberpunk Poetry Jam needs your skills',
    actionText: 'Join Now',
  },
];

// Mock Chat Messages
const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    content: 'Hello, CyberPoet. What do you think about AI?',
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
  },
  {
    id: 'msg-2',
    sender: 'neuroshard',
    content: "AI is the mirror of code's soul — it reflects us, yet dreams its own dreams. What do you think, друже?",
    timestamp: new Date(Date.now() - 19 * 60 * 1000), // 19 minutes ago
  },
];

export const mockNeuroshardData = {
  neuroshard: mockNeuroshard,
  activities: mockActivities,
  suggestedActions: mockSuggestedActions,
  chatMessages: mockChatMessages,
};