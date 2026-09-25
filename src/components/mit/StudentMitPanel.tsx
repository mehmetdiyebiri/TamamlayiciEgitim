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
import { VisualLearningMap } from './views/VisualLearningMap';
import { FORMULAS } from '../../data/formulas';

export const StudentMitPanel = ({ state, actions }: any) => {
    const [grade, setGrade] = useState<5|6|7|8>(8);
    const [activeTab, setActiveTab] = useState('profil');

    const tabs = [
        { id: 'profil', name: 'Gelişim & Hedef', icon: TrendingUp },
        { id: 'tanilama', name: 'Seviye Tespit', icon: ClipboardList },
        { id: 'calisma', name: '4 Aşamalı Çalışma Odası', icon: Brain },
        { id: 'zihin', name: 'Zihinden İşlem & Üslü Sayılar', icon: Zap },
        { id: 'formul', name: 'Formül Kartları', icon: BookOpen },
        { id: 'harita', name: 'Görsel Kazanım Haritası', icon: Map }
    ];

    const gradeLabels: Record<number, string> = {
        5: '5. Sınıf (Bursluluk & Temel)',
        6: '6. Sınıf (Beceri Temelli)',
        7: '7. Sınıf (LGS Ön Hazırlık)',
        8: '8. Sınıf (LGS Odaklı)'
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* Header with Active Grade Selection */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <GraduationCap className="text-indigo-600" size={32} />
                        M.İ.T Matematik & Sınav Simülatörü
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Seçili Seviye: <span className="font-black text-indigo-700">{gradeLabels[grade]}</span> — Sınıfına uygun konular, 4 aşamalı sorular ve zihinden işlem antrenmanları.
                    </p>
                </div>
                
                {/* Functional Grade Tabs */}
                <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    {[5, 6, 7, 8].map(g => (
                        <button 
                            key={g} 
                            onClick={() => setGrade(g as any)}
                            className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                                grade === g 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <span>{g}. Sınıf</span>
                            {g === 8 && <span className="text-[10px] bg-white/20 px-1 rounded font-bold">LGS</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black transition-all whitespace-nowrap text-xs sm:text-sm ${
                                isActive 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            {/* View Containers with Dynamic Grade-Specific Re-mounting */}
            <div className="flex-1 bg-white/50 rounded-3xl overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'profil' && (
                        <ProfileView key={`profil-${grade}`} grade={grade} />
                    )}
                    {activeTab === 'tanilama' && (
                        <DiagnosticView key={`tanilama-${grade}`} grade={grade} state={state} actions={actions} />
                    )}
                    {activeTab === 'calisma' && (
                        <StudyRoomView key={`calisma-${grade}`} grade={grade} />
                    )}
                    {activeTab === 'zihin' && (
                        <MentalMathView key={`zihin-${grade}`} grade={grade} />
                    )}
                    {activeTab === 'formul' && (
                        <FormulaCardsView key={`formul-${grade}`} grade={grade} FORMULAS={FORMULAS} />
                    )}
                    {activeTab === 'harita' && (
                        <VisualLearningMap 
                            key={`harita-${grade}`} 
                            grade={grade} 
                            onSelectTopicForStudy={(topic) => {
                                setActiveTab('calisma');
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
