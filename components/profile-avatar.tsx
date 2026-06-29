"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ProfileAvatarProps {
  src: string
  alt: string
  /** Optional extra classes for the outer wrapper */
  className?: string
}

export function ProfileAvatar({ src, alt, className }: ProfileAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative inline-block ${className ?? ""}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsHovered(true)}
      onTap={() => setIsHovered(false)}
      onTapCancel={() => setIsHovered(false)}
      style={{ perspective: 800 }}
    >
      {/* Floating glow ring - activates on hover */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-primary/30 blur-2xl"
        initial={{ opacity: 0.15, scale: 0.9 }}
        animate={
          isHovered
            ? { opacity: 0.6, scale: 1.08 }
            : { opacity: 0.15, scale: 0.9 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Animated ring outline */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-1 rounded-full border-2 border-primary/60"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isHovered
            ? { opacity: 1, scale: 1.04 }
            : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Avatar image with 3D tilt + scale */}
      <motion.div
        className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-border shadow-xl shadow-black/40"
        initial={{ scale: 1, rotateY: 0, rotateX: 0 }}
        animate={
          isHovered
            ? { scale: 1.05, rotateY: 8, rotateX: -4 }
            : { scale: 1, rotateY: 0, rotateX: 0 }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Waving hand - appears from bottom-right behind the avatar */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            aria-hidden="true"
            className="absolute bottom-4 -right-2 sm:bottom-6 sm:-right-3 z-10 text-4xl sm:text-5xl select-none origin-bottom-left"
            initial={{ opacity: 0, scale: 0.4, x: -20, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, x: -20, y: 10 }}
            transition={{ duration: 0.35, ease: "backOut" }}
          >
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 18, -8, 18, -4, 14, 0] }}
              transition={{
                duration: 1.1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            >
              {String.fromCodePoint(0x1f44b)}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}