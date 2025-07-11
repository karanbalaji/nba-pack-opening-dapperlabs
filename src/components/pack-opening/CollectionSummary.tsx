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

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Pack Complete!
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground">
            <span className="text-lg">{pack.name} • 5 Cards Collected</span>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>Total Value: ${totalValue}</span>
            </div>
          </div>
        </motion.div>

        {/* Compact Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {/* Total Cards */}
          <Card className="text-center">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-2xl font-bold">{cards.length}</CardTitle>
              <CardDescription className="text-xs">Total Cards</CardDescription>
            </CardHeader>
          </Card>

          {/* Legendary Cards */}
          <Card className="text-center border-yellow-500/20 bg-yellow-500/5">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-2xl font-bold text-yellow-500">
                {rarityCount.legendary}
              </CardTitle>
              <CardDescription className="text-xs">Legendary</CardDescription>
            </CardHeader>
          </Card>

          {/* Rare Cards */}
          <Card className="text-center border-purple-500/20 bg-purple-500/5">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-2xl font-bold text-purple-500">
                {rarityCount.rare}
              </CardTitle>
              <CardDescription className="text-xs">Rare</CardDescription>
            </CardHeader>
          </Card>

          {/* Common Cards */}
          <Card className="text-center border-blue-500/20 bg-blue-500/5">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-2xl font-bold text-blue-500">
                {rarityCount.common}
              </CardTitle>
              <CardDescription className="text-xs">Common</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Best Pull - Clean 2-Column Layout */}
        {bestCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
              {/* Enhanced Best Pull Video Card */}
              <div className="relative bg-card border-2 border-border rounded-xl overflow-hidden w-64 h-96 group hover:border-primary/50 transition-all duration-300">
                {/* Video Background - Full Card */}
                <video
                  src={bestCard.video}
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                {/* Rarity Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  bestCard.rarity === 'legendary' ? 'from-yellow-400 to-orange-500' :
                  bestCard.rarity === 'rare' ? 'from-purple-400 to-pink-500' :
                  'from-blue-400 to-cyan-500'
                } opacity-15`} />

                {/* Top Row - Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                  <Badge variant="outline" className="bg-black/70 text-white border-white/30 backdrop-blur-sm text-xs">
                    {bestCard.team} • {bestCard.position}
                  </Badge>
                  <Badge className={`${
                    bestCard.rarity === 'legendary' ? 'bg-yellow-500/90 text-yellow-100 border-yellow-400' :
                    bestCard.rarity === 'rare' ? 'bg-purple-500/90 text-purple-100 border-purple-400' :
                    'bg-blue-500/90 text-blue-100 border-blue-400'
                  } backdrop-blur-sm border text-xs`}>
                    {bestCard.rarity.toUpperCase()}
                  </Badge>
                </div>

                {/* Live Indicator */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium">LIVE</span>
                  </div>
                </div>

                {/* Player Info - Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  {/* Player Name & Profile Picture */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/90 shadow-lg flex-shrink-0">
                      <img
                        src={bestCard.headshot}
                        alt={bestCard.playerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white leading-tight">{bestCard.playerName}</h3>
                      <p className="text-white/80 text-xs">{bestCard.team}</p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">{bestCard.stats.points}</div>
                        <div className="text-white/70 text-xs">PPG</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">{bestCard.stats.assists}</div>
                        <div className="text-white/70 text-xs">APG</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">{bestCard.stats.rebounds}</div>
                        <div className="text-white/70 text-xs">RPG</div>
                      </div>
                    </div>
                  </div>

                  {/* Rarity Stars - 5 Star Rating System */}
                  <div className="flex justify-center mt-2 relative z-20">
                    <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex gap-1">
                      {[...Array(5)].map((_, i) => {
                        const getStarCount = (rarity: string) => {
                          switch (rarity) {
                            case 'legendary': return 5
                            case 'rare': return 3
                            case 'common': return 1
                            default: return 1
                          }
                        }
                        const filledStars = getStarCount(bestCard.rarity)
                        const isFilled = i < filledStars
                        
                        return (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 drop-shadow-lg transition-all duration-200 ${
                              isFilled 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'fill-gray-300 text-gray-300 opacity-50'
                            }`} 
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Rarity Shimmer Effect */}
                {bestCard.rarity !== 'common' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      bestCard.rarity === 'legendary' ? 'from-yellow-400 to-orange-500' :
                      bestCard.rarity === 'rare' ? 'from-purple-400 to-pink-500' :
                      'from-blue-400 to-cyan-500'
                    } opacity-5 animate-pulse`} />
                  </div>
                )}
              </div>
              
              {/* Card Details */}
              <div className="text-center lg:text-left space-y-4 lg:flex-1">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Best Pull
                    </h2>
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {bestCard.playerName}
                  </h3>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                    <Badge className={
                      bestCard.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50' :
                      bestCard.rarity === 'rare' ? 'bg-purple-500/20 text-purple-300 border-purple-400/50' :
                      'bg-blue-500/20 text-blue-300 border-blue-400/50'
                    }>
                      {bestCard.rarity.toUpperCase()} CARD
                    </Badge>
                    <Badge variant="outline">
                      {bestCard.team} • {bestCard.position}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
                  <div className="text-center p-3 bg-card/50 rounded-lg border">
                    <div className="text-xl font-bold text-primary">{bestCard.stats.points}</div>
                    <div className="text-sm text-muted-foreground font-medium">PPG</div>
                  </div>
                  <div className="text-center p-3 bg-card/50 rounded-lg border">
                    <div className="text-xl font-bold text-primary">{bestCard.stats.assists}</div>
                    <div className="text-sm text-muted-foreground font-medium">APG</div>
                  </div>
                  <div className="text-center p-3 bg-card/50 rounded-lg border">
                    <div className="text-xl font-bold text-primary">{bestCard.stats.rebounds}</div>
                    <div className="text-sm text-muted-foreground font-medium">RPG</div>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-muted-foreground text-sm">
                    An incredible pull from your {pack.name} pack! This {bestCard.rarity} card showcases one of the NBA&apos;s top performers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Your Collection - Original Full Width Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Your Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {cards.map((card, index) => {
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
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="w-full"
                >
                  {/* Card Container - Clean, no 3D effects */}
                  <div className="relative bg-card border-2 border-border rounded-xl overflow-hidden w-full h-[400px] group hover:border-primary/50 transition-all duration-300">
                    {/* Video Background - Full Card */}
                    <video
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
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                      <Badge variant="outline" className="bg-black/70 text-white border-white/30 backdrop-blur-sm text-xs">
                        {card.team} • {card.position}
                      </Badge>
                      <Badge className={`${getRarityBadgeColor(card.rarity)} backdrop-blur-sm border text-xs`}>
                        {card.rarity.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Live Indicator */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-white text-xs font-medium">LIVE</span>
                      </div>
                    </div>

                    {/* Player Info - Bottom Section */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      {/* Player Name & Profile Picture */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 shadow-lg flex-shrink-0">
                          <img
                            src={card.headshot}
                            alt={card.playerName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white leading-tight">{card.playerName}</h3>
                          <p className="text-white/80 text-xs">{card.team} • {card.position}</p>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{card.stats.points}</div>
                            <div className="text-white/70 text-xs font-medium">PPG</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{card.stats.assists}</div>
                            <div className="text-white/70 text-xs font-medium">APG</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{card.stats.rebounds}</div>
                            <div className="text-white/70 text-xs font-medium">RPG</div>
                          </div>
                        </div>
                      </div>

                      {/* Rarity Stars - 5 Star Rating System */}
                      <div className="flex justify-center mt-3 relative z-20">
                        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 flex gap-1">
                          {[...Array(5)].map((_, i) => {
                            const getStarCount = (rarity: string) => {
                              switch (rarity) {
                                case 'legendary': return 5
                                case 'rare': return 3
                                case 'common': return 1
                                default: return 1
                              }
                            }
                            const filledStars = getStarCount(card.rarity)
                            const isFilled = i < filledStars
                            
                            return (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 drop-shadow-lg transition-all duration-200 ${
                                  isFilled 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'fill-gray-300 text-gray-300 opacity-50'
                                }`} 
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Rarity Shimmer Effect */}
                    {card.rarity !== 'common' && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(card.rarity)} opacity-5 animate-pulse`} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
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

        {/* Compact Pack Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <Card className="max-w-sm mx-auto">
            <CardHeader className="py-3">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <TrendingUp className="h-4 w-4" />
                Pack Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 py-3">
              <div className="flex justify-between text-sm">
                <span>Pack Cost:</span>
                <span className="font-semibold">${pack.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Collection Value:</span>
                <span className="font-semibold text-green-500">${totalValue}</span>
              </div>
              <div className="flex justify-between text-sm">
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