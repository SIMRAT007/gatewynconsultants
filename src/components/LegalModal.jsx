import { X } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#142845]/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 sm:px-8 py-5 flex items-center justify-between z-10">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#142845]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 pb-24 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="prose prose-sm sm:prose max-w-none">
            {content && content.map((section, index) => {
              if (section.type === 'date') {
                return <p key={index} className="mb-4 text-gray-500 text-sm">{section.text}</p>;
              } else if (section.type === 'heading') {
                return <h3 key={index} className="text-xl font-semibold mb-3 text-[#142845]">{section.text}</h3>;
              } else if (section.type === 'paragraph') {
                return <p key={index} className="mb-4 text-gray-600 leading-relaxed">{section.text}</p>;
              }
              return null;
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent px-6 sm:px-8 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="btn-gold px-6 py-2.5 rounded-full text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
