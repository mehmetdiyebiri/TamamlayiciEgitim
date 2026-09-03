import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, CheckCircle2, ChevronRight, XCircle, AlertTriangle, ArrowLeft, BarChart, Sparkles, Loader2, Award } from 'lucide-react';
import { QUESTIONS } from '../../../data/questions';

export const StudyRoomView = ({ grade }: { grade: number }) => {
    // Generate topic list from existing questions data for the grade
    const qList = (QUESTIONS as any)[grade] || (QUESTIONS as any)[8];
    const topics = Array.from(new Set(qList.map((q: any) => q.topic))) as string[];

    const [viewMode, setViewMode] = useState<'topics' | 'mindmaps' | 'lgs'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<'basit' | 'orta' | 'zor'>('basit');
    const [badge, setBadge] = useState<'Çırak' | 'Kalfa' | 'Usta' | 'Uzman'>('Çırak');
    
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const [qIndex, setQIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);

        const loadQuestions = (topic: string, diff: string, isLgs: boolean, testNumber: number) => {
        setLoading(true);
        // Find questions from static pool
        let pool = qList.filter((q: any) => q.topic === topic);
        if (isLgs) {
            pool = pool.filter((q: any) => q.difficulty === 'hard');
        } else {
            // For normal mode, distribute difficulty or just take random. Let's say if testNumber is higher, harder questions.
            // Or just take random 10 questions. The prompt says "10'ar soruluk 5 tane test".
            // We just chunk the pool.
            // Sort deterministically by id so tests are consistent
            pool = pool.sort((a, b) => a.id - b.id);
        }
        
        // chunk into 10 questions
        const startIndex = (testNumber - 1) * 10;
        let selectedQuestions = pool.slice(startIndex, startIndex + 10);
        
        // If not enough questions, just wrap around or take random
        if (selectedQuestions.length < 10 && pool.length > 0) {
           selectedQuestions = [...selectedQuestions, ...pool.slice(0, 10 - selectedQuestions.length)];
        }
        
        // Fallback if still no questions
        if (selectedQuestions.length === 0) {
            selectedQuestions = qList.slice(0, 10);
        }
        
        setQuestions(selectedQuestions);
        setLoading(false);
    };

        const [testSelectionTopic, setTestSelectionTopic] = useState<{topic: string, isLgs: boolean} | null>(null);
    const [selectedMapTopic, setSelectedMapTopic] = useState<string | null>(null);

    const handleTopicSelect = (topic: string, isLgs: boolean) => {
        setTestSelectionTopic({ topic, isLgs });
    };
    
    const handleStartTest = (testNumber: number) => {
        const topic = testSelectionTopic!.topic;
        const isLgs = testSelectionTopic!.isLgs;
        setSelectedTopic(topic);
        setDifficulty(isLgs ? 'zor' : 'basit');
        setBadge(isLgs ? 'Uzman' : 'Çırak');
        setQIndex(0);
        setScore(0);
        setCompleted(false);
        setIsAnswered(false);
        setSelectedOption(null);
        setTestSelectionTopic(null); // Clear test selection screen
        loadQuestions(topic, isLgs ? 'zor' : 'basit', isLgs, testNumber);
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
        }
    };

        const handleNextLevel = () => {
        // Go back to test selection
        setSelectedTopic(null);
        setTestSelectionTopic({ topic: selectedTopic!, isLgs: difficulty === 'zor' });
    };

    const badgeColors = {
        'Çırak': 'bg-slate-100 text-slate-600',
        'Kalfa': 'bg-blue-100 text-blue-700',
        'Usta': 'bg-purple-100 text-purple-700',
        'Uzman': 'bg-amber-100 text-amber-700'
    };

    if (!selectedTopic) {
        if (viewMode === 'mindmaps') {
            if (selectedMapTopic) {
                return (
                    <div className="max-w-4xl mx-auto py-10">
                        <button onClick={() => setSelectedMapTopic(null)} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 mb-6 text-sm">
                            <ArrowLeft size={16} /> Haritalara Dön
                        </button>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Brain size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 mb-6">{selectedMapTopic} Zihin Haritası</h2>
                            
                            <div className="relative w-full max-w-2xl mx-auto py-10 border-2 border-dashed border-amber-200 rounded-3xl bg-amber-50">
                                {/* Flowchart Mock */}
                                <div className="flex flex-col items-center gap-8 relative z-10">
                                    <div className="bg-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-lg z-10">{selectedMapTopic} (Ana Konu)</div>
                                    <div className="w-1 h-8 bg-amber-300 -my-8 z-0"></div>
                                    <div className="flex gap-4 sm:gap-12 z-10">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="bg-white text-amber-700 border-2 border-amber-300 font-bold py-2 px-6 rounded-2xl shadow-sm">Kavramlar</div>
                                            <div className="w-1 h-6 bg-amber-200 -my-6 z-0"></div>
                                            <div className="bg-white text-slate-600 text-sm py-2 px-4 rounded-xl shadow-sm border border-slate-100">Temel Tanımlar</div>
                                        </div>
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="bg-white text-amber-700 border-2 border-amber-300 font-bold py-2 px-6 rounded-2xl shadow-sm">İşlemler</div>
                                            <div className="w-1 h-6 bg-amber-200 -my-6 z-0"></div>
                                            <div className="bg-white text-slate-600 text-sm py-2 px-4 rounded-xl shadow-sm border border-slate-100">Formüller & Kurallar</div>
                                        </div>
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="bg-white text-amber-700 border-2 border-amber-300 font-bold py-2 px-6 rounded-2xl shadow-sm">Uygulama</div>
                                            <div className="w-1 h-6 bg-amber-200 -my-6 z-0"></div>
                                            <div className="bg-white text-slate-600 text-sm py-2 px-4 rounded-xl shadow-sm border border-slate-100">Örnek Soru Tipleri</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Connection lines */}
                                <div className="absolute top-[108px] left-1/2 -translate-x-1/2 w-2/3 sm:w-[320px] h-1 bg-amber-300 z-0"></div>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="max-w-4xl mx-auto py-10">
                    <button onClick={() => setViewMode('topics')} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 mb-6 text-sm">
                        <ArrowLeft size={16} /> Çalışma Odasına Dön
                    </button>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Brain size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-4">Zihin Haritaları</h2>
                        <p className="text-slate-500 mb-8">Konuların kavramsal ilişkilerini incelemek için bir harita seçin.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            {topics.map(t => (
                                <button key={t} onClick={() => setSelectedMapTopic(t)} className="p-4 border border-slate-200 hover:border-amber-400 hover:bg-amber-50 rounded-2xl flex justify-between items-center transition-all group">
                                    <span className="font-bold text-slate-700 group-hover:text-amber-700">{t} Haritası</span>
                                    <ChevronRight className="text-slate-400 group-hover:text-amber-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (viewMode === 'lgs') {
            return (
                <div className="max-w-4xl mx-auto py-10">
                    <button onClick={() => setViewMode('topics')} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 mb-6 text-sm">
                        <ArrowLeft size={16} /> Çalışma Odasına Dön
                    </button>
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-3xl border border-indigo-800 shadow-lg text-center text-white">
                        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-black mb-4">LGS Özel Antrenör (Yeni Nesil)</h2>
                        <p className="text-indigo-200 mb-8 max-w-xl mx-auto">Sadece yeni nesil, çok kazanımlı ve mantık muhakeme ağırlıklı sorulardan oluşan 8. sınıf LGS simülasyonu testleri.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            {topics.map(t => (
                                <button key={t} onClick={() => {
                                    handleTopicSelect(t, true);
                                }} className="p-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex flex-col gap-2 transition-all group">
                                    <span className="font-bold text-white group-hover:text-indigo-200">{t}</span>
                                    <span className="text-xs text-indigo-300">LGS Simülasyonu</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        if (testSelectionTopic) {
            return (
                <div className="max-w-4xl mx-auto py-10">
                    <button onClick={() => setTestSelectionTopic(null)} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 mb-6 text-sm">
                        <ArrowLeft size={16} /> Konulara Dön
                    </button>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <h2 className="text-3xl font-black text-slate-800 mb-2">{testSelectionTopic.topic}</h2>
                        <p className="text-slate-500 mb-8">{testSelectionTopic.isLgs ? 'LGS Denemeleri (Her biri 10 soru)' : 'Konu Testleri (Her biri 10 soru)'}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5].map(num => (
                                <button key={num} onClick={() => handleStartTest(num)} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${testSelectionTopic.isLgs ? 'border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50' : 'border-slate-100 hover:border-emerald-500 hover:bg-emerald-50'}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${testSelectionTopic.isLgs ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>{num}</div>
                                    <span className="font-bold text-slate-700">Test {num}</span>
                                    <span className="text-xs text-slate-400">10 Soru</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto py-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-black text-slate-900 mb-3">Çalışma Odası</h2>
                    <p className="text-slate-500 font-medium text-lg">Yapay Zeka Destekli Özel Antrenör</p>
                    <p className="text-slate-500 mt-2">Çalışmak istediğin konuyu seç ve 10'ar soruluk testlerle pratik yap.</p>
                </div>

                <div className="flex justify-center gap-4 mb-10">
                    <button onClick={() => setViewMode('mindmaps')} className="flex items-center gap-2 px-6 py-3 bg-amber-50 text-amber-700 rounded-xl font-bold hover:bg-amber-100 transition-colors border border-amber-200">
                        <Brain size={20} /> Zihin Haritaları
                    </button>
                    {grade === 8 && (
                        <button onClick={() => setViewMode('lgs')} className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition-colors border border-indigo-200">
                            <Target size={20} /> LGS Bölümü
                        </button>
                    )}
                </div>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-3">Çalışma Odası</h2>
                    <p className="text-slate-500 font-medium text-lg">Yapay Zeka Destekli Özel Antrenör</p>
                    <p className="text-slate-500 mt-2">Çalışmak istediğin konuyu seç, yapay zeka sana özel 7'şer soruluk setler hazırlasın. Basitten zora ilerleyerek rozetleri topla!</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {topics.map(t => (
                        <button 
                            key={t}
                            onClick={() => handleTopicSelect(t, false)}
                            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all text-left group flex flex-col items-start gap-4"
                        >
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Brain size={28} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-xl group-hover:text-indigo-700 transition-colors">{t}</h3>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <Loader2 size={48} className="animate-spin text-indigo-600 mb-6" />
                <h3 className="text-2xl font-black text-slate-800 mb-2">Sorular Hazırlanıyor...</h3>
                <p className="text-slate-500 font-medium">Test soruları hazırlanıyor...</p>
            </div>
        );
    }

    if (completed) {
        const pass = score >= 7; // 10 soruda 5 doğru = başarılı
        
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-sm mt-10">
                <div className="flex gap-2 mb-6">
                    <span className={`px-4 py-1 rounded-full font-bold text-sm ${badgeColors[badge]}`}>
                        Mevcut Rozet: {badge}
                    </span>
                </div>
                
                {pass ? (
                    <>
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award size={48} />
                        </div>
                        <h2 className="text-3xl font-black mb-4 text-slate-900">Tebrikler! Seti Başarıyla Tamamladın</h2>
                        <p className="text-slate-500 font-medium mb-8 text-lg">10 soruda {score} doğru yaptın. Harika ilerliyorsun.</p>
                        
                        {badge === 'Uzman' ? (
                            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-amber-800 font-bold">
                                Bu konudaki en yüksek seviyeye (Uzman) ulaştın! Başka bir konu seçebilirsin.
                            </div>
                        ) : (
                            <button onClick={handleNextLevel} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                Bir Sonraki Seviyeye Geç <ChevronRight />
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={48} />
                        </div>
                        <h2 className="text-3xl font-black mb-4 text-slate-900">Biraz Daha Pratik Gerekli</h2>
                        <p className="text-slate-500 font-medium mb-8 text-lg">10 soruda {score} doğru yaptın. Seviye atlamak için en az 7 doğru yapmalısın.</p>
                        
                        <button onClick={() => handleTopicSelect(selectedTopic!, false)} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all">
                            Bu Seviyeyi Tekrar Çöz
                        </button>
                    </>
                )}
                
                <button onClick={() => setSelectedTopic(null)} className="mt-8 text-slate-500 hover:text-slate-700 font-bold">
                    Konu Seçimine Dön
                </button>
            </motion.div>
        );
    }

    const currentQ = questions[qIndex];
    if (!currentQ) return null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <button onClick={() => setSelectedTopic(null)} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 mb-2 text-sm">
                        <ArrowLeft size={16} /> Konu Seçimine Dön
                    </button>
                    <h2 className="text-2xl font-black text-slate-900">{selectedTopic}</h2>
                </div>
                
                <div className="flex gap-3 items-center">
                    <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${badgeColors[badge]}`}>
                        Rozet: {badge}
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full font-bold text-sm capitalize border border-slate-200">
                        {difficulty} Seviye
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full font-bold text-sm border border-indigo-100">
                        Soru {qIndex + 1} / 7
                    </span>
                </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm relative mb-8">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-t-[2rem] overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
                </div>

                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                        {currentQ.q}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ.options.map((opt: string, i: number) => {
                        const isSelected = selectedOption === opt;
                        const isCorrectOpt = isAnswered && opt === currentQ.ans;
                        const isWrongOpt = isAnswered && isSelected && opt !== currentQ.ans;
                        
                        let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50";
                        
                        if (isAnswered) {
                            if (isCorrectOpt) {
                                btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-2 ring-emerald-500/20";
                            } else if (isWrongOpt) {
                                btnClass = "bg-rose-50 border-rose-500 text-rose-800 shadow-sm ring-2 ring-rose-500/20";
                            } else {
                                btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                            }
                        } else if (isSelected) {
                            btnClass = "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm";
                        }

                        return (
                            <button
                                key={i}
                                disabled={isAnswered}
                                onClick={() => handleOptionSelect(opt)}
                                className={`p-5 rounded-2xl border-2 font-bold text-left transition-all duration-200 flex justify-between items-center group ${btnClass}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                                        isCorrectOpt ? 'bg-emerald-500 text-white' : 
                                        isWrongOpt ? 'bg-rose-500 text-white' : 
                                        isSelected ? 'bg-indigo-500 text-white' : 
                                        'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                                    }`}>
                                        {['A', 'B', 'C', 'D'][i]}
                                    </span>
                                    {opt}
                                </span>
                                {isCorrectOpt && <CheckCircle2 className="text-emerald-600" size={24} />}
                                {isWrongOpt && <XCircle className="text-rose-600" size={24} />}
                            </button>
                        );
                    })}
                </div>
                
                <AnimatePresence>
                    {isAnswered && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 pt-8 border-t border-slate-100">
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                                <Sparkles className="text-blue-500 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-blue-900 mb-2">Çözüm ve Açıklama</h4>
                                    <p className="text-blue-800/80 leading-relaxed">{currentQ.explanation || currentQ.hint}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                        <button onClick={handleNext} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2">
                            {qIndex + 1 === questions.length ? 'Seti Bitir' : 'Sonraki Soru'} <ChevronRight />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
