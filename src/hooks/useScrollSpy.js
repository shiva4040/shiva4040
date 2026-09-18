import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the currently visible section based on scroll position.
 * @param {string[]} sectionIds - Array of section IDs to monitor.
 * @param {number} offset - Vertical offset in pixels (header compensation).
 * @returns {string} The active section ID.
 */
export function useScrollSpy(sectionIds, offset = 160) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
