import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Leadership } from './components/Leadership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen selection:bg-cyan-500 selection:text-slate-950">
        {/* Interactive Neural Canvas Background */}
        <ParticleBackground />

        {/* Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Certifications />
          <Leadership />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
