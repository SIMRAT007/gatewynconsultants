import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useReveal, useWordReveal } from '../hooks/useReveal';
import { handleNavClick } from '../utils/smoothScroll';

function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <div
      className={`border-b transition-colors duration-300 ${isOpen ? 'border-[#142845]/15' : 'border-gray-100'}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        className="w-full py-6 flex items-start justify-between gap-4 text-left group"
        onClick={onToggle}
      >
        <span className={`font-medium text-[0.95rem] leading-relaxed transition-colors ${isOpen ? 'text-[#142845]' : 'text-gray-600 group-hover:text-[#142845]'}`}>
          {item.question}
        </span>
        <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border transition-all mt-0.5 ${
          isOpen
            ? 'border-[#142845] bg-[#142845] text-[#E7CD87]'
            : 'border-gray-200 text-gray-400 group-hover:border-[#142845]/30'
        }`}>
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-64 pb-6' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed pr-12">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { content } = useContent('faq');
  const { content: contactContent } = useContent('contact');
  const [openIndex, setOpenIndex] = useState(0);
  const [headRef, headWords] = useWordReveal(content?.heading || 'Frequently Asked Questions');
  const subRef = useReveal('reveal', 0.2, 200);

  return (
    <section id="faq" className="pt-20 bg-white relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#142845]/3 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#142845 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Always at top */}
        <div className="text-center lg:text-left mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-xs text-[#142845]/40 uppercase tracking-widest border border-[#142845]/10 rounded-full px-4 py-2 mb-5">
            <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block" />
            Got Questions?
          </span>
          <h2
            ref={headRef}
            className="word-reveal font-display text-4xl md:text-5xl font-light text-[#142845] mb-5 leading-tight block"
          >
            {headWords}
          </h2>
          <p ref={subRef} className="reveal text-gray-400 text-sm leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            {content?.subheading}
          </p>
          <div className="navy-divider w-20 mx-auto lg:mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Left - Help Box (desktop only position) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Help box */}
            {contactContent?.helpBox && (
              <div className="rounded-2xl bg-gradient-to-br from-[#142845] to-[#1e3a63] p-6">
                {contactContent.helpBox.emoji && (
                  <div className="text-[#E7CD87] text-2xl mb-3">{contactContent.helpBox.emoji}</div>
                )}
                {contactContent.helpBox.title && (
                  <h4 className="font-semibold text-white text-sm mb-2">{contactContent.helpBox.title}</h4>
                )}
                {contactContent.helpBox.description && (
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    {contactContent.helpBox.description}
                  </p>
                )}
                {contactContent.helpBox.buttonText && (
                  <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="btn-gold text-xs px-5 py-2.5 rounded-full">
                    {contactContent.helpBox.buttonText}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right - FAQ Accordion */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {(content?.items || []).map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
