
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Video, Hash, Code, Briefcase, 
  ArrowRight, Combine, Scissors, ShieldAlert, 
  RotateCw, Search, Archive, Image as ImageIcon, Sparkles, Zap, Layers
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
      color: 'bg-indigo-50 text-indigo-600'
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
      id: 'ocr',
      name: 'OCR Studio',
      description: 'Convert scans to searchable, editable text.',
      icon: Search,
      category: 'pdf-advanced',
      path: '/pdf/ocr',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'video',
      name: 'Viral Idea Forge',
      description: 'AI-engineered hooks and content sequences.',
      icon: Video,
      category: 'ai-content',
      path: '/video-gen',
      color: 'bg-rose-50 text-rose-600'
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
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-32 animate-reveal stagger-1">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl shadow-indigo-100 border border-slate-800">
          <Zap className="w-3 h-3 fill-indigo-400 text-indigo-400" /> Powered by Gemini 3.0
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">
          The Complete <br /><span className="text-indigo-600">Productivity Studio.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Professional PDF processing and Generative AI studio. 
          Entirely private, blazing fast, and account-free.
        </p>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
           <Link to="/pdf" className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-105 transition-all">
              Explore PDF Suite
           </Link>
           <Link to="/video-gen" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all">
              AI Generation Hub
           </Link>
        </div>
      </div>

      <div className="space-y-32">
        {categories.map((cat, catIdx) => (
          <div key={cat.type} className={`animate-reveal stagger-${(catIdx % 4) + 1}`}>
            <div className="mb-12 flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <cat.icon className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{cat.name}</h2>
                </div>
                <p className="text-slate-500 font-medium">{cat.description}</p>
              </div>
              <Link to={cat.type.startsWith('pdf') ? '/pdf' : '/video-gen'} className="px-4 py-2 bg-slate-50 text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-2">
                Expand <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.filter(t => t.category === cat.type || (cat.type === 'ai-dev' && t.category === 'ai-dev') || (cat.type === 'ai-career' && t.category === 'ai-career')).map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="glass-card group p-8 rounded-[2.5rem]"
                >
                  <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-3`}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors tracking-tight">{tool.name}</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-indigo-600 font-black text-xs uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Launch Tool <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-40 p-20 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden animate-reveal stagger-1">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight">Zero-Log Privacy Architecture.</h2>
            <p className="text-slate-400 text-xl leading-relaxed font-medium mb-12">
              We process your documents directly in your browser using local WebAssembly. 
              Your sensitive data never touches a server, ensuring absolute compliance.
            </p>
            <div className="flex flex-wrap gap-8">
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-300">WASM Local Engines</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-300">End-to-End Encryption</span>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
             {[ShieldAlert, Zap, Code, Search].map((Icon, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
                   <Icon className="w-10 h-10 text-indigo-400" />
                   <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Secure Module</span>
                </div>
             ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
      </div>
    </div>
  );
};

export default Dashboard;
