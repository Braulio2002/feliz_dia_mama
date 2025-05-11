
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface IntroVideoScreenProps {
  onFinished: () => void;
}

export function IntroVideoScreen({ onFinished }: IntroVideoScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // The user should create a 'public/video' folder and place 'intro.mp4' in it.
  const videoSrc = "/video/intro.mp4"; 

  useEffect(() => {
    if (videoRef.current) {
      // Attempt to play the video. Browsers might block unmuted autoplay.
      videoRef.current.play().catch(error => {
        console.warn("Intro video autoplay with sound might have been blocked by the browser or an error occurred:", error);
        // Optionally, you could set videoError to true here if unmuted autoplay failure is critical
        // or provide UI to unmute/play manually. For now, we just log.
      });
    }
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error loading or playing video:", videoSrc, e);
    setVideoError(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 p-0 overflow-hidden">
      {!videoError ? (
        <video
          ref={videoRef}
          src={videoSrc}
          onEnded={onFinished}
          onError={handleVideoError}
          className="max-w-full w-auto max-h-[90vh] h-auto rounded-lg shadow-2xl" 
          playsInline // Important for mobile
          preload="auto" // Preload video for faster start
          autoPlay // Autoplay the video (sound may be blocked by browser policy)
          // controls={false} // Controls are hidden by default when not specified and autoplay is on
          aria-label="Video de introducción con sonido"
        >
          Tu navegador no soporta videos HTML5. Considera actualizarlo o usar un navegador moderno.
        </video>
      ) : (
        <div className="text-center p-4">
          <div className="bg-destructive/80 p-6 rounded-lg shadow-lg">
            <p className="text-destructive-foreground text-xl mb-2">
              No se pudo cargar el video de introducción.
            </p>
            <p className="text-destructive-foreground text-sm">
              Intenta refrescar la página o asegúrate de tener una conexión estable.
            </p>
          </div>
          <p className="text-foreground mt-4 text-xs opacity-80">
            (Asegúrate que el archivo <code>intro.mp4</code> se encuentra en la carpeta <code>public/video</code>.)
          </p>
        </div>
      )}
      
      <Button
        onClick={onFinished}
        variant="ghost"
        className="absolute bottom-6 right-6 text-foreground bg-background/50 hover:bg-background/70 px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
        aria-label={videoError ? "Continuar sin video" : "Omitir video de introducción"}
      >
        {videoError ? "Continuar" : "Omitir"} ▶︎
      </Button>
    </div>
  );
}

