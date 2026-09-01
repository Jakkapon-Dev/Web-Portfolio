import React, { Suspense, lazy, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { MotionProvider, useMotionPreference } from './context/MotionContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsCloud from './components/SkillsCloud';
import Projects from './components/Projects';
import ExperienceTimeline from './components/ExperienceTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HireMe from './components/HireMe';
import ParallaxBackground from './components/ParallaxBackground';
import JakkBotGuide from './components/JakkBotGuide';
import ElasticCursor from './components/ElasticCursor';

// Full-screen deep-dive view (and the architecture diagram it pulls in) is one
// of the heaviest chunks in the app — only load it once someone opens a case
// study, instead of shipping it in everyone's first-load bundle.
const CaseStudyView = lazy(() => import('./components/CaseStudyView'));

function AppContent() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const { reducedMotionMode } = useMotionPreference();

  return (
    // reducedMotion feeds every framer-motion component in the tree — "user"
    // follows the OS live, "always"/"never" force it once someone flips the
    // Navbar toggle. See MotionContext for how that mode is derived.
    <MotionConfig reducedMotion={reducedMotionMode}>
      <div className="min-h-screen bg-[#F4F6F5] text-blueprint-900 dark:bg-[#10263D] dark:text-blueprint-50 transition-colors duration-300 font-sans relative selection:bg-draft-500 selection:text-white">

        {/* Drafting-tool cursor — desktop/mouse only, self-hides on touch */}
        <ElasticCursor />

        {/* Parallax Scroll & Ambient Glow Layer */}
        <ParallaxBackground />

        {/* Full-Screen Case Study Deep-Dive View — AnimatePresence so
            CaseStudyView's own exit animation actually gets to play instead
            of the view just vanishing when it unmounts. */}
        <AnimatePresence mode="wait">
          {activeCaseStudy ? (
            <Suspense fallback={null} key="case-study">
              <CaseStudyView
                projectId={activeCaseStudy}
                onClose={() => setActiveCaseStudy(null)}
                onSelectProject={setActiveCaseStudy}
              />
            </Suspense>
          ) : (
            <React.Fragment key="main-content">
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
              <JakkBotGuide />
            </React.Fragment>
          )}
        </AnimatePresence>

      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionProvider>
          <AppContent />
        </MotionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
