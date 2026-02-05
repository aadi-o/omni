
import React, { useState } from 'react';
import { Loader2, Copy, Check, Sparkles, Wand2, PenTool, BookOpen, Star, Zap } from 'lucide-react';
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
      title: 'STORY FORGER',
      description: 'AI-engineered hooks for visual masterpieces.',
      placeholder: 'WHAT IS YOUR NARRATIVE ARC OR TOPIC?',
      buttonText: 'DRAFT SCRIPT!'
    },
    hashtags: {
      title: 'TAG ARCHITECT',
      description: 'Growth tagging strategies for the modern volume.',
      placeholder: 'PASTE YOUR MANUSCRIPT HERE...',
      buttonText: 'EXTRACT TAGS!'
    },
    code: {
      title: 'BLUEPRINT SCRIBE',
      description: 'Senior-grade logic for digital foundations.',
      placeholder: 'DESCRIBE THE FEATURE TO BE DRAFTED...',
      buttonText: 'BUILD LOGIC!'
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
      alert('THE ENGINE IS STALLED! PLEASE RETRY IN A MOMENT.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-6 animate-panel">
      <div className="mb-24 text-center max-w-3xl mx-auto">
        <div className="w-32 h-32 bg-white border-4 border-black flex items-center justify-center mx-auto mb-12 shadow-[10px_10px_0px_black] rotate-6 group hover:rotate-0 transition-transform">
          <PenTool className="w-16 h-16" />
        </div>
        <h1 className="text-8xl font-comic uppercase leading-none mb-6 hover-pop">{config.title}</h1>
        <p className="text-3xl font-serif italic text-slate-400 max-w-xl mx-auto leading-tight">{config.description}</p>
      </div>

      <div className="panel-ink bg-white p-16 mb-20 relative animate-panel stagger-1">
        {type === 'code' && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
               <Zap className="w-6 h-6 fill-yellow-400" />
               <label className="text-sm font-black uppercase tracking-[0.4em]">TARGET BLUEPRINT LANGUAGE</label>
            </div>
            <div className="flex flex-wrap gap-4">
               {['TypeScript', 'Python', 'Go', 'Rust', 'Swift'].map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-8 py-4 border-4 border-black font-comic text-2xl uppercase transition-all ${lang === l ? 'bg-black text-white shadow-[6px_6px_0px_#60a5fa]' : 'bg-white text-black hover:bg-slate-50'}`}
                  >
                    {l}
                  </button>
               ))}
            </div>
          </div>
        )}
        
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
             <Star className="w-6 h-6 fill-magenta-500 text-magenta-500" />
             <label className="text-sm font-black uppercase tracking-[0.4em]">MANUSCRIPT PROMPT</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            rows={6}
            className="w-full p-10 bg-slate-50 border-4 border-black outline-none focus:bg-white transition-all text-4xl font-comic uppercase placeholder:text-slate-100"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !input}
          className="w-full py-10 btn-comic text-4xl shadow-[10px_10px_0px_#fef08a] active:translate-y-2 flex items-center justify-center gap-8 disabled:opacity-30"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-12 h-12 animate-spin" />
              CONSULTING SCRIBE...
            </>
          ) : (
            <>
              <Sparkles className="w-10 h-10 fill-yellow-400 text-yellow-400" />
              {config.buttonText}
            </>
          )}
        </button>
      </div>

      {output && (
        <div className="panel-ink bg-white animate-panel relative overflow-hidden">
          <div className="px-12 py-12 border-b-4 border-black bg-cyan-50 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-8">
               <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_black] rotate-3">
                  <BookOpen className="w-10 h-10 text-blue-600" />
               </div>
               <div>
                  <h3 className="text-5xl font-comic uppercase tracking-tight leading-none">THE RESULT</h3>
                  <p className="text-xl font-serif italic text-blue-800">CRAFTED VIA NEURAL INK</p>
               </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="btn-comic bg-black text-white px-12 py-6 text-2xl shadow-[6px_6px_0px_#fbcfe8]"
            >
              {copied ? <Check className="w-8 h-8 mr-2 inline" /> : <Copy className="w-8 h-8 mr-2 inline" />}
              {copied ? 'CAPTURED!' : 'COPY SCRIPT!'}
            </button>
          </div>
          
          <div className="p-24 bg-paper-texture halftone">
            <div className="markdown-content text-3xl font-medium leading-relaxed prose prose-slate max-w-none">
              <ReactMarkdown>
                {output}
              </ReactMarkdown>
            </div>
          </div>

          <div className="p-12 border-t-4 border-black bg-white flex justify-center gap-2">
             {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
               <div key={i} className="w-8 h-8 bg-black border-2 border-white rounded-full" />
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITool;
