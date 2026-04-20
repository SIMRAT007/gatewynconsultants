import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useReveal, useWordReveal } from '../hooks/useReveal';
import { useContent } from '../hooks/useContent';

export default function VideoSection() {
  const { content } = useContent('videoSection');
  const [videoOpen, setVideoOpen] = useState(false);
  const [headRef, headWords] = useWordReveal(content?.heading || 'See Our Immigration Process In Action');
  const subRef = useReveal('reveal', 0.2, 150);
  const videoRef = useReveal('reveal-scale', 0.2, 100);
  
  if (!content) return null;

  return (
    <>
      <section
        className="relative py-8 sm:py-16 lg:pt-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0c1c30 0%, #142845 100%)' }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(231,205,135,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(231,205,135,1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E7CD87]/4 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

            {/* Left: text */}
            <div>
              {content.badge && (
                <span className="inline-flex items-center gap-2 text-xs text-[#E7CD87]/60 uppercase tracking-widest border border-[#E7CD87]/15 rounded-full px-4 py-2 mb-3">
                  <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block animate-pulse" />
                  {content.badge}
                </span>
              )}

              <h2
                ref={headRef}
                className="word-reveal font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3 leading-[1.1]"
              >
                {headWords}
              </h2>

              {content.description && content.description.length > 0 && (
                <p ref={subRef} className="reveal text-white/50 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
                  {content.description.map((para, i) => (
                    <span key={i} className="block">
                      {para}
                    </span>
                  ))}
                </p>
              )}

              {/* Highlights grid */}
              {content.highlights && content.highlights.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {content.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="font-display text-xl sm:text-2xl font-bold text-[#E7CD87]">{h.number}</div>
                    <div className="text-xs sm:text-sm text-white/80 mt-1">{h.label}</div>
                  </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: video thumbnail */}
            <div ref={videoRef} className="reveal-scale relative">
              {/* Thumbnail */}
              <div
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => setVideoOpen(true)}
              >
                {content.thumbnailImage && (
                  <img
                    src={content.thumbnailImage}
                    alt="Immigration consultation video"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#142845]/60 to-[#0c1c30]/70 group-hover:opacity-80 transition-opacity" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="video-play-btn group-hover:scale-110 transition-transform">
                    <Play size={26} fill="#142845" className="text-[#142845] ml-1" />
                  </div>
                </div>

                {/* Bottom caption */}
                {content.videoCaption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    {content.videoCaption.badge && (
                      <div className="text-[#E7CD87] text-[10px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1">
                        {content.videoCaption.badge}
                      </div>
                    )}
                    {content.videoCaption.title && (
                      <div className="text-white font-medium text-xs sm:text-sm">
                        {content.videoCaption.title}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Side decoration */}
              <div className="absolute -right-4 -top-4 w-20 h-20 rounded-2xl border border-[#E7CD87]/20 bg-[#E7CD87]/5 -z-10" />
              <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-2xl border border-[#E7CD87]/15 bg-[#E7CD87]/3 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Second video section — image grid with overlay video */}
      {content.galleryImages && content.galleryImages.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {content.galleryImages.map(({ img, label }, i) => {
              const imgRef = useReveal('reveal-scale', 0.15, i * 100);
              return (
                <div
                  key={i}
                  ref={imgRef}
                  className="reveal-scale relative rounded-2xl overflow-hidden group cursor-pointer aspect-square"
                >
                  <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142845]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <span className="text-xs text-[#E7CD87] font-medium">{label}</span>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {videoOpen && (
        <div className="lightbox-backdrop" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {content.videoUrl && (
                <iframe
                  src={`${content.videoUrl}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  title="Immigration Journey"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
