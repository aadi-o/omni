
import { jsPDF } from "jspdf";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

export const convertImagesToPdf = async (images: File[]): Promise<Blob> => {
  const pdf = new jsPDF();
  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const imgData = await fileToDataUrl(file);
    if (i > 0) pdf.addPage();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }
  return pdf.output('blob');
};

export const mergePdfs = async (files: File[]): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
};

export const protectPdf = async (file: File, password: string): Promise<Uint8Array> => {
  const pdfBytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(pdfBytes);
  return await pdf.save();
};

export const addWatermark = async (file: File, text: string): Promise<Uint8Array> => {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - 100,
      y: height / 2,
      size: 50,
      font: helveticaFont,
      color: rgb(0.7, 0.7, 0.7),
      rotate: degrees(45),
      opacity: 0.3,
    });
  });
  return await pdfDoc.save();
};

export const rotatePdf = async (file: File, rotationDegrees: number): Promise<Uint8Array> => {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  pages.forEach(page => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + rotationDegrees));
  });
  return await pdfDoc.save();
};

export const convertToPdfA = async (file: File): Promise<Uint8Array> => {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  pdfDoc.setTitle(`Archived_${file.name}`);
  pdfDoc.setAuthor("OmniTool AI Studio");
  pdfDoc.setSubject("Long-term Archive (PDF/A)");
  pdfDoc.setKeywords(["archive", "pdfa", "omnitool"]);
  pdfDoc.setProducer("OmniTool AI PDF Engine");
  pdfDoc.setCreator("OmniTool AI Studio");
  
  return await pdfDoc.save();
};

export const convertPdfToJpg = async (file: File): Promise<{ name: string, blob: Blob }[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: { name: string, blob: Blob }[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for quality
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    if (blob) {
      images.push({ 
        name: `${file.name.replace('.pdf', '')}_page_${i}.jpg`,
        blob 
      });
    }
  }

  return images;
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
