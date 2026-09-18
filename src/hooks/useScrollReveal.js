import { useEffect } from 'react';

/**
 * Custom hook that initializes an IntersectionObserver to progressively add
 * the .revealed class to elements with the .reveal-on-scroll class.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(
        '.reveal-on-scroll, .section-header-grid, .research-bento-grid, .project-stack-card, .about-editorial-grid, .contact-manifesto-grid'
      ).forEach((el) => el.classList.add('revealed'));
      return;
    }

    const targets = document.querySelectorAll(
      '.reveal-on-scroll, .section-header-grid, .research-bento-grid, .project-stack-card, .about-editorial-grid, .contact-manifesto-grid'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
