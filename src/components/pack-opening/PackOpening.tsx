"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Float } from "@react-three/drei"
import { Pack, Card } from "./PackOpeningFlow"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"

// Mock card data based on available assets
const MOCK_CARDS: Card[] = [
  {
    id: "1",
    playerName: "LeBron James",
    team: "LAL",
    position: "F",
    rarity: "legendary",
    headshot: "/media/player-headshot-1.png",
    video: "/media/portrait-video-1.mp4",
    stats: { points: 27.1, assists: 7.4, rebounds: 7.5 }
  },
  {
    id: "2", 
    playerName: "Stephen Curry",
    team: "GSW",
    position: "G", 
    rarity: "rare",
    headshot: "/media/player-headshot-2.png",
    video: "/media/portrait-video-2.mp4",
    stats: { points: 29.5, assists: 6.1, rebounds: 5.1 }
  },
  {
    id: "3",
    playerName: "Giannis Antetokounmpo", 
    team: "MIL",
    position: "F",
    rarity: "rare",
    headshot: "/media/player-headshot-3.png", 
    video: "/media/portrait-video-3.mp4",
    stats: { points: 31.1, assists: 5.7, rebounds: 11.8 }
  },
  {
    id: "4",
    playerName: "Luka Dončić",
    team: "DAL", 
    position: "G",
    rarity: "common",
    headshot: "/media/player-headshot-4.png",
    video: "/media/portrait-video-4.mp4", 
    stats: { points: 32.4, assists: 8.6, rebounds: 8.0 }
  },
  {
    id: "5",
    playerName: "Jayson Tatum",
    team: "BOS",
    position: "F", 
    rarity: "common",
    headshot: "/media/player-headshot-1.png",
    video: "/media/portrait-video-1.mp4",
    stats: { points: 26.9, assists: 4.9, rebounds: 8.1 }
  }
]

function Pack3D({ modelPath, isOpening, onOpenComplete }: { 
  modelPath: string
  isOpening: boolean 
  onOpenComplete: () => void
}) {
  const { scene } = useGLTF(modelPath)
  
  useEffect(() => {
    if (isOpening) {
      // Simulate opening animation completion
      const timer = setTimeout(() => {
        onOpenComplete()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpening, onOpenComplete])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <motion.group
        animate={isOpening ? {
          rotateY: Math.PI * 2,
          scale: [1, 1.2, 1]
        } : {
          rotateY: 0,
          scale: 1
        }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <primitive object={scene} scale={2} />
      </motion.group>
    </Float>
  )
}

interface PackOpeningProps {
  pack: Pack
  onPackOpened: (cards: Card[]) => void
}

export function PackOpening({ pack, onPackOpened }: PackOpeningProps) {
  const [phase, setPhase] = useState<'anticipation' | 'opening' | 'complete'>('anticipation')
  const [progress, setProgress] = useState(0)

  const handleStartOpening = () => {
    setPhase('opening')
    
    // Simulate opening progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 60)
  }

  const handleOpenComplete = () => {
    setPhase('complete')
    setTimeout(() => {
      // Return random selection of cards from mock data
      const shuffled = [...MOCK_CARDS].sort(() => 0.5 - Math.random())
      const selectedCards = shuffled.slice(0, 5)
      onPackOpened(selectedCards)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)/5_0%,_transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        
        {/* Pack Info */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{pack.name}</h1>
          <p className="text-xl text-muted-foreground mb-2">{pack.description}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>5 premium cards await</span>
          </div>
        </motion.div>

        {/* 3D Pack Display */}
        <div className="w-full max-w-2xl aspect-square mb-8">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Environment preset="studio" />
            
            <Pack3D 
              modelPath={pack.model3D}
              isOpening={phase === 'opening'}
              onOpenComplete={handleOpenComplete}
            />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={phase === 'anticipation'}
              autoRotateSpeed={2}
            />
          </Canvas>
        </div>

        {/* Controls */}
        <AnimatePresence mode="wait">
          {phase === 'anticipation' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <Button 
                size="lg"
                className="text-xl px-12 py-6"
                onClick={handleStartOpening}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Open Pack
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Click to reveal your cards
              </p>
            </motion.div>
          )}

          {phase === 'opening' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-lg">Opening pack...</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-80 max-w-full mx-auto">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {progress}% complete
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-green-500 mb-2">Pack Opened!</div>
              <div className="text-muted-foreground">Revealing your cards...</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Particle Effects */}
        {phase === 'opening' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/60 rounded-full"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  opacity: [1, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 