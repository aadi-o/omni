
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Code, Briefcase, Menu, X, Sparkles, BookOpen, Zap } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'THE DESK', path: '/', icon: LayoutDashboard },
    { name: 'ARCHIVE', path: '/pdf', icon: FileText },
    { name: 'STORY', path: '/video-gen', icon: Sparkles },
    { name: 'BLUEPRINT', path: '/code-writer', icon: Code },
    { name: 'REVIEW', path: '/cv-analyzer', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Masthead */}
      <header className="sticky top-0 z-50 w-full border-b-[6px] border-black bg-white">
        <div className="container mx-auto px-6 h-28 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-black text-white flex items-center justify-center border-4 border-black group-hover:-rotate-12 transition-transform shadow-[4px_4px_0px_#60a5fa]">
              <Zap className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex flex-col -space-y-2">
              <span className="font-comic text-4xl tracking-tight uppercase leading-none">
                OMNI<span className="text-blue-600">TOOL</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">
                VOL. 01 / ISSUE #2024
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-lg flex items-center gap-2 ${
                  location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) 
                  ? 'bg-black text-white shadow-[4px_4px_0px_#fbcfe8]' 
                  : 'text-slate-500 hover:text-black hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-right hidden xl:block">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CURRENT STATUS</div>
              <div className="text-xs font-black uppercase text-emerald-600 flex items-center justify-end gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> ALL ENGINES GO!
              </div>
            </div>
            <div className="w-px h-10 bg-black/10 mx-2" />
            <div className="w-12 h-12 bg-yellow-200 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_black] hover:rotate-6 transition-transform cursor-help">
               <span className="font-comic text-xl">?</span>
            </div>
          </div>

          <button className="lg:hidden p-3 bg-slate-100 border-2 border-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-32 p-8 border-b-[6px] border-black">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-comic text-5xl uppercase tracking-tighter border-b-4 border-black pb-6 flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                {item.name}
                <item.icon className="w-10 h-10" />
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t-[6px] border-black bg-white py-24 mt-32 relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <div className="lg:col-span-6">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-black">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="font-comic text-4xl tracking-tighter uppercase italic">OmniTool Studio</span>
             </div>
             <p className="text-slate-600 max-w-lg font-medium text-lg leading-relaxed italic">
                A browser-native utility workspace for the modern storyteller. 
                Everything stays on the page. No data ever leaves your session. 
                Designed for speed, privacy, and impact.
             </p>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="font-comic text-2xl uppercase tracking-widest mb-10 text-slate-400">Chapters</h4>
            <ul className="space-y-5 text-sm font-black uppercase tracking-[0.2em]">
              <li><Link to="/pdf" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> The Archive</Link></li>
              <li><Link to="/pdf/ocr" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> Transcription</Link></li>
              <li><Link to="/video-gen" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> Storyboards</Link></li>
              <li><Link to="/code-writer" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> Logic Drafting</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-comic text-2xl uppercase tracking-widest mb-10 text-slate-400">The Ledger</h4>
            <ul className="space-y-5 text-sm font-black uppercase tracking-[0.2em]">
              <li><Link to="/privacy" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> Privacy Core</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> Usage Terms</Link></li>
              <li><Link to="/cookies" className="hover:text-blue-600 flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-all"/> Data Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 mt-24 pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
            © 2024 OMNITOOL STUDIO | BUILT WITH INK & CODE
          </div>
          <div className="mt-8 md:mt-0 flex gap-1">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className={`w-2 h-8 border-2 border-black ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
             ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
