import { useContent } from '../hooks/useContent';
import { useCountUp, useReveal } from '../hooks/useReveal';

function StatItem({ stat, delay }) {
  const countRef = useCountUp(stat.value);
  const ref = useReveal('reveal', 0.4, delay);

  return (
    <div ref={ref} className="reveal text-center group relative px-6 py-2">
      {/* Vertical separator (not on last) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[#142845]/15 to-transparent hidden sm:block" />

      <div
        ref={countRef}
        className="font-display text-4xl md:text-5xl font-semibold text-[#142845] mb-1 counter-value"
      >
        {stat.value}
      </div>
      <div className="text-sm text-gray-500 font-medium tracking-wide">{stat.label}</div>

      {/* Gold underline on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#E7CD87] to-[#c9a84c] rounded-full group-hover:w-10 transition-all duration-400" />
    </div>
  );
}

export default function StatsBar() {
  const { content } = useContent('hero');
  const titleRef = useReveal('reveal-scale', 0.3);

  return (
    <section id="stats" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#142845 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <div ref={titleRef} className="reveal-scale text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest border border-gray-200 rounded-full px-4 py-2">
            <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block" />
            Trusted by thousands worldwide
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(content?.stats || [
            { value: '15,000+', label: 'Visas Approved' },
            { value: '98%', label: 'Success Rate' },
            { value: '50+', label: 'Countries' },
            { value: '18+', label: 'Years Experience' },
          ]).map((stat, i) => (
            <StatItem key={i} stat={stat} delay={i * 120} />
          ))}
        </div>

        {/* Brand strip / marquee */}
        <div className="mt-14 pt-10 border-t border-gray-100 overflow-hidden">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-6">Certified & Recognized By</p>
          <div className="flex overflow-hidden">
            <div className="marquee gap-16">
              {['ICCRC', 'AIRC', 'MARA', 'OISC', 'RCIC', 'IMMIGRATION BAR', 'ISO 9001', 'ICCRC', 'AIRC', 'MARA', 'OISC', 'RCIC', 'IMMIGRATION BAR', 'ISO 9001'].map((b, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-gray-300 whitespace-nowrap mx-8 tracking-widest uppercase"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
