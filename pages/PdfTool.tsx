
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Upload, X, Download, Loader2, 
  Combine, Scissors, RotateCw, Stamp, ShieldAlert, Search, Copy, Check, Archive, Image as ImageIcon,
  ChevronRight, Trash2, Hash, FileDown, Wrench, FileSignature
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
    'ocr': { title: 'OCR PDF', icon: Search, color: 'text-indigo-600 bg-indigo-50', accept: '.pdf,image/*' },
    'pdfa': { title: 'PDF to PDF/A', icon: Archive, color: 'text-slate-700 bg-slate-100', accept: '.pdf' },
    'pdf2jpg': { title: 'PDF to JPG', icon: ImageIcon, color: 'text-amber-600 bg-amber-50', accept: '.pdf' },
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

  const copyToClipboard = () => {
    if (ocrResult) {
      navigator.clipboard.writeText(ocrResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadImage = (img: { name: string, url: string }) => {
    const a = document.createElement('a');
    a.href = img.url;
    a.download = img.name;
    a.click();
  };

  const downloadAllAsZip = async () => {
    if (convertedImages.length === 0) return;
    const zip = new JSZip();
    convertedImages.forEach(img => {
      zip.file(img.name, img.blob);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnitool-images-${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
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

      // Logic for actual processing
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
        // Placeholder for other complex actions
        setTimeout(() => {
          alert('This specialized tool is currently being optimized for high-performance browser output. Check back soon!');
          setIsProcessing(false);
        }, 1500);
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

  useEffect(() => {
    return () => {
      convertedImages.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, [convertedImages]);

  // Sidebar navigation
  const quickSwitch = [
    { id: 'merge', icon: Combine, label: 'Merge' },
    { id: 'split', icon: Scissors, label: 'Split' },
    { id: 'ocr', icon: Search, label: 'OCR' },
    { id: 'pdf2jpg', icon: ImageIcon, label: 'PDF to JPG' },
    { id: 'convert', icon: FileText, label: 'JPG to PDF' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col lg:flex-row gap-12">
      {/* Sidebar - Quick Switcher */}
      <aside className="lg:w-64 hidden lg:block">
        <div className="sticky top-28 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Quick Switch</h3>
          <nav className="space-y-1">
            {quickSwitch.map((item) => (
              <Link
                key={item.id}
                to={`/pdf/${item.id}`}
                onClick={() => {
                   setFiles([]);
                   setOcrResult(null);
                   setConvertedImages([]);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  action === item.id ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            <Link 
              to="/pdf" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              All Tools
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 ${config.color} rounded-2xl flex items-center justify-center shadow-sm`}>
              <config.icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">{config.title}</h1>
              <p className="text-slate-500 font-medium">
                {action === 'ocr' ? 'AI-powered text extraction & conversion.' : 'High-speed local processing engine.'}
              </p>
            </div>
          </div>
          <Link 
            to="/pdf" 
            className="lg:hidden p-2 text-indigo-600 font-bold text-sm flex items-center gap-1"
          >
            Change Tool
          </Link>
        </div>

        {!convertedImages.length && !ocrResult && (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50/10 group shadow-sm">
            <input
              type="file"
              id="file-upload"
              multiple={action === 'merge' || action === 'convert'}
              accept={config.accept}
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">
                Select {config.accept.includes('pdf') ? 'PDF' : 'Images'}
              </div>
              <p className="text-slate-500 text-lg">Or drag and drop your files here</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                 <span className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase text-slate-400 rounded-full tracking-widest">Supports {config.accept}</span>
                 <span className="px-3 py-1 bg-indigo-50 text-[10px] font-black uppercase text-indigo-400 rounded-full tracking-widest">Max 256MB</span>
              </div>
            </label>
          </div>
        )}

        {(action === 'watermark' || action === 'rotate' || action === 'protect') && files.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
              {action === 'watermark' ? 'Watermark Text' : action === 'rotate' ? 'Rotation Angle' : 'Password'}
            </label>
            <input 
              type={action === 'protect' ? 'password' : 'text'}
              value={extraInput}
              onChange={(e) => setExtraInput(e.target.value)}
              placeholder={action === 'watermark' ? 'e.g. DRAFT' : action === 'rotate' ? '90, 180, 270' : 'Enter secret key'}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>
        )}

        {files.length > 0 && !ocrResult && !convertedImages.length && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between px-4">
              <h3 className="font-black text-xl text-slate-900">{files.length} Files Uploaded</h3>
              <button onClick={() => setFiles([])} className="text-sm font-bold text-red-500 hover:text-red-600 uppercase tracking-widest">
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file, idx) => (
                <div key={idx} className="relative group aspect-[3/4] bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 flex flex-col items-center justify-center text-center transition-all hover:border-indigo-200">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-indigo-300" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 truncate w-full px-2">{file.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <button 
                    onClick={() => removeFile(idx)}
                    className="absolute top-3 right-3 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
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
                className="w-full py-5 bg-indigo-600 text-white text-lg font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing with OmniAI...
                  </>
                ) : (
                  <>
                    <config.icon className="w-6 h-6" />
                    {config.title} Now
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {convertedImages.length > 0 && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
              <h3 className="font-black text-2xl text-slate-900">{convertedImages.length} Pages Extracted</h3>
              <div className="flex gap-4">
                <button 
                  onClick={downloadAllAsZip}
                  className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                >
                  <Download className="w-4 h-4" />
                  Bulk Export (ZIP)
                </button>
                <button 
                  onClick={() => {
                    setConvertedImages([]);
                    setFiles([]);
                  }}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-500 text-sm font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {convertedImages.map((img, idx) => (
                <div key={idx} className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-indigo-300">
                  <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                    <img src={img.url} alt={img.name} className="w-full h-full object-contain p-2" />
                    <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button 
                        onClick={() => downloadImage(img)}
                        className="p-4 bg-white text-indigo-600 rounded-full shadow-2xl hover:scale-110 transition-transform"
                      >
                        <Download className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 text-center border-t border-slate-50 bg-slate-50/50">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">PAGE {idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ocrResult && (
          <div className="mt-12 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 ring-1 ring-slate-100">
            <div className="px-10 py-6 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">AI OCR Result</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ready to Copy & Edit</p>
                </div>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button 
                  onClick={copyToClipboard}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy All'}
                </button>
                <button 
                  onClick={() => {
                    setOcrResult(null);
                    setFiles([]);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-400 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
            <div className="p-12 prose prose-slate max-w-none overflow-auto max-h-[700px] bg-slate-50/30">
              <ReactMarkdown className="markdown-content">
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
