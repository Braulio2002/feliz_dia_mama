"use client";

import { Button } from "@/components/ui/button";
import { Flower2 } from "lucide-react";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[hsl(var(--background))] p-4 text-center">
      <Flower2 className="w-24 h-24 md:w-32 md:h-32 text-primary mb-8 drop-shadow-xl" />
      <h1 className="text-5xl md:text-7xl font-pacifico text-primary mb-12 text-3d">
        ¡Feliz Día de la Madre!
      </h1>
      <Button
        onClick={onContinue}
        className="px-8 py-6 text-xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Continuar a la siguiente pantalla"
      >
        Continuar
      </Button>
    </div>
  );
}
