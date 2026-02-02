
import React from 'react';
import { Cookie, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cookies: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-reveal stagger-1">
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em] mb-12">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>
      
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-100">
          <Cookie className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Cookie Policy.</h1>
          <p className="text-slate-500 font-medium text-lg">Transparent data storage info.</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm leading-relaxed text-slate-600">
        <p className="text-xl font-bold text-slate-800 mb-8">
          OmniTool AI is a "zero-cookie" preferred application. We do not use advertising or tracking cookies.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">1. Local Storage</h2>
        <p className="mb-8">
          We may use your browser's Local Storage to save your theme preferences or temporary processing states. This data never leaves your computer.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">2. Strictly Necessary</h2>
        <p className="mb-8">
          Our underlying engine (WebAssembly) may use temporary session storage to manage large file chunks during processing.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">3. Managing Data</h2>
        <p className="mb-8">
          You can clear all OmniTool data at any time by clearing your browser's "Site Data" or simply closing your browser session.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
