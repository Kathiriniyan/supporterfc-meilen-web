'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

// Swiss Time: September 12, 2026, 00:00:00 (CEST is UTC+2)
const TARGET_DATE_STRING = '2026-09-12T00:00:00+02:00';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(TARGET_DATE_STRING) - +new Date();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export function Countdown() {
    const t = useTranslations('Hero');
    const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null);

    React.useEffect(() => {
        // Set initial time exactly on client mount to avoid SSR hydration mismatch
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Return an empty transparent container matching the height to prevent layout shift
    if (!timeLeft) {
        return <div className="h-32 opacity-0 pointer-events-none" aria-hidden="true" />;
    }

    const timeBlocks = [
        { label: t('days'), value: timeLeft.days },
        { label: t('hours'), value: timeLeft.hours.toString().padStart(2, '0') },
        { label: t('minutes'), value: timeLeft.minutes.toString().padStart(2, '0') },
        { label: t('seconds'), value: timeLeft.seconds.toString().padStart(2, '0') },
    ];

    return (
        <div className="mt-12 flex flex-col items-center">
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-orange text-sm md:text-base mb-6 drop-shadow-md">
                {t('countdownPretext')}
            </span>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8">
                {timeBlocks.map((block, idx) => (
                    <div key={idx} className="flex flex-col items-center group">
                        <div className="relative">
                            {/* Brutalist offset shadow */}
                            <div className="absolute inset-0 bg-orange translate-x-1.5 translate-y-1.5 md:translate-x-2.5 md:translate-y-2.5 z-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 duration-300" />

                            {/* Main number block */}
                            <div className="relative z-10 bg-cream border-2 md:border-[3px] border-ink w-14 h-16 sm:w-20 sm:h-24 md:w-28 md:h-32 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 duration-300">
                                <span className="font-sans font-black text-3xl sm:text-4xl md:text-6xl text-ink tabular-nums tracking-tighter">
                                    {block.value}
                                </span>
                            </div>
                        </div>

                        {/* Label */}
                        <span className="mt-3 md:mt-5 font-sans font-bold uppercase tracking-widest text-cream text-[10px] sm:text-xs md:text-sm drop-shadow-md">
                            {block.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
