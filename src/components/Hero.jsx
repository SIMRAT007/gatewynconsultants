import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useWordReveal } from '../hooks/useReveal';
import WorldMap from './WorldMap';
import { handleNavClick } from '../utils/smoothScroll';

const particles = Array.from({ length: 22 }, (_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${5 + Math.random() * 8}s`,
  opacity: Math.random() * 0.45 + 0.08,
  width: `${Math.random() * 3 + 1.5}px`,
  height: `${Math.random() * 3 + 1.5}px`,
}));

function TypewriterBadge({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, 45);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-3.5 bg-[#E7CD87] ml-0.5 animate-pulse" />}
    </span>
  );
}

export default function Hero() {
  const { content } = useContent('hero');
  const [videoOpen, setVideoOpen] = useState(false);
  const [subRef, subWords] = useWordReveal(content?.subheading || '');

  // Staggered entrance refs
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const els = [
      { el: badgeRef.current, delay: 100 },
      { el: h1Ref.current, delay: 300 },
      { el: ctaRef.current, delay: 600 },
      { el: statsRef.current, delay: 800 },
      { el: mapRef.current, delay: 400 },
    ];
    els.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #07111f 0%, #142845 55%, #0d2040 100%)' }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(231,205,135,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(231,205,135,1) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Radial glow blobs */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-[#E7CD87]/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#1a4a80]/30 blur-[80px] pointer-events-none" />

      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} className="particle" style={p} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

          {/* Left: text */}
          <div className="text-center lg:text-left w-full overflow-hidden">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full border border-[#E7CD87]/25 bg-[#E7CD87]/6 text-[#E7CD87] text-[10px] sm:text-xs font-medium tracking-wider sm:tracking-widest uppercase mb-6 sm:mb-7 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7CD87] animate-pulse" />
              <TypewriterBadge text={content?.badge || 'Trusted Immigration Consultants Since 2005'} />
            </div>

            {/* H1 */}
            <h1 ref={h1Ref} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] sm:leading-[1.12] mb-5 sm:mb-6 text-white break-words hyphens-auto w-full">
              {(content?.heading || 'Your Gateway to\nGlobal Education').split('\n').map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line.split(' ').map((w, i) => {
                    const isGold = (lineIndex === 0 && i === 1) || (lineIndex === 1 && i === 0);
                    return (
                      <span
                        key={i}
                        className={isGold ? 'text-shimmer font-semibold italic' : ''}
                        style={{ marginRight: '0.22em' }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            {/* Subheading — word reveal */}
            <p
              ref={subRef}
              className="word-reveal text-base sm:text-[1.05rem] text-white/55 leading-relaxed mb-7 sm:mb-9 max-w-lg mx-auto lg:mx-0 break-words w-full"
            >
              {subWords}
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center lg:justify-start w-full max-w-full">
              <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="btn-gold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold gap-2 justify-center whitespace-nowrap">
                {content?.cta_primary || 'Start Your Journey'}
                <ArrowRight size={15} />
              </a>
              <button
                onClick={() => setVideoOpen(true)}
                className="btn-outline-gold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold gap-2.5 justify-center whitespace-nowrap"
              >
                <div className="w-6 h-6 rounded-full bg-[#E7CD87]/15 flex items-center justify-center">
                  <Play size={10} fill="#E7CD87" className="text-[#E7CD87] ml-0.5" />
                </div>
                Watch Our Story
              </button>
            </div>

            {/* Stats */}
            {content?.stats && (
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-xl mx-auto lg:mx-0 w-full">
                {content.stats.map((stat, i) => (
                  <div key={i} className="group text-center lg:text-left overflow-hidden">
                    <div className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#E7CD87] mb-0.5 counter-value whitespace-nowrap">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/45 tracking-wide uppercase break-words">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: world map */}
          <div ref={mapRef} className="relative mt-8 lg:mt-0 w-full" style={{ padding: '20px 0' }}>
            {/* Map container */}
            <div className="relative rounded-2xl lg:rounded-3xl border border-[#E7CD87]/15 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.01] p-4 sm:p-6 lg:p-8 backdrop-blur-md shadow-2xl w-full max-w-full overflow-visible animate-float map-card-hover" style={{ animationDelay: '0.5s' }}>
              {/* Ambient glow effects */}
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-[#E7CD87]/5 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#1a4a80]/10 rounded-full blur-3xl pointer-events-none -z-10" />
              
              {/* Top label */}
              <div className="relative z-20 flex items-center justify-between mb-4 sm:mb-5 w-full overflow-hidden">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E7CD87] animate-pulse flex-shrink-0" />
                  <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-[#E7CD87]/90 uppercase tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.15em] font-semibold drop-shadow-sm whitespace-nowrap">Global Destinations</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#E7CD87]/12 border border-[#E7CD87]/20 backdrop-blur-sm flex-shrink-0">
                  <span className="text-[9px] sm:text-[10px] text-[#E7CD87]/90 font-medium whitespace-nowrap">50+</span>
                  <span className="text-[9px] sm:text-[10px] text-white/50 whitespace-nowrap">Countries</span>
                </div>
              </div>
              
              <div className="relative z-10 w-full">
                <WorldMap className="w-full max-w-full" />
              </div>
              
              {/* Bottom strip */}
              <div className="relative z-20 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10 flex justify-between items-center w-full overflow-hidden">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-[#E7CD87]" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#E7CD87] animate-ping opacity-40" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/60 tracking-wide drop-shadow-sm whitespace-nowrap">Live destinations</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#E7CD87]/70 italic drop-shadow-sm hidden sm:inline whitespace-nowrap flex-shrink-0">Hover to explore</span>
                <span className="text-[9px] text-[#E7CD87]/70 italic drop-shadow-sm sm:hidden whitespace-nowrap flex-shrink-0">Tap to explore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0c1c30] to-transparent pointer-events-none" />

      {/* Scroll arrow */}
      <a href="#stats" onClick={(e) => handleNavClick('#stats', e)} className="flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#E7CD87]/40 hover:text-[#E7CD87]/70 transition-colors z-20">
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#E7CD87]/40 to-transparent" />
        <ChevronDown size={16} className="animate-bounce" />
      </a>

      {/* Video lightbox */}
      {videoOpen && (
        <div className="lightbox-backdrop" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm"
            >
              ✕ Close
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                title="Our Story"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
