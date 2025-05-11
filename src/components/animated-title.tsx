import React from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  return (
    <h1 className={`text-4xl md:text-6xl font-pacifico text-primary text-center my-8 md:my-12 title-pulse text-3d ${className}`}>
      {text}
    </h1>
  );
}
