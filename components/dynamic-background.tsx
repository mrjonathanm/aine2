"use client"

import { useEffect, useRef } from "react"

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Create particles
    const particleCount = 200
    const particles: Particle[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 2
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1

        // Dark blue to purple color range
        const hue = Math.floor(Math.random() * 60) + 220 // 220-280 range (blue to purple)
        const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 40 // 40-60%
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, `
        this.alpha = Math.random() * 0.5 + 0.1 // 0.1-0.6 opacity
      }

      update() {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Slightly vary speed for organic movement
        this.speedX += (Math.random() - 0.5) * 0.05
        this.speedY += (Math.random() - 0.5) * 0.05

        // Limit max speed
        const maxSpeed = 1.5
        if (Math.abs(this.speedX) > maxSpeed) {
          this.speedX = this.speedX > 0 ? maxSpeed : -maxSpeed
        }
        if (Math.abs(this.speedY) > maxSpeed) {
          this.speedY = this.speedY > 0 ? maxSpeed : -maxSpeed
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `${this.color}${this.alpha})`
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connect particles with lines if they're close enough
    function connectParticles() {
      const maxDistance = 100

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / maxDistance

            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 120, 255, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)" // Dark slate with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect nearby particles
      connectParticles()

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 h-full w-full bg-slate-900" style={{ zIndex: 0 }} />
}
