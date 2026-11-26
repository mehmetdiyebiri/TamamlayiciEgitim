import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Check, X, RotateCcw, Award, Sparkles, 
  HelpCircle, CheckCircle2, Clock, BookOpen, PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface WordItem {
  id: string;
  word: string;
  meaning: string;
  context?: string;
  articleTitle?: string;
  addedAt?: string;
}

interface KelimeEslestirmeGameProps {
  wordPool: WordItem[];
  onBack: () => void;
  onAddSampleWords?: () => void;
  showToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export function KelimeEslestirmeGame({ 
  wordPool, 
  onBack, 
  onAddSampleWords,
  showToast 
}: KelimeEslestirmeGameProps) {
  // If pool has more than 6 words, pick up to 6 for the active game session to keep UI neat
  const activeWords = useMemo(() => {
    if (!wordPool || wordPool.length === 0) return [];
    // Take up to 6 unique words
    return [...wordPool].slice(0, 6);
  }, [wordPool]);

  // Scrambled meanings
  const [shuffledMeanings, setShuffledMeanings] = useState<{ id: string; meaning: string; wordId: string }[]>([]);
  
  // Game states
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedMeaningId, setSelectedMeaningId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchedPair, setMismatchedPair] = useState<{ wordId: string; meaningId: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);

  // Initialize and shuffle
  const initializeGame = () => {
    if (activeWords.length === 0) return;
    
    // Create meanings array and shuffle
    const meanings = activeWords.map(w => ({
      id: `m-${w.id}`,
      meaning: w.meaning || 'Anlam belirtilmedi.',
      wordId: w.id
    }));

    // Fisher-Yates shuffle
    for (let i = meanings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [meanings[i], meanings[j]] = [meanings[j], meanings[i]];
    }

    setShuffledMeanings(meanings);
    setSelectedWordId(null);
    setSelectedMeaningId(null);
    setMatchedIds([]);
    setMismatchedPair(null);
    setIsCompleted(false);
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setMistakes(0);
  };

  useEffect(() => {
    initializeGame();
  }, [activeWords]);

  // Elapsed timer
  useEffect(() => {
    if (isCompleted || activeWords.length === 0) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isCompleted, activeWords]);

  // Handle clicking a word
  const handleWordClick = (wordId: string) => {
    if (matchedIds.includes(wordId) || isCompleted) return;
    if (mismatchedPair) return; // Prevent clicking during wrong-answer flash

    setSelectedWordId(wordId);

    // If meaning was already selected, check match
    if (selectedMeaningId) {
      const meaningObj = shuffledMeanings.find(m => m.id === selectedMeaningId);
      if (meaningObj && meaningObj.wordId === wordId) {
        // MATCH!
        handleMatchSuccess(wordId, selectedMeaningId);
      } else {
        // WRONG!
        handleMismatch(wordId, selectedMeaningId);
      }
    }
  };

  // Handle clicking a meaning
  const handleMeaningClick = (meaningId: string, wordId: string) => {
    if (matchedIds.includes(wordId) || isCompleted) return;
    if (mismatchedPair) return;

    setSelectedMeaningId(meaningId);

    // If word was already selected, check match
    if (selectedWordId) {
      if (selectedWordId === wordId) {
        // MATCH!
        handleMatchSuccess(selectedWordId, meaningId);
      } else {
        // WRONG!
        handleMismatch(selectedWordId, meaningId);
      }
    }
  };

  const handleMatchSuccess = (wordId: string, meaningId: string) => {
    const newMatched = [...matchedIds, wordId];
    setMatchedIds(newMatched);
    setSelectedWordId(null);
    setSelectedMeaningId(null);
    setMismatchedPair(null);

    if (newMatched.length === activeWords.length) {
      setIsCompleted(true);
      if (showToast) {
        showToast('Tebrikler! Tüm kelimeleri başarıyla eşleştirdiniz.', 'success');
      }
    }
  };

  const handleMismatch = (wordId: string, meaningId: string) => {
    setMismatchedPair({ wordId, meaningId });
    setMistakes(prev => prev + 1);

    setTimeout(() => {
      setSelectedWordId(null);
      setSelectedMeaningId(null);
      setMismatchedPair(null);
    }, 900);
  };

  // Format time MM:SS
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Empty state if user has less than 2 words
  if (!wordPool || wordPool.length < 2) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button 
          id="btn-kelime-back-empty"
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold px-2 py-1 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Geri Dön
        </button>

        <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-950">Kelime Egzersizi: Eşleştirme</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
            Eşleştirme testi yapabilmek için sözcük havuzunuzda en az 2 kelime bulunmalıdır.
            Makale okurken metindeki kelimelerin üzerine tıklayarak havuzunuza ekleyebilirsiniz veya başlangıç için örnek akademik kelimeler yükleyebilirsiniz.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {onAddSampleWords && (
              <button
                id="btn-add-sample-words"
                onClick={onAddSampleWords}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" /> Örnek Akademik Kelimeleri Yükle
              </button>
            )}
            <button
              id="btn-return-pool"
              onClick={onBack}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all"
            >
              Sözcük Havuzuna Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Completed celebratory screen
  if (isCompleted) {
    const accuracy = Math.max(0, Math.round(((activeWords.length) / (activeWords.length + mistakes)) * 100));

    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-12">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold px-2 py-1 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Geri Dön
        </button>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Harika İş Çıkardınız!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Sözcük havuzunuzdaki {activeWords.length} kelimenin tümünü anlamlarıyla başarıyla eşleştirdiniz.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-2">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <div className="text-2xl font-black text-emerald-600">{activeWords.length}</div>
              <div className="text-xs font-bold text-emerald-800 mt-1">Eşleşen Sözcük</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <div className="text-2xl font-black text-indigo-600">{formatTimer(elapsedSeconds)}</div>
              <div className="text-xs font-bold text-indigo-800 mt-1">Geçen Süre</div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="text-2xl font-black text-amber-600">%{accuracy}</div>
              <div className="text-xs font-bold text-amber-800 mt-1">Doğruluk Oranı</div>
            </div>
          </div>

          {/* Words recap */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-lg mx-auto space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Eşleştirilen Sözcükler:</div>
            {activeWords.map((w, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-none">
                <span className="font-bold text-slate-800">{w.word}</span>
                <span className="text-slate-600 text-right max-w-xs truncate">{w.meaning}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="btn-play-again"
              onClick={initializeGame}
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Yeniden Oyna
            </button>
            <button
              id="btn-back-to-pool"
              onClick={onBack}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer"
            >
              Sözcük Havuzuna Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active game view (exact heading & style matching the screenshot)
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Back button & top bar */}
      <div className="flex items-center justify-between">
        <button 
          id="btn-kelime-back"
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold px-2 py-1 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Geri Dön
        </button>

        <div className="flex items-center gap-4 text-sm font-bold">
          <div className="flex items-center gap-1.5 text-slate-600 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
          <div className="text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100 font-black">
            {matchedIds.length} / {activeWords.length} Eşleşti
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm text-center">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Kelime Egzersizi: Eşleştirme</h2>
        <p className="text-slate-600 mb-8 text-sm">
          Havuzunuzdaki kelimeleri anlamlarıyla eşleştirin. (Önce bir kelimeye, ardından karşılık gelen anlama tıklayın)
        </p>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden max-w-xl mx-auto">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(matchedIds.length / activeWords.length) * 100}%` }}
          />
        </div>

        {/* Two Columns Grid: Left = Words, Right = Meanings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* LEFT: Words from Student's Pool */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left pl-2">
              Sözcük Havuzunuz ({activeWords.length})
            </div>
            {activeWords.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedWordId === item.id;
              const isMismatched = mismatchedPair?.wordId === item.id;

              return (
                <button
                  key={item.id}
                  id={`btn-word-${item.id}`}
                  disabled={isMatched}
                  onClick={() => handleWordClick(item.id)}
                  className={`w-full p-5 rounded-2xl border text-base font-bold transition-all text-center flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 line-through cursor-default'
                      : isMismatched
                      ? 'bg-rose-100 border-rose-400 text-rose-800 animate-shake'
                      : isSelected
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-900 shadow-md ring-2 ring-indigo-400'
                      : 'bg-indigo-50/70 border-indigo-100 text-indigo-900 hover:bg-indigo-100 hover:border-indigo-200'
                  }`}
                >
                  <span className="flex-1 text-center">{item.word}</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Scrambled Meanings */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left pl-2">
              Anlamlar
            </div>
            {shuffledMeanings.map((m) => {
              const isMatched = matchedIds.includes(m.wordId);
              const isSelected = selectedMeaningId === m.id;
              const isMismatched = mismatchedPair?.meaningId === m.id;

              return (
                <button
                  key={m.id}
                  id={`btn-meaning-${m.id}`}
                  disabled={isMatched}
                  onClick={() => handleMeaningClick(m.id, m.wordId)}
                  className={`w-full p-5 rounded-2xl border text-sm font-medium transition-all text-center flex items-center justify-between cursor-pointer min-h-[70px] ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 line-through cursor-default'
                      : isMismatched
                      ? 'bg-rose-100 border-rose-400 text-rose-800 animate-shake'
                      : isSelected
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-900 shadow-md ring-2 ring-indigo-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="flex-1 text-center">{m.meaning}</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action helper */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Doğru eşleştirmede kartlar yeşil renge döner.</span>
          <button
            onClick={initializeGame}
            className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Karıştır & Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}
