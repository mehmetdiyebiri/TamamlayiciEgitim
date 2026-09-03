import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Map, Play, Award, Zap, BookOpen, Clock, Target, TrendingUp, CheckCircle2, AlertTriangle, ChevronRight, XCircle, RotateCcw, Timer, Trophy, Calculator, GraduationCap, ClipboardList } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MIT_CURRICULUM } from '../../data/mitCurriculum';
import { ProfileView } from './views/ProfileView';
import { DiagnosticView } from './views/DiagnosticView';
import { StudyRoomView } from './views/StudyRoomView';
import { MentalMathView } from './views/MentalMathView';
import { FormulaCardsView } from './views/FormulaCardsView';
import { FORMULAS } from '../../data/formulas';

export const StudentMitPanel = ({ state, actions }: any) => {
    const [grade, setGrade] = useState<5|6|7|8>(8);
    const [activeTab, setActiveTab] = useState('profil');

    const tabs = [
        { id: 'profil', name: 'Gelişim (LGS Yolcusu)', icon: TrendingUp },
        { id: 'tanilama', name: 'Seviye Tespit', icon: ClipboardList },
        { id: 'calisma', name: 'Çalışma Odası & Antrenör', icon: Brain },
        { id: 'zihin', name: 'Zihinden İşlem Merkezi', icon: Zap },
        { id: 'formul', name: 'Formül Kartları', icon: BookOpen },
        { id: 'harita', name: 'Kazanım Haritası', icon: Map }
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <GraduationCap className="text-indigo-600" size={32} />
                        M.İ.T Ortaokul & LGS
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Matematiği yaşayarak öğren, sınavlara eksiksiz hazırlan.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {[5, 6, 7, 8].map(g => (
                        <button 
                            key={g} 
                            onClick={() => setGrade(g as any)}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${grade === g ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            {g}. Sınıf
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 bg-white/50 rounded-3xl overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'profil' && <ProfileView key="profil" grade={grade} />}
                    {activeTab === 'tanilama' && <DiagnosticView key="tanilama" />}
                    {activeTab === 'calisma' && <StudyRoomView key="calisma" grade={grade} />}
                    {activeTab === 'zihin' && <MentalMathView key="zihin" grade={grade} />}
                    {activeTab === 'formul' && <FormulaCardsView key="formul" grade={grade} FORMULAS={FORMULAS} />}
                    {activeTab === 'harita' && <StudentMapView key="harita" grade={grade} />}
                </AnimatePresence>
            </div>
        </div>
    );
};

const StudentMapView = ({ grade }: { grade: number }) => {
    const curriculum = (MIT_CURRICULUM as any)[grade] || [];
    
    // Rastgele bir ilerleme simülasyonu (öğrencinin bitirdiği konular)
    const generateProgress = (val: string) => {
        let hash = 0;
        for (let i = 0; i < val.length; i++) hash = val.charCodeAt(i) + ((hash << 5) - hash);
        return Math.abs(hash % 100);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">{grade}. Sınıf Kazanım Haritası</h2>
            <p className="text-slate-500 font-medium">Bu ekranda {grade}. sınıf müfredatındaki tüm konuları ve senin hangi konuda ne kadar ilerlediğini görebilirsin.</p>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {curriculum.map((area: any, i: number) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <h3 className="font-black text-slate-800 text-lg mb-6">{area.area}</h3>
                            <div className="space-y-5">
                                {area.topics.map((topic: string, j: number) => {
                                    const progress = generateProgress(topic + grade);
                                    return (
                                        <div key={j}>
                                            <div className="flex justify-between text-sm font-bold mb-2">
                                                <span className="text-slate-600 line-clamp-1 flex-1 pr-2" title={topic}>{topic}</span>
                                                <span className={progress === 0 ? 'text-slate-400' : progress < 50 ? 'text-rose-500' : progress < 75 ? 'text-amber-500' : 'text-emerald-500'}>
                                                    {progress === 0 ? 'İşlenmedi' : `%${progress}`}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${progress < 50 ? 'bg-rose-500' : progress < 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${progress}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
