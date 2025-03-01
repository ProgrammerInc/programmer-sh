
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
  name: "John Doe",
  title: "Full Stack Developer",
  summary: "Passionate software engineer with 5+ years of experience building web applications. Specialized in React, TypeScript, and Node.js. Dedicated to creating elegant, efficient, and user-friendly solutions.",
  location: "San Francisco, CA",
  contact: {
    email: "john.doe@example.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    twitter: "twitter.com/johndoe",
    website: "johndoe.dev"
  },
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"]
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "GitHub Actions"]
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase"]
    }
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      duration: "2020 - Present",
      description: "Lead developer for the company's main SaaS platform",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      achievements: [
        "Redesigned architecture reducing load times by 40%",
        "Led team of 5 developers to launch 3 major features",
        "Implemented CI/CD pipeline reducing deployment time by 70%"
      ]
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2018 - 2020",
      description: "Core team member building the company's MVP and scaling for initial growth",
      technologies: ["React", "Node.js", "MongoDB", "Docker"],
      achievements: [
        "Built responsive frontend used by 10K+ monthly users",
        "Developed RESTful API services with 99.9% uptime",
        "Optimized database queries improving performance by 30%"
      ]
    },
    {
      company: "WebAgency Co.",
      position: "Frontend Developer",
      duration: "2016 - 2018",
      description: "Developed frontend solutions for various client projects",
      technologies: ["JavaScript", "HTML/CSS", "jQuery", "WordPress"],
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Created custom component library used across multiple projects",
        "Mentored 3 junior developers"
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description: "Full-featured e-commerce solution with product management, cart, checkout, and admin dashboard",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      github: "github.com/johndoe/ecommerce",
      highlights: [
        "Implemented shopping cart with local storage persistence",
        "Built responsive product catalog with advanced filtering options",
        "Integrated secure payment processing with Stripe"
      ]
    },
    {
      id: "proj2",
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates",
      technologies: ["React", "TypeScript", "Firebase", "Material UI"],
      link: "task-app.example.com",
      github: "github.com/johndoe/task-app",
      highlights: [
        "Real-time updates using Firebase Firestore",
        "Drag-and-drop task organization with React DnD",
        "User authentication and team management features"
      ]
    },
    {
      id: "proj3",
      title: "Developer Portfolio",
      description: "Terminal-style developer portfolio showcasing projects and skills",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      github: "github.com/johndoe/terminal-portfolio",
      highlights: [
        "Custom terminal emulator with command processing",
        "Animated typing effects and smooth transitions",
        "Responsive design with mobile optimization"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      year: "2016",
      details: "Specialization in Software Engineering and Human-Computer Interaction"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      year: "2014",
      details: "Minor in Mathematics, Dean's List all semesters"
    }
  ]
};

export default portfolioData;
