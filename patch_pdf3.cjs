const fs = require('fs');
const file = 'src/components/hizliokuma/ParentReport.tsx';

const content = `import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, Download, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

export const ParentReport = ({ state, actions }: any) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPdf = () => {
        try {
            setIsGenerating(true);
            const pdf = new jsPDF();
            
            // Header
            pdf.setFontSize(22);
            pdf.setTextColor(225, 29, 72); // rose-600
            pdf.text("Veli Gelisim Raporu", 20, 25);
            
            // Line separator
            pdf.setDrawColor(226, 232, 240);
            pdf.line(20, 32, 190, 32);
            
            // Boxes
            pdf.setFillColor(248, 250, 252); // slate-50
            pdf.rect(20, 40, 75, 45, 'F');
            
            pdf.setFillColor(255, 241, 242); // rose-50
            pdf.rect(115, 40, 75, 45, 'F');
            
            // Box 1 Content
            pdf.setFontSize(10);
            pdf.setTextColor(100, 116, 139);
            pdf.text("BASLANGIC DURUMU", 25, 50);
            
            pdf.setFontSize(12);
            pdf.setTextColor(51, 65, 85);
            pdf.text("Okuma Hizi:", 25, 65);
            pdf.setTextColor(15, 23, 42);
            pdf.text("120 WPM", 60, 65);
            
            pdf.setTextColor(51, 65, 85);
            pdf.text("Anlama Orani:", 25, 75);
            pdf.setTextColor(15, 23, 42);
            pdf.text("%50", 60, 75);
            
            // Box 2 Content
            pdf.setFontSize(10);
            pdf.setTextColor(244, 63, 94);
            pdf.text("GUNCEL DURUM", 120, 50);
            
            pdf.setFontSize(12);
            pdf.setTextColor(159, 18, 57);
            pdf.text("Okuma Hizi:", 120, 65);
            pdf.setTextColor(136, 19, 55);
            pdf.text("240 WPM (+%100)", 150, 65);
            
            pdf.setTextColor(159, 18, 57);
            pdf.text("Anlama Orani:", 120, 75);
            pdf.setTextColor(136, 19, 55);
            pdf.text("%60 (+%10)", 150, 75);
            
            // Tamamlanan Calismalar
            pdf.setFontSize(14);
            pdf.setTextColor(16, 185, 129); // emerald-500
            pdf.text("Tamamlanan Calismalar", 20, 105);
            
            pdf.setFontSize(11);
            pdf.setTextColor(71, 85, 105);
            pdf.text("* 12x Hiz Testi", 25, 115);
            pdf.text("* 8x Blok Okuma", 25, 122);
            pdf.text("* 15x Goz Egzersizi", 75, 115);
            pdf.text("* 21 Gunluk Kurs (Gun 4)", 75, 122);
            
            // Oneriler
            pdf.setFillColor(239, 246, 255); // blue-50
            pdf.rect(20, 135, 170, 50, 'F');
            
            pdf.setFontSize(14);
            pdf.setTextColor(30, 64, 175); // blue-800
            pdf.text("Veli Icin Oneriler", 25, 148);
            
            pdf.setFontSize(11);
            pdf.setTextColor(29, 78, 216); // blue-700
            const text = "Ogrencimizin okuma hizi cok iyi bir ivmeyle artiyor. Ancak hizli okurken metnin ana fikrini kacirmamasi icin, evde birlikte kitap okurken ona 'Bu sayfada yazar ne anlatmak istemis?' gibi sorular sorarak anlama oranini destekleyebilirsiniz. Aksamlari 15 dakikalik serbest okuma saatleri duzenlemek kalici gelisimi hizlandiracaktir.";
            const lines = pdf.splitTextToSize(text, 160);
            pdf.text(lines, 25, 158);
            
            pdf.save("Veli_Gelisim_Raporu.pdf");
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('PDF oluşturulurken bir hata oluştu.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 relative">
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

fs.writeFileSync(file, content);
console.log('Fixed PDF generation logic');
