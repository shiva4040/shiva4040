import React from 'react';
import { useUtcClock } from '../hooks/useUtcClock';

/**
 * Editorial Colophon Footer component adhering to UI/UX Pro Max typography guidelines.
 * Features live ticking UTC telemetry, system nominal status pill, and smooth back-to-top.
 */
export function Footer() {
  const utcTime = useUtcClock();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" aria-label="Site Colophon">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-identity">
            <h4 className="footer-brand-title">Shiva</h4>
            <p className="footer-brand-role">AI / ML Researcher · Creative Technologist</p>
          </div>

          <nav className="footer-nav-wrapper" aria-label="Footer Navigation">
            <ul className="footer-nav">
              <li><a href="#hero" onClick={scrollToTop}>Top ↑</a></li>
              <li><a href="#research">Research</a></li>
              <li><a href="#projects">Concepts</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} Shiva · shiva404.in · Grounded in Mathematical First Principles</span>
          </div>

          <div className="footer-telemetry">
            <div className="telemetry-status-pill">
              <span className="status-indicator-dot" aria-hidden="true" />
              <span className="telemetry-label">Cluster Status:</span>
              <strong className="telemetry-val">Nominal</strong>
            </div>
            <div className="telemetry-clock-pill">
              <span className="telemetry-label">UTC:</span>
              <span id="utc-time-display" className="telemetry-val">{utcTime}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
