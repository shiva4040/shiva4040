import React, { useEffect } from 'react';

/**
 * Full-screen frosted glass mobile navigation drawer complying with UI/UX Pro Max standards:
 * Body scroll locking, Esc key dismissal, accessible dialog semantics, and dedicated close button.
 */
export function MobileDrawer({ isOpen, onClose }) {
  // Lock background scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={`mobile-drawer ${isOpen ? 'open' : ''}`}
      id="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="mobile-drawer-close"
        onClick={onClose}
        aria-label="Close Navigation Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <nav className="mobile-drawer-nav" aria-label="Mobile Site Links">
        <div className="mobile-nav-item">
          <a href="#hero" onClick={handleLinkClick}>Home</a>
        </div>
        <div className="mobile-nav-item">
          <a href="#research" onClick={handleLinkClick}>Research</a>
        </div>
        <div className="mobile-nav-item">
          <a href="#projects" onClick={handleLinkClick}>Concepts</a>
        </div>
        <div className="mobile-nav-item">
          <a href="#about" onClick={handleLinkClick}>About</a>
        </div>
        <div className="mobile-nav-item">
          <a href="#contact" onClick={handleLinkClick} className="mobile-drawer-cta">
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
}
