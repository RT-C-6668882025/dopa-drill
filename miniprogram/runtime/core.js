const platform=require('../platform/runtime');
const clock=platform.clock;
// Frame clock, tweens, springs and small math helpers.
// Everything is driven by clock.now() + requestAnimationFrame so the
// whole show can be captured deterministically with a virtual clock.

const tasks = new Set();
let last = clock.now();
let running = false;

const now = () => clock.now();

function onFrame(fn) {
  tasks.add(fn);
  return () => tasks.delete(fn);
}

function loop() {
  const t = clock.now();
  const dt = Math.min(0.05, Math.max(0, (t - last) / 1000));
  last = t;
  for (const fn of [...tasks]) fn(dt, t);
  clock.raf(loop);
}

function startClock() {
  if (running) return;
  running = true;
  last = clock.now();
  clock.raf(loop);
}

function wait(ms) {
  return new Promise((resolve) => {
    const end = clock.now() + ms;
    const off = onFrame((dt, t) => {
      if (t >= end) { off(); resolve(); }
    });
  });
}

function tween(duration, fn, ease = easeOutCubic) {
  return new Promise((resolve) => {
    const t0 = clock.now();
    fn(ease(0), 0);
    const off = onFrame((dt, t) => {
      const k = duration <= 0 ? 1 : Math.min(1, (t - t0) / duration);
      fn(ease(k), k);
      if (k >= 1) { off(); resolve(); }
    });
  });
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const invLerp = (a, b, v) => clamp((v - a) / (b - a));
const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const chance = (p) => Math.random() < p;

const easeLinear = (k) => k;
const easeOutCubic = (k) => 1 - (1 - k) ** 3;
const easeInCubic = (k) => k * k * k;
const easeInOutCubic = (k) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);
const easeOutQuint = (k) => 1 - (1 - k) ** 5;
const easeInQuad = (k) => k * k;
const easeOutQuad = (k) => 1 - (1 - k) * (1 - k);
const easeOutBack = (k, s = 1.9) => 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2;
const easeInBack = (k, s = 1.7) => (s + 1) * k * k * k - s * k * k;
const easeOutElastic = (k) => (k === 0 || k === 1 ? k : 2 ** (-10 * k) * Math.sin((k * 10 - 0.75) * (2 * Math.PI / 3)) + 1);

// Critically-damped-ish spring used for squash, ears and small offsets.
class Spring {
  constructor(value = 0, stiffness = 320, damping = 16) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }
  kick(v) { this.velocity += v; }
  step(dt) {
    const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const a = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
      this.velocity += a * h;
      this.value += this.velocity * h;
    }
    return this.value;
  }
}

function quadPoint(a, c, b, t) {
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
}

function centerOf(el) { return platform.centerOf(el); }

const params = platform.params;

module.exports={now,onFrame,startClock,wait,tween,clamp,lerp,invLerp,rand,randInt,pick,chance,easeLinear,easeOutCubic,easeInCubic,easeInOutCubic,easeOutQuint,easeInQuad,easeOutQuad,easeOutBack,easeInBack,easeOutElastic,Spring,quadPoint,centerOf,params};
