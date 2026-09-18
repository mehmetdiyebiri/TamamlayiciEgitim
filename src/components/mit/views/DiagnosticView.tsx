import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, Play, CheckCircle2, XCircle, ArrowRight, Timer, AlertTriangle, Award, BookOpen, Brain, Sparkles, RotateCcw, ChevronRight } from 'lucide-react';
import { getGradeDiagnosticQuestions, DiagnosticQuestion } from '../../../data/gradeDiagnosticQuestions';
import { calculateStudentDiagnosticLevel, StudentDiagnosticResult, StudentExamAnswer } from '../../../utils/diagnosticEngine';

export const DiagnosticView = ({ grade = 8 }: { grade?: number }) => {
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);
    
    // Per-question timing and answers
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [userAnswers, setUserAnswers] = useState<StudentExamAnswer[]>([]);
    const [diagnosticResult, setDiagnosticResult] = useState<StudentDiagnosticResult | null>(null);

    const questions = useMemo(() => {
        return getGradeDiagnosticQuestions(grade);
    }, [grade]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (started && !completed) {
            setStartTime(Date.now());
            setElapsedTime(0);
            timerRef.current = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - (startTime || Date.now())) / 1000));
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [started, completed, qIndex]);

    const currentQ = questions[qIndex];

    const handleStart = () => {
        setStarted(true);
        setCompleted(false);
        setQIndex(0);
        setSelectedOption(null);
        setUserAnswers([]);
        setDiagnosticResult(null);
        setShowHint(false);
        setStartTime(Date.now());
    };

    const handleOptionSelect = (opt: string) => {
        if (selectedOption !== null) return;
        setSelectedOption(opt);
        const duration = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        const isCorrect = opt === currentQ.ans;

        const answerRecord: StudentExamAnswer = {
            questionId: currentQ.id,
            selectedOption: opt,
            isCorrect,
            durationSec: duration,
            errorType: isCorrect ? undefined : currentQ.errorType
        };

        const updatedAnswers = [...userAnswers, answerRecord];
        setUserAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (qIndex + 1 < questions.length) {
            setQIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowHint(false);
            setStartTime(Date.now());
            setElapsedTime(0);
        } else {
            // Sınav bitti, seviye belirleme motorunu çalıştır
            const finalResult = calculateStudentDiagnosticLevel(grade, userAnswers, questions, 'Öğrenci');
            setDiagnosticResult(finalResult);
            setCompleted(true);

            // Raporu öğretmenin görebilmesi için kaydet
            try {
                const storedReports = JSON.parse(localStorage.getItem('mit_diagnostic_reports') || '[]');
                storedReports.unshift(finalResult);
                localStorage.setItem('mit_diagnostic_reports', JSON.stringify(storedReports.slice(0, 30)));
            } catch (e) {
                console.error(e);
            }
        }
    };

    // LEVEL BADGE COLOR HELPER
    const getLevelBadge = (level: number) => {
        switch (level) {
            case 4:
                return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: '🏆', color: 'text-emerald-600' };
            case 3:
                return { bg: 'bg-blue-50 text-blue-800 border-blue-300', icon: '⭐', color: 'text-blue-600' };
            case 2:
                return { bg: 'bg-amber-50 text-amber-800 border-amber-300', icon: '⚡', color: 'text-amber-600' };
            default:
                return { bg: 'bg-rose-50 text-rose-800 border-rose-300', icon: '🎯', color: 'text-rose-600' };
        }
    };

    if (completed && diagnosticResult) {
        const badge = getLevelBadge(diagnosticResult.level);

        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                {/* Result Hero Header */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center relative overflow-hidden">
                    <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl">
                        {badge.icon}
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider mb-2">
                        {diagnosticResult.testTitle}
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 mb-2">
                        {diagnosticResult.levelTitle}
                    </h2>
                    <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                        {diagnosticResult.levelDescription}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-700">{diagnosticResult.correctCount} / 20</div>
                            <div className="text-xs font-bold text-emerald-800 uppercase mt-1">Doğru Sayısı</div>
                        </div>
                        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl">
                            <div className="text-2xl sm:text-3xl font-black text-rose-700">{diagnosticResult.wrongCount}</div>
                            <div className="text-xs font-bold text-rose-800 uppercase mt-1">Hatalı Sayısı</div>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl">
                            <div className="text-2xl sm:text-3xl font-black text-indigo-700">%{diagnosticResult.successRate}</div>
                            <div className="text-xs font-bold text-indigo-800 uppercase mt-1">Başarı Oranı</div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                            <div className="text-2xl sm:text-3xl font-black text-amber-700">{diagnosticResult.averageTimeSec} sn</div>
                            <div className="text-xs font-bold text-amber-800 uppercase mt-1">Ortalama Süre</div>
                        </div>
                    </div>
                </div>

                {/* Error Breakdown & Strengths */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                            <AlertTriangle size={18} className="text-amber-500" /> Hata Dağılımı ve Yanılgı Analizi
                        </h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                <span className="font-bold text-slate-700">Kavram Yanılgısı (Kural Unutma):</span>
                                <span className="font-black text-rose-600">{diagnosticResult.errorDistribution.kavram_yanilgisi || 0} soru</span>
                            </div>
                            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                <span className="font-bold text-slate-700">İşlem Hatası (Dört İşlem):</span>
                                <span className="font-black text-amber-600">{diagnosticResult.errorDistribution.islem_hatasi || 0} soru</span>
                            </div>
                            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                <span className="font-bold text-slate-700">Dikkat Eksikliği (Kök/Birim):</span>
                                <span className="font-black text-blue-600">{diagnosticResult.errorDistribution.dikkat_eksikligi || 0} soru</span>
                            </div>
                            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                <span className="font-bold text-slate-700">Okuduğunu Anlama:</span>
                                <span className="font-black text-purple-600">{diagnosticResult.errorDistribution.okudugunu_anlama || 0} soru</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Sparkles size={18} className="text-indigo-600" /> Öğretmen & Sistem Eylem Planı
                        </h4>
                        <div className="space-y-2">
                            {diagnosticResult.recommendedActionPlan.map((plan, i) => (
                                <div key={i} className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-900 font-medium flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i + 1}</span>
                                    <span>{plan}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Question by question audit report */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                        <BookOpen size={18} className="text-indigo-600" /> Soru ve Yanıt Detay Raporu (20 Soru)
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                                <tr>
                                    <th className="p-3">Soru No</th>
                                    <th className="p-3">Konu</th>
                                    <th className="p-3">Kazanım / Bilişsel Düzey</th>
                                    <th className="p-3">Verilen</th>
                                    <th className="p-3">Doğru</th>
                                    <th className="p-3">Süre</th>
                                    <th className="p-3">Hata Tipi</th>
                                    <th className="p-3">Önerilen Telafi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {diagnosticResult.details.map((item) => (
                                    <tr key={item.questionNum} className={item.isCorrect ? 'bg-emerald-50/20' : 'bg-rose-50/20'}>
                                        <td className="p-3 font-bold text-slate-700">#{item.questionNum}</td>
                                        <td className="p-3 font-medium text-slate-800">{item.topic}</td>
                                        <td className="p-3 text-slate-500">{item.cognitiveSkill}</td>
                                        <td className="p-3 font-bold">
                                            <span className={item.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                                                {item.userAnswer}
                                            </span>
                                        </td>
                                        <td className="p-3 font-bold text-slate-800">{item.correctAnswer}</td>
                                        <td className="p-3 font-mono">{item.durationSec}s</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                item.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {item.errorType}
                                            </span>
                                        </td>
                                        <td className="p-3 text-slate-600">{item.recommendedRemedy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Restart / Back */}
                <div className="flex justify-center">
                    <button
                        onClick={handleStart}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all flex items-center gap-2 text-sm"
                    >
                        <RotateCcw size={16} /> Sınavı Yeniden Başlat
                    </button>
                </div>
            </motion.div>
        );
    }

    if (started && currentQ) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-6 px-4 space-y-6">
                {/* Header with grade and timing */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
                            {grade}. Sınıf Hazır Bulunuşluk Seviye Tespiti
                        </span>
                        <h2 className="text-lg font-black text-slate-800">{currentQ.topic}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-slate-700">
                            <Timer size={14} className="text-indigo-600" />
                            <span>{elapsedTime} sn</span>
                        </div>
                        <div className="bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-xl font-black text-xs border border-indigo-100">
                            Soru {qIndex + 1} / {questions.length}
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden space-y-6">
                    {/* Top Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-300"
                            style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    {/* Question text */}
                    <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                        {currentQ.q}
                    </div>

                    {/* Options A, B, C, D */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {currentQ.options.map((opt: string, i: number) => {
                            const isAnswered = selectedOption !== null;
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
                                        <span className="text-sm sm:text-base">{opt}</span>
                                    </span>
                                    {isCorrectOpt && <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />}
                                    {isWrongOpt && <XCircle className="text-rose-600 shrink-0" size={20} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Instant Feedback Banner */}
                    {selectedOption && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium ${
                            selectedOption === currentQ.ans ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}>
                            <div className="font-black mb-1 flex items-center gap-1.5">
                                {selectedOption === currentQ.ans ? (
                                    <><CheckCircle2 size={16} className="text-emerald-600" /> Doğru Yanıt!</>
                                ) : (
                                    <><XCircle size={16} className="text-rose-600" /> Yanıtınız Hatalı. Doğru Seçenek: {currentQ.ans}</>
                                )}
                            </div>
                            <p className="text-slate-700">{currentQ.explanation}</p>
                        </motion.div>
                    )}

                    {/* Bottom Next Question Button */}
                    {selectedOption && (
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleNext}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                            >
                                {qIndex + 1 === questions.length ? 'Testi Bitir ve Seviyemi Hesapla' : 'Sıradaki Soru'} <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    // IDLE SCREEN
    return (
        <div className="max-w-3xl mx-auto py-10 px-4 text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                <ClipboardList size={40} />
            </div>

            <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider">
                    {grade}. Sınıf Hazır Bulunuşluk Seviye Tespit Sınavı
                </span>
                <h2 className="text-3xl font-black text-slate-900">Matematik Düzey Tanılama</h2>
                <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                    Bu sınav, {grade}. sınıfa başlamadan önceki yılın ({grade - 1}. sınıf) temel kazanımlarını ve hazır bulunuşluk düzeyinizi 20 soruyla analiz eder.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
                <div className="p-3.5 bg-white border border-slate-200 rounded-2xl">
                    <div className="text-xs font-black text-slate-400 uppercase">Soru Sayısı</div>
                    <div className="text-lg font-black text-slate-800">20 Soru</div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-2xl">
                    <div className="text-xs font-black text-slate-400 uppercase">Değerlendirme</div>
                    <div className="text-lg font-black text-indigo-600">4 Seviye Motoru</div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-2xl">
                    <div className="text-xs font-black text-slate-400 uppercase">Analiz</div>
                    <div className="text-lg font-black text-emerald-600">Süre & Hata Tipi</div>
                </div>
            </div>

            <div>
                <button
                    onClick={handleStart}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-95 text-base flex items-center gap-2 mx-auto"
                >
                    <Play size={18} /> Seviye Tespit Sınavını Başlat
                </button>
            </div>
        </div>
    );
};
