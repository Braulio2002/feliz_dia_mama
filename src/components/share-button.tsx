"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function ShareButton() {
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.share) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: '¡Feliz Día de la Madre!',
      text: 'Mira este hermoso collage para el Día de la Madre.',
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
      toast({
        title: "¡Compartido!",
        description: "El collage ha sido compartido.",
      });
    } catch (err) {
      console.error('Error al compartir:', err);
      // Only show error toast if it's not an AbortError (user cancelled share)
      if ((err as Error).name !== 'AbortError') {
        toast({
          variant: "destructive",
          title: "Error al compartir",
          description: "No se pudo compartir el collage. Inténtalo de nuevo.",
        });
      }
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      onClick={handleShare}
      className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg shadow-md transition-transform hover:scale-105 focus:ring-2 focus:ring-accent focus:ring-offset-2"
      aria-label="Compartir este collage"
    >
      <Gift className="mr-2 h-5 w-5" />
      Compartir 🎁
    </Button>
  );
}
