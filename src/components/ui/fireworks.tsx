"use client"

import { useEffect, useRef } from 'react'

// Fireworks configuration
const PARTICLES_PER_FIREWORK = 200
const FIREWORK_CHANCE = 0.08
const BASE_PARTICLE_SPEED = 1.2
const FIREWORK_LIFESPAN = 800
const PARTICLE_INITIAL_SPEED = 5.5
const GRAVITY = 9.8

interface Particle {
  x: number
  y: number
  red: number
  green: number
  blue: number
  alpha: number
  radius: number
  angle: number
  speed: number
  velocityX: number
  velocityY: number
  startTime: number
  duration: number
  currentDuration: number
  dampening: number
  colour: string
  initialVelocityX: number
  initialVelocityY: number
  isFixedSpeed?: boolean
}

class FireworkParticle implements Particle {
  x: number
  y: number
  red: number
  green: number
  blue: number
  alpha: number
  radius: number
  angle: number
  speed: number
  velocityX: number
  velocityY: number
  startTime: number
  duration: number
  currentDuration: number
  dampening: number
  colour: string
  initialVelocityX: number
  initialVelocityY: number

  constructor(
    x = 0,
    y = 0,
    red = Math.floor(Math.random() * 255),
    green = Math.floor(Math.random() * 255),
    blue = Math.floor(Math.random() * 255),
    speed: number,
    isFixedSpeed?: boolean
  ) {
    this.x = x
    this.y = y
    this.red = red < 150 ? red + 150 : red
    this.green = green < 150 ? green + 150 : green
    this.blue = blue < 150 ? blue + 150 : blue
    this.alpha = 0.05
    this.radius = 1 + Math.random()
    this.angle = Math.random() * 360
    this.speed = Math.random() * speed + 0.1
    this.velocityX = Math.cos(this.angle) * this.speed
    this.velocityY = Math.sin(this.angle) * this.speed
    this.startTime = Date.now()
    this.duration = Math.random() * 300 + FIREWORK_LIFESPAN
    this.currentDuration = 0
    this.dampening = 30
    this.colour = this.getColour()

    if (isFixedSpeed) {
      this.speed = speed
      this.velocityY = Math.sin(this.angle) * this.speed
      this.velocityX = Math.cos(this.angle) * this.speed
    }

    this.initialVelocityX = this.velocityX
    this.initialVelocityY = this.velocityY
  }

  animate() {
    this.currentDuration = Date.now() - this.startTime

    // Initial speed kick
    if (this.currentDuration <= 200) {
      this.x += this.initialVelocityX * PARTICLE_INITIAL_SPEED
      this.y += this.initialVelocityY * PARTICLE_INITIAL_SPEED
      this.alpha += 0.01
      this.colour = this.getColour(240, 240, 240, 0.9)
    } else {
      // Normal expansion
      this.x += this.velocityX
      this.y += this.velocityY
      this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + Math.random() * 0.3)
    }

    this.velocityY += GRAVITY / 1000

    // Slow down particles at the end
    if (this.currentDuration >= this.duration) {
      this.velocityX -= this.velocityX / this.dampening
      this.velocityY -= this.velocityY / this.dampening
    }

    if (this.currentDuration >= this.duration + this.duration / 1.1) {
      // Fade out at the end
      this.alpha -= 0.02
      this.colour = this.getColour()
    } else {
      // Fade in during expansion
      if (this.alpha < 1) {
        this.alpha += 0.03
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = this.colour
    ctx.shadowBlur = 8
    ctx.shadowColor = this.getColour(this.red + 150, this.green + 150, this.blue + 150, 1)
    ctx.fill()
  }

  getColour(red?: number, green?: number, blue?: number, alpha?: number) {
    return `rgba(${red ?? this.red}, ${green ?? this.green}, ${blue ?? this.blue}, ${alpha ?? this.alpha})`
  }
}

interface FireworksProps {
  onFireworkTrigger?: () => void
  className?: string
}

export function Fireworks({ onFireworkTrigger, className = '' }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<FireworkParticle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const disableAutoFireworksRef = useRef(false)
  const resetDisableRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const createFirework = (x?: number, y?: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    x = x ?? Math.random() * canvas.width
    y = y ?? Math.random() * canvas.height

    const speed = Math.random() * 2 + BASE_PARTICLE_SPEED
    let maxSpeed = speed

    const red = Math.floor(Math.random() * 255)
    const green = Math.floor(Math.random() * 255)
    const blue = Math.floor(Math.random() * 255)

    // Inner firework
    for (let i = 0; i < PARTICLES_PER_FIREWORK; i++) {
      const particle = new FireworkParticle(x, y, red, green, blue, speed)
      particlesRef.current.push(particle)
      maxSpeed = speed > maxSpeed ? speed : maxSpeed
    }

    // Outer edge particles
    for (let i = 0; i < 40; i++) {
      const particle = new FireworkParticle(x, y, red, green, blue, maxSpeed, true)
      particlesRef.current.push(particle)
    }

    onFireworkTrigger?.()
  }

  const loop = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    if (!disableAutoFireworksRef.current && Math.random() < FIREWORK_CHANCE) {
      createFirework()
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((particle, i) => {
      particle.animate()
      particle.render(ctx)
      if (
        particle.y > canvas.height ||
        particle.x < 0 ||
        particle.x > canvas.width ||
        particle.alpha <= 0
      ) {
        particlesRef.current.splice(i, 1)
      }
    })

    animationRef.current = requestAnimationFrame(loop)
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    createFirework(x, y)

    // Stop auto fireworks when clicked
    disableAutoFireworksRef.current = true
    if (resetDisableRef.current) clearTimeout(resetDisableRef.current)
    resetDisableRef.current = setTimeout(() => {
      disableAutoFireworksRef.current = false
    }, 5000)
  }

  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    // Start the animation loop
    loop()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (resetDisableRef.current) {
        clearTimeout(resetDisableRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Method to trigger firework programmatically
  const triggerFirework = (x?: number, y?: number) => {
    createFirework(x, y)
  }

  // Expose the trigger method via ref
  useEffect(() => {
    if (canvasRef.current) {
      ;(canvasRef.current as HTMLCanvasElement & { triggerFirework?: (x?: number, y?: number) => void }).triggerFirework = triggerFirework
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className={`fixed inset-0 pointer-events-auto z-10 ${className}`}
      style={{ background: 'transparent' }}
    />
  )
} 