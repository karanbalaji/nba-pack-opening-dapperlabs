"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Float } from "@react-three/drei"
import { Pack, Card } from "./PackOpeningFlow"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, X } from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { Group } from "three"

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
  const meshRef = useRef<Group>(null)
  const [rotationProgress, setRotationProgress] = useState(0)
  
  useFrame((state, delta) => {
    if (meshRef.current && isOpening) {
      // Smooth rotation animation when opening
      const targetRotation = Math.PI * 2 // One full rotation
      const newProgress = Math.min(rotationProgress + delta * 1.5, 1) // Slightly slower for smoother feel
      setRotationProgress(newProgress)
      
      // Smooth ease-in-out animation using smoothstep function
      const easeInOut = newProgress * newProgress * (3 - 2 * newProgress)
      meshRef.current.rotation.y = easeInOut * targetRotation
      
      // Add slight wobble effect during opening with ease-in-out
      const wobbleIntensity = Math.sin(newProgress * Math.PI) // Peak intensity at middle
      const wobble = Math.sin(newProgress * Math.PI * 6) * 0.08 * wobbleIntensity
      meshRef.current.rotation.x = wobble
      meshRef.current.rotation.z = wobble * 0.6
    }
  })
  
  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => {
        onOpenComplete()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpening, onOpenComplete])

  return (
    <Float speed={isOpening ? 4 : 2} rotationIntensity={isOpening ? 1 : 0.5} floatIntensity={isOpening ? 1 : 0.5}>
      <group ref={meshRef}>
        <primitive object={scene} scale={2} />
      </group>
    </Float>
  )
}

interface PackOpeningProps {
  pack: Pack
  onPackOpened: (cards: Card[]) => void
  onClose: () => void
}

export function PackOpening({ pack, onPackOpened, onClose }: PackOpeningProps) {
  const [phase, setPhase] = useState<'anticipation' | 'opening' | 'complete'>('anticipation')
  const [progress, setProgress] = useState(0)
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null)

  const handleStartOpening = () => {
    setPhase('opening')
    setProgress(0)
    
    // Synchronized progress with 3D animation (3 seconds total)
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (3000 / 50) // 3000ms total, update every 50ms
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 50)
    
    setProgressInterval(interval)
  }

  const handleOpenComplete = () => {
    // Clear any remaining interval
    if (progressInterval) {
      clearInterval(progressInterval)
      setProgressInterval(null)
    }
    
    setProgress(100)
    setPhase('complete')
    
    // Shorter delay before revealing cards for better UX
    setTimeout(() => {
      // Return cards based on pack rarity guarantees
      const shuffled = [...MOCK_CARDS].sort(() => 0.5 - Math.random())
      let selectedCards = shuffled.slice(0, 5)
      
      // Ensure pack rarity guarantees are met
      if (pack.rarity === 'legendary') {
        // Guarantee at least 1 legendary card
        const legendaryCards = shuffled.filter(card => card.rarity === 'legendary')
        if (legendaryCards.length > 0 && !selectedCards.some(card => card.rarity === 'legendary')) {
          selectedCards = [legendaryCards[0], ...selectedCards.slice(1)]
        }
      } else if (pack.rarity === 'rare') {
        // Guarantee at least 1 rare or better card
        const rareOrBetter = shuffled.filter(card => card.rarity === 'rare' || card.rarity === 'legendary')
        if (rareOrBetter.length > 0 && !selectedCards.some(card => card.rarity === 'rare' || card.rarity === 'legendary')) {
          selectedCards = [rareOrBetter[0], ...selectedCards.slice(1)]
        }
      }
      
      onPackOpened(selectedCards)
    }, 500)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [progressInterval])

  const getSparkleColor = () => {
    switch (pack.rarity) {
      case 'legendary': return '#fbbf24' // Golden
      case 'rare': return '#a855f7' // Purple
      default: return '#3b82f6' // Blue
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-5xl h-[95vh] md:h-[90vh] overflow-hidden relative flex flex-col"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)/5_0%,_transparent_70%)]" />
        </div>

        {/* Sparkles Effect - Only show during opening phase */}
        <AnimatePresence>
          {phase === 'opening' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-[5]"
            >
              <SparklesCore
                id="pack-opening-sparkles"
                background="transparent"
                minSize={1}
                maxSize={4}
                particleDensity={100}
                className="w-full h-full"
                particleColor={getSparkleColor()}
                speed={3}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Using flex layout for better control */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Header Section */}
          <div className="flex-shrink-0 text-center pt-6 md:pt-8 px-4 md:px-8 pb-3 md:pb-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-3">{pack.name}</h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-2">{pack.description}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>5 premium cards await</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Pack Display - Flexible height that adapts to available space */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-2 md:py-4 min-h-0">
            <div className="w-full max-w-sm md:max-w-md h-full max-h-[300px] md:max-h-[400px] min-h-[250px] md:min-h-[300px]">
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                className="w-full h-full"
              >
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
          </div>

          {/* Controls Section */}
          <div className="flex-shrink-0 px-4 md:px-8 pb-6 md:pb-8">
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
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="text-lg font-medium">Opening pack...</span>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="w-80 max-w-full mx-auto">
                    <div className="h-3 bg-muted/50 rounded-full overflow-hidden border border-border">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-primary/80 relative"
                        initial={{ width: "0%" }}
                        animate={{ width: `${Math.round(progress)}%` }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                      >
                        {/* Progress glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-muted-foreground">
                        {Math.round(progress)}% complete
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Sparkles className="h-3 w-3" />
                        <span>Magic happening...</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress stages */}
                  <div className="text-xs text-muted-foreground">
                    {progress < 30 && "Unwrapping pack..."}
                    {progress >= 30 && progress < 60 && "Revealing contents..."}
                    {progress >= 60 && progress < 90 && "Preparing cards..."}
                    {progress >= 90 && "Almost ready!"}
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 