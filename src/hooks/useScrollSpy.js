import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the currently visible section based on scroll position.
 * @param {string[]} sectionIds - Array of section IDs to monitor.
 * @param {number} offset - Vertical offset in pixels (header compensation).
 * @returns {string} The active section ID.
 */
export function useScrollSpy(sectionIds, offset = 140) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollPosition = window.scrollY + offset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // If user reached bottom of page, activate last section ('contact')
        if (window.scrollY + windowHeight >= documentHeight - 60) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
          return;
        }

        let currentActive = sectionIds[0];
        for (let i = 0; i < sectionIds.length; i++) {
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            if (scrollPosition >= elementTop) {
              currentActive = sectionId;
            }
          }
        }
        setActiveSection(currentActive);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
