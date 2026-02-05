
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Added ArrowRight to imports to fix the "Cannot find name 'ArrowRight'" error on line 82
import { LayoutDashboard, FileText, Code, Briefcase, Menu, X, Sparkles, Zap, Search, ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'INDEX', path: '/', icon: LayoutDashboard },
    { name: 'PDF SUITE', path: '/pdf', icon: FileText },
    { name: 'STORY', path: '/video-gen', icon: Sparkles },
    { name: 'BLUEPRINT', path: '/code-writer', icon: Code },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Masthead */}
      <header className="sticky top-0 z-50 w-full border-b-[6px] border-black bg-white">
        <div className="container mx-auto px-6 h-28 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-black text-white flex items-center justify-center border-4 border-black group-hover:rotate-6 transition-transform shadow-[4px_4px_0px_#60a5fa]">
              <Zap className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex flex-col -space-y-2">
              <span className="font-comic text-4xl tracking-tighter uppercase leading-none">
                OMNI<span className="text-blue-600">TOOL</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">
                VOL. 01 / ISSUE #2024
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-sm flex items-center gap-2 border-2 border-transparent hover:border-black hover:bg-slate-50 ${
                  location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) 
                  ? 'bg-black text-white shadow-[4px_4px_0px_#fbcfe8]' 
                  : 'text-slate-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="w-12 h-12 bg-yellow-200 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_black] hover:-rotate-12 transition-transform cursor-pointer">
              <Search className="w-6 h-6" />
            </div>
            <div className="px-6 py-2 border-4 border-black bg-black text-white font-comic text-xl shadow-[4px_4px_0px_#60a5fa]">
               FREE EDITION
            </div>
          </div>

          <button className="lg:hidden p-3 bg-slate-50 border-4 border-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-32 p-10 flex flex-col gap-10">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-comic text-6xl uppercase tracking-tighter border-b-4 border-black pb-8 flex justify-between items-center group"
              >
                {item.name}
                <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-8 border-4 border-black bg-cyan-100 flex items-center gap-6">
             <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-yellow-400" />
             </div>
             <p className="font-comic text-2xl uppercase">Vol. 01 / Private Beta</p>
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t-[6px] border-black bg-white py-24 mt-32 relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-end">
           <div className="lg:col-span-8">
              <h4 className="font-comic text-6xl uppercase leading-none mb-8">DRAFTED BY <span className="text-blue-600">HUMANS</span> FOR THE FUTURE.</h4>
              <p className="text-2xl font-serif italic text-slate-500 max-w-2xl leading-relaxed">
                OmniTool Studio is a love letter to the era of physical drafting, translated for the digital architect. Everything is processed locally, ensuring your secrets remain your own.
              </p>
           </div>
           <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex gap-2">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className={`h-12 flex-1 border-2 border-black ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
                 ))}
              </div>
              <div className="flex justify-between items-center border-t-2 border-black/10 pt-6">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">© 2024 OMNITOOL STUDIO</span>
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
