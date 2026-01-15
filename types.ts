export type PageView = 'home' | 'work' | 'process' | 'blog' | 'about' | 'contact';

export interface NavItem {
  id: PageView;
  label: string;
}

export interface Project {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  outcome: string;
  tools: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  problemSolved: string;
  notFor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
  tags: string[];
  image?: string;
}

export interface Video {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
  link: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  link: string;
}