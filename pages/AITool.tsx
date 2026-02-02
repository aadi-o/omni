
import React, { useState } from 'react';
import { Loader2, Copy, Check, Sparkles, Wand2, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateVideoIdeas, generateHashtags, writeProfessionalCode } from '../services/geminiService';

interface AIToolProps {
  type: 'video' | 'hashtags' | 'code';
}

const AITool: React.FC<AIToolProps> = ({ type }) => {
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('TypeScript');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const configs = {
    video: {
      title: 'Viral Idea Forge',
      description: 'AI-engineered hooks and content sequences.',
      placeholder: 'Describe your niche or specific topic (e.g., "Web3 for Beginners")',
      buttonText: 'Generate Campaign'
    },
    hashtags: {
      title: 'Tag Architect',
      description: 'Precision growth tags for modern social platforms.',
      placeholder: 'Paste your content text or caption here for analysis...',
      buttonText: 'Map Strategy'
    },
    code: {
      title: 'Dev Engine',
      description: 'High-performance, senior-grade logic generation.',
      placeholder: 'Describe the technical feature (e.g., "A custom React hook for persistent auth")',
      buttonText: 'Construct Codebase'
    }
  };

  const config = configs[type];

  const handleGenerate = async () => {
    if (!input) return;
    setIsLoading(true);
    setOutput('');
    try {
      let result = '';
      if (type === 'video') result = await generateVideoIdeas(input) || '';
      if (type === 'hashtags') result = await generateHashtags(input) || '';
      if (type === 'code') result = await writeProfessionalCode(input, lang) || '';
      setOutput(result);
    } catch (err) {
      console.error(err);
      alert('AI pipeline congestion. Please try again in a few moments.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-reveal stagger-1">
      <div className="mb-20 text-center">
        <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-100">
          <Wand2 className="w-12 h-12" />
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">{config.title}</h1>
        <p className="text-slate-500 font-medium text-xl">{config.description}</p>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm mb-16 relative overflow-hidden animate-reveal stagger-2">
        {type === 'code' && (
          <div className="mb-10">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Target Environment</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
               {['TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Swift'].map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${lang === l ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'}`}
                  >
                    {l}
                  </button>
               ))}
            </div>
          </div>
        )}
        
        <div className="mb-12">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Prompt Context</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            rows={6}
            className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none resize-none text-lg font-medium leading-relaxed"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !input}
          className="w-full py-6 bg-slate-900 text-white text-xl font-black rounded-[2rem] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-7 h-7 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles className="w-7 h-7 fill-indigo-400 text-indigo-400" />
              {config.buttonText}
            </>
          )}
        </button>
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[100px] -mr-24 -mt-24"></div>
      </div>

      {output && (
        <div className="bg-white rounded-[4rem] border border-slate-200 shadow-2xl overflow-hidden animate-reveal stagger-1">
          <div className="px-12 py-10 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Generation</h3>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white text-xs font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied' : 'Copy All'}
            </button>
          </div>
          <div className="p-20 prose prose-slate max-w-none bg-slate-50/20">
            <div className="markdown-content">
              <ReactMarkdown>
                {output}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITool;
