import { clamp } from './constants';
import { board } from './board';

/** Marimba, pops and wheel ticks, synthesised with Web Audio (no sound files). */
export const Sound = {
  ctx: null, out: null, noise: null,
  get() {
    if (!board.get()?.sound) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!this.ctx) {
      this.ctx = new AC();
      const comp = this.ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
      this.out = this.ctx.createGain(); this.out.gain.value = 0.7; this.out.connect(comp); comp.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.25, buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.noise = buf;
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },
  env(g, t, peak, dur) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  },
  marimba(f, when = 0, vol = 0.4, dur = 0.9) {
    const c = this.get(); if (!c) return; const t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f; this.env(g, t, vol, dur);
    const o2 = c.createOscillator(), g2 = c.createGain(); o2.type = 'sine'; o2.frequency.value = f * 3.93; this.env(g2, t, vol * 0.3, 0.14);
    o.connect(g).connect(this.out); o2.connect(g2).connect(this.out);
    o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + 0.2);
  },
  pop(vol = 0.4, when = 0) {
    const c = this.get(); if (!c) return; const t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain(); o.type = 'sine';
    o.frequency.setValueAtTime(380, t); o.frequency.exponentialRampToValueAtTime(1100, t + 0.07);
    this.env(g, t, vol, 0.12); o.connect(g).connect(this.out); o.start(t); o.stop(t + 0.15);
  },
  tick(vol = 0.3) {
    const c = this.get(); if (!c) return; const t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3000; bp.Q.value = 3;
    const g = c.createGain(); this.env(g, t, vol, 0.035);
    n.connect(bp).connect(g).connect(this.out); n.start(t); n.stop(t + 0.05);
  },
  scale: [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760],
  star(i) { this.pop(0.36); this.marimba(this.scale[clamp(i, 0, 9)], 0.03, 0.36); },
  earned() { [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98].forEach((f, i) => this.marimba(f, i * 0.08, 0.34, 1)); },
  undo() { this.marimba(392, 0, 0.28, 0.5); this.marimba(329.63, 0.09, 0.24, 0.6); },
  bonk() { this.marimba(196, 0, 0.32, 0.35); },
  whoosh() { [392, 523.25, 659.25].forEach((f, i) => this.marimba(f, i * 0.05, 0.22, 0.5)); },
  win() {
    [[783.99, 0], [1046.5, 0.13], [1318.51, 0.26], [1567.98, 0.39], [1318.51, 0.6], [1567.98, 0.72], [2093, 0.86]].forEach(([f, w]) => this.marimba(f, w, 0.36, 1.2));
    this.marimba(523.25, 0.86, 0.3, 1.6); this.marimba(659.25, 0.86, 0.26, 1.6);
  },
};
