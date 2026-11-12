import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import {
    getStudentHizliOkumaRecord,
    updateStudentCourseProgress,
    recordSpeedReadingSession
} from '../../data/hizliOkumaService';
import { resolveActiveStudentIdentity } from './speedReadingTestHelper';

export const SmartCourse = ({ state, actions, level }: any) => {
    const { activeSchoolId, classes } = state || {};
    const { studentName, studentClass } = resolveActiveStudentIdentity(state);

    const [record, setRecord] = useState(() =>
        getStudentHizliOkumaRecord(activeSchoolId, studentName, studentClass, classes)
    );
    const [selectedDay, setSelectedDay] = useState<number>(record.courseDay || 1);

    useEffect(() => {
        const fresh = getStudentHizliOkumaRecord(activeSchoolId, studentName, studentClass, classes);
        setRecord(fresh);
        setSelectedDay(fresh.courseDay || 1);
    }, [activeSchoolId, studentName, studentClass, classes]);

    const plan = [
        { day: 1, title: 'Görme Alanı & Takistoskop', desc: 'Karel egzersizinde 3 dakika, Takistoskop ile 2 dakika pratik.', tool: 'vision_exercises' },
        { day: 2, title: 'Blok Okuma Temelleri', desc: '2 kelimelik bloklarla 5 dakika okuma pratiği.', tool: 'block' },
        { day: 3, title: 'Dikkat ve Odaklanma', desc: 'Metin içinde arama ve tek/çift egzersizi.', tool: 'attention_exercises' },
        { day: 4, title: 'Gölgeleme & Gruplama', desc: 'Kaybolan metin moduyla Gölgeleme egzersizi.', tool: 'shadow_reading' },
        { day: 5, title: 'Göz Kaslarını Hızlandırma', desc: 'Zigzag ve kolonlar göz egzersizleri.', tool: 'eye_exercises' },
        { day: 6, title: 'Schulte Tabloları', desc: '4x4 tablolarda 3 dakika çalışma.', tool: 'schulte' },
        { day: 7, title: '1. Hafta Değerlendirme Testi', desc: 'Okuma hızı ve anlama oranını ölç.', tool: 'speed_test' },
        { day: 8, title: '3 Kelime Blok Okuma', desc: '3 kelimelik gruplarla ritmik göz sıçraması.', tool: 'block' },
        { day: 9, title: '13 Nokta Yıldız Göz Egzersizi', desc: 'Çevresel görüş ve odak genişletme.', tool: 'eye_exercises' },
        { day: 10, title: 'İleri Takistoskop (100 milisaniye)', desc: 'Hızlı kelime yakalama ve görsel hafıza.', tool: 'tachistoscope' },
        { day: 11, title: 'Odak Vurgulu (Biyonik) Okuma', desc: 'Kelime odak noktalarıyla hızlı algılama.', tool: 'bionic' },
        { day: 12, title: 'Geri Dönüşsüz Okuma', desc: 'Kaybolan metin okuyucu ile geriye dönmeden akıcı takip.', tool: 'antiregression' },
        { day: 13, title: 'Çalışma Belleği Matrisi', desc: 'Görsel bellek kapasitesini güçlendirme.', tool: 'working_memory' },
        { day: 14, title: '2. Hafta Değerlendirme Testi', desc: 'Haftalık hız ve anlama gelişim ölçümü.', tool: 'speed_test' },
        { day: 15, title: '4 Kelime Blok Okuma', desc: 'Geniş bloklarla yüksek hızlı okuma.', tool: 'block' },
        { day: 16, title: 'Ponte (Dairesel) Göz Takibi', desc: 'Sayfa üzerinde dikey ve dairesel tarama.', tool: 'eye_exercises' },
        { day: 17, title: 'Silinerek Gruplama Çalışması', desc: 'Seviye 3 hızında gruplama pratiği.', tool: 'grouping' },
        { day: 18, title: 'Schulte İleri Seviye', desc: 'Merkez odaklı çevresel algı hızlandırma.', tool: 'schulte' },
        { day: 19, title: 'Gölgeleme Hız Antrenmanı', desc: '0.25 sn hızında gölgeleme çalışması.', tool: 'shadow_reading' },
        { day: 20, title: 'Genel Tekrar ve Odak', desc: 'Dikkat ve görme alanı kombine antrenman.', tool: 'vision_exercises' },
        { day: 21, title: 'Mezuniyet Hızlı Okuma Testi', desc: '21 günlük kamp sonu final hız ve anlama testi.', tool: 'speed_test' },
    ];

    const currentDay = record.courseDay || 1;
    const activeTask = plan.find((p) => p.day === selectedDay) || plan[Math.min(currentDay - 1, plan.length - 1)];
    const isDayCompleted = (record.completedCourseDays || []).includes(activeTask.day) && activeTask.day < currentDay;

    const handleMarkComplete = (dayNum: number) => {
        const updated = updateStudentCourseProgress(activeSchoolId, studentName, studentClass, dayNum, classes);
        recordSpeedReadingSession(
            activeSchoolId,
            studentName,
            studentClass,
            {
                type: 'smart_course',
                typeLabel: '21 Günlük Kurs',
                title: `${dayNum}. Gün: ${activeTask.title}`,
                durationSeconds: 300,
                details: `21 Günlük Akıllı Kurs ${dayNum}. gün görevi tamamlandı`
            },
            classes
        );
        setRecord(updated);
        setSelectedDay(updated.courseDay);
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <Target className="text-orange-500" size={32} /> 21 Günlük Akıllı Kurs
                    </h3>
                    <p className="text-slate-500 font-medium mt-2">
                        <strong>{record.studentName}</strong> ({record.className}) • Seviye: <strong>{level || record.level}</strong>
                    </p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-2xl text-center shadow-sm">
                    <div className="text-orange-600 font-bold text-xs uppercase tracking-wide">Mevcut Kurs Günü</div>
                    <div className="text-3xl font-black text-orange-700">{currentDay} / 21</div>
                    <div className="text-[11px] font-bold text-orange-600 mt-0.5">%{Math.round((currentDay / 21) * 100)} Tamamlandı</div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 relative shadow-inner">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-black text-slate-800 text-lg">{activeTask.day}. Gün Görevi:</h4>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                        {isDayCompleted ? 'Tamamlandı' : 'Aktif Görev'}
                    </span>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="font-bold text-xl text-indigo-600 mb-2">{activeTask.title}</div>
                        <p className="text-slate-600 font-medium">{activeTask.desc}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button 
                            onClick={() => actions.setActiveTab(activeTask.tool)}
                            className="bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
                        >
                            <PlayCircle size={20} /> Egzersizi Aç
                        </button>
                        {!isDayCompleted && (
                            <button
                                onClick={() => handleMarkComplete(activeTask.day)}
                                className="bg-emerald-600 text-white px-5 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 transition-colors shadow-md cursor-pointer"
                            >
                                <CheckCircle2 size={20} /> Günü Tamamla
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-slate-700 mb-4 px-2">21 Günlük Kamp Müfredatı</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {plan.map((item) => {
                        const isPast = item.day < currentDay;
                        const isCurrent = item.day === currentDay;
                        const isFuture = item.day > currentDay;

                        return (
                            <div
                                key={item.day}
                                onClick={() => !isFuture && setSelectedDay(item.day)}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                                    !isFuture ? 'cursor-pointer' : 'opacity-60'
                                } ${
                                    selectedDay === item.day
                                        ? 'bg-indigo-50 border-indigo-300 shadow-sm'
                                        : isCurrent
                                        ? 'bg-orange-50/60 border-orange-200'
                                        : isPast
                                        ? 'bg-emerald-50/30 border-emerald-100'
                                        : 'bg-white border-slate-100'
                                }`}
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black shrink-0 text-sm ${
                                    isCurrent ? 'bg-orange-500 text-white' : 
                                    isPast ? 'bg-emerald-500 text-white' : 
                                    'bg-slate-100 text-slate-400'
                                }`}>
                                    {isPast ? <CheckCircle2 size={20} /> : `${item.day}.`}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`font-bold text-sm truncate ${isCurrent ? 'text-orange-900' : 'text-slate-700'}`}>{item.title}</div>
                                    <div className="text-xs text-slate-400 truncate">{item.desc}</div>
                                </div>
                                
                                {isFuture && (
                                    <div className="text-slate-300 px-2">
                                        <Lock size={18} />
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
