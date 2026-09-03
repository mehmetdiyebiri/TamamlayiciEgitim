import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, Play, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../../../data/diagnosticQuestions';

export const DiagnosticView = () => {
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(0);

            const diagnosticQuestions = useMemo(() => {
        // We import DIAGNOSTIC_QUESTIONS dynamically or just use it directly
        return DIAGNOSTIC_QUESTIONS;
    }, []);

    const currentQ = diagnosticQuestions[qIndex];

    const handleOptionSelect = (opt: string) => {
        if (selectedOption !== null) return;
        setSelectedOption(opt);
        if (opt === currentQ.ans) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (qIndex + 1 < diagnosticQuestions.length) {
            setQIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setCompleted(true);
        }
    };

    if (completed) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-sm mt-10">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black mb-4 text-slate-900">Sınav Tamamlandı</h2>
                <p className="text-slate-500 font-medium mb-8 text-lg">Sonuçların öğretmenine iletildi. Seviyen kısa süre içinde belirlenecektir.</p>
                <div className="bg-slate-50 px-8 py-5 rounded-2xl border border-slate-200 inline-block shadow-inner">
                    <div className="text-sm font-bold text-slate-400 uppercase mb-2 tracking-wider">Doğru Sayısı</div>
                    <div className="text-4xl font-black text-indigo-600">{score} <span className="text-2xl text-slate-400">/ {diagnosticQuestions.length}</span></div>
                </div>
            </motion.div>
        );
    }

    if (started && currentQ) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-10">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Seviye Tespit</h2>
                        {(currentQ as any).topic && <p className="text-slate-500 font-medium">{(currentQ as any).topic}</p>}
                    </div>
                    <div className="bg-white px-5 py-2.5 rounded-full font-bold text-indigo-600 border border-indigo-100 shadow-sm flex items-center gap-2 self-start md:self-auto">
                        <span className="text-slate-400">Soru</span> {qIndex + 1} / {diagnosticQuestions.length}
                    </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-lg mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                        <div className="h-full bg-indigo-500 transition-all duration-500 ease-out" style={{ width: `${((qIndex + 1) / diagnosticQuestions.length) * 100}%` }} />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-10 leading-relaxed max-w-3xl">
                        {currentQ.q}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.options.map((opt: string, i: number) => {
                            const isAnswered = selectedOption !== null;
                            const isSelected = selectedOption === opt;
                            
                            let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md";
                            
                            if (isAnswered) {
                                if (isSelected) {
                                    btnClass = "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm ring-2 ring-indigo-500 ring-opacity-20";
                                } else {
                                    btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    disabled={isAnswered}
                                    onClick={() => handleOptionSelect(opt)}
                                    className={`p-5 rounded-2xl border-2 font-bold text-left transition-all duration-200 flex justify-between items-center group ${btnClass}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isAnswered && isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors'}`}>
                                            {['A', 'B', 'C', 'D'][i]}
                                        </span>
                                        {opt}
                                    </span>
                                    {isAnswered && isSelected && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <CheckCircle2 className="text-indigo-600" size={24} />
                                        </motion.div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence>
                    {selectedOption && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }}
                            className="flex justify-end"
                        >
                            <button onClick={handleNext} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 group">
                                {qIndex + 1 === diagnosticQuestions.length ? 'Sınavı Bitir' : 'Sonraki Soru'} 
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto py-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-3">Seviye Tespit Sınavı</h2>
                <p className="text-slate-500 font-medium">Mevcut matematik seviyeni belirlemek ve sana özel bir çalışma programı oluşturmak için bu sınavı tamamlamalısın.</p>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-indigo-100 rotate-3 z-10">
                    <ClipboardList size={48} className="-rotate-3" />
                </div>
                
                <h3 className="text-3xl font-black text-slate-800 mb-4 z-10">Hazır Bulunuşluk Sınavı</h3>
                <p className="text-slate-500 mb-10 max-w-lg text-lg leading-relaxed z-10">
                    Öğretmeninin atadığı bu sınav, senin matematik becerilerini ölçmek için özel olarak hazırlandı. Lütfen süreye dikkat ederek soruları yanıtla.
                </p>
                
                <div className="flex gap-6 mb-10 z-10">
                    <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-slate-200">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Soru Sayısı</div>
                        <div className="text-2xl font-black text-slate-700">{diagnosticQuestions.length} Soru</div>
                    </div>
                    <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-slate-200">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Önerilen Süre</div>
                        <div className="text-2xl font-black text-slate-700">{diagnosticQuestions.length * 2} Dk</div>
                    </div>
                </div>
                
                <button onClick={() => setStarted(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 px-12 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200 flex items-center gap-3 text-lg group z-10">
                    <Play size={24} className="group-hover:scale-110 transition-transform" /> Sınava Başla
                </button>
            </div>
        </motion.div>
    );
};
