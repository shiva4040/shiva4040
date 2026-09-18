import React from 'react';

/**
 * High-fidelity glass skeleton placeholder for the lazy-loaded Lab component.
 * Maintains the exact dimensions and visual structure of the interactive station
 * to guarantee zero cumulative layout shift (CLS).
 */
export function LabSkeleton() {
  return (
    <section className="section-wrapper" id="lab" aria-busy="true" aria-label="Loading Interactive Lab">
      <div className="section-container">
        <div className="section-header">
          <div className="section-header-left">
            <h2 className="section-title">The Research Lab</h2>
            <p className="section-description">
              Interactive simulations exploring optimization dynamics, loss landscapes, and mathematical intuition in real time.
            </p>
          </div>
          <div className="section-index-badge">
            <span>INITIALIZING SIMULATION...</span>
          </div>
        </div>

        <div className="lab-research-station">
          <div className="lab-main-viewport-box skeleton-pulse">
            <div className="lab-glass-hud">
              <div className="hud-title-group">
                <span className="mono-tag" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  EXP.01
                </span>
                <h3>Optimization Dynamics</h3>
              </div>
              <div className="hud-controls-group">
                <div className="skeleton-pill" style={{ width: 52, height: 28 }} />
                <div className="skeleton-pill" style={{ width: 78, height: 28 }} />
                <div className="skeleton-pill" style={{ width: 44, height: 28 }} />
              </div>
            </div>

            <div className="simulation-canvas-wrapper skeleton-canvas-view">
              <div className="skeleton-loader-content">
                <div className="skeleton-spinner" />
                <span className="skeleton-label">INITIALIZING PYTORCH LOSS TOPOGRAPHY...</span>
              </div>
            </div>

            <p className="lab-explanation">
              <strong>Interactive Demonstration:</strong> Non-convex loss landscape with ravines and saddle points.
            </p>
          </div>

          <div className="lab-experiments-sidebar">
            <div className="lab-concept-panel skeleton-pulse">
              <div className="concept-top-meta">
                <span className="concept-id">CONCEPT 02</span>
                <span className="concept-type">THEORY</span>
              </div>
              <h4 className="concept-title">Geodesic Interpolation on Sⁿ Manifolds</h4>
            </div>

            <div className="lab-concept-panel skeleton-pulse">
              <div className="concept-top-meta">
                <span className="concept-id">CONCEPT 03</span>
                <span className="concept-type">ANALYSIS</span>
              </div>
              <h4 className="concept-title">Attention Entropy &amp; Softmax Dynamics</h4>
            </div>

            <div className="lab-concept-panel skeleton-pulse">
              <div className="concept-top-meta">
                <span className="concept-id">CONCEPT 04</span>
                <span className="concept-type">ANALYSIS</span>
              </div>
              <h4 className="concept-title">Decision Boundary Margins under Perturbations</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
