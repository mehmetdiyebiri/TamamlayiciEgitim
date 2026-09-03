import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, BookOpen, Target, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { FORMULAS } from '../../../data/formulas';

export const FormulaCardsView = ({ grade, FORMULAS }: { grade: number, FORMULAS: any }) => {
    const formulas = FORMULAS[grade as keyof typeof FORMULAS] || FORMULAS[8];
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [loadingQuiz, setLoadingQuiz] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [qIndex, setQIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const nextCard = () => {
        setFlipped(false);
        setIsQuizMode(false);
        setQIndex(0);
        setCorrectCount(0);
        setQuizQuestions([]);
        setSelectedOption(null);
        setIsAnswered(false);
        setTimeout(() => setIndex((i) => (i + 1) % formulas.length), 150);
    };

    const prevCard = () => {
        setFlipped(false);
        setIsQuizMode(false);
        setQIndex(0);
        setCorrectCount(0);
        setQuizQuestions([]);
        setSelectedOption(null);
        setIsAnswered(false);
        setTimeout(() => setIndex((i) => (i - 1 + formulas.length) % formulas.length), 150);
    };

    const fetchQuiz = async (title: string) => {
        setLoadingQuiz(true);
        try {
            const res = await fetch('/api/generate-math-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    grade,
                    topic: title,
                    count: 5,
                    difficulty: "kolay, formül uygulama pratik"
                })
            });
            const data = await res.json();
            if (data.questions) {
                setQuizQuestions(data.questions);
            }
        } catch (e) {
            console.error(e);
        }
        setLoadingQuiz(false);
    };

    const startQuiz = () => {
        setIsQuizMode(true);
        setQIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        fetchQuiz(formulas[index].title);
    };

    const handleAnswer = (opt: string) => {
        if (isAnswered) return;
        setSelectedOption(opt);
        setIsAnswered(true);
        if (opt === quizQuestions[qIndex].ans) {
            setCorrectCount(prev => prev + 1);
        }
    };
    
    const nextQuizQuestion = () => {
        setQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    const retryQuiz = () => {
        setQIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        fetchQuiz(formulas[index].title);
    };

    const card = formulas[index];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2 mb-2">
                <h2 className="text-2xl font-black text-slate-900">Kalıp Formül Kartları</h2>
                <p className="text-slate-500 font-medium">Formülleri ezberleme, mantığını kavra. ({grade}. Sınıf Seçkisi)</p>
            </div>

            <AnimatePresence mode="wait">
                {!isQuizMode ? (
                    <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-8">
                        <div className="w-full aspect-[4/3] cursor-pointer max-h-[400px]" style={{ perspective: "1000px" }} onClick={() => setFlipped(!flipped)}>
                            <motion.div 
                                className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}
                                animate={{ rotateY: flipped ? 180 : 0 }}
                                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                {/* Front */}
                                <div className="absolute inset-0 bg-white border-2 border-indigo-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                                    <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                        {index + 1} / {formulas.length}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-8">{card.title}</h3>
                                    <div className="absolute bottom-6 text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full">
                                        <RotateCcw size={14}/> Formülü Görmek İçin Tıkla
                                    </div>
                                </div>

                                {/* Back */}
                                <div className="absolute inset-0 bg-slate-800 text-white rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col justify-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <div className="bg-white/10 w-16 h-1 bg-white/20 rounded-full mx-auto absolute top-6 left-1/2 -translate-x-1/2"></div>
                                    
                                    <div className="text-3xl md:text-4xl font-mono font-black text-indigo-300 bg-white/10 border border-white/10 px-6 py-4 rounded-2xl mb-6 text-center">
                                        {card.formula}
                                    </div>
                                    
                                    <h4 className="font-bold text-indigo-300 mb-2 uppercase text-sm tracking-wider flex items-center gap-2"><BookOpen size={16}/> Kural</h4>
                                    <p className="text-slate-200 font-medium mb-6 text-base leading-relaxed">{card.desc}</p>
                                    
                                    <h4 className="font-bold text-emerald-400 mb-2 uppercase text-sm tracking-wider flex items-center gap-2"><Target size={16}/> Çözümlü Örnek</h4>
                                    <div className="bg-white/10 p-4 rounded-xl text-emerald-50 text-sm font-mono leading-relaxed border border-white/10">
                                        {card.example}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        
                        <div className="flex gap-4 w-full">
                            <button onClick={prevCard} className="flex-1 py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">Önceki Kart</button>
                            {flipped && (
                                <button onClick={startQuiz} className="flex-1 py-4 bg-emerald-500 rounded-2xl font-bold text-white hover:bg-emerald-400 shadow-md shadow-emerald-200 transition-all active:scale-95">Uygulamaya Geç</button>
                            )}
                            {!flipped && (
                                <button onClick={nextCard} className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-200 transition-all active:scale-95">Sonraki Kart</button>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                        {loadingQuiz ? (
                            <div className="bg-white p-16 rounded-[2rem] border-2 border-slate-100 shadow-lg text-center flex flex-col items-center">
                                <Loader2 size={48} className="animate-spin text-emerald-500 mb-4" />
                                <h3 className="text-xl font-bold text-slate-800">Sorular Hazırlanıyor...</h3>
                                <p className="text-slate-500 mt-2">Yapay zeka {card.title} formülü için pratik soruları oluşturuyor.</p>
                            </div>
                        ) : (
                            qIndex < 5 && quizQuestions.length > 0 ? (
                                <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((qIndex + 1) / 5) * 100}%` }} />
                                    </div>
                                    <div className="text-center mb-8 mt-4">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">{card.title} Uygulaması</h3>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Soru {qIndex + 1} / 5</div>
                                    </div>
                                    
                                    <div className="text-xl font-bold text-slate-800 mb-8 leading-relaxed text-center">
                                        {quizQuestions[qIndex].q}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {quizQuestions[qIndex].options.map((opt: string, i: number) => {
                                            const isSelected = selectedOption === opt;
                                            const isCorrectOpt = isAnswered && opt === quizQuestions[qIndex].ans;
                                            const isWrongOpt = isAnswered && isSelected && opt !== quizQuestions[qIndex].ans;
                                            
                                            let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50";
                                            if (isAnswered) {
                                                if (isCorrectOpt) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm";
                                                else if (isWrongOpt) btnClass = "bg-rose-50 border-rose-500 text-rose-800 shadow-sm";
                                                else btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                                            } else if (isSelected) {
                                                btnClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                                            }

                                            return (
                                                <button 
                                                    key={i} 
                                                    disabled={isAnswered}
                                                    onClick={() => handleAnswer(opt)} 
                                                    className={`p-4 rounded-xl border-2 font-bold text-left transition-all flex items-center justify-between ${btnClass}`}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isCorrectOpt ? 'bg-emerald-500 text-white' : isWrongOpt ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                            {['A', 'B', 'C', 'D'][i]}
                                                        </span>
                                                        {opt}
                                                    </span>
                                                    {isCorrectOpt && <CheckCircle2 className="text-emerald-600" size={24} />}
                                                    {isWrongOpt && <XCircle className="text-rose-600" size={24} />}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <AnimatePresence>
                                        {isAnswered && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
                                                <button onClick={nextQuizQuestion} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1">
                                                    {qIndex === 4 ? 'Sonuçları Gör' : 'Sıradaki Soru'}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-lg text-center">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${correctCount >= 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        {correctCount >= 4 ? <CheckCircle2 size={40} /> : <RotateCcw size={40} />}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 mb-4">{correctCount >= 4 ? 'Başarılı!' : 'Biraz Daha Çalışmalısın'}</h3>
                                    <p className="text-slate-600 mb-8">%80 Başarı Kriteri: {correctCount} / 5 Doğru</p>
                                    
                                    {correctCount >= 4 ? (
                                        <button onClick={nextCard} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg w-full">Sonraki Formüle Geç</button>
                                    ) : (
                                        <div className="flex gap-4">
                                            <button onClick={() => setIsQuizMode(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-all">Kartı Tekrar İncele</button>
                                            <button onClick={retryQuiz} className="flex-1 bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg">Uygulamayı Tekrarla</button>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
