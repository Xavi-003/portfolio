export type ViewState = 'hero' | 'projects' | 'skills' | 'contact';

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
