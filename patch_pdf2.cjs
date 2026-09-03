const fs = require('fs');
const file = 'src/components/hizliokuma/ParentReport.tsx';
let content = fs.readFileSync(file, 'utf-8');

const replacement = `import React, { useRef, useState } from 'react';
import { BarChart3, Users, TrendingUp, Download, Loader2 } from 'lucide-react';
// We use html2canvas and jspdf since html2pdf.js might have bundling issues in vite
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ParentReport = ({ state, actions }: any) => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPdf = async () => {
        if (!reportRef.current || isGenerating) return;
        
        try {
            setIsGenerating(true);
            const element = reportRef.current;
            
            // Temporarily hide the button
            const btn = element.querySelector('.pdf-btn');
            if (btn) (btn as HTMLElement).style.visibility = 'hidden';

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            if (btn) (btn as HTMLElement).style.visibility = 'visible';

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'JPEG', 0, 10, pdfWidth, pdfHeight);
            pdf.save('Veli_Gelisim_Raporu.pdf');
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('PDF oluşturulurken bir hata oluştu.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div ref={reportRef} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 relative">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="text-rose-600" /> Veli Gelişim Raporu
                </h3>
                <button 
                    onClick={handleDownloadPdf} 
                    disabled={isGenerating}
                    className="pdf-btn text-sm font-bold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100 flex items-center gap-2"
                >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {isGenerating ? 'Hazırlanıyor...' : 'PDF İndir'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Başlangıç Durumu</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Okuma Hızı</span>
                            <span className="font-black text-gray-900">120 WPM</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Anlama Oranı</span>
                            <span className="font-black text-gray-900">%50</span>
                        </div>
                    </div>
                </div>
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                    <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-4">Güncel Durum</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-rose-800">Okuma Hızı</span>
                            <span className="font-black text-rose-900 text-lg">240 WPM <span className="text-xs text-emerald-600">(+%100)</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-rose-800">Anlama Oranı</span>
                            <span className="font-black text-rose-900 text-lg">%60 <span className="text-xs text-emerald-600">(+%10)</span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-500" /> Tamamlanan Çalışmalar
                </h4>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 font-semibold text-xs rounded-full border border-gray-200">12x Hız Testi</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 font-semibold text-xs rounded-full border border-gray-200">8x Blok Okuma</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 font-semibold text-xs rounded-full border border-gray-200">15x Göz Egzersizi</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-semibold text-xs rounded-full border border-emerald-100">21 Günlük Kurs (Gün 4)</span>
                </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-6">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Users size={16}/> Veli İçin Öneriler</h4>
                <p className="text-sm text-blue-700 font-medium leading-relaxed">
                    Öğrencimizin okuma hızı çok iyi bir ivmeyle artıyor. Ancak hızlı okurken metnin ana fikrini kaçırmaması için, evde birlikte kitap okurken ona <strong>"Bu sayfada yazar ne anlatmak istemiş?"</strong> gibi sorular sorarak anlama oranını destekleyebilirsiniz. Akşamları 15 dakikalık serbest okuma saatleri düzenlemek kalıcı gelişimi hızlandıracaktır.
                </p>
            </div>
        </div>
    );
};
`;

fs.writeFileSync(file, replacement);
console.log('Rewrote ParentReport to use html2canvas + jspdf for downloading.');
