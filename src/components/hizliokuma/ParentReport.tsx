import React, { useState, useEffect } from 'react';
import { BarChart3, Users, TrendingUp, Download, Loader2, Award, Clock, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { getStudentHizliOkumaRecord, StudentHizliOkumaRecord } from '../../data/hizliOkumaService';
import { resolveActiveStudentIdentity } from './speedReadingTestHelper';

export const ParentReport = ({ state, actions }: any) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const { activeSchoolId, classes } = state || {};
    const { studentName, studentClass } = resolveActiveStudentIdentity(state);

    const [record, setRecord] = useState<StudentHizliOkumaRecord>(() =>
        getStudentHizliOkumaRecord(activeSchoolId, studentName, studentClass, classes)
    );

    useEffect(() => {
        const refresh = () => {
            setRecord(getStudentHizliOkumaRecord(activeSchoolId, studentName, studentClass, classes));
        };
        refresh();
        window.addEventListener('hizli_okuma_updated', refresh);
        return () => window.removeEventListener('hizli_okuma_updated', refresh);
    }, [activeSchoolId, studentName, studentClass, classes]);

    const compDiff = record.currentComp - record.initialComp;

    const handleDownloadPdf = () => {
        try {
            setIsGenerating(true);
            const pdf = new jsPDF();
            
            // Header
            pdf.setFontSize(20);
            pdf.setTextColor(225, 29, 72);
            pdf.text(`Hizli Okuma Veli Gelisim Raporu`, 20, 22);

            pdf.setFontSize(11);
            pdf.setTextColor(71, 85, 105);
            pdf.text(`Ogrenci: ${record.studentName} (${record.className}) - Seviye: ${record.level}`, 20, 30);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(20, 35, 190, 35);
            
            // Boxes
            pdf.setFillColor(248, 250, 252);
            pdf.rect(20, 42, 78, 45, 'F');
            
            pdf.setFillColor(255, 241, 242);
            pdf.rect(112, 42, 78, 45, 'F');
            
            // Box 1 Content
            pdf.setFontSize(10);
            pdf.setTextColor(100, 116, 139);
            pdf.text("BASLANGIC DURUMU", 25, 52);
            
            pdf.setFontSize(12);
            pdf.setTextColor(51, 65, 85);
            pdf.text("Okuma Hizi:", 25, 65);
            pdf.setTextColor(15, 23, 42);
            pdf.text(`${record.initialWpm} Kelime/Dk`, 62, 65);
            
            pdf.setTextColor(51, 65, 85);
            pdf.text("Anlama Orani:", 25, 76);
            pdf.setTextColor(15, 23, 42);
            pdf.text(`%${record.initialComp}`, 62, 76);
            
            // Box 2 Content
            pdf.setFontSize(10);
            pdf.setTextColor(244, 63, 94);
            pdf.text("GUNCEL DURUM", 117, 52);
            
            pdf.setFontSize(12);
            pdf.setTextColor(159, 18, 57);
            pdf.text("Okuma Hizi:", 117, 65);
            pdf.setTextColor(136, 19, 55);
            pdf.text(`${record.currentWpm} Kelime/Dk (+%${record.growthRate})`, 147, 65);
            
            pdf.setTextColor(159, 18, 57);
            pdf.text("Anlama Orani:", 117, 76);
            pdf.setTextColor(136, 19, 55);
            pdf.text(`%${record.currentComp} (${compDiff >= 0 ? '+' : ''}%${compDiff})`, 147, 76);
            
            // Tamamlanan Calismalar
            pdf.setFontSize(14);
            pdf.setTextColor(16, 185, 129);
            pdf.text("Tamamlanan Calismalar", 20, 105);
            
            pdf.setFontSize(11);
            pdf.setTextColor(71, 85, 105);
            pdf.text(`* ${record.exerciseCounts.speedTests}x Hiz Okuma Testi`, 25, 115);
            pdf.text(`* ${record.exerciseCounts.blockReading}x Blok Okuma`, 25, 123);
            pdf.text(`* ${record.exerciseCounts.eyeExercises}x Goz Egzersizi`, 95, 115);
            pdf.text(`* 21 Gunluk Kurs (Gun ${record.courseDay}/21)`, 95, 123);
            
            // Oneriler
            pdf.setFillColor(239, 246, 255);
            pdf.rect(20, 136, 170, 52, 'F');
            
            pdf.setFontSize(13);
            pdf.setTextColor(30, 64, 175);
            pdf.text("Veli & Ogretmen Degerlendirmesi", 25, 148);
            
            pdf.setFontSize(10.5);
            pdf.setTextColor(29, 78, 216);
            const noteText = record.teacherNote
                ? record.teacherNote
                : `Ogrencimiz dakikada ${record.initialWpm} kelime baslangic hizindan ${record.currentWpm} kelime/dk duzeyine ulasarak %${record.growthRate} gelisim gostermistir. Anlama orani %${record.avgComp} seviyesindedir. Evde gunluk 15 dakikalik blok okuma ve ana fikir ozetleme pratikleri yapilmasi kalici basariyi destekleyecektir.`;
            const lines = pdf.splitTextToSize(noteText, 160);
            pdf.text(lines, 25, 158);
            
            pdf.save(`${record.studentName.replace(/\s+/g, '_')}_Hizli_Okuma_Raporu.pdf`);
        } catch (error) {
            console.error('PDF generation error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <BarChart3 className="text-rose-600" /> Gelişim ve Veli Raporu
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Öğrenci: <strong className="text-gray-800">{record.studentName}</strong> ({record.className}) • Seviye: <strong className="text-indigo-600">{record.level}</strong>
                    </p>
                </div>
                <button 
                    onClick={handleDownloadPdf} 
                    disabled={isGenerating}
                    className="pdf-btn text-sm font-bold text-rose-600 bg-rose-50 px-4 py-2.5 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100 flex items-center gap-2 cursor-pointer"
                >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {isGenerating ? 'Hazırlanıyor...' : 'PDF Rapor İndir'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Başlangıç Durumu</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Okuma Hızı</span>
                            <span className="font-black text-gray-900">{record.initialWpm} Kelime/Dk</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Anlama Oranı</span>
                            <span className="font-black text-gray-900">%{record.initialComp}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                    <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-4">Güncel Durum</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-rose-800">Okuma Hızı</span>
                            <span className="font-black text-rose-900 text-lg">
                                {record.currentWpm} Kelime/Dk{' '}
                                <span className="text-xs text-emerald-600 font-black">
                                    ({record.growthRate >= 0 ? '+' : ''}%{record.growthRate})
                                </span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-rose-800">Anlama Oranı</span>
                            <span className="font-black text-rose-900 text-lg">
                                %{record.currentComp}{' '}
                                <span className="text-xs text-emerald-600 font-black">
                                    ({compDiff >= 0 ? '+' : ''}%{compDiff})
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4">Hedef & Rekor</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-indigo-800">En Yüksek Hız</span>
                            <span className="font-black text-indigo-900 text-lg">{record.bestWpm} Kelime/Dk</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-indigo-800">Hedef Hız</span>
                            <span className="font-black text-indigo-900 text-lg">{record.targetWpm} Kelime/Dk</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-500" /> Tamamlanan Çalışmalar ({record.exerciseCounts.total} Egzersiz)
                </h4>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">{record.exerciseCounts.speedTests}x Hız Testi</span>
                    <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-100">{record.exerciseCounts.blockReading}x Blok Okuma</span>
                    <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-100">{record.exerciseCounts.eyeExercises}x Göz Egzersizi</span>
                    <span className="px-3.5 py-1.5 bg-purple-50 text-purple-700 font-bold text-xs rounded-full border border-purple-100">{record.exerciseCounts.tachistoscope}x Takistoskop</span>
                    <span className="px-3.5 py-1.5 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-100">21 Günlük Kurs (Gün {record.courseDay}/21)</span>
                </div>
            </div>

            {/* Son Çalışma Geçmişi */}
            <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <Clock size={18} className="text-blue-500" /> Son Test ve Egzersiz Kayıtları
                </h4>
                <div className="space-y-2.5">
                    {record.sessions.slice(0, 5).map((sess) => (
                        <div key={sess.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 gap-2">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                <div>
                                    <div className="font-bold text-gray-800 text-sm">{sess.title}</div>
                                    <div className="text-xs text-gray-500 font-medium">{sess.typeLabel} • {sess.formattedDate}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {sess.wpm && (
                                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800 font-black text-xs">{sess.wpm} Kelime/Dk</span>
                                )}
                                {typeof sess.comprehension === 'number' && (
                                    <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">%{sess.comprehension} Anlama</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-6">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Users size={16}/> Veli & Öğretmen Değerlendirmesi</h4>
                <p className="text-sm text-blue-700 font-medium leading-relaxed">
                    {record.teacherNote ? (
                        record.teacherNote
                    ) : (
                        <>
                            Öğrencimizin okuma hızı dakikada <strong>{record.initialWpm} kelime</strong> seviyesinden <strong>{record.currentWpm} kelime/dakika</strong> seviyesine yükselerek <strong>%{record.growthRate}</strong> oranında gelişim göstermiştir. Ortalama anlama başarısı <strong>%{record.avgComp}</strong> düzeyindedir. Evde birlikte kitap okurken metnin ana fikrini özetleme çalışmaları yapmak ve akşamları 15 dakikalık serbest okuma saatleri düzenlemek kalıcı gelişimi hızlandıracaktır.
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};
