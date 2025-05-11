"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  animationDuration: number;
  animationDelay: number;
}

const colors = ["#e91e63", "#f48fb1", "#80cbc4", "#ffeb3b", "#ffc107"]; // Pinks, teal, yellow, orange

interface ConfettiProps {
  isActive: boolean;
  particleCount?: number;
}

export function Confetti({ isActive, particleCount = 100 }: ConfettiProps) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  const createParticles = useCallback(() => {
    if (typeof window === "undefined") return [];
    const newParticles: ConfettiParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200, // Start above the screen
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4, // size between 4px and 12px
        animationDuration: Math.random() * 2 + 3, // duration between 3s and 5s
        animationDelay: Math.random() * 2, // delay up to 2s
      });
    }
    return newParticles;
  }, [particleCount]);

  useEffect(() => {
    if (isActive) {
      setParticles(createParticles());
      const timer = setTimeout(() => setParticles([]), 5000); // Clear particles after 5 seconds
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isActive, createParticles]);

  if (!isActive || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            opacity: 0, // Initial opacity set to 0, animation will handle fade in/out
          }}
        />
      ))}
    </div>
  );
}
