import { Instagram } from 'lucide-react';
import { useReveal, useWordReveal } from '../hooks/useReveal';

// Instagram posts data - Update these with your actual Instagram post URLs and images
const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    link: 'https://www.instagram.com/p/YOUR_POST_ID_1/',
    caption: 'Study abroad success story 🎓'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    link: 'https://www.instagram.com/p/YOUR_POST_ID_2/',
    caption: 'University campus tour 🏛️'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80',
    link: 'https://www.instagram.com/p/YOUR_POST_ID_3/',
    caption: 'Visa approval celebration 🎉'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
    link: 'https://www.instagram.com/p/YOUR_POST_ID_4/',
    caption: 'Student testimonials ⭐'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    link: 'https://www.instagram.com/p/YOUR_POST_ID_5/',
    caption: 'Application tips & tricks 📝'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    link: 'https://www.instagram.com/p/YOUR_POST_ID_6/',
    caption: 'Global education insights 🌍'
  }
];

export default function InstagramFeed() {
  const [headRef, headWords] = useWordReveal('Follow Our Journey');
  const subRef = useReveal('reveal', 0.2, 150);
  const gridRef = useReveal('reveal-up', 0.15);

  return (
    <section id="instagram" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7CD87]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#142845]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-[#142845]/60 uppercase tracking-[0.2em] border border-[#142845]/15 rounded-full px-5 py-2.5 mb-6 font-medium backdrop-blur-sm bg-white/50">
            <Instagram size={15} className="text-[#E7CD87]" />
            Social Media
          </span>
          
          <h2
            ref={headRef}
            className="word-reveal font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#142845] mb-5 sm:mb-6 leading-tight"
          >
            {headWords}
          </h2>
          
          <p ref={subRef} className="reveal text-[#142845]/65 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Stay connected with us on Instagram for the latest updates, student success stories, and study abroad tips.
          </p>

          <a
            href="https://www.instagram.com/gatewyn_consultants/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E7CD87] via-[#d4b870] to-[#c9a84c] text-[#142845] font-semibold text-sm sm:text-base hover:shadow-2xl hover:shadow-[#E7CD87]/30 hover:scale-105 transition-all duration-300 group"
          >
            <Instagram size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            Follow @gatewyn_consultants
          </a>
        </div>

        {/* Instagram Grid */}
        <div ref={gridRef} className="reveal-up grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {INSTAGRAM_POSTS.map((post, index) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shadow-md hover:shadow-2xl hover:shadow-[#E7CD87]/20 hover:scale-[1.02] transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142845]/90 via-[#142845]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5 sm:p-6">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Instagram size={18} className="text-[#E7CD87]" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">View on Instagram</span>
                  </div>
                  <p className="text-sm sm:text-base line-clamp-2 font-light leading-relaxed">{post.caption}</p>
                </div>
              </div>

              {/* Instagram icon badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg group-hover:rotate-12">
                <Instagram size={18} className="text-[#142845]" />
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-[#E7CD87]/0 group-hover:border-[#E7CD87]/30 transition-all duration-500 pointer-events-none"></div>
            </a>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 sm:mt-14 lg:mt-16">
          <a
            href="https://www.instagram.com/gatewyn_consultants/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-semibold text-sm sm:text-base transition-all duration-300 group pb-1 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent hover:opacity-80"
          >
            View all posts on Instagram
            <span className="group-hover:translate-x-2 transition-transform duration-300 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
