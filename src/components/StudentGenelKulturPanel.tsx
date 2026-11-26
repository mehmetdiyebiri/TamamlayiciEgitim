import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Globe, PlayCircle, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { genelKulturTests } from '../data/genelKulturTests';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const StudentGenelKulturPanel = ({ state, actions }: any) => {
    const { currentUser, gkAssignments, gkProgress, activeSchoolId } = state;
    const { showToast } = actions;
    const [activeTest, setActiveTest] = useState<any>(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [showResults, setShowResults] = useState(false);
    const [showIntro, setShowIntro] = useState(false);

    const myAssignments = gkAssignments.filter((a: any) => {
        if (a.targetType === 'class' && a.targetClass === currentUser.classLevel) return true;
        if (a.targetType === 'student' && (a.targetStudent === currentUser.username || a.targetStudent === currentUser.name)) return true;
        return false;
    });

    const handleStartTest = (assignment: any) => {
        const testInfo = genelKulturTests.find(t => t.id === assignment.testId);
        if (!testInfo) {
            showToast("Test bulunamadı.", "error");
            return;
        }
        
        setActiveTest({ assignment, testInfo });
        setCurrentQ(0);
        setAnswers({});
        setShowResults(false);
        
        if (testInfo.introText) {
            setShowIntro(true);
        } else {
            setShowIntro(false);
        }
    };

    const handleOptionSelect = (qId: string, option: string) => {
        setAnswers({ ...answers, [qId]: option });
    };

    const handleFinishTest = async () => {
        if (!activeTest) return;
        
        let correctCount = 0;
        activeTest.testInfo.questions.forEach((q: any) => {
            if (answers[q.id] === q.correctAnswer) correctCount++;
        });

        const score = Math.round((correctCount / activeTest.testInfo.questions.length) * 100);

        try {
            const progressCol = activeSchoolId === 'default' ? 'gk_progress' : `gk_progress_${activeSchoolId}`;
            const docId = `${currentUser.id}_${activeTest.testInfo.id}`;
            await setDoc(doc(db, progressCol, docId), {
                studentId: currentUser.id,
                studentName: currentUser.name || currentUser.username,
                classLevel: currentUser.classLevel,
                testId: activeTest.testInfo.id,
                testTitle: activeTest.testInfo.title,
                assignmentId: activeTest.assignment.id,
                answers,
                score,
                completedAt: new Date().toISOString()
            });

            setShowResults(true);
        } catch (error) {
            console.error("Error saving GK progress:", error);
            showToast("Sonuçlar kaydedilirken hata oluştu.", "error");
        }
    };

    if (activeTest) {
        if (showIntro) {
            return (
                <div className="p-8 w-full max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-2xl shadow-indigo-900/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Info size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-6">Test Hakkında</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-12">
                            {activeTest.testInfo.introText}
                        </p>
                        
                        <button onClick={() => setShowIntro(false)} className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-3 mx-auto">
                            Teste Başla <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            );
        }

        if (showResults) {
            let correctCount = 0;
            const wrongQuestions: any[] = [];
            activeTest.testInfo.questions.forEach((q: any) => {
                if (answers[q.id] === q.correctAnswer) {
                    correctCount++;
                } else {
                    wrongQuestions.push(q);
                }
            });
            const score = Math.round((correctCount / activeTest.testInfo.questions.length) * 100);

            return (
                <div className="p-8 w-full max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-2xl shadow-indigo-900/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Globe size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Test Tamamlandı!</h2>
                        <p className="text-gray-500 font-bold mb-8">{activeTest.testInfo.title}</p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <div className="text-4xl font-black text-indigo-600 mb-2">{score}</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Başarı Puanı</div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <div className="text-4xl font-black text-indigo-600 mb-2">{correctCount} / {activeTest.testInfo.questions.length}</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Doğru Cevap</div>
                            </div>
                        </div>

                        {wrongQuestions.length > 0 && (
                            <div className="mt-12 text-left bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-red-500">❌</span> Yanlış Yapılan Sorular</h3>
                                <div className="space-y-6">
                                    {wrongQuestions.map((q: any, idx: number) => {
                                        const currentContext = q.contextId ? activeTest.testInfo.contexts?.find((c: any) => c.id === q.contextId) : null;
                                        return (
                                        <div key={q.id} className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm">
                                            {currentContext && (
                                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4 text-amber-900 prose prose-sm max-w-none prose-table:w-full prose-table:border-collapse prose-th:bg-amber-100 prose-th:p-2 prose-td:p-2 prose-table:border prose-table:border-amber-300 prose-th:border prose-th:border-amber-300 prose-td:border prose-td:border-amber-300">
                                                    <div className="font-bold mb-2 flex items-center gap-2"><Info size={16}/> Metin / Tablo</div>
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{currentContext.content}</ReactMarkdown>
                                                </div>
                                            )}
                                            <div className="mb-4 prose prose-sm max-w-none prose-table:w-full prose-table:min-w-full prose-table:border-collapse prose-th:bg-gray-100 prose-th:p-4 prose-td:p-4 prose-table:border prose-table:border-gray-300 prose-th:border prose-th:border-gray-300 prose-td:border prose-td:border-gray-300">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{q.text}</ReactMarkdown>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                                    <div className="text-xs font-bold text-red-500 mb-1 uppercase">Senin Cevabın</div>
                                                    <div className="font-medium text-gray-800">{q.options[answers[q.id]] || 'Boş'}</div>
                                                </div>
                                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                                    <div className="text-xs font-bold text-green-500 mb-1 uppercase">Doğru Cevap</div>
                                                    <div className="font-medium text-gray-800">{q.options[q.correctAnswer]}</div>
                                                </div>
                                            </div>
                                            {q.didYouKnow && (
                                                <div className="mt-4 text-sm text-blue-800 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                                    <span className="font-bold">💡 Biliyor muydun?</span> {q.didYouKnow}
                                                </div>
                                            )}
                                        </div>
                                    )})}
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-12">
                            <button onClick={() => setActiveTest(null)} className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30">
                                Testlere Dön
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        const q = activeTest.testInfo.questions[currentQ];
        const isLastQ = currentQ === activeTest.testInfo.questions.length - 1;
        const currentContext = q.contextId ? activeTest.testInfo.contexts?.find((c: any) => c.id === q.contextId) : null;
        const hasAnswered = !!answers[q.id];

        return (
            <div className="p-8 w-full max-w-[1600px] mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-black text-indigo-900 tracking-tight">{activeTest.testInfo.title}</h2>
                        <p className="text-gray-500 font-medium mt-1">Soru {currentQ + 1} / {activeTest.testInfo.questions.length}</p>
                    </div>
                    <button onClick={() => setActiveTest(null)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                        Testten Çık
                    </button>
                </div>

                {currentContext && (
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm sticky top-4 z-10">
                        <div className="flex items-start gap-3">
                            <Info className="text-amber-600 mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-amber-900 mb-2 uppercase tracking-wide text-sm">Metin / Tablo</h4>
                                <div className="text-amber-900 leading-relaxed font-medium overflow-x-auto prose prose-amber max-w-none prose-table:w-full prose-table:min-w-full prose-table:border-collapse prose-th:bg-amber-100 prose-th:p-4 prose-td:p-4 prose-table:border prose-table:border-amber-300 prose-th:border prose-th:border-amber-300 prose-td:border prose-td:border-amber-300">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{currentContext.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-indigo-900/5">
                    <div className="text-xl font-bold text-gray-800 mb-8 leading-relaxed overflow-x-auto prose prose-lg max-w-none prose-table:w-full prose-table:min-w-full prose-table:border-collapse prose-th:bg-gray-100 prose-th:p-4 prose-td:p-4 prose-table:border prose-table:border-gray-300 prose-th:border prose-th:border-gray-300 prose-td:border prose-td:border-gray-300"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{q.text}</ReactMarkdown></div>
                    
                    <div className="space-y-4">
                        {['A', 'B', 'C', 'D'].map(optKey => {
                            const isSelected = answers[q.id] === optKey;
                            const isCorrect = q.correctAnswer === optKey;
                            
                            let btnClass = "border-gray-100 hover:border-indigo-300 hover:bg-gray-50";
                            let circleClass = "bg-gray-100 text-gray-500";
                            let textClass = "text-gray-700";
                            
                            if (hasAnswered) {
                                if (isCorrect) {
                                    btnClass = "border-green-500 bg-green-50 shadow-md";
                                    circleClass = "bg-green-500 text-white";
                                    textClass = "text-green-900";
                                } else if (isSelected) {
                                    btnClass = "border-red-500 bg-red-50 shadow-md";
                                    circleClass = "bg-red-500 text-white";
                                    textClass = "text-red-900";
                                } else {
                                    btnClass = "border-gray-100 opacity-50";
                                }
                            } else if (isSelected) {
                                btnClass = "border-indigo-600 bg-indigo-50 shadow-md";
                                circleClass = "bg-indigo-600 text-white";
                                textClass = "text-indigo-900";
                            }

                            return (
                                <button 
                                    key={optKey}
                                    onClick={() => handleOptionSelect(q.id, optKey)}
                                    disabled={hasAnswered} 
                                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${btnClass}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${circleClass}`}>
                                        {optKey}
                                    </div>
                                    <span className={`font-semibold ${textClass}`}>
                                        {q.options[optKey]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {hasAnswered && q.didYouKnow && (
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                            <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2 text-lg">
                                💡 Biliyor muydun?
                            </h4>
                            <p className="text-blue-900 font-medium leading-relaxed">
                                {q.didYouKnow}
                            </p>
                        </div>
                    )}

                    <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
                        <button 
                            onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
                            disabled={currentQ === 0}
                            className="px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                        >
                            Önceki Soru
                        </button>
                        
                        {isLastQ ? (
                            <button 
                                onClick={handleFinishTest}
                                disabled={!hasAnswered}
                                className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                            >
                                <CheckCircle2 size={20} /> Testi Bitir
                            </button>
                        ) : (
                            <button 
                                onClick={() => setCurrentQ(prev => prev + 1)}
                                disabled={!hasAnswered}
                                className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                            >
                                Sonraki Soru <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 w-full max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div>
                <h1 className="text-3xl font-black text-indigo-900 tracking-tight flex items-center gap-3">
                    <Globe size={32} className="text-indigo-600" /> Genel Kültür
                </h1>
                <p className="text-gray-500 font-medium mt-2">Atanan genel kültür testlerini çöz, bilgi seviyeni test et.</p>
            </div>

            {myAssignments.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <Globe size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz Test Atanmamış</h3>
                    <p className="text-gray-500 font-medium">Öğretmeniniz tarafından atanan testler burada görünecektir.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myAssignments.map((a: any) => {
                        const progress = gkProgress[`${currentUser.id}_${a.testId}`];
                        const isCompleted = !!progress;

                        return (
                            <div key={a.id} className={`bg-white rounded-3xl p-6 border ${isCompleted ? 'border-green-200 shadow-green-900/5' : 'border-indigo-100 shadow-indigo-900/5'} shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300`}>
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                            <BookOpen size={24} />
                                        </div>
                                        {isCompleted && (
                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-black flex items-center gap-1 border border-green-100">
                                                <CheckCircle2 size={12} /> TAMAMLANDI
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{a.testTitle}</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                        Öğretmen: {a.createdBy}
                                    </p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    {isCompleted ? (
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Skor</span>
                                            <span className={`font-black text-xl ${progress.score >= 80 ? 'text-green-600' : progress.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{progress.score}%</span>
                                        </div>
                                    ) : (
                                        <button onClick={() => handleStartTest(a)} className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-indigo-600/30">
                                            <PlayCircle size={18} /> Teste Başla
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
