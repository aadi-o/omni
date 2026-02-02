
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Video, Hash, Code, Briefcase, Menu, X, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'PDF Tools', path: '/pdf', icon: FileText },
    { name: 'AI Generation', path: '/video-gen', icon: Sparkles },
    { name: 'Dev Studio', path: '/code-writer', icon: Code },
    { name: 'Career', path: '/cv-analyzer', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900">OmniTool<span className="text-indigo-600">AI</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold tracking-tight uppercase transition-all hover:text-indigo-600 ${
                  location.pathname === item.path || (item.path === '/pdf' && location.pathname.startsWith('/pdf')) ? 'text-indigo-600 underline underline-offset-8 decoration-2' : 'text-slate-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="px-5 py-2.5 bg-slate-900 text-white text-xs font-black uppercase rounded-lg hover:bg-slate-800 transition-colors tracking-widest">
              Get Started
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 animate-in fade-in zoom-in-95">
          <nav className="flex flex-col p-6 gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 text-slate-900 font-bold transition-colors"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-indigo-600" />
                  {item.name}
                </div>
                <X className="w-4 h-4 text-slate-300" />
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1 container mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="border-t bg-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="font-black text-xl text-slate-900">OmniToolAI</span>
             </div>
             <p className="text-slate-500 max-w-sm mb-6 font-medium leading-relaxed">
                The world's first fully browser-based studio combining heavy-duty PDF processing 
                with generative AI. No accounts, no tracking, just performance.
             </p>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 text-slate-400">Tools</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-bold">
              <li><Link to="/pdf" className="hover:text-indigo-600 transition-colors">All PDF Tools</Link></li>
              <li><Link to="/pdf/ocr" className="hover:text-indigo-600 transition-colors">OCR Scanned PDF</Link></li>
              <li><Link to="/code-writer" className="hover:text-indigo-600 transition-colors">Dev Studio</Link></li>
              <li><Link to="/cv-analyzer" className="hover:text-indigo-600 transition-colors">Resume Review</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 text-slate-400">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-bold">
              <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-indigo-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2024 OmniTool AI Studio. Local Processing Engine v1.0.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
