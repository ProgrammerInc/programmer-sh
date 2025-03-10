import { Wallpaper } from '@/components/ui/wallpaper';

// Predefined wallpapers
export const wallpaperPresets: Record<string, Wallpaper> = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Default wallpaper',
    type: 'default',
    background: {
      id: 'default',
      type: 'animation',
      animation: {
        id: 'particles',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  alley: {
    id: 'alley',
    name: 'Alley',
    description: 'A city alley at night',
    type: 'image',
    background: {
      id: 'alley',
      type: 'image',
      image: {
        id: 'alley',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
      }
    }
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    description: 'An arcade filled with neon lights and machines',
    type: 'image',
    background: {
      id: 'arcade',
      type: 'image',
      image: {
        id: 'arcade',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80'
      }
    }
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Aurora borealis in the night sky',
    type: 'animation',
    background: {
      id: 'aurora',
      type: 'animation',
      animation: {
        id: 'aurora',
        type: 'reactbits'
      }
    }
  },
  beams: {
    id: 'beams',
    name: 'Beams',
    description: 'Beams that animate in a wave pattern',
    type: 'animation',
    background: {
      id: 'beams',
      type: 'animation',
      animation: {
        id: 'background-beams',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  balatro: {
    id: 'balatro',
    name: 'Balatro',
    description: 'Balatro - a rainbow of colors',
    type: 'animation',
    background: {
      id: 'balatro',
      type: 'animation',
      animation: {
        id: 'balatro',
        type: 'reactbits'
      }
    }
  },
  ballpit: {
    id: 'ballpit',
    name: 'Ballpit',
    description: 'A ball pit of many colorful balls',
    type: 'animation',
    background: {
      id: 'ballpit',
      type: 'animation',
      animation: {
        id: 'ballpit',
        type: 'reactbits'
      }
    }
  },
  beach: {
    id: 'beach',
    name: 'Beach',
    description: 'A beach with sand and sea',
    type: 'image',
    background: {
      id: 'beach',
      type: 'image',
      image: {
        id: 'beach',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'
      }
    }
  },
  code: {
    id: 'code',
    name: 'Code',
    description: 'Colorful code on a computer monitor',
    type: 'image',
    background: {
      id: 'code',
      type: 'image',
      image: {
        id: 'code',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80'
      }
    }
  },
  drummer: {
    id: 'drummer',
    name: 'Drummer',
    description: 'A drummer playing drums',
    type: 'image',
    background: {
      id: 'drummer',
      type: 'image',
      image: {
        id: 'drummer',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1588032786045-59cefda005c0?auto=format&fit=crop&q=80'
      }
    }
  },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy mountain summit',
    type: 'image',
    background: {
      id: 'fog',
      type: 'image',
      image: {
        id: 'fog',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1578147063111-9ffec96050cd?auto=format&fit=crop&q=80'
      }
    }
  },
  // globe: {
  //   id: 'globe',
  //   name: 'Globe',
  //   description: 'A globe of the world',
  //   type: 'animation',
  //   background: {
  //     id: 'globe',
  //     type: 'animation',
  //     animation: {
  //       id: 'globe',
  //       type: 'aceternity'
  //     }
  //   }
  // },
  gradient: {
    id: 'gradient',
    name: 'Gradient',
    description: 'A simple gradient background',
    type: 'gradient',
    background: {
      id: 'default',
      type: 'gradient',
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'gradient-animation': {
    id: 'gradient-animation',
    name: 'Gradient Animation',
    description: 'A gradient animation background',
    type: 'animation',
    background: {
      id: 'gradient-animation',
      type: 'animation',
      animation: {
        id: 'gradient-animation',
        type: 'aceternity'
      }
    }
  },
  'grid-distortion': {
    id: 'grid-distortion',
    name: 'Grid Distortion',
    description: 'A twisted grid of tiles flipping and rotating',
    type: 'animation',
    background: {
      id: 'grid-distortion',
      type: 'animation',
      animation: {
        id: 'grid-distortion',
        type: 'reactbits'
      },
      image: {
        id: 'grid-distortion',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
      }
    }
  },
  // 'grid-motion': {
  //   id: 'grid-motion',
  //   name: 'Grid Motion',
  //   description: 'Animated grid of moving elements',
  //   type: 'animation',
  //   background: {
  //     id: 'grid-motion',
  //     type: 'animation',
  //     animation: {
  //       id: 'grid-motion',
  //       type: 'reactbits'
  //     }
  //   }
  // },
  hyperspeed: {
    id: 'hyperspeed',
    name: 'Hyperspeed',
    description: 'Streams of light race across the screen',
    type: 'animation',
    background: {
      id: 'hyperspeed',
      type: 'animation',
      animation: {
        id: 'hyperspeed',
        type: 'reactbits'
      },
      image: {
        id: 'hyperspeed',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80'
      }
    }
  },
  iridescence: {
    id: 'iridescence',
    name: 'Iridescence',
    description: 'Waves of liquid light',
    type: 'animation',
    background: {
      id: 'iridescence',
      type: 'animation',
      animation: {
        id: 'iridescence',
        type: 'reactbits'
      }
    }
  },
  'letter-glitch': {
    id: 'letter-glitch',
    name: 'Letter Glitch',
    description: "There's a glitch in the matrix",
    type: 'animation',
    background: {
      id: 'letter-glitch',
      type: 'animation',
      animation: {
        id: 'letter-glitch',
        type: 'reactbits'
      }
    }
  },
  lightning: {
    id: 'lightning',
    name: 'Lightning',
    description: 'Lightning across in the sky',
    type: 'animation',
    background: {
      id: 'lightning',
      type: 'animation',
      animation: {
        id: 'lightning',
        type: 'reactbits'
      }
    }
  },
  'liquid-chrome': {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    description: 'Purples waves of liquid metal',
    type: 'animation',
    background: {
      id: 'liquid-chrome',
      type: 'animation',
      animation: {
        id: 'liquid-chrome',
        type: 'reactbits'
      }
    }
  },
  'little-boxes': {
    id: 'little-boxes',
    name: 'Little Boxes',
    description: 'Boxes that change color with mouse movement',
    type: 'animation',
    background: {
      id: 'little-boxes',
      type: 'animation',
      animation: {
        id: 'background-boxes',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'magnet-lines': {
    id: 'magnet-lines',
    name: 'Magnet Lines',
    description: 'Magnet lines follow the cursor across the screen',
    type: 'animation',
    background: {
      id: 'magnet-lines',
      type: 'animation',
      animation: {
        id: 'magnet-lines',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  meteors: {
    id: 'meteors',
    name: 'Meteors',
    description: 'Meteors streaming across the screen',
    type: 'animation',
    background: {
      id: 'meteors',
      type: 'animation',
      animation: {
        id: 'meteors',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  mountains: {
    id: 'mountains',
    name: 'Mountains',
    description: "Bird's eye view of green mountains",
    type: 'image',
    background: {
      id: 'mountains',
      type: 'image',
      image: {
        id: 'mountains',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80'
      }
    }
  },
  noise: {
    id: 'noise',
    name: 'Noise',
    description: 'Animated noise background',
    type: 'animation',
    background: {
      id: 'noise',
      type: 'animation',
      animation: {
        id: 'noise',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Underwater view from the ocean',
    type: 'image',
    background: {
      id: 'ocean',
      type: 'image',
      image: {
        id: 'ocean',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80'
      }
    }
  },
  particles: {
    id: 'particles',
    name: 'Particles',
    description: 'Particles animation background',
    type: 'animation',
    background: {
      id: 'particles',
      type: 'animation',
      animation: {
        id: 'particles',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'rain-drops': {
    id: 'rain-drops',
    name: 'Rain Drops',
    description: 'Raindrops falling from the sky',
    type: 'animation',
    background: {
      id: 'rain-drops',
      type: 'animation',
      animation: {
        id: 'rain-drops',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'shooting-stars': {
    id: 'shooting-stars',
    name: 'Shooting Stars',
    description: 'Lucy in the sky with diamonds',
    type: 'animation',
    background: {
      id: 'shooting-stars',
      type: 'animation',
      animation: {
        id: 'shooting-stars',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'southern-lights': {
    id: 'southern-lights',
    name: 'Southern Lights',
    description: 'Southern lights in the night sky',
    type: 'animation',
    background: {
      id: 'southern-lights',
      type: 'animation',
      animation: {
        id: 'southern-lights',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  sparkles: {
    id: 'sparkles',
    name: 'Sparkles',
    description: 'Sparkles animation background',
    type: 'animation',
    background: {
      id: 'sparkles',
      type: 'animation',
      animation: {
        id: 'sparkles',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  spotlight: {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'A spotlight background animation',
    type: 'animation',
    background: {
      id: 'spotlight',
      type: 'animation',
      animation: {
        id: 'spotlight',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  squares: {
    id: 'squares',
    name: 'Squares',
    description: 'Animated squares background',
    type: 'animation',
    background: {
      id: 'squares',
      type: 'animation',
      animation: {
        id: 'squares',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    description: 'The threads of fate on your desktop',
    type: 'animation',
    background: {
      id: 'threads',
      type: 'animation',
      animation: {
        id: 'threads',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  vortex: {
    id: 'vortex',
    name: 'Vortex',
    description: 'Particle vortex animation',
    type: 'animation',
    background: {
      id: 'vortex',
      type: 'animation',
      animation: {
        id: 'vortex',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    description: 'Trippy optical illusion animation',
    type: 'animation',
    background: {
      id: 'waves',
      type: 'animation',
      animation: {
        id: 'waves',
        type: 'reactbits'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  // 'wavy-background': {
  //   id: 'wavy-background',
  //   name: 'Wavy Background',
  //   description: 'Animated wavy background',
  //   type: 'animation',
  //   background: {
  //     id: 'wavy-background',
  //     type: 'animation',
  //     animation: {
  //       id: 'wavy-background',
  //       type: 'aceternity'
  //     },
  //     gradient: {
  //       id: 'default',
  //       gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
  //       type: 'linear'
  //     }
  //   }
  // },
  'wavy-lines': {
    id: 'wavy-lines',
    name: 'Wavy Lines',
    description: 'Lines that animate in a wave pattern',
    type: 'animation',
    background: {
      id: 'wavy-lines',
      type: 'animation',
      animation: {
        id: 'background-lines',
        type: 'aceternity'
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Clean workspace desktop',
    type: 'image',
    background: {
      id: 'workspace',
      type: 'image',
      image: {
        id: 'workspace',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80'
      }
    }
  }
  // 'world-map': {
  //   id: 'world-map',
  //   name: 'World Map',
  //   description: 'World map background with animated lines',
  //   type: 'animation',
  //   background: {
  //     id: 'world-map',
  //     type: 'animation',
  //     animation: {
  //       id: 'world-map',
  //       type: 'aceternity'
  //     },
  //     gradient: {
  //       id: 'default',
  //       gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
  //       type: 'linear'
  //     }
  //   }
  // }
};

export default wallpaperPresets;
