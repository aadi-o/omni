
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Upload, X, Download, Loader2, 
  Combine, Scissors, RotateCw, Stamp, ShieldAlert, Search, Copy, Check, Archive, 
  Image as ImageIcon, Trash2, FileDown, ArrowLeft, Sparkles, Wand2, Pen, Star
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import JSZip from 'jszip';
import { 
  convertImagesToPdf, mergePdfs, addWatermark, rotatePdf, 
  convertPdfToJpg, protectPdf, splitPdf, removePages, compressPdf
} from '../services/pdfService';
import { performOCR } from '../services/geminiService';

const PdfTool: React.FC = () => {
  const { action } = useParams<{ action: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extraInput, setExtraInput] = useState('');
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<{ name: string, blob: Blob, url: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const configs: Record<string, any> = {
    'merge': { title: 'MASTER VOLUME', icon: Combine, color: 'bg-blue-100 text-blue-700', accept: '.pdf' },
    'split': { title: 'PANEL SPLIT', icon: Scissors, color: 'bg-yellow-100 text-yellow-700', accept: '.pdf', extraLabel: 'CHAPTER RANGE (e.g. 1-2, 3-5)' },
    'rotate': { title: 'PAGE TURN', icon: RotateCw, color: 'bg-sky-100 text-sky-700', accept: '.pdf', extraLabel: 'ROTATION (90, 180, 270)' },
    'watermark': { title: 'INK STAMP', icon: Stamp, color: 'bg-rose-100 text-rose-700', accept: '.pdf', extraLabel: 'STAMP TEXT' },
    'convert': { title: 'IMAGE DRAFT', icon: ImageIcon, color: 'bg-emerald-100 text-emerald-700', accept: 'image/*' },
    'protect': { title: 'VAULT LOCK', icon: ShieldAlert, color: 'bg-indigo-100 text-indigo-700', accept: '.pdf', extraLabel: 'SECRET PASSKEY' },
    'ocr': { title: 'DECODER', icon: Search, color: 'bg-violet-100 text-violet-700', accept: '.pdf,image/*' },
    'remove': { title: 'PAGE PURGE', icon: Trash2, color: 'bg-red-100 text-red-700', accept: '.pdf', extraLabel: 'PAGES TO REMOVE (e.g. 1, 3)' },
    'compress': { title: 'SLIM VOLUME', icon: FileDown, color: 'bg-slate-100 text-slate-700', accept: '.pdf' }
  };

  const config = configs[action || 'merge'] || { title: 'UTILITY', icon: FileText, color: 'bg-slate-100', accept: '*' };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => action === 'merge' || action === 'convert' ? [...prev, ...newFiles] : newFiles);
      setOcrResult(null);
      setConvertedImages([]);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      let result: Blob | Uint8Array | Uint8Array[] | null = null;
      let filename = `omnitool-${action}-${Date.now()}.pdf`;

      if (action === 'ocr') {
        const text = await performOCR(files[0]);
        setOcrResult(text || '');
        setIsProcessing(false);
        return;
      }

      if (action === 'pdf2jpg') {
        const imgs = await convertPdfToJpg(files[0]);
        setConvertedImages(imgs.map(i => ({ ...i, url: URL.createObjectURL(i.blob) })));
        setIsProcessing(false);
        return;
      }

      if (action === 'merge') result = await mergePdfs(files);
      else if (action === 'convert') result = await convertImagesToPdf(files);
      else if (action === 'split') result = await splitPdf(files[0], extraInput || '1');
      else if (action === 'remove') result = await removePages(files[0], extraInput.split(',').map(n => parseInt(n.trim())));
      else if (action === 'watermark') result = await addWatermark(files[0], extraInput || 'DRAFT');
      else if (action === 'rotate') result = await rotatePdf(files[0], parseInt(extraInput) || 90);
      else if (action === 'protect') result = await protectPdf(files[0], extraInput);
      else if (action === 'compress') result = await compressPdf(files[0]);

      if (result) {
        if (Array.isArray(result)) {
          const zip = new JSZip();
          result.forEach((doc, i) => zip.file(`chapter_${i+1}.pdf`, doc));
          const content = await zip.generateAsync({type: 'blob'});
          download(content, `omni-archive-${Date.now()}.zip`);
        } else {
          const blob = result instanceof Blob ? result : new Blob([result], { type: 'application/pdf' });
          download(blob, filename);
        }
      }
    } catch (err) {
      console.error(err);
      alert('MANUSCRIPT ERROR: Local processing failed. Ensure file is not corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const download = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-16 px-6 animate-panel">
      {/* Workspace Header */}
      <div className="mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border-b-[6px] border-black pb-12">
        <div className="flex items-center gap-8">
           <div className={`w-32 h-32 border-4 border-black flex items-center justify-center -rotate-3 ${config.color} shadow-[8px_8px_0px_black] group hover:rotate-0 transition-transform`}>
              <config.icon className="w-16 h-16" />
           </div>
           <div>
              <h1 className="text-7xl font-comic uppercase leading-none mb-2">{config.title}</h1>
              <p className="text-2xl font-serif italic text-slate-400">THE DRAFTSMAN'S TABLE / ISSUE #2024</p>
           </div>
        </div>
        <Link to="/pdf" className="btn-comic bg-white text-black px-8 py-4 shadow-[4px_4px_0px_black]">
           <div className="flex items-center gap-2"><ArrowLeft /> BACK TO ARCHIVE</div>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        {!ocrResult && (
          <div className="panel-ink p-2 w-full group animate-panel">
            <input
              type="file"
              id="file-upload"
              multiple={action === 'merge' || action === 'convert'}
              accept={config.accept}
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer block border-4 border-dashed border-slate-200 p-24 text-center group-hover:border-black transition-colors bg-white halftone">
              <div className="w-24 h-24 bg-slate-50 border-2 border-slate-200 flex items-center justify-center mx-auto mb-10 group-hover:bg-yellow-100 group-hover:border-black group-hover:scale-110 transition-all shadow-[4px_4px_0px_#eee] group-hover:shadow-[6px_6px_0px_black]">
                <Upload className="w-10 h-10" />
              </div>
              <h2 className="text-5xl font-comic uppercase mb-6 tracking-tight">
                {files.length > 0 ? `${files.length} VOLUMES READY!` : 'DROP MANUSCRIPTS HERE'}
              </h2>
              <p className="text-2xl font-serif italic text-slate-400 mb-12">"EVERY GREAT STORY BEGINS WITH A SINGLE PAGE"</p>
              <div className="flex justify-center gap-6">
                 <div className="px-6 py-2 border-2 border-black bg-cyan-100 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_black]">LOCAL WASM 2.0</div>
                 <div className="px-6 py-2 border-2 border-black bg-magenta-100 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_black]">100% PRIVATE</div>
              </div>
            </label>
          </div>
        )}

        {config.extraLabel && files.length > 0 && (
          <div className="mt-12 panel-ink p-12 bg-white animate-panel stagger-1">
            <div className="flex items-center gap-3 mb-6">
               <Star className="w-5 h-5 fill-yellow-400" />
               <label className="text-sm font-black uppercase tracking-[0.3em]">{config.extraLabel}</label>
            </div>
            <input 
              type="text"
              value={extraInput}
              onChange={(e) => setExtraInput(e.target.value)}
              placeholder="ENTER INK INSTRUCTIONS..."
              className="w-full p-8 border-4 border-black text-4xl font-comic outline-none focus:bg-yellow-50 transition-colors uppercase placeholder:text-slate-100"
            />
          </div>
        )}

        {files.length > 0 && !ocrResult && (
          <div className="mt-16 space-y-16">
            <div className="flex flex-wrap gap-10 justify-center">
              {files.map((file, idx) => (
                <div key={idx} className="panel-ink w-48 aspect-[3/4.5] flex flex-col items-center justify-center p-8 text-center bg-white relative group">
                   <FileText className="w-16 h-16 mb-6 text-slate-200 group-hover:text-blue-600 transition-colors" />
                   <span className="text-[12px] font-black uppercase tracking-widest break-all line-clamp-3">{file.name}</span>
                   <button 
                    onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-4 border-black hover:bg-rose-600 transition-all scale-75 group-hover:scale-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none halftone" />
                </div>
              ))}
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="w-full py-10 btn-comic text-4xl shadow-[10px_10px_0px_#60a5fa] active:translate-y-2 flex items-center justify-center gap-8 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-12 h-12 animate-spin" />
                  INKING MANUSCRIPT...
                </>
              ) : (
                <>
                  <Pen className="w-10 h-10" />
                  COMMIT TO PAPER!
                </>
              )}
            </button>
          </div>
        )}

        {ocrResult && (
          <div className="mt-20 panel-ink bg-white animate-panel relative overflow-hidden">
            <div className="p-12 border-b-4 border-black bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-yellow-200 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_black] rotate-[-3deg]">
                    <Sparkles className="w-8 h-8 fill-black" />
                 </div>
                 <h3 className="text-5xl font-comic uppercase tracking-tight">THE TRANSCRIPTION</h3>
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText(ocrResult); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="btn-comic bg-black text-white px-10 py-5 text-xl"
              >
                {copied ? <Check className="w-6 h-6 mr-2 inline" /> : <Copy className="w-6 h-6 mr-2 inline" />}
                {copied ? 'CAPTURED!' : 'GRAB INK!'}
              </button>
            </div>
            <div className="p-20 text-slate-800 font-medium text-2xl leading-relaxed prose prose-slate max-w-none bg-paper-texture halftone">
              <ReactMarkdown>{ocrResult}</ReactMarkdown>
            </div>
            
            <div className="p-10 border-t-4 border-black bg-yellow-50 text-center font-comic text-2xl uppercase">
               *** END OF TRANSCRIPTION ***
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfTool;
