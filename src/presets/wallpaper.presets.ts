/* eslint-disable no-secrets/no-secrets */
import { Wallpaper } from '@/components/ui/wallpaper';

// Default placeholder image URL for animations requiring an image source
const DEFAULT_ANIMATION_IMAGE_URL =
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80';

// Predefined wallpapers
export const wallpaperPresets: Record<string, Wallpaper> = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Default wallpaper',
    enabled: true,
    type: 'animation',
    background: {
      id: 'letter-glitch',
      type: 'animation',
      animation: {
        id: 'letter-glitch',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  ai: {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Mockup of an A.I. processor chip with gold traces',
    enabled: true,
    type: 'image',
    background: {
      id: 'ai',
      type: 'image',
      image: {
        id: 'ai',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1739036868260-c26b292cd85d?auto=format&fit=crop&q=80'
      }
    }
  },
  alley: {
    id: 'alley',
    name: 'Alley',
    description: 'A photo of an alley at night',
    enabled: true,
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
    enabled: true,
    type: 'image',
    background: {
      id: 'andromeda',
      type: 'image',
      image: {
        id: 'andromeda',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1736210811075-7509d5023a4a?auto=format&fit=crop&q=80'
      }
    }
  },
  apollo: {
    id: 'apollo',
    name: 'Apollo',
    description: 'Astronaut Buzz Aldrin on the lunar surface during the Apollo 11 mission',
    enabled: true,
    type: 'image',
    background: {
      id: 'apollo',
      type: 'image',
      image: {
        id: 'apollo',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&q=80'
      }
    }
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    description: 'An arcade filled with neon lights and machines',
    enabled: true,
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
  astronaut: {
    id: 'astronaut',
    name: 'Astronaut',
    description: 'An astronaut taking a selfie from space',
    enabled: true,
    type: 'image',
    background: {
      id: 'astronaut',
      type: 'image',
      image: {
        id: 'astronaut',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1447433909565-04bfc496fe73?auto=format&fit=crop&q=80'
      }
    }
  },
  atlanta: {
    id: 'atlanta',
    name: 'Atlanta',
    description: 'A view of the Atlanta skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'atlanta',
      type: 'image',
      image: {
        id: 'atlanta',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1606416357029-8cc2e025682e?auto=format&fit=crop&q=80'
      }
    }
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Aurora borealis in the night sky',
    enabled: true,
    type: 'animation',
    background: {
      id: 'aurora',
      type: 'animation',
      animation: {
        id: 'aurora',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  'aurora-canvas': {
    id: 'aurora-canvas',
    name: 'Aurora Canvas',
    description: 'Aurora borealis in the night sky',
    enabled: true,
    type: 'animation',
    background: {
      id: 'aurora-canvas',
      type: 'animation',
      animation: {
        id: 'aurora-canvas',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  austin: {
    id: 'austin',
    name: 'Austin',
    description: 'A view of the Austin skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'austin',
      type: 'image',
      image: {
        id: 'austin',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1531218150217-b08efd787d91?auto=format&fit=crop&q=80'
      }
    }
  },
  balatro: {
    id: 'balatro',
    name: 'Balatro',
    description: 'Balatro background animation',
    enabled: true,
    type: 'animation',
    background: {
      id: 'balatro',
      type: 'animation',
      animation: {
        id: 'balatro',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  ballpit: {
    id: 'ballpit',
    name: 'Ballpit',
    description: 'A ball pit of many colorful balls',
    enabled: true,
    type: 'animation',
    background: {
      id: 'ballpit',
      type: 'animation',
      animation: {
        id: 'ballpit',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      image: {
        id: 'arcade',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80'
      }
    }
  },
  'crazy-ballpit': {
    id: 'crazy-ballpit',
    name: 'Crazy Ballpit',
    description: 'A ball pit of many colorful balls',
    enabled: true,
    type: 'animation',
    background: {
      id: 'crazy-ballpit',
      type: 'animation',
      animation: {
        id: 'crazy-ballpit',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'image',
    background: {
      id: 'beach',
      type: 'image',
      image: {
        id: 'beach',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1507525428034-bc3fffca8bf4?auto=format&fit=crop&q=80'
      }
    }
  },
  'beam-portal': {
    id: 'beam-portal',
    name: 'Beam Portal',
    description: 'A portal of beams',
    enabled: true,
    type: 'animation',
    background: {
      id: 'beam-portal',
      type: 'animation',
      animation: {
        id: 'beam-portal',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'background-beams': {
    id: 'background-beams',
    name: 'Background Beams',
    description: 'Beams that animate in a wave pattern',
    enabled: true,
    type: 'animation',
    background: {
      id: 'background-beams',
      type: 'animation',
      animation: {
        id: 'background-beams',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  berlin: {
    id: 'berlin',
    name: 'Berlin',
    description: 'A view of the Berlin city skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'berlin',
      type: 'image',
      image: {
        id: 'berlin',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80'
      }
    }
  },
  'binary-heart': {
    id: 'binary-heart',
    name: 'Binary Heart',
    description: 'A heart wallpaper made from binary code',
    enabled: true,
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
  'black-cat': {
    id: 'black-cat',
    name: 'Black Cat',
    description: 'Macro photography of a black cat',
    enabled: true,
    type: 'image',
    background: {
      id: 'black-cat',
      type: 'image',
      image: {
        id: 'black-cat',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1503431128871-cd250803fa41?auto=format&fit=crop&q=80'
      }
    }
  },
  blackbird: {
    id: 'blackbird',
    name: 'SR-71 Blackbird',
    description: 'An ariel view of SR-71 Blackbird above snow-capped mountains',
    enabled: true,
    type: 'image',
    background: {
      id: 'blackbird',
      type: 'image',
      image: {
        id: 'blackbird',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614121174144-bd53a169780e?auto=format&fit=crop&q=80'
      }
    }
  },
  'blob-background': {
    id: 'blob-background',
    name: 'Blob Background',
    description: 'A blob background animation',
    enabled: true,
    type: 'animation',
    background: {
      id: 'blob-background',
      type: 'animation',
      animation: {
        id: 'blob-background',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  boombox: {
    id: 'boombox',
    name: 'Boombox',
    description: 'A person laying behind a vintage boombox',
    enabled: true,
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
  california: {
    id: 'california',
    name: 'California',
    description: 'A view of the Bixby Creek Bridge on Hwy 1 in California',
    enabled: true,
    type: 'image',
    background: {
      id: 'california',
      type: 'image',
      image: {
        id: 'california',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1578325413871-62d979ef9629?auto=format&fit=crop&q=80'
      }
    }
  },
  camaro: {
    id: 'camaro',
    name: 'Camaro',
    description: 'A photo of a Blue &amp; Black Chevrolet Camaro in the desert',
    enabled: true,
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
  camping: {
    id: 'camping',
    name: 'Camping',
    description: 'A photo of a dog sitting in front of a campfire',
    enabled: true,
    type: 'image',
    background: {
      id: 'camping',
      type: 'image',
      image: {
        id: 'camping',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1520869422133-f2ac1279d8b4?auto=format&fit=crop&q=80'
      }
    }
  },
  'cassette-tapes': {
    id: 'cassette-tapes',
    name: 'Cassette Tapes',
    description: 'A wallpaper of audio cassette tapes',
    enabled: true,
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
  charlotte: {
    id: 'charlotte',
    name: 'Charlotte',
    description: 'A view of the Charlotte city skyline at sunset',
    enabled: true,
    type: 'image',
    background: {
      id: 'charlotte',
      type: 'image',
      image: {
        id: 'charlotte',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1507810670121-b8472da7d918?auto=format&fit=crop&q=80'
      }
    }
  },
  chicago: {
    id: 'chicago',
    name: 'Chicago',
    description: 'A view of the Chicago city skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'chicago',
      type: 'image',
      image: {
        id: 'chicago',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1581373449483-37449f962b6c?auto=format&fit=crop&q=80'
      }
    }
  },
  'circuit-board': {
    id: 'circuit-board',
    name: 'Circuit Board',
    description: 'PCB circuit board of electronic device',
    enabled: true,
    type: 'image',
    background: {
      id: 'circuit-board',
      type: 'image',
      image: {
        id: 'circuit-board',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80'
      }
    }
  },
  code: {
    id: 'code',
    name: 'Code',
    description: 'Colorful code on a computer monitor',
    enabled: true,
    type: 'image',
    background: {
      id: 'code',
      type: 'image',
      image: {
        id: 'code',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1533709752211-489689fd1ca8?auto=format&fit=crop&q=80'
      }
    }
  },
  colorado: {
    id: 'colorado',
    name: 'Colorado',
    description: 'A view of the Rockies in Colorado',
    enabled: true,
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
    enabled: true,
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
  continents: {
    id: 'continents',
    name: 'Continents',
    description: 'A Flat Earth view of the continents from space with clouds',
    enabled: true,
    type: 'image',
    background: {
      id: 'continents',
      type: 'image',
      image: {
        id: 'continents',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614728672820-e88260ce6d0d?auto=format&fit=crop&q=80'
      }
    }
  },
  'cosmic-scene': {
    id: 'cosmic-scene',
    name: 'Cosmic Scene',
    description: 'A view of the cosmic scene',
    enabled: true,
    type: 'animation',
    background: {
      id: 'cosmic-scene',
      type: 'animation',
      animation: {
        id: 'cosmic-scene',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas',
    description: 'A view of the Dallas skyline',
    enabled: true,
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
  denver: {
    id: 'denver',
    name: 'Denver',
    description: 'A view of the Denver skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'denver',
      type: 'image',
      image: {
        id: 'denver',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1602800458591-eddda28a498b?auto=format&fit=crop&q=80'
      }
    }
  },
  'disc-jockey': {
    id: 'disc-jockey',
    name: 'Disc Jockey',
    description: 'A close-up photo of a Disc Jockey playing turntables',
    enabled: true,
    type: 'image',
    background: {
      id: 'disc-jockey',
      type: 'image',
      image: {
        id: 'disc-jockey',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?auto=format&fit=crop&q=80'
      }
    }
  },
  drummer: {
    id: 'drummer',
    name: 'Drummer',
    description: 'A drummer playing drums',
    enabled: true,
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
  dubai: {
    id: 'dubai',
    name: 'Dubai',
    description: 'A view of the Dubai skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'dubai',
      type: 'image',
      image: {
        id: 'dubai',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?auto=format&fit=crop&q=80'
      }
    }
  },
  eclipse: {
    id: 'eclipse',
    name: 'Eclipse',
    description: 'A solar eclipse',
    enabled: true,
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
    description: 'A photo of Earth from space taken by NASA',
    enabled: true,
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
  earthrise: {
    id: 'earthrise',
    name: 'Earthrise',
    description: 'The rising Earth greeted the Apollo 8 astronauts on December 24, 1968',
    enabled: true,
    type: 'image',
    background: {
      id: 'earthrise',
      type: 'image',
      image: {
        id: 'earthrise',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80'
      }
    }
  },
  'face-paint': {
    id: 'face-paint',
    name: 'Face Paint',
    description: 'A face painted in glow-in-the-dark neon colors',
    enabled: true,
    type: 'image',
    background: {
      id: 'face-paint',
      type: 'image',
      image: {
        id: 'face-paint',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1485796826113-f38b88d97147?auto=format&fit=crop&q=80'
      }
    }
  },
  ferrari: {
    id: 'ferrari',
    name: 'Ferrari',
    description: 'The tail light of a Ferrari 458 on the streets of London',
    enabled: true,
    type: 'image',
    background: {
      id: 'ferrari',
      type: 'image',
      image: {
        id: 'ferrari',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&q=80'
      }
    }
  },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy forest in the early morning',
    enabled: true,
    type: 'image',
    background: {
      id: 'fog',
      type: 'image',
      image: {
        id: 'fog',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1578147063111-9bc0b252726f?auto=format&fit=crop&q=80'
      }
    }
  },
  'for-all-mankind': {
    id: 'for-all-mankind',
    name: 'For All Mankind',
    description: 'A photo of a footprint on lunar regolith from Apollo 11',
    enabled: true,
    type: 'image',
    background: {
      id: 'for-all-mankind',
      type: 'image',
      image: {
        id: 'for-all-mankind',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614314266357-8a2e58059af5?auto=format&fit=crop&q=80'
      }
    }
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    description: 'A dirt road leading into a dense forest',
    enabled: true,
    type: 'image',
    background: {
      id: 'forest',
      type: 'image',
      image: {
        id: 'forest',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?auto=format&fit=crop&q=80'
      }
    }
  },
  'garden-of-gods': {
    id: 'garden-of-gods',
    name: 'Garden of Gods',
    description: 'Photo of the night sky and the milky way from the Garden of the Gods',
    enabled: true,
    type: 'image',
    background: {
      id: 'garden-of-gods',
      type: 'image',
      image: {
        id: 'garden-of-gods',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1637278643503-3a49c91b7000?auto=format&fit=crop&q=80'
      }
    }
  },
  gear: {
    id: 'gear',
    name: 'Gear',
    description: 'A photo of military gear and equipment',
    enabled: true,
    type: 'image',
    background: {
      id: 'gear',
      type: 'image',
      image: {
        id: 'gear',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1713648129187-806efa50163b?auto=format&fit=crop&q=80'
      }
    }
  },
  'glass-orb': {
    id: 'glass-orb',
    name: 'Glass Orb',
    description: 'A glass orb reflecting colorful light',
    enabled: true,
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
  glasses: {
    id: 'glasses',
    name: 'Glasses',
    description: 'A pair of glasses on a desk in front of computer monitors',
    enabled: true,
    type: 'image',
    background: {
      id: 'glasses',
      type: 'image',
      image: {
        id: 'glasses',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80'
      }
    }
  },
  globe: {
    id: 'globe',
    name: 'Globe',
    description: 'A globe of the world',
    enabled: false,
    type: 'animation',
    background: {
      id: 'globe',
      type: 'animation',
      animation: {
        id: 'globe',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  'golden-gate': {
    id: 'golden-gate',
    name: 'Golden Gate',
    description: 'Photo of the Golden Gate Bridge in San Francisco, California',
    enabled: true,
    type: 'image',
    background: {
      id: 'golden-gate',
      type: 'image',
      image: {
        id: 'golden-gate',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80'
      }
    }
  },
  gradient: {
    id: 'gradient',
    name: 'Gradient',
    description: 'A simple gradient background',
    enabled: true,
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'gradient-animation',
      type: 'animation',
      animation: {
        id: 'gradient-animation',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  'gradient-mesh': {
    id: 'gradient-mesh',
    name: 'Gradient Mesh',
    description: 'A gradient mesh background',
    enabled: true,
    type: 'animation',
    background: {
      id: 'gradient-mesh',
      type: 'animation',
      animation: {
        id: 'gradient-mesh',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'grid-distortion': {
    id: 'grid-distortion',
    name: 'Grid Distortion',
    description: 'A twisted grid of tiles flipping and rotating',
    enabled: true,
    type: 'animation',
    background: {
      id: 'grid-distortion',
      type: 'animation',
      animation: {
        id: 'grid-distortion',
        type: 'reactbits',
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80'
      },
      image: {
        id: 'tokyo',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
      }
    }
  },
  'grid-motion': {
    id: 'grid-motion',
    name: 'Grid Motion',
    description: 'Animated grid of moving elements',
    enabled: false,
    type: 'animation',
    background: {
      id: 'grid-motion',
      type: 'animation',
      animation: {
        id: 'grid-motion',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  'grid-pattern': {
    id: 'grid-pattern',
    name: 'Grid Pattern',
    description: 'A grid of repeating patterns',
    enabled: true,
    type: 'animation',
    background: {
      id: 'grid-pattern',
      type: 'animation',
      animation: {
        id: 'grid-pattern',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  guitar: {
    id: 'guitar',
    name: 'Guitar',
    description: 'A guitarist playing his guitar',
    enabled: true,
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
    enabled: true,
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
  'hong-kong': {
    id: 'hong-kong',
    name: 'Hong Kong',
    description: 'A view of the Hong Kong skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'hong-kong',
      type: 'image',
      image: {
        id: 'hong-kong',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1536599018102-9bc0b252726f?auto=format&fit=crop&q=80'
      }
    }
  },
  houston: {
    id: 'houston',
    name: 'Houston',
    description: 'A view of the Houston skyline',
    enabled: true,
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
  html: {
    id: 'html',
    name: 'HTML',
    description: 'A wallpaper of website HTML code',
    enabled: true,
    type: 'image',
    background: {
      id: 'html',
      type: 'image',
      image: {
        id: 'html',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80'
      }
    }
  },
  hummingbird: {
    id: 'hummingbird',
    name: 'Hummingbird',
    description: 'Hummingbird approaching a bird feeder',
    enabled: true,
    type: 'image',
    background: {
      id: 'hummingbird',
      type: 'image',
      image: {
        id: 'hummingbird',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1729547846218-bd20bc595fd2?auto=format&fit=crop&q=80'
      }
    }
  },
  hurricane: {
    id: 'hurricane',
    name: 'Hurricane',
    description: 'A giant hurricane as seen from space',
    enabled: true,
    type: 'image',
    background: {
      id: 'hurricane',
      type: 'image',
      image: {
        id: 'hurricane',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1457327289196-f38b88d97147?auto=format&fit=crop&q=80'
      }
    }
  },
  'hyperspace-hero': {
    id: 'hyperspace-hero',
    name: 'Hyperspace Hero',
    description: 'A hero animation background',
    enabled: true,
    type: 'animation',
    background: {
      id: 'hyperspace-hero',
      type: 'animation',
      animation: {
        id: 'hyperspace-hero',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  hyperspeed: {
    id: 'hyperspeed',
    name: 'Hyperspeed',
    description: 'Streams of light race across the screen',
    enabled: true,
    type: 'animation',
    background: {
      id: 'hyperspeed',
      type: 'animation',
      animation: {
        id: 'hyperspeed',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'iridescence',
      type: 'animation',
      animation: {
        id: 'iridescence',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  iss: {
    id: 'iss',
    name: 'ISS',
    description: 'The International Space Station orbiting the Earth',
    enabled: true,
    type: 'image',
    background: {
      id: 'iss',
      type: 'image',
      image: {
        id: 'iss',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614314007212-0257d6e2f7d8?auto=format&fit=crop&q=80'
      }
    }
  },
  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'Jupiter as seen from the Hubble Space Telescope',
    enabled: true,
    type: 'image',
    background: {
      id: 'jupiter',
      type: 'image',
      image: {
        id: 'jupiter',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614314169000-4cf229a1db33?auto=format&fit=crop&q=80'
      }
    }
  },
  lamborghini: {
    id: 'lamborghini',
    name: 'Lamborghini',
    description: 'A photo of a Lamborghini in the desert',
    enabled: true,
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
  'las-vegas': {
    id: 'las-vegas',
    name: 'Las Vegas',
    description: 'A view of the Las Vegas skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'las-vegas',
      type: 'image',
      image: {
        id: 'las-vegas',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1581351721010-8ec5e12e42dd?auto=format&fit=crop&q=80'
      }
    }
  },
  leopard: {
    id: 'leopard',
    name: 'Leopard',
    description: 'A grayscale photo of a majestic leopard',
    enabled: true,
    type: 'image',
    background: {
      id: 'leopard',
      type: 'image',
      image: {
        id: 'leopard',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80'
      }
    }
  },
  'letter-glitch': {
    id: 'letter-glitch',
    name: 'Letter Glitch',
    description: "There's a glitch in the matrix",
    enabled: true,
    type: 'animation',
    background: {
      id: 'letter-glitch',
      type: 'animation',
      animation: {
        id: 'letter-glitch',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  lightning: {
    id: 'lightning',
    name: 'Lightning',
    description: 'Lightning across in the sky',
    enabled: true,
    type: 'animation',
    background: {
      id: 'lightning',
      type: 'animation',
      animation: {
        id: 'lightning',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  'liquid-chrome': {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    description: 'Purples waves of liquid metal',
    enabled: true,
    type: 'animation',
    background: {
      id: 'liquid-chrome',
      type: 'animation',
      animation: {
        id: 'liquid-chrome',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      }
    }
  },
  'little-boxes': {
    id: 'little-boxes',
    name: 'Little Boxes',
    description: 'Boxes that change color with mouse movement',
    enabled: true,
    type: 'animation',
    background: {
      id: 'little-boxes',
      type: 'animation',
      animation: {
        id: 'background-boxes',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  london: {
    id: 'london',
    name: 'London',
    description: 'A view of the London city skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'london',
      type: 'image',
      image: {
        id: 'london',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&q=80'
      }
    }
  },
  'los-angeles': {
    id: 'los-angeles',
    name: 'Los Angeles',
    description: 'A view of the Los Angeles city skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'los-angeles',
      type: 'image',
      image: {
        id: 'los-angeles',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1444723121867-91d2c3bd3d45?auto=format&fit=crop&q=80'
      }
    }
  },
  macbook: {
    id: 'macbook',
    name: 'Macbook',
    description: 'A colorful photo of an Apple Macbook computer',
    enabled: true,
    type: 'image',
    background: {
      id: 'macbook',
      type: 'image',
      image: {
        id: 'macbook',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1517336714731-bb934ecdc4ec?auto=format&fit=crop&q=80'
      }
    }
  },
  'machu-pichu': {
    id: 'machu-pichu',
    name: 'Machu Pichu',
    description: 'A view of the Machu Pichu ruins',
    enabled: true,
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'magnet-lines',
      type: 'animation',
      animation: {
        id: 'magnet-lines',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  manhatten: {
    id: 'manhatten',
    name: 'Manhatten',
    description: 'On top of the world, Manhatten from outer space at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'manhatten',
      type: 'image',
      image: {
        id: 'manhatten',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80'
      }
    }
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    description:
      'A simulated view of Mars as it would be seen from the Mars Global Surveyor spacecraft',
    enabled: true,
    type: 'image',
    background: {
      id: 'mars',
      type: 'image',
      image: {
        id: 'mars',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80'
      }
    }
  },
  mclaren: {
    id: 'mclaren',
    name: 'Mclaren P1',
    description: 'A photo of a McLaren P1 in action',
    enabled: true,
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
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    description: "Mariner 10's first image of Mercury from 3 million+ miles",
    enabled: true,
    type: 'image',
    background: {
      id: 'mercury',
      type: 'image',
      image: {
        id: 'mercury',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614724723656-457e78e0b50b?auto=format&fit=crop&q=80'
      }
    }
  },
  'mesh-matrix': {
    id: 'mesh-matrix',
    name: 'Mesh Matrix',
    description: 'A mesh matrix background animation',
    enabled: false,
    type: 'animation',
    background: {
      id: 'mesh-matrix',
      type: 'animation',
      animation: {
        id: 'mesh-matrix',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'meteors',
      type: 'animation',
      animation: {
        id: 'meteors',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      image: {
        id: 'starry-night',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&q=80'
      }
    }
  },
  'mexico-city': {
    id: 'mexico-city',
    name: 'Mexico City',
    description: 'A view of the Mexican City skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'mexico-city',
      type: 'image',
      image: {
        id: 'mexico-city',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1601585144584-2a53183be14c?auto=format&fit=crop&q=80'
      }
    }
  },
  miami: {
    id: 'miami',
    name: 'Miami',
    description: 'A view of Miami at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'miami',
      type: 'image',
      image: {
        id: 'miami',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1530686577637-775e3e82c7db?auto=format&fit=crop&q=80'
      }
    }
  },
  microphone: {
    id: 'microphone',
    name: 'Microphone',
    description: 'A close-up image of a microphone with bokeh lights',
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
  moon: {
    id: 'moon',
    name: 'Moon',
    description: 'A photo of a Moon crater close-up',
    enabled: true,
    type: 'image',
    background: {
      id: 'moon',
      type: 'image',
      image: {
        id: 'moon',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&q=80'
      }
    }
  },
  'moon-buggy': {
    id: 'moon-buggy',
    name: 'Moon Buggy',
    description: 'Apollo 17 astronaut Gene Cernan on a lunar rover in 1972',
    enabled: true,
    type: 'image',
    background: {
      id: 'moon-buggy',
      type: 'image',
      image: {
        id: 'moon-buggy',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614315517650-3771cf72d18a?auto=format&fit=crop&q=80'
      }
    }
  },
  motherboard: {
    id: 'motherboard',
    name: 'Motherboard',
    description: 'Macro photography of a laptop motherboard',
    enabled: true,
    type: 'image',
    background: {
      id: 'motherboard',
      type: 'image',
      image: {
        id: 'motherboard',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'
      }
    }
  },
  mountains: {
    id: 'mountains',
    name: 'Mountains',
    description: "Bird's eye view of green mountains",
    enabled: true,
    type: 'image',
    background: {
      id: 'mountains',
      type: 'image',
      image: {
        id: 'mountains',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1454496522488-43490279c0fa?auto=format&fit=crop&q=80'
      }
    }
  },
  music: {
    id: 'music',
    name: 'Music',
    description: 'A wall covered with vinyl records',
    enabled: true,
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
    enabled: true,
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
  nasa: {
    id: 'nasa',
    name: 'NASA',
    description: 'NASA Kennedy Space Center in Cape Canaveral, Florida',
    enabled: true,
    type: 'image',
    background: {
      id: 'nasa',
      type: 'image',
      image: {
        id: 'nasa',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614728611996-806169502cf1?auto=format&fit=crop&q=80'
      }
    }
  },
  nashville: {
    id: 'nashville',
    name: 'Nashville',
    description: 'A view of the Nashville skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'nashville',
      type: 'image',
      image: {
        id: 'nashville',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1545419913-775e3e82c7db?auto=format&fit=crop&q=80'
      }
    }
  },
  nebula: {
    id: 'nebula',
    name: 'Carina Nebula',
    description: 'Carina Nebula located in the Carina&hyphen;Sagittarius Arm of the Milky Way',
    enabled: true,
    type: 'image',
    background: {
      id: 'nebula',
      type: 'image',
      image: {
        id: 'nebula',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&q=80'
      }
    }
  },
  neptune: {
    id: 'neptune',
    name: 'Neptune',
    description: 'Neptune as seen from Voyager II in 1989',
    enabled: true,
    type: 'image',
    background: {
      id: 'neptune',
      type: 'image',
      image: {
        id: 'neptune',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&q=80'
      }
    }
  },
  'new-york': {
    id: 'new-york',
    name: 'New York',
    description: 'A view of the New York skyline',
    enabled: true,
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
    enabled: true,
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'noise',
      type: 'animation',
      animation: {
        id: 'noise',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  orlando: {
    id: 'orlando',
    name: 'Orlando',
    description: 'A view of the Orlando skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'orlando',
      type: 'image',
      image: {
        id: 'orlando',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1532375672241-878084a41e96?auto=format&fit=crop&q=80'
      }
    }
  },
  'outer-space': {
    id: 'outer-space',
    name: 'Outer Space',
    description: 'A photo of earth from outer space at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'outer-space',
      type: 'image',
      image: {
        id: 'outer-space',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1454496522488-43490279c0fa?auto=format&fit=crop&q=80'
      }
    }
  },
  paris: {
    id: 'paris',
    name: 'Paris',
    description: 'A view of the Paris skyline with the Eiffel Tower at sunset',
    enabled: true,
    type: 'image',
    background: {
      id: 'paris',
      type: 'image',
      image: {
        id: 'paris',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1605701877331-645ad05dcb97?auto=format&fit=crop&q=80'
      }
    }
  },
  'particle-network': {
    id: 'particle-network',
    name: 'Particle Network',
    description: 'A particle network animation background',
    enabled: true,
    type: 'animation',
    background: {
      id: 'particle-network',
      type: 'animation',
      animation: {
        id: 'particle-network',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'particles',
      type: 'animation',
      animation: {
        id: 'particles',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'particle-veil': {
    id: 'particle-veil',
    name: 'Particle Veil',
    description: 'A particle veil animation background',
    enabled: true,
    type: 'animation',
    background: {
      id: 'particle-veil',
      type: 'animation',
      animation: {
        id: 'particle-veil',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  party: {
    id: 'party',
    name: 'Party',
    description: 'A colorful party background',
    enabled: true,
    type: 'image',
    background: {
      id: 'party',
      type: 'image',
      image: {
        id: 'party',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80'
      }
    }
  },
  peak: {
    id: 'peak',
    name: 'Peak',
    description: 'Parco Naturale Tre Cime Mountain Peak in Italy',
    enabled: true,
    type: 'image',
    background: {
      id: 'peak',
      type: 'image',
      image: {
        id: 'peak',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1740507619572-ac180ca2630f?auto=format&fit=crop&q=80'
      }
    }
  },
  philadelphia: {
    id: 'philadelphia',
    name: 'Philadelphia',
    description: 'Early morning in the city of brotherly love, Philadelphia, Pennsylvania',
    enabled: true,
    type: 'image',
    background: {
      id: 'philadelphia',
      type: 'image',
      image: {
        id: 'philadelphia',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?auto=format&fit=crop&q=80'
      }
    }
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix',
    description: 'A view of the Phoenix skyline at sunset',
    enabled: true,
    type: 'image',
    background: {
      id: 'phoenix',
      type: 'image',
      image: {
        id: 'phoenix',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1616474648384-9e956216d1b7?auto=format&fit=crop&q=80'
      }
    }
  },
  piano: {
    id: 'piano',
    name: 'Piano',
    description: 'A close-up photo of a hand playing a piano',
    enabled: true,
    type: 'image',
    background: {
      id: 'piano',
      type: 'image',
      image: {
        id: 'piano',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1433622070098-36695c8771bd?auto=format&fit=crop&q=80'
      }
    }
  },
  playstation: {
    id: 'playstation',
    name: 'PlayStation Controller',
    description: 'A close-up image of a PlayStation controller',
    enabled: true,
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
  pluto: {
    id: 'pluto',
    name: 'Pluto',
    description: 'Pluto as seen from the New Horizons spacecraft in 2015',
    enabled: true,
    type: 'image',
    background: {
      id: 'pluto',
      type: 'image',
      image: {
        id: 'pluto',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?auto=format&fit=crop&q=80'
      }
    }
  },
  porsche: {
    id: 'porsche',
    name: 'Porsche',
    description: 'A photo of a Black &amp; Gray Porsche 911 on asphalt',
    enabled: true,
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
    enabled: true,
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'rain-drops',
      type: 'animation',
      animation: {
        id: 'rain-drops',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  rave: {
    id: 'rave',
    name: 'Rave Party',
    description: 'A rave party background',
    enabled: true,
    type: 'image',
    background: {
      id: 'rave',
      type: 'image',
      image: {
        id: 'rave',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1514525253161-7a49c91b7000?auto=format&fit=crop&q=80'
      }
    }
  },
  'recording-studio': {
    id: 'recording-studio',
    name: 'Recording Studio',
    description: 'A recording studio',
    enabled: true,
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
    enabled: true,
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
  rome: {
    id: 'rome',
    name: 'Rome',
    description: 'A view of the Rome skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'rome',
      type: 'image',
      image: {
        id: 'rome',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80'
      }
    }
  },
  'salt-lake-city': {
    id: 'salt-lake-city',
    name: 'Salt Lake City',
    description: 'A photo of the Salt Lake City skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'salt-lake-city',
      type: 'image',
      image: {
        id: 'salt-lake-city',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1682146575150-c960ddbc1ace?auto=format&fit=crop&q=80'
      }
    }
  },
  'san-antonio': {
    id: 'san-antonio',
    name: 'San Antonio',
    description: 'A photo of the San Antonio river walk',
    enabled: true,
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
  'san-diego': {
    id: 'san-diego',
    name: 'San Diego',
    description: 'A photo of the San Diego skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'san-diego',
      type: 'image',
      image: {
        id: 'san-diego',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1547001286-e2ff1572e4d9?auto=format&fit=crop&q=80'
      }
    }
  },
  'san-francisco': {
    id: 'san-francisco',
    name: 'San Francisco',
    description: 'A photo of the Sunrise over San Francisco',
    enabled: true,
    type: 'image',
    background: {
      id: 'san-francisco',
      type: 'image',
      image: {
        id: 'san-francisco',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1576764225594-96ad970efffa?auto=format&fit=crop&q=80'
      }
    }
  },
  'san-jose': {
    id: 'san-jose',
    name: 'San Jose',
    description: 'A photo of the San Jose skyline at night',
    enabled: true,
    type: 'image',
    background: {
      id: 'san-jose',
      type: 'image',
      image: {
        id: 'san-jose',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1605435010177-8e96475610a4?auto=format&fit=crop&q=80'
      }
    }
  },
  saturn: {
    id: 'saturn',
    name: 'Saturn',
    description: 'Saturn as seen from the Cassini–Huygens mission',
    enabled: true,
    type: 'image',
    background: {
      id: 'saturn',
      type: 'image',
      image: {
        id: 'saturn',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80'
      }
    }
  },
  seattle: {
    id: 'seattle',
    name: 'Seattle',
    description: 'A photo of the Seattle waterfront',
    enabled: true,
    type: 'image',
    background: {
      id: 'seattle',
      type: 'image',
      image: {
        id: 'seattle',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1535581652167-3a49c91b7000?auto=format&fit=crop&q=80'
      }
    }
  },
  shanghai: {
    id: 'shanghai',
    name: 'Shanghai',
    description: 'A view of the Shanghai skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'shanghai',
      type: 'image',
      image: {
        id: 'shanghai',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&q=80'
      }
    }
  },
  'shooting-stars': {
    id: 'shooting-stars',
    name: 'Shooting Stars',
    description: 'Lucy in the sky with diamonds',
    enabled: true,
    type: 'animation',
    background: {
      id: 'shooting-stars',
      type: 'animation',
      animation: {
        id: 'shooting-stars',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'sig-sauer': {
    id: 'sig-sauer',
    name: 'Sig Sauer',
    description: 'A close-up photo of a Sig Sauer 9mm pistol and bullets',
    enabled: true,
    type: 'image',
    background: {
      id: 'sig-sauer',
      type: 'image',
      image: {
        id: 'sig-sauer',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1713648129175-85687077e6e6?auto=format&fit=crop&q=80'
      }
    }
  },
  'slot-machines': {
    id: 'slot-machines',
    name: 'Slot Machines',
    description: 'Neon lights of slot machines light up a dark room',
    enabled: true,
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
  snow: {
    id: 'snow',
    name: 'Snow',
    description: 'A snow-covered forest filled with lots of trees',
    enabled: true,
    type: 'image',
    background: {
      id: 'snow',
      type: 'image',
      image: {
        id: 'snow',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1738081359154-44d50176b2d0?auto=format&fit=crop&q=80'
      }
    }
  },
  'southern-lights': {
    id: 'southern-lights',
    name: 'Southern Lights',
    description: 'Southern lights in the night sky',
    enabled: true,
    type: 'animation',
    background: {
      id: 'southern-lights',
      type: 'animation',
      animation: {
        id: 'southern-lights',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'image',
    background: {
      id: 'space',
      type: 'image',
      image: {
        id: 'space',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1534996858221-caed2596d242?auto=format&fit=crop&q=80'
      }
    }
  },
  'space-shuttle': {
    id: 'space-shuttle',
    name: 'Space Shuttle',
    description: 'The Space Shuttle Challenger launching from Complex 39',
    enabled: true,
    type: 'image',
    background: {
      id: 'space-shuttle',
      type: 'image',
      image: {
        id: 'space-shuttle',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80'
      }
    }
  },
  sparkles: {
    id: 'sparkles',
    name: 'Sparkles',
    description: 'Sparkles animation background',
    enabled: true,
    type: 'animation',
    background: {
      id: 'sparkles',
      type: 'animation',
      animation: {
        id: 'sparkles',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'sphere-animation': {
    id: 'sphere-animation',
    name: 'Sphere Animation',
    description: 'A sphere animation background',
    enabled: true,
    type: 'animation',
    background: {
      id: 'sphere-animation',
      type: 'animation',
      animation: {
        id: 'sphere-animation',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'spotlight',
      type: 'animation',
      animation: {
        id: 'spotlight',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'squares',
      type: 'animation',
      animation: {
        id: 'squares',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  squirrel: {
    id: 'squirrel',
    name: 'Staring Squirrel',
    description: 'A brown squirrel on a black background staring at the camera',
    enabled: true,
    type: 'image',
    background: {
      id: 'squirrel',
      type: 'image',
      image: {
        id: 'squirrel',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1504006833117-cc412bb977d5?auto=format&fit=crop&q=80'
      }
    }
  },
  'star-trail': {
    id: 'star-trail',
    name: 'Star Trail',
    description: 'Star Trail Granite Outdoors Outback',
    enabled: true,
    type: 'image',
    background: {
      id: 'star-trail',
      type: 'image',
      image: {
        id: 'star-trail',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1734903899558-463366085cb7?auto=format&fit=crop&q=80'
      }
    }
  },
  starfall: {
    id: 'starfall',
    name: 'Starfall',
    description: 'Starfall animation',
    enabled: true,
    type: 'animation',
    background: {
      id: 'starfall',
      type: 'animation',
      animation: {
        id: 'starfall',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'starry-background': {
    id: 'starry-background',
    name: 'Starry Background',
    description: 'A starry background animation',
    enabled: true,
    type: 'animation',
    background: {
      id: 'starry-background',
      type: 'animation',
      animation: {
        id: 'starry-background',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
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
  sun: {
    id: 'sun',
    name: 'Sun',
    description: 'A corona mass ejection erupts from our sun on August 31, 2012',
    enabled: true,
    type: 'image',
    background: {
      id: 'sun',
      type: 'image',
      image: {
        id: 'sun',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&q=80'
      }
    }
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    description: 'A view of the sunset',
    enabled: true,
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
  'swarm-effect': {
    id: 'swarm-effect',
    name: 'Swarm Effect',
    description: 'A swarm of particles',
    enabled: false,
    type: 'animation',
    background: {
      id: 'swarm-effect',
      type: 'animation',
      animation: {
        id: 'swarm-effect',
        type: 'artifact-ui',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  sydney: {
    id: 'sydney',
    name: 'Sydney',
    description: 'A Birds Eye View of Sydney, Australia',
    enabled: true,
    type: 'image',
    background: {
      id: 'sydney',
      type: 'image',
      image: {
        id: 'sydney',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1546268060-2592ff93ee24?auto=format&fit=crop&q=80'
      }
    }
  },
  tampa: {
    id: 'tampa',
    name: 'Tampa',
    description: 'A view of the Tampa skyline',
    enabled: true,
    type: 'image',
    background: {
      id: 'tampa',
      type: 'image',
      image: {
        id: 'tampa',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1561063139-e183e66909c4?auto=format&fit=crop&q=80'
      }
    }
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    description: 'The threads of fate on your desktop',
    enabled: true,
    type: 'animation',
    background: {
      id: 'threads',
      type: 'animation',
      animation: {
        id: 'threads',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
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
    enabled: true,
    type: 'image',
    background: {
      id: 'times-square',
      type: 'image',
      image: {
        id: 'times-square',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1739382121077-7a20fed13566?auto=format&fit=crop&q=80'
      }
    }
  },
  toronto: {
    id: 'toronto',
    name: 'Toronto',
    description: 'A view of the Toronto skyline as seen from Olympic Island',
    enabled: true,
    type: 'image',
    background: {
      id: 'toronto',
      type: 'image',
      image: {
        id: 'toronto',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1571642376444-52558bb8cee2?auto=format&fit=crop&q=80'
      }
    }
  },
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    description: 'A photo of the busy people of Tokyo in the streets',
    enabled: true,
    type: 'image',
    background: {
      id: 'tokyo',
      type: 'image',
      image: {
        id: 'tokyo',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80'
      }
    }
  },
  turntable: {
    id: 'turntable',
    name: 'Turntable',
    description: 'A close-up photo of a vinyl turntable',
    enabled: true,
    type: 'image',
    background: {
      id: 'turntable',
      type: 'image',
      image: {
        id: 'turntable',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1458560871784-556ac3a4c7e5?auto=format&fit=crop&q=80'
      }
    }
  },
  underwater: {
    id: 'underwater',
    name: 'Underwater',
    description: 'Underwater view of the ocean',
    enabled: true,
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
  'united-states': {
    id: 'united-states',
    name: 'United States',
    description: 'A view of the United States from space',
    enabled: true,
    type: 'image',
    background: {
      id: 'united-states',
      type: 'image',
      image: {
        id: 'united-states',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80'
      }
    }
  },
  uranus: {
    id: 'uranus',
    name: 'Uranus',
    description: 'Uranus as seen from the Voyager 2 mission',
    enabled: true,
    type: 'image',
    background: {
      id: 'uranus',
      type: 'image',
      image: {
        id: 'uranus',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&q=80'
      }
    }
  },
  venice: {
    id: 'venice',
    name: 'Venice',
    description: 'A view of the Venice city canals at sunset',
    enabled: true,
    type: 'image',
    background: {
      id: 'venice',
      type: 'image',
      image: {
        id: 'venice',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&q=80'
      }
    }
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    description: 'Venus captured by the Mariner 10 spacecraft in early 1974',
    enabled: true,
    type: 'image',
    background: {
      id: 'venus',
      type: 'image',
      image: {
        id: 'venus',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1614726365723-498aa67c5f7b?auto=format&fit=crop&q=80'
      }
    }
  },
  'vinyl-records': {
    id: 'vinyl-records',
    name: 'Vinyl Records',
    description: 'A close-up image of vinyl records',
    enabled: true,
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
    enabled: true,
    type: 'animation',
    background: {
      id: 'vortex',
      type: 'animation',
      animation: {
        id: 'vortex',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'washington-dc': {
    id: 'washington-dc',
    name: 'Washington DC',
    description: 'Photo of the Washington Monument with Cherry Blossom Trees in Washington, DC',
    enabled: true,
    type: 'image',
    background: {
      id: 'washington-dc',
      type: 'image',
      image: {
        id: 'washington-dc',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1574365379583-54937ea00cb8?auto=format&fit=crop&q=80'
      }
    }
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    description: 'Trippy optical illusion animation',
    enabled: true,
    type: 'animation',
    background: {
      id: 'waves',
      type: 'animation',
      animation: {
        id: 'waves',
        type: 'reactbits',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'wavy-background': {
    id: 'wavy-background',
    name: 'Wavy Background',
    description: 'Animated wavy background',
    enabled: false,
    type: 'animation',
    background: {
      id: 'wavy-background',
      type: 'animation',
      animation: {
        id: 'wavy-background',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  'wavy-lines': {
    id: 'wavy-lines',
    name: 'Wavy Lines',
    description: 'Lines that animate in a wave pattern',
    enabled: true,
    type: 'animation',
    background: {
      id: 'wavy-lines',
      type: 'animation',
      animation: {
        id: 'background-lines',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  wordpress: {
    id: 'wordpress',
    name: 'WordPress',
    description: 'A close-up photo of a WordPress PHP code',
    enabled: false,
    type: 'image',
    background: {
      id: 'wordpress',
      type: 'image',
      image: {
        id: 'wordpress',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80'
      }
    }
  },
  workbench: {
    id: 'workbench',
    name: 'Workbench',
    description: 'A photo of a workbench with military gear and a shotgun',
    enabled: true,
    type: 'image',
    background: {
      id: 'workbench',
      type: 'image',
      image: {
        id: 'workbench',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1636136368699-cc412bb977d5?auto=format&fit=crop&q=80'
      }
    }
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Clean workspace desktop',
    enabled: true,
    type: 'image',
    background: {
      id: 'workspace',
      type: 'image',
      image: {
        id: 'workspace',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1497032623322-36695c8771bd?auto=format&fit=crop&q=80'
      }
    }
  },
  'world-map': {
    id: 'world-map',
    name: 'World Map',
    description: 'World map background with animated lines',
    enabled: false,
    type: 'animation',
    background: {
      id: 'world-map',
      type: 'animation',
      animation: {
        id: 'world-map',
        type: 'aceternity',
        url: DEFAULT_ANIMATION_IMAGE_URL
      },
      gradient: {
        id: 'default',
        gradient: 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)',
        type: 'linear'
      }
    }
  },
  xbox: {
    id: 'xbox',
    name: 'Xbox Console',
    description: 'A close-up image of an Xbox One Series X console',
    enabled: true,
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
  },
  yosemite: {
    id: 'yosemite',
    name: 'Yosemite',
    description: 'A close-up photo of Yosemite National Park',
    enabled: true,
    type: 'image',
    background: {
      id: 'yosemite',
      type: 'image',
      image: {
        id: 'yosemite',
        mimeType: 'image/avif',
        type: 'url',
        url: 'https://images.unsplash.com/photo-1498429089284-38755b4803a6?auto=format&fit=crop&q=80'
      }
    }
  }
};

export default wallpaperPresets;
