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

  // Tactile micro-magnetic movement on button hover (subtle 3-4px range)
  const handleBtnMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawDeltaX = (e.clientX - centerX) * 0.12;
    const rawDeltaY = (e.clientY - centerY) * 0.12;
    const deltaX = Math.max(-4, Math.min(4, rawDeltaX));
    const deltaY = Math.max(-4, Math.min(4, rawDeltaY));
    e.currentTarget.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
  };

  const handleBtnMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate3d(0px, 0px, 0)';
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
          {/* 1. Dominant Title */}
          <h1 className="hero-title hero-orchestrate-title" aria-label="SHIVA">
            SHIVA
          </h1>

          {/* 2. Secondary Refined Label */}
          <div className="hero-role-label hero-orchestrate-label">
            <span>AI / ML RESEARCHER</span>
          </div>

          {/* 3. Supporting Elegant Sentence */}
          <p className="hero-subtitle hero-orchestrate-desc">
            Mathematical Foundations of Intelligent Systems
          </p>

          {/* 4. Action Buttons */}
          <div className="hero-actions hero-orchestrate-actions">
            <a
              href="#research"
              className="glass-btn glass-btn-primary"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <span>Explore Research</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="3" x2="8" y2="13" />
                <polyline points="4 9 8 13 12 9" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-floor-overlay" aria-hidden="true" />
      </section>
    </div>
  );
}
