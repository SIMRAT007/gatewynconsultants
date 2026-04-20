import { useEffect, useRef } from 'react';

export function useReveal(animClass = 'reveal', threshold = 0.15, delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);
  return ref;
}

export function useWordReveal(text) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const words = (text || '').split(' ').map((word, i) => (
    <span key={i} className="word" style={{ transitionDelay: `${i * 0.065}s` }}>{word}&nbsp;</span>
  ));
  return [ref, words];
}

export function useCountUp(target, duration = 2000) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const str = String(target);
    const numericTarget = parseInt(str.replace(/[^0-9]/g, ''), 10);
    const suffix = str.replace(/[0-9]/g, '').replace(',','');
    const prefix = str.match(/^[^0-9]*/)?.[0] || '';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const animate = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.floor(eased * numericTarget).toLocaleString() + suffix;
            if (p < 1) frameRef.current = requestAnimationFrame(animate);
          };
          frameRef.current = requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration]);
  return ref;
}
