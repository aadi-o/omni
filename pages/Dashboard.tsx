
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Video, Hash, Code, Briefcase, 
  ArrowRight, Combine, Scissors, ShieldAlert, 
  Stamp, RotateCw, FileSearch, Trash2, Layers, Search, Archive, Image as ImageIcon
} from 'lucide-react';
import { Tool, ToolCategory } from '../types';

const Dashboard: React.FC = () => {
  const categories: { name: string; type: ToolCategory; description: string }[] = [
    { name: 'Combine & Split', type: 'pdf-basic', description: 'Essential PDF management tools' },
    { name: 'Optimize & Secure', type: 'pdf-advanced', description: 'Professional grade security' },
    { name: 'AI Generation', type: 'ai-content', description: 'Content & Social Media power-ups' },
    { name: 'Developer Tools', type: 'ai-dev', description: 'Advanced coding assistance' }
  ];

  const tools: Tool[] = [
    {
      id: 'merge',
      name: 'Merge PDF',
      description: 'Combine multiple PDFs into one document.',
      icon: Combine,
      category: 'pdf-basic',
      path: '/pdf/merge',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'split',
      name: 'Split PDF',
      description: 'Separate pages into individual files.',
      icon: Scissors,
      category: 'pdf-basic',
      path: '/pdf/split',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'pdf2jpg',
      name: 'PDF to JPG',
      description: 'Convert PDF pages into separate high-quality JPG images.',
      icon: ImageIcon,
      category: 'pdf-basic',
      path: '/pdf/pdf2jpg',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'jpg2pdf',
      name: 'JPG to PDF',
      description: 'Convert images to high-quality PDF.',
      icon: FileText,
      category: 'pdf-basic',
      path: '/pdf/convert',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'rotate',
      name: 'Rotate PDF',
      description: 'Fix orientations of your PDF pages.',
      icon: RotateCw,
      category: 'pdf-basic',
      path: '/pdf/rotate',
      color: 'bg-sky-50 text-sky-600'
    },
    {
      id: 'ocr',
      name: 'OCR PDF',
      description: 'Make scanned PDFs searchable and editable using AI.',
      icon: Search,
      category: 'pdf-advanced',
      path: '/pdf/ocr',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'pdfa',
      name: 'PDF to PDF/A',
      description: 'Convert documents to PDF/A for long-term archiving.',
      icon: Archive,
      category: 'pdf-advanced',
      path: '/pdf/pdfa',
      color: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'watermark',
      name: 'Watermark',
      description: 'Add text stamps to your documents.',
      icon: Stamp,
      category: 'pdf-advanced',
      path: '/pdf/watermark',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'protect',
      name: 'Protect PDF',
      description: 'Encrypt documents with passwords.',
      icon: ShieldAlert,
      category: 'pdf-advanced',
      path: '/pdf/protect',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      id: 'video',
      name: 'Video Ideas',
      description: 'Viral hooks and content strategies.',
      icon: Video,
      category: 'ai-content',
      path: '/video-gen',
      color: 'bg-red-50 text-red-600'
    },
    {
      id: 'hashtags',
      name: 'Hashtags',
      description: 'AI-curated tags for growth.',
      icon: Hash,
      category: 'ai-content',
      path: '/hashtags',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      id: 'code',
      name: 'Code Writer',
      description: 'Production-ready code logic.',
      icon: Code,
      category: 'ai-dev',
      path: '/code-writer',
      color: 'bg-violet-50 text-violet-600'
    },
    {
      id: 'cv',
      name: 'CV Analyzer',
      description: 'Professional resume feedback.',
      icon: Briefcase,
      category: 'ai-career',
      path: '/cv-analyzer',
      color: 'bg-teal-50 text-teal-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Modern Tools for <span className="text-indigo-600">Digital Mastery.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          The ultimate productivity suite combining world-class PDF manipulation with 
          next-generation AI capabilities. Clean, fast, and entirely browser-based.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.type}>
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">{cat.name}</h2>
              <p className="text-slate-500">{cat.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.filter(t => t.category === cat.type || (cat.type === 'ai-career' && t.category === 'ai-career')).map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-indigo-400 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3`}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-indigo-600 font-bold text-sm">
                    Open Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-800 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Enterprise Grade Security</h2>
            <p className="text-indigo-100 text-lg">
              All processing happens locally in your browser. Your files never leave your machine, 
              ensuring maximum privacy and compliance with global data standards.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <ShieldAlert className="w-8 h-8 text-white mb-2" />
                <span className="text-xs font-bold uppercase">100% Private</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <Code className="w-8 h-8 text-white mb-2" />
                <span className="text-xs font-bold uppercase">Open Standards</span>
             </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
