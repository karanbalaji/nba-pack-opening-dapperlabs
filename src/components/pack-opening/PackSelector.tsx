"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pack } from "./PackOpeningFlow"
import { ThemeSwitcherWrapper } from "@/components/theme-switcher-wrapper"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { SparklesCore } from "@/components/ui/sparkles"

const AVAILABLE_PACKS: Pack[] = [
  {
    id: "freshman-gems",
    name: "Freshman Gems",
    price: 29.99,
    rarity: "rare",
    image: "/media/pack-image-1.png",
    model3D: "/media/3D/card-pack-3D-1.glb",
    description: "Premium rookie cards with exclusive rookie moments and rising stars"
  },
  {
    id: "elite-collection", 
    name: "Elite Series",
    price: 49.99,
    rarity: "legendary",
    image: "/media/pack-image-2.png",
    model3D: "/media/3D/card-pack-3d-2.glb",
    description: "Championship moments from legendary players and All-Stars"
  }
]

// 3D Image Component for pack images
function Image3D({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 20  // More sensitive rotation
    const y = (e.clientY - top - height / 2) / 20
    
    // Apply rotation to container and scale + translateZ to image
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    imageRef.current.style.transform = `translateZ(40px) scale(1.1)` // Pop out effect
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () => {
    if (!containerRef.current || !imageRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
    imageRef.current.style.transform = `translateZ(0px) scale(1)`
  }

  return (
    <div
      className="w-full h-full"
      style={{ 
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("w-full h-full transition-all duration-300 ease-out", className)}
        style={{ 
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-300 ease-out"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            filter: isMouseEntered ? "brightness(1.1)" : "brightness(1)",
            boxShadow: isMouseEntered 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
              : "none"
          }}
        />
        
        {/* Subtle glow effect on hover */}
        {isMouseEntered && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
              transform: "translateZ(2px)"
            }}
          />
        )}
      </div>
    </div>
  )
}

interface PackSelectorProps {
  onPackSelect: (pack: Pack) => void
}

export function PackSelector({ onPackSelect }: PackSelectorProps) {

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/media/top-shot-logo.png" 
              alt="NBA Top Shot" 
              className="h-20 w-auto"
            />
          </div>
          <ThemeSwitcherWrapper />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Choose Your Pack
          </h2>
          
          <p className="text-muted-foreground mb-3">
            Guaranteed rare or better in every pack
          </p>
        </motion.div>

        {/* Pack Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-6">
          {AVAILABLE_PACKS.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative">
                {/* Sparkles Border Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <SparklesCore
                    id={`sparkles-${pack.id}`}
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={50}
                    className="w-full h-full absolute inset-0"
                    particleColor={
                      pack.rarity === 'legendary' ? '#fbbf24' :
                      pack.rarity === 'rare' ? '#a855f7' : '#3b82f6'
                    }
                    speed={0.5}
                  />
                </div>
                
                <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl z-10">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image3D
                      src={pack.image}
                      alt={pack.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Rarity Badge */}
                    <Badge 
                      className={`absolute top-4 right-4 ${
                        pack.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50' :
                        pack.rarity === 'rare' ? 'bg-purple-500/20 text-purple-300 border-purple-400/50' :
                        'bg-blue-500/20 text-blue-300 border-blue-400/50'
                      }`}
                    >
                      {pack.rarity.toUpperCase()}
                    </Badge>
                  </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{pack.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {pack.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold">${pack.price}</span>
                      <div className="text-xs text-muted-foreground">USD</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1 text-xs">
                        5 Cards Guaranteed
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {pack.rarity === 'legendary' ? '1+ Legendary' : '1+ Rare'} Guaranteed
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full text-base py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary font-bold"
                      onClick={() => onPackSelect(pack)}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Open Pack
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-8">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Built by <span className="font-semibold text-foreground">Karan Balaji</span>
          </p>
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://github.com/karanbalaji/nba-pack-opening-dapperlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/karanbalaji/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
} 