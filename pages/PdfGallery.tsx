
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, Scissors, ImageIcon, FileText, RotateCw, 
  Search, Archive, Stamp, ShieldAlert, FileDown, 
  Trash2, Hash, FileSignature, Presentation, Sparkles, ArrowLeft
} from 'lucide-react';

const PdfGallery: React.FC = () => {
  const toolGroups = [
    {
      title: "Content & Structure",
      tools: [
        { id: 'merge', name: 'Merge PDF', icon: Combine, path: '/pdf/merge', color: 'bg-blue-50 text-blue-600', desc: 'Combine multiple files seamlessly.' },
        { id: 'split', name: 'Split PDF', icon: Scissors, path: '/pdf/split', color: 'bg-orange-50 text-orange-600', desc: 'Separate or extract specific pages.' },
        { id: 'remove', name: 'Remove Pages', icon: Trash2, path: '/pdf/remove', color: 'bg-red-50 text-red-600', desc: 'Purge unwanted pages instantly.' }
      ]
    },
    {
      title: "Conversion Suite",
      tools: [
        { id: 'convert', name: 'JPG to PDF', icon: ImageIcon, path: '/pdf/convert', color: 'bg-emerald-50 text-emerald-600', desc: 'High-fidelity image conversion.' },
        { id: 'pdf2jpg', name: 'PDF to JPG', icon: ImageIcon, path: '/pdf/pdf2jpg', color: 'bg-amber-50 text-amber-600', desc: 'Extract pages as crisp images.' },
        { id: 'pdf2word', name: 'PDF to Word', icon: FileText, path: '/pdf/pdf2word', color: 'bg-sky-50 text-sky-500', desc: 'Convert to editable DOCX.' },
        { id: 'pdf2powerpoint', name: 'PDF to PPTX', icon: Presentation, path: '/pdf/pdf2powerpoint', color: 'bg-orange-50 text-orange-500', desc: 'Transform slides to PowerPoint.' }
      ]
    },
    {
      title: "Optimization Tools",
      tools: [
        { id: 'ocr', name: 'OCR Studio', icon: Search, path: '/pdf/ocr', color: 'bg-indigo-50 text-indigo-600', desc: 'AI-powered text recognition.' },
        { id: 'compress', name: 'Compress', icon: FileDown, path: '/pdf/compress', color: 'bg-slate-50 text-slate-600', desc: 'Smart file size reduction.' },
        { id: 'rotate', name: 'Rotate', icon: RotateCw, path: '/pdf/rotate', color: 'bg-sky-50 text-sky-600', desc: 'Quick orientation correction.' },
        { id: 'watermark', name: 'Watermark', icon: Stamp, path: '/pdf/watermark', color: 'bg-indigo-50 text-indigo-600', desc: 'Brand your documents securely.' }
      ]
    },
    {
      title: "Security & Legal",
      tools: [
        { id: 'protect', name: 'Protect', icon: ShieldAlert, path: '/pdf/protect', color: 'bg-rose-50 text-rose-600', desc: 'Military-grade password encryption.' },
        { id: 'sign', name: 'Sign', icon: FileSignature, path: '/pdf/sign', color: 'bg-teal-50 text-teal-600', desc: 'Legally binding e-signatures.' },
        { id: 'pdfa', name: 'Archive', icon: Archive, path: '/pdf/pdfa', color: 'bg-slate-100 text-slate-700', desc: 'Compliance with PDF/A standards.' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-slide-up">
      <div className="mb-12 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Professional PDF Suite
        </div>
      </div>

      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
          Master Your <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Documents.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          A comprehensive suite of 100% free PDF tools. No cloud uploads, no limits, just performance.
        </p>
      </div>

      <div className="space-y-20">
        {toolGroups.map((group, i) => (
          <div key={i} className={`animate-slide-up stagger-${(i % 4) + 1}`}>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
              {group.title} <div className="h-px bg-slate-200 flex-1" />
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
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
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
