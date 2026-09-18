import React, { useEffect, useRef, useState } from 'react';

const CONCEPTS = [
  {
    id: '01',
    label: 'Concept Demo 01',
    status: 'Exploratory Study',
    title: 'Sparse Weight Pruning Topology',
    summary:
      'Dynamic structured magnitude pruning in deep neural networks. Investigates how sparse subnetworks preserve high-fidelity representation capacity while drastically cutting computational complexity.',
    tech: ['Python', 'PyTorch', 'Weight Pruning', 'Network Sparsity'],
    linkText: 'Explore Research',
    linkHref: '#research',
    schematic: 'SPARSE_SYNAPSE_SCHEMATIC',
    renderSvg: () => (
      <svg className="visual-svg-canvas" viewBox="0 0 280 160" fill="none" aria-hidden="true">
        <circle cx="40" cy="30" r="5.5" fill="#0D0E14" />
        <circle cx="40" cy="70" r="5.5" fill="#0D0E14" />
        <circle cx="40" cy="110" r="5.5" fill="#0D0E14" />
        <circle cx="40" cy="150" r="5.5" fill="#0D0E14" />
        <circle cx="140" cy="45" r="6.5" fill="#6366F1" />
        <circle cx="140" cy="85" r="4.5" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
        <circle cx="140" cy="125" r="6.5" fill="#2563EB" />
        <circle cx="240" cy="60" r="5.5" fill="#0D0E14" />
        <circle cx="240" cy="110" r="5.5" fill="#0D0E14" />
        <line x1="46" y1="30" x2="133" y2="45" stroke="#6366F1" strokeWidth="1.5" />
        <line x1="46" y1="110" x2="133" y2="45" stroke="#6366F1" strokeWidth="1.2" />
        <line x1="46" y1="150" x2="133" y2="125" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="147" y1="45" x2="234" y2="60" stroke="#0D0E14" strokeWidth="1.5" />
        <line x1="147" y1="125" x2="234" y2="110" stroke="#0D0E14" strokeWidth="1.5" />
        <line x1="46" y1="70" x2="135" y2="85" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="145" y1="85" x2="234" y2="60" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
    )
  },
  {
    id: '02',
    label: 'Concept Demo 02',
    status: 'Vision Schematic',
    title: 'Multi-Scale Feature Pyramid',
    summary:
      'Convolutional feature pyramid architecture designed to fuse fine spatial detail with rich semantic abstractions. Balances real-time inference latency with robust dense keypoint correspondence.',
    tech: ['Deep Learning', 'Computer Vision', 'Feature Pyramids', 'PyTorch'],
    linkText: 'Technical Profile',
    linkHref: '#about',
    schematic: 'FEATURE_PYRAMID_SCHEMATIC',
    renderSvg: () => (
      <svg className="visual-svg-canvas" viewBox="0 0 280 160" fill="none" aria-hidden="true">
        <polygon points="50,140 230,140 205,115 75,115" fill="#F8FAFC" stroke="#0D0E14" strokeWidth="1.2" />
        <polygon points="75,110 205,110 185,80 95,80" fill="#EEF2F6" stroke="#6366F1" strokeWidth="1.2" />
        <polygon points="95,75 185,75 165,45 115,45" fill="#E0E7FF" stroke="#2563EB" strokeWidth="1.5" />
        <path d="M175 45 L200 45 L200 80 L195 80" stroke="#2563EB" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M190 80 L220 80 L220 115 L215 115" stroke="#6366F1" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: '03',
    label: 'Concept Demo 03',
    status: 'Mathematical Model',
    title: 'Invertible Latent Density Flow',
    summary:
      'Continuous normalizing flows and neural ODE formulations. Implements continuous invertible transformations that map high-dimensional empirical distributions into tractable Gaussian latent priors.',
    tech: ['PyTorch', 'Differential Equations', 'Density Estimation', 'Latent Space'],
    linkText: 'Inquire Architecture',
    linkHref: '#contact',
    schematic: 'INVERTIBLE_FLOW_STREAMLINES',
    renderSvg: () => (
      <svg className="visual-svg-canvas" viewBox="0 0 280 160" fill="none" aria-hidden="true">
        <path d="M30 40 Q 90 20, 140 80 T 250 120" stroke="#0D0E14" strokeWidth="1.5" fill="none" />
        <path d="M30 80 Q 100 60, 140 80 T 250 80" stroke="#6366F1" strokeWidth="1.5" fill="none" />
        <path d="M30 120 Q 90 140, 140 80 T 250 40" stroke="#2563EB" strokeWidth="1.5" fill="none" />
        <circle cx="140" cy="80" r="5" fill="#8B5CF6" />
        <circle cx="250" cy="80" r="4" fill="#0D0E14" />
        <circle cx="30" cy="80" r="4" fill="#0D0E14" />
      </svg>
    )
  }
];

/**
 * Editorial Projects Section featuring pure CSS sticky card stacking
 * with subtle physical scale-down and opacity dim when covered.
 */
export function Projects() {
  const [coveredCards, setCoveredCards] = useState({});
  const cardRefs = useRef([]);

  const handleCardMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    // Check if mobile or reduced motion is preferred; if so, disable sticky stack detection
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const baseOffset = 100;
        const newCovered = {};

        // For each card i, if card i+1's top has reached within sticky threshold, card i is covered
        for (let i = 0; i < cardRefs.current.length - 1; i++) {
          const nextCard = cardRefs.current[i + 1];
          if (nextCard) {
            const nextRect = nextCard.getBoundingClientRect();
            const threshold = baseOffset + (i + 1) * 24 + 40;
            if (nextRect.top <= threshold) {
              newCovered[i] = true;
            }
          }
        }

        setCoveredCards(newCovered);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="section-wrapper" id="projects">
      <div className="section-container">
        {/* Asymmetric 12-Column Section Header */}
        <div className="section-header-grid">
          <div className="section-header-main">
            <span className="section-category-tag">Architectures &amp; Schematics</span>
            <h2 className="section-title">Exploratory Concepts</h2>
            <p className="section-description">
              Structural concept designs, mathematical prototypes, and PyTorch architecture schematics developed to explore deep learning principles.
            </p>
          </div>
          <div className="section-header-metric">
            <div className="metric-pill">
              <span className="metric-value">03</span>
              <span className="metric-label">Concept Studies</span>
            </div>
          </div>
        </div>

        {/* Editorial Disclosure */}
        <div className="editorial-disclosure-bar">
          <span className="disclosure-text">
            Concept prototypes &amp; visual demonstrations exploring neural architectures and mathematical formulations.
          </span>
        </div>

        {/* Stacking Cards Container */}
        <div className="projects-stack-deck">
          {CONCEPTS.map((concept, index) => {
            const isCovered = !!coveredCards[index];
            const zIndex = 10 + index;
            // Progressive top offset to create a staggered physical deck
            const topOffset = `calc(clamp(85px, 12vh, 120px) + ${index * 24}px)`;

            return (
              <article
                key={concept.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`project-stack-card has-spotlight ${isCovered ? 'card-is-covered' : ''}`}
                style={{
                  zIndex,
                  top: topOffset
                }}
                onMouseMove={handleCardMouseMove}
              >
                <div className="glass-spotlight-layer" aria-hidden="true" />
                <div className="stack-card-inner">
                  {/* Left Plate: Information & Hierarchy (Spans 7 cols) */}
                  <div className="project-detail-plate">
                    <div className="project-meta-strip">
                      <span className="project-index-tag">{concept.label}</span>
                      <span className="project-status-badge">{concept.status}</span>
                    </div>

                    <h3 className="project-card-heading">{concept.title}</h3>
                    <p className="project-summary-text">{concept.summary}</p>

                    <div className="project-tech-matrix">
                      {concept.tech.map((t) => (
                        <span className="tech-pill" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <a href={concept.linkHref} className="project-link-action">
                      <span>{concept.linkText}</span>
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" aria-hidden="true">
                        <path d="M1 11L11 1M11 1H3M11 1V9" />
                      </svg>
                    </a>
                  </div>

                  {/* Right Plate: SVG Schematic Viewport (Spans 5 cols) */}
                  <div className="project-visual-plate" aria-hidden="true">
                    {concept.renderSvg()}
                    <span className="viewport-schematic-label">{concept.schematic}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
