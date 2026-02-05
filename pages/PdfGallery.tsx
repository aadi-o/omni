
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, Scissors, ImageIcon, FileText, RotateCw, 
  Search, Archive, Stamp, ShieldAlert, FileDown, 
  Trash2, Hash, FileSignature, Presentation, Sparkles, ArrowLeft, ArrowRight, Book,
  Lock, Unlock, Layers, FileDigit, FileType, FileSpreadsheet, PlusSquare
} from 'lucide-react';

const PdfGallery: React.FC = () => {
  const toolGroups = [
    {
      title: "MANUSCRIPT ORGANIZATION",
      tools: [
        { id: 'merge', name: 'MERGE VOLUME', icon: Combine, path: '/pdf/merge', color: 'bg-blue-100 text-blue-700', desc: 'Bind multiple scripts into one epic master.' },
        { id: 'split', name: 'PANEL SPLIT', icon: Scissors, path: '/pdf/split', color: 'bg-yellow-100 text-yellow-700', desc: 'Extract specific scenes into their own files.' },
        { id: 'remove', name: 'PAGE PURGE', icon: Trash2, path: '/pdf/remove', color: 'bg-rose-100 text-rose-700', desc: 'Vanish unwanted pages from the narrative.' },
        { id: 'organize', name: 'REORDER', icon: Layers, path: '/pdf/organize', color: 'bg-indigo-100 text-indigo-700', desc: 'Shuffle your story arcs with ease.' }
      ]
    },
    {
      title: "FORMAT SHIFTING",
      tools: [
        { id: 'convert', name: 'JPG TO PDF', icon: ImageIcon, path: '/pdf/convert', color: 'bg-emerald-100 text-emerald-700', desc: 'Turn visual drafts into professional docs.' },
        { id: 'pdf2jpg', name: 'PDF TO JPG', icon: ImageIcon, path: '/pdf/pdf2jpg', color: 'bg-amber-100 text-amber-700', desc: 'Export every page as a high-res art panel.' },
        { id: 'ocr', name: 'AI DECODER', icon: Search, path: '/pdf/ocr', color: 'bg-violet-100 text-violet-700', desc: 'Transcribe ink into searchable digital script.' },
        { id: 'pdf2word', name: 'TO WORD', icon: FileType, path: '/pdf/pdf2word', color: 'bg-blue-50 text-blue-800', desc: 'Convert to editable manuscript format.' }
      ]
    },
    {
      title: "EDITORIAL & SECURITY",
      tools: [
        { id: 'compress', name: 'SLIM VOLUME', icon: FileDown, path: '/pdf/compress', color: 'bg-slate-100 text-slate-700', desc: 'Shrink files without losing artistic detail.' },
        { id: 'watermark', name: 'INK STAMP', icon: Stamp, path: '/pdf/watermark', color: 'bg-pink-100 text-pink-700', desc: 'Mark your draft with custom ownership tags.' },
        { id: 'protect', name: 'VAULT LOCK', icon: Lock, path: '/pdf/protect', color: 'bg-red-100 text-red-700', desc: 'Encrypt your manuscript from prying eyes.' },
        { id: 'unlock', name: 'UNLOCK', icon: Unlock, path: '/pdf/unlock', color: 'bg-emerald-100 text-emerald-800', desc: 'Remove protection from your own archives.' }
      ]
    },
    {
      title: "ADVANCED DRAFTING",
      tools: [
        { id: 'rotate', name: 'PAGE TURN', icon: RotateCw, path: '/pdf/rotate', color: 'bg-sky-100 text-sky-700', desc: 'Correct the perspective of skewed scans.' },
        { id: 'pagenumber', name: 'PAGINATE', icon: Hash, path: '/pdf/pagenumber', color: 'bg-orange-100 text-orange-700', desc: 'Add serial numbers to your storyboards.' },
        { id: 'sign', name: 'E-SIGNATURE', icon: FileSignature, path: '/pdf/sign', color: 'bg-purple-100 text-purple-700', desc: 'Officially approve your latest creation.' },
        { id: 'repair', name: 'REPAIR', icon: PlusSquare, path: '/pdf/repair', color: 'bg-green-100 text-green-700', desc: 'Mend broken metadata in corrupted files.' }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-16 px-6 animate-panel">
      <div className="mb-20 flex items-center justify-between border-b-[6px] border-black pb-10">
        <Link to="/" className="btn-comic bg-white text-black px-6 py-2 text-sm shadow-[4px_4px_0px_black] flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> BACK TO DESK
        </Link>
        <div className="flex items-center gap-4">
           <div className="font-comic text-2xl hidden md:block">VOLUME #01</div>
           <div className="px-6 py-2 border-4 border-black bg-yellow-400 font-comic text-xl shadow-[4px_4px_0px_black] rotate-2">
              THE COMPLETE ARCHIVE
           </div>
        </div>
      </div>

      <div className="mb-32 max-w-3xl">
        <h1 className="text-8xl md:text-[10rem] font-comic uppercase leading-[0.8] mb-10 hover-pop">
          INDEX OF<br /><span className="text-blue-600">UTILITIES.</span>
        </h1>
        <p className="text-3xl font-serif italic text-slate-500 leading-tight">
          Every tool you need for the digital publishing cycle. 
          Simplistic controls, military-grade privacy.
        </p>
      </div>

      <div className="space-y-40">
        {toolGroups.map((group, i) => (
          <div key={i} className="animate-panel" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center gap-6 mb-16">
               <h2 className="font-comic text-4xl uppercase tracking-widest text-slate-400">
                SECTION {i + 1}: {group.title}
               </h2>
               <div className="h-[4px] bg-black flex-1 opacity-10" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {group.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="panel-ink group p-10 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-14 h-14 border-2 border-black flex items-center justify-center mb-8 transition-all group-hover:-rotate-12 ${tool.color} shadow-[4px_4px_0px_black]`}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-comic text-3xl uppercase mb-4 transition-colors group-hover:text-blue-600 leading-none">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 text-lg font-bold italic leading-snug mb-10">
                    "{tool.desc}"
                  </p>
                  <div className="flex items-center justify-between border-t-2 border-black pt-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">READY TO SCAN</div>
                    <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-2 transition-transform" />
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
