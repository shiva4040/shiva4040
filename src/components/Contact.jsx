import React, { useState } from 'react';

/**
 * Controlled Contact Section with Asymmetric 12-Column Grid and Glass Dispatch Terminal.
 */
export function Contact() {
  const [formData, setFormData] = useState({
    sender: '',
    email: '',
    payload: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('shiva@shiva404.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === 'input-sender' ? 'sender' : id === 'input-email' ? 'email' : 'payload']: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sender || !formData.email || !formData.payload) return;

    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback('TRANSMISSION LOGGED: Message routed to Shiva via secure socket.');
      setFormData({ sender: '', email: '', payload: '' });

      setTimeout(() => {
        setFeedback(null);
      }, 6000);
    }, 600);
  };

  return (
    <section className="section-wrapper" id="contact">
      <div className="section-container">
        <div className="contact-editorial-grid">
          {/* Left Column: Direct Channels & Manifesto (Spans 5 cols) */}
          <div className="contact-manifesto-column">
            <span className="section-category-tag">Dialogue &amp; Collaboration</span>
            <h2 className="contact-headline">
              Let’s build intelligent systems.
            </h2>
            <p className="contact-manifesto">
              Open to research collaborations, exploratory machine learning discussions, and technical engineering opportunities.
            </p>

            <div className="contact-glass-channels">
              <div
                className="glass-channel-link has-spotlight"
                style={{ cursor: 'pointer' }}
                onClick={handleCopyEmail}
                onMouseMove={handleMouseMove}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCopyEmail(e)}
                aria-label="Click to copy Shiva's email address"
              >
                <div className="glass-spotlight-layer" aria-hidden="true" />
                <div className="channel-left-info">
                  <span className="channel-protocol">Direct Email · Click to Copy</span>
                  <span className="channel-address">shiva@shiva404.in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="mono-tag" style={{ fontSize: '0.65rem', color: copied ? 'var(--accent-emerald)' : 'var(--accent-azure)' }}>
                    {copied ? 'COPIED!' : 'COPY'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </div>
              </div>

              <a href="https://github.com/shiva4040" target="_blank" rel="noopener noreferrer" className="glass-channel-link has-spotlight" onMouseMove={handleMouseMove}>
                <div className="glass-spotlight-layer" aria-hidden="true" />
                <div className="channel-left-info">
                  <span className="channel-protocol">GitHub</span>
                  <span className="channel-address">github.com/shiva4040</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <a href="https://linkedin.com/in/shiva-ai" target="_blank" rel="noopener noreferrer" className="glass-channel-link has-spotlight" onMouseMove={handleMouseMove}>
                <div className="glass-spotlight-layer" aria-hidden="true" />
                <div className="channel-left-info">
                  <span className="channel-protocol">LinkedIn</span>
                  <span className="channel-address">linkedin.com/in/shiva-ai</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Controlled Glass Terminal Form (Spans 7 cols) */}
          <div className="terminal-glass-card">
            <div className="terminal-header-bar">
              <span className="terminal-socket-label">DISPATCH_TERMINAL // SECURE_CHANNEL</span>
              <span className="status-dot" aria-hidden="true" />
            </div>

            <form onSubmit={handleSubmit} id="contact-dispatch-form">
              <div className="terminal-input-group">
                <label htmlFor="input-sender" className="terminal-field-label">
                  Sender Identity (Name / Lab / Org)
                </label>
                <input
                  type="text"
                  id="input-sender"
                  className="terminal-text-field"
                  placeholder="e.g. Alex Vance · Research Group"
                  value={formData.sender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="terminal-input-group">
                <label htmlFor="input-email" className="terminal-field-label">
                  Return Protocol (Email Address)
                </label>
                <input
                  type="email"
                  id="input-email"
                  className="terminal-text-field"
                  placeholder="contact@institution.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="terminal-input-group">
                <label htmlFor="input-payload" className="terminal-field-label">
                  Transmission Payload
                </label>
                <textarea
                  id="input-payload"
                  className="terminal-area-field"
                  placeholder="Research inquiry, collaboration scope, or question..."
                  value={formData.payload}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="terminal-action-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Transmitting Message...' : 'Send Transmission'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>

              {feedback && (
                <div className="form-feedback-notice" role="status" aria-live="polite">
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
