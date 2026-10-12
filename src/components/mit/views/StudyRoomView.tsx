import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, CheckCircle2, ChevronRight, XCircle, AlertTriangle, ArrowLeft, BarChart, Sparkles, Award, BookOpen, ShieldCheck, Flame, Layers, HelpCircle } from 'lucide-react';
import { MIT_CURRICULUM } from '../../../data/mitCurriculum';
import { getMitCurriculumStudyQuestions, MitStudyQuestion, DifficultyStage } from '../../../data/mitGradeCurriculumQuestions';
import { QUESTIONS } from '../../../data/questions';

type Difficulty = 'kolay' | 'orta' | 'zor' | 'sinav';
type BadgeType = 'Çırak' | 'Kalfa' | 'Usta' | 'Uzman';

interface NormalizedQuestion {
    id: string | number;
    q: string;
    options: string[];
    ans: string;
    topic: string;
    difficulty: Difficulty;
    explanation?: string;
    hint?: string;
    contextText?: string;
    examType?: string;
}

export const StudyRoomView = ({ grade = 8 }: { grade: number }) => {
    // Grade curriculum topics from official MIT_CURRICULUM
    const gradeCurriculum = useMemo(() => {
        return (MIT_CURRICULUM as any)[grade] || (MIT_CURRICULUM as any)[8] || [];
    }, [grade]);

    const topics = useMemo(() => {
        const list: { topic: string; area: string }[] = [];
        gradeCurriculum.forEach((areaItem: any) => {
            areaItem.topics.forEach((top: string) => {
                list.push({ topic: top, area: areaItem.area });
            });
        });
        return list;
    }, [gradeCurriculum]);

    const [viewMode, setViewMode] = useState<'topics' | 'sinav'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<Difficulty>('kolay');
    const [currentBadge, setCurrentBadge] = useState<BadgeType>('Çırak');

    // Question set states (7 questions per set)
    const [questions, setQuestions] = useState<NormalizedQuestion[]>([]);
    const [qIndex, setQIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [earnedBadges, setEarnedBadges] = useState<Record<string, BadgeType[]>>({});

    // Load saved badges from localStorage
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('mit_study_badges') || '{}');
            setEarnedBadges(saved);
        } catch (e) {
            console.error(e);
        }
    }, []);

    // Save earned badge to localStorage
    const recordBadgeEarned = (topic: string, newBadge: BadgeType) => {
        setEarnedBadges(prev => {
            const topicBadges = prev[topic] || [];
            if (!topicBadges.includes(newBadge)) {
                const updated = { ...prev, [topic]: [...topicBadges, newBadge] };
                try {
                    localStorage.setItem('mit_study_badges', JSON.stringify(updated));
                } catch (e) {
                    console.error(e);
                }
                return updated;
            }
            return prev;
        });
    };

    // Start 7-question set with 4 stages: Kolay, Orta, Zor, Sınav
    const startStudySet = (topic: string, diff: Difficulty, isSimulatedExam: boolean = false) => {
        setSelectedTopic(topic);
        setDifficulty(diff);
        setQIndex(0);
        setScore(0);
        setCompleted(false);
        setIsAnswered(false);
        setSelectedOption(null);

        // Badge mapping:
        // 1. Aşama: Kolay -> Çırak (🥉)
        // 2. Aşama: Orta -> Kalfa (🥈)
        // 3. Aşama: Zor -> Usta (🥇)
        // 4. Aşama: Sınav -> Uzman (🏆)
        let b: BadgeType = 'Çırak';
        if (diff === 'sinav' || isSimulatedExam) b = 'Uzman';
        else if (diff === 'zor') b = 'Usta';
        else if (diff === 'orta') b = 'Kalfa';
        setCurrentBadge(b);

        // 1) Query from authentic MEB-aligned curriculum database
        const rawPool = getMitCurriculumStudyQuestions(grade as any, topic, diff);

        let finalPool: NormalizedQuestion[] = rawPool.map((q, idx) => ({
            id: q.id || `q_${grade}_${idx}`,
            q: q.q,
            options: q.options,
            ans: q.ans,
            topic: q.topic,
            difficulty: diff,
            explanation: q.explanation,
            hint: q.hint,
            contextText: q.contextText,
            examType: q.examType || (grade === 8 ? 'LGS' : 'Bursluluk (İOKBS)')
        }));

        // If pool has fewer than 7, supplement with questions from matching grade
        if (finalPool.length < 7) {
            const gradeAll = getMitCurriculumStudyQuestions(grade as any, undefined, diff);
            const addOns = gradeAll.filter(q => !finalPool.some(fp => fp.id === q.id));
            finalPool = [...finalPool, ...addOns.map((q, idx) => ({
                id: q.id || `q_sup_${idx}`,
                q: q.q,
                options: q.options,
                ans: q.ans,
                topic: q.topic,
                difficulty: diff,
                explanation: q.explanation,
                hint: q.hint,
                contextText: q.contextText,
                examType: q.examType
            }))];
        }

        // If still under 7, supplement with fallback questions from questions.ts
        if (finalPool.length < 7) {
            const fallbackList = (QUESTIONS as any)[grade] || [];
            const needed = 7 - finalPool.length;
            const slicedFallback = fallbackList.slice(0, needed);
            const extra = slicedFallback.map((fb: any, idx: number) => ({
                id: fb.id || `fb_${idx}`,
                q: fb.q || 'Matematik Pekiştirme Sorusu',
                options: fb.options || ['A', 'B', 'C', 'D'],
                ans: fb.ans || fb.options?.[0] || 'A',
                topic: topic,
                difficulty: diff,
                explanation: fb.hint || 'Kazanım kuralını uygulayınız.',
                hint: fb.hint
            }));
            finalPool = [...finalPool, ...extra];
        }

        // Pick exactly 7 questions or repeat safely
        const chosen = finalPool.slice(0, 7);
        while (chosen.length < 7 && finalPool.length > 0) {
            chosen.push({ ...finalPool[chosen.length % finalPool.length], id: `rep_${chosen.length}` });
        }

        setQuestions(chosen);
    };

    const handleOptionSelect = (opt: string) => {
        if (isAnswered) return;
        setSelectedOption(opt);
        setIsAnswered(true);
        if (opt === questions[qIndex]?.ans) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (qIndex + 1 < questions.length) {
            setQIndex(q => q + 1);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setCompleted(true);
            // 7 soruda en az 5 doğru (5/7 = %71.4) rozet kazandırır
            if (score + (selectedOption === questions[qIndex].ans ? 1 : 0) >= 5) {
                recordBadgeEarned(selectedTopic || 'Genel', currentBadge);
            }
        }
    };

    const badgeMeta: Record<BadgeType, { color: string; bg: string; icon: string; stageTitle: string; desc: string }> = {
        'Çırak': { color: 'text-amber-800', bg: 'bg-amber-100 border-amber-300', icon: '🥉', stageTitle: '1. Aşama: Kolay (Çırak)', desc: 'Temel kavram ve tanım kavrama' },
        'Kalfa': { color: 'text-blue-800', bg: 'bg-blue-100 border-blue-300', icon: '🥈', stageTitle: '2. Aşama: Orta (Kalfa)', desc: 'Standart işlem ve uygulama adımları' },
        'Usta': { color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-300', icon: '🥇', stageTitle: '3. Aşama: Zor (Usta)', desc: 'Muhakeme ve çok adımlı problem çözme' },
        'Uzman': { color: 'text-purple-800', bg: 'bg-purple-100 border-purple-300', icon: '🏆', stageTitle: '4. Aşama: Sınav Tarzı (Uzman)', desc: grade === 8 ? 'LGS Beceri Temelli Yeni Nesil' : 'MEB Bursluluk (İOKBS) & Beceri Temelli' }
    };

    // Sınav Başlığı & Formatı
    const examModeTitle = grade === 8
        ? '8. Sınıf LGS Yeni Nesil Sınav Simülasyonu'
        : `${grade}. Sınıf MEB Bursluluk (İOKBS) & Beceri Temelli Sınav Odası`;

    // ACTIVE TEST SCREEN
    if (selectedTopic && questions.length > 0 && !completed) {
        const currentQ = questions[qIndex];
        if (!currentQ) return null;

        const isExamStage = difficulty === 'sinav';

        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-6 px-4 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <button
                            onClick={() => setSelectedTopic(null)}
                            className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-1 transition-colors"
                        >
                            <ArrowLeft size={14} /> Konulara Geri Dön
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">{grade}. Sınıf</span>
                            <h2 className="text-xl font-black text-slate-800">{selectedTopic}</h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1 ${badgeMeta[currentBadge].bg} ${badgeMeta[currentBadge].color}`}>
                            <span>{badgeMeta[currentBadge].icon}</span>
                            <span>{badgeMeta[currentBadge].stageTitle}</span>
                        </span>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-xs font-black border border-indigo-100">
                            Soru {qIndex + 1} / 7
                        </span>
                    </div>
                </div>

                {/* Sınav Aşaması Özel Banner */}
                {isExamStage && (
                    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🏆</div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-wider text-purple-200">
                                    4. Aşama: Sınav Seviyesi ({currentQ.examType || (grade === 8 ? 'LGS' : 'Bursluluk')})
                                </div>
                                <div className="font-bold text-sm">Beceri Temelli, Kurgulu ve Çok Adımlı Sınav Sorusu</div>
                            </div>
                        </div>
                        <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-lg border border-white/30 hidden sm:inline-block">
                            Uzman Rozeti Hedefi
                        </span>
                    </div>
                )}

                {/* Question Card */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md relative space-y-6">
                    {/* Top Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-t-3xl overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 ${isExamStage ? 'bg-purple-600' : 'bg-indigo-600'}`}
                            style={{ width: `${((qIndex + 1) / 7) * 100}%` }}
                        />
                    </div>

                    {/* Context / Reading text / Real-life scenario (for Exam Stage questions) */}
                    {currentQ.contextText && (
                        <div className="p-4 sm:p-5 bg-amber-50/90 border border-amber-200 rounded-2xl text-sm text-slate-800 leading-relaxed shadow-sm">
                            <div className="font-black text-amber-900 mb-1.5 flex items-center gap-2">
                                <BookOpen size={18} className="text-amber-700" />
                                <span>Kurgu & Gerçek Hayat Senaryosu</span>
                            </div>
                            <p className="whitespace-pre-line text-slate-700">{currentQ.contextText}</p>
                        </div>
                    )}

                    {/* Question text */}
                    <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 text-base sm:text-lg font-bold text-slate-800 leading-relaxed whitespace-pre-line">
                        {currentQ.q}
                    </div>

                    {/* Options A, B, C, D */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {currentQ.options.map((opt: string, i: number) => {
                            const optionLabels = ['A', 'B', 'C', 'D'];
                            const isSelected = selectedOption === opt;
                            const isCorrectOpt = isAnswered && opt === currentQ.ans;
                            const isWrongOpt = isAnswered && isSelected && opt !== currentQ.ans;

                            let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/30";
                            if (isAnswered) {
                                if (isCorrectOpt) {
                                    btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
                                } else if (isWrongOpt) {
                                    btnClass = "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
                                } else {
                                    btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                                }
                            } else if (isSelected) {
                                btnClass = "bg-indigo-50 border-indigo-600 text-indigo-900";
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleOptionSelect(opt)}
                                    disabled={isAnswered}
                                    className={`p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between text-sm sm:text-base ${btnClass}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black shrink-0 text-slate-600">
                                            {optionLabels[i] || i + 1}
                                        </span>
                                        <span>{opt}</span>
                                    </div>
                                    {isAnswered && isCorrectOpt && <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />}
                                    {isAnswered && isWrongOpt && <XCircle size={20} className="text-rose-500 shrink-0" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation & Sınav Stratejisi */}
                    {isAnswered && currentQ.explanation && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-xs sm:text-sm text-indigo-950 space-y-1.5">
                            <div className="font-black text-indigo-900 flex items-center gap-1.5">
                                <Sparkles size={16} className="text-indigo-600" />
                                <span>{isExamStage ? 'Sınav Çözüm Stratejisi & Analiz' : 'Çözüm Adımı'}</span>
                            </div>
                            <p className="text-slate-700">{currentQ.explanation}</p>
                            {currentQ.hint && (
                                <p className="text-xs text-indigo-600 pt-1 font-medium">💡 İpucu: {currentQ.hint}</p>
                            )}
                        </motion.div>
                    )}

                    {/* Next Button */}
                    {isAnswered && (
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleNext}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                            >
                                {qIndex + 1 === 7 ? 'Seti Tamamla ve Rozetini Gör' : 'Sıradaki Soru'} <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    // COMPLETED SCREEN
    if (completed) {
        const isPassed = score >= 5; // 5 out of 7 is passing threshold

        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto py-10 px-4 text-center space-y-6">
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl shadow-md ${
                        isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                        {isPassed ? badgeMeta[currentBadge].icon : '⏳'}
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
                            {grade}. Sınıf • 7 Soruluk {difficulty.toUpperCase()} Set Sonucu
                        </span>
                        <h2 className="text-3xl font-black text-slate-900">
                            {isPassed ? `Tebrikler! ${currentBadge} Rozeti Kazanıldı!` : 'Biraz Daha Çalışma Gerekli'}
                        </h2>
                        <p className="text-slate-600 text-sm max-w-md mx-auto">
                            {isPassed
                                ? `7 soruda ${score} doğru yaparak bu aşamayı başarıyla tamamladın! Kazanılan rozet profil vitrinine eklendi.`
                                : `Rozet kazanmak için 7 soruda en az 5 doğru yapmalısın. Skorun: ${score}/7.`}
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-4 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl">
                        <div className="text-center">
                            <div className="text-2xl font-black text-emerald-600">{score}</div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase">Doğru</div>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-rose-500">{7 - score}</div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase">Yanlış</div>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-indigo-600">%{Math.round((score / 7) * 100)}</div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase">Başarı</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center pt-2">
                        <button
                            onClick={() => startStudySet(selectedTopic!, difficulty)}
                            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
                        >
                            Seti Tekrar Çöz
                        </button>
                        {isPassed && difficulty === 'kolay' && (
                            <button
                                onClick={() => startStudySet(selectedTopic!, 'orta')}
                                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                            >
                                2. Aşamaya Geç (Kalfa 🥈) →
                            </button>
                        )}
                        {isPassed && difficulty === 'orta' && (
                            <button
                                onClick={() => startStudySet(selectedTopic!, 'zor')}
                                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                            >
                                3. Aşamaya Geç (Usta 🥇) →
                            </button>
                        )}
                        {isPassed && difficulty === 'zor' && (
                            <button
                                onClick={() => startStudySet(selectedTopic!, 'sinav')}
                                className="py-3 px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                            >
                                4. Aşamaya Geç (Sınav / Uzman 🏆) →
                            </button>
                        )}
                        <button
                            onClick={() => setSelectedTopic(null)}
                            className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm"
                        >
                            Konulara Dön
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // MAIN TOPICS & EXAM STAGE SELECTOR SCREEN
    return (
        <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100">
                    <Brain size={14} /> {grade}. Sınıf Çalışma Odası & Antrenör
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">4 Aşamalı Matematik Antrenörü</h2>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                    Konularda 1. Aşama (Kolay), 2. Aşama (Orta), 3. Aşama (Zor) ve 4. Aşama (Sınav Soruları Tarzı) ile ilerleyerek Çırak, Kalfa, Usta ve Uzman rozetlerini toplayın.
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex justify-center gap-3">
                <button
                    onClick={() => setViewMode('topics')}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        viewMode === 'topics' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Layers size={16} /> 4 Aşamalı Konu Setleri ({grade}. Sınıf)
                </button>
                <button
                    onClick={() => setViewMode('sinav')}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        viewMode === 'sinav' ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Target size={16} /> {grade === 8 ? 'LGS Sınav Simülatörü' : `${grade}. Sınıf Bursluluk Sınav Odası`} (Uzman 🏆)
                </button>
            </div>

            {/* 4 AŞAMA & ROZET KADEMELERİ BİLGİLENDİRME ŞERİDİ */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <Award size={16} className="text-amber-500" /> 4 Aşama ve Rozet Kademeleri:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs w-full sm:w-auto">
                    <span className="px-2.5 py-1.5 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 font-bold flex items-center gap-1">
                        🥉 1. Aşama: Kolay (Çırak)
                    </span>
                    <span className="px-2.5 py-1.5 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 font-bold flex items-center gap-1">
                        🥈 2. Aşama: Orta (Kalfa)
                    </span>
                    <span className="px-2.5 py-1.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 font-bold flex items-center gap-1">
                        🥇 3. Aşama: Zor (Usta)
                    </span>
                    <span className="px-2.5 py-1.5 bg-purple-50 text-purple-900 rounded-xl border border-purple-300 font-bold flex items-center gap-1 ring-1 ring-purple-300">
                        🏆 4. Aşama: Sınav (Uzman)
                    </span>
                </div>
            </div>

            {viewMode === 'topics' ? (
                /* TOPICS LIST WITH 4 STAGE BUTTONS PER TOPIC */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topics.map(({ topic: t, area }) => {
                        const earned = earnedBadges[t] || [];
                        return (
                            <div key={t} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                            {area}
                                        </span>
                                        <h3 className="font-black text-slate-800 text-base mt-1">{t}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">4 Kademeli Soru Seti (7'şer Soru)</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {earned.map((b, i) => (
                                            <span key={i} title={b} className="text-base">{badgeMeta[b]?.icon}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* 4 AŞAMA BUTONLARI */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    <button
                                        onClick={() => startStudySet(t, 'kolay')}
                                        className="py-2 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-0.5 border border-amber-200"
                                    >
                                        <span>🥉 1. Aşama</span>
                                        <span className="text-[10px] text-amber-700 font-medium">Kolay (Çırak)</span>
                                    </button>
                                    <button
                                        onClick={() => startStudySet(t, 'orta')}
                                        className="py-2 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-0.5 border border-blue-200"
                                    >
                                        <span>🥈 2. Aşama</span>
                                        <span className="text-[10px] text-blue-700 font-medium">Orta (Kalfa)</span>
                                    </button>
                                    <button
                                        onClick={() => startStudySet(t, 'zor')}
                                        className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-0.5 border border-emerald-200"
                                    >
                                        <span>🥇 3. Aşama</span>
                                        <span className="text-[10px] text-emerald-700 font-medium">Zor (Usta)</span>
                                    </button>
                                    <button
                                        onClick={() => startStudySet(t, 'sinav')}
                                        className="py-2 px-2 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-0.5 border border-purple-300 ring-1 ring-purple-200"
                                    >
                                        <span>🏆 4. Aşama</span>
                                        <span className="text-[10px] text-purple-700 font-bold">Sınav (Uzman)</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* SINAV SİMÜLATÖRÜ (4. AŞAMA DENEMELERİ) */
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-8 rounded-3xl border border-indigo-800 shadow-xl text-white space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-6">
                        <div className="space-y-1">
                            <span className="text-xs font-black text-purple-400 uppercase tracking-wider flex items-center gap-1">
                                <Award size={14} /> 4. Aşama Sınav Odası
                            </span>
                            <h3 className="text-2xl font-black">{examModeTitle}</h3>
                            <p className="text-indigo-200 text-xs sm:text-sm max-w-lg">
                                MEB müfredatına ve sınav standartlarına tam uyumlu, analitik muhakeme ve kurgu gerektiren 7'şer soruluk sınav deneme setleri.
                            </p>
                        </div>
                        <div className="bg-purple-900/40 border border-purple-400/30 px-4 py-2.5 rounded-2xl text-center">
                            <div className="text-xl font-black text-purple-300">Uzman 🏆</div>
                            <div className="text-[10px] text-purple-200 uppercase font-bold">Hedef Rozet</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                                key={num}
                                onClick={() => startStudySet(`${grade}. Sınıf Sınav Denemesi #${num}`, 'sinav', true)}
                                className="p-5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-400 rounded-2xl text-left transition-all group flex flex-col justify-between h-36"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="w-8 h-8 rounded-xl bg-purple-500/30 text-purple-300 flex items-center justify-center font-black text-sm group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        #{num}
                                    </span>
                                    <span className="text-[10px] font-bold bg-purple-500/20 px-2 py-0.5 rounded-md text-purple-200 border border-purple-400/30">
                                        7 Sınav Sorusu
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-purple-200 text-sm">
                                        {grade === 8 ? `LGS Deneme Seti ${num}` : `${grade}. Sınıf Bursluluk Denemesi ${num}`}
                                    </h4>
                                    <p className="text-[11px] text-indigo-300 mt-0.5">Beceri Temelli & Çok Adımlı Çözüm</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
