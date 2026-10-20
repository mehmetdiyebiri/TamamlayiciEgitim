import React, { useState } from 'react';
import { Target, CheckCircle2, ChevronRight, PlayCircle, Lock } from 'lucide-react';

export const SmartCourse = ({ state, actions, level }: any) => {
    // In a real app, this state would come from DB. We'll mock it here.
    const [currentDay, setCurrentDay] = useState(1);
    const [completedToday, setCompletedToday] = useState(false);

    const plan = [
        { day: 1, title: 'Görme Alanı & Takistoskop', desc: 'Karel egzersizinde 3 dakika, Takistoskop ile 2 dakika pratik.', tool: 'vision_exercises' },
        { day: 2, title: 'Blok Okuma Temelleri', desc: '2 kelimelik bloklarla 5 dakika okuma pratiği.', tool: 'block' },
        { day: 3, title: 'Dikkat ve Odaklanma', desc: 'Metin içinde arama ve tek/çift egzersizi.', tool: 'attention_exercises' },
        { day: 4, title: 'Gölgeleme & Gruplama', desc: 'Kaybolan metin moduyla Gölgeleme egzersizi.', tool: 'shadow_reading' },
        { day: 5, title: 'Göz Kaslarını Hızlandırma', desc: 'Zigzag ve kolonlar göz egzersizleri.', tool: 'eye_exercises' },
        { day: 6, title: 'Schulte Tabloları', desc: '4x4 tablolarda 3 dakika çalışma.', tool: 'schulte' },
        { day: 7, title: 'Haftalık Değerlendirme Testi', desc: 'Okuma hızı ve anlama oranını ölç.', tool: 'speed_test' },
    ];

    const todayTask = plan[Math.min(currentDay - 1, plan.length - 1)];

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <Target className="text-orange-500" size={32} /> 21 Günlük Akıllı Kurs
                    </h3>
                    <p className="text-slate-500 font-medium mt-2">
                        Seviyenize (<strong>{level || 'Başlangıç'}</strong>) özel oluşturulmuş otomatik çalışma programı.
                    </p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-2xl text-center shadow-sm">
                    <div className="text-orange-600 font-bold text-sm uppercase tracking-wide">Mevcut Durum</div>
                    <div className="text-3xl font-black text-orange-700">{currentDay}. Gün</div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 relative shadow-inner">
                <h4 className="font-black text-slate-800 text-lg mb-6">Bugünün Görevi:</h4>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="font-bold text-xl text-indigo-600 mb-2">{todayTask.title}</div>
                        <p className="text-slate-600 font-medium">{todayTask.desc}</p>
                    </div>
                    
                    {!completedToday ? (
                        <button 
                            onClick={() => actions.setActiveTab(todayTask.tool)}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shrink-0"
                        >
                            <PlayCircle size={24} /> Göreve Başla
                        </button>
                    ) : (
                        <div className="bg-emerald-100 text-emerald-700 px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                            <CheckCircle2 size={24} /> Tamamlandı
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h4 className="font-bold text-slate-700 mb-4 px-2">Kurs Planı (İlk Hafta)</h4>
                <div className="space-y-3">
                    {plan.map((item, idx) => {
                        const isPast = item.day < currentDay;
                        const isCurrent = item.day === currentDay;
                        const isFuture = item.day > currentDay;

                        return (
                            <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                                isCurrent ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 
                                isPast ? 'bg-slate-50 border-slate-200 opacity-60' : 
                                'bg-white border-slate-100'
                            }`}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black shrink-0 ${
                                    isCurrent ? 'bg-indigo-600 text-white' : 
                                    isPast ? 'bg-emerald-500 text-white' : 
                                    'bg-slate-100 text-slate-400'
                                }`}>
                                    {isPast ? <CheckCircle2 size={24} /> : item.day}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-bold ${isCurrent ? 'text-indigo-800' : 'text-slate-700'}`}>{item.title}</div>
                                </div>
                                
                                {isFuture && (
                                    <div className="text-slate-300 px-4">
                                        <Lock size={20} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
