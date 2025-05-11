
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Lightbox } from './lightbox';
import { describeImage } from '@/ai/flows/describe-image-flow';
// Removed Skeleton as images will load immediately with placeholders

interface ImageCollageProps {
  imageSources: string[];
  imageAiHints: string[];
}

export function ImageCollage({ imageSources, imageAiHints }: ImageCollageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false); // For individual image entrance animation
  const [imageDescriptions, setImageDescriptions] = useState<string[]>([]);

  useEffect(() => {
    // Trigger entrance animation for images
    const timer = setTimeout(() => setLoaded(true), 50); // Short delay for animation readiness
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initialize descriptions with placeholders immediately
    const initialPlaceholders = imageSources.map((src, index) => {
      const hint = imageAiHints[index] || (src.startsWith('https://picsum.photos') ? "imagen aleatoria" : "momento especial");
      return `Un momento especial: ${hint}.`; // Spanish placeholder
    });
    setImageDescriptions(initialPlaceholders);

    async function fetchAndUpdateAIDescriptions() {
      if (imageSources.length === 0) {
        return;
      }
      
      // If no AI hints are provided, use a generic Spanish message for final descriptions and don't call AI
      if (imageAiHints.length === 0) {
        if (imageSources.length > 0) {
             setImageDescriptions(new Array(imageSources.length).fill("Un hermoso recuerdo."));
        }
        return;
      }

      try {
        // Fetch AI descriptions in the background
        const descriptionsPromises = imageSources.map((src, index) => {
          const hint = imageAiHints[index] || (src.startsWith('https://picsum.photos') ? "imagen de marcador de posición" : "momento");
          return describeImage({ hint });
        });
        const resolvedDescriptions = await Promise.all(descriptionsPromises);
        setImageDescriptions(resolvedDescriptions.map(d => d.description));
      } catch (error) {
        console.error("Error fetching image descriptions:", error);
        // Fallback to refined placeholders if AI fails
        const errorFallbackDescriptions = imageSources.map((src, index) => {
            const hint = imageAiHints[index] || (src.startsWith('https://picsum.photos') ? "imagen aleatoria" : "momento especial");
            return `Descripción detallada no disponible. Imagen sobre: ${hint}.`; 
        });
        setImageDescriptions(errorFallbackDescriptions);
      }
    }

    fetchAndUpdateAIDescriptions();
  }, [imageSources, imageAiHints]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageSources.length) % imageSources.length);
  };
  
  if (imageSources.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 text-center py-10">
        <p className="text-muted-foreground">No hay imágenes para mostrar en el collage todavía.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 perspective-1000">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {imageSources.map((src, index) => {
          const hintForDataAttr = imageAiHints[index] || (src.startsWith('https://picsum.photos') ? "random image" : "user image");
          // altText will use placeholders first, then AI descriptions when ready
          const altText = imageDescriptions[index] || `Collage imagen ${index + 1} sobre ${hintForDataAttr}`;
          return (
            <div
              key={src + index}
              className={`overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid transform-gpu ${
                loaded ? 'animate-futuristic-entrance' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }} // Slightly reduced delay for faster feel
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              aria-label={altText}
            >
              <Image
                src={src}
                alt={altText}
                width={600}
                height={index % 3 === 1 ? 600 : 800} // Vary heights for masonry feel
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                data-ai-hint={hintForDataAttr}
                priority={index < 6} // Prioritize loading first 6 images (e.g., two rows in a 3-column grid)
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Helps Next.js serve optimized images
              />
            </div>
          );
        })}
      </div>
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={imageSources}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
        imageAiHints={imageAiHints}
        imageDescriptions={imageDescriptions} 
      />
    </div>
  );
}

