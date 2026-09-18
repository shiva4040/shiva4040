import React from 'react';

const RESEARCH_DOMAINS = [
  {
    id: '01',
    code: 'Manifold Geometry',
    badge: 'Study Area',
    title: 'Neural Manifolds & Representation Disentanglement',
    desc: 'Studying the intrinsic dimensionality and geometric structure of hidden representations to understand how deep layers separate distinct semantic factors of variation.',
    math: 'ℳ ⊂ ℝᴰ : dim(ℳ) ≪ D,  ∇z ℒ(f(z)) ≈ 0',
    tags: ['Manifold Topology', 'Latent Geometry', 'Representation Learning']
  },
  {
    id: '02',
    code: 'Sample Efficiency',
    badge: 'Study Area',
    title: 'Sample-Efficient Generalization',
    desc: 'Exploring inductive biases and self-supervised training formulations that enable models to generalize robustly when supervision is scarce or distributions shift.',
    math: 'min_θ 𝔼_{(x,y)} [ℒ(f_θ(x), y)] + λ·ℛ(θ)',
    tags: ['Few-Shot Learning', 'Self-Supervision', 'Inductive Bias']
  },
  {
    id: '03',
    code: 'Optimization Dynamics',
    badge: 'Study Area',
    title: 'Loss Landscapes & Optimization Dynamics',
    desc: 'Investigating non-convex loss surfaces, Hessian eigenspectra, and stochastic gradient trajectories to understand how optimizer dynamics influence flat vs. sharp minima.',
    math: 'H_{ij} = ∂²ℒ / ∂w_i ∂w_j,  λ_{max}(H) ∝ Sharpness',
    tags: ['Hessian Analysis', 'Stochastic Dynamics', 'Loss Topography']
  },
  {
    id: '04',
    code: 'Visual Intelligence',
    badge: 'Study Area',
    title: 'Computer Vision & Spatial Scene Perception',
    desc: 'Exploring multi-scale feature hierarchies, dense visual keypoints, and convolutional representations for real-time spatial scene perception in PyTorch.',
    math: 'Φ(I_t) ↦ {z_{spatial}, z_{semantic}},  ∀t ∈ 𝒯',
    tags: ['PyTorch Vision', 'Feature Pyramids', 'Dense Correspondence']
  }
];

/**
 * Editorial Research Section with High-Impact Bento Grid & Interactive Glass Spotlight.
 */
export function Research() {
  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const featured = RESEARCH_DOMAINS[0];
  const supporting = RESEARCH_DOMAINS.slice(1);

  return (
    <section className="section-wrapper" id="research">
      <div className="section-container">
        {/* Asymmetric 12-Column Section Header */}
        <div className="section-header-grid">
          <div className="section-header-main">
            <span className="section-category-tag">Theoretical Foundations</span>
            <h2 className="section-title">Areas of Investigation</h2>
            <p className="section-description">
              Core mathematical and empirical questions I actively explore across deep learning theory, representation geometry, and visual intelligence.
            </p>
          </div>
          <div className="section-header-metric">
            <div className="metric-pill">
              <span className="metric-value">04</span>
              <span className="metric-label">Research Pillars</span>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="research-bento-grid">
          {/* Top Row: Primary Featured Anchor Tile (Spans 8 cols) */}
          <article
            className="research-bento-featured has-spotlight"
            onMouseMove={handleMouseMove}
          >
            <div className="glass-spotlight-layer" aria-hidden="true" />
            <div>
              <div className="pillar-header">
                <span className="pillar-code">{featured.code}</span>
                <span className="pillar-topic-badge" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-azure)' }}>
                  ★ Primary Focus
                </span>
              </div>
              <h3 className="pillar-title">{featured.title}</h3>
              <p className="pillar-desc">{featured.desc}</p>
            </div>

            <div>
              <div className="pillar-math-strip">
                <code>{featured.math}</code>
              </div>
              <div className="pillar-tags">
                {featured.tags.map((tag) => (
                  <span className="tag-capsule" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Top Row Right: Manifesto Quote Bento Tile (Spans 4 cols) */}
          <aside
            className="research-bento-quote has-spotlight"
            onMouseMove={handleMouseMove}
          >
            <div className="glass-spotlight-layer" aria-hidden="true" />
            <div className="quote-symbol">RESEARCH INTENT</div>
            <blockquote className="quote-text" style={{ fontSize: '1.08rem', lineHeight: 1.6, margin: '14px 0' }}>
              "Real intelligence is structured compression and principled generalization, grounded in mathematical first principles."
            </blockquote>
            <span className="mono-tag" style={{ color: 'var(--accent-indigo)', fontSize: '0.74rem', marginTop: '12px' }}>
              Linear Algebra · Geometry · Optimization
            </span>
          </aside>

          {/* Bottom Row: 3 Asymmetric Pillar Cards (Spans 12 cols, 3x4) */}
          <div className="research-bento-subgrid">
            {supporting.map((domain) => (
              <article
                className="research-bento-card has-spotlight"
                key={domain.id}
                onMouseMove={handleMouseMove}
              >
                <div className="glass-spotlight-layer" aria-hidden="true" />
                <div>
                  <div className="pillar-header">
                    <span className="pillar-code">{domain.code}</span>
                    <span className="pillar-topic-badge">{domain.badge}</span>
                  </div>
                  <h4 className="pillar-title" style={{ fontSize: '1.2rem' }}>{domain.title}</h4>
                  <p className="pillar-desc" style={{ fontSize: '0.92rem' }}>{domain.desc}</p>
                </div>

                <div>
                  <div className="pillar-math-strip">
                    <code>{domain.math}</code>
                  </div>
                  <div className="pillar-tags">
                    {domain.tags.map((tag) => (
                      <span className="tag-capsule" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
