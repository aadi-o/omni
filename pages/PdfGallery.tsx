
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, Scissors, ImageIcon, FileText, RotateCw, 
  Search, Archive, Stamp, ShieldAlert, FileDown, 
  Trash2, Hash, FileSignature, Presentation, Sparkles, ArrowLeft, ArrowRight
} from 'lucide-react';

const PdfGallery: React.FC = () => {
  const toolGroups = [
    {
      title: "Content & Structure",
      tools: [
        { id: 'merge', name: 'Merge PDF', icon: Combine, path: '/pdf/merge', color: 'bg-indigo-50 text-indigo-600', desc: 'Combine multiple files seamlessly.' },
        { id: 'split', name: 'Split PDF', icon: Scissors, path: '/pdf/split', color: 'bg-orange-50 text-orange-600', desc: 'Separate or extract specific pages.' },
        { id: 'remove', name: 'Remove Pages', icon: Trash2, path: '/pdf/remove', color: 'bg-rose-50 text-rose-600', desc: 'Purge unwanted pages instantly.' }
      ]
    },
    {
      title: "Conversion Suite",
      tools: [
        { id: 'convert', name: 'JPG to PDF', icon: ImageIcon, path: '/pdf/convert', color: 'bg-emerald-50 text-emerald-600', desc: 'High-fidelity image conversion.' },
        { id: 'pdf2jpg', name: 'PDF to JPG', icon: ImageIcon, path: '/pdf/pdf2jpg', color: 'bg-amber-50 text-amber-600', desc: 'Extract pages as crisp images.' },
        { id: 'pdf2word', name: 'PDF to Word', icon: FileText, path: '/pdf/pdf2word', color: 'bg-blue-50 text-blue-600', desc: 'Convert to editable DOCX.' },
        { id: 'pdf2powerpoint', name: 'PDF to PPTX', icon: Presentation, path: '/pdf/pdf2powerpoint', color: 'bg-orange-50 text-orange-600', desc: 'Transform slides to PowerPoint.' }
      ]
    },
    {
      title: "Optimization & Security",
      tools: [
        { id: 'ocr', name: 'OCR Studio', icon: Search, path: '/pdf/ocr', color: 'bg-violet-50 text-violet-600', desc: 'AI-powered text recognition.' },
        { id: 'compress', name: 'Compress', icon: FileDown, path: '/pdf/compress', color: 'bg-slate-50 text-slate-600', desc: 'Smart file size reduction.' },
        { id: 'protect', name: 'Protect PDF', icon: ShieldAlert, path: '/pdf/protect', color: 'bg-red-50 text-red-600', desc: 'Military-grade encryption.' },
        { id: 'sign', name: 'Sign PDF', icon: FileSignature, path: '/pdf/sign', color: 'bg-teal-50 text-teal-600', desc: 'Legally binding e-signatures.' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-reveal stagger-1">
      <div className="mb-12 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-3 h-3 fill-indigo-600" /> Enterprise Studio
        </div>
      </div>

      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
          Master Your <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Documents.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          A comprehensive suite of 100% free PDF tools. No cloud uploads, no limits, just pure performance.
        </p>
      </div>

      <div className="space-y-24">
        {toolGroups.map((group, i) => (
          <div key={i} className={`animate-reveal stagger-${(i % 4) + 1}`}>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-6">
              {group.title} <div className="h-px bg-slate-100 flex-1" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {group.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="glass-card group p-8 rounded-[2.5rem]"
                >
                  <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center mb-6 transition-all group-hover:scale-110`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight">{tool.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                    {tool.desc}
                  </p>
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Open <ArrowRight className="w-3 h-3" />
                  </div>
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
