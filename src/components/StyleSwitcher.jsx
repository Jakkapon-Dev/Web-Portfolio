import React from 'react';
import { 
  Sparkles, 
  Keyboard, 
  Monitor, 
  UserCheck, 
  Terminal, 
  Layout, 
  Layers, 
  Palette,
  Check,
  BookOpen
} from 'lucide-react';

export default function StyleSwitcher({ currentStyle, onSelectStyle, onOpenCaseStudy }) {
  const styles = [
    {
      id: 'codebucks',
      name: 'Codebucks Motion',
      ref: 'Codebucks Final',
      icon: Sparkles,
      color: 'bg-[#000000] text-[#FCF6F4] dark:bg-[#FCF6F4] dark:text-[#000000]',
    },
    {
      id: 'keyboard3d',
      name: '3D Keyboard',
      ref: 'Naresh Khatri 3D',
      icon: Keyboard,
      color: 'bg-pink-600 text-white',
    },
    {
      id: 'retro3d',
      name: 'Retro 3D Canvas',
      ref: 'JS Mastery 3D',
      icon: Monitor,
      color: 'bg-[#915EFF] text-white',
    },
    {
      id: 'jigarsable',
      name: 'Jigar Sable Dev',
      ref: 'Jigar Sable',
      icon: UserCheck,
      color: 'bg-blue-600 text-white',
    },
    {
      id: 'inspector',
      name: 'Architecture Deck',
      ref: 'Custom Flow Deck',
      icon: Terminal,
      color: 'bg-emerald-500 text-slate-950',
    },
    {
      id: 'reactfolio',
      name: 'Minimal Reactfolio',
      ref: 'Truethari & Katherine',
      icon: Layout,
      color: 'bg-slate-800 text-white',
    },
    {
      id: 'moderndark',
      name: 'Modern SaaS Dark',
      ref: 'Harsh Goel',
      icon: Layers,
      color: 'bg-indigo-600 text-white',
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/95 text-white backdrop-blur-xl border-b border-slate-800 px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3">
      
      {/* Brand & Reference Badge */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 text-slate-950 font-bold">
          <Palette className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-mono-code font-bold text-xs tracking-tight text-white flex items-center gap-1.5">
            Reference Showcase Hub ({styles.length} Styles)
          </span>
          <span className="text-[10px] text-slate-400 font-mono-code hidden md:inline">
            Click to switch layout or inspect Case Study Deep-Dive
          </span>
        </div>
      </div>

      {/* Style Buttons + Professional Case Study Deep-Dive Button */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1 max-w-full">
        {styles.map((st) => {
          const isSelected = currentStyle === st.id;
          const Icon = st.icon;
          return (
            <button
              key={st.id}
              onClick={() => onSelectStyle(st.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold transition-all shrink-0 ${
                isSelected
                  ? `${st.color} shadow-lg ring-2 ring-white/30 scale-105`
                  : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
              title={`Reference: ${st.ref}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{st.name}</span>
              {isSelected && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          );
        })}

        {/* Professional Case Study Deep-Dive Trigger */}
        <button
          onClick={() => onOpenCaseStudy('omnipos')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md hover:opacity-90 transition-all shrink-0"
          title="Open System Architecture Case Study"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 Case Study Deep-Dive</span>
        </button>
      </div>

    </div>
  );
}
