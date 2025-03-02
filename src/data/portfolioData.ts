export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface Contact {
  phone?: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  location: string;
  contact: Contact;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

const portfolioData: Profile = {
  name: 'James Black',
  title: 'Full Stack Developer',
  summary:
    'Passionate software engineer with 25+ years of experience building web applications. Specialized in Angular and React front-end frameworks, working with both JavaScript/TypeScript languages, and well versed with many backend languages and frameworks from Node.JS to Python, Golang and more. Dedicated to creating elegant, efficient, and user-friendly solutions.',
  location: 'Frisco, TX',
  contact: {
    phone: '+1 (347) 503-3967',
    email: 'james.black@programmer.sh',
    linkedin: 'linkedin.com/in/ProgrammerInc',
    github: 'github.com/ProgrammerInc',
    twitter: 'x.com/ProgrammerInc',
    website: 'programmer.to/website',
  },
  skills: [
    {
      category: 'Frontend',
      items: [
        'Angular',
        'React',
        'TypeScript',
        'JavaScript',
        'HTML/CSS',
        'Next.js',
        'Tailwind CSS',
      ],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'Golang', 'Express', 'Django', 'GraphQL', 'REST APIs'],
    },
    {
      category: 'DevOps',
      items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'GitHub Actions'],
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
    },
  ],
  experience: [
    {
      company: 'Bank of America Corporate',
      position: 'Feature Team Lead',
      duration: '2020 - Present',
      description: 'Lead developer for corporate banking platforms',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      achievements: [
        'Architected solutions reducing load times by 40%',
        'Led team of developers to launch major features',
        'Implemented CI/CD pipeline reducing deployment time by 70%',
      ],
    },
    {
      company: 'Previous Company',
      position: 'Senior Full Stack Developer',
      duration: '2015 - 2020',
      description: 'Core team member building enterprise applications',
      technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
      achievements: [
        'Built responsive frontends used by thousands of users',
        'Developed RESTful API services with 99.9% uptime',
        'Optimized database queries improving performance by 30%',
      ],
    },
    {
      company: 'Early Career',
      position: 'Software Developer',
      duration: '2000 - 2015',
      description: 'Developed solutions for various industries',
      technologies: ['JavaScript', 'C#', '.NET', 'SQL'],
      achievements: [
        'Delivered numerous client projects on time and within budget',
        'Created reusable component libraries',
        'Mentored junior developers',
      ],
    },
  ],
  projects: [
    {
      id: 'proj1',
      title: 'Banking API Platform',
      description:
        'Enterprise solution for banking API management with security, performance monitoring, and developer tooling',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      github: 'github.com/ProgrammerInc/banking-api',
      highlights: [
        'Implemented OAuth 2.0 authorization framework',
        'Built responsive admin dashboard with real-time metrics',
        'Designed scalable microservices architecture',
      ],
    },
    {
      id: 'proj2',
      title: 'Distributed Workflow System',
      description: 'Scalable workflow orchestration system for enterprise processes',
      technologies: ['React', 'TypeScript', 'Golang', 'Kubernetes'],
      github: 'github.com/ProgrammerInc/workflow-engine',
      highlights: [
        'Event-driven architecture with message queuing',
        'Interactive workflow designer with drag-and-drop functionality',
        'Multi-tenant system supporting enterprise scale',
      ],
    },
    {
      id: 'proj3',
      title: 'Terminal Portfolio',
      description: 'Terminal-style developer portfolio showcasing projects and skills',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'github.com/ProgrammerInc/terminal-portfolio',
      highlights: [
        'Custom terminal emulator with command processing',
        'Animated typing effects and smooth transitions',
        'Responsive design with mobile optimization',
      ],
    },
  ],
  education: [
    {
      degree: 'Computer Science',
      institution: 'University of Texas',
      year: '2000',
      details: 'Focus on Software Engineering',
    },
  ],
};

export default portfolioData;
