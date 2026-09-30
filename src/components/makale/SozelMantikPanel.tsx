import React, { useState, useMemo } from 'react';
import { 
    Brain, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, RotateCcw, 
    Table, Compass, Zap, ShieldAlert, Sparkles, Award, Clock, HelpCircle, 
    ChevronDown, ChevronUp, Layers, BookOpen, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    SOZEL_MANTIK_ATOLYELER, 
    getQuestionsByAtolye, 
    ALL_SOZEL_MANTIK_QUESTIONS 
} from '../../data/sozelMantikIndex';
import { SozelMantikItem } from '../../data/sozelMantikTypes';

interface SozelMantikPanelProps {
    onBack?: () => void;
}

export function SozelMantikPanel({ onBack }: SozelMantikPanelProps) {
    const [selectedAtolyeId, setSelectedAtolyeId] = useState<number>(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, { selectedIndex: number; isCorrect: boolean }>>({});
    const [showSolution, setShowSolution] = useState<boolean>(false);
    const [filterCategory, setFilterCategory] = useState<string>('Tümü');

    const currentAtolyeMeta = useMemo(() => {
        return SOZEL_MANTIK_ATOLYELER.find(a => a.id === selectedAtolyeId) || SOZEL_MANTIK_ATOLYELER[0];
    }, [selectedAtolyeId]);

    const atolyeQuestions = useMemo(() => {
        return getQuestionsByAtolye(selectedAtolyeId);
    }, [selectedAtolyeId]);

    const activeQuestion: SozelMantikItem = useMemo(() => {
        return atolyeQuestions[currentQuestionIndex] || atolyeQuestions[0];
    }, [atolyeQuestions, currentQuestionIndex]);

    const currentAnswer = userAnswers[activeQuestion.id];
    const isAnswered = !!currentAnswer;

    // Handle Option Selection
    const handleSelectOption = (index: number) => {
        if (isAnswered) return;
        const isCorrect = activeQuestion.options[index].isCorrect;
        setUserAnswers(prev => ({
            ...prev,
            [activeQuestion.id]: {
                selectedIndex: index,
                isCorrect
            }
        }));
        // Auto open solution to foster immediate cognitive reflection
        setShowSolution(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex < atolyeQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowSolution(false);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setShowSolution(false);
        }
    };

    const handleResetQuestion = () => {
        setUserAnswers(prev => {
            const next = { ...prev };
            delete next[activeQuestion.id];
            return next;
        });
        setShowSolution(false);
    };

    // Calculate workshop score
    const workshopStats = useMemo(() => {
        let correct = 0;
        let answered = 0;
        atolyeQuestions.forEach(q => {
            const ans = userAnswers[q.id];
            if (ans) {
                answered++;
                if (ans.isCorrect) correct++;
            }
        });
        return {
            answered,
            correct,
            total: atolyeQuestions.length,
            percent: atolyeQuestions.length > 0 ? Math.round((correct / atolyeQuestions.length) * 100) : 0
        };
    }, [atolyeQuestions, userAnswers]);

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-12">
            {/* Header & Atölye Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                                <Brain className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                    Sözel Mantık ve Muhakeme Okulu
                                </h1>
                                <p className="text-slate-500 text-sm font-medium">
                                    5 Aşamalı Bilişsel Çözümleme ve Matris Kurma Antrenörü
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Summary Pill */}
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl">
                        <div className="text-right">
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Atölye Başarısı</div>
                            <div className="text-sm font-black text-slate-700">
                                {workshopStats.correct} / {workshopStats.answered} Doğru ({workshopStats.percent}%)
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow">
                            %{workshopStats.percent}
                        </div>
                    </div>
                </div>

                {/* Workshop Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-4 border-t border-slate-100">
                    {SOZEL_MANTIK_ATOLYELER.map((atolye) => {
                        const isSelected = atolye.id === selectedAtolyeId;
                        return (
                            <button
                                key={atolye.id}
                                onClick={() => {
                                    setSelectedAtolyeId(atolye.id);
                                    setCurrentQuestionIndex(0);
                                    setShowSolution(false);
                                }}
                                className={`text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden ${
                                    isSelected 
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200 ring-offset-1' 
                                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                            >
                                <div className="text-xs font-black uppercase tracking-wider opacity-80 mb-1">
                                    {atolye.title.split(':')[0]}
                                </div>
                                <div className="text-xs font-bold line-clamp-1 leading-snug">
                                    {atolye.title.split(':')[1]?.trim() || atolye.title}
                                </div>
                                <div className="mt-2 flex items-center justify-between text-[11px] font-medium opacity-75">
                                    <span>20 Soru</span>
                                    <span>{atolye.difficulty.split('-')[0].trim()}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Question Quick Jump Ribbon */}
            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2">Sorular:</span>
                <div className="flex items-center gap-1.5 shrink-0">
                    {atolyeQuestions.map((q, idx) => {
                        const isCurrent = idx === currentQuestionIndex;
                        const ans = userAnswers[q.id];
                        let pillStyle = "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200";
                        if (isCurrent) {
                            pillStyle = "bg-indigo-600 text-white border-indigo-600 shadow ring-2 ring-indigo-200";
                        } else if (ans) {
                            pillStyle = ans.isCorrect 
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold" 
                                : "bg-rose-100 text-rose-800 border-rose-300 font-bold";
                        }

                        return (
                            <button
                                key={q.id}
                                onClick={() => {
                                    setCurrentQuestionIndex(idx);
                                    setShowSolution(false);
                                }}
                                className={`w-8 h-8 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${pillStyle}`}
                            >
                                {idx + 1}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Question Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Question Header Bar */}
                <div className="bg-slate-50/80 px-6 sm:px-8 py-5 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            Soru {activeQuestion.questionNumber} / 20
                        </span>
                        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                            {activeQuestion.category}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200/60 px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" /> Hedef Süre: {activeQuestion.cognitiveTime || '30-45 sn'}
                        </span>
                        {isAnswered && (
                            <button
                                onClick={handleResetQuestion}
                                className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                title="Bu soruyu sıfırla"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> Yeniden Çöz
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    {/* Title & Context */}
                    <div>
                        <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                            <span>{activeQuestion.title}</span>
                        </h2>

                        {/* Context & Premises Box */}
                        <div className="bg-indigo-50/50 border border-indigo-100 p-5 sm:p-6 rounded-2xl text-slate-700 leading-relaxed font-medium">
                            <div className="font-bold text-indigo-950 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                <BookOpen className="w-4 h-4 text-indigo-600" />
                                {activeQuestion.context}
                            </div>
                            
                            <div className="space-y-2 mt-4 pt-3 border-t border-indigo-100/80">
                                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block mb-1">
                                    Verilen Öncüller ve Koşullar:
                                </span>
                                {activeQuestion.premises.map((premise, pIdx) => (
                                    <div key={pIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-800">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {pIdx + 1}
                                        </div>
                                        <span>{premise}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Question Stem */}
                    <div className="pt-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug flex items-start gap-2">
                            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                            <span>{activeQuestion.questionStem}</span>
                        </h3>
                    </div>

                    {/* Interactive Options */}
                    <div className="space-y-3 pt-2">
                        {activeQuestion.options.map((opt, oIdx) => {
                            const isSelected = currentAnswer?.selectedIndex === oIdx;
                            const isCorrectOpt = opt.isCorrect;
                            
                            let optStyle = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 bg-white";
                            let badgeStyle = "bg-slate-100 text-slate-600";

                            if (isAnswered) {
                                if (isCorrectOpt) {
                                    optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm ring-1 ring-emerald-400";
                                    badgeStyle = "bg-emerald-600 text-white";
                                } else if (isSelected && !isCorrectOpt) {
                                    optStyle = "bg-rose-50 border-rose-400 text-rose-900 shadow-sm";
                                    badgeStyle = "bg-rose-600 text-white";
                                } else {
                                    optStyle = "border-slate-200 opacity-50 bg-slate-50/50 text-slate-400";
                                    badgeStyle = "bg-slate-200 text-slate-400";
                                }
                            }

                            return (
                                <button
                                    key={oIdx}
                                    onClick={() => handleSelectOption(oIdx)}
                                    disabled={isAnswered}
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all font-medium flex items-center justify-between gap-4 ${optStyle}`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${badgeStyle}`}>
                                            {opt.letter}
                                        </span>
                                        <span className="text-sm sm:text-base">{opt.text}</span>
                                    </div>
                                    
                                    {isAnswered && isCorrectOpt && (
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                                    )}
                                    {isAnswered && isSelected && !isCorrectOpt && (
                                        <X className="w-6 h-6 text-rose-600 shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Solution & Matrix Accordion Toggle */}
                    <div className="pt-4">
                        <button
                            onClick={() => setShowSolution(!showSolution)}
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 hover:bg-indigo-100/70 px-4 py-2.5 rounded-xl transition-all"
                        >
                            <Table className="w-4 h-4" />
                            <span>{showSolution ? 'Çözüm Matrisi ve Analizi Gizle' : 'Bilişsel Çözüm Matrisi ve Analizi Göster'}</span>
                            {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Expandable Solution Area */}
                    <AnimatePresence>
                        {showSolution && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 pt-2 overflow-hidden"
                            >
                                {/* Result Summary */}
                                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-medium text-sm sm:text-base flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="font-bold text-emerald-950">Net Sonuç: </strong>
                                        {activeQuestion.resultText}
                                    </div>
                                </div>

                                {/* Matrix Visualization */}
                                {activeQuestion.matrix && (
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 overflow-hidden">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Table className="w-4 h-4 text-indigo-600" />
                                            <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                                                {activeQuestion.matrix.title}
                                            </h4>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                                                <thead>
                                                    <tr className="bg-indigo-600 text-white font-bold">
                                                        {activeQuestion.matrix.headers.map((hdr, hIdx) => (
                                                            <th key={hIdx} className="p-3 border-r border-indigo-500 last:border-r-0">
                                                                {hdr}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {activeQuestion.matrix.rows.map((row, rIdx) => (
                                                        <tr key={rIdx} className="border-b border-slate-100 hover:bg-indigo-50/30 transition-colors">
                                                            {row.map((cell, cIdx) => (
                                                                <td 
                                                                    key={cIdx} 
                                                                    className={`p-3 border-r border-slate-100 last:border-r-0 ${
                                                                        cIdx === 0 ? 'font-bold text-slate-900 bg-slate-50/50' : 'text-slate-700'
                                                                    }`}
                                                                >
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Step-by-Step Pedagogical Breakdown */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                                        <Compass className="w-4 h-4 text-indigo-600" /> Bilişsel Adım Adım Akış
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {activeQuestion.solutionSteps.map((step) => (
                                            <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                                                        {step.step}
                                                    </span>
                                                    <span className="font-bold text-slate-800 text-sm">
                                                        {step.title}
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed font-medium">
                                                    {step.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Neural Brake & Synaptic Coding */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeQuestion.neuralBrake && (
                                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                                            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1.5">
                                                <ShieldAlert className="w-4 h-4 text-amber-600" />
                                                <span>Nöral Fren (Zihinsel Tuzak)</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
                                                {activeQuestion.neuralBrake}
                                            </p>
                                        </div>
                                    )}

                                    {activeQuestion.synapticCoding && (
                                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                                            <div className="flex items-center gap-2 text-purple-800 font-bold text-sm mb-1.5">
                                                <Sparkles className="w-4 h-4 text-purple-600" />
                                                <span>Sinaptik Kodlama ve Hızlı Taktik</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-purple-900/90 leading-relaxed font-medium">
                                                {activeQuestion.synapticCoding}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestionIndex === 0}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none font-bold text-sm transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Önceki Soru
                        </button>

                        <div className="text-sm font-bold text-slate-500 hidden sm:block">
                            {activeQuestion.atolyeTitle.split(':')[1]?.trim()}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentQuestionIndex === atolyeQuestions.length - 1}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-7 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-md text-sm"
                        >
                            Sonraki Soru <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
