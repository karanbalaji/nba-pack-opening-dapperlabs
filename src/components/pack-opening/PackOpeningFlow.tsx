"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { PackSelector } from "./PackSelector"
import { PackOpening } from "./PackOpening"
import { CardReveal } from "./CardReveal"
import { CollectionSummary } from "./CollectionSummary"

export type PackOpeningState = 'selection' | 'opening' | 'revealing' | 'summary'

export interface Pack {
  id: string
  name: string
  price: number
  rarity: 'common' | 'rare' | 'legendary'
  image: string
  model3D: string
  description: string
}

export interface Card {
  id: string
  playerName: string
  team: string
  position: string
  rarity: 'common' | 'rare' | 'legendary'
  headshot: string
  video: string
  stats: {
    points: number
    assists: number
    rebounds: number
  }
}

export function PackOpeningFlow() {
  const [currentState, setCurrentState] = useState<PackOpeningState>('selection')
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
  const [revealedCards, setRevealedCards] = useState<Card[]>([])

  const handlePackSelect = (pack: Pack) => {
    setSelectedPack(pack)
    setCurrentState('opening')
  }

  const handlePackOpened = (cards: Card[]) => {
    setRevealedCards(cards)
    setCurrentState('revealing')
  }

  const handleCardsRevealed = () => {
    setCurrentState('summary')
  }

  const handleReturnToSelection = () => {
    setCurrentState('selection')
    setSelectedPack(null)
    setRevealedCards([])
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Always show PackSelector for selection and opening states */}
      {(currentState === 'selection' || currentState === 'opening') && (
        <PackSelector onPackSelect={handlePackSelect} />
      )}
      
      {/* Modal for pack opening */}
      <AnimatePresence>
        {currentState === 'opening' && selectedPack && (
          <PackOpening 
            pack={selectedPack} 
            onPackOpened={handlePackOpened}
            onClose={handleReturnToSelection}
          />
        )}
      </AnimatePresence>
      
      {currentState === 'revealing' && (
        <CardReveal 
          cards={revealedCards}
          onRevealComplete={handleCardsRevealed}
        />
      )}
      
      {currentState === 'summary' && (
        <CollectionSummary 
          cards={revealedCards}
          pack={selectedPack!}
          onReturnToSelection={handleReturnToSelection}
        />
      )}
    </div>
  )
} 