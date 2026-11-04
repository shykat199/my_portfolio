"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
  phase: number;
  age: number;
};

const COLORS = ["94 224 174", "132 236 196", "244 184 96"];
const LINK_DISTANCE = 150;

function spawn(w: number, h: number): Node {
  const speed = 0.15 + Math.random() * 0.35;
  const side = Math.floor(Math.random() * 4);
  // Enter from a random edge, heading roughly across the screen.
  const spread = (Math.random() - 0.5) * 0.9;
  let x = 0;
  let y = 0;
  let angle = 0;
  if (side === 0) {
    x = Math.random() * w;
    y = -10;
    angle = Math.PI / 2 + spread;
  } else if (side === 1) {
    x = w + 10;
    y = Math.random() * h;
    angle = Math.PI + spread;
  } else if (side === 2) {
    x = Math.random() * w;
    y = h + 10;
    angle = -Math.PI / 2 + spread;
  } else {
    x = -10;
    y = Math.random() * h;
    angle = spread;
  }
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 1.2 + Math.random() * 1.8,
    hue: COLORS[Math.floor(Math.random() * COLORS.length)],
    phase: Math.random() * Math.PI * 2,
    age: 0,
  };
}

export function NodeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(70, (w * h) / 22000));
      // Seed nodes scattered mid-flight so the field doesn't start empty.
      while (nodes.length < target) {
        const n = spawn(w, h);
        n.x = Math.random() * w;
        n.y = Math.random() * h;
        n.age = 1;
        nodes.push(n);
      }
      nodes.length = target;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        // Gentle sideways sway so paths curve instead of running dead straight.
        const sway = Math.sin(t * 0.0006 + n.phase) * 0.12;
        n.x += n.vx + -n.vy * sway;
        n.y += n.vy + n.vx * sway;
        n.age = Math.min(1, n.age + 0.008);
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.22 * Math.min(a.age, b.age);
            ctx.strokeStyle = `rgb(${a.hue} / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = 0.75 + Math.sin(t * 0.002 + n.phase) * 0.25;
        ctx.fillStyle = `rgb(${n.hue} / ${0.7 * n.age * pulse})`;
        ctx.shadowColor = `rgb(${n.hue} / 0.8)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (n.x < -40 || n.x > w + 40 || n.y < -40 || n.y > h + 40) {
          nodes[i] = spawn(w, h);
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduced) frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw(0);
    else frame = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
