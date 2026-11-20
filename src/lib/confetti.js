import { PAINTS, clamp, reducedMotion } from './constants';

/** Paper confetti on one full-screen canvas. Call attach(canvas) once it is mounted. */
let cv = null, ctx = null, parts = [], raf = 0, last = 0;

export function attach(canvas) {
  cv = canvas;
  ctx = canvas ? canvas.getContext('2d') : null;
}

function size() {
  const d = Math.min(2, devicePixelRatio || 1);
  if (cv.width !== Math.round(innerWidth * d) || cv.height !== Math.round(innerHeight * d)) {
    cv.width = innerWidth * d; cv.height = innerHeight * d;
  }
  ctx.setTransform(d, 0, 0, d, 0, 0);
}
function shape(p) {
  ctx.beginPath();
  if (p.k === 0) {
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? p.s * 0.45 : p.s, an = -Math.PI / 2 + i * Math.PI / 5;
      ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr);
    }
    ctx.closePath();
  } else if (p.k === 1) ctx.arc(0, 0, p.s * 0.6, 0, Math.PI * 2);
  else if (p.k === 2) ctx.rect(-p.s * 0.7, -p.s * 0.35, p.s * 1.4, p.s * 0.7);
  else ctx.rect(-p.s * 0.18, -p.s * 0.9, p.s * 0.36, p.s * 1.8);
}
function tick(now) {
  if (!ctx) { raf = 0; parts = []; return; }
  const dt = Math.min(40, now - last) / 16.67; last = now;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.y < innerHeight + 40 && p.life > 0);
  for (const p of parts) {
    if (p.still) { p.life -= dt; ctx.globalAlpha = clamp(p.life / p.max * 2, 0, 1); }
    else {
      p.vx *= Math.pow(0.985, dt); p.vy = Math.min(p.vy + 0.16 * dt, 6.5); p.w += 0.08 * dt; p.life -= dt;
      p.x += (p.vx + Math.sin(p.w) * 0.7) * dt; p.y += p.vy * dt; p.r += p.vr * dt;
    }
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, Math.abs(Math.cos(p.w * 1.7)) * 0.7 + 0.3);
    ctx.fillStyle = p.c; shape(p); ctx.fill();
    if (p.k === 0) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = 1;
  }
  if (parts.length) raf = requestAnimationFrame(tick);
  else { raf = 0; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}
function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } }
function still(n, C, cx, cy) {
  for (let i = 0; i < Math.min(n, 70); i++) {
    parts.push({
      x: cx != null ? cx + (Math.random() - 0.5) * 180 : innerWidth * (0.06 + Math.random() * 0.88),
      y: cy != null ? cy + (Math.random() - 0.5) * 120 : innerHeight * (0.08 + Math.random() * 0.8),
      vx: 0, vy: 0, r: Math.random() * 6.3, vr: 0, s: 7 + Math.random() * 8, k: i % 4, c: C[i % C.length], w: 0, life: 70, max: 70, still: true,
    });
  }
  start();
}
const cols = () => { const c = Object.values(PAINTS).map(p => p.c); c.push('#FFC21A', '#FFC21A', '#fff'); return c; };

export const confetti = {
  burst(n = 170) {
    if (!ctx) return;
    size(); const C = cols();
    if (reducedMotion()) return still(n, C);
    for (let i = 0; i < n; i++) {
      parts.push({
        x: innerWidth * (0.06 + Math.random() * 0.88), y: -30 - Math.random() * innerHeight * 0.5,
        vx: (Math.random() - 0.5) * 2.6, vy: 1.5 + Math.random() * 3, r: Math.random() * 6.3, vr: (Math.random() - 0.5) * 0.22,
        s: 7 + Math.random() * 9, k: i % 4, c: C[i % C.length], w: Math.random() * 6.3, life: 600,
      });
    }
    start();
  },
  pop(x, y, n = 36) {
    if (!ctx) return;
    size(); const C = cols();
    if (reducedMotion()) return still(Math.min(n, 18), C, x, y);
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.25, sp = 4 + Math.random() * 7;
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: Math.random() * 6.3, vr: (Math.random() - 0.5) * 0.3, s: 5 + Math.random() * 6, k: i % 4, c: C[i % C.length], w: Math.random() * 6.3, life: 140 });
    }
    start();
  },
};
