import { useState } from 'react';
import { Clock, BarChart2, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useReveal, useWordReveal } from '../hooks/useReveal';
import { handleNavClick } from '../utils/smoothScroll';

const DIFF_STYLE = {
  'Easy': { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  'Moderate': { dot: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-400/10' },
  'Easy–Moderate': { dot: 'bg-amber-300', text: 'text-amber-300', bg: 'bg-amber-300/10' },
  'Complex': { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-400/10' },
};

function VisaCard({ item, onClick, index }) {
  const d = DIFF_STYLE[item.difficulty] || DIFF_STYLE['Moderate'];

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl lg:rounded-3xl border border-white/10 bg-white/5 hover:border-[#E7CD87]/30 hover:bg-white/8 hover:shadow-xl hover:shadow-[#E7CD87]/10 transition-all duration-300 group"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Card header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{item.flag}</span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-white leading-tight">{item.country}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock size={11} className="text-white/40" />
                <span className="text-[11px] text-white/50">{item.processing}</span>
              </div>
            </div>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${d.text} ${d.bg}`}>
            {item.difficulty}
          </span>
        </div>

        {/* Visa type pills */}
        <div className="flex flex-wrap gap-2">
          {(item.visas || []).map((v, j) => (
            <span key={j} className="text-[11px] px-3 py-1.5 rounded-full bg-[#142845]/80 border border-white/10 text-white/65 font-medium">
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Click indicator */}
      <div className="px-5 sm:px-6 pb-5 flex items-center justify-between">
        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#E7CD87] transition-all duration-300" />
        <span className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors duration-300">
          Click for details
        </span>
      </div>
    </div>
  );
}

export default function VisaTypes() {
  const { content } = useContent('visaTypes');
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [headRef, headWords] = useWordReveal(content?.heading || 'Understanding Visa Categories');
  const subRef = useReveal('reveal', 0.2, 200);

  return (
    <section
      id="visa-types"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f2240 0%, #142845 100%)' }}
    >
      {/* Background video (muted ambient) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none"
        src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2240]/90 to-[#142845]/90 pointer-events-none" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#E7CD87]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          {content?.badge && (
            <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-[#E7CD87]/60 uppercase tracking-[0.2em] border border-[#E7CD87]/20 rounded-full px-5 py-2.5 mb-5 sm:mb-6 backdrop-blur-sm">
              <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block animate-pulse" />
              {content.badge}
            </span>
          )}
          <h2
            ref={headRef}
            className="word-reveal font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-5 leading-tight"
          >
            {headWords}
          </h2>
          <p ref={subRef} className="reveal text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{content?.subheading}</p>
          <div className="gold-divider w-24 mx-auto mt-8" />
        </div>

        {/* Info tip */}
        {content?.educationalGuide && (
          <div className="mb-8 sm:mb-10 flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-[#E7CD87]/15 bg-[#E7CD87]/5 backdrop-blur-sm max-w-3xl mx-auto">
            <CheckCircle2 size={18} className="text-[#E7CD87] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
              {content.educationalGuide.title && (
                <span className="text-[#E7CD87] font-medium">{content.educationalGuide.title} </span>
              )}
              {content.educationalGuide.description}
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {(content?.items || []).map((item, i) => (
            <VisaCard
              key={i}
              item={item}
              index={i}
              onClick={() => setSelectedVisa(item)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-white/40">
          {[
            { color: 'bg-emerald-400', label: 'Easy' },
            { color: 'bg-amber-400', label: 'Moderate' },
            { color: 'bg-red-400', label: 'Complex' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${color}`} />
              {label}
            </span>
          ))}
          <span className="flex items-center gap-1.5"><Clock size={11} /> Estimated processing</span>
        </div>
      </div>

      {/* Modal */}
      {selectedVisa && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#142845]/90 backdrop-blur-sm"
          onClick={() => setSelectedVisa(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-gradient-to-br from-[#0f2240] to-[#142845] rounded-3xl border border-[#E7CD87]/20 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedVisa(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 z-10"
            >
              <X size={20} />
            </button>

            {/* Modal content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">{selectedVisa.flag}</span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                    {selectedVisa.country}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-white/40" />
                      <span className="text-sm text-white/60">{selectedVisa.processing}</span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${DIFF_STYLE[selectedVisa.difficulty]?.text} ${DIFF_STYLE[selectedVisa.difficulty]?.bg}`}>
                      {selectedVisa.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visa types */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#E7CD87] uppercase tracking-wider mb-3">
                  Available Visa Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedVisa.visas || []).map((v, j) => (
                    <span key={j} className="text-sm px-4 py-2 rounded-full bg-[#142845] border border-white/15 text-white/70 font-medium">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[#E7CD87] uppercase tracking-wider mb-3">
                  Overview
                </h4>
                <p className="text-base text-white/70 leading-relaxed">
                  {selectedVisa.description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="#contact" 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E7CD87] to-[#c9a84c] text-[#142845] font-semibold text-sm hover:shadow-xl hover:shadow-[#E7CD87]/30 hover:scale-105 transition-all duration-300"
                  onClick={(e) => { handleNavClick('#contact', e); setSelectedVisa(null); }}
                >
                  Get Advice for {selectedVisa.country}
                  <ArrowRight size={16} />
                </a>
                <button
                  onClick={() => setSelectedVisa(null)}
                  className="px-6 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
