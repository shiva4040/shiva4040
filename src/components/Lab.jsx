import React, { useState, useCallback } from 'react';
import { LossLandscapeCanvas } from './LossLandscapeCanvas';

/**
 * Interactive AI Research Lab component with live gradient descent simulator and glass HUD.
 */
export function Lab() {
  const [optimizer, setOptimizer] = useState('ADAM');
  const [telemetry, setTelemetry] = useState({ epoch: 0, loss: '0.0000', gradNorm: '0.0000' });
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleTelemetryUpdate = useCallback((data) => {
    setTelemetry(data);
  }, []);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <section className="section-wrapper" id="lab">
      <div className="section-container">
        {/* Asymmetric 12-Column Section Header */}
        <div className="section-header-grid">
          <div className="section-header-main">
            <span className="section-category-tag">Interactive Environment</span>
            <h2 className="section-title">The Research Lab</h2>
            <p className="section-description">
              Real-time simulations exploring optimization dynamics, non-convex loss landscapes, and mathematical intuition.
            </p>
          </div>
          <div className="section-header-metric">
            <div className="metric-pill">
              <span className="metric-value">LIVE</span>
              <span className="metric-label">Optimizer Dynamics</span>
            </div>
          </div>
        </div>

        <div className="lab-research-station">
          {/* Primary Viewport with Floating Glass HUD (Spans 8 cols) */}
          <div className="lab-main-viewport-box">
            <div className="lab-glass-hud">
              <div className="hud-title-group">
                <span className="mono-tag" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  EXP.01
                </span>
                <h3>Optimization Dynamics</h3>
              </div>
              <div className="hud-controls-group">
                <button
                  type="button"
                  className={`hud-pill-btn lab-opt-btn ${optimizer === 'ADAM' ? 'active' : ''}`}
                  onClick={() => setOptimizer('ADAM')}
                  aria-pressed={optimizer === 'ADAM'}
                >
                  ADAM
                </button>
                <button
                  type="button"
                  className={`hud-pill-btn lab-opt-btn ${optimizer === 'MOMENTUM' ? 'active' : ''}`}
                  onClick={() => setOptimizer('MOMENTUM')}
                  aria-pressed={optimizer === 'MOMENTUM'}
                >
                  MOMENTUM
                </button>
                <button
                  type="button"
                  className={`hud-pill-btn lab-opt-btn ${optimizer === 'SGD' ? 'active' : ''}`}
                  onClick={() => setOptimizer('SGD')}
                  aria-pressed={optimizer === 'SGD'}
                >
                  SGD
                </button>
                <button
                  type="button"
                  className="hud-reset-btn"
                  onClick={handleReset}
                  id="lab-reset-btn"
                >
                  RESET
                </button>
              </div>
            </div>

            <div className="simulation-canvas-wrapper">
              <LossLandscapeCanvas
                optimizer={optimizer}
                resetTrigger={resetTrigger}
                onTelemetryUpdate={handleTelemetryUpdate}
              />

              <div className="canvas-telemetry-hud" aria-live="polite">
                <div>EPOCH: <span>{telemetry.epoch}</span></div>
                <div>LOSS L(θ): <span>{telemetry.loss}</span></div>
                <div>||∇L||: <span>{telemetry.gradNorm}</span></div>
              </div>

              <div className="canvas-instruction-hint">
                <span>CLICK ANYWHERE ON CONTOUR TO RELOCATE PARAMETER PARTICLE</span>
              </div>
            </div>

            <p className="lab-explanation">
              <strong>Interactive Demonstration:</strong> Non-convex loss landscape with ravines and saddle points. Notice how Adam adjusts coordinate-wise adaptive moments to navigate along narrow ravines, while standard SGD exhibits high-frequency oscillations across steep valleys.
            </p>
          </div>

          {/* Secondary Lab Concept Panels (Spans 4 cols) */}
          <div className="lab-experiments-sidebar">
            <div className="lab-concept-panel">
              <div className="concept-top-meta">
                <span className="concept-id">CONCEPT 02</span>
                <span className="concept-type">THEORY</span>
              </div>
              <h4 className="concept-title">Geodesic Interpolation on Sⁿ Manifolds</h4>
              <p className="concept-summary">
                Analyzing spherical linear interpolation (Slerp) versus Euclidean blending in normalized latent spaces to preserve representation geometry without magnitude distortion.
              </p>
            </div>

            <div className="lab-concept-panel">
              <div className="concept-top-meta">
                <span className="concept-id">CONCEPT 03</span>
                <span className="concept-type">ANALYSIS</span>
              </div>
              <h4 className="concept-title">Attention Entropy &amp; Softmax Dynamics</h4>
              <p className="concept-summary">
                Studying Shannon entropy distribution across Transformer attention heads during early-stage training to observe how self-attention sharpens onto salient tokens.
              </p>
            </div>

            <div className="lab-concept-panel">
              <div className="concept-top-meta">
                <span className="concept-id">CONCEPT 04</span>
                <span className="concept-type">ANALYSIS</span>
              </div>
              <h4 className="concept-title">Decision Boundary Margins under Perturbations</h4>
              <p className="concept-summary">
                Examining geometric margin stability under gradient-based input perturbations to understand how representation geometry correlates with robustness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
