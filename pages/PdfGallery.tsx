
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, Scissors, ImageIcon, FileText, RotateCw, 
  Search, Archive, Stamp, ShieldAlert, FileDown, 
  Layers, Trash2, Hash, Crop, Wrench, Eraser, FileSignature
} from 'lucide-react';

const PdfGallery: React.FC = () => {
  const toolGroups = [
    {
      title: "Combine & Split",
      tools: [
        { id: 'merge', name: 'Merge PDF', icon: Combine, path: '/pdf/merge', color: 'bg-blue-50 text-blue-600', desc: 'Combine multiple PDFs into one.' },
        { id: 'split', name: 'Split PDF', icon: Scissors, path: '/pdf/split', color: 'bg-orange-50 text-orange-600', desc: 'Extract pages or split into files.' },
        { id: 'remove', name: 'Remove Pages', icon: Trash2, path: '/pdf/remove', color: 'bg-red-50 text-red-600', desc: 'Delete unwanted pages from PDF.' }
      ]
    },
    {
      title: "Convert to PDF",
      tools: [
        { id: 'convert', name: 'JPG to PDF', icon: ImageIcon, path: '/pdf/convert', color: 'bg-emerald-50 text-emerald-600', desc: 'Convert images to high-quality PDF.' },
        { id: 'word2pdf', name: 'Word to PDF', icon: FileText, path: '/pdf/word2pdf', color: 'bg-blue-50 text-blue-500', desc: 'DOCX/DOC files to PDF format.' }
      ]
    },
    {
      title: "Convert from PDF",
      tools: [
        { id: 'pdf2jpg', name: 'PDF to JPG', icon: ImageIcon, path: '/pdf/pdf2jpg', color: 'bg-amber-50 text-amber-600', desc: 'Extract images from your PDF.' },
        { id: 'pdf2word', name: 'PDF to Word', icon: FileText, path: '/pdf/pdf2word', color: 'bg-sky-50 text-sky-500', desc: 'Make PDFs editable in Word.' }
      ]
    },
    {
      title: "Optimize & Edit",
      tools: [
        { id: 'ocr', name: 'OCR PDF', icon: Search, path: '/pdf/ocr', color: 'bg-indigo-50 text-indigo-600', desc: 'Make scanned PDFs searchable/editable.' },
        { id: 'compress', name: 'Compress PDF', icon: FileDown, path: '/pdf/compress', color: 'bg-slate-50 text-slate-600', desc: 'Reduce file size while keeping quality.' },
        { id: 'rotate', name: 'Rotate PDF', icon: RotateCw, path: '/pdf/rotate', color: 'bg-sky-50 text-sky-600', desc: 'Rotate pages to correct orientation.' },
        { id: 'watermark', name: 'Watermark', icon: Stamp, path: '/pdf/watermark', color: 'bg-indigo-50 text-indigo-600', desc: 'Add text or image stamps.' },
        { id: 'page-numbers', name: 'Page Numbers', icon: Hash, path: '/pdf/page-numbers', color: 'bg-pink-50 text-pink-500', desc: 'Insert formatted page numbers.' }
      ]
    },
    {
      title: "Security & Archive",
      tools: [
        { id: 'protect', name: 'Protect PDF', icon: ShieldAlert, path: '/pdf/protect', color: 'bg-rose-50 text-rose-600', desc: 'Encrypt with password security.' },
        { id: 'pdfa', name: 'PDF to PDF/A', icon: Archive, path: '/pdf/pdfa', color: 'bg-slate-100 text-slate-700', desc: 'Archive for long-term standards.' },
        { id: 'sign', name: 'Sign PDF', icon: FileSignature, path: '/pdf/sign', color: 'bg-teal-50 text-teal-600', desc: 'Add digital signatures easily.' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Every tool you need to work with <span className="text-indigo-600">PDFs</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          All tools are 100% free and easy to use. No registration required, and everything stays private in your browser.
        </p>
      </div>

      <div className="space-y-16">
        {toolGroups.map((group, i) => (
          <div key={i}>
            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-600 rounded-full" />
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center mb-5 transition-all group-hover:scale-110`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfGallery;
