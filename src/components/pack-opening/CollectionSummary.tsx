"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card as PlayerCard, Pack } from "./PackOpeningFlow"
import { Share2, Download, RotateCcw, Trophy, Star, TrendingUp } from "lucide-react"

interface CollectionSummaryProps {
  cards: PlayerCard[]
  pack: Pack
  onReturnToSelection: () => void
}

export function CollectionSummary({ cards, pack, onReturnToSelection }: CollectionSummaryProps) {
  const rarityCount = {
    legendary: cards.filter(c => c.rarity === 'legendary').length,
    rare: cards.filter(c => c.rarity === 'rare').length,
    common: cards.filter(c => c.rarity === 'common').length
  }

  const totalValue = cards.reduce((sum, card) => {
    const baseValue = card.rarity === 'legendary' ? 100 : card.rarity === 'rare' ? 50 : 25
    return sum + baseValue
  }, 0)

  const bestCard = cards.reduce((best, card) => {
    const getValue = (c: PlayerCard) => 
      c.rarity === 'legendary' ? 3 : c.rarity === 'rare' ? 2 : 1
    return getValue(card) > getValue(best) ? card : best
  }, cards[0])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)/5_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Pack Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {pack.name} • 5 Cards Collected
          </p>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-muted-foreground">Total Value: ${totalValue}</span>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Cards */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold">{cards.length}</CardTitle>
              <CardDescription>Total Cards</CardDescription>
            </CardHeader>
          </Card>

          {/* Legendary Cards */}
          <Card className="text-center border-yellow-500/20 bg-yellow-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-yellow-500">
                {rarityCount.legendary}
              </CardTitle>
              <CardDescription>Legendary</CardDescription>
            </CardHeader>
          </Card>

          {/* Rare Cards */}
          <Card className="text-center border-purple-500/20 bg-purple-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-purple-500">
                {rarityCount.rare}
              </CardTitle>
              <CardDescription>Rare</CardDescription>
            </CardHeader>
          </Card>

          {/* Common Cards */}
          <Card className="text-center border-blue-500/20 bg-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-blue-500">
                {rarityCount.common}
              </CardTitle>
              <CardDescription>Common</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Best Card Highlight */}
        {bestCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <CardTitle className="text-2xl">Best Pull</CardTitle>
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <CardDescription>Your highest rarity card from this pack</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  {/* Video + Headshot Picture-in-Picture */}
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                    {/* Main Video Content */}
                    <video
                      src={bestCard.video}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Headshot Picture-in-Picture Overlay */}
                    <div className="absolute top-2 right-2 w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 shadow-lg">
                      <img
                        src={bestCard.headshot}
                        alt={bestCard.playerName}
                        className="w-full h-full object-cover"
                      />
                      {/* Rarity glow effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${
                        bestCard.rarity === 'legendary' ? 'from-yellow-400 to-orange-500' :
                        bestCard.rarity === 'rare' ? 'from-purple-400 to-pink-500' :
                        'from-blue-400 to-cyan-500'
                      } opacity-20`} />
                    </div>

                    {/* Video Play Indicator */}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-xs font-medium">LIVE</span>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2">{bestCard.playerName}</h3>
                    <Badge className={
                      bestCard.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50' :
                      bestCard.rarity === 'rare' ? 'bg-purple-500/20 text-purple-300 border-purple-400/50' :
                      'bg-blue-500/20 text-blue-300 border-blue-400/50'
                    }>
                      {bestCard.rarity.toUpperCase()}
                    </Badge>
                    <p className="text-muted-foreground mt-2">{bestCard.team} • {bestCard.position}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <div><span className="text-muted-foreground">PPG:</span> <span className="font-semibold">{bestCard.stats.points}</span></div>
                      <div><span className="text-muted-foreground">APG:</span> <span className="font-semibold">{bestCard.stats.assists}</span></div>
                      <div><span className="text-muted-foreground">RPG:</span> <span className="font-semibold">{bestCard.stats.rebounds}</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* All Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Your Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="aspect-square relative">
                    {/* Main Video Content */}
                    <video 
                      src={card.video}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Headshot Picture-in-Picture */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full overflow-hidden border border-white/60 shadow-md">
                      <img 
                        src={card.headshot}
                        alt={card.playerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Rarity Badge */}
                    <Badge 
                      className={`absolute top-2 left-2 text-xs ${
                        card.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50' :
                        card.rarity === 'rare' ? 'bg-purple-500/20 text-purple-300 border-purple-400/50' :
                        'bg-blue-500/20 text-blue-300 border-blue-400/50'
                      }`}
                    >
                      {card.rarity[0].toUpperCase()}
                    </Badge>

                    {/* Player Info */}
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <h4 className="font-semibold text-sm truncate">{card.playerName}</h4>
                      <p className="text-xs opacity-80">{card.team}</p>
                    </div>

                    {/* Video Indicator */}
                    <div className="absolute bottom-2 right-2 bg-black/40 rounded-full p-1">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" onClick={onReturnToSelection} className="gap-2">
            <RotateCcw className="h-5 w-5" />
            Open Another Pack
          </Button>
          
          <Button variant="outline" size="lg" className="gap-2">
            <Share2 className="h-5 w-5" />
            Share Collection
          </Button>
          
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Save Cards
          </Button>
        </motion.div>

        {/* Pack Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Pack Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Pack Cost:</span>
                <span className="font-semibold">${pack.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Collection Value:</span>
                <span className="font-semibold text-green-500">${totalValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Profit:</span>
                <span className={`font-semibold ${totalValue > pack.price ? 'text-green-500' : 'text-red-500'}`}>
                  ${(totalValue - pack.price).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 