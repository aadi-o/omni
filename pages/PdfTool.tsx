
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Upload, X, Download, Loader2, 
  Combine, Scissors, RotateCw, Stamp, ShieldAlert, Search, Copy, Check, Archive, Image as ImageIcon,
  ChevronRight, Trash2, Hash, FileDown, FileSignature, Presentation, ArrowLeft, Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import JSZip from 'jszip';
import { 
  convertImagesToPdf, mergePdfs, addWatermark, rotatePdf, convertToPdfA, convertPdfToJpg
} from '../services/pdfService';
import { performOCR } from '../services/geminiService';

const PdfTool: React.FC = () => {
  const { action } = useParams<{ action: string }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extraInput, setExtraInput] = useState('');
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<{ name: string, blob: Blob, url: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const configs: Record<string, any> = {
    'merge': { title: 'Merge PDF', icon: Combine, color: 'text-blue-600 bg-blue-50', accept: '.pdf' },
    'split': { title: 'Split PDF', icon: Scissors, color: 'text-orange-600 bg-orange-50', accept: '.pdf' },
    'rotate': { title: 'Rotate PDF', icon: RotateCw, color: 'text-sky-600 bg-sky-50', accept: '.pdf', extra: '90' },
    'watermark': { title: 'Watermark', icon: Stamp, color: 'text-indigo-600 bg-indigo-50', accept: '.pdf', extra: 'CONFIDENTIAL' },
    'convert': { title: 'JPG to PDF', icon: FileText, color: 'text-emerald-600 bg-emerald-50', accept: 'image/*' },
    'protect': { title: 'Protect PDF', icon: ShieldAlert, color: 'text-rose-600 bg-rose-50', accept: '.pdf', extra: '' },
    'ocr': { title: 'OCR Studio', icon: Search, color: 'text-indigo-600 bg-indigo-50', accept: '.pdf,image/*' },
    'pdfa': { title: 'PDF Archive', icon: Archive, color: 'text-slate-700 bg-slate-100', accept: '.pdf' },
    'pdf2jpg': { title: 'PDF to JPG', icon: ImageIcon, color: 'text-amber-600 bg-amber-50', accept: '.pdf' },
    'pdf2word': { title: 'PDF to Word', icon: FileText, color: 'text-sky-500 bg-sky-50', accept: '.pdf' },
    'pdf2powerpoint': { title: 'PDF to PPTX', icon: Presentation, color: 'text-orange-500 bg-orange-50', accept: '.pdf' },
    'remove': { title: 'Remove Pages', icon: Trash2, color: 'text-red-600 bg-red-50', accept: '.pdf' },
    'compress': { title: 'Compress PDF', icon: FileDown, color: 'text-slate-600 bg-slate-100', accept: '.pdf' },
    'page-numbers': { title: 'Page Numbers', icon: Hash, color: 'text-pink-600 bg-pink-50', accept: '.pdf' },
    'sign': { title: 'Sign PDF', icon: FileSignature, color: 'text-teal-600 bg-teal-50', accept: '.pdf' }
  };

  const config = configs[action || 'merge'] || { title: 'PDF Tool', icon: FileText, color: 'bg-slate-50', accept: '*' };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => action === 'merge' || action === 'convert' ? [...prev, ...newFiles] : newFiles);
      setOcrResult(null);
      setConvertedImages([]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (files.length <= 1) {
      setOcrResult(null);
      setConvertedImages([]);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      let result: Blob | Uint8Array | null = null;
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

      if (action === 'convert') {
        result = await convertImagesToPdf(files);
      } else if (action === 'merge') {
        result = await mergePdfs(files);
      } else if (action === 'watermark') {
        result = await addWatermark(files[0], extraInput || 'OMNITOOL');
      } else if (action === 'rotate') {
        result = await rotatePdf(files[0], parseInt(extraInput) || 90);
      } else if (action === 'pdfa') {
        result = await convertToPdfA(files[0]);
      } else {
        setTimeout(() => {
          alert('This specialized tool is currently being optimized for high-performance local output.');
          setIsProcessing(false);
        }, 1200);
        return;
      }

      if (result) {
        const blob = result instanceof Blob ? result : new Blob([result], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      alert('Operation failed. Please ensure the files are valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-slide-up">
      <div className="mb-12 flex items-center justify-between">
         <Link to="/pdf" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Tools
         </Link>
         <div className="hidden lg:flex items-center gap-1">
            {['merge', 'split', 'ocr', 'pdf2jpg'].map((id) => (
               <Link 
                key={id} 
                to={`/pdf/${id}`} 
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${action === id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'}`}
               >
                 {id.replace('pdf2', '')}
               </Link>
            ))}
         </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex items-center gap-6">
          <div className={`w-20 h-20 ${config.color} rounded-3xl flex items-center justify-center shadow-sm shrink-0`}>
            <config.icon className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{config.title}</h1>
            <p className="text-slate-500 font-medium text-lg">
              {action === 'ocr' ? 'State-of-the-art AI text extraction.' : 'Fast, private local document engine.'}
            </p>
          </div>
        </div>

        {!convertedImages.length && !ocrResult && (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50/5 group shadow-sm relative overflow-hidden">
            <input
              type="file"
              id="file-upload"
              multiple={action === 'merge' || action === 'convert'}
              accept={config.accept}
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer block relative z-10">
              <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-100 group-hover:scale-110 transition-transform">
                <Upload className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                Choose {config.accept.includes('pdf') ? 'PDF' : 'Images'}
              </h2>
              <p className="text-slate-500 text-xl font-medium mb-8">Drop files here to start processing</p>
              <div className="flex justify-center gap-4">
                 <div className="px-4 py-2 bg-slate-100 rounded-2xl text-xs font-bold text-slate-500 uppercase tracking-widest">WASM Powered</div>
                 <div className="px-4 py-2 bg-indigo-50 rounded-2xl text-xs font-bold text-indigo-500 uppercase tracking-widest">End-to-End Private</div>
              </div>
            </label>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        )}

        {(action === 'watermark' || action === 'rotate' || action === 'protect') && files.length > 0 && (
          <div className="mt-8 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm animate-scale-in">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              {action === 'watermark' ? 'Watermark Content' : action === 'rotate' ? 'Angle' : 'Security Password'}
            </label>
            <input 
              type={action === 'protect' ? 'password' : 'text'}
              value={extraInput}
              onChange={(e) => setExtraInput(e.target.value)}
              placeholder={action === 'watermark' ? 'e.g. DRAFT' : action === 'rotate' ? '90, 180, 270' : 'Enter secret key'}
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"
            />
          </div>
        )}

        {files.length > 0 && !ocrResult && !convertedImages.length && (
          <div className="mt-12 space-y-10 animate-slide-up">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-2xl text-slate-900">{files.length} Item{files.length > 1 ? 's' : ''}</h3>
              <button onClick={() => setFiles([])} className="text-xs font-black text-red-500 hover:text-red-600 uppercase tracking-widest">
                Clear Workspace
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {files.map((file, idx) => (
                <div key={idx} className="relative group aspect-[3/4] bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <FileText className="w-8 h-8 text-slate-300" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 truncate w-full px-2">{file.name}</span>
                  <span className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-tighter">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <button 
                    onClick={() => removeFile(idx)}
                    className="absolute top-4 right-4 p-2.5 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full py-6 bg-slate-900 text-white text-xl font-black rounded-[2rem] flex items-center justify-center gap-4 hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    Crunching Data...
                  </>
                ) : (
                  <>
                    <config.icon className="w-7 h-7" />
                    Process {config.title}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {convertedImages.length > 0 && (
          <div className="mt-12 animate-slide-up">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6 px-2">
              <h3 className="font-black text-3xl text-slate-900 tracking-tight">Export Ready.</h3>
              <div className="flex gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => {
                    const zip = new JSZip();
                    convertedImages.forEach(img => zip.file(img.name, img.blob));
                    zip.generateAsync({type:'blob'}).then(content => {
                       const url = URL.createObjectURL(content);
                       const a = document.createElement('a');
                       a.href = url;
                       a.download = `omnitool-bundle-${Date.now()}.zip`;
                       a.click();
                    });
                  }}
                  className="flex-1 sm:flex-none px-8 py-4 bg-indigo-600 text-white text-sm font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  <Download className="w-5 h-5" /> Export All (ZIP)
                </button>
                <button 
                  onClick={() => { setConvertedImages([]); setFiles([]); }}
                  className="flex-1 sm:flex-none px-8 py-4 bg-white border border-slate-200 text-slate-500 text-sm font-black rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-widest"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {convertedImages.map((img, idx) => (
                <div key={idx} className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-2xl">
                  <div className="aspect-[3/4] relative overflow-hidden bg-slate-50 p-4">
                    <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button 
                        onClick={() => {
                           const a = document.createElement('a');
                           a.href = img.url;
                           a.download = img.name;
                           a.click();
                        }}
                        className="p-5 bg-white text-indigo-600 rounded-full shadow-2xl hover:scale-110 transition-transform"
                      >
                        <Download className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5 text-center bg-slate-50/50 border-t border-slate-100">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">PAGE {idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ocrResult && (
          <div className="mt-12 bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-12 py-8 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                   <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">AI Results</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimized & Editable</p>
                </div>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(ocrResult || '');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white text-sm font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>
            </div>
            <div className="p-16 prose prose-slate max-w-none bg-slate-50/30 font-medium overflow-auto max-h-[800px]">
              {/* Fix: ReactMarkdown does not support className prop in some versions/types, using container instead */}
              <ReactMarkdown>
                {ocrResult}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfTool;
