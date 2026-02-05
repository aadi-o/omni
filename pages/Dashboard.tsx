
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, Scissors, Search, Video, Code, Briefcase, 
  ArrowRight, Zap, Star, ShieldCheck, MousePointer2, 
  Sparkles, FileText, Image as ImageIcon, Search as SearchIcon
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredTools = [
    { id: 'merge', name: 'MERGE PDF', path: '/pdf/merge', icon: Combine, color: 'bg-cyan-100', accent: 'cyan', burst: 'WHAM!' },
    { id: 'split', name: 'SPLIT PDF', path: '/pdf/split', icon: Scissors, color: 'bg-yellow-100', accent: 'yellow', burst: 'ZIP!' },
    { id: 'ocr', name: 'INK DECODER', path: '/pdf/ocr', icon: Search, color: 'bg-magenta-100', accent: 'magenta', burst: 'BEEP!' },
    { id: 'video', name: 'STORY FORGER', path: '/video-gen', icon: Video, color: 'bg-blue-100', accent: 'blue', burst: 'KAPOW!' },
  ];

  const categories = [
    {
      title: "PDF MASTER ARCHIVE",
      items: [
        { id: 'merge', name: 'Merge Documents', path: '/pdf/merge', icon: Combine },
        { id: 'split', name: 'Split Pages', path: '/pdf/split', icon: Scissors },
        { id: 'ocr', name: 'OCR & Transcription', path: '/pdf/ocr', icon: SearchIcon },
        { id: 'convert', name: 'JPG to PDF', path: '/pdf/convert', icon: ImageIcon },
        { id: 'compress', name: 'Reduce Size', path: '/pdf/compress', icon: FileText },
      ]
    },
    {
      title: "AI CREATIVE FORGE",
      items: [
        { id: 'video', name: 'Video Hooks', path: '/video-gen', icon: Video },
        { id: 'hashtags', name: 'Tag Strategy', path: '/hashtags', icon: Sparkles },
        { id: 'code', name: 'Logic Draft', path: '/code-writer', icon: Code },
        { id: 'cv', name: 'Career Review', path: '/cv-analyzer', icon: Briefcase },
      ]
    }
  ];

  const filteredItems = searchQuery 
    ? categories.flatMap(c => c.items).filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="container mx-auto py-12 px-6">
      {/* Hero: The Splash Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        <div className="lg:col-span-8 panel-ink p-12 bg-white animate-left flex flex-col justify-center relative">
          <div className="onomatopoeia -top-4 -left-2 bg-red-500 text-white animate-float">BAM!</div>
          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]">ISSUE #2024</span>
            <div className="h-0.5 bg-black flex-1 opacity-20" />
          </div>
          <h1 className="text-7xl md:text-[9rem] leading-[0.8] mb-10 tracking-tight hover:skew-x-2 transition-transform cursor-default">
            THE ALL-NEW<br />
            <span className="text-blue-600">PRODUCTION</span><br />
            ENGINE!
          </h1>
          <p className="text-3xl font-serif italic text-slate-500 max-w-xl leading-tight mb-12">
            The world's most simplistic, privacy-first utility suite for digital draftspersons.
          </p>
          
          <div className="flex flex-wrap gap-8 items-center">
             <Link to="/pdf" className="btn-burst shadow-[8px_8px_0px_#60a5fa]">
                OPEN CATALOG
             </Link>
             <div className="hidden sm:block text-xs font-black uppercase tracking-[0.4em] text-slate-300">
               * 100% LOCAL WASM ENGINE
             </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 panel-ink bg-yellow-400 p-10 animate-bottom stagger-1 flex flex-col items-center justify-center text-center">
           <div className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center mb-8 rotate-6 shadow-[6px_6px_0px_black] group-hover:rotate-0 transition-all">
              <Zap className="w-12 h-12 fill-black text-black" />
           </div>
           <h2 className="font-comic text-4xl uppercase mb-4 leading-none">WARP SPEED!</h2>
           <p className="font-bold uppercase tracking-tight text-black italic text-lg leading-tight">
             Files processed instantly in your browser. No cloud. No leaks.
           </p>
           <div className="mt-8 px-4 py-2 bg-black text-white font-black text-[10px] uppercase tracking-widest animate-pulse">
              ALL SYSTEMS ONLINE
           </div>
        </div>
      </div>

      {/* SEARCH INTERFACE: Easy Discovery */}
      <div className="mb-24 panel-ink p-8 bg-slate-50 animate-bottom stagger-2">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-black opacity-20" />
            <input 
              type="text"
              placeholder="QUICK-FIND A TOOL... (E.G. MERGE, SPLIT, OCR)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 border-4 border-black bg-white font-comic text-3xl uppercase outline-none focus:bg-yellow-50 transition-colors placeholder:text-slate-200"
            />
          </div>
          <button className="btn-burst py-5 px-10 text-xl whitespace-nowrap hidden md:block">
            SEARCH
          </button>
        </div>
        
        {searchQuery && filteredItems.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pop">
            {filteredItems.map(item => (
              <Link key={item.id} to={item.path} className="panel-ink p-6 flex items-center gap-4 bg-white hover:bg-yellow-50">
                 <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-black">
                    <item.icon className="w-6 h-6" />
                 </div>
                 <span className="font-comic text-xl uppercase">{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* VISUAL FEATURED GRID: The Big Tools */}
      <div className="mb-32">
        <div className="flex items-center gap-6 mb-16">
           <h2 className="font-comic text-5xl uppercase">FEATURED CHAPTERS</h2>
           <div className="h-1 bg-black flex-1 opacity-10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredTools.map((tool, i) => (
            <Link
              key={tool.id}
              to={tool.path}
              className={`panel-ink p-10 group animate-bottom stagger-${(i % 4) + 1} ${tool.color}`}
            >
              <div className="onomatopoeia -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-all">{tool.burst}</div>
              <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center mb-10 transition-transform group-hover:-rotate-12 shadow-[4px_4px_0px_black]">
                <tool.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-comic text-4xl uppercase mb-4 leading-none">{tool.name}</h3>
              <p className="text-slate-600 text-lg font-bold italic leading-snug mb-8">"Pro-grade drafting in seconds."</p>
              <div className="flex items-center text-xs font-black uppercase tracking-widest text-black border-t-2 border-black/10 pt-6">
                LAUNCH PANEL <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* QUICK CATALOG: The Scanable Index */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        {categories.map((cat, i) => (
          <div key={i} className="panel-ink p-12 bg-white animate-bottom" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-10 border-b-4 border-black pb-6">
              <h2 className="font-comic text-4xl uppercase leading-none">{cat.title}</h2>
              <span className="text-[10px] font-black opacity-30">#0{i+1}</span>
            </div>
            <div className="space-y-4">
              {cat.items.map(item => (
                <Link 
                  key={item.id} 
                  to={item.path} 
                  className="flex items-center justify-between p-4 border-2 border-transparent hover:border-black hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 bg-slate-100 border-2 border-black flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-comic text-2xl uppercase">{item.name}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The Ad Section: Branding */}
      <div className="panel-ink bg-cyan-100 p-16 animate-bottom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-comic leading-[0.8] mb-10 uppercase">
              YOUR PRIVACY IS <span className="text-red-500">NO JOKE!</span>
            </h2>
            <p className="text-2xl font-serif italic text-slate-600 mb-12">
              Unlike the competition, we don't store your drafts. Like a real sketchpad, once you close the cover, the work is yours and only yours.
            </p>
            <div className="flex gap-4">
               {['WASM CORE', 'ZERO LOGS', 'GEMINI PRO'].map(tag => (
                 <span key={tag} className="px-4 py-1 border-2 border-black bg-white text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_black]">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1544640805-35c0fa648a36?auto=format&fit=crop&q=80&w=800" 
              className="w-full grayscale border-4 border-black shadow-[12px_12px_0px_black] group-hover:grayscale-0 transition-all"
              alt="Artboard"
            />
            <div className="onomatopoeia bottom-4 -left-4 bg-yellow-400">PURE POWER!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
