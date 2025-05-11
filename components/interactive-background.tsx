"use client"

import { useEffect, useRef, useState } from "react"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set initial mouse position to center
    setMousePosition({ x: 0.5, y: 0.5 })

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setScrollPosition(maxScroll > 0 ? scrollY / maxScroll : 0)
    }

    const drawInteractiveBackground = () => {
      // Clear canvas with a semi-transparent fill to create trail effect
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)" // Slate-900 with opacity
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Parameters affected by mouse and scroll
      const gridSize = 40 // Larger grid for subtlety
      const width = window.innerWidth
      const height = window.innerHeight
      const rows = Math.ceil(height / gridSize) + 1
      const cols = Math.ceil(width / gridSize) + 1

      // Mouse influence
      const mouseInfluenceX = (mousePosition.x - 0.5) * 2 // -1 to 1
      const mouseInfluenceY = (mousePosition.y - 0.5) * 2 // -1 to 1

      // Scroll influence
      const scrollInfluence = scrollPosition * 5 // Amplify effect

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * gridSize
          const centerY = y * gridSize

          // Calculate distance from mouse position for influence
          const distanceFromMouse = Math.sqrt(
            Math.pow(centerX / width - mousePosition.x, 2) + Math.pow(centerY / height - mousePosition.y, 2),
          )

          // Wave parameters influenced by mouse and scroll
          const waveSpeed = 0.02 + scrollPosition * 0.03 // Scroll affects speed
          const waveFrequency = 3 + mouseInfluenceX * 2 // Mouse X affects frequency
          const waveAmplitude = 0.3 + mouseInfluenceY * 0.2 // Mouse Y affects amplitude

          // Calculate wave value
          const waveValue =
            Math.sin(x * 0.2 + y * 0.1 + time * waveSpeed + distanceFromMouse * waveFrequency + scrollInfluence) *
            waveAmplitude

          // Size modulation
          const baseSize = gridSize * 0.3 // Smaller dots for subtlety
          const size = baseSize + baseSize * waveValue * 0.5

          // Opacity modulation for subtlety
          const opacity = 0.1 + waveValue * 0.15

          // Draw the dot
          ctx.beginPath()
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
        }
      }
    }

    const animate = () => {
      drawInteractiveBackground()
      time += 0.01 // Slower time progression for subtlety
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Initial scroll position
    handleScroll()

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
