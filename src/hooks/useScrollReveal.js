import { useEffect } from 'react';

/**
 * Custom hook that initializes an IntersectionObserver to progressively add
 * the .revealed class to elements with the .reveal-on-scroll class.
 */
export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
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

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
