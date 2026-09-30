import React, { useState, useEffect, useRef } from 'react';
import { CustomMitExam, CustomMitExamResult, CustomMitExamAnswer } from '../../../types/customMitExam';
import { saveCustomExamSubmission } from '../../../services/customMitExamService';
import confetti from 'canvas-confetti';
import { Play, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Timer, AlertTriangle, Award, BookOpen, Brain, Sparkles, RotateCcw, Clock, Send, ChevronRight } from 'lucide-react';

interface CustomExamRunnerProps {
    exam: CustomMitExam;
    onBack: () => void;
    studentName: string;
    studentClass: string;
    showToast?: (msg: string) => void;
}

export const CustomExamRunner: React.FC<CustomExamRunnerProps> = ({
    exam,
    onBack,
    studentName,
    studentClass,
    showToast
}) => {
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [qIndex, setQIndex] = useState(0);

    // Öğrencinin verdiği cevaplar: questionId -> 'A' | 'B' | 'C' | 'D'
    const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
    
    // Süre takibi
    const [totalElapsedSec, setTotalElapsedSec] = useState(0);
    const [qStartTime, setQStartTime] = useState(Date.now());
    const [qTimes, setQTimes] = useState<Record<number, number>>({});
    
    // Sınav Sonucu
    const [examResult, setExamResult] = useState<CustomMitExamResult | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Zaman Sayacı
    useEffect(() => {
        if (started && !completed) {
            timerRef.current = setInterval(() => {
                setTotalElapsedSec(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [started, completed]);

    const currentQ = exam.questions[qIndex];
    const isLastQuestion = qIndex === exam.questions.length - 1;

    // Sınava Başla
    const handleStartExam = () => {
        setStarted(true);
        setCompleted(false);
        setQIndex(0);
        setAnswers({});
        setTotalElapsedSec(0);
        setQStartTime(Date.now());
    };

    // Seçenek Tıklandı
    const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
        const spentOnThisQ = Math.max(1, Math.round((Date.now() - qStartTime) / 1000));
        setQTimes(prev => ({ ...prev, [currentQ.id]: (prev[currentQ.id] || 0) + spentOnThisQ }));
        setQStartTime(Date.now());

        setAnswers(prev => ({
            ...prev,
            [currentQ.id]: opt
        }));
    };

    // Sonraki Soru
    const handleNext = () => {
        if (!isLastQuestion) {
            setQIndex(prev => prev + 1);
            setQStartTime(Date.now());
        }
    };

    // Önceki Soru
    const handlePrev = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setQStartTime(Date.now());
        }
    };

    // Sınavı Bitir ve Sonucu Hesapla
    const handleFinishExam = async () => {
        if (Object.keys(answers).length < exam.questions.length) {
            const emptyCount = exam.questions.length - Object.keys(answers).length;
            if (!window.confirm(`${emptyCount} adet boş sorunuz var. Sınavı bitirmek istediğinize emin misiniz?`)) {
                return;
            }
        }

        let correctCount = 0;
        let wrongCount = 0;
        let emptyCount = 0;

        const detailedAnswers: CustomMitExamAnswer[] = exam.questions.map(q => {
            const userChoice = answers[q.id] || null;
            const isCorrect = userChoice === q.correctAnswer;

            if (!userChoice) {
                emptyCount++;
            } else if (isCorrect) {
                correctCount++;
            } else {
                wrongCount++;
            }

            const distractorText = userChoice 
                ? (q.distractorAnalysis[userChoice] || 'Hatalı akıl yürütme')
                : 'Cevaplanmadı';

            return {
                questionId: q.id,
                selectedOption: userChoice,
                isCorrect,
                durationSec: qTimes[q.id] || 15,
                learningArea: q.learningArea,
                outcomeCode: q.outcomeCode,
                outcomeDescription: q.outcomeDescription,
                distractorDiagnose: distractorText,
                cognitiveLevel: q.cognitiveLevel
            };
        });

        const scorePercent = Math.round((correctCount / exam.questions.length) * 100);

        const resultObj: CustomMitExamResult = {
            id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            examId: exam.id,
            examTitle: exam.title,
            studentName: studentName || 'Öğrenci',
            studentClass: studentClass || `${exam.grade}A`,
            grade: exam.grade,
            score: scorePercent,
            totalQuestions: exam.questions.length,
            correctCount,
            wrongCount,
            emptyCount,
            completedAt: new Date().toLocaleString('tr-TR'),
            timeSpentSeconds: totalElapsedSec,
            answers: detailedAnswers
        };

        setExamResult(resultObj);
        setCompleted(true);

        // Kaydet
        await saveCustomExamSubmission(resultObj);

        // Tebrik konfetisi
        if (scorePercent >= 60) {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    // Zaman Formatı
    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // BAŞLANGIÇ EKRANI
    if (!started) {
        return (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6 animate-in fade-in">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Seviye Tespit Menüsüne Dön
                </button>

                <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                        <Award className="w-8 h-8" />
                    </div>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase">
                        Öğretmeninin Atadığı Özel Sınav
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">{exam.title}</h2>
                    <p className="text-slate-500 text-sm max-w-xl mx-auto">{exam.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-slate-400 font-bold block mb-1">Soru Sayısı</span>
                        <strong className="text-slate-800 text-base">{exam.questions.length} Soru</strong>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-slate-400 font-bold block mb-1">Süre Sınırı</span>
                        <strong className="text-slate-800 text-base">{exam.durationMinutes} Dakika</strong>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-1">
                        <span className="text-slate-400 font-bold block mb-1">Sınıf Seviyesi</span>
                        <strong className="text-slate-800 text-base">{exam.grade}. Sınıf</strong>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" /> Pedagojik Tanılama Sistemi
                    </p>
                    <p>
                        Bu sınavdaki her soru, seçtiğiniz yanıta göre kavram yanılgınızı ve işlem kurallarını analiz eder. Sınav bittiğinde detaylı geri bildirim raporunuz hazır olacaktır.
                    </p>
                </div>

                <div className="pt-2 text-center">
                    <button
                        onClick={handleStartExam}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 mx-auto shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                    >
                        <Play className="w-4 h-4 fill-white" /> Sınavı Başlat
                    </button>
                </div>
            </div>
        );
    }

    // SONUÇ EKRANI
    if (completed && examResult) {
        return (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-8 animate-in fade-in">
                {/* Result Header */}
                <div className="text-center space-y-2 border-b border-slate-100 pb-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-black uppercase">
                        Sınav Başarıyla Tamamlandı
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">{exam.title}</h2>
                    <p className="text-slate-500 text-xs">
                        Öğrenci: <strong>{examResult.studentName}</strong> • {examResult.completedAt}
                    </p>
                </div>

                {/* Score Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                        <span className="text-xs font-bold text-indigo-700">Başarı Puanı</span>
                        <h4 className="text-3xl font-black text-indigo-900 mt-1">%{examResult.score}</h4>
                    </div>
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <span className="text-xs font-bold text-emerald-700">Doğru Yanıt</span>
                        <h4 className="text-3xl font-black text-emerald-900 mt-1">{examResult.correctCount}</h4>
                    </div>
                    <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                        <span className="text-xs font-bold text-rose-700">Yanlış Yanıt</span>
                        <h4 className="text-3xl font-black text-rose-900 mt-1">{examResult.wrongCount}</h4>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-xs font-bold text-slate-500">Kullanılan Süre</span>
                        <h4 className="text-2xl font-black text-slate-800 mt-1">{formatTime(examResult.timeSpentSeconds)}</h4>
                    </div>
                </div>

                {/* Pedagojik Çeldirici & Tanılama Analiz Raporu */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-indigo-600" />
                            Pedagojik Tanılama & Çeldirici Analiz Raporu
                        </h3>
                        <span className="text-xs text-slate-500 font-bold">
                            {exam.questions.length} Soru İncelemesi
                        </span>
                    </div>

                    <div className="space-y-3">
                        {examResult.answers.map((ans, idx) => {
                            const originalQ = exam.questions.find(q => q.id === ans.questionId);
                            return (
                                <div 
                                    key={idx} 
                                    className={`p-4 rounded-2xl border transition-all ${
                                        ans.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/30 border-rose-200'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-lg bg-slate-100 font-black text-xs flex items-center justify-center text-slate-700">
                                                {ans.questionId}
                                            </span>
                                            <span className="text-xs font-bold text-slate-800 truncate max-w-md">
                                                {originalQ?.questionText}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                                                {ans.outcomeCode}
                                            </span>
                                            {ans.isCorrect ? (
                                                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Doğru ({ans.selectedOption})
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 font-black text-xs flex items-center gap-1">
                                                    <XCircle className="w-3.5 h-3.5 text-rose-600" /> Yanlış (Seçilen: {ans.selectedOption || 'Boş'} | Doğru: {originalQ?.correctAnswer})
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Kazanım & Çeldirici Tanısı */}
                                    <div className="text-xs space-y-1.5 pt-2 border-t border-slate-100">
                                        <p className="text-slate-600">
                                            <strong>Kazanım İfadesi:</strong> {ans.outcomeDescription} ({ans.learningArea})
                                        </p>

                                        {!ans.isCorrect && (
                                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-0.5">
                                                <div className="font-bold flex items-center gap-1.5">
                                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                                    Öğretmen Tanı Analizi (Çeldirici {ans.selectedOption}):
                                                </div>
                                                <p className="font-medium text-amber-950 pl-5">
                                                    {ans.distractorDiagnose}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <button
                        onClick={onBack}
                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
                    >
                        Seviye Tespit Menüsüne Dön
                    </button>

                    <button
                        onClick={handleStartExam}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                        <RotateCcw className="w-4 h-4" /> Sınavı Tekrar Çöz
                    </button>
                </div>
            </div>
        );
    }

    // AKTİF SINAV ÇÖZME EKRANI
    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6 animate-in fade-in">
            {/* Top Bar: Progress & Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                    <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">
                        {exam.title}
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                        Soru {qIndex + 1} / {exam.questions.length}
                    </h3>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                        <Timer className="w-4 h-4 text-indigo-600" />
                        <span>{formatTime(totalElapsedSec)}</span>
                    </div>

                    <button
                        onClick={handleFinishExam}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                        Sınavı Bitir
                    </button>
                </div>
            </div>

            {/* Soru Çubuğu (Navigation dots) */}
            <div className="flex flex-wrap gap-1.5">
                {exam.questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = idx === qIndex;
                    return (
                        <button
                            key={q.id}
                            onClick={() => {
                                setQIndex(idx);
                                setQStartTime(Date.now());
                            }}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isCurrent
                                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                                    : isAnswered
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                        >
                            {idx + 1}
                        </button>
                    );
                })}
            </div>

            {/* Soru İçeriği */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs">
                        {currentQ.learningArea}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                        Kazanım: {currentQ.outcomeCode}
                    </span>
                </div>

                <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {currentQ.questionText}
                </div>

                {/* Soru Görseli Varsa */}
                {currentQ.imageUrl && (
                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white p-2 max-w-md mx-auto">
                        <img 
                            src={currentQ.imageUrl} 
                            alt={`Soru ${currentQ.id}`} 
                            className="max-h-60 w-auto object-contain mx-auto" 
                        />
                    </div>
                )}
            </div>

            {/* Seçenekler A, B, C, D */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                    const optionText = currentQ.options[opt];
                    const isSelected = answers[currentQ.id] === opt;

                    return (
                        <div
                            key={opt}
                            onClick={() => handleSelectOption(opt)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                                isSelected
                                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-black shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                                {opt}
                            </span>
                            <span className="text-xs sm:text-sm font-medium leading-snug">
                                {optionText || `${opt} Seçeneği`}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Alt İleri / Geri Navigasyon */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                    onClick={handlePrev}
                    disabled={qIndex === 0}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                >
                    <ArrowLeft className="w-4 h-4" /> Önceki
                </button>

                {isLastQuestion ? (
                    <button
                        onClick={handleFinishExam}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                        <Send className="w-4 h-4" /> Sınavı Tamamla
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                        Sonraki <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};
