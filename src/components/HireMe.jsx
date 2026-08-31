import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function HireMe() {
  const { personal } = portfolioData;

  return (
    <aside aria-label="Hire me" className="fixed left-4 bottom-4 z-30 hidden md:flex items-center justify-center overflow-hidden">
      <div className="relative w-32 h-32 flex items-center justify-center">
        
        {/* Rotating Circular Text SVG */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full animate-[spin_12s_linear_infinite]"
        >
          <defs>
            <path
              id="circlePath"
              d="M 150, 150 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
            />
          </defs>
          <text className="font-mono-code font-bold text-[18px] uppercase fill-slate-700 dark:fill-slate-300 tracking-[4px]">
            <textPath href="#circlePath" startOffset="0%">
              FULL-STACK DEVELOPER • SOFTWARE ENGINEER •
            </textPath>
          </text>
        </svg>

        {/* Center Circular Button */}
        <a
          href={`mailto:${personal.email}`}
          className="absolute flex items-center justify-center w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md font-mono-code font-bold text-[11px] transition-transform hover:scale-105 text-center leading-tight"
        >
          HIRE<br />ME
        </a>

      </div>
    </aside>
  );
}
