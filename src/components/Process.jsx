import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useReveal, useWordReveal } from '../hooks/useReveal';
import { handleNavClick } from '../utils/smoothScroll';

function StepCard({ step, index, total, isActive, onClick }) {
  const ref = useReveal('reveal', 0.15, index * 100);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`reveal relative flex flex-col items-center text-center cursor-pointer group`}
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="absolute top-9 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-0.5 z-0 hidden md:block">
          <div
            className="h-full bg-gradient-to-r from-[#142845]/30 to-[#142845]/10 transition-all duration-700"
            style={{ width: isActive ? '100%' : '100%' }}
          />
        </div>
      )}

      {/* Number circle */}
      <div
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-lg font-display font-semibold transition-all duration-400 mb-5
          ${isActive
            ? 'bg-[#142845] text-[#E7CD87] shadow-lg shadow-[#142845]/20 scale-110'
            : 'bg-gray-50 text-[#142845]/40 border-2 border-gray-100 group-hover:border-[#142845]/30 group-hover:text-[#142845]/70'
          }`}
      >
        {isActive ? <CheckCircle2 size={26} /> : step.number}
      </div>

      <h3 className={`font-semibold text-sm mb-2 transition-colors ${isActive ? 'text-[#142845]' : 'text-gray-400 group-hover:text-[#142845]/70'}`}>
        {step.title}
      </h3>
      <p className={`text-xs leading-relaxed max-w-[140px] transition-colors ${isActive ? 'text-gray-600' : 'text-gray-300'}`}>
        {step.description}
      </p>
    </div>
  );
}

export default function Process() {
  const { content } = useContent('process');
  const [activeStep, setActiveStep] = useState(0);
  const [headRef, headWords] = useWordReveal(content?.heading || 'Your Immigration Journey');
  const subRef = useReveal('reveal', 0.2, 200);
  const detailRef = useReveal('reveal-scale', 0.2, 100);

  const activeStepData = content?.steps?.[activeStep];

  return (
    <section id="process" className="py-28 bg-white relative overflow-hidden">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#142845 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
      />
      <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-[#E7CD87]/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-xs text-[#142845]/40 uppercase tracking-widest border border-[#142845]/10 rounded-full px-4 py-2 mb-5">
            <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block" />
            How It Works
          </span>
          <h2
            ref={headRef}
            className="word-reveal font-display text-4xl md:text-5xl font-light text-[#142845] mb-4 block"
          >
            {headWords}
          </h2>
          <p ref={subRef} className="reveal text-gray-400 text-base max-w-lg mx-auto">{content?.subheading}</p>
          <div className="navy-divider w-20 mx-auto mt-8" />
        </div>

        {/* Horizontal steps */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {(content?.steps || []).map((step, i) => (
            <div
              key={i}
              className={`${
                i === content.steps.length - 1 && content.steps.length % 2 !== 0
                  ? 'col-span-2 md:col-span-1 flex justify-center'
                  : ''
              }`}
            >
              <StepCard
                step={step}
                index={i}
                total={content.steps.length}
                isActive={activeStep === i}
                onClick={() => setActiveStep(i)}
              />
            </div>
          ))}
        </div>

        {/* Active step detail card */}
        {activeStepData && (
          <div
            ref={detailRef}
            className="reveal-scale max-w-2xl mx-auto rounded-3xl border border-[#142845]/8 bg-gradient-to-br from-[#f8faff] to-white p-8 text-center shadow-sm"
          >
            <div className="inline-flex items-center gap-2 bg-[#142845] text-[#E7CD87] text-xs font-semibold rounded-full px-4 py-1.5 mb-4">
              Step {activeStepData.number}
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#142845] mb-3">{activeStepData.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{activeStepData.description}</p>
            <div className="flex justify-center gap-4">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="btn-outline-navy text-sm px-5 py-2.5 rounded-full"
                >
                  ← Previous
                </button>
              )}
              {activeStep < (content?.steps?.length - 1) && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="btn-navy text-sm px-5 py-2.5 rounded-full"
                >
                  Next Step →
                </button>
              )}
              {activeStep === (content?.steps?.length - 1) && (
                <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="btn-gold text-sm px-6 py-2.5 rounded-full">
                  Start Now →
                </a>
              )}
            </div>
          </div>
        )}

        {/* Trust badges row */}
        <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '🔐', title: 'Secure & Confidential', desc: 'All documents handled with strict privacy protocols and secure encrypted systems.' },
            { icon: '🏆', title: 'RCIC Certified', desc: 'Our consultants are certified members of the Regulated Canadian Immigration Consultants.' },
            { icon: '✅', title: 'Money-Back Guarantee', desc: 'If we don\'t file your application within agreed timelines, we offer a full refund.' },
          ].map((b, i) => {
            const bRef = useReveal('reveal', 0.2, i * 120);
            return (
              <div ref={bRef} key={i} className="reveal flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#142845]/5 flex items-center justify-center text-xl flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-[#142845] text-sm mb-1">{b.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
