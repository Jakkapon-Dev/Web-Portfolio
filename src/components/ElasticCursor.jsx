import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '../hooks/useMediaQuery';
import { useMotionPreference } from '../context/MotionContext';

// A drafting-tool cursor, not a generic blob: at rest it's a small crosshair
// reticle; over anything clickable it morphs into a rounded outline that
// hugs the element, like a "selected component" box in a CAD/vector tool.
// Ported and simplified from references/3d-portfolio's ElasticCursor — the
// per-target magnetic pull is dropped (it would double up with the existing
// <Magnet> wrapper on a few controls) and the Next.js-specific bits
// (usePathname, preloader) are removed; everything else is the same
// spring/ticker approach.

const RETICLE_SIZE = 22;
const WRAP_PADDING = 6;
const WRAP_EASE = 0.25;

const lerp = (a, b, t) => a + (b - a) * t;
const getAngle = (dx, dy) => Math.atan2(dy, dx) * (180 / Math.PI);
const getScale = (dx, dy) => Math.min(Math.hypot(dx, dy) * 0.005, 0.35);

const measure = (el) => {
  const r = el.getBoundingClientRect();
  return {
    x: r.left,
    y: r.top,
    width: r.width,
    height: r.height,
    cx: r.left + r.width / 2,
    cy: r.top + r.height / 2,
  };
};

export default function ElasticCursor() {
  const isTouch = useMediaQuery('(max-width: 768px), (pointer: coarse)');
  const { motionEnabled } = useMotionPreference();

  const jellyRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorMoved, setCursorMoved] = useState(false);
  const cursorMovedRef = useRef(false);

  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const jelly = useRef({ x: 0, y: 0, w: RETICLE_SIZE, h: RETICLE_SIZE, r: 4 });
  const active = useRef({ el: null, base: null });
  const set = useRef({});

  useLayoutEffect(() => {
    const jellyEl = jellyRef.current;
    const dotEl = dotRef.current;
    if (!jellyEl || !dotEl || isTouch) return undefined;
    gsap.set(jellyEl, { xPercent: -50, yPercent: -50 });
    gsap.set(dotEl, { xPercent: -50, yPercent: -50 });
    set.current.x = gsap.quickSetter(jellyEl, 'x', 'px');
    set.current.y = gsap.quickSetter(jellyEl, 'y', 'px');
    set.current.r = gsap.quickSetter(jellyEl, 'rotate', 'deg');
    set.current.sx = gsap.quickSetter(jellyEl, 'scaleX');
    set.current.sy = gsap.quickSetter(jellyEl, 'scaleY');
    set.current.width = gsap.quickSetter(jellyEl, 'width', 'px');
    set.current.height = gsap.quickSetter(jellyEl, 'height', 'px');
    set.current.radius = gsap.quickSetter(jellyEl, 'borderRadius', 'px');
    set.current.opacity = gsap.quickSetter(jellyEl, 'opacity');
    set.current.dotX = gsap.quickSetter(dotEl, 'x', 'px');
    set.current.dotY = gsap.quickSetter(dotEl, 'y', 'px');
    set.current.dotOpacity = gsap.quickSetter(dotEl, 'opacity');
    return undefined;
  }, [isTouch]);

  const render = useCallback(() => {
    const setters = set.current;
    if (!setters.x) return;
    setters.dotX(pointer.current.x);
    setters.dotY(pointer.current.y);

    const el = active.current.el;
    const wrapping = !!el;

    if (wrapping && active.current.base) {
      const b = active.current.base;
      jelly.current.x = lerp(jelly.current.x, b.cx, WRAP_EASE);
      jelly.current.y = lerp(jelly.current.y, b.cy, WRAP_EASE);
      jelly.current.w = lerp(jelly.current.w, b.width + WRAP_PADDING * 2, WRAP_EASE);
      jelly.current.h = lerp(jelly.current.h, b.height + WRAP_PADDING * 2, WRAP_EASE);
      jelly.current.r = lerp(jelly.current.r, 10, WRAP_EASE);
      setters.x(jelly.current.x);
      setters.y(jelly.current.y);
      setters.width(jelly.current.w);
      setters.height(jelly.current.h);
      setters.radius(jelly.current.r);
      setters.sx(1);
      setters.sy(1);
      setters.r(0);
      setters.opacity(1);
      setters.dotOpacity(0);
    } else {
      const rotation = getAngle(vel.current.x, vel.current.y);
      const scale = motionEnabled ? getScale(vel.current.x, vel.current.y) : 0;
      jelly.current.x = pos.current.x;
      jelly.current.y = pos.current.y;
      jelly.current.w = lerp(jelly.current.w, RETICLE_SIZE + scale * 200, 0.4);
      jelly.current.h = lerp(jelly.current.h, RETICLE_SIZE, 0.4);
      jelly.current.r = lerp(jelly.current.r, 4, 0.4);
      setters.x(pos.current.x);
      setters.y(pos.current.y);
      setters.width(jelly.current.w);
      setters.height(jelly.current.h);
      setters.radius(jelly.current.r);
      setters.r(motionEnabled ? rotation : 0);
      setters.sx(1 + scale);
      setters.sy(1 - scale * 2);
      setters.opacity(1);
      setters.dotOpacity(1);
    }
  }, [motionEnabled]);

  useEffect(() => {
    if (isTouch) return undefined;
    const onMove = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      if (!cursorMovedRef.current) {
        cursorMovedRef.current = true;
        setCursorMoved(true);
      }
      if (!motionEnabled) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        vel.current.x = 0;
        vel.current.y = 0;
        return;
      }
      gsap.to(pos.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.4,
        ease: 'elastic.out(1, 0.5)',
        onUpdate: () => {
          vel.current.x = (e.clientX - pos.current.x) * 1.2;
          vel.current.y = (e.clientY - pos.current.y) * 1.2;
        }
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isTouch, motionEnabled]);

  // Acquire/release hover targets — any naturally-interactive element site-
  // wide, no opt-in class needed. Text inputs opt out (native caret wins),
  // and anything marked data-no-custom-cursor opts the whole effect out.
  useEffect(() => {
    if (isTouch) return undefined;

    const acquire = (el) => {
      active.current.el = el;
      active.current.base = measure(el);
    };
    const release = () => {
      active.current.el = null;
      active.current.base = null;
    };

    const onOver = (e) => {
      const target = e.target;
      if (target?.closest?.('[data-no-custom-cursor="true"]')) {
        if (active.current.el) release();
        return;
      }
      if (target?.closest?.('input, textarea, [contenteditable="true"]')) {
        if (active.current.el) release();
        return;
      }
      const t = target?.closest?.('a, button, [role="button"], summary, select, .cursor-can-hover');
      if (t === active.current.el) return;
      if (active.current.el) release();
      if (t) acquire(t);
    };
    const onLeave = () => {
      if (active.current.el) release();
    };
    const onScroll = () => {
      if (!active.current.el) return;
      active.current.base = measure(active.current.el);
    };

    document.addEventListener('pointerover', onOver);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch || !cursorMoved) return undefined;
    gsap.ticker.add(render);
    return () => gsap.ticker.remove(render);
  }, [isTouch, cursorMoved, render]);

  if (isTouch) return null;

  return (
    <>
      {cursorMoved && (
        <style>{`html, body, a, button, [role="button"] { cursor: none !important; }`}</style>
      )}
      <div
        ref={jellyRef}
        aria-hidden="true"
        className="fixed left-0 top-0 border-[1.5px] border-draft-500 pointer-events-none will-change-transform"
        style={{
          width: RETICLE_SIZE,
          height: RETICLE_SIZE,
          borderRadius: 4,
          boxSizing: 'border-box',
          zIndex: 200,
          opacity: 0,
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="w-1 h-1 rounded-full bg-draft-500 fixed left-0 top-0 pointer-events-none will-change-transform"
        style={{ opacity: 0, zIndex: 201, mixBlendMode: 'difference' }}
      />
    </>
  );
}
