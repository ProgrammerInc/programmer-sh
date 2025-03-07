import Wallpaper from './wallpaper.types';

// Predefined wallpapers
const wallpapers: Record<string, Wallpaper> = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Default wallpaper',
    type: 'default',
    animation: 'particles',
    animationType: 'reactbits'
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'Northern Lights in the night sky',
    type: 'animation',
    animation: 'aurora',
    animationType: 'reactbits'
  },
  balatro: {
    id: 'balatro',
    name: 'Balatro',
    description: 'Balatro - a rainbow of colors',
    type: 'animation',
    animation: 'balatro',
    animationType: 'reactbits'
  },
  ballpit: {
    id: 'ballpit',
    name: 'Ballpit',
    description: 'A ball pit of many colorful balls',
    type: 'animation',
    animation: 'ballpit',
    animationType: 'reactbits',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80'
  },
  code: {
    id: 'code',
    name: 'Code',
    description: 'Colorful code on a computer monitor',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80'
  },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy mountain summit',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1578147063111-9ffec96050cd?auto=format&fit=crop&q=80'
  },
  gradient: {
    id: 'gradient',
    name: 'Gradient',
    description: 'A simple gradient background',
    type: 'gradient',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)'
  },
  'grid-distortion': {
    id: 'grid-distortion',
    name: 'Grid Distortion',
    description: 'Grid Distortion - a twisted grid of tiles flipping and rotating',
    type: 'animation',
    animation: 'grid-distortion',
    animationType: 'reactbits',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
  },
  // 'grid-motion': {
  //   id: 'grid-motion',
  //   name: 'Grid Motion',
  //   description: 'Animated grid of moving elements',
  //   type: 'animation',
  //   animation: 'grid-motion',
  //   animationType: 'reactbits',
  //   gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
  //   gradientType: 'linear'
  // },
  hyperspeed: {
    id: 'hyperspeed',
    name: 'Hyperspeed',
    description: 'Hyperspeed - streams of light race across the screen',
    type: 'animation',
    animation: 'hyperspeed',
    animationType: 'reactbits',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80'
  },
  iridescence: {
    id: 'iridescence',
    name: 'Iridescence',
    description: 'Iridescence - waves of iridescence',
    type: 'animation',
    animation: 'iridescence',
    animationType: 'reactbits'
  },
  'letter-glitch': {
    id: 'letter-glitch',
    name: 'Letter Glitch',
    description: "There's a glitch in the matrix",
    type: 'animation',
    animation: 'letter-glitch',
    animationType: 'reactbits'
  },
  lightning: {
    id: 'lightning',
    name: 'Lightning',
    description: 'Lightning across in the sky',
    type: 'animation',
    animation: 'lightning',
    animationType: 'reactbits'
  },
  'liquid-chrome': {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    description: 'Liquid Chrome - monochrome waves of liquid metal',
    type: 'animation',
    animation: 'liquid-chrome',
    animationType: 'reactbits'
  },
  'magnet-lines': {
    id: 'magnet-lines',
    name: 'Magnet Lines',
    description: 'Magnet Lines - magnet lines follows the cursor across the screen',
    type: 'animation',
    animation: 'magnet-lines',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  mountains: {
    id: 'mountains',
    name: 'Mountains',
    description: "Bird's eye view of green mountains",
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80'
  },
  noise: {
    id: 'noise',
    name: 'Noise',
    description: 'Noise - animated noise',
    type: 'animation',
    animation: 'noise',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Ocean wave at beach',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80'
  },
  particles: {
    id: 'particles',
    name: 'Particles',
    description: 'Particles - lucy in the sky with diamonds',
    type: 'animation',
    animation: 'particles',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  squares: {
    id: 'squares',
    name: 'Squares',
    description: 'Squares - animated squares',
    type: 'animation',
    animation: 'squares',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    description: 'The threads of fate on your desktop',
    type: 'animation',
    animation: 'threads',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    description: 'Waves - trippy psychedelic liquid animation wallpaper',
    type: 'animation',
    animation: 'waves',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Clean workspace desktop wallpaper',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80'
  }
};

export default wallpapers;
