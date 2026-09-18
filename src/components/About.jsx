import React from 'react';

/**
 * Editorial About Section & Technical Taxonomy Matrix with Bento Grid & Glass Spotlight.
 */
export function About() {
  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="section-wrapper" id="about">
      <div className="section-container">
        {/* Asymmetric 12-Column Section Header */}
        <div className="section-header-grid">
          <div className="section-header-main">
            <span className="section-category-tag">Profile &amp; Perspective</span>
            <h2 className="section-title">About the Researcher</h2>
            <p className="section-description">
              Driven by curiosity about how mathematical structures enable computational intelligence.
            </p>
          </div>
          <div className="section-header-metric">
            <div className="metric-pill">
              <span className="metric-value">ML</span>
              <span className="metric-label">Theory × Systems</span>
            </div>
          </div>
        </div>

        <div className="about-editorial-grid">
          {/* Left Column: Narrative Bio in Frosted Glass Bento Plate (Spans 7 cols) */}
          <div
            className="about-bio-column has-spotlight"
            style={{
              background: 'var(--glass-tier-panel-bg)',
              backdropFilter: 'var(--glass-tier-panel-blur)',
              WebkitBackdropFilter: 'var(--glass-tier-panel-blur)',
              border: 'var(--glass-tier-panel-border)',
              boxShadow: 'var(--glass-tier-panel-shadow)',
              borderRadius: '28px',
              padding: 'clamp(28px, 4vw, 44px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseMove={handleMouseMove}
          >
            <div className="glass-spotlight-layer" aria-hidden="true" />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="mono-tag" style={{ color: 'var(--accent-azure)', fontSize: '0.74rem' }}>
                RESEARCH PHILOSOPHY
              </span>
            </div>

            <p className="bio-lead">
              I am an AI/ML Researcher and Creative Technologist focused on understanding the fundamental mathematical principles that govern learning in deep neural networks.
            </p>
            <p className="bio-para">
              My self-directed exploration centers on representation learning, sample efficiency, and computer vision. I am fascinated by how high-dimensional systems form structured concepts from raw sensory inputs, and how inductive biases can guide neural models toward true generalization rather than shallow memorization.
            </p>
            <p className="bio-para">
              I believe impactful AI work requires both mathematical rigor and clean, modular engineering. From custom PyTorch training loops to GPU profiling, I prioritize reproducible empirical science and first-principles thinking over superficial trends.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
              <span className="metric-pill" style={{ background: 'rgba(37, 99, 235, 0.08)', color: 'var(--accent-azure)' }}>
                <span className="metric-label" style={{ color: 'var(--accent-azure)', fontWeight: 600 }}>FIRST PRINCIPLES</span>
              </span>
              <span className="metric-pill" style={{ background: 'rgba(99, 102, 241, 0.08)', color: 'var(--accent-indigo)' }}>
                <span className="metric-label" style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>REPRODUCIBLE RESEARCH</span>
              </span>
            </div>
          </div>

          {/* Right Column: Structured Taxonomy with Glass Cards (Spans 5 cols) */}
          <div className="taxonomy-stack">
            <div className="taxonomy-glass-card has-spotlight" onMouseMove={handleMouseMove}>
              <div className="glass-spotlight-layer" aria-hidden="true" />
              <div className="taxonomy-category-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <span>AI / ML Frameworks</span>
              </div>
              <div className="taxonomy-pills-wrap">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">Deep Learning</span>
                <span className="skill-tag">Computer Vision</span>
                <span className="skill-tag">Neural Networks</span>
                <span className="skill-tag">Scikit-Learn</span>
              </div>
            </div>

            <div className="taxonomy-glass-card has-spotlight" onMouseMove={handleMouseMove}>
              <div className="glass-spotlight-layer" aria-hidden="true" />
              <div className="taxonomy-category-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>Mathematical Core</span>
              </div>
              <div className="taxonomy-pills-wrap">
                <span className="skill-tag">Linear Algebra</span>
                <span className="skill-tag">Multivariate Calculus</span>
                <span className="skill-tag">Probability &amp; Statistics</span>
                <span className="skill-tag">Optimization Dynamics</span>
                <span className="skill-tag">Information Theory</span>
              </div>
            </div>

            <div className="taxonomy-glass-card has-spotlight" onMouseMove={handleMouseMove}>
              <div className="glass-spotlight-layer" aria-hidden="true" />
              <div className="taxonomy-category-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Compute &amp; Tooling</span>
              </div>
              <div className="taxonomy-pills-wrap">
                <span className="skill-tag">CUDA Acceleration</span>
                <span className="skill-tag">Linux Environments</span>
                <span className="skill-tag">Git &amp; GitHub</span>
                <span className="skill-tag">NumPy / SciPy</span>
                <span className="skill-tag">Scientific Visualization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
