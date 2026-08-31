import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, Send } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const { personal, featuredProjects, skills } = portfolioData;

  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Jakkapon OS [Version 2.0.4 - Full-Stack Release]' },
    { type: 'system', content: 'Type "help" or click any shortcut chip below to explore.\n' }
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', content: `$ ${cmdStr}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Available commands:
  • whoami    - Profile identity, current status and focus
  • projects  - List of 4 flagship full-stack architecture projects
  • skills    - Core technical stack matrix (Frontend, Backend, DevOps)
  • contact   - Direct channels (Email, Phone, LinkedIn, GitHub)
  • clear     - Clear terminal buffer
  • exit      - Close terminal view`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          content: `NAME: ${personal.name} (${personal.nameTh})
ROLE: ${personal.roleEn}
LOCATION: ${personal.locationEn}
STATUS: 🟢 ${personal.statusEn}
BIO: Full-Stack Developer passionate about Next.js, React, Node.js, Prisma, real-time systems, and automation.`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          content: featuredProjects
            .map(
              (p) =>
                `[${p.number}] ${p.title} (${p.category})\n    Stack: ${p.techStack.join(', ')}\n    Repo: ${p.github}`
            )
            .join('\n\n')
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          content: `TECH STACK SUMMARY:
  • Frontend: React, Next.js, TypeScript, JavaScript ES6+, Tailwind CSS
  • Backend:  Node.js, Express, Prisma ORM, RESTful APIs, Socket.io, Python, MQL5
  • DevOps:   n8n Automation, Docker, Git & GitHub
  • Hardware: ESP32, Arduino`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `CONNECT WITH JAKKAPON:
  • Email:    ${personal.email}
  • Phone:    ${personal.phone}
  • LinkedIn: ${personal.linkedin}
  • GitHub:   ${personal.githubMain}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: "${cmd}". Type "help" to view available commands.`
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#090D14] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono-code text-slate-300 font-semibold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              jakkapon@dev-station: ~
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Stream */}
        <div className="flex-1 p-4 overflow-y-auto font-mono-code text-xs space-y-2 bg-[#090D14] text-slate-300 selection:bg-emerald-500/30">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'user' && (
                <span className="text-emerald-400 font-semibold">{item.content}</span>
              )}
              {item.type === 'system' && (
                <span className="text-slate-500">{item.content}</span>
              )}
              {item.type === 'output' && (
                <span className="text-slate-200">{item.content}</span>
              )}
              {item.type === 'error' && (
                <span className="text-rose-400">{item.content}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px] font-mono-code">
          <span className="text-slate-500 mr-1">Quick:</span>
          {['whoami', 'projects', 'skills', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-400 border border-slate-700 hover:border-emerald-700 transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Prompt */}
        <form onSubmit={handleSubmit} className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-mono-code text-sm font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent font-mono-code text-xs text-white placeholder:text-slate-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}
