
import React, { useState } from 'react';
import { Loader2, Copy, Check, Sparkles } from 'lucide-react';
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
      title: 'Video Idea Generator',
      description: 'Get viral hooks and content structure for your next video.',
      placeholder: 'Enter your niche or topic (e.g., "Personal Finance for Gen Z")',
      buttonText: 'Generate Ideas'
    },
    hashtags: {
      title: 'Hashtag Generator',
      description: 'AI-optimized tags for Instagram, TikTok, and Twitter.',
      placeholder: 'Describe your post content...',
      buttonText: 'Generate Hashtags'
    },
    code: {
      title: 'Professional Code Writer',
      description: 'Clean, efficient, and production-ready code generation.',
      placeholder: 'Describe the feature or component you need...',
      buttonText: 'Write Code'
    }
  };

  const config = configs[type];

  const handleGenerate = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      let result = '';
      if (type === 'video') result = await generateVideoIdeas(input) || '';
      if (type === 'hashtags') result = await generateHashtags(input) || '';
      if (type === 'code') result = await writeProfessionalCode(input, lang) || '';
      setOutput(result);
    } catch (err) {
      console.error(err);
      alert('Error generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{config.title}</h1>
        <p className="text-slate-500">{config.description}</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        {type === 'code' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            >
              <option>TypeScript</option>
              <option>Python</option>
              <option>JavaScript</option>
              <option>Go</option>
              <option>Rust</option>
              <option>Java</option>
            </select>
          </div>
        )}
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {type === 'code' ? 'Requirement' : 'Topic / Content'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={config.placeholder}
          rows={4}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none mb-6"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !input}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {config.buttonText}
        </button>
      </div>

      {output && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Output</span>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <ReactMarkdown className="markdown-content">
              {output}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITool;
