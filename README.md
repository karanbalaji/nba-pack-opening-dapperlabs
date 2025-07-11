# NBA Pack Opening Experience - Dapper Labs

An immersive and interactive NBA Top Shot pack opening experience featuring 3D pack models, animated card reveals, and seamless UI/UX design consistent with NBA Top Shot's premium branding.

## 🎯 Project Overview

This project was built as a design engineering interview take-home assignment for Dapper Labs. It simulates a complete NBA Top Shot pack opening experience with:

- **3D Pack Models** - Interactive 3D pack visualization with realistic opening animations
- **Card Reveal System** - Dramatic card reveals with player videos and rarity effects  
- **Premium UI/UX** - Clean, minimalist design matching NBA Top Shot's actual branding
- **Complete Flow** - Full user journey from pack selection to collection summary

## ✨ Key Features

### 🎮 Interactive Pack Opening Flow
- **4-State System**: Selection → Opening → Revealing → Summary
- **3D Pack Visualization** - React Three Fiber powered 3D models
- **Realistic Animations** - GSAP and Framer Motion for smooth transitions
- **Progressive Reveal** - Building excitement through staged card reveals

### 🏀 NBA Top Shot Integration
- **Authentic Player Data** - LeBron James, Stephen Curry, Giannis, Luka Dončić, Jayson Tatum
- **Rarity System** - Common, Rare, and Legendary cards with visual effects
- **Player Videos** - Portrait videos for enhanced card experience
- **Stats Display** - PPG, APG, RPG for each player card

### 🎨 Premium Design System
- **NBA Top Shot Branding** - Clean dark interface matching actual TopShot design
- **Vercel Design System** - Professional color palette and typography
- **Responsive Layout** - Mobile-first design with perfect desktop scaling
- **Theme Switching** - Light/dark mode with system preference detection

## 🚀 Tech Stack

### Core Framework
- **Next.js 15.3.5** with App Router and Turbopack
- **TypeScript** for type safety and developer experience
- **React 19** with latest features and optimizations

### 3D Graphics & Animation
- **@react-three/fiber** - React wrapper for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **three** - Core 3D rendering engine
- **framer-motion** - Smooth UI animations and transitions
- **gsap** - Professional animation sequences
- **lottie-react** - Vector animations and effects

### UI Components & Styling
- **TailwindCSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible components
- **Radix UI** - Unstyled, accessible primitives
- **Aceternity UI** - Beautiful 3D card components
- **next-themes** - Advanced theme management
- **Lucide React** - Professional icon library

## 🏗️ Project Architecture

### Component Structure
```
src/components/pack-opening/
├── PackOpeningFlow.tsx      # Main orchestrator - manages 4 states
├── PackSelector.tsx         # Pack selection with pricing and rarity
├── PackOpening.tsx         # 3D pack opening animations  
├── CardReveal.tsx          # Interactive 3D card reveals
└── CollectionSummary.tsx   # Results summary and statistics
```

### Flow States
1. **Selection** (`PackSelector`) - Choose between Freshman Gems ($29.99) or Elite Series ($49.99)
2. **Opening** (`PackOpening`) - 3D pack opening with progress tracking and particle effects
3. **Revealing** (`CardReveal`) - Sequential card reveals with player videos and stats
4. **Summary** (`CollectionSummary`) - Collection overview with value calculation and best pulls

### Asset Organization
```
public/media/
├── player-headshots/        # Player profile images
├── player-videos/          # Portrait videos for card reveals
├── pack-images/            # 2D pack artwork
├── 3D/                     # 3D .glb pack models
└── top-shot-logo.png       # NBA Top Shot branding
```

## 🎮 Pack Opening Experience

### Pack Selection
- **Two Premium Options**: Freshman Gems (Rare guaranteed) and Elite Series (Legendary guaranteed)
- **Visual Pack Models**: High-quality 3D renders with rarity badges
- **Pricing Display**: Clear $29.99 and $49.99 pricing with guarantee information
- **Hover Effects**: Smooth scaling and visual feedback on pack cards

### 3D Pack Opening
- **React Three Fiber Scene**: Realistic 3D pack model rendering
- **Opening Animation**: Smooth pack unwrapping with particle effects
- **Progress Tracking**: Visual progress bar showing opening completion
- **Sound Integration**: Prepared for audio feedback (use-sound integrated)

### Card Revelation
- **Sequential Reveals**: Cards revealed one by one for maximum drama
- **3D Card Effects**: Aceternity 3D card components with realistic lighting
- **Player Integration**: Video backgrounds with player headshots
- **Rarity Effects**: Special visual effects for Rare and Legendary cards
- **Stats Display**: Player statistics (Points, Assists, Rebounds per game)

### Collection Summary
- **Best Pull Highlight**: Featured card with highest rarity
- **Collection Stats**: Total cards, rarity breakdown, estimated value
- **Value Calculation**: Dynamic pricing based on card rarities
- **Return Navigation**: Smooth transition back to pack selection

## 🏀 Player Data & Assets

### Featured Players
- **LeBron James** (Legendary) - Lakers forward with premium stats
- **Stephen Curry** (Rare) - Warriors guard with elite shooting stats  
- **Giannis Antetokounmpo** (Rare) - Bucks forward with dominant stats
- **Luka Dončić** (Common) - Mavericks guard with rising star status
- **Jayson Tatum** (Common) - Celtics forward with solid all-around stats

### Asset Types
- **Headshot Images** - High-quality player portraits
- **Portrait Videos** - Dynamic player video content
- **3D Pack Models** - Realistic .glb pack representations
- **Pack Artwork** - 2D pack images for selection interface

## 🛠️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/karanbalaji/nba-pack-opening-dapperlabs.git
   cd nba-pack-opening-dapperlabs
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build optimized production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Design Philosophy

### NBA Top Shot Consistency
- **Minimalist Dark Theme** - Matches actual NBA Top Shot interface
- **Card-Focused Design** - Cards are the hero elements with premium presentation
- **Subtle Premium Effects** - Elegant animations without overwhelming users
- **Clean Typography** - Professional Geist font family

### User Experience Principles
- **Progressive Disclosure** - Information revealed at optimal moments
- **Emotional Pacing** - Building excitement through the opening sequence
- **Instant Feedback** - Responsive interactions and visual confirmations
- **Accessibility First** - Screen reader support and keyboard navigation

## 🔧 Key Technical Implementations

### 3D Rendering Pipeline
```typescript
// React Three Fiber scene with optimized performance
<Canvas camera={{ position: [0, 0, 5] }}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <PackModel onOpenComplete={handlePackOpened} />
</Canvas>
```

### State Management
```typescript
// Clean state transitions with TypeScript
type PackOpeningState = 'selection' | 'opening' | 'revealing' | 'summary'
const [currentState, setCurrentState] = useState<PackOpeningState>('selection')
```

### Animation Orchestration
```typescript
// Framer Motion for smooth UI transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First** - Optimized for 375px+ screens
- **Tablet Enhanced** - Rich experience on 768px+ devices  
- **Desktop Premium** - Full feature set on 1024px+ displays
- **Ultra-wide Support** - Scales beautifully on large monitors

### Performance Optimizations
- **Turbopack** - Next.js 15's ultra-fast bundler
- **Image Optimization** - Next.js automatic image optimization
- **Component Lazy Loading** - Code splitting for faster initial loads
- **3D Model Optimization** - Efficient .glb assets with compression

## 🌟 Special Features

### Interactive Elements
- **3D Pack Rotation** - Mouse/touch interaction with pack models
- **Card Flip Animations** - Realistic card reveal mechanics
- **Particle Effects** - Premium visual effects during pack opening
- **Smooth Transitions** - Seamless flow between all states

### Premium Polish
- **Custom Loading States** - Branded loading animations
- **Error Boundaries** - Graceful error handling
- **Offline Support** - Service worker for asset caching
- **Analytics Ready** - Event tracking integration points

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
```bash
npx vercel --prod
```

The application is optimized for:
- **Vercel** - Zero-config deployment with automatic optimizations
- **Netlify** - Static site generation with form handling
- **AWS/Azure** - Container deployment with Docker support

## 🤝 Development Notes

### Interview Assignment Context
This project demonstrates:
- **Full-Stack Thinking** - Complete user journey implementation
- **3D Web Development** - Advanced Three.js integration with React
- **Animation Expertise** - Professional motion design and timing
- **UI/UX Excellence** - Pixel-perfect implementation of design requirements
- **Performance Focus** - Optimized bundle size and rendering performance

### Code Quality
- **TypeScript Strict Mode** - Full type safety throughout
- **ESLint Configuration** - Enforced code standards and best practices
- **Component Architecture** - Reusable, maintainable component design
- **Performance Monitoring** - React DevTools and Lighthouse optimization

## 📄 License

This project is part of the Dapper Labs design engineering interview process.

## 👨‍💻 Author

**Karan Balaji**
- GitHub: [@karanbalaji](https://github.com/karanbalaji)
- LinkedIn: [karanbalaji](https://www.linkedin.com/in/karanbalaji/)
- Project: [NBA Pack Opening Experience](https://github.com/karanbalaji/nba-pack-opening-dapperlabs)

---

Built with ❤️ for NBA Top Shot by Dapper Labs

**Core Technologies:** Next.js 15 • TypeScript • React Three Fiber • Framer Motion • TailwindCSS • shadcn/ui
