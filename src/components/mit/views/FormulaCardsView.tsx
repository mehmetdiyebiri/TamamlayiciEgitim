import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, BookOpen, Target, CheckCircle2, XCircle, Award, ChevronRight, ChevronLeft, HelpCircle, Sparkles } from 'lucide-react';
import { getFormulaQuiz } from '../../../data/formulaQuizzes';

export const FormulaCardsView = ({ grade, FORMULAS }: { grade: number, FORMULAS: any }) => {
    const formulas = FORMULAS[grade as keyof typeof FORMULAS] || FORMULAS[8];
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    
    // Quiz state
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [qIndex, setQIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [completedFormulas, setCompletedFormulas] = useState<Record<string, boolean>>({});

    const card = formulas[index] || formulas[0];

    // Load questions whenever current card changes
    useEffect(() => {
        const questions = getFormulaQuiz(card.title);
        setQuizQuestions(questions);
        setQIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
    }, [index, card.title]);

    const nextCard = () => {
        setFlipped(false);
        setIsQuizMode(false);
        setQIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
        setIndex((i) => (i + 1) % formulas.length);
    };

    const prevCard = () => {
        setFlipped(false);
        setIsQuizMode(false);
        setQIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
        setIndex((i) => (i - 1 + formulas.length) % formulas.length);
    };

    const startQuiz = () => {
        setIsQuizMode(true);
        setQIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
    };

    const handleAnswer = (opt: string) => {
        if (isAnswered) return;
        setSelectedOption(opt);
        setIsAnswered(true);
        const currentQ = quizQuestions[qIndex];
        const isCorrect = opt === currentQ.ans;
        if (isCorrect) {
            setCorrectCount(prev => {
                const nextVal = prev + 1;
                if (qIndex === 4 && nextVal >= 4) {
                    setCompletedFormulas(c => ({ ...c, [card.title]: true }));
                }
                return nextVal;
            });
        } else if (qIndex === 4 && correctCount >= 4) {
            setCompletedFormulas(c => ({ ...c, [card.title]: true }));
        }
    };
    
    const nextQuizQuestion = () => {
        setQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
    };

    const retryQuiz = () => {
        setQIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
    };

    const currentQ = quizQuestions[qIndex];
    const isMastered = !!completedFormulas[card.title];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-start max-w-4xl mx-auto space-y-6 py-2 px-2 sm:px-4">
            {/* Header */}
            <div className="text-center space-y-1 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider">
                    <Sparkles size={14} /> {grade}. Sınıf Matematik Kalıp Formülleri
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Kalıp Formül Kartları & Pekiştirme</h2>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                    Formülleri ezberleme, mantığını keşfet. Kartın altındaki 5 soruluk uygulama testinde %80 (4/5) başarı göstererek formülü pekiştir!
                </p>
            </div>

            {/* Quick Formula Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-thin">
                {formulas.map((f: any, idx: number) => {
                    const active = idx === index;
                    const mastered = completedFormulas[f.title];
                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                setIndex(idx);
                                setFlipped(false);
                                setIsQuizMode(false);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                                active
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : mastered
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {mastered && <CheckCircle2 size={12} className="text-emerald-500" />}
                            <span>{f.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-full max-w-md">
                <button
                    onClick={() => setIsQuizMode(false)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        !isQuizMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <BookOpen size={14} /> Formül Kartı
                </button>
                <button
                    onClick={() => setIsQuizMode(true)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        isQuizMode ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <Target size={14} /> 5 Soruluk Pekiştirme ({isMastered ? '✓ Tamamlandı' : '%80 Eşik'})
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!isQuizMode ? (
                    <motion.div key="card-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full space-y-6">
                        {/* 3D Flip Card */}
                        <div 
                            className="w-full aspect-[16/10] max-h-[380px] cursor-pointer" 
                            style={{ perspective: "1000px" }} 
                            onClick={() => setFlipped(!flipped)}
                        >
                            <motion.div 
                                className="w-full h-full relative" 
                                style={{ transformStyle: 'preserve-3d' }}
                                animate={{ rotateY: flipped ? 180 : 0 }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 240, damping: 20 }}
                            >
                                {/* FRONT */}
                                <div 
                                    className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50/40 border-2 border-indigo-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center shadow-md hover:shadow-xl transition-all"
                                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-black">
                                            Kart {index + 1} / {formulas.length}
                                        </span>
                                        {isMastered && (
                                            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black">
                                                <Award size={14} /> Formül Ustası
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto text-2xl font-black">
                                            fx
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{card.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
                                            Kuralı, formülü ve örnek soru çözümünü incelemek için karta tıkla.
                                        </p>
                                    </div>

                                    <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-2 bg-white border border-indigo-100 px-4 py-2 rounded-full shadow-sm">
                                        <RotateCcw size={14}/> Formülü Çevir ve Gör
                                    </div>
                                </div>

                                {/* BACK */}
                                <div 
                                    className="absolute inset-0 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between"
                                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">
                                            {card.title} Formülü
                                        </span>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg"
                                        >
                                            <RotateCcw size={12}/> Ön Yüz
                                        </button>
                                    </div>

                                    <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-300 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-center shadow-inner my-2">
                                        {card.formula}
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-black text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                                <BookOpen size={14}/> Kural ve Mantık
                                            </h4>
                                            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                                        </div>

                                        <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl">
                                            <h4 className="font-black text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                                <Target size={14}/> Çözümlü Örnek
                                            </h4>
                                            <p className="text-emerald-100 font-mono text-xs leading-relaxed">{card.example}</p>
                                        </div>
                                    </div>

                                    <div className="text-center text-[11px] text-slate-400 font-medium">
                                        Uygulama sorularına geçmek için aşağıdaki butonu kullanabilirsiniz.
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Navigation and Action Buttons */}
                        <div className="flex gap-3 w-full">
                            <button 
                                onClick={prevCard} 
                                className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 text-sm shadow-sm"
                            >
                                <ChevronLeft size={16} /> Önceki Formül
                            </button>
                            <button 
                                onClick={startQuiz} 
                                className="flex-1 py-3 bg-emerald-600 rounded-2xl font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-sm"
                            >
                                <Target size={16} /> Pekiştirme Sorularını Çöz (5 Soru)
                            </button>
                            <button 
                                onClick={nextCard} 
                                className="flex-1 py-3 bg-indigo-600 rounded-2xl font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-1 text-sm"
                            >
                                Sonraki <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* QUIZ MODE */
                    <motion.div key="quiz-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full">
                        {qIndex < 5 && currentQ ? (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden space-y-6">
                                {/* Progress Bar */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                                    <div 
                                        className="h-full bg-emerald-500 transition-all duration-300" 
                                        style={{ width: `${((qIndex + 1) / 5) * 100}%` }} 
                                    />
                                </div>

                                {/* Quiz Header */}
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <div className="text-xs font-black text-indigo-600 uppercase tracking-wider">{card.title} Pekiştirme</div>
                                        <h3 className="text-lg sm:text-xl font-black text-slate-800">Soru {qIndex + 1} / 5</h3>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-500">
                                            Doğru: <b className="text-emerald-600">{correctCount}</b> / {qIndex + (isAnswered ? 1 : 0)}
                                        </span>
                                        <button 
                                            onClick={() => setShowHint(!showHint)}
                                            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1 transition-colors"
                                        >
                                            <HelpCircle size={14} /> {showHint ? 'İpucunu Kapat' : 'İpucu'}
                                        </button>
                                    </div>
                                </div>

                                {/* Hint banner */}
                                {showHint && currentQ.hint && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
                                        <Sparkles size={16} className="text-amber-500 shrink-0" />
                                        <span><b>İpucu:</b> {currentQ.hint}</span>
                                    </motion.div>
                                )}

                                {/* Question Text */}
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                                    {currentQ.question || currentQ.q}
                                </div>

                                {/* Options A, B, C, D */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(currentQ.options || []).map((opt: string, i: number) => {
                                        const isSelected = selectedOption === opt;
                                        const isCorrectOpt = isAnswered && opt === currentQ.ans;
                                        const isWrongOpt = isAnswered && isSelected && opt !== currentQ.ans;

                                        let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/30";
                                        if (isAnswered) {
                                            if (isCorrectOpt) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
                                            else if (isWrongOpt) btnClass = "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
                                            else btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                                        } else if (isSelected) {
                                            btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800";
                                        }

                                        return (
                                            <button
                                                key={i}
                                                disabled={isAnswered}
                                                onClick={() => handleAnswer(opt)}
                                                className={`p-3.5 rounded-xl border-2 font-bold text-left transition-all flex items-center justify-between ${btnClass}`}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
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

                                {/* Explanation Banner after answering */}
                                {isAnswered && (
                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl text-xs sm:text-sm font-medium border ${
                                        selectedOption === currentQ.ans ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                                    }`}>
                                        <div className="font-black mb-1 flex items-center gap-1.5">
                                            {selectedOption === currentQ.ans ? (
                                                <><CheckCircle2 size={16} className="text-emerald-600" /> Tebrikler, Doğru Cevap!</>
                                            ) : (
                                                <><XCircle size={16} className="text-rose-600" /> Dikkat! Doğru Cevap: {currentQ.ans}</>
                                            )}
                                        </div>
                                        <p className="text-slate-700 font-normal">{currentQ.explanation}</p>
                                    </motion.div>
                                )}

                                {/* Bottom navigation in quiz */}
                                <div className="flex items-center justify-between pt-2">
                                    <button
                                        onClick={() => setIsQuizMode(false)}
                                        className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                                    >
                                        Formül Kartına Geri Dön
                                    </button>

                                    {isAnswered && (
                                        <button
                                            onClick={nextQuizQuestion}
                                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center gap-1.5 text-sm"
                                        >
                                            {qIndex === 4 ? 'Sonuçları Gör' : 'Sıradaki Soru'} <ChevronRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* QUIZ RESULTS */
                            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                                    correctCount >= 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {correctCount >= 4 ? <Award size={44} /> : <RotateCcw size={44} />}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                                        {correctCount >= 4 ? 'Tebrikler! Formülü Pekiştirdin' : 'Biraz Daha Alıştırma Gerekli'}
                                    </h3>
                                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                                        {correctCount >= 4
                                            ? `%80 başarı eşiğini aştınız (${correctCount} / 5 doğru). ${card.title} formülü ustalık listenize eklendi!`
                                            : `%80 başarı eşiği için en az 4 doğru gereklidir. Skorunuz: ${correctCount} / 5. Tekrar deneyebilirsiniz.`}
                                    </p>
                                </div>

                                <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-emerald-600">{correctCount}</div>
                                        <div className="text-[11px] font-bold text-slate-500 uppercase">Doğru</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-rose-500">{5 - correctCount}</div>
                                        <div className="text-[11px] font-bold text-slate-500 uppercase">Yanlış</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-indigo-600">%{correctCount * 20}</div>
                                        <div className="text-[11px] font-bold text-slate-500 uppercase">Başarı</div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                                    <button
                                        onClick={retryQuiz}
                                        className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <RotateCcw size={16} /> Testi Tekrarla
                                    </button>
                                    <button
                                        onClick={() => setIsQuizMode(false)}
                                        className="py-3 px-6 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <BookOpen size={16} /> Kartı İncele
                                    </button>
                                    {correctCount >= 4 && (
                                        <button
                                            onClick={nextCard}
                                            className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            Sıradaki Formüle Geç <ChevronRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
