import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, CheckCircle2, ChevronRight, XCircle, AlertTriangle, ArrowLeft, BarChart, Sparkles, Loader2, Award, BookOpen, ShieldCheck, Flame, Layers } from 'lucide-react';
import { QUESTIONS } from '../../../data/questions';
import pdf8Data from '../../../data/pdf8.json';

type Difficulty = 'kolay' | 'orta' | 'zor';
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
}

export const StudyRoomView = ({ grade = 8 }: { grade: number }) => {
    // Generate topic list from existing questions data for the grade
    const qList = (QUESTIONS as any)[grade] || (QUESTIONS as any)[8] || [];
    const topics = useMemo(() => {
        const set = new Set<string>();
        qList.forEach((q: any) => { if (q.topic) set.add(q.topic); });
        if (set.size === 0) {
            ['Çarpanlar ve Katlar', 'Üslü İfadeler', 'Kareköklü İfadeler', 'Doğrusal Denklemler', 'Geometri ve Ölçme'].forEach(t => set.add(t));
        }
        return Array.from(set);
    }, [qList]);

    const [viewMode, setViewMode] = useState<'topics' | 'mindmaps' | 'lgs'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<Difficulty>('kolay');
    const [currentBadge, setCurrentBadge] = useState<BadgeType>('Çırak');

    // 7-question set states
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

    // Load 7 questions per set according to user mandate
    const startStudySet = (topic: string, diff: Difficulty, isLgs: boolean = false) => {
        setSelectedTopic(topic);
        setDifficulty(diff);
        setQIndex(0);
        setScore(0);
        setCompleted(false);
        setIsAnswered(false);
        setSelectedOption(null);

        // Badge mapping: kolay -> Çırak, orta -> Kalfa, zor -> Usta, LGS -> Uzman
        let b: BadgeType = 'Çırak';
        if (isLgs) b = 'Uzman';
        else if (diff === 'orta') b = 'Kalfa';
        else if (diff === 'zor') b = 'Usta';
        setCurrentBadge(b);

        if (isLgs && pdf8Data && (pdf8Data as any).questions) {
            // Load real questions from pdf8.json question bank
            const rawQuestions = (pdf8Data as any).questions || [];
            const contexts = (pdf8Data as any).contexts || [];
            const contextMap: Record<string, string> = {};
            contexts.forEach((c: any) => {
                if (c.id && c.content) contextMap[c.id] = c.content;
            });

            // Pick 7 distinct questions
            const startIdx = Math.floor(Math.random() * Math.max(1, rawQuestions.length - 10));
            const sliced = rawQuestions.slice(startIdx, startIdx + 7);
            const normalized: NormalizedQuestion[] = sliced.map((raw: any, idx: number) => {
                const optA = raw.options?.A || 'Seçenek A';
                const optB = raw.options?.B || 'Seçenek B';
                const optC = raw.options?.C || 'Seçenek C';
                const optD = raw.options?.D || 'Seçenek D';
                const opts = [optA, optB, optC, optD];
                const letter = raw.correctAnswer || 'A';
                const correctText = raw.options?.[letter] || optA;

                return {
                    id: `lgs_${raw.num || idx}`,
                    q: raw.text || 'LGS Yeni Nesil Muhakeme Sorusu',
                    options: opts,
                    ans: correctText,
                    topic: 'LGS Yeni Nesil Matematik & Sözel Mantık',
                    difficulty: 'zor',
                    explanation: raw.didYouKnow || 'LGS analitik düşünme ve tablo/grafik yorumlama kuralı uygulanmalıdır.',
                    contextText: raw.contextId ? contextMap[raw.contextId] : undefined
                };
            });

            setQuestions(normalized);
            return;
        }

        // Standard Grade Questions (7 questions)
        let pool = qList.filter((q: any) => q.topic === topic);
        if (pool.length === 0) pool = qList;

        // Filter or sort by difficulty
        let diffPool = pool.filter((q: any) => {
            if (diff === 'kolay') return q.difficulty === 'easy' || q.difficulty === 'basit';
            if (diff === 'orta') return q.difficulty === 'medium' || q.difficulty === 'orta';
            return q.difficulty === 'hard' || q.difficulty === 'zor';
        });

        if (diffPool.length < 7) {
            diffPool = [...diffPool, ...pool];
        }

        const picked = diffPool.slice(0, 7);
        const normalized: NormalizedQuestion[] = picked.map((q: any, idx: number) => ({
            id: q.id || idx,
            q: q.q || q.question || 'Matematik Alıştırma Sorusu',
            options: q.options || ['A', 'B', 'C', 'D'],
            ans: q.ans || q.answer || (q.options ? q.options[0] : 'A'),
            topic: q.topic || topic,
            difficulty: diff,
            explanation: q.explanation || q.hint || 'Kural ve formülü dikkatle uygulayınız.',
            hint: q.hint
        }));

        setQuestions(normalized);
    };

    const handleOptionSelect = (opt: string) => {
        if (isAnswered) return;
        setSelectedOption(opt);
        setIsAnswered(true);
        if (opt === questions[qIndex].ans) {
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

    const badgeMeta: Record<BadgeType, { color: string; bg: string; icon: string; title: string }> = {
        'Çırak': { color: 'text-amber-800', bg: 'bg-amber-100 border-amber-300', icon: '🥉', title: 'Çırak Rozeti (Kolay Set)' },
        'Kalfa': { color: 'text-slate-800', bg: 'bg-slate-200 border-slate-300', icon: '🥈', title: 'Kalfa Rozeti (Orta Set)' },
        'Usta': { color: 'text-yellow-800', bg: 'bg-yellow-100 border-yellow-300', icon: '🥇', title: 'Usta Rozeti (Zor Set)' },
        'Uzman': { color: 'text-purple-800', bg: 'bg-purple-100 border-purple-300', icon: '🏆', title: 'Uzman Rozeti (LGS Yeni Nesil)' }
    };

    // ACTIVE TEST SCREEN
    if (selectedTopic && questions.length > 0 && !completed) {
        const currentQ = questions[qIndex];
        if (!currentQ) return null;

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
                        <h2 className="text-xl font-black text-slate-800">{selectedTopic}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1 ${badgeMeta[currentBadge].bg} ${badgeMeta[currentBadge].color}`}>
                            <span>{badgeMeta[currentBadge].icon}</span>
                            <span>Hedef: {currentBadge}</span>
                        </span>
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl text-xs font-black uppercase border border-slate-200">
                            {difficulty} Set
                        </span>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-xs font-black border border-indigo-100">
                            Soru {qIndex + 1} / 7
                        </span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md relative space-y-6">
                    {/* Top Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-t-3xl overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-300"
                            style={{ width: `${((qIndex + 1) / 7) * 100}%` }}
                        />
                    </div>

                    {/* Context / Reading text if exists (for LGS questions) */}
                    {currentQ.contextText && (
                        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed max-h-56 overflow-y-auto">
                            <div className="font-black text-amber-900 mb-1 flex items-center gap-1.5">
                                <BookOpen size={16} /> Metin / Bilgi
                            </div>
                            <p className="whitespace-pre-line">{currentQ.contextText}</p>
                        </div>
                    )}

                    {/* Question text */}
                    <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 text-base sm:text-lg font-bold text-slate-800 leading-relaxed whitespace-pre-line">
                        {currentQ.q}
                    </div>

                    {/* Options A, B, C, D */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {currentQ.options.map((opt: string, i: number) => {
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
                                btnClass = "bg-indigo-50 border-indigo-500 text-indigo-800";
                            }

                            return (
                                <button
                                    key={i}
                                    disabled={isAnswered}
                                    onClick={() => handleOptionSelect(opt)}
                                    className={`p-4 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between ${btnClass}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                                            isCorrectOpt ? 'bg-emerald-600 text-white' : isWrongOpt ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {['A', 'B', 'C', 'D'][i]}
                                        </span>
                                        <span className="text-sm">{opt}</span>
                                    </span>
                                    {isCorrectOpt && <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />}
                                    {isWrongOpt && <XCircle className="text-rose-600 shrink-0" size={20} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium ${
                            selectedOption === currentQ.ans ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}>
                            <div className="font-black mb-1 flex items-center gap-1.5">
                                {selectedOption === currentQ.ans ? (
                                    <><CheckCircle2 size={16} className="text-emerald-600" /> Doğru Cevap!</>
                                ) : (
                                    <><XCircle size={16} className="text-rose-600" /> Yanlış! Doğru Cevap: {currentQ.ans}</>
                                )}
                            </div>
                            <p className="text-slate-700">{currentQ.explanation}</p>
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

    // COMPLETED SCREEN (7 QUESTIONS FINISHED)
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
                            7 Soruluk {difficulty.toUpperCase()} Set Sonucu
                        </span>
                        <h2 className="text-3xl font-black text-slate-900">
                            {isPassed ? `Tebrikler! ${currentBadge} Rozeti Kazanıldı!` : 'Biraz Daha Çalışma Gerekli'}
                        </h2>
                        <p className="text-slate-600 text-sm max-w-md mx-auto">
                            {isPassed
                                ? `7 soruda ${score} doğru yaparak seti başarıyla tamamladın ve profil rozet koleksiyonuna eklendi!`
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

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <button
                            onClick={() => startStudySet(selectedTopic!, difficulty, currentBadge === 'Uzman')}
                            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
                        >
                            Seti Tekrar Çöz
                        </button>
                        {isPassed && difficulty === 'kolay' && (
                            <button
                                onClick={() => startStudySet(selectedTopic!, 'orta')}
                                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                            >
                                Orta Seviyeye Geç (Kalfa Rozeti) →
                            </button>
                        )}
                        {isPassed && difficulty === 'orta' && (
                            <button
                                onClick={() => startStudySet(selectedTopic!, 'zor')}
                                className="py-3 px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                            >
                                Zor Seviyeye Geç (Usta Rozeti) →
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

    // MAIN TOPIC AND LGS SELECTOR SCREEN
    return (
        <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100">
                    <Brain size={14} /> M.İ.T Yapay Zeka Destekli Çalışma Odası
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Çalışma Odası & Antrenör</h2>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                    7 soruluk Kolay, Orta ve Zor soru setleri ile ilerleyin. Çırak, Kalfa, Usta ve Uzman rozetlerini toplayın!
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
                    <Layers size={16} /> Konu Odaklı 7'li Setler
                </button>
                <button
                    onClick={() => setViewMode('lgs')}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        viewMode === 'lgs' ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Target size={16} /> LGS Özel Antrenör & PDF Soru Bankası (Uzman)
                </button>
            </div>

            {/* BADGES SUMMARY STRIP */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <Award size={16} className="text-amber-500" /> Rozet Kademeleri:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 font-bold flex items-center gap-1">
                        🥉 Çırak (Kolay)
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-300 font-bold flex items-center gap-1">
                        🥈 Kalfa (Orta)
                    </span>
                    <span className="px-2.5 py-1 bg-yellow-50 text-yellow-900 rounded-lg border border-yellow-200 font-bold flex items-center gap-1">
                        🥇 Usta (Zor)
                    </span>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-900 rounded-lg border border-purple-200 font-bold flex items-center gap-1">
                        🏆 Uzman (LGS)
                    </span>
                </div>
            </div>

            {viewMode === 'topics' ? (
                /* TOPICS LIST WITH 3 DIFFICULTY BUTTONS PER TOPIC */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topics.map((t) => {
                        const earned = earnedBadges[t] || [];
                        return (
                            <div key={t} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-black text-slate-800 text-base">{t}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">7 Soruluk Kademe Setleri</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {earned.map((b, i) => (
                                            <span key={i} title={b} className="text-sm">{badgeMeta[b]?.icon}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => startStudySet(t, 'kolay')}
                                        className="py-2 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-1 border border-amber-200"
                                    >
                                        <span>🥉 Kolay</span>
                                        <span className="text-[10px] text-amber-700 font-medium">Çırak</span>
                                    </button>
                                    <button
                                        onClick={() => startStudySet(t, 'orta')}
                                        className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-1 border border-slate-300"
                                    >
                                        <span>🥈 Orta</span>
                                        <span className="text-[10px] text-slate-600 font-medium">Kalfa</span>
                                    </button>
                                    <button
                                        onClick={() => startStudySet(t, 'zor')}
                                        className="py-2 px-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-900 rounded-xl text-xs font-black transition-colors flex flex-col items-center gap-1 border border-yellow-300"
                                    >
                                        <span>🥇 Zor</span>
                                        <span className="text-[10px] text-yellow-700 font-medium">Usta</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* LGS TRAINER MODE WITH PDF QUESTIONS */
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800 shadow-xl text-white space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-6">
                        <div className="space-y-1">
                            <span className="text-xs font-black text-purple-400 uppercase tracking-wider flex items-center gap-1">
                                <Award size={14} /> LGS Deneme Soru Bankası
                            </span>
                            <h3 className="text-2xl font-black">Yeni Nesil LGS Simülasyonu</h3>
                            <p className="text-indigo-200 text-xs sm:text-sm max-w-lg">
                                MEB müfredatına ve LGS sınav formatına tam uyumlu, PDF soru bankasından çekilen 7'şer soruluk yeni nesil soru setleri.
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
                                onClick={() => startStudySet(`LGS Deneme #${num}`, 'zor', true)}
                                className="p-5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-400 rounded-2xl text-left transition-all group flex flex-col justify-between h-36"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="w-8 h-8 rounded-xl bg-purple-500/30 text-purple-300 flex items-center justify-center font-black text-sm group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        #{num}
                                    </span>
                                    <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-md text-indigo-300">
                                        7 Yeni Nesil
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-purple-200 text-sm">LGS Deneme Seti {num}</h4>
                                    <p className="text-[11px] text-indigo-300 mt-0.5">Analitik Muhakeme & Okuma-Anlama</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
