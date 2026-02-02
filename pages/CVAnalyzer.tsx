
import React, { useState } from 'react';
import { Briefcase, Loader2, Target, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { analyzeCV } from '../services/geminiService';
import { AnalysisResult } from '../types';

const CVAnalyzer: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cvText) return;
    setIsLoading(true);
    try {
      const analysis = await analyzeCV(cvText);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">CV Analysis Engine</h1>
        <p className="text-slate-500">Paste your CV content to receive an instant professional review.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Resume Content</label>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your resume/CV text here..."
              rows={15}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none mb-6 text-sm leading-relaxed"
            />
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !cvText}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
              Start Analysis
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {!result && !isLoading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Target className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium">Detailed insights will appear here after analysis.</p>
            </div>
          )}

          {isLoading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white border border-slate-200 rounded-3xl p-10 text-center animate-pulse">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
              <p className="text-slate-600 font-bold">OmniAI is reviewing your profile...</p>
              <p className="text-slate-400 text-sm">Evaluating structure, keywords, and role match.</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-tight mb-1">Resume Score</h3>
                  <p className="text-slate-900 font-bold">Overall Performance</p>
                </div>
                <div className={`text-5xl font-black ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  Key Strengths
                </div>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold">
                  <TrendingUp className="w-5 h-5" />
                  Growth Suggestions
                </div>
                <ul className="space-y-3">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                <div className="flex items-center gap-2 mb-2 text-indigo-900 font-bold">
                  <Target className="w-5 h-5" />
                  Best Fit Roles
                </div>
                <p className="text-indigo-800 text-sm italic font-medium">
                  {result.roleMatch}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzer;
