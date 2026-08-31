import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 }, colors: ['#F59E0B', '#3B82F6'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200 text-left">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Heading */}
        <div className="text-center">
          <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 mb-2">
            INQUIRIES & COLLABORATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('Get In Touch', 'ติดต่อพูดคุยร่วมงาน')}
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Direct Email</span>
                  <div className="font-mono-code font-bold text-sm text-slate-900 dark:text-white">{personal.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono-code font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Email Address"}</span>
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Direct Phone</span>
                <div className="font-mono-code font-bold text-sm text-slate-900 dark:text-white">{personal.phone}</div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Location</span>
                <div className="font-mono-code font-bold text-sm text-slate-900 dark:text-white">{t(personal.locationEn, personal.locationTh)}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('Your Name', 'ชื่อของคุณ')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recruiter / Team Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-mono-code text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('Your Email', 'อีเมลติดต่อกลับ')}
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-mono-code text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('Message', 'ข้อความ')}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your job opportunity or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-mono-code text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono-code font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                <span>{sent ? t('Message Sent Successfully!', 'ส่งข้อความเรียบร้อยแล้ว!') : t('Send Message', 'ส่งข้อความ')}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
