import React, { useEffect, useState, useRef } from 'react';
import { HeroWaveform } from './HeroWaveform';

/**
 * Pinned Hero Section with fluid dominant typography, scroll-linked parallax fade,
 * and a single orchestrated entrance sequence on initial mount.
 */
export function Hero() {
  const heroWrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Trigger the ONE orchestrated load-in sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Performant scroll-linked opacity & parallax fade for fixed hero architecture
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const heroHeight = window.innerHeight || 800;
        const scrollY = window.scrollY || window.pageYOffset;
        const progress = Math.min(1, Math.max(0, scrollY / heroHeight));

        // Manage fixed hero visibility & pointer events so background clicks never intercept content
        if (sectionRef.current) {
          if (progress >= 0.98) {
            sectionRef.current.style.pointerEvents = 'none';
            sectionRef.current.style.opacity = '0';
          } else {
            sectionRef.current.style.pointerEvents = 'auto';
            sectionRef.current.style.opacity = '1';
          }
        }

        // Downward parallax and gentle scale-down as curtain smoothly scrolls over
        if (contentRef.current) {
          const translateY = (progress * 110).toFixed(2);
          const scale = (1 - progress * 0.08).toFixed(3);
          const opacity = Math.max(0, 1 - progress * 1.35).toFixed(3);

          contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          contentRef.current.style.opacity = opacity;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Subtle interactive button magnetism on hover
  const handleBtnMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawDeltaX = (e.clientX - centerX) * 0.15;
    const rawDeltaY = (e.clientY - centerY) * 0.15;
    const deltaX = Math.max(-6, Math.min(6, rawDeltaX));
    const deltaY = Math.max(-6, Math.min(6, rawDeltaY));
    e.currentTarget.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleBtnMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div className="hero-pin-wrapper" ref={heroWrapperRef}>
      <section
        className={`hero-section ${isMounted ? 'hero-orchestrated-active' : ''}`}
        id="hero"
        ref={sectionRef}
      >
        <HeroWaveform />

        <div className="hero-content" ref={contentRef}>
          <div className="hero-glass-capsule hero-orchestrate-1">
            <span className="mono-tag">AI &amp; Machine Learning Research · Mathematical Systems</span>
          </div>

          <h1 className="hero-title hero-orchestrate-2">
            SHIVA
          </h1>

          <p className="hero-subtitle hero-orchestrate-3">
            Mathematical Foundations of Intelligent Systems
          </p>

          <div className="hero-actions hero-orchestrate-4">
            <a
              href="#research"
              className="glass-btn glass-btn-primary"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <span>Explore Research</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </a>
            <a
              href="#projects"
              className="glass-btn glass-btn-secondary"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <span>Architecture Schematics</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="3" x2="8" y2="13" />
                <polyline points="4 9 8 13 12 9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bouncing Scroll Indicator */}
        <a href="#research" className="hero-scroll-indicator" aria-label="Scroll down to explore research">
          <span>SCROLL TO EXPLORE</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="8" y1="2" x2="8" y2="12" />
            <polyline points="4 8 8 12 12 8" />
          </svg>
        </a>

        <div className="hero-floor-overlay" aria-hidden="true" />
      </section>
    </div>
  );
}
