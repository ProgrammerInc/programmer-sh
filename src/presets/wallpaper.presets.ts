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
    description: 'A photo of an alley at night',
    type: 'image',
    background: {
      id: 'alley',
      type: 'image',
      image: {
        id: 'alley',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1565700430899-1c56a5cf64e3?auto=format&fit=crop&q=80'
      }
    }
  },
  andromeda: {
    id: 'andromeda',
    name: 'Andromeda',
    description: 'A view of the Andromeda galaxy',
    type: 'image',
    background: {
      id: 'andromeda',
      type: 'image',
      image: {
        id: 'andromeda',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1604423203943-54721eff418a?auto=format&fit=crop&q=80'
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
  austin: {
    id: 'austin',
    name: 'Austin',
    description: 'A view of the Austin skyline',
    type: 'image',
    background: {
      id: 'austin',
      type: 'image',
      image: {
        id: 'austin',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&q=80'
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
      },
      image: {
        id: 'arcade',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80'
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
  'binary-heart': {
    id: 'binary-heart',
    name: 'Binary Heart',
    description: 'A heart wallpaper made from binary code',
    type: 'image',
    background: {
      id: 'binary-heart',
      type: 'image',
      image: {
        id: 'binary-heart',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&q=80'
      }
    }
  },
  boombox: {
    id: 'boombox',
    name: 'Boombox',
    description: '',
    type: 'image',
    background: {
      id: 'boombox',
      type: 'image',
      image: {
        id: 'boombox',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&q=80'
      }
    }
  },
  camaro: {
    id: 'camaro',
    name: 'Camaro',
    description: 'A photo of a Blue &amp; Black Chevrolet Camaro in the desert',
    type: 'image',
    background: {
      id: 'camaro',
      type: 'image',
      image: {
        id: 'camaro',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80'
      }
    }
  },
  'cassette-tapes': {
    id: 'cassette-tapes',
    name: 'Cassette Tapes',
    description: 'A wallpaper of audio cassette tapes',
    type: 'image',
    background: {
      id: 'cassette-tapes',
      type: 'image',
      image: {
        id: 'cassette-tapes',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1605731414532-6b26976cc153?auto=format&fit=crop&q=80'
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
  colorado: {
    id: 'colorado',
    name: 'Colorado',
    description: 'A view of the Rockies in Colorado',
    type: 'image',
    background: {
      id: 'colorado',
      type: 'image',
      image: {
        id: 'colorado',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1524429656589-6633a470097c?auto=format&fit=crop&q=80'
      }
    }
  },
  concert: {
    id: 'concert',
    name: 'Concert',
    description: 'A photo of a concert',
    type: 'image',
    background: {
      id: 'concert',
      type: 'image',
      image: {
        id: 'concert',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80'
      }
    }
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas',
    description: 'A view of the Dallas skyline',
    type: 'image',
    background: {
      id: 'dallas',
      type: 'image',
      image: {
        id: 'dallas',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1625950019503-cae6a7825762?auto=format&fit=crop&q=80'
      }
    }
  },
  'disc-jockey': {
    id: 'disc-jockey',
    name: 'Disc Jockey',
    description: 'A close-up photo of a Disc Jockey playing turntables',
    type: 'image',
    background: {
      id: 'disc-jockey',
      type: 'image',
      image: {
        id: 'disc-jockey',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80'
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
  eclipse: {
    id: 'eclipse',
    name: 'Eclipse',
    description: 'A solar eclipse',
    type: 'image',
    background: {
      id: 'eclipse',
      type: 'image',
      image: {
        id: 'eclipse',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1529788295308-1eace6f67388?auto=format&fit=crop&q=80'
      }
    }
  },
  earth: {
    id: 'earth',
    name: 'Earth',
    description: 'A view of the Earth from space',
    type: 'image',
    background: {
      id: 'earth',
      type: 'image',
      colors: [
        {
          id: 'default',
          color: '#000000',
          type: 'hex'
        }
      ],
      image: {
        id: 'earth',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80'
      }
    }
  },
  ferrari: {
    id: 'ferrari',
    name: 'Ferrari',
    description: 'The tail light of a Ferrari 458 on the streets of London',
    type: 'image',
    background: {
      id: 'ferrari',
      type: 'image',
      image: {
        id: 'ferrari',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80'
      }
    }
  },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy forest in the early morning',
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
  'glass-orb': {
    id: 'glass-orb',
    name: 'Glass Orb',
    description: 'A glass orb reflecting colorful light',
    type: 'image',
    background: {
      id: 'glass-orb',
      type: 'image',
      image: {
        id: 'glass-orb',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?auto=format&fit=crop&q=80'
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
        id: 'tokyo',
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
  guitar: {
    id: 'guitar',
    name: 'Guitar',
    description: 'A guitarist playing his guitar',
    type: 'image',
    background: {
      id: 'guitar',
      type: 'image',
      image: {
        id: 'guitar',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1579797990768-555ac3a4c7e5?auto=format&fit=crop&q=80'
      }
    }
  },
  'home-studio': {
    id: 'home-studio',
    name: 'Home Studio',
    description: 'A view of a home studio',
    type: 'image',
    background: {
      id: 'home-studio',
      type: 'image',
      image: {
        id: 'home-studio',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80'
      }
    }
  },
  houston: {
    id: 'houston',
    name: 'Houston',
    description: 'A view of the Houston skyline',
    type: 'image',
    background: {
      id: 'houston',
      type: 'image',
      image: {
        id: 'houston',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1692154600992-463fa9b27abd?auto=format&fit=crop&q=80'
      }
    }
  },
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
        url: 'https://images.unsplash.com/photo-1588032786045-59cefda005c0?auto=format&fit=crop&q=80'
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
  lamborghini: {
    id: 'lamborghini',
    name: 'Lamborghini',
    description: 'A photo of a Lamborghini in the desert',
    type: 'image',
    background: {
      id: 'lamborghini',
      type: 'image',
      image: {
        id: 'lamborghini',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&q=80'
      }
    }
  },
  leopard: {
    id: 'leopard',
    name: 'Leopard',
    description: 'A grayscale photo of a majestic leopard',
    type: 'image',
    background: {
      id: 'leopard',
      type: 'image',
      image: {
        id: 'leopard',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&q=80'
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
  macbook: {
    id: 'macbook',
    name: 'Macbook',
    description: 'A colorful photo of an Apple Macbook computer',
    type: 'image',
    background: {
      id: 'macbook',
      type: 'image',
      image: {
        id: 'macbook',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80'
      }
    }
  },
  'machu-pichu': {
    id: 'machu-pichu',
    name: 'Machu Pichu',
    description: 'A view of the Machu Pichu ruins',
    type: 'image',
    background: {
      id: 'machu-pichu',
      type: 'image',
      image: {
        id: 'machu-pichu',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80'
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
  mclaren: {
    id: 'mclaren',
    name: 'Mclaren P1',
    description: 'A photo of a McLaren P1 in action',
    type: 'image',
    background: {
      id: 'mclaren',
      type: 'image',
      image: {
        id: 'mclaren',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1555532686-d0fccaccadcf?auto=format&fit=crop&q=80'
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
      image: {
        id: 'starry-night',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&q=80'
      }
    }
  },
  mexico: {
    id: 'mexico',
    name: 'Mexico',
    description: 'A view of a lively Mexican street',
    type: 'image',
    background: {
      id: 'mexico',
      type: 'image',
      image: {
        id: 'mexico',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&q=80'
      }
    }
  },
  microphone: {
    id: 'microphone',
    name: 'Microphone',
    description: 'A close-up image of a microphone with bokeh lights',
    type: 'image',
    background: {
      id: 'microphone',
      type: 'image',
      image: {
        id: 'microphone',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80'
      }
    }
  },
  'milky-way': {
    id: 'milky-way',
    name: 'Milky Way',
    description: 'A view of the Milky Way galaxy',
    type: 'image',
    background: {
      id: 'milky-way',
      type: 'image',
      image: {
        id: 'milky-way',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&q=80'
      }
    }
  },
  mixer: {
    id: 'mixer',
    name: 'Mixer',
    description: 'A close-up photo of a music recording mixer',
    type: 'image',
    background: {
      id: 'mixer',
      type: 'image',
      image: {
        id: 'mixer',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&q=80'
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
  music: {
    id: 'music',
    name: 'Music',
    description: 'A wall covered with vinyl records',
    type: 'image',
    background: {
      id: 'music',
      type: 'image',
      image: {
        id: 'music',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?auto=format&fit=crop&q=80'
      }
    }
  },
  mustang: {
    id: 'mustang',
    name: 'Mustang',
    description: 'A photo of a 1972 Ford Mustang Mach 1 on asphalt road',
    type: 'image',
    background: {
      id: 'mustang',
      type: 'image',
      image: {
        id: 'mustang',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80'
      }
    }
  },
  'new-york': {
    id: 'new-york',
    name: 'New York',
    description: 'A view of the New York skyline',
    type: 'image',
    background: {
      id: 'new-york',
      type: 'image',
      image: {
        id: 'new-york',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?auto=format&fit=crop&q=80'
      }
    }
  },
  nintendo: {
    id: 'nintendo',
    name: 'Nintendo Switch',
    description: 'A close-up image of a Nintendo Switch Console',
    type: 'image',
    background: {
      id: 'nintendo',
      type: 'image',
      image: {
        id: 'nintendo',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1612036781124-847f8939b154?auto=format&fit=crop&q=80'
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
  piano: {
    id: 'piano',
    name: 'Piano',
    description: 'A close-up photo of a hand playing a piano',
    type: 'image',
    background: {
      id: 'piano',
      type: 'image',
      image: {
        id: 'piano',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1433622070098-754fdf81c929?auto=format&fit=crop&q=80'
      }
    }
  },
  playstation: {
    id: 'playstation',
    name: 'PlayStation Controller',
    description: 'A close-up image of a PlayStation controller',
    type: 'image',
    background: {
      id: 'playstation',
      type: 'image',
      image: {
        id: 'playstation',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1560369457-fb1181a7ac4c?auto=format&fit=crop&q=80'
      }
    }
  },
  porsche: {
    id: 'porsche',
    name: 'Porsche',
    description: 'A photo of a Black &amp; Gray Porsche 911 on asphalt',
    type: 'image',
    background: {
      id: 'porsche',
      type: 'image',
      image: {
        id: 'porsche',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1583427053896-00378e61e661?auto=format&fit=crop&q=80'
      }
    }
  },
  racing: {
    id: 'racing',
    name: 'Racing',
    description: 'A shot from the New Year’s Race on Circuit Zandvoort',
    type: 'image',
    background: {
      id: 'racing',
      type: 'image',
      image: {
        id: 'racing',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1547025603-ef800f02690e?auto=format&fit=crop&q=80'
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
  'recording-studio': {
    id: 'recording-studio',
    name: 'Recording Studio',
    description: 'A recording studio',
    type: 'image',
    background: {
      id: 'recording-studio',
      type: 'image',
      image: {
        id: 'recording-studio',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80'
      }
    }
  },
  'retro-gaming': {
    id: 'retro-gaming',
    name: 'Retro Gaming',
    description: 'A retro gaming background',
    type: 'image',
    background: {
      id: 'retro-gaming',
      type: 'image',
      image: {
        id: 'retro-gaming',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80'
      }
    }
  },
  'san-antonio': {
    id: 'san-antonio',
    name: 'San Antonio',
    description: 'A photo of the San Antonio river walk',
    type: 'image',
    background: {
      id: 'san-antonio',
      type: 'image',
      image: {
        id: 'san-antonio',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1579053301200-93b5ef0c0b3a?auto=format&fit=crop&q=80'
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
  'slot-machines': {
    id: 'slot-machines',
    name: 'Slot Machines',
    description: 'Neon lights of slot machines light up a dark room',
    type: 'image',
    background: {
      id: 'slot-machines',
      type: 'image',
      image: {
        id: 'slot-machines',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80'
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
  space: {
    id: 'space',
    name: 'Space',
    description: 'The view from the edge of outer space',
    type: 'image',
    background: {
      id: 'space',
      type: 'image',
      image: {
        id: 'space',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1534996858221-380b92700493?auto=format&fit=crop&q=80'
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
  'starry-night': {
    id: 'starry-night',
    name: 'Starry Night',
    description: 'A starry night background',
    type: 'image',
    background: {
      id: 'starry-night',
      type: 'image',
      image: {
        id: 'starry-night',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&q=80'
      }
    }
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    description: 'A view of the sunset',
    type: 'image',
    background: {
      id: 'sunset',
      type: 'image',
      image: {
        id: 'sunset',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1542159919831-40fb0656b45a?auto=format&fit=crop&q=80'
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
  'times-square': {
    id: 'times-square',
    name: 'Times Square',
    description: 'A view of Times Square at night',
    type: 'image',
    background: {
      id: 'times-square',
      type: 'image',
      image: {
        id: 'times-square',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80'
      }
    }
  },
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    description: 'A photo of an old Tokyo alley way',
    type: 'image',
    background: {
      id: 'tokyo',
      type: 'image',
      image: {
        id: 'tokyo',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
      }
    }
  },
  turntable: {
    id: 'turntable',
    name: 'Turntable',
    description: 'A close-up photo of a vinyl turntable',
    type: 'image',
    background: {
      id: 'turntable',
      type: 'image',
      image: {
        id: 'turntable',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&q=80'
      }
    }
  },
  underwater: {
    id: 'underwater',
    name: 'Underwater',
    description: 'Underwater view of the ocean',
    type: 'image',
    background: {
      id: 'underwater',
      type: 'image',
      image: {
        id: 'underwater',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80'
      }
    }
  },
  'vinyl-records': {
    id: 'vinyl-records',
    name: 'Vinyl Records',
    description: 'A close-up image of vinyl records',
    type: 'image',
    background: {
      id: 'vinyl-record',
      type: 'image',
      image: {
        id: 'vinyl-record',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1619983081593-e2ba5b543168?auto=format&fit=crop&q=80'
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
  },
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
  xbox: {
    id: 'xbox',
    name: 'Xbox Console',
    description: 'A close-up image of an Xbox One Series X console',
    type: 'image',
    background: {
      id: 'xbox',
      type: 'image',
      image: {
        id: 'xbox',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1621259182065-7bd8bbff1f20?auto=format&fit=crop&q=80'
      }
    }
  }
};

export default wallpaperPresets;
