
"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  imageAiHints?: string[];
  imageDescriptions?: string[]; // Added to receive AI descriptions
}

export function Lightbox({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNext, 
  onPrev, 
  imageAiHints,
  imageDescriptions 
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === 'Escape') onClose();
        if (event.key === 'ArrowRight') onNext();
        if (event.key === 'ArrowLeft') onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const currentAiHint = imageAiHints?.[currentIndex] || "image";
  const currentDescription = imageDescriptions?.[currentIndex] || imageAiHints?.[currentIndex] || `Imagen ${currentIndex + 1}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="p-0 border-0 max-w-4xl w-[90vw] h-[90vh] bg-transparent flex flex-col items-center justify-center shadow-none">
        <div className="relative w-full h-[calc(100%-4rem)] flex items-center justify-center">
          <Image
            src={currentImage}
            alt={currentDescription} // Use AI description for alt text
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            data-ai-hint={currentAiHint}
          />
          
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 rounded-full p-2 z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 rounded-full p-2 z-10"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}
        </div>
        {currentDescription && (
          <div className="w-full p-2 text-center text-white bg-black/50 rounded-b-lg max-h-16 overflow-y-auto">
            <p className="text-sm">{currentDescription}</p>
          </div>
        )}
         <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-black/30 hover:bg-black/60 rounded-full p-2 z-10"
            aria-label="Cerrar lightbox"
          >
            <X className="w-6 h-6" />
          </Button>
      </DialogContent>
    </Dialog>
  );
}
