"use client";
import React from 'react';

interface EnvelopeIconProps {
  isOpened: boolean;
  onClick: () => void;
  className?: string;
}

export function EnvelopeIcon({ isOpened, onClick, className }: EnvelopeIconProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-48 h-32 md:w-64 md:h-40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group perspective-1000 ${className}`}
      aria-label={isOpened ? "Sobre abierto" : "Abrir sobre"}
      aria-expanded={isOpened}
      style={{ transformStyle: "preserve-3d" }}
    >
      <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: "hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) + 10%))"}} />
            <stop offset="100%" style={{stopColor: "hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 10%))"}} />
          </linearGradient>
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="1.5"/>
            <feOffset dx="0" dy="0.5" result="offsetblur"/>
            <feFlood floodColor="black" floodOpacity="0.25" result="color"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>
        </defs>

        {/* Main envelope back */}
        <rect x="0" y="0" width="100" height="60" rx="3" ry="3" fill="url(#envelopeGradient)" />

        {/* Left and Right side flaps (these would typically be folded in first) */}
        <path d="M 0 0 L 20 30 L 0 60 Z" fill="hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 8%))" style={{filter: "brightness(0.95)"}}/>
        <path d="M 100 0 L 80 30 L 100 60 Z" fill="hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 8%))" style={{filter: "brightness(0.95)"}} />

        {/* Bottom flap (folded up) */}
        <path d="M 0 60 L 50 35 L 100 60 L 0 60 Z" fill="hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) + 0%))" filter="url(#innerShadow)" />
        
        {/* Top Flap - this will animate */}
        <path
          d="M0,0 L100,0 L50,30 Z"
          fill="hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) + 10%))"
          className={`transition-all duration-700 ease-out group-hover:brightness-110`}
          style={{
            transformOrigin: '50% 0%', // Hinge at the top edge (y=0 line of the path)
            transform: isOpened ? 'rotateX(-165deg) translateY(-1px) translateZ(8px)' : 'rotateX(0deg) translateY(0px) translateZ(0px)',
            transitionProperty: 'transform, fill',
            filter: "url(#innerShadow)"
          }}
        />

        {/* Heart seal (only when closed) */}
        {!isOpened && (
          // The g element is used for transformation to position the heart correctly on the flap
          // The flap's tip is at (50,30), but the heart should be centered around y=15 of the flap.
          // Viewbox height is 60. Flap tip at y=30. Centering heart visually.
          <g transform="translate(0, 3)" style={{transformOrigin: "50% 15px"}}> 
            <path
              d="M50 15C45 10 35 12 35 20C35 28 50 35 50 35C50 35 65 28 65 20C65 12 55 10 50 15Z"
              fill="hsl(var(--primary-foreground))"
              className="opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                  filter: 'drop-shadow(0px 1px 1.5px hsla(var(--primary-h), var(--primary-s), calc(var(--primary-l) - 30%), 0.5))'
              }}
            />
          </g>
        )}
      </svg>
    </button>
  );
}