import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { handleNavClick } from '../utils/smoothScroll';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Visa Guide', href: '#visa-types' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isOverWhite, setIsOverWhite] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 50);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Check if navbar is over white section (more accurate)
      const whiteSections = ['about', 'stats', 'services', 'process', 'faq', 'contact'];
      let overWhite = false;
      for (const id of whiteSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Navbar is 64px tall, check if center of navbar is within white section
          const navbarCenter = 32;
          if (rect.top <= navbarCenter && rect.bottom >= navbarCenter) {
            overWhite = true;
            break;
          }
        }
      }
      setIsOverWhite(overWhite);

      // Active section detection
      const sections = ['home', 'about', 'stats', 'services', 'visa-types', 'process', 'faq', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'nav-blur bg-[#0c1c30]/92 border-b border-[#E7CD87]/8 py-2.5 sm:py-3'
            : 'bg-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between w-full overflow-hidden">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
            <div className="flex-shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Gatewyn Consultants" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg"
              />
            </div>
            <span className={`font-display text-lg sm:text-xl font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 ${
              isOverWhite ? 'text-[#142845]' : 'text-white'
            }`}>
              Gatewyn<span className="text-[#E7CD87]"> Consultants</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isActive 
                      ? 'text-[#E7CD87]' 
                      : isOverWhite 
                        ? 'text-[#142845]/70 hover:text-[#142845]' 
                        : 'text-white/65 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E7CD87] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="btn-gold px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap">
              Free Consultation
            </a>
          </div>

          {/* Hamburger */}
          <button className={`lg:hidden p-1 transition-colors duration-300 flex-shrink-0 ${
            isOverWhite ? 'text-[#142845]/80 hover:text-[#142845]' : 'text-white/80 hover:text-white'
          }`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} className="sm:w-[22px] sm:h-[22px]" /> : <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-0 z-40 bg-[#0a1628]/98 backdrop-blur-xl transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'h-screen pt-16 sm:pt-20' : 'h-0'
        }`}
      >
        <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6 items-center text-center w-full overflow-hidden">
          {NAV_LINKS.map((link, i) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { handleNavClick(link.href, e); setMobileOpen(false); }}
                className={`font-display text-xl sm:text-2xl transition-colors relative break-words ${
                  isActive ? 'text-[#E7CD87]' : 'text-white/75 hover:text-[#E7CD87]'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E7CD87]" />}
              </a>
            );
          })}
          <div className="gold-divider my-1 sm:my-2 w-full max-w-xs" />
          <a 
            href="#contact" 
            onClick={(e) => { handleNavClick('#contact', e); setMobileOpen(false); }} 
            className="btn-gold py-3.5 sm:py-4 px-8 rounded-full font-semibold text-center text-sm w-full max-w-xs whitespace-nowrap"
          >
            Free Consultation
          </a>
        </div>
      </div>
    </>
  );
}
