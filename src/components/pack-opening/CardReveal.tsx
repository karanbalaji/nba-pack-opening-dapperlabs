"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "./PackOpeningFlow"
import { Sparkles, Star } from "lucide-react"

interface CardRevealProps {
  cards: Card[]
  onRevealComplete: () => void
}

function PlayerCard({ card, isRevealed, onReveal }: { 
  card: Card
  isRevealed: boolean
  onReveal: () => void 
}) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'rare': return 'from-purple-400 to-pink-500'
      default: return 'from-blue-400 to-cyan-500'
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500/90 text-yellow-100 border-yellow-400'
      case 'rare': return 'bg-purple-500/90 text-purple-100 border-purple-400'
      default: return 'bg-blue-500/90 text-blue-100 border-blue-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateY: 180 }}
      animate={isRevealed ? { 
        opacity: 1, 
        y: 0, 
        rotateY: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      } : {}}
      className="w-full"
    >
      {/* Card Container - Clean, no 3D effects */}
      <div className="relative bg-card border-2 border-border rounded-xl overflow-hidden w-full h-[500px] group hover:border-primary/50 transition-all duration-300">
        {/* Video Background - Full Card */}
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={card.video}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Rarity Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(card.rarity)} opacity-10`} />

        {/* Top Row - Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <Badge variant="outline" className="bg-black/70 text-white border-white/30 backdrop-blur-sm">
            {card.team} • {card.position}
          </Badge>
          <Badge className={`${getRarityBadgeColor(card.rarity)} backdrop-blur-sm border`}>
            {card.rarity.toUpperCase()}
          </Badge>
        </div>

        {/* Live Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
        </div>

        {/* Player Info - Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Player Name & Profile Picture */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/90 shadow-xl flex-shrink-0"
            >
              <img
                src={card.headshot}
                alt={card.playerName}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white leading-tight mb-1">{card.playerName}</h3>
              <p className="text-white/80 text-sm">{card.team} • {card.position}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{card.stats.points}</div>
                <div className="text-white/70 text-xs font-medium mt-1">PPG</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{card.stats.assists}</div>
                <div className="text-white/70 text-xs font-medium mt-1">APG</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{card.stats.rebounds}</div>
                <div className="text-white/70 text-xs font-medium mt-1">RPG</div>
              </div>
            </div>
          </div>

          {/* Rarity Stars */}
          {card.rarity !== 'common' && (
            <div className="flex justify-center">
              <div className="flex gap-1">
                {[...Array(card.rarity === 'legendary' ? 3 : 2)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rarity Shimmer Effect */}
        {card.rarity !== 'common' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(card.rarity)} opacity-5 animate-pulse`} />
          </div>
        )}

        {/* Reveal Button Overlay */}
        {!isRevealed && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-20">
            <Button onClick={onReveal} size="lg" className="gap-2 text-lg px-8 py-4">
              <Sparkles className="h-6 w-6" />
              Reveal Card
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function CardReveal({ cards, onRevealComplete }: CardRevealProps) {
  const [revealedIndices, setRevealedIndices] = useState<number[]>([])
  const [autoRevealEnabled, setAutoRevealEnabled] = useState(true)

  const handleRevealCard = useCallback((index: number) => {
    setRevealedIndices(prev => {
      if (prev.includes(index)) return prev
      
      const newIndices = [...prev, index]
      
      // Auto-advance to next card after a delay (only if auto-reveal is enabled)
      if (autoRevealEnabled && index < cards.length - 1) {
        setTimeout(() => {
          handleRevealCard(index + 1)
        }, 1200) // Reduced delay for better pacing
      }
      
      return newIndices
    })
  }, [autoRevealEnabled, cards.length])

  const handleRevealAll = () => {
    setAutoRevealEnabled(false) // Disable auto-reveal when manually revealing all
    const allIndices = cards.map((_, i) => i)
    setRevealedIndices(allIndices)
  }

  const allRevealed = revealedIndices.length === cards.length

  // Auto-reveal first card after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (revealedIndices.length === 0) {
        handleRevealCard(0)
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [handleRevealCard, revealedIndices.length])

  useEffect(() => {
    if (allRevealed) {
      // Remove auto-advance - let user decide when to proceed
      // const timer = setTimeout(() => {
      //   onRevealComplete()
      // }, 2500)
      // return () => clearTimeout(timer)
    }
  }, [allRevealed, onRevealComplete])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)/3_0%,_transparent_70%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Your Cards
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            {revealedIndices.length} of {cards.length} revealed
          </p>
          
          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* Reveal All Button */}
            {!allRevealed && revealedIndices.length > 0 && (
              <Button variant="outline" onClick={handleRevealAll} className="">
                Reveal All Cards
              </Button>
            )}
            
            {/* Continue Button - Only show when all cards are revealed */}
            {allRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  size="lg" 
                  onClick={onRevealComplete}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  View Collection Summary
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <PlayerCard
              key={card.id}
              card={card}
              isRevealed={revealedIndices.includes(index)}
              onReveal={() => handleRevealCard(index)}
            />
          ))}
        </div>
      </div>

      {/* Completion Message - Remove auto-advance overlay */}
      {allRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 text-center py-8"
        >
          <div className="max-w-md mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Sparkles className="h-12 w-12 mx-auto text-yellow-500" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">All Cards Revealed!</h2>
            <p className="text-muted-foreground">Check out your amazing collection above, then view the summary when ready.</p>
          </div>
        </motion.div>
      )}

      {/* Particle Effects for Special Cards */}
      {revealedIndices.map(index => {
        const card = cards[index]
        if (card.rarity === 'legendary') {
          return (
            <div key={`particles-${index}`} className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
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
                    duration: 3,
                    delay: Math.random() * 1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )
        }
        return null
      })}
    </div>
  )
} 