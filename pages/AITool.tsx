
import React, { useState } from 'react';
import { Loader2, Copy, Check, Sparkles, Wand2 } from 'lucide-react';
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
      placeholder: 'Describe your niche (e.g., "Web3 for Beginners")',
      buttonText: 'Forge Ideas'
    },
    hashtags: {
      title: 'Tag Architect',
      description: 'Precision growth tags for modern platforms.',
      placeholder: 'Paste your content or caption here...',
      buttonText: 'Map Hashtags'
    },
    code: {
      title: 'Dev Engine',
      description: 'High-performance, senior-grade logic generation.',
      placeholder: 'Describe the feature (e.g., "A custom React hook for auth")',
      buttonText: 'Construct Code'
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
      alert('Generation module error. Please refresh and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-slide-up">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Wand2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">{config.title}</h1>
        <p className="text-slate-500 font-medium text-lg">{config.description}</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm mb-12 relative overflow-hidden">
        {type === 'code' && (
          <div className="mb-8 animate-slide-up stagger-1">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Target Language</label>
            <div className="grid grid-cols-3 gap-3">
               {['TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Swift'].map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${lang === l ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'}`}
                  >
                    {l}
                  </button>
               ))}
            </div>
          </div>
        )}
        
        <div className="animate-slide-up stagger-2">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Input Directives</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            rows={5}
            className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none resize-none mb-8 text-lg font-medium"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !input}
          className="w-full py-5 bg-slate-900 text-white text-lg font-black rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Processing Request...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              {config.buttonText}
            </>
          )}
        </button>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      </div>

      {output && (
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden animate-scale-in">
          <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
               </div>
               <span className="text-sm font-black text-slate-900 uppercase tracking-tight">AI Generation Result</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Output'}
            </button>
          </div>
          <div className="p-12 prose prose-slate max-w-none bg-slate-50/10">
            {/* Fix: ReactMarkdown does not support className prop in some versions/types, using container instead */}
            <ReactMarkdown>
              {output}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITool;
