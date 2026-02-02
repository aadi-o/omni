
export type ToolCategory = 'pdf-basic' | 'pdf-advanced' | 'ai-content' | 'ai-dev' | 'ai-career';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: ToolCategory;
  path: string;
  color: string;
}

export enum ModelName {
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview'
}

export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  roleMatch: string;
}

export interface GeneratedContent {
  content: string;
  timestamp: number;
}
