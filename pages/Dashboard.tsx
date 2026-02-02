
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Video, Hash, Code, Briefcase, 
  ArrowRight, Combine, Scissors, ShieldAlert, 
  Stamp, RotateCw, Search, Archive, Image as ImageIcon, Sparkles, Zap
} from 'lucide-react';
import { Tool, ToolCategory } from '../types';

const Dashboard: React.FC = () => {
  const categories: { name: string; type: ToolCategory; description: string; icon: any }[] = [
    { name: 'Document Mastery', type: 'pdf-basic', description: 'Essential tools for daily PDF workflows', icon: FileText },
    { name: 'Security & Archive', type: 'pdf-advanced', description: 'Professional grade encryption and standards', icon: ShieldAlert },
    { name: 'Creative Engine', type: 'ai-content', description: 'AI-powered content and social strategies', icon: Sparkles },
    { name: 'Expert Developer', type: 'ai-dev', description: 'Advanced logic and architecture generation', icon: Code }
  ];

  const tools: Tool[] = [
    {
      id: 'merge',
      name: 'Merge PDF',
      description: 'Combine multiple PDFs into one document.',
      icon: Combine,
      category: 'pdf-basic',
      path: '/pdf/merge',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'split',
      name: 'Split PDF',
      description: 'Separate pages into individual files.',
      icon: Scissors,
      category: 'pdf-basic',
      path: '/pdf/split',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'pdf2jpg',
      name: 'PDF to JPG',
      description: 'Convert PDF pages into high-quality images.',
      icon: ImageIcon,
      category: 'pdf-basic',
      path: '/pdf/pdf2jpg',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'ocr',
      name: 'OCR Studio',
      description: 'Convert scans to searchable, editable text.',
      icon: Search,
      category: 'pdf-advanced',
      path: '/pdf/ocr',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'pdfa',
      name: 'PDF to PDF/A',
      description: 'Long-term archiving with ISO standards.',
      icon: Archive,
      category: 'pdf-advanced',
      path: '/pdf/pdfa',
      color: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'video',
      name: 'Video Ideas',
      description: 'Viral hooks and content strategies.',
      icon: Video,
      category: 'ai-content',
      path: '/video-gen',
      color: 'bg-red-50 text-red-600'
    },
    {
      id: 'hashtags',
      name: 'Tag Genius',
      description: 'AI-curated growth tags for all platforms.',
      icon: Hash,
      category: 'ai-content',
      path: '/hashtags',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      id: 'code',
      name: 'Code Architect',
      description: 'Production-ready code logic generation.',
      icon: Code,
      category: 'ai-dev',
      path: '/code-writer',
      color: 'bg-violet-50 text-violet-600'
    },
    {
      id: 'cv',
      name: 'CV Analyzer',
      description: 'Professional resume feedback and scoring.',
      icon: Briefcase,
      category: 'ai-career',
      path: '/cv-analyzer',
      color: 'bg-teal-50 text-teal-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-24 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest mb-8 border border-indigo-100">
          <Zap className="w-3 h-3 fill-indigo-600" /> All-in-One Utility Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
          Utility for the <span className="text-indigo-600 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">AI Era.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Professional PDF processing and Generative AI studio. 
          Entirely private, blazing fast, and account-free.
        </p>
      </div>

      <div className="space-y-24">
        {categories.map((cat, catIdx) => (
          <div key={cat.type} className={`animate-slide-up stagger-${(catIdx % 4) + 1}`}>
            <div className="mb-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <cat.icon className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{cat.name}</h2>
                </div>
                <p className="text-slate-500 font-medium text-sm">{cat.description}</p>
              </div>
              <Link to={cat.type.startsWith('pdf') ? '/pdf' : cat.type === 'ai-career' ? '/cv-analyzer' : '/video-gen'} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
                See all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.filter(t => t.category === cat.type || (cat.type === 'ai-dev' && t.category === 'ai-dev') || (cat.type === 'ai-career' && t.category === 'ai-career')).map((tool, idx) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm transition-all hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-indigo-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Studio <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Banner */}
      <div className="mt-32 p-16 rounded-[3.5rem] bg-slate-900 text-white relative overflow-hidden animate-scale-in">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Zero-Log Privacy.</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              We process your documents directly in your browser using local WASM engines. 
              Your data never touches our servers, ensuring absolute compliance and security.
            </p>
            <div className="mt-10 flex gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">GDPR Compliant</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Local Processing</span>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             {[ShieldAlert, Zap, Code, Search].map((Icon, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-3">
                   <Icon className="w-8 h-8 text-indigo-400" />
                   <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Secure Module</span>
                </div>
             ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
      </div>
    </div>
  );
};

export default Dashboard;
