
import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-reveal stagger-1">
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em] mb-12">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>
      
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Terms of Service.</h1>
          <p className="text-slate-500 font-medium text-lg">The rules for using OmniTool AI.</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm leading-relaxed text-slate-600">
        <h2 className="text-2xl font-black text-slate-900 mb-6">1. Usage License</h2>
        <p className="mb-8">
          OmniTool AI is free for personal and commercial use. You are permitted to process documents and generate AI content as long as it does not violate any local laws.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">2. Limitation of Liability</h2>
        <p className="mb-8">
          As our processing is local and powered by external AI models, we provide this tool "as is". We are not responsible for any document loss, data corruption, or incorrect AI generations. Always keep backups of your original files.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">3. Forbidden Use</h2>
        <p className="mb-8">
          You may not use our service to generate malicious code, spam, or illegal documentation. Automated scraping of this interface is strictly prohibited.
        </p>
      </div>
    </div>
  );
};

export default Terms;
