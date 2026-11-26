import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, TrendingUp, Target } from 'lucide-react';
import { getStudentHizliOkumaRecord, StudentHizliOkumaRecord } from '../../data/hizliOkumaService';
import { resolveActiveStudentIdentity } from './speedReadingTestHelper';

export const AICoach = ({ state, actions }: any) => {
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

    const recommendedTool =
        record.avgComp < 65 ? 'grouping' : record.currentWpm < 160 ? 'block' : 'eye_exercises';
    const recommendedTitle =
        record.avgComp < 65
            ? 'Gruplama ve Anlam Bütünlüğü Çalışması'
            : record.currentWpm < 160
            ? 'Blok Okuma Çalışması'
            : '13 Nokta Göz Kasları & Takistoskop';

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <BrainCircuit className="text-cyan-600" /> Bireysel Hızlı Okuma Koçu
                </h3>
                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 font-bold text-xs border border-cyan-100">
                    {record.studentName} ({record.className})
                </span>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border border-cyan-100 relative overflow-hidden shadow-inner">
                <Sparkles className="absolute top-4 right-4 text-cyan-200" size={64} />
                <div className="relative z-10 space-y-4">
                    <p className="font-bold text-gray-800 text-lg">Merhaba {record.studentName.replace(/^\d+\s*-\s*/, '')}!</p>
                    <p className="text-gray-700 font-medium leading-relaxed">
                        Son test sonuçlarını inceledim. Başlangıçtaki dakikada <strong>{record.initialWpm} kelime</strong> okuma hızın şu anda{' '}
                        <strong>{record.currentWpm} kelime/dakika</strong> seviyesine ulaştı (<strong>+%{record.growthRate} gelişim</strong>).
                        Anlama oranın ise ortalama <strong>%{record.avgComp}</strong> düzeyinde.
                    </p>
                    <p className="text-gray-700 font-medium leading-relaxed">
                        Hedeflenen <strong>{record.targetWpm} kelime/dakika</strong> okuma hızına emin adımlarla ulaşmak için önümüzdeki 3 gün boyunca{' '}
                        <strong className="text-cyan-700">"{recommendedTitle}"</strong> egzersizine ağırlık vermeni öneriyorum.
                        {record.teacherNote && (
                            <span className="block mt-3 p-3 bg-white/80 rounded-xl border border-cyan-200 text-cyan-900 font-semibold text-sm">
                                <strong>Öğretmen Notu:</strong> {record.teacherNote}
                            </span>
                        )}
                    </p>
                    
                    <button 
                        onClick={() => actions.setActiveTab && actions.setActiveTab(recommendedTool)}
                        className="mt-4 bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-cyan-700 transition-colors shadow-sm cursor-pointer"
                    >
                        Önerilen Çalışmaya Git ({recommendedTitle})
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-blue-700">{record.currentWpm} Kelime/Dk</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Güncel Hız</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-emerald-700">%{record.currentComp}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Son Anlama</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-purple-700">+%{record.growthRate}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Hızlanma Oranı</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-amber-700">{record.courseDay} / 21</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Kurs Günü</div>
                </div>
            </div>
        </div>
    );
};
