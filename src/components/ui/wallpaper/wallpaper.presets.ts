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
  alley: {
    id: 'alley',
    name: 'Alley',
    description: 'A city alley at night',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    description: 'An arcade filled with neon lights and machines',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80'
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'Northern Lights in the night sky',
    type: 'animation',
    animation: 'aurora',
    animationType: 'reactbits'
  },
  'background-beams': {
    id: 'background-beams',
    name: 'Background Beams',
    description: 'Beams that animate in a wave pattern',
    type: 'animation',
    animation: 'background-beams',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'background-boxes': {
    id: 'background-boxes',
    name: 'Background Boxes',
    description: 'Boxes that change color with mouse movement',
    type: 'animation',
    animation: 'background-boxes',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'background-lines': {
    id: 'background-lines',
    name: 'Background Lines',
    description: 'Lines that animate in a wave pattern',
    type: 'animation',
    animation: 'background-lines',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
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
  beach: {
    id: 'beach',
    name: 'Beach',
    description: 'A beach with sand and sea',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'
  },
  code: {
    id: 'code',
    name: 'Code',
    description: 'Colorful code on a computer monitor',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80'
  },
  drummer: {
    id: 'drummer',
    name: 'Drummer',
    description: 'A drummer playing drums',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1588032786045-59cefda005c0?auto=format&fit=crop&q=80'
  },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy mountain summit',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1578147063111-9ffec96050cd?auto=format&fit=crop&q=80'
  },
  // globe: {
  //   id: 'globe',
  //   name: 'Globe',
  //   description: 'A globe of the world',
  //   type: 'animation',
  //   animation: 'globe',
  //   animationType: 'aceternity',
  //   gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
  //   gradientType: 'linear'
  // },
  gradient: {
    id: 'gradient',
    name: 'Gradient',
    description: 'A simple gradient background',
    type: 'gradient',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'gradient-animation': {
    id: 'gradient-animation',
    name: 'Gradient Animation',
    description: 'A gradient animation background',
    type: 'animation',
    animation: 'gradient-animation',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'grid-distortion': {
    id: 'grid-distortion',
    name: 'Grid Distortion',
    description: 'A twisted grid of tiles flipping and rotating',
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
    description: 'Streams of light race across the screen',
    type: 'animation',
    animation: 'hyperspeed',
    animationType: 'reactbits',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80'
  },
  iridescence: {
    id: 'iridescence',
    name: 'Iridescence',
    description: 'Waves of liquid light',
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
    description: 'Purples waves of liquid metal',
    type: 'animation',
    animation: 'liquid-chrome',
    animationType: 'reactbits'
  },
  'magnet-lines': {
    id: 'magnet-lines',
    name: 'Magnet Lines',
    description: 'Magnet lines follow the cursor across the screen',
    type: 'animation',
    animation: 'magnet-lines',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  meteors: {
    id: 'meteors',
    name: 'Meteors',
    description: 'Meteors streaming across the screen',
    type: 'animation',
    animation: 'meteors',
    animationType: 'aceternity',
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
    description: 'Animated noise background',
    type: 'animation',
    animation: 'noise',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Underwater view from the ocean',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80'
  },
  particles: {
    id: 'particles',
    name: 'Particles',
    description: 'Particles animation background',
    type: 'animation',
    animation: 'particles',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'rain-drops': {
    id: 'rain-drops',
    name: 'Rain Drops',
    description: 'Raindrops falling from the sky',
    type: 'animation',
    animation: 'rain-drops',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'shooting-stars': {
    id: 'shooting-stars',
    name: 'Shooting Stars',
    description: 'Lucy in the sky with diamonds',
    type: 'animation',
    animation: 'shooting-stars',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  'southern-lights': {
    id: 'southern-lights',
    name: 'Southern Lights',
    description: 'Another aurora background animation',
    type: 'animation',
    animation: 'southern-lights',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  sparkles: {
    id: 'sparkles',
    name: 'Sparkles',
    description: 'Sparkles animation background',
    type: 'animation',
    animation: 'sparkles',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  spotlight: {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'A spotlight background animation',
    type: 'animation',
    animation: 'spotlight',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  squares: {
    id: 'squares',
    name: 'Squares',
    description: 'Animated squares background',
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
  vortex: {
    id: 'vortex',
    name: 'Vortex',
    description: 'Particle vortex animation',
    type: 'animation',
    animation: 'vortex',
    animationType: 'aceternity',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    description: 'Trippy optical illusion animation',
    type: 'animation',
    animation: 'waves',
    animationType: 'reactbits',
    gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
    gradientType: 'linear'
  },
  // 'wavy-background': {
  //   id: 'wavy-background',
  //   name: 'Wavy Background',
  //   description: 'Animated wavy background',
  //   type: 'animation',
  //   animation: 'wavy-background',
  //   animationType: 'aceternity',
  //   gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
  //   gradientType: 'linear'
  // },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Clean workspace desktop',
    type: 'image',
    imageType: 'url',
    url: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80'
  }
  // 'world-map': {
  //   id: 'world-map',
  //   name: 'World Map',
  //   description: 'World map background with animated lines',
  //   type: 'animation',
  //   animation: 'world-map',
  //   animationType: 'aceternity',
  //   gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
  //   gradientType: 'linear'
  // }
};

export default wallpapers;
