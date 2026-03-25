export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  title: string;
  category: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}

export interface Bookmark {
  _id: string;
  problemId: Problem;
  createdAt: string;
}