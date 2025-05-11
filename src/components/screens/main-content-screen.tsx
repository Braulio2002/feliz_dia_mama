
"use client";

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnimatedTitle } from '@/components/animated-title';
import { ImageCollage } from '@/components/image-collage';
import { InteractiveCard } from '@/components/interactive-card';
import { ShareButton } from '@/components/share-button';
import { Button } from '@/components/ui/button';

interface MainContentScreenProps {
  onNextScreen: () => void;
}

// Updated to use 15 images from /img/ folder for a 3x5 grid.
const collageImages = Array.from({ length: 15 }, (_, i) => `/img/foto${i + 1}.webp`);

const imageAiHints = [
  "mother child",    // Hint for /img/foto1.webp
  "family love",     // Hint for /img/foto2.webp
  "happy moment",    // Hint for /img/foto3.webp
  "flower bouquet",  // Hint for /img/foto4.webp
  "smiling mother",  // Hint for /img/foto5.webp
  "children playing",// Hint for /img/foto6.webp
  "family gathering",// Hint for /img/foto7.webp
  "warm hug",        // Hint for /img/foto8.webp
  "mother daughter", // Hint for /img/foto9.webp
  "mother reading",  // Hint for /img/foto10.webp
  "family picnic",   // Hint for /img/foto11.webp
  "generations mother",// Hint for /img/foto12.webp
  "mother cooking",  // Hint for /img/foto13.webp
  "baby hands",      // Hint for /img/foto14.webp
  "family silhouette",// Hint for /img/foto15.webp
];


export function MainContentScreen({ onNextScreen }: MainContentScreenProps) {
  return (
    <main className="flex flex-col items-center min-h-screen py-8 px-4 bg-background text-foreground transition-colors duration-300">
      <ThemeToggle />
      <AnimatedTitle text="🌸 ¡Feliz Día, Mamá! 🌸" />
      
      <ImageCollage imageSources={collageImages} imageAiHints={imageAiHints} />
      
      <InteractiveCard />
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12">
        <ShareButton />
        <Button
          onClick={onNextScreen}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Ir a la pantalla de despedida"
        >
          Despedida
        </Button>
      </div>
    </main>
  );
}

