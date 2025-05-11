
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Confetti } from '@/components/confetti';
import { Button } from '@/components/ui/button'; 

interface OutroVideoScreenProps {
  onFinishedAll?: () => void; 
}

export function OutroVideoScreen({ onFinishedAll }: OutroVideoScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoSrc = "/video/despedida.mp4";

  const handleVideoEnd = () => {
    setShowFinalMessage(true);
    setShowConfetti(true);
    if (onFinishedAll) {
      // Delay slightly to let confetti be visible before any navigation/reset
      setTimeout(onFinishedAll, 7000); 
    }
  };
  
  useEffect(() => {
    if (videoRef.current) {
      // Attempt to play the video. Browsers might block unmuted autoplay.
      videoRef.current.play().catch(error => {
        console.warn("Outro video autoplay with sound might have been blocked by the browser or an error occurred:", error);
        // Optionally, handle this error more visibly
      });
    }
  }, []); // Run once on mount

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error loading or playing video:", videoSrc, e);
    setVideoError(true);
    // Directly trigger the end sequence if video fails
    handleVideoEnd(); 
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-300 via-pink-300 to-red-300 p-0 overflow-hidden">
      <Confetti isActive={showConfetti} particleCount={200} />
      
      {!showFinalMessage && !videoError && (
        <video
          ref={videoRef}
          src={videoSrc}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          className="max-w-full w-auto max-h-[90vh] h-auto rounded-lg shadow-2xl"
          playsInline
          preload="auto" 
          autoPlay 
          // controls={false} // Controls are hidden by default when not specified and autoplay is on
          aria-label="Video de despedida con sonido"
        >
          Tu navegador no soporta videos HTML5. Considera actualizarlo o usar un navegador moderno.
        </video>
      )}

      {videoError && !showFinalMessage && (
         <div className="text-center p-4">
          <div className="bg-destructive/80 p-6 rounded-lg shadow-lg">
            <p className="text-destructive-foreground text-xl mb-2">
              No se pudo cargar el video de despedida.
            </p>
             <p className="text-destructive-foreground text-sm">
              Se mostrará el mensaje final.
            </p>
          </div>
           <p className="text-foreground mt-4 text-xs opacity-80">
            (Asegúrate que el archivo <code>despedida.mp4</code> se encuentra en la carpeta <code>public/video</code>.)
          </p>
           {/* Button removed as video error now directly triggers handleVideoEnd */}
        </div>
      )}
      
      {showFinalMessage && (
        <div className="text-center animate-fade-in p-4">
          <p className="text-3xl md:text-5xl font-pacifico text-primary mb-8 text-shadow-lg shadow-primary/50">
            «Siempre serás nuestro mayor regalo» 💖
          </p>
        </div>
      )}
    </div>
  );
}

