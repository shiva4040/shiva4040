import React, { useEffect, useRef } from 'react';

/**
 * GPU-accelerated harmonic neural waveform canvas with perspective horizon floor.
 * Full React lifecycle encapsulation with complete cleanup on unmount.
 */
export function HeroWaveform() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const CONFIG = {
      lineCount: 16,
      pointsPerLine: 82,
      waveHeight: 90,
      baseSpeed: 0.00062,
      envelopeWidth: 0.44,
      crossLinesFreq: 6,
      particleCount: 26,
      floorLineCount: 12,
      floorVanishY: 0.74,
      mouseRadius: 170,
      mouseStrength: 36
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = null;
    let isVisible = true;
    let time = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles = [];

    const initParticles = () => {
      particles = [];
      const count = width < 768 ? 14 : CONFIG.particleCount;
      for (let i = 0; i < count; i++) {
        particles.push({
          lineIndex: Math.floor(Math.random() * CONFIG.lineCount),
          normX: 0.20 + Math.random() * 0.60,
          speed: 0.00014 + Math.random() * 0.00028,
          size: 1.4 + Math.random() * 1.6,
          pulseOffset: Math.random() * Math.PI * 2,
          accentType: Math.random() > 0.55 ? 'violet' : Math.random() > 0.3 ? 'blue' : 'gray'
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width < 768) {
        CONFIG.lineCount = 12;
        CONFIG.pointsPerLine = 52;
        CONFIG.waveHeight = 65;
      } else {
        CONFIG.lineCount = 16;
        CONFIG.pointsPerLine = 82;
        CONFIG.waveHeight = 90;
      }

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const drawPerspectiveFloor = () => {
      const horizonY = height * CONFIG.floorVanishY;
      const floorHeight = height - horizonY;
      const centerX = width * 0.5;

      ctx.save();

      // Horizontal depth lines
      for (let i = 0; i < CONFIG.floorLineCount; i++) {
        const progress = Math.pow(i / (CONFIG.floorLineCount - 1), 2.4);
        const currentY = horizonY + progress * floorHeight;
        const opacity = progress * 0.16;

        ctx.beginPath();
        ctx.moveTo(0, currentY);
        ctx.lineTo(width, currentY);
        ctx.strokeStyle = `rgba(13, 14, 20, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Vanishing radial lines
      const rayCount = width < 768 ? 10 : 16;
      for (let j = -rayCount / 2; j <= rayCount / 2; j++) {
        const bottomX = centerX + (j / (rayCount / 2)) * (width * 0.65);
        const grad = ctx.createLinearGradient(centerX, horizonY, bottomX, height);
        grad.addColorStop(0, 'rgba(13, 14, 20, 0)');
        grad.addColorStop(0.3, 'rgba(13, 14, 20, 0.02)');
        grad.addColorStop(1, 'rgba(13, 14, 20, 0.10)');

        ctx.beginPath();
        ctx.moveTo(centerX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Soft horizon mist
      const horizonGlow = ctx.createRadialGradient(
        centerX,
        horizonY,
        15,
        centerX,
        horizonY,
        width * 0.45
      );
      horizonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      horizonGlow.addColorStop(0.5, 'rgba(250, 250, 248, 0.4)');
      horizonGlow.addColorStop(1, 'rgba(250, 250, 248, 0)');

      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 40, width, 80);

      ctx.restore();
    };

    let entranceStartTime = null;
    const ENTRANCE_MS = 1600;

    const getWavePoint = (xIndex, lineIndex, t, entranceProgress) => {
      const normX = xIndex / (CONFIG.pointsPerLine - 1);
      const px = normX * width;
      const centerY = height * 0.52;
      const lineSpread = width < 768 ? 5.5 : 7.5;
      const baseLineY = centerY + (lineIndex - CONFIG.lineCount / 2) * lineSpread;

      const distFromCenter = (normX - 0.5) / CONFIG.envelopeWidth;
      const envelope = Math.exp(-distFromCenter * distFromCenter);

      const phaseOffset = lineIndex * 0.18;
      const w1 = Math.sin(normX * 6.2 + t * 1.5 + phaseOffset) * 0.55;
      const w2 = Math.sin(normX * 12.0 - t * 1.1 + phaseOffset * 1.3) * 0.28;
      const w3 = Math.cos(normX * 20.0 + t * 2.0 + phaseOffset * 0.8) * 0.12;

      // Mathematical entrance: reveal progressive wave from left to right with settling harmonic dispersion
      const revealThreshold = entranceProgress * 1.24;
      const revealFactor = Math.min(1, Math.max(0, (revealThreshold - normX) / 0.2));
      const distortion = (1 - entranceProgress) * Math.sin(normX * 12 + t * 3.5 + lineIndex * 0.25) * (CONFIG.waveHeight * 0.2 * (1 - entranceProgress));

      let displacement = ((w1 + w2 + w3) * CONFIG.waveHeight * envelope * (0.35 + 0.65 * entranceProgress) + distortion) * revealFactor;

      if (mouse.x > -1000) {
        const dx = px - mouse.x;
        const dy = baseLineY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseRadius) {
          const factor = 1 - dist / CONFIG.mouseRadius;
          const smoothFactor = factor * factor * (3 - 2 * factor);
          displacement -= Math.sin(dist * 0.035 - t * 2.5) * CONFIG.mouseStrength * smoothFactor;
        }
      }

      return {
        x: px,
        y: baseLineY + displacement,
        envelope,
        revealFactor
      };
    };

    const render = (timestamp) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (!entranceStartTime) entranceStartTime = timestamp;
      const elapsed = timestamp - entranceStartTime;
      const rawProgress = Math.min(1, elapsed / ENTRANCE_MS);
      const entranceProgress = prefersReducedMotion ? 1 : 1 - Math.pow(1 - rawProgress, 3);

      time = prefersReducedMotion ? 0 : timestamp * CONFIG.baseSpeed;

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (-9999 - mouse.x) * 0.04;
        mouse.y += (-9999 - mouse.y) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.15 + 0.85 * entranceProgress;

      drawPerspectiveFloor();

      const grid = [];
      for (let l = 0; l < CONFIG.lineCount; l++) {
        const row = [];
        for (let p = 0; p < CONFIG.pointsPerLine; p++) {
          row.push(getWavePoint(p, l, time, entranceProgress));
        }
        grid.push(row);
      }

      ctx.lineWidth = 0.75;
      for (let p = 0; p < CONFIG.pointsPerLine; p += CONFIG.crossLinesFreq) {
        ctx.beginPath();
        let started = false;
        for (let l = 0; l < CONFIG.lineCount; l++) {
          const pt = grid[l][p];
          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        const midEnvelope = grid[Math.floor(CONFIG.lineCount / 2)][p].envelope;
        const normP = p / (CONFIG.pointsPerLine - 1);
        const centerDistance = Math.abs(normP - 0.5);
        const centerFactor = Math.min(1, centerDistance * 2.8);
        const ribAlpha = midEnvelope * (0.04 + 0.08 * centerFactor);
        ctx.strokeStyle = `rgba(99, 102, 241, ${ribAlpha.toFixed(3)})`;
        ctx.stroke();
      }

      for (let l = 0; l < CONFIG.lineCount; l++) {
        const row = grid[l];
        const isCenterLine = Math.abs(l - CONFIG.lineCount / 2) < 2.5;
        const layerDepth = Math.abs(l - CONFIG.lineCount / 2) / (CONFIG.lineCount / 2);

        ctx.beginPath();
        ctx.moveTo(row[0].x, row[0].y);

        for (let p = 1; p < CONFIG.pointsPerLine - 2; p++) {
          const xc = (row[p].x + row[p + 1].x) * 0.5;
          const yc = (row[p].y + row[p + 1].y) * 0.5;
          ctx.quadraticCurveTo(row[p].x, row[p].y, xc, yc);
        }
        ctx.lineTo(row[CONFIG.pointsPerLine - 1].x, row[CONFIG.pointsPerLine - 1].y);

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        if (isCenterLine) {
          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.02)');
          gradient.addColorStop(0.18, 'rgba(99, 102, 241, 0.24)');
          gradient.addColorStop(0.32, 'rgba(99, 102, 241, 0.26)');
          gradient.addColorStop(0.44, 'rgba(99, 102, 241, 0.12)');
          gradient.addColorStop(0.50, 'rgba(79, 70, 229, 0.09)');
          gradient.addColorStop(0.56, 'rgba(37, 99, 235, 0.12)');
          gradient.addColorStop(0.68, 'rgba(37, 99, 235, 0.26)');
          gradient.addColorStop(0.82, 'rgba(99, 102, 241, 0.24)');
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0.02)');
        } else {
          const depthAlpha = Math.max(0.08, 0.22 - layerDepth * 0.09);
          const centerAlpha = depthAlpha * 0.45;
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.015)');
          gradient.addColorStop(0.20, `rgba(15, 23, 42, ${depthAlpha.toFixed(3)})`);
          gradient.addColorStop(0.44, `rgba(15, 23, 42, ${centerAlpha.toFixed(3)})`);
          gradient.addColorStop(0.56, `rgba(15, 23, 42, ${centerAlpha.toFixed(3)})`);
          gradient.addColorStop(0.80, `rgba(15, 23, 42, ${depthAlpha.toFixed(3)})`);
          gradient.addColorStop(1, 'rgba(15, 23, 42, 0.015)');
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isCenterLine ? 1.15 : 0.85;
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const part = particles[i];
        if (!prefersReducedMotion) {
          part.normX += part.speed;
          if (part.normX > 0.8) part.normX = 0.2;
        }

        const l = Math.min(part.lineIndex, CONFIG.lineCount - 1);
        const xIdxFloat = part.normX * (CONFIG.pointsPerLine - 1);
        const xIdx = Math.floor(xIdxFloat);
        const frac = xIdxFloat - xIdx;

        if (grid[l] && grid[l][xIdx] && grid[l][xIdx + 1]) {
          const ptA = grid[l][xIdx];
          const ptB = grid[l][xIdx + 1];
          const px = ptA.x + (ptB.x - ptA.x) * frac;
          const py = ptA.y + (ptB.y - ptA.y) * frac;

          const pulse = 0.5 + 0.5 * Math.sin(time * 2.2 + part.pulseOffset);
          const radius = part.size * (0.8 + 0.25 * pulse);

          let col = 'rgba(15, 23, 42, 0.42)';
          let glowCol = 'rgba(15, 23, 42, 0.10)';
          if (part.accentType === 'violet') {
            col = `rgba(99, 102, 241, ${(0.42 + 0.22 * pulse).toFixed(3)})`;
            glowCol = 'rgba(99, 102, 241, 0.15)';
          } else if (part.accentType === 'blue') {
            col = `rgba(37, 99, 235, ${(0.42 + 0.22 * pulse).toFixed(3)})`;
            glowCol = 'rgba(37, 99, 235, 0.15)';
          }

          ctx.beginPath();
          ctx.arc(px, py, radius * 2.0, 0, Math.PI * 2);
          ctx.fillStyle = glowCol;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = col;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    }

    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="hero-visual-wrapper" aria-hidden="true">
      <canvas id="hero-waveform-canvas" ref={canvasRef} />
      <div className="hero-floor-overlay" />
    </div>
  );
}
