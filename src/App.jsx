import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { Hero } from './components/Hero';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTION_IDS = ['hero', 'research', 'projects', 'about', 'contact'];

/**
 * Root App component orchestrating fixed hero curtain layout,
 * lazy-loaded interactive simulation, ambient glass theme, and scroll progress tracking.
 */
export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 160);

  // Smooth scroll reading progress bar
  useEffect(() => {
    let rafId = null;
    const progressEl = document.getElementById('scroll-progress');

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!progressEl) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const ratio = Math.min(1, Math.max(0, window.scrollY / totalHeight));
          progressEl.style.transform = `scaleX(${ratio})`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Top Reading Progress Bar */}
      <div className="scroll-progress-bar" id="scroll-progress" aria-hidden="true" />

      {/* Floating Header */}
      <Header
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* Accessible Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main>
        {/* Fixed Hero Section */}
        <Hero />

        {/* Subsequent Content Curtain scrolls smoothly over Fixed Hero */}
        <div className="content-curtain">
          {/* Ambient Glowing Orbs Background for Frosted Glass Theme */}
          <div className="ambient-orbs-container" aria-hidden="true">
            <div className="ambient-glow-orb orb-violet" />
            <div className="ambient-glow-orb orb-cyan" />
            <div className="ambient-glow-orb orb-indigo" />
          </div>

          <Research />
          <Projects />
          <About />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
