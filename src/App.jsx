import React, { useState, useEffect } from "react";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import AboutMe from "./sections/AboutMe.jsx";
import Skills from "./sections/Skills.jsx";
import Faq from "./sections/Faq.jsx";
import Experience from "./sections/Experience.jsx";
import Resume from "./sections/Resume.jsx";
import Projects from "./sections/Projects.jsx";
import Footer from "./sections/Footer.jsx";
import ParticleSwarm from "./components/ParticleSwarm.jsx";

const App = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroThreshold = 600;
  const contentThreshold = window.innerHeight * 2.5; // Adjusted to account for new section

  return (
    <main className="relative overflow-hidden">
      <ParticleSwarm />

      {/* Global Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* 1. Hero Section - Visible at Start */}
      <div
        className="relative z-20 transition-opacity duration-700"
        style={{
          opacity: Math.max(0, 1 - scrollPos / heroThreshold),
          pointerEvents: scrollPos > heroThreshold ? 'none' : 'auto'
        }}
      >
        <Hero />
      </div>

      {/* 2. Transition Space for Animation Swarm */}
      <div className="h-[200vh] w-full" />

      {/* 3. Main Portfolio Content - Fades in after Zoom */}
      <div
        className={`relative z-10 transition-all duration-1000 ${scrollPos > contentThreshold
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20 pointer-events-none"
          }`}
      >
        <AboutMe />
        <Skills />
        <Faq />
        <Experience />
        <Resume />
        <Projects />
        <Footer />
      </div>
    </main>
  );
};

export default App;
