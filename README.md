# NBA Pack Opening - Dapper Labs

An engaging and interactive NBA Top Shot pack opening experience built with modern web technologies. This project simulates an exciting and memorable experience for users while maintaining seamless UI/UX design consistent with NBA Top Shot branding.

## 🎯 Objective

Design and build a new, engaging and interactive "Pack Opening" experience for NBA Top Shot. The goal is to simulate an exciting and memorable experience for users while maintaining a seamless UI/UX design, which is consistent with the NBA Top Shot branding and offers a smooth and fun interaction flow.

## ✨ Features

- **🎨 Modern UI/UX**: Clean, professional interface with Vercel's design system
- **🌙 Dark Mode**: Seamless theme switching between light and dark modes
- **📱 Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **🎮 Interactive Components**: Smooth animations and engaging user interactions
- **🎯 NBA Themed**: Tailored specifically for NBA Top Shot pack opening experience
- **⚡ Performance**: Built with Next.js 15 and TailwindCSS v4 for optimal speed
- **🔧 Developer Experience**: TypeScript, ESLint, and modern tooling

## 🚀 Tech Stack

### Frontend Framework
- **Next.js 15.3.5** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **React 19** - Latest React features and improvements

### Styling & UI
- **TailwindCSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions

### Theme System
- **next-themes** - Theme management and persistence
- **Kibo UI Theme Switcher** - Advanced theme switching component
- **Vercel Theme** - Clean, professional color palette

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **TypeScript** - Static type checking

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/karanbalaji/nba-pack-opening-dapperlabs.git
   cd nba-pack-opening-dapperlabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎨 UI Components

### Installed shadcn/ui Components
- **Button** - Interactive buttons with multiple variants
- **Card** - Content containers with headers and descriptions
- **Dropdown Menu** - Accessible dropdown menus
- **Badge** - Status indicators and labels
- **Input** - Form input fields
- **Label** - Accessible form labels
- **Switch** - Toggle switches

### Custom Components
- **Theme Switcher** - Advanced theme switching with smooth animations
- **Theme Provider** - Global theme management
- **NBA Pack Opening Interface** - Custom pack opening experience

## 🌈 Theme System

The application uses a sophisticated theme system with:

### Light Mode
- Background: `#fcfcfc` (Very light gray)
- Foreground: `#000000` (Pure black)
- Primary: `#000000` (Black)
- Cards: `#ffffff` (White)
- Borders: `#e4e4e4` (Light gray)

### Dark Mode
- Background: `#000000` (Pure black)
- Foreground: `#ffffff` (White)
- Primary: `#ffffff` (White)
- Cards: `#090909` (Dark gray)
- Borders: `#242424` (Dark gray)

### Theme Features
- **System Theme Detection** - Automatically matches user's OS preference
- **Persistent Theme** - Remembers user's choice across sessions
- **Smooth Transitions** - Animated theme switching
- **Accessibility** - High contrast ratios for readability

## 🏗️ Project Structure

```
nba-pack-opening-dapperlabs/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css          # Global styles and theme variables
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   └── page.tsx             # Main NBA pack opening page
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   └── kibo-ui/         # Kibo UI components
│   │   ├── theme-provider.tsx   # Theme context provider
│   │   └── theme-switcher-wrapper.tsx  # Theme switcher component
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🎯 Current Features

### 🏠 Homepage
- **Hero Section** - Engaging introduction to NBA pack opening
- **Feature Cards** - Highlights of rare cards, achievements, and community
- **Stats Section** - User progress tracking (packs opened, cards collected, etc.)
- **Professional Layout** - Clean, modern design with proper spacing

### 🎨 UI/UX Features
- **Theme Switching** - Three-way theme selector (System, Light, Dark)
- **Responsive Design** - Mobile-first approach with breakpoints
- **Smooth Animations** - Framer Motion powered transitions
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Professional Typography** - Geist font family for modern feel

## 🔄 Next Steps

- [ ] Pack opening animation system
- [ ] Card reveal mechanics
- [ ] Sound effects and audio feedback
- [ ] User authentication and profiles
- [ ] Inventory management
- [ ] Trading functionality
- [ ] Achievement system
- [ ] Social features and sharing
- [ ] Payment integration
- [ ] Analytics and tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of Dapper Labs' NBA Top Shot ecosystem.

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any other modern hosting platform that supports Next.js.

### Deploy on Vercel
```bash
npx vercel --prod
```

---

Built with ❤️ for NBA Top Shot by Dapper Labs

**Technologies:** Next.js 15, TypeScript, TailwindCSS v4, shadcn/ui, Radix UI, Framer Motion
