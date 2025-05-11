"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ParallaxSectionProps {
  title: string
  subtitle: string
  imageUrl: string
  imagePosition: "left" | "right"
  isActive: boolean
  index: number
  currentIndex: number
}

export default function ParallaxSection({
  title,
  subtitle,
  imageUrl,
  imagePosition,
  isActive,
  index,
  currentIndex,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [isActive])

  // Calculate the direction of the section relative to the current view
  const direction = index > currentIndex ? 1 : -1
  const distance = Math.abs(index - currentIndex)

  // Variants for animations
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 100 * direction,
    },
    visible: {
      opacity: isActive ? 1 : 0,
      y: isActive ? 0 : 100 * direction,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -100 * direction,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: imagePosition === "right" ? 100 : -100,
    },
    visible: {
      opacity: isActive ? 1 : 0,
      x: isActive ? 0 : imagePosition === "right" ? 100 : -100,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: imagePosition === "right" ? 200 : -200,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  }

  return (
    <div
      ref={sectionRef}
      className={`absolute inset-0 flex h-full w-full items-center justify-center px-8 ${isActive ? "z-10" : "z-0"}`}
      style={{
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div className="container mx-auto">
        <div
          className={`flex flex-col items-center lg:flex-row lg:items-center lg:justify-between ${
            imagePosition === "left" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <motion.div
            className="mb-8 w-full lg:mb-0 lg:w-5/12"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            exit="exit"
            variants={containerVariants}
          >
            <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl lg:text-6xl">{title}</h2>
            <p className="max-w-lg text-lg text-gray-300">{subtitle}</p>
            <button className="mt-6 rounded-md bg-amber-400 px-6 py-3 font-medium text-slate-900 hover:bg-amber-300">
              SEE MORE
            </button>
          </motion.div>

          <motion.div
            className="w-full lg:w-5/12"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            exit="exit"
            variants={imageVariants}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="h-auto w-full max-w-md rounded-lg object-cover shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
