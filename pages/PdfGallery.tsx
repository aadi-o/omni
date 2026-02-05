
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, Scissors, ImageIcon, FileText, RotateCw, 
  Search, Archive, Stamp, ShieldAlert, FileDown, 
  Trash2, Hash, FileSignature, Presentation, Sparkles, ArrowLeft, ArrowRight, Book
} from 'lucide-react';

const PdfGallery: React.FC = () => {
  const toolGroups = [
    {
      title: "Manuscript Structure",
      tools: [
        { id: 'merge', name: 'Master Volume', icon: Combine, path: '/pdf/merge', color: 'bg-blue-100 text-blue-700', desc: 'Bind multiple chapters into one master document.' },
        { id: 'split', name: 'Chapter Split', icon: Scissors, path: '/pdf/split', color: 'bg-yellow-100 text-yellow-700', desc: 'Separate your manuscript into individual parts.' },
        { id: 'remove', name: 'Page Purge', icon: Trash2, path: '/pdf/remove', color: 'bg-rose-100 text-rose-700', desc: 'Remove unwanted pages with ink-like precision.' },
        { id: 'rotate', name: 'Page Turn', icon: RotateCw, path: '/pdf/rotate', color: 'bg-sky-100 text-sky-700', desc: 'Fix the orientation of your storyboards.' }
      ]
    },
    {
      title: "Format Conversions",
      tools: [
        { id: 'convert', name: 'Image Draft', icon: ImageIcon, path: '/pdf/convert', color: 'bg-emerald-100 text-emerald-700', desc: 'Transform sketches and photos into PDFs.' },
        { id: 'pdf2jpg', name: 'Panel Export', icon: ImageIcon, path: '/pdf/pdf2jpg', color: 'bg-amber-100 text-amber-700', desc: 'Extract pages as high-quality image panels.' },
        { id: 'pdf2word', name: 'Script Conversion', icon: FileText, path: '/pdf/pdf2word', color: 'bg-blue-100 text-blue-700', desc: 'Turn PDFs back into editable digital manuscripts.' },
        { id: 'ocr', name: 'AI Transcription', icon: Search, path: '/pdf/ocr', color: 'bg-violet-100 text-violet-700', desc: 'Digitize ink-drawn text using neural networks.' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-flip">
      <div className="mb-20 flex items-center justify-between border-b-4 border-black pb-8">
        <Link to="/" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back To Desk
        </Link>
        <div className="px-6 py-2 border-2 border-black bg-yellow-200 text-xs font-black uppercase tracking-widest flex items-center gap-3">
          <Book className="w-4 h-4" /> The Archive Index
        </div>
      </div>

      <div className="mb-32 max-w-2xl">
        <h1 className="text-7xl font-black uppercase tracking-tighter mb-8 italic leading-none">
          The Archive <br /><span className="text-blue-600 border-b-8 border-blue-100">Catalog.</span>
        </h1>
        <p className="text-2xl text-slate-500 font-medium italic">
          A simplistic, local-only index for all your manuscript processing needs. 
          Pure ink on paper efficiency.
        </p>
      </div>

      <div className="space-y-32">
        {toolGroups.map((group, i) => (
          <div key={i} className="animate-flip">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-12 flex items-center gap-6">
              {group.title} <div className="h-1 bg-black flex-1" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {group.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="comic-panel group p-12 bg-white"
                >
                  <div className={`w-14 h-14 border-2 border-black flex items-center justify-center mb-8 transition-all group-hover:-rotate-6 ${tool.color}`}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                  <p className="text-slate-500 text-base font-medium leading-snug italic mb-8">
                    {tool.desc}
                  </p>
                  <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-t-2 border-slate-50 pt-6">
                    Launch <ArrowRight className="w-4 h-4" />
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
