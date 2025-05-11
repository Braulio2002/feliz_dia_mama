"use client";

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onFinished?: () => void;
  className?: string;
}

export function TypewriterText({ text, speed = 50, onFinished, className = "" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else if (currentIndex === text.length && onFinished) {
      onFinished();
    }
  }, [currentIndex, text, speed, onFinished]);

  return (
    <p className={`${className} whitespace-pre-line typewriter-cursor`}>
      {displayedText}
    </p>
  );
}
