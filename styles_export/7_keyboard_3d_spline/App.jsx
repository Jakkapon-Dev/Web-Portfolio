import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import ArchitecturePipelineModal from '../components/ArchitecturePipelineModal';
import { 
  Keyboard, 
  ArrowUpRight, 
  Mail, 
  Check, 
  BookOpen,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Keyboard3DVariant({ onOpenCaseStudy }) {
  const { t } = useLanguage();
  const { personal, about, featuredProjects } = portfolioData;
  const [activeKey, setActiveKey] = useState('React.js');
  const [copied, setCopied] = useState(false);
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);

  const keyboardKeys = [
    { key: 'ESC', skill: 'Vim / Git', desc: 'Version Control & CLI' },
    { key: 'F1', skill: 'HTML5', desc: 'Semantic Markup' },
    { key: 'F2', skill: 'CSS3', desc: 'Responsive Design' },
    { key: 'F3', skill: 'Tailwind', desc: 'Utility Styling' },
    { key: 'F4', skill: 'JavaScript', desc: 'ES6+ & Async' },
    { key: 'Q', skill: 'React.js', desc: 'Hooks & Context' },
    { key: 'W', skill: 'Next.js', desc: 'App Router & SSR' },
    { key: 'E', skill: 'TypeScript', desc: 'Type Safety' },
    { key: 'R', skill: 'Node.js', desc: 'Backend Runtimes' },
    { key: 'T', skill: 'Express', desc: 'RESTful Endpoints' },
    { key: 'A', skill: 'Prisma', desc: 'ORM & Migrations' },
    { key: 'S', skill: 'PostgreSQL', desc: 'Relational DB' },
    { key: 'D', skill: 'Socket.io', desc: 'WebSockets & Live' },
    { key: 'F', skill: 'n8n', desc: 'Workflow Automation' },
    { key: 'Z', skill: 'Docker', desc: 'Containerization' },
    { key: 'X', skill: 'ESP32', desc: 'IoT Hardware Dev' },
    { key: 'C', skill: 'Python', desc: 'Scripting & Tools' },
    { key: 'SPACE', skill: 'Full-Stack Developer', desc: 'End-to-End System Delivery' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 }, colors: ['#EC4899', '#8B5CF6', '#3B82F6'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#08070B] text-slate-100 min-h-screen py-16 px-6 sm:px-12 md:px-20 lg:px-32 relative overflow-hidden animate-fadeIn selection:bg-pink-600 selection:text-white text-left">
      
      {/* Ambient Keyboard Backlight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-pink-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-800/60 text-pink-400 text-xs font-mono-code">
              <Keyboard className="w-3.5 h-3.5" />
              <span>Interactive Mechanical Keyboard Portfolio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {personal.name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
                {t(personal.roleEn, personal.roleTh)}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t(about.en, about.th)}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-pink-600/30 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{copied ? "Copied!" : personal.email}</span>
              </button>

              <a
                href={personal.githubMain}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-1 bg-gradient-to-b from-pink-500 via-purple-600 to-slate-900 shadow-2xl shadow-pink-500/20">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3D Keyboard Skill Matrix */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 text-center">
          <div>
            <span className="text-xs font-mono-code text-pink-400 uppercase tracking-widest block mb-1">
              Interactive 3D Keycaps
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Click Any Keycap To Inspect Skill
            </h2>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-black border-4 border-slate-800 shadow-inner max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
            {keyboardKeys.map((item, idx) => {
              const isSelected = activeKey === item.skill;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveKey(item.skill)}
                  className={`p-3 sm:p-4 rounded-xl font-mono-code font-bold text-xs sm:text-sm flex flex-col items-center justify-between transition-all transform active:translate-y-1 ${
                    isSelected
                      ? 'bg-gradient-to-b from-pink-500 to-pink-700 text-white shadow-lg shadow-pink-500/40 border-t-2 border-pink-300 translate-y-0.5'
                      : 'bg-slate-800 text-slate-300 border-t-2 border-slate-600 border-b-4 border-b-slate-950 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] opacity-60">{item.key}</span>
                  <span className="mt-1">{item.skill}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-800/60 max-w-md mx-auto text-pink-300 font-mono-code text-xs">
            <span className="font-bold text-white uppercase block mb-0.5">Active Keycap: {activeKey}</span>
            <span>{keyboardKeys.find(k => k.skill === activeKey)?.desc || 'Production Ready Framework'}</span>
          </div>
        </div>

        {/* Featured Projects with BOTH View Flow and Read Case Study buttons */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Flagship Deployments & Architectures
            </h2>
            <p className="text-xs font-mono-code text-pink-400 mt-1">
              Inspect interactive Architecture Pipeline or Read Full Case Study
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-pink-500 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono-code text-pink-400 bg-pink-950/60 px-2.5 py-0.5 rounded border border-pink-800">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono-code text-slate-500">#{proj.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">{t(proj.subtitleEn, proj.subtitleTh)}</p>
                  
                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed line-clamp-3">
                    {t(proj.overviewEn, proj.overviewTh)}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* Button 1: View Architecture Flow */}
                    <button
                      onClick={() => setSelectedFlowProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code font-bold bg-pink-600 hover:bg-pink-500 text-white shadow transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t('View Flow', 'ดู Architecture Flow')}</span>
                    </button>

                    {/* Button 2: Read Full Case Study */}
                    <button
                      onClick={() => onOpenCaseStudy(proj.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('Case Study', 'อ่าน Case Study')}</span>
                    </button>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Architecture Flow & Pipeline Modal */}
      <ArchitecturePipelineModal
        project={selectedFlowProject}
        isOpen={!!selectedFlowProject}
        onClose={() => setSelectedFlowProject(null)}
      />

    </div>
  );
}
