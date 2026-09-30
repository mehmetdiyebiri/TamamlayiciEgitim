import React, { useState } from 'react';
import { extractTextFromPDF, cleanExtractedText } from '../../utils/fileExtractor';
import { AntiRegressionReader } from './AntiRegressionReader';

export const PdfReaderView = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      try {
        const rawText = await extractTextFromPDF(e.target.files[0]);
        setText(cleanExtractedText(rawText));
      } catch (err) {
        alert("PDF okunurken hata oluştu.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <h2 className="text-2xl font-bold mb-4">PDF Yükle ve Pratik Yap</h2>
      <input type="file" accept="application/pdf" onChange={handleFile} className="mb-4" />
      {loading && <div className="text-indigo-600 font-bold mb-4">PDF İşleniyor... Lütfen bekleyin.</div>}
      
      {text && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Okuma Modu (Kaybolan Metin)</h3>
          <AntiRegressionReader text={text.slice(0, 1000) + '...'} wpm={300} mode="blur" />
        </div>
      )}
    </div>
  );
};
