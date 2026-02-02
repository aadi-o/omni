
import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-reveal stagger-1">
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em] mb-12">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>
      
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Privacy First.</h1>
          <p className="text-slate-500 font-medium text-lg">Our commitment to your document security.</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm leading-relaxed text-slate-600">
        <h2 className="text-2xl font-black text-slate-900 mb-6">1. Local Processing</h2>
        <p className="mb-8">
          Unlike traditional PDF converters, OmniTool AI processes your files directly in your web browser using WebAssembly (WASM). 
          <strong> Your documents are never uploaded to our servers.</strong> The files stay in your computer's memory and are destroyed when you close the tab.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">2. AI Data Handling</h2>
        <p className="mb-8">
          When using AI-powered tools like OCR or the CV Analyzer, only the extracted text metadata is sent to the Gemini API for processing. 
          The original source file remains local. We do not use your data to train models.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">3. No Accounts, No Tracking</h2>
        <p className="mb-8">
          We do not require registration. We do not store your IP address, name, or email. We use minimal, anonymous telemetry to ensure the site is running correctly.
        </p>

        <h2 className="text-2xl font-black text-slate-900 mb-6">4. Third-Party Services</h2>
        <p className="mb-8">
          Our AI services are powered by Google Gemini. Please refer to Google's Enterprise Privacy policy for details on how they handle API requests.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
