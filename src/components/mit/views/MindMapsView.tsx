import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Brain,
    ArrowRight,
    ArrowDown,
    Lightbulb,
    CheckCircle2,
    XCircle,
    BookOpen,
    AlertTriangle,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    HelpCircle
} from 'lucide-react';
import { MIT_MIND_MAPS, TopicMindMap } from '../../../data/mitMindMaps';

const ACCENT_STYLES: Record<
    TopicMindMap['accent'],
    {
        headerBg: string;
        border: string;
        stepBg: string;
        stepBadge: string;
        formulaBg: string;
        connector: string;
        chipActive: string;
    }
> = {
    indigo: {
        headerBg: 'from-indigo-900 via-indigo-800 to-slate-900',
        border: 'border-indigo-200',
        stepBg: 'bg-indigo-50/50',
        stepBadge: 'bg-indigo-600 text-white',
        formulaBg: 'bg-indigo-950 text-indigo-100',
        connector: 'text-indigo-400',
        chipActive: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    emerald: {
        headerBg: 'from-emerald-900 via-teal-800 to-slate-900',
        border: 'border-emerald-200',
        stepBg: 'bg-emerald-50/50',
        stepBadge: 'bg-emerald-600 text-white',
        formulaBg: 'bg-emerald-950 text-emerald-100',
        connector: 'text-emerald-500',
        chipActive: 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
    },
    amber: {
        headerBg: 'from-amber-900 via-orange-800 to-slate-900',
        border: 'border-amber-200',
        stepBg: 'bg-amber-50/50',
        stepBadge: 'bg-amber-600 text-white',
        formulaBg: 'bg-slate-900 text-amber-200',
        connector: 'text-amber-500',
        chipActive: 'bg-amber-600 text-white shadow-md shadow-amber-200'
    },
    rose: {
        headerBg: 'from-rose-900 via-pink-800 to-slate-900',
        border: 'border-rose-200',
        stepBg: 'bg-rose-50/50',
        stepBadge: 'bg-rose-600 text-white',
        formulaBg: 'bg-rose-950 text-rose-100',
        connector: 'text-rose-400',
        chipActive: 'bg-rose-600 text-white shadow-md shadow-rose-200'
    },
    violet: {
        headerBg: 'from-violet-900 via-purple-800 to-slate-900',
        border: 'border-violet-200',
        stepBg: 'bg-violet-50/50',
        stepBadge: 'bg-violet-600 text-white',
        formulaBg: 'bg-violet-950 text-violet-100',
        connector: 'text-violet-400',
        chipActive: 'bg-violet-600 text-white shadow-md shadow-violet-200'
    },
    sky: {
        headerBg: 'from-sky-900 via-blue-800 to-slate-900',
        border: 'border-sky-200',
        stepBg: 'bg-sky-50/50',
        stepBadge: 'bg-sky-600 text-white',
        formulaBg: 'bg-slate-900 text-sky-200',
        connector: 'text-sky-500',
        chipActive: 'bg-sky-600 text-white shadow-md shadow-sky-200'
    }
};

export const MindMapsView = ({ grade = 5 }: { grade?: number }) => {
    const safeGrade = (grade === 5 || grade === 6 || grade === 7 || grade === 8 ? grade : 8) as 5 | 6 | 7 | 8;

    const maps = useMemo(() => MIT_MIND_MAPS[safeGrade] || [], [safeGrade]);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        setSelectedIdx(0);
        setUserInput('');
        setFeedback(null);
        setShowHint(false);
    }, [safeGrade]);

    const activeMap = maps[selectedIdx] || maps[0];
    if (!activeMap) return null;

    const style = ACCENT_STYLES[activeMap.accent];

    const selectTopic = (idx: number) => {
        setSelectedIdx(idx);
        setUserInput('');
        setFeedback(null);
        setShowHint(false);
    };

    const handleQuickCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const normalizedInput = userInput.trim().toLowerCase().replace(/\s+/g, '').replace(',', '.');
        const normalizedTarget = activeMap.quickCheck.answer.trim().toLowerCase().replace(/\s+/g, '').replace(',', '.');
        if (normalizedInput === normalizedTarget) {
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 font-sans">
            {/* Compact Topic Navigation Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                            <Brain size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-black text-slate-900">
                                {safeGrade}. Sınıf Sıralamalı Kavram Haritaları ({maps.length} Konu)
                            </h3>
                            <p className="text-xs text-slate-500">
                                Her konu tek bir bütüncül görsel şema üzerinde 1 → 2 → 3 → 4 sırasıyla özetlenir.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => selectTopic((selectedIdx - 1 + maps.length) % maps.length)}
                            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="Önceki Konu"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-xs font-black text-slate-600 px-2 tabular-nums">
                            {selectedIdx + 1} / {maps.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => selectTopic((selectedIdx + 1) % maps.length)}
                            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="Sonraki Konu"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Ordered Curriculum Topic Selector */}
                <div className="flex flex-wrap gap-2">
                    {maps.map((item, idx) => {
                        const isActive = idx === selectedIdx;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => selectTopic(idx)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                    isActive
                                        ? style.chipActive
                                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                    {idx + 1}
                                </span>
                                <span>{item.topic}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SINGLE UNIFIED VISUAL CONCEPT MAP POSTER */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeMap.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white rounded-3xl border-2 ${style.border} shadow-lg overflow-hidden`}
                >
                    {/* 1. Poster Top Title & Core Rule Node */}
                    <div className={`bg-gradient-to-r ${style.headerBg} text-white p-6 sm:p-7 space-y-4`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-black uppercase tracking-wider bg-white/15 px-3 py-1 rounded-lg border border-white/20">
                                {safeGrade}. Sınıf • {activeMap.area}
                            </span>
                            <span className="text-[11px] font-bold text-white/80 flex items-center gap-1">
                                <Sparkles size={13} /> Tek Görselde Bütüncül Sıralı Özet
                            </span>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                                {activeMap.topic}
                            </h2>
                            <p className="text-sm text-white/80 font-medium">
                                {activeMap.subtitle}
                            </p>
                        </div>

                        {/* Central Core Rule Bar */}
                        <div className="bg-black/30 border border-white/15 rounded-2xl px-4 py-3 flex items-start sm:items-center gap-2.5">
                            <Lightbulb size={18} className="text-amber-300 shrink-0 mt-0.5 sm:mt-0" />
                            <div className="text-xs sm:text-sm font-mono font-bold text-amber-200 leading-snug">
                                {activeMap.coreRule}
                            </div>
                        </div>
                    </div>

                    {/* 2. Connected Sequential 4-Stage Visual Concept Map Diagram */}
                    <div className="p-5 sm:p-7 space-y-6 bg-slate-50/60">
                        {/* Visual Diagram Axis Label */}
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
                            <span>Sıralamalı Öğrenme Akışı (Temelden Uygulamaya)</span>
                            <span className="hidden sm:inline">1. Aşama ➔ 2. Aşama ➔ 3. Aşama ➔ 4. Aşama</span>
                        </div>

                        {/* 4 Connected Nodes in One Single Visual Grid */}
                        <div className="relative">
                            {/* Desktop Horizontal Spine Connecting All 4 Nodes */}
                            <div className="hidden lg:block absolute top-11 left-12 right-12 h-1 bg-slate-200 z-0 rounded-full" />

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-10">
                                {activeMap.steps.map((step, sIdx) => (
                                    <div key={step.stepNo} className="flex flex-col">
                                        <div className={`flex-1 bg-white rounded-2xl border-2 ${style.border} p-4 shadow-xs flex flex-col justify-between gap-3 relative`}>
                                            {/* Step Header Node */}
                                            <div className="space-y-2.5">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className={`w-8 h-8 rounded-xl ${style.stepBadge} flex items-center justify-center font-black text-xs shadow-xs shrink-0`}>
                                                        0{step.stepNo}
                                                    </span>
                                                    {sIdx < 3 && (
                                                        <span className={`hidden lg:flex items-center ${style.connector}`}>
                                                            <ArrowRight size={18} />
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className="font-black text-slate-900 text-sm leading-snug">
                                                    {step.title}
                                                </h4>

                                                {/* Key Formula / Symbolic Summary */}
                                                <div className={`${style.formulaBg} px-3 py-2 rounded-xl font-mono text-[11px] font-bold leading-snug`}>
                                                    {step.formula}
                                                </div>
                                            </div>

                                            {/* Concise Concept Branches */}
                                            <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                                                {step.points.map((pt, pIdx) => (
                                                    <li key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium leading-snug">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                                        <span>{pt}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Mobile Downward Flow Connector */}
                                        {sIdx < 3 && (
                                            <div className={`flex lg:hidden justify-center py-1.5 ${style.connector}`}>
                                                <ArrowDown size={18} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Integrated Bottom Strip Inside the Same Visual Summary: Worked Example + Critical Tip */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200/80">
                            <div className="bg-white rounded-2xl border border-emerald-200 p-4 space-y-2">
                                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700">
                                    <BookOpen size={15} /> Örnek Uygulama
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                                    {activeMap.workedExample.question}
                                </p>
                                <p className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 rounded-xl px-3 py-2">
                                    {activeMap.workedExample.solution}
                                </p>
                            </div>

                            <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-4 space-y-2 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800">
                                        <AlertTriangle size={15} /> Kritik İpucu &amp; Hata Uyarısı
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                                        {activeMap.criticalTip}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Compact Interactive Self-Check Footer */}
                    <div className="bg-white border-t border-slate-200 px-5 sm:px-7 py-4">
                        <form onSubmit={handleQuickCheck} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-0.5 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
                                        Hızlı Kontrol
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setShowHint((h) => !h)}
                                        className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                                    >
                                        <HelpCircle size={12} /> {showHint ? 'İpucunu Gizle' : 'İpucu'}
                                    </button>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-slate-800">
                                    {activeMap.quickCheck.question}
                                </p>
                                {showHint && (
                                    <p className="text-xs text-amber-700 font-medium">
                                        💡 {activeMap.quickCheck.hint}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => {
                                        setUserInput(e.target.value);
                                        setFeedback(null);
                                    }}
                                    placeholder="Cevabın..."
                                    className="w-32 sm:w-36 px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 text-sm font-bold text-slate-900 outline-none bg-slate-50 focus:bg-white"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-colors cursor-pointer"
                                >
                                    Kontrol Et
                                </button>
                                {feedback === 'correct' && (
                                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl">
                                        <CheckCircle2 size={15} /> Doğru!
                                    </span>
                                )}
                                {feedback === 'wrong' && (
                                    <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-xl">
                                        <XCircle size={15} /> Tekrar Dene
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
