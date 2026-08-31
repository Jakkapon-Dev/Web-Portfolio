import React, { Suspense, lazy, useState } from 'react';
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
import ParallaxBackground from './components/ParallaxBackground';
import JakkBotGuide from './components/JakkBotGuide';
import OnboardingQuizModal from './components/OnboardingQuizModal';

// Full-screen deep-dive view (and the architecture diagram it pulls in) is one
// of the heaviest chunks in the app — only load it once someone opens a case
// study, instead of shipping it in everyone's first-load bundle.
const CaseStudyView = lazy(() => import('./components/CaseStudyView'));

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    try {
      return !localStorage.getItem('portfolio_onboarding_completed');
    } catch {
      return true;
    }
  });

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 dark:bg-[#0F141C] dark:text-slate-100 transition-colors duration-300 font-sans relative selection:bg-cobalt-500 selection:text-white">
          
          {/* ATM Style Onboarding Questionnaire Modal */}
          <OnboardingQuizModal
            isOpen={isOnboardingOpen}
            onClose={() => setIsOnboardingOpen(false)}
          />

          {/* Parallax Scroll & Ambient Glow Layer */}
          <ParallaxBackground />

          {/* Full-Screen Case Study Deep-Dive View */}
          {activeCaseStudy ? (
            <Suspense fallback={null}>
              <CaseStudyView
                projectId={activeCaseStudy}
                onClose={() => setActiveCaseStudy(null)}
                onSelectProject={setActiveCaseStudy}
              />
            </Suspense>
          ) : (
            <>
              {/* Codebucks High-Contrast Header */}
              <Navbar onReopenOnboarding={() => setIsOnboardingOpen(true)} />

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
              <JakkBotGuide onReopenOnboarding={() => setIsOnboardingOpen(true)} />
            </>
          )}

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
