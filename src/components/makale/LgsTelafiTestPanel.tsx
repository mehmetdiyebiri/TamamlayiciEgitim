import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, 
  RotateCcw, Award, ChevronRight, ChevronLeft, HelpCircle, 
  Sparkles, Target, BookOpen, Check, X, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LGS_TELAFI_SORULARI, LgsTelafiQuestion } from '../../data/lgsTelafiData';

interface LgsTelafiTestPanelProps {
  onBack: () => void;
  onComplete?: (score: { correct: number; total: number; percent: number }) => void;
  showToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export function LgsTelafiTestPanel({ onBack, onComplete, showToast }: LgsTelafiTestPanelProps) {
  // Mode: 'intro' | 'active' | 'review'
  const [mode, setMode] = useState<'intro' | 'active' | 'review'>('intro');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(15 * 60);
    setIsTimerRunning(true);
    setMode('active');
    if (showToast) {
      showToast('10 soruluk LGS Telafi Testi başladı. Başarılar!', 'info');
    }
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleFinishTest = () => {
    setIsTimerRunning(false);
    setShowConfirmFinish(false);
    setMode('review');

    // Calculate score
    let correct = 0;
    LGS_TELAFI_SORULARI.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const percent = Math.round((correct / LGS_TELAFI_SORULARI.length) * 100);
    if (onComplete) {
      onComplete({ correct, total: LGS_TELAFI_SORULARI.length, percent });
    }
    if (showToast) {
      if (percent >= 70) {
        showToast(`Tebrikler! %${percent} başarı ile telafi testini tamamladınız!`, 'success');
      } else {
        showToast(`Telafi testi tamamlandı. Çözümleri inceleyerek eksiklerinizi pekiştirebilirsiniz.`, 'info');
      }
    }
  };

  const currentQuestion: LgsTelafiQuestion = LGS_TELAFI_SORULARI[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = LGS_TELAFI_SORULARI.length;

  // Calculate score stats for review
  const correctCount = LGS_TELAFI_SORULARI.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const wrongCount = LGS_TELAFI_SORULARI.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswer).length;
  const emptyCount = totalQuestions - answeredCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // 1. INTRO VIEW (Exact matching screen as in user's screenshot)
  if (mode === 'intro') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <button 
          id="btn-lgs-back"
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold mb-4 px-2 py-1 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Geri Dön
        </button>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-rose-900 mb-3 tracking-tight">LGS Telafi Testi</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto text-base">
            Eksik olduğunuz konulardan özel olarak hazırlanan 10 soruluk telafi denemesi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
                <BookOpen className="w-4 h-4" /> 10 Yeni Nesil Soru
              </div>
              <p className="text-xs text-rose-600">Sözel Mantık, Çıkarım, Ana Fikir ve Cümlede Anlam</p>
            </div>
            <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-1">
                <Clock className="w-4 h-4" /> 15 Dakika Süre
              </div>
              <p className="text-xs text-amber-600">Gerçek LGS süre temposuna uygun zaman yönetimi</p>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                <Award className="w-4 h-4" /> +50 Telafi Puanı
              </div>
              <p className="text-xs text-emerald-600">Test sonu ayrıntılı mantık ve çözüm analizi</p>
            </div>
          </div>

          <button 
            id="btn-start-lgs-test"
            onClick={handleStartTest}
            className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 hover:shadow-xl transition-all text-xl inline-flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-6 h-6" /> Teste Şimdi Başla
          </button>
        </div>
      </div>
    );
  }

  // 2. ACTIVE TEST VIEW
  if (mode === 'active') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Test Header */}
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-rose-100 text-rose-800 font-black text-sm rounded-xl">
              Soru {currentIdx + 1} / {totalQuestions}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200">
              {currentQuestion.category}
            </span>
            <span className="hidden md:inline-block text-xs font-medium text-slate-500">
              {currentQuestion.konu}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono font-bold text-sm border ${timeLeft < 180 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              id="btn-finish-test"
              onClick={() => {
                if (answeredCount < totalQuestions) {
                  setShowConfirmFinish(true);
                } else {
                  handleFinishTest();
                }
              }}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-all shadow-sm"
            >
              Testi Bitir
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-rose-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
          {/* Passage / Context */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 text-slate-800 leading-relaxed text-base font-normal">
            <p className="whitespace-pre-line">{currentQuestion.context}</p>
            
            {currentQuestion.tableOrPremises && currentQuestion.tableOrPremises.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Öncüller / Bilgiler:</div>
                {currentQuestion.tableOrPremises.map((premise, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span>{premise}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Question Stem */}
          <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.questionStem}
          </h3>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, optIdx) => {
              const letter = ['A', 'B', 'C', 'D'][optIdx];
              const isSelected = userAnswers[currentQuestion.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  id={`btn-option-${currentQuestion.id}-${optIdx}`}
                  onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50 border-rose-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    {letter}
                  </span>
                  <span className={`text-sm md:text-base font-medium pt-1 ${isSelected ? 'text-rose-950 font-semibold' : 'text-slate-700'}`}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation & Question Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <button
            id="btn-prev-question"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Önceki Soru
          </button>

          {/* Quick jump pagination */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {LGS_TELAFI_SORULARI.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;

              return (
                <button
                  key={q.id}
                  id={`btn-jump-q-${idx + 1}`}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                    isCurrent
                      ? 'ring-2 ring-rose-600 ring-offset-2 bg-rose-600 text-white'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {currentIdx < totalQuestions - 1 ? (
            <button
              id="btn-next-question"
              onClick={() => setCurrentIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm bg-rose-600 text-white hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Sonraki Soru <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="btn-submit-test"
              onClick={() => {
                if (answeredCount < totalQuestions) {
                  setShowConfirmFinish(true);
                } else {
                  handleFinishTest();
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Testi Tamamla <Check className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmFinish && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-xl border border-slate-100"
              >
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">Testi Bitirmek İstiyor musunuz?</h4>
                <p className="text-sm text-slate-600">
                  {totalQuestions - answeredCount} soruyu henüz cevaplamadınız. Testi şimdi bitirirseniz boş bırakılan sorular yanlış sayılacaktır.
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowConfirmFinish(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Sorulara Dön
                  </button>
                  <button
                    onClick={handleFinishTest}
                    className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors"
                  >
                    Evet, Bitir
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 3. REVIEW VIEW (Score card & Detailed step-by-step solutions)
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Result Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${scorePercent >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
          {scorePercent >= 70 ? 'Harika Performans! Telafi Başarılı' : 'Telafi Testi Tamamlandı'}
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
          {scorePercent >= 70 
            ? 'Tebrikler! Sözel mantık ve çıkarım konularındaki telafi hedefinizi tamamladınız.' 
            : 'Aşağıdaki soru çözümlerini ve açıklamalarını dikkatle inceleyerek eksiklerinizi kapatabilirsiniz.'}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <div className="text-2xl font-black text-emerald-600">{correctCount}</div>
            <div className="text-xs font-bold text-emerald-800 mt-1">Doğru</div>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="text-2xl font-black text-rose-600">{wrongCount}</div>
            <div className="text-xs font-bold text-rose-800 mt-1">Yanlış</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="text-2xl font-black text-slate-600">{emptyCount}</div>
            <div className="text-xs font-bold text-slate-700 mt-1">Boş</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-2xl font-black text-indigo-600">%{scorePercent}</div>
            <div className="text-xs font-bold text-indigo-800 mt-1">Başarı Oranı</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            id="btn-retake-test"
            onClick={handleStartTest}
            className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Testi Yeniden Çöz
          </button>
          <button
            id="btn-return-coach"
            onClick={onBack}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> LGS Antrenörüne Dön
          </button>
        </div>
      </div>

      {/* Review Filters & Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Soru Analizleri ve Çözümleri</h3>
          <p className="text-xs text-slate-500">Her sorunun gerekçeli çözümünü inceleyin.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setReviewFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${reviewFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Tümü ({totalQuestions})
          </button>
          <button
            onClick={() => setReviewFilter('wrong')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${reviewFilter === 'wrong' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-rose-700'}`}
          >
            Yanlış & Boş ({wrongCount + emptyCount})
          </button>
          <button
            onClick={() => setReviewFilter('correct')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${reviewFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-emerald-700'}`}
          >
            Doğrular ({correctCount})
          </button>
        </div>
      </div>

      {/* Question Review List */}
      <div className="space-y-4">
        {LGS_TELAFI_SORULARI.filter(q => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          if (reviewFilter === 'wrong') return !isCorrect;
          if (reviewFilter === 'correct') return isCorrect;
          return true;
        }).map((q) => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          const isUnanswered = userAns === undefined;

          return (
            <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-700">Soru {q.id}</span>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">
                    {q.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {q.konu}
                  </span>
                </div>

                {isCorrect ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" /> Doğru
                  </span>
                ) : isUnanswered ? (
                  <span className="inline-flex items-center gap-1 text-slate-500 font-bold text-xs bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    <HelpCircle className="w-4 h-4" /> Boş
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-xs bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <XCircle className="w-4 h-4" /> Yanlış
                  </span>
                )}
              </div>

              {/* Context text */}
              <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl leading-relaxed">
                <p className="whitespace-pre-line">{q.context}</p>
                {q.tableOrPremises && q.tableOrPremises.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
                    {q.tableOrPremises.map((p, pIdx) => (
                      <div key={pIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="font-bold text-rose-600">•</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="font-bold text-slate-900 text-sm md:text-base">
                {q.questionStem}
              </div>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const letter = ['A', 'B', 'C', 'D'][optIdx];
                  const isUserChosen = userAns === optIdx;
                  const isRightAnswer = q.correctAnswer === optIdx;

                  let borderClass = 'border-slate-200 bg-white text-slate-700';
                  let icon = null;

                  if (isRightAnswer) {
                    borderClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold';
                    icon = <Check className="w-4 h-4 text-emerald-600 shrink-0" />;
                  } else if (isUserChosen && !isRightAnswer) {
                    borderClass = 'border-rose-500 bg-rose-50/80 text-rose-950';
                    icon = <X className="w-4 h-4 text-rose-600 shrink-0" />;
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs md:text-sm flex items-start gap-2.5 ${borderClass}`}
                    >
                      <span className="font-bold shrink-0">{letter})</span>
                      <span className="flex-1">{opt}</span>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {/* Detailed pedagogical solution */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-1">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> Çözüm & Mantık Açıklaması:
                </div>
                <p className="text-xs md:text-sm text-indigo-950 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
