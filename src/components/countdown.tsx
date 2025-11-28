"use client";

import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

type CountdownProps = {
  targetDate: string;
};

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      const now = new Date();
      
      const days = differenceInDays(target, now);
      const hours = differenceInHours(target, now) % 24;
      const minutes = differenceInMinutes(target, now) % 60;
      const seconds = differenceInSeconds(target, now) % 60;

      setTimeLeft({
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center gap-2 md:gap-4">
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold font-headline">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-xs text-muted-foreground">Hari</span>
        </div>
         <span className="text-4xl md:text-5xl font-bold font-headline -mt-4">:</span>
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold font-headline">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-xs text-muted-foreground">Jam</span>
        </div>
        <span className="text-4xl md:text-5xl font-bold font-headline -mt-4">:</span>
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold font-headline">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-xs text-muted-foreground">Menit</span>
        </div>
    </div>
  );
}
