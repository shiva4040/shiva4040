import React, { useEffect, useRef } from 'react';

/**
 * Interactive 2D Loss Landscape Contour and Optimizer Dynamics canvas component.
 */
export function LossLandscapeCanvas({ optimizer = 'ADAM', resetTrigger = 0, onTelemetryUpdate }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    optimizer,
    particle: {
      x: -1.8,
      y: 1.4,
      vx: 0,
      vy: 0,
      m_x: 0,
      m_y: 0,
      v_x: 0,
      v_y: 0,
      t: 0
    },
    trajectory: []
  });

  // Keep stateRef synced with props
  useEffect(() => {
    stateRef.current.optimizer = optimizer;
    // Reset velocities/moments on optimizer switch
    stateRef.current.particle.vx = 0;
    stateRef.current.particle.vy = 0;
    stateRef.current.particle.m_x = 0;
    stateRef.current.particle.m_y = 0;
    stateRef.current.particle.v_x = 0;
    stateRef.current.particle.v_y = 0;
    stateRef.current.particle.t = 0;
    stateRef.current.trajectory = [];
  }, [optimizer, resetTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isVisible = true;
    let contourCanvas = null;

    const lr = 0.035;
    const beta1 = 0.9;
    const beta2 = 0.999;
    const eps = 1e-8;
    const MAX_TRAJECTORY = 180;

    const lossFunc = (x, y) => {
      return (
        0.35 * (x * x + 1.8 * y * y) -
        0.45 * Math.cos(2.2 * x) * Math.cos(2.2 * y) +
        0.2 * Math.sin(1.8 * x)
      );
    };

    const gradFunc = (x, y) => {
      const dLdx =
        0.7 * x +
        0.45 * 2.2 * Math.sin(2.2 * x) * Math.cos(2.2 * y) +
        0.36 * Math.cos(1.8 * x);
      const dLdy =
        3.6 * 0.35 * y +
        0.45 * 2.2 * Math.cos(2.2 * x) * Math.sin(2.2 * y);
      return { dx: dLdx, dy: dLdy };
    };

    const toScreen = (x, y) => {
      const sx = ((x + 2.5) / 5.0) * width;
      const sy = ((2.0 - y) / 4.0) * height;
      return { sx, sy };
    };

    const fromScreen = (sx, sy) => {
      const x = (sx / width) * 5.0 - 2.5;
      const y = 2.0 - (sy / height) * 4.0;
      return { x, y };
    };

    const generateContourMap = () => {
      contourCanvas = document.createElement('canvas');
      contourCanvas.width = width;
      contourCanvas.height = height;
      const cCtx = contourCanvas.getContext('2d');
      if (!cCtx) return;

      cCtx.fillStyle = '#0B0C10';
      cCtx.fillRect(0, 0, width, height);

      const res = 18;
      for (let py = 0; py < height; py += res) {
        for (let px = 0; px < width; px += res) {
          const coords = fromScreen(px + res * 0.5, py + res * 0.5);
          const lVal = lossFunc(coords.x, coords.y);
          const normVal = Math.max(0, Math.min(1, (lVal + 0.5) / 3.5));
          const alpha = 0.03 + (1 - normVal) * 0.08;
          cCtx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
          cCtx.fillRect(px, py, res, res);
        }
      }

      const levels = [-0.3, 0.0, 0.3, 0.7, 1.2, 1.8, 2.5, 3.4];
      const step = 8;
      for (let py = 0; py < height - step; py += step) {
        for (let px = 0; px < width - step; px += step) {
          const c1 = fromScreen(px, py);
          const l1 = lossFunc(c1.x, c1.y);

          for (let k = 0; k < levels.length; k++) {
            const lv = levels[k];
            if (Math.abs(l1 - lv) < 0.04) {
              cCtx.fillStyle = 'rgba(255, 255, 255, 0.09)';
              cCtx.fillRect(px, py, 1.5, 1.5);
            }
          }
        }
      }

      const minCenter = toScreen(0, 0);
      cCtx.beginPath();
      cCtx.arc(minCenter.sx, minCenter.sy, 6, 0, Math.PI * 2);
      cCtx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      cCtx.setLineDash([2, 3]);
      cCtx.stroke();
      cCtx.setLineDash([]);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      generateContourMap();
    };

    const stepOptimizer = () => {
      const p = stateRef.current.particle;
      const currentOpt = stateRef.current.optimizer;

      p.t += 1;
      const g = gradFunc(p.x, p.y);
      const gradNorm = Math.sqrt(g.dx * g.dx + g.dy * g.dy);

      if (currentOpt === 'SGD') {
        p.x -= lr * g.dx;
        p.y -= lr * g.dy;
      } else if (currentOpt === 'MOMENTUM') {
        const momentum = 0.88;
        p.vx = momentum * p.vx - lr * g.dx;
        p.vy = momentum * p.vy - lr * g.dy;
        p.x += p.vx;
        p.y += p.vy;
      } else if (currentOpt === 'ADAM') {
        p.m_x = beta1 * p.m_x + (1 - beta1) * g.dx;
        p.m_y = beta1 * p.m_y + (1 - beta1) * g.dy;
        p.v_x = beta2 * p.v_x + (1 - beta2) * (g.dx * g.dx);
        p.v_y = beta2 * p.v_y + (1 - beta2) * (g.dy * g.dy);

        const m_hat_x = p.m_x / (1 - Math.pow(beta1, p.t));
        const m_hat_y = p.m_y / (1 - Math.pow(beta1, p.t));
        const v_hat_x = p.v_x / (1 - Math.pow(beta2, p.t));
        const v_hat_y = p.v_y / (1 - Math.pow(beta2, p.t));

        p.x -= (lr / (Math.sqrt(v_hat_x) + eps)) * m_hat_x;
        p.y -= (lr / (Math.sqrt(v_hat_y) + eps)) * m_hat_y;
      }

      p.x = Math.max(-2.4, Math.min(2.4, p.x));
      p.y = Math.max(-1.9, Math.min(1.9, p.y));

      stateRef.current.trajectory.push({ x: p.x, y: p.y });
      if (stateRef.current.trajectory.length > MAX_TRAJECTORY) {
        stateRef.current.trajectory.shift();
      }

      if (p.t % 4 === 0 && onTelemetryUpdate) {
        const curLoss = lossFunc(p.x, p.y);
        onTelemetryUpdate({
          epoch: p.t,
          loss: curLoss.toFixed(4),
          gradNorm: gradNorm.toFixed(4)
        });
      }
    };

    const loop = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(loop);
        return;
      }

      stepOptimizer();

      ctx.clearRect(0, 0, width, height);
      if (contourCanvas) {
        ctx.drawImage(contourCanvas, 0, 0, width, height);
      }

      const traj = stateRef.current.trajectory;
      const currentOpt = stateRef.current.optimizer;

      if (traj.length > 1) {
        ctx.beginPath();
        const start = toScreen(traj[0].x, traj[0].y);
        ctx.moveTo(start.sx, start.sy);

        for (let i = 1; i < traj.length; i++) {
          const pt = toScreen(traj[i].x, traj[i].y);
          ctx.lineTo(pt.sx, pt.sy);
        }

        ctx.lineWidth = 1.75;
        ctx.strokeStyle =
          currentOpt === 'ADAM'
            ? '#6366F1'
            : currentOpt === 'MOMENTUM'
            ? '#2563EB'
            : '#10B981';
        ctx.stroke();

        for (let j = 0; j < traj.length; j += 8) {
          const pt = toScreen(traj[j].x, traj[j].y);
          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        }
      }

      const p = stateRef.current.particle;
      const curPos = toScreen(p.x, p.y);

      ctx.beginPath();
      ctx.arc(curPos.sx, curPos.sy, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(curPos.sx, curPos.sy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const newCoords = fromScreen(sx, sy);

      const p = stateRef.current.particle;
      p.x = newCoords.x;
      p.y = newCoords.y;
      p.vx = 0;
      p.vy = 0;
      p.m_x = 0;
      p.m_y = 0;
      p.v_x = 0;
      p.v_y = 0;
      p.t = 0;
      stateRef.current.trajectory = [];
    };

    canvas.addEventListener('click', handleCanvasClick);
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    const labSection = document.getElementById('lab');
    if (labSection) {
      observer.observe(labSection);
    }

    resize();
    animId = requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [onTelemetryUpdate]);

  return <canvas id="loss-landscape-canvas" ref={canvasRef} />;
}
