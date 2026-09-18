import React from 'react';

const MILESTONES = [
  {
    period: '2025 — Present',
    title: 'Autonomous AI Research & Creative Technology',
    context: 'Self-Directed Investigation',
    body: 'Focusing on sample-efficient learning, neural sparsity, and geometric manifold representations. Developing interactive visualizers and reproducible PyTorch experimental frameworks.'
  },
  {
    period: '2024 — 2025',
    title: 'Deep Learning & Computer Vision Foundations',
    context: 'PyTorch & Model Implementations',
    body: 'Hands-on engineering of convolutional architectures, multi-scale feature representations, loss function optimization, and computer vision pipelines.'
  },
  {
    period: '2023 — 2024',
    title: 'Mathematical & Computational Foundations',
    context: 'Core Mathematical Preparation',
    body: 'Rigorous self-directed training in linear algebra, continuous optimization, probability theory, and data structures forming the mathematical basis for modern machine learning.'
  }
];

/**
 * Editorial Chronology Timeline component with Asymmetric 12-Column Grid.
 */
export function Timeline() {
  return (
    <section className="section-wrapper" id="timeline">
      <div className="section-container">
        {/* Asymmetric 12-Column Section Header */}
        <div className="section-header-grid">
          <div className="section-header-main">
            <span className="section-category-tag">Academic &amp; Research Milestones</span>
            <h2 className="section-title">Research Milestones</h2>
            <p className="section-description">
              Technical trajectory in artificial intelligence, optimization mathematics, and machine learning systems.
            </p>
          </div>
          <div className="section-header-metric">
            <div className="metric-pill">
              <span className="metric-value">2023–26</span>
              <span className="metric-label">Trajectory</span>
            </div>
          </div>
        </div>

        <div className="timeline-track-wrap">
          {MILESTONES.map((m, idx) => (
            <div className="timeline-grid-row" key={idx}>
              <div className="timeline-col-meta">
                <div className="timeline-chron-dot" />
                <span className="timeline-period-badge">{m.period}</span>
                <span className="timeline-context-label">{m.context}</span>
              </div>
              <div className="timeline-col-content">
                <h3 className="timeline-title">{m.title}</h3>
                <p className="timeline-body-text">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
