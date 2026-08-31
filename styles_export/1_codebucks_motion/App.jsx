import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import SkillsCloud from '../components/SkillsCloud';
import Projects from '../components/Projects';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import HireMe from '../components/HireMe';

export default function CodebucksVariant() {
  return (
    <div className="w-full flex flex-col items-center justify-center animate-fadeIn">
      <Hero />
      <About />
      <SkillsCloud />
      <Projects />
      <ExperienceTimeline />
      <Contact />
      <Footer />
      <HireMe />
    </div>
  );
}
