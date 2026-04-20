import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReveal, useWordReveal } from '../hooks/useReveal';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer → Canada PR',
    flag: '🇨🇦',
    text: 'GlobalVisa made my Express Entry journey completely stress-free. From document preparation to the final PR approval, every step was handled with expertise and transparency. I received my PR in just 7 months.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    name: 'Mohammed Al-Rashid',
    role: 'Business Owner → UK Investor Visa',
    flag: '🇬🇧',
    text: 'The team\'s knowledge of the UK Tier 1 Investor visa was exceptional. They structured my application perfectly and kept me informed at every stage. I\'d recommend them to anyone serious about immigration.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
  },
  {
    name: 'Li Wei',
    role: 'Research Scientist → Australia SR',
    flag: '🇦🇺',
    text: 'After being rejected by another agency, GlobalVisa identified the exact issues and rebuilt my application from scratch. I got my Skilled Independent visa approved on the first try with their help.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
  },
  {
    name: 'Ananya Patel',
    role: 'Medical Professional → Germany Blue Card',
    flag: '🇩🇪',
    text: 'I was overwhelmed by German immigration complexity, but the team broke it down into clear action items. My EU Blue Card came through faster than expected. Outstanding service throughout.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
  },
  {
    name: 'Carlos Rivera',
    role: 'Student → USA F-1 Visa',
    flag: '🇺🇸',
    text: 'As a first-generation university student going abroad, I had no idea where to start. GlobalVisa guided me from choosing universities to getting my F-1 visa. They were patient, professional, and genuinely cared.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [headRef, headWords] = useWordReveal('What Our Clients Say');

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
      setAnimating(false);
    }, 300);
  };

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [animating]);

  const t = TESTIMONIALS[current];

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #142845 0%, #0c1c30 100%)' }}
    >
      {/* Quote mark decoration */}
      <div className="absolute top-12 left-12 opacity-5 pointer-events-none">
        <Quote size={200} className="text-[#E7CD87]" />
      </div>
      <div className="absolute bottom-8 right-12 opacity-[0.03] pointer-events-none rotate-180">
        <Quote size={160} className="text-[#E7CD87]" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs text-[#E7CD87]/55 uppercase tracking-widest border border-[#E7CD87]/15 rounded-full px-4 py-2 mb-5">
            <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block animate-pulse" />
            Success Stories
          </span>
          <h2 ref={headRef} className="word-reveal font-display text-4xl md:text-5xl font-light text-white block">
            {headWords}
          </h2>
          <div className="gold-divider w-20 mx-auto mt-8" />
        </div>

        {/* Testimonial card */}
        <div
          className={`relative max-w-3xl mx-auto text-center transition-all duration-300 ${
            animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array(t.rating).fill(0).map((_, i) => (
              <Star key={i} size={16} fill="#E7CD87" className="text-[#E7CD87]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-display text-xl md:text-2xl text-white/85 italic leading-relaxed mb-8 font-light">
            "{t.text}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E7CD87]/30"
            />
            <div className="text-left">
              <div className="font-semibold text-white text-sm">{t.name} {t.flag}</div>
              <div className="text-xs text-[#E7CD87]/60 mt-0.5">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#E7CD87]/50 hover:text-[#E7CD87] transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-2 h-2 sm:w-6 sm:h-2 bg-[#E7CD87]'
                    : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#E7CD87]/50 hover:text-[#E7CD87] transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex justify-center gap-3 mt-8">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                i === current ? 'border-[#E7CD87] scale-110' : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
