"use client";

import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/screens/welcome-screen';
import { IntroVideoScreen } from '@/components/screens/intro-video-screen';
import { MainContentScreen } from '@/components/screens/main-content-screen';
import { OutroVideoScreen } from '@/components/screens/outro-video-screen';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

type Screen = 'welcome' | 'intro' | 'main' | 'outro' | 'loading';

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');

  useEffect(() => {
    // Simulate initial loading or setup
    const timer = setTimeout(() => {
      setCurrentScreen('welcome');
    }, 500); // Short delay to prevent flash of loading if assets load fast
    return () => clearTimeout(timer);
  }, []);


  const handleWelcomeContinue = () => setCurrentScreen('intro');
  const handleIntroFinished = () => setCurrentScreen('main');
  const handleMainFinished = () => setCurrentScreen('outro');
  const handleOutroFinished = () => {
    // Optional: Could navigate to a different page or reset to welcome
    console.log("App finished!");
    // setCurrentScreen('welcome'); // Example: Loop back to welcome
  };

  if (currentScreen === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-1/4" />
      </div>
    );
  }

  return (
    <>
      {currentScreen === 'welcome' && <WelcomeScreen onContinue={handleWelcomeContinue} />}
      {currentScreen === 'intro' && <IntroVideoScreen onFinished={handleIntroFinished} />}
      {currentScreen === 'main' && <MainContentScreen onNextScreen={handleMainFinished} />}
      {currentScreen === 'outro' && <OutroVideoScreen onFinishedAll={handleOutroFinished} />}
    </>
  );
}
