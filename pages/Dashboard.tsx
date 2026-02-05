
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Video, Code, Briefcase, 
  ArrowRight, Combine, Scissors, ShieldAlert, 
  Search, Sparkles, Zap, Star, Pen, MousePointer2
} from 'lucide-react';
import { Tool, ToolCategory } from '../types';

const Dashboard: React.FC = () => {
  const tools: Tool[] = [
    {
      id: 'merge',
      name: 'Merge Files',
      description: 'Bind multiple volumes into one master epic.',
      icon: Combine,
      category: 'pdf-basic',
      path: '/pdf/merge',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'split',
      name: 'Panel Split',
      description: 'Break your story into individual chapters.',
      icon: Scissors,
      category: 'pdf-basic',
      path: '/pdf/split',
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'ocr',
      name: 'Ink Decoder',
      description: 'Transcribe manual sketches into digital text.',
      icon: Search,
      category: 'pdf-advanced',
      path: '/pdf/ocr',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'video',
      name: 'Script Forge',
      description: 'AI-engineered hooks for visual narrative.',
      icon: Video,
      category: 'ai-content',
      path: '/video-gen',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'code',
      name: 'Dev Architect',
      description: 'Build logic blueprints for the digital era.',
      icon: Code,
      category: 'ai-dev',
      path: '/code-writer',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'cv',
      name: 'Hero Review',
      description: 'A professional audit of your origin story.',
      icon: Briefcase,
      category: 'ai-career',
      path: '/cv-analyzer',
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  return (
    <div className="container mx-auto py-16 px-6">
      {/* Hero Section - The Splash Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
        <div className="lg:col-span-8 panel-ink p-16 bg-white animate-panel flex flex-col justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-yellow-200 border-2 border-black text-[12px] font-black uppercase tracking-[0.2em] mb-10 w-fit rotate-[-2deg]">
            <Star className="w-4 h-4 fill-black" /> FEATURING GEMINI PRO ENGINE
          </div>
          <h1 className="text-8xl md:text-[11rem] leading-[0.8] mb-10 hover-pop cursor-default">
            POWER.<br />
            PRIVACY.<br />
            <span className="text-blue-600">PRODUCTION!</span>
          </h1>
          <p className="text-3xl font-serif italic text-slate-500 max-w-2xl leading-tight">
            The world's most comprehensive local-native utility suite for creators, coders, and storytellers.
          </p>
          
          <div className="mt-12 flex flex-wrap gap-8">
             <Link to="/pdf" className="btn-comic bg-black text-white px-12 py-5 shadow-[6px_6px_0px_#60a5fa] active:translate-y-1">
                OPEN THE ARCHIVE
             </Link>
             <Link to="/video-gen" className="btn-comic bg-white text-black px-12 py-5 shadow-[6px_6px_0px_#fef08a] active:translate-y-1">
                CREATE STORY
             </Link>
          </div>

          <div className="absolute top-4 right-6 font-comic text-4xl text-slate-100 select-none">PG 01</div>
        </div>
        
        <div className="lg:col-span-4 panel-ink bg-cyan-100 p-12 animate-panel stagger-1 flex flex-col items-center justify-center text-center">
           <div className="w-32 h-32 bg-white border-4 border-black flex items-center justify-center mb-8 rotate-3 shadow-[8px_8px_0px_black]">
              <Zap className="w-16 h-16 fill-yellow-400 text-yellow-400" />
           </div>
           <h2 className="text-5xl font-comic uppercase mb-6">ULTRA-FAST WASM</h2>
           <p className="text-xl font-bold uppercase tracking-tight text-cyan-800 italic">
             Files processed entirely in your browser. Zero uploads. Zero leaks.
           </p>
           <div className="mt-10 p-4 border-2 border-black bg-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" /> LOCAL ENGINE STATUS: NOMINAL
           </div>
        </div>
      </div>

      {/* Grid Layout - The Comic Page Grid */}
      <div className="mb-32">
        <h2 className="font-comic text-5xl uppercase mb-16 flex items-center gap-6">
          SELECT YOUR TOOL <div className="h-1 bg-black flex-1" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tools.map((tool, i) => (
            <Link
              key={tool.id}
              to={tool.path}
              className={`panel-ink p-10 group animate-panel stagger-${(i % 4) + 1} ${i === 2 ? 'lg:scale-105 bg-yellow-50' : ''}`}
            >
              <div className={`w-16 h-16 border-2 border-black flex items-center justify-center mb-10 transition-transform group-hover:-rotate-12 ${tool.color} shadow-[4px_4px_0px_black]`}>
                <tool.icon className="w-8 h-8" />
              </div>
              <h3 className="font-comic text-4xl uppercase mb-4 transition-colors group-hover:text-blue-600">
                {tool.name}
              </h3>
              <p className="text-slate-500 text-lg font-bold italic leading-snug mb-10">
                "{tool.description}"
              </p>
              <div className="flex items-center justify-between border-t-2 border-black pt-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">CHAPTER {i+1}</span>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black group-hover:translate-x-2 transition-transform">
                  LAUNCH <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Action Burst Badge */}
              <div className="absolute -top-4 -right-4 bg-white border-2 border-black px-3 py-1 font-comic text-xl text-black rotate-12 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110">
                POP!
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* The "Review" Wide Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-32">
         <div className="lg:col-span-5 panel-ink bg-magenta-100 p-12 animate-panel">
            <img 
              src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-72 object-cover border-4 border-black mb-8 grayscale hover:grayscale-0 transition-all"
              alt="Artistic book"
            />
            <h3 className="font-comic text-4xl uppercase mb-4">THE PRIVATE PLEDGE</h3>
            <p className="text-lg font-bold italic leading-relaxed text-slate-700">
              In a world of tracking, OmniTool stands as a beacon of privacy. 
              Like a locked sketchbook, your work remains yours and yours alone.
            </p>
         </div>
         <div className="lg:col-span-7 panel-ink bg-white p-12 flex flex-col justify-center animate-panel stagger-1">
            <h2 className="text-6xl font-comic uppercase mb-8 leading-none">JOIN THE EVOLUTION OF <span className="text-rose-500">DIGITAL DRAFTING!</span></h2>
            <p className="text-2xl font-serif italic text-slate-500 mb-10">
              OmniTool is more than just a set of tools. It's an operating system for the modern imagination.
            </p>
            <div className="flex flex-wrap gap-4">
               {['WASM Core', 'Gemini AI', 'Zero-Log', 'Warp-Speed', 'Ink-True'].map(tag => (
                 <div key={tag} className="px-5 py-2 border-2 border-black bg-yellow-200 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_black] hover:scale-110 transition-transform cursor-default">
                    {tag}
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Footer Ad Style Panel */}
      <div className="panel-ink p-16 bg-black text-white text-center animate-panel">
         <h3 className="font-comic text-6xl uppercase mb-6 tracking-widest text-yellow-400">READY TO PUBLISH?</h3>
         <p className="text-2xl font-bold italic mb-12 text-slate-400 uppercase tracking-tight">Your next masterpiece starts in the archive.</p>
         <Link to="/pdf" className="btn-comic bg-blue-500 text-white shadow-[6px_6px_0px_white]">
            START YOUR JOURNEY NOW!
         </Link>
      </div>
    </div>
  );
};

export default Dashboard;
