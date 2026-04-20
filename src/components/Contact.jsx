import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useReveal, useWordReveal } from '../hooks/useReveal';
import BookingModal from './BookingModal';

export default function Contact() {
  const { content } = useContent('contact');
  const [form, setForm] = useState({ name: '', email: '', country: '', visa: '', message: '' });
  const [sent, setSent] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [headRef, headWords] = useWordReveal(content?.heading || 'Begin Your Journey Today');
  const subRef = useReveal('reveal', 0.2, 150);
  const formRef = useReveal('reveal-right', 0.15, 100);
  const infoRef = useReveal('reveal-left', 0.15);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', country: '', visa: '', message: '' }); }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #142845 0%, #1e3a63 25%, #f8fafc 60%, #ffffff 100%)' }}
    >
      {/* Header */}
      <div className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs text-[#E7CD87]/55 uppercase tracking-widest border border-[#E7CD87]/15 rounded-full px-4 py-2 mb-5">
            <span className="w-1 h-1 rounded-full bg-[#E7CD87] inline-block animate-pulse" />
            Free Consultation
          </span>
          <h2
            ref={headRef}
            className="word-reveal font-display text-4xl md:text-5xl font-light text-white mb-4 block"
          >
            {headWords}
          </h2>
          <p ref={subRef} className="reveal text-white/50 text-base">{content?.subheading}</p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-28 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Info */}
            <div ref={infoRef} className="reveal-left lg:col-span-2 space-y-4">
              {/* Book Consultation - Special highlight */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="flex gap-4 items-start p-4 rounded-2xl border-2 border-[#E7CD87]/50 bg-gradient-to-br from-[#E7CD87]/5 to-white hover:border-[#E7CD87] hover:shadow-lg transition-all group w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E7CD87] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar size={18} className="text-[#142845]" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-0.5">Free Consultation 1:1</p>
                  <p className="text-sm text-[#142845] font-semibold">Book 15min Google Meet</p>
                  <p className="text-xs text-gray-500 mt-1">Schedule your free session</p>
                </div>
              </button>

              {[
                { icon: Mail, label: 'Email Us', value: content?.email, color: 'text-[#142845]', link: `mailto:${content?.email}` },
                { icon: Phone, label: 'Call Us', value: content?.phone, color: 'text-[#142845]', link: `tel:${content?.phone}` },
                { icon: MapPin, label: 'Our Office', value: content?.address, color: 'text-[#142845]' },
              ].map(({ icon: Icon, label, value, link }, i) => {
                const Wrapper = link ? 'a' : 'div';
                const wrapperProps = link ? { href: link, target: link.startsWith('mailto') ? undefined : '_blank', rel: 'noopener noreferrer' } : {};
                
                return (
                  <Wrapper
                    key={i}
                    {...wrapperProps}
                    className="flex gap-4 items-start p-4 rounded-2xl border border-gray-100 bg-white hover:border-[#142845]/15 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#142845]/5 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#142845]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-sm text-[#142845] font-medium">{value}</p>
                    </div>
                  </Wrapper>
                );
              })}

              {/* Award card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#142845] to-[#1e3a63] border border-[#142845]/20">
                <div className="text-[#E7CD87] font-semibold text-sm mb-1.5">� Expert Study Abroad Consultants</div>
                <p className="text-white/55 text-xs leading-relaxed">
                  Specializing in UK, Canada, Australia & Europe. 95% visa success rate with personalized guidance from application to arrival.
                </p>
              </div>
            </div>

            {/* Form */}
            <div ref={formRef} className="reveal-right lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] text-gray-400 uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input-light w-full rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 uppercase tracking-wide mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input-light w-full rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] text-gray-400 uppercase tracking-wide mb-1.5">Destination Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="form-input-light w-full rounded-xl px-4 py-3 text-sm"
                    >
                      <option value="">Select country…</option>
                      {['Canada', 'United States', 'Australia', 'United Kingdom', 'Germany', 'New Zealand', 'Singapore', 'UAE', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 uppercase tracking-wide mb-1.5">Visa Type</label>
                    <select
                      value={form.visa}
                      onChange={(e) => setForm({ ...form, visa: e.target.value })}
                      className="form-input-light w-full rounded-xl px-4 py-3 text-sm"
                    >
                      <option value="">Select visa type…</option>
                      {['Skilled Worker', 'Student Visa', 'Family Reunification', 'Business/Investor', 'Asylum/Refugee', 'Permanent Residency', 'Citizenship'].map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 uppercase tracking-wide mb-1.5">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your immigration goals, current situation, and any specific questions…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-input-light w-full rounded-xl px-4 py-3 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-gold w-full py-4 rounded-xl font-semibold text-sm gap-2 ${sent ? 'opacity-80' : ''}`}
                >
                  {sent
                    ? '✓ Message Sent — We\'ll be in touch within 24 hours!'
                    : <><Send size={14} /> Send Free Consultation Request</>
                  }
                </button>

                <p className="text-center text-xs text-gray-400">
                  No obligation · 100% confidential · Response within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        consultantEmail={content?.consultantEmail || content?.email}
      />
    </section>
  );
}
