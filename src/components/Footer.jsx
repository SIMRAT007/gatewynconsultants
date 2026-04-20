import { useState } from 'react';
import { Globe, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { handleNavClick } from '../utils/smoothScroll';
import LegalModal from './LegalModal';

const ICONS = { Globe, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube };

export default function Footer() {
  const { content } = useContent('footer');
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (title, sections) => {
    setModalTitle(title);
    setModalContent(sections);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalContent(null);
      setModalTitle('');
    }, 300);
  };

  return (
    <footer style={{ background: '#07111f' }} className="relative">
      {/* Top gold line */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-4">
            {content?.logo && (
              <div className="flex items-center gap-2.5 mb-4">
                {content.logo.image ? (
                  <img 
                    src={content.logo.image} 
                    alt={`${content.logo.text} ${content.logo.highlight || ''}`}
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E7CD87] to-[#c9a84c] flex items-center justify-center">
                    <Globe size={17} className="text-[#142845]" />
                  </div>
                )}
                <span className="font-display text-xl font-semibold text-white">
                  {content.logo.text}<span className="text-[#E7CD87]">{content.logo.highlight ? ` ${content.logo.highlight}` : ''}</span>
                </span>
              </div>
            )}
            {content?.tagline && (
              <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">{content.tagline}</p>
            )}
            {content?.social?.links && content.social.links.length > 0 && (
              <div className="flex gap-2.5">
                {content.social.links.map((s) => {
                  const Icon = ICONS[s.icon] || Globe;
                  return (
                    <a 
                      key={s.platform} 
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/8 flex items-center justify-center text-white/25 hover:border-[#E7CD87]/40 hover:text-[#E7CD87] transition-all cursor-pointer"
                    >
                      <Icon size={14} className="sm:hidden" />
                      <Icon size={16} className="hidden sm:block" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          {content?.navigation && content.navigation.links && content.navigation.links.length > 0 && (
            <div className="md:col-span-2">
              {content.navigation.title && (
                <h4 className="text-[#E7CD87] text-[11px] font-medium tracking-widest uppercase mb-5">
                  {content.navigation.title}
                </h4>
              )}
              <ul className="space-y-3">
                {content.navigation.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleNavClick(link.href, e)}
                      className="text-sm text-white/35 hover:text-white/75 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Destinations */}
          {content?.destinations && content.destinations.countries && content.destinations.countries.length > 0 && (
            <div className="md:col-span-3">
              {content.destinations.title && (
                <h4 className="text-[#E7CD87] text-[11px] font-medium tracking-widest uppercase mb-5">
                  {content.destinations.title}
                </h4>
              )}
              <ul className="space-y-3">
                {content.destinations.countries.map((country) => (
                  <li key={country.name}>
                    <a 
                      href={country.href} 
                      onClick={(e) => handleNavClick(country.href, e)}
                      className="text-sm text-white/35 hover:text-white/75 transition-colors"
                    >
                      {country.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact quick */}
          {content?.contact && (
            <div className="md:col-span-3">
              {content.contact.title && (
                <h4 className="text-[#E7CD87] text-[11px] font-medium tracking-widest uppercase mb-5">
                  {content.contact.title}
                </h4>
              )}
              {content.contact.items && content.contact.items.length > 0 && (
                <div className="space-y-3">
                  {content.contact.items.map((item, index) => {
                    const Icon = ICONS[item.icon] || Mail;
                    return (
                      <div key={index} className="flex items-start gap-2.5">
                        <Icon size={14} className="text-[#E7CD87]/60 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/35 leading-relaxed">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="gold-divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {content?.copyright && (
            <p className="text-[11px] text-white/25">{content.copyright}</p>
          )}
          {content?.legalLinks && content.legalLinks.length > 0 && (
            <div className="flex gap-5">
              {content.legalLinks.map((link) => (
                <button 
                  key={link.label}
                  onClick={() => openModal(link.label, link.sections)}
                  className="text-[11px] text-white/25 hover:text-white/55 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legal Modal */}
      <LegalModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
      />
    </footer>
  );
}
