import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import SkillsCloud from '../components/SkillsCloud';
import Projects from '../components/Projects';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import HireMe from '../components/HireMe';

export default function CodebucksVariant({ onOpenCaseStudy }) {
  return (
    <div className="w-full min-h-screen bg-[#FCF6F4] text-[#000000] dark:bg-[#000000] dark:text-[#FCF6F4] transition-colors duration-300 animate-fadeIn relative">
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <Hero />
        <About />
        <SkillsCloud />
        <Projects onOpenCaseStudy={onOpenCaseStudy} />
        <ExperienceTimeline />
        <Contact />
      </main>
      <Footer />
      <HireMe />
    </div>
  );
}
