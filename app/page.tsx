"use client"

import { useEffect, useState } from "react"
import DynamicBackground from "@/components/dynamic-background"
import Navbar from "@/components/navbar"
import ParallaxSection from "@/components/parallax-section"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    {
      title: "Build, train, and deploy state of the art AI systems...",
      subtitle:
        "..in the cloud at scale, on your own local server, and anywhere in between.",
      imageUrl: "/placeholder.svg?height=500&width=500",
      imagePosition: "right",
    },
    {
      title: "AI Agents, assistants and multi node agentic workflows...,  ",
      subtitle:
        "...to automate processes, admin and documentation, content creation,  pretty much any of the time consuming repetitive tasks that keep you away from growing your business  ",
      imageUrl: "/placeholder.svg?height=500&width=500",
      imagePosition: "left",
    },
    {
      title: "Training, feeding and fine tuning highly expert specialist large language models...",
      subtitle:
        "Embracing the transformative power of AI to reshape industries and create new possibilities for human-machine collaboration.",
      imageUrl: "/placeholder.svg?height=500&width=500",
      imagePosition: "right",
    },
    {
      title: "Designing, building and deploying Whatsapp stickers...",
      subtitle:
        "..that'll have your friends and family howling, and your competitors running back to the drawing board.",
      imageUrl: "/placeholder.svg?height=500&width=500",
      imagePosition: "left",
    },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PageDown" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))
      } else if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault()
        setCurrentSection((prev) => Math.max(prev - 1, 0))
      }
    }

    const handleWheel = (e: WheelEvent) => {
      // Add a small delay to prevent too rapid scrolling
      if (e.deltaY > 50) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))
      } else if (e.deltaY < -50) {
        setCurrentSection((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [sections.length])

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-slate-900 text-white">
      <DynamicBackground />
      <Navbar />

      <div className="relative z-10 h-full">
        {sections.map((section, index) => (
          <ParallaxSection
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            imageUrl={section.imageUrl}
            imagePosition={section.imagePosition as "left" | "right"}
            isActive={currentSection === index}
            index={index}
            currentIndex={currentSection}
          />
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${currentSection === index ? "bg-amber-400" : "bg-gray-500"}`}
              onClick={() => setCurrentSection(index)}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
