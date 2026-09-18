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

  return (
    <div className="hero-pin-wrapper" ref={heroWrapperRef}>
      <section
        className={`hero-section ${isMounted ? 'hero-orchestrated-active' : ''}`}
        id="hero"
        ref={sectionRef}
      >
        <HeroWaveform />

        <div className="hero-content" ref={contentRef}>
          {/* 1. Tag Capsule */}
          <div className="hero-glass-capsule hero-orchestrate-label">
            <span className="mono-tag">AI / ML RESEARCHER · CREATIVE TECHNOLOGIST</span>
          </div>

          {/* 2. Dominant Title */}
          <h1 className="hero-title hero-orchestrate-title" aria-label="SHIVA">
            SHIVA
          </h1>

          {/* 3. Mathematical Foundations Headline */}
          <h2 className="hero-headline hero-orchestrate-headline">
            MATHEMATICAL FOUNDATIONS OF INTELLIGENT SYSTEMS
          </h2>
        </div>

        <div className="hero-floor-overlay" aria-hidden="true" />
      </section>
    </div>
  );
}
