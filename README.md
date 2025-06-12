# &lt;programmer&gt;.\_

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)

![Terminal Screenshot](/public/images/terminal-programmer-sh.jpg)

A modern terminal-inspired portfolio and resume website showcasing interactive animations, 3D experiences, and an immersive UI built with cutting-edge web technologies.

## 🚀 Features

- **Terminal Interface**: Interactive command-line experience with custom commands
- **Modern UI Components**: Built with Radix UI primitives and custom animations
- **3D Animations**: Advanced Three.js integrations with optimized performance
- **Interactive Wallpapers**: Dynamic wallpapers with various animation techniques
- **Responsive Design**: Seamless experience across all devices
- **Type Safety**: Comprehensive TypeScript integration
- **Dark/Light Modes**: Theme switching with adaptive interface elements
- **Optimized Performance**: Code splitting and lazy loading with Vite
- **Storybook Integration**: Component documentation and testing

## 🛠️ Technology Stack

### Frontend

- **Framework**: Vite
- **Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Components**: Radix UI

### Backend & Data

- **Runtime**: Node.js
- **Database**: Supabase PostgreSQL

### Animation Libraries

- Three.js + React Three Fiber
- Framer Motion
- GSAP
- tsParticles
- Anime.js

### Testing & Quality

- Vitest + Playwright (WIP)
- Storybook (WIP)
- ESLint + Stylelint

## 📦 Installation

```bash
# Install dependencies with PNPM (recommended)
pnpm install

# Alternative: using npm
npm install

# Alternative: using yarn
yarn install
```

## 🏗️ Development

```bash
# Start the development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint:all

# Format code
pnpm format

# Run Storybook
pnpm storybook
```

## 📂 Project Structure

```
├── public/               # Static assets and favicon
├── schemas/              # SQL database schemas
├── scripts/              # Build and utility scripts
├── src/                  # Source code
│   ├── commands/         # Terminal command implementations
│   ├── components/       # React components
│   │   ├── ui/           # Core UI components
│   │   ├── cursors/      # Cursor components
│   │   └── animations/   # Animation components
│   ├── data/             # Static data and content
│   ├── errors/           # Error handling and boundary components
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # Third-party integrations
│   ├── lib/              # Utility libraries
│   ├── pages/            # Page components
│   │   ├── demos/        # Demo pages
│   ├── presets/          # Configuration presets
│   ├── services/         # API services
│   ├── stories/          # Storybook stories
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── supabase/             # Supabase configuration
├── .env.example          # Example environment variables
├── index.html            # Application entry point
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 📚 Code Standards

This project follows strict TypeScript practices and coding standards:

- Strong typing with full type safety
- No use of `any` type
- Comprehensive JSDoc documentation
- Modular file organization with clear naming conventions
- Component files using kebab-case naming
- Custom utilities with strict error handling

## 📱 Responsive Design

The application is designed to work across all device sizes:

- Desktop (1280px+)
- Tablet (768px - 1279px)
- Mobile (320px - 767px)

Responsive adjustments are handled through both Tailwind breakpoints and CSS modules with media queries.

## 🔌 Integration Points

- **Supabase**: Database and authentication
- **Sentry**: Error monitoring and performance tracking
- **Three.js**: 3D visualizations and animations

## 🚢 Deployment

The project is configured for seamless deployment on Netlify:

```bash
# Build for production deployment
pnpm build
```

The Vite build process optimizes asset loading with intelligent code splitting for better performance.

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## 📊 Code Statistics

```
──────────────────────────────────────────────────────────────────────────────────────────
Language                 Files    Tokens     Lines   Blanks  Comments     Code Complexity
──────────────────────────────────────────────────────────────────────────────────────────
TypeScript                1057    242203    109496    11612     31327    66557       7024
CSS                        168     43373     13218     1729       915    10574          0
Plain Text                 105         0       469        5         0      464          0
Markdown                    51     16680     10845     2299         0     8546          0
SVG                         13         0       102        0         0      102          0
JSON                        11    155492     13228        5         0    13223          0
TypeScript Typings           8         0       133       11         5      117          2
SQL                          3         0       199       17        23      159          0
JavaScript                   2       179        38        1        19       18          0
HTML                         1       232        69       12         2       55          0
MDX                          1         0       367       39         0      328          0
TOML                         1         0         1        0         0        1          0
Unsupported                486         0         0        0         0        0          0
──────────────────────────────────────────────────────────────────────────────────────────
Total                     1421    458159    148165    15730     32291   100144       7026
──────────────────────────────────────────────────────────────────────────────────────────
Estimated Cost to Develop (organic) $3,406,053
Estimated Schedule Effort (organic) 21.91 months
Estimated People Required (organic) 13.81
──────────────────────────────────────────────────────────────────────────────────────────
Processed 4306738 bytes, 4.307 megabytes (SI)
──────────────────────────────────────────────────────────────────────────────────────────
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Three.js](https://threejs.org/) for 3D graphics capabilities
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for the lightning-fast development experience
- [Supabase](https://supabase.io/) for backend services

---

Built with ❤️ by [Programmer Inc.](https://programmer.to/website)
