import { NavItem, Project, Service, ProcessStep, BlogPost, Video, SocialLink } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'blog', label: 'Blog' },

  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    client: 'LogisticsCore',
    industry: 'Supply Chain',
    challenge: 'Manual order reconciliation across 3 legacy ERPs taking 40hrs/week.',
    outcome: 'Reduced manual labor by 95%. Real-time inventory sync.',
    tools: ['n8n', 'Python', 'PostgreSQL']
  },
  {
    id: '2',
    client: 'FinTech Alpha',
    industry: 'Finance',
    challenge: 'KYC compliance checks were slow, leading to 20% drop-off.',
    outcome: 'Automated verification reduced wait time from 2 days to 4 minutes.',
    tools: ['OpenAI API', 'AWS Lambda', 'React']
  },
  {
    id: '3',
    client: 'MediScale',
    industry: 'Healthcare',
    challenge: 'Patient intake data fragmented across paper and digital forms.',
    outcome: 'Unified intake system. 100% data accuracy. Zero manual entry.',
    tools: ['Custom OCR', 'FHIR', 'Node.js']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'strategy',
    title: 'System Strategy',
    description: 'We map your territory before building the roads. We identify where automation yields the highest leverage.',
    problemSolved: 'Prevents building efficient solutions for the wrong problems.',
    notFor: 'Teams looking for quick hacks or band-aid fixes.'
  },
  {
    id: 'automation',
    title: 'Custom Automation',
    description: 'Enterprise-grade workflows built on n8n and custom code. Robust error handling included by default.',
    problemSolved: 'Eliminates repetitive, high-volume manual tasks.',
    notFor: 'Simple Zapier tasks that don\'t require engineering.'
  },
  {
    id: 'ai',
    title: 'AI Integration',
    description: 'Context-aware AI agents that read, route, and reason over your business data.',
    problemSolved: 'Unlocks value from unstructured data (docs, emails, chats).',
    notFor: 'Generic chatbots without business context.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We listen first.',
    detail: 'Before tools or code, we understand the physics of your business. We map flows, identify bottlenecks, and determine if automation is even the right answer.'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Design before deployment.',
    detail: 'We architect the solution. You get a clear blueprint of logic, data flows, and expected outcomes. We price based on value and scope, not hours.'
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Direct engineering.',
    detail: 'No outsourcing. The people you talk to are the people writing the code. We build, test, and refine in tight feedback loops.'
  },
  {
    number: '04',
    title: 'Handoff',
    description: 'Built to last.',
    detail: 'We deliver documented, observable systems. We train your team and ensure the system is capable of evolving with your business.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How I Built a Lead Management Assistant That Saves Me 10 Hours a Week ⏰',
    excerpt: 'Let me tell you about the moment I knew something had to change.',
    date: '2025-12-30',
    readTime: '10 min read',
    link: 'https://medium.com/@inevitsolutions.co/how-i-built-a-lead-management-assistant-that-saves-me-10-hours-a-week-e48c0e1e8155',
    tags: ['Engineering', 'n8n'],
    image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EPAjS4WBA3bYC5DfqEg6FA.png'
  },
    {
    id: '2',
    title: 'The “Automate Everything” Trap',
    excerpt: '3 Processes You Should Keep Human.',
    date: '2026-12-1',
    readTime: '6 min read',
    link: 'https://medium.com/@inevitsolutions.co/the-automate-everything-trap-595edb91349e',
    tags: ['Case Study', 'LLMs'],
    image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*v4VkDm_jXphNBn4s6GVwtw.png'
  },
  {
    id: '3',
    title: 'I Built a $10/Month Client Management System That Does the Work of a $30K/Year Employee',
    excerpt: 'Let me tell you about the moment I knew something had to change.',
    date: '2026-1-7',
    readTime: '11 min read',
    link: 'https://medium.com/@inevitsolutions.co/i-built-a-10-month-client-management-system-that-does-the-work-of-a-30k-year-employee-09a30b2611ff',
    tags: ['Engineering', 'n8n'],
    image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*YdHptCtnitXjgALVeoTRfQ.png'
  }
];

export const YOUTUBE_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Automating Client Onboarding with n8n & OpenAI',
    views: '12k views',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    link: '#'
  },
  {
    id: 'v2',
    title: 'System Architecture 101 for Non-Technical Founders',
    views: '8.5k views',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 'v3',
    title: 'How to Scrape Data without getting blocked',
    views: '22k views',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 'v4',
    title: 'The Truth about AI Agents in 2024',
    views: '45k views',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '#'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'YouTube', handle: '@IneveitSystems', link: '#' },
  { platform: 'LinkedIn', handle: 'Ineveit Solutions', link: '#' },
  { platform: 'Twitter / X', handle: '@ineveit_io', link: '#' },
  { platform: 'GitHub', handle: 'ineveit-open-source', link: '#' },
];