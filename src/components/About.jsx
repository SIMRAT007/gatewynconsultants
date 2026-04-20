import { useReveal, useWordReveal } from '../hooks/useReveal';
import { Award, Users, Globe, Target, CheckCircle2, TrendingUp } from 'lucide-react';

export default function About() {
  const [headRef, headWords] = useWordReveal('About Gatewyn Consultants');
  const subRef = useReveal('reveal', 0.2, 150);
  const contentRef = useReveal('reveal-up', 0.15);
  const statsRef = useReveal('reveal-up', 0.2);

  const stats = [
    { icon: Users, value: '2,000+', label: 'Students Guided' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: TrendingUp, value: '10+', label: 'Years Experience' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower students with expert guidance and comprehensive support for their study abroad journey, making global education accessible to all.'
    },
    {
      icon: Award,
      title: 'Our Vision',
      description: 'To be the most trusted study abroad consultancy, recognized for our personalized approach and exceptional success rates in student placements.'
    },
    {
      icon: CheckCircle2,
      title: 'Our Values',
      description: 'Integrity, excellence, and student-first approach guide everything we do. We believe in transparent communication and honest guidance.'
    }
  ];

  return (
    <section id="about" className="relative py-20 sm:py-24 lg:pt-30 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#E7CD87]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#142845]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-[#142845]/60 uppercase tracking-[0.2em] border border-[#142845]/15 rounded-full px-5 py-2.5 mb-6 font-medium backdrop-blur-sm bg-white/50">
            <Award size={15} className="text-[#E7CD87]" />
            Who We Are
          </span>
          
          <h2
            ref={headRef}
            className="word-reveal font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#142845] mb-5 sm:mb-6 leading-tight"
          >
            {headWords}
          </h2>
          
          <p ref={subRef} className="reveal text-[#142845]/65 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Your trusted partner in making global education dreams come true. We specialize in university admissions, visa assistance, and complete study abroad support.
          </p>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="reveal-up grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-20 lg:mb-24">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                alt="Students studying abroad"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-xl">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#E7CD87] flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="sm:hidden text-[#142845]" />
                    <Award size={24} className="hidden sm:block text-[#142845]" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-display font-bold text-[#142845]">95%</div>
                    <div className="text-xs sm:text-sm text-[#142845]/60">Visa Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E7CD87]/20 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-[#142845] mb-6">
              Guiding Students to <span className="text-[#E7CD87] font-semibold italic">Global Success</span>
            </h3>
            
            <div className="space-y-4 text-[#142845]/70 text-base sm:text-lg leading-relaxed">
              <p>
                At Gatewyn Consultants, we understand that studying abroad is more than just getting a degree—it's about transforming your future. With over a decade of experience, we've helped thousands of students achieve their dreams of studying in top universities across the UK, Canada, Australia, and Europe.
              </p>
              <p>
                Our team of expert counselors provides personalized guidance at every step—from selecting the right university and course to visa processing and pre-departure preparation. We pride ourselves on our transparent approach and commitment to student success.
              </p>
              <p>
                What sets us apart is our comprehensive support system. We don't just help you get admitted; we ensure you're fully prepared for your journey abroad with SOP writing assistance, interview preparation, and ongoing support even after you reach your destination.
              </p>
            </div>

            {/* Key Points */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                'Expert Counseling',
                'University Partnerships',
                'Visa Assistance',
                'Post-Arrival Support'
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#E7CD87] flex-shrink-0" />
                  <span className="text-[#142845]/80 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        {/* <div ref={statsRef} className="reveal-up grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 lg:p-8 rounded-2xl bg-white border border-[#142845]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#E7CD87]/10 flex items-center justify-center">
                  <Icon size={28} className="text-[#E7CD87]" />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-bold text-[#142845] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-[#142845]/60 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-[#142845]/10 hover:border-[#E7CD87]/30 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 mb-5 rounded-full bg-[#E7CD87]/10 group-hover:bg-[#E7CD87]/20 flex items-center justify-center transition-colors duration-300">
                  <Icon size={24} className="text-[#E7CD87]" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-semibold text-[#142845] mb-3">
                  {item.title}
                </h4>
                <p className="text-[#142845]/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
