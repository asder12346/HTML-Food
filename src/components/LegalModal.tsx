import { X } from 'lucide-react';
import { LEGAL_DOCUMENTS } from '../data/catalog';

interface LegalModalProps {
  activeKey: string | null;
  onClose: () => void;
}

export function LegalModal({ activeKey, onClose }: LegalModalProps) {
  if (!activeKey || !LEGAL_DOCUMENTS[activeKey]) return null;

  const doc = LEGAL_DOCUMENTS[activeKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
    >
      <div className="w-full max-w-lg rounded-xl bg-white border border-stone-200 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-zinc-900">{doc.title}</h3>
            <p className="text-xs text-stone-500 mt-0.5">{doc.updated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal policy modal"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-zinc-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 text-sm text-stone-600 leading-relaxed max-h-[65vh] overflow-y-auto">
          {doc.paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 min-h-[40px] text-xs font-semibold text-white bg-zinc-900 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
