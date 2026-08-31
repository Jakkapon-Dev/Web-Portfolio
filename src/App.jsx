import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsCloud from './components/SkillsCloud';
import Projects from './components/Projects';
import ExperienceTimeline from './components/ExperienceTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HireMe from './components/HireMe';
import CaseStudyView from './components/CaseStudyView';
import ParallaxBackground from './components/ParallaxBackground';

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[#FAFAFA] text-slate-900 dark:bg-[#0F172A] dark:text-slate-100 transition-colors duration-300 font-sans relative selection:bg-amber-500 selection:text-slate-950">
          
          {/* Parallax Scroll & Ambient Glow Layer */}
          <ParallaxBackground />

          {/* Full-Screen Case Study Deep-Dive View */}
          {activeCaseStudy ? (
            <CaseStudyView
              projectId={activeCaseStudy}
              onClose={() => setActiveCaseStudy(null)}
              onSelectProject={setActiveCaseStudy}
            />
          ) : (
            <>
              {/* Codebucks High-Contrast Header */}
              <Navbar />

              {/* Main Portfolio Experience (Project-First Flow) */}
              <main className="w-full flex flex-col items-center justify-center pt-16 sm:pt-20">
                <Hero />
                <Projects onOpenCaseStudy={setActiveCaseStudy} />
                <SkillsCloud />
                <About />
                <ExperienceTimeline />
                <Contact />
              </main>

              {/* Footer & Rotating Hire Me Badge */}
              <Footer />
              <HireMe />
            </>
          )}

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
