
"use client";

import React, { useState, useEffect } from 'react';
import { EnvelopeIcon } from './envelope-icon';
import { TypewriterText } from './typewriter-text';
import { Confetti } from './confetti';
import { Card, CardContent } from '@/components/ui/card';
import { describeImage, type DescribeImageOutput } from '@/ai/flows/describe-image-flow';
import { Skeleton } from '@/components/ui/skeleton';

const fallbackMessage = `Querida Mamá,

En este día tan especial, mientras estas palabras aparecen, quiero que sepas que son un reflejo de todo el amor y gratitud que sentimos por ti. Cada letra es un agradecimiento por tu ternura infinita, por esas manos que siempre supieron sanar y acariciar, por tu paciencia que parece no tener fin, incluso en los momentos más difíciles.

Eres el faro que ilumina nuestras vidas, la melodía suave que calma nuestras tormentas y el abrazo cálido que nos reconforta el alma. Has pintado nuestros mundos con los colores de la alegría, la esperanza y el amor incondicional. Recordamos tus sacrificios silenciosos, tus desvelos, y cada pequeño gesto que nos hizo sentir amados y protegidos.

Gracias por enseñarnos el valor de la bondad, la fuerza de la perseverancia y la belleza de un corazón generoso. Eres nuestra heroína, nuestra confidente, nuestra inspiración. Hoy celebramos tu existencia, tu luz, tu amor que nos define y nos une.

Con todo nuestro amor y un nudo en la garganta de emoción,
Tu familia ❤️`;

const errorFallbackMessage = `Querida Mamá,

Tu amor es el regalo más grande que hemos recibido. En cada sonrisa, en cada consejo, en cada abrazo, sentimos la inmensidad de tu cariño. Gracias por ser nuestro refugio y nuestra inspiración. Te amamos infinitamente.

Con todo el cariño del mundo,
Tu familia ❤️`;

export function InteractiveCard() {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);

  useEffect(() => {
    async function fetchCardMessage() {
      // Only fetch if the card is opened and message isn't already set (or loading)
      if (isOpened && !cardMessage && !isLoadingMessage) {
        setIsLoadingMessage(true);
        try {
          const hintForCard = "The following is NOT an image hint, but a request for text generation. Please ignore previous instructions about image captions and conciseness. Generate a deeply emotional, loving, and heartfelt message for a Mother's Day card, FROM HER FAMILY. It should express immense gratitude, love, and profound appreciation for everything a mother does, her sacrifices, her unwavering support, and her infinite love. Aim for a tone that is personal, touching, poetic, and could bring tears of joy. The message should be a few paragraphs long (around 100-150 words). Include a warm and emotional closing like 'Con todo nuestro amor y un nudo en la garganta de emoción,' followed by 'Tu familia ❤️'. Ensure the message is profoundly heartfelt, sincere, and memorable. THE ENTIRE MESSAGE MUST BE IN SPANISH.";
          const output: DescribeImageOutput = await describeImage({ hint: hintForCard });
          if (output && output.description) {
            setCardMessage(output.description);
          } else {
            setCardMessage(fallbackMessage); 
          }
        } catch (error) {
          console.error("Error fetching card message:", error);
          setCardMessage(errorFallbackMessage);
        } finally {
          setIsLoadingMessage(false);
        }
      }
    }

    fetchCardMessage();
  }, [isOpened, cardMessage, isLoadingMessage]);


  const handleOpenEnvelope = () => {
    if (!isOpened) {
      setIsOpened(true);
      setShowConfetti(true);
      // Message fetching will be triggered by useEffect if not already loading/loaded
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-12 md:my-16 p-4 perspective-1000">
      <Confetti isActive={showConfetti} />
      {!isOpened ? (
        <EnvelopeIcon isOpened={isOpened} onClick={handleOpenEnvelope} />
      ) : (
        <Card className="w-full max-w-lg shadow-xl animate-futuristic-entrance bg-card text-card-foreground p-2 transform-gpu transition-all duration-500 ease-out">
          <CardContent className="p-6 md:p-8 min-h-[250px] flex flex-col justify-center">
            {isLoadingMessage ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-[85%]" />
                <Skeleton className="h-5 w-[95%]" />
                <Skeleton className="h-5 w-[75%]" />
                <Skeleton className="h-5 w-[90%]" />
                <Skeleton className="h-5 w-[80%]" />
              </div>
            ) : (
              <TypewriterText text={cardMessage} speed={10} className="text-lg md:text-xl leading-relaxed font-sans text-justify" />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

