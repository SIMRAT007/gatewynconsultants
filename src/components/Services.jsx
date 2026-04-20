import { Star, Briefcase, GraduationCap, Plane, Users, TrendingUp, ArrowUpRight, Home, Building, Shield } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useReveal, useWordReveal } from '../hooks/useReveal';
import { handleNavClick } from '../utils/smoothScroll';

const ICONS = { Plane, Home, GraduationCap, Building, Shield, Star };

const TAG_COLORS = {
  'Most Popular': 'bg-[#142845] text-white',
  'Growing Demand': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'High Success Rate': 'bg-amber-50 text-amber-700 border border-amber-200',
};

function ServiceCard({ service, index }) {
  const Icon = ICONS[service.icon] || Star;
  const ref = useReveal('reveal', 0.12, index * 80);

  return (
    <a
      href="#contact"
      onClick={(e) => handleNavClick('#contact', e)}
      ref={ref}
      className="reveal card-glow-light group relative rounded-3xl border border-gray-100 bg-white p-7 cursor-pointer overflow-hidden block"
    >
      {/* Tag */}
      {service.tag && (
        <span className={`absolute top-4 right-4 text-[10px] px-2.5 py-1 rounded-full font-semibold ${TAG_COLORS[service.tag] || 'bg-gray-100 text-gray-600'}`}>
          {service.tag}
        </span>
      )}

      {/* Icon with gold hover fill */}
      <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#142845] group-hover:border-[#142845] transition-all duration-400">
        <Icon size={22} className="text-[#142845] group-hover:text-[#E7CD87] transition-colors duration-400" />
      </div>

      <h3 className="font-display text-xl font-semibold text-[#142845] mb-3">{service.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">{service.description}</p>

      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#142845] group-hover:gap-3 transition-all">
        Learn More <ArrowUpRight size={13} className="text-[#E7CD87]" />
      </div>

      {/* Bottom border reveal */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#142845] to-[#E7CD87] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl" />

      {/* Subtle bg on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#142845]/0 to-[#142845]/0 group-hover:from-[#f8f9ff] group-hover:to-white transition-all duration-500 rounded-3xl -z-10" />
    </a>
  );
}

export default function Services() {
  const { content } = useContent('services');
  const [headRef, headWords] = useWordReveal(content?.heading || 'Our Immigration Services');
  const subRef = useReveal('reveal', 0.2, 150);

  return (
    <section id="services" className="py-0 bg-white relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#142845]/3 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#E7CD87]/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs text-[#142845]/50 uppercase tracking-widest border border-[#142845]/10 rounded-full px-4 py-2 mb-5">
            <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block" />
            What We Offer
          </span>
          <h2
            ref={headRef}
            className="word-reveal font-display text-4xl md:text-5xl font-light text-[#142845] mb-4 block"
          >
            {headWords}
          </h2>
          <p ref={subRef} className="reveal text-gray-500 text-base max-w-xl mx-auto">{content?.subheading}</p>
          <div className="navy-divider w-20 mx-auto mt-8" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content?.items || []).map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-14 text-center reveal" style={{ transitionDelay: '0.5s' }}>
          <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="btn-navy px-8 py-4 rounded-full text-sm gap-2">
            Book a Free Consultation
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
