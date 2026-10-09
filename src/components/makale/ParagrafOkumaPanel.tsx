import React, { useState, useMemo } from 'react';
import { Book, ArrowLeft, CheckCircle2, XCircle, HelpCircle, ChevronRight, RotateCcw, Search, Sparkles, Filter, Award } from 'lucide-react';
import { ALL_PARAGRAFLAR, PARAGRAF_CATEGORIES, ParagrafItem } from '../../data/paragrafData';

export function ParagrafOkumaPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeParagraph, setActiveParagraph] = useState<ParagrafItem | null>(null);
  
  // Active Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [completedParagraphIds, setCompletedParagraphIds] = useState<number[]>([]);

  // Filtered paragraphs
  const filteredParagraphs = useMemo(() => {
    return ALL_PARAGRAFLAR.filter(p => {
      const matchCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.paragraphText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Select a paragraph to start
  const handleSelectParagraph = (p: ParagrafItem) => {
    setActiveParagraph(p);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers({});
  };

  const handleBackToList = () => {
    setActiveParagraph(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIdx }));

    // Check if this was the last question, mark completed
    if (activeParagraph && currentQuestionIndex === activeParagraph.questions.length - 1) {
      if (!completedParagraphIds.includes(activeParagraph.id)) {
        setCompletedParagraphIds(prev => [...prev, activeParagraph.id]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (!activeParagraph) return;
    if (currentQuestionIndex < activeParagraph.questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      if (userAnswers[nextIdx] !== undefined) {
        setSelectedOption(userAnswers[nextIdx]);
        setIsAnswered(true);
      } else {
        setSelectedOption(null);
        setIsAnswered(false);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      setSelectedOption(userAnswers[prevIdx] ?? null);
      setIsAnswered(userAnswers[prevIdx] !== undefined);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers({});
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Tümü': ALL_PARAGRAFLAR.length };
    ALL_PARAGRAFLAR.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Calculate score for active paragraph
  const scoreInfo = useMemo(() => {
    if (!activeParagraph) return { correct: 0, total: 0 };
    let correct = 0;
    activeParagraph.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: activeParagraph.questions.length };
  }, [activeParagraph, userAnswers]);

  // 1. ACTIVE PARAGRAPH QUESTION VIEW (matches the screenshot aesthetic)
  if (activeParagraph) {
    const currentQ = activeParagraph.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === activeParagraph.questions.length - 1;
    const allQuestionsAnswered = Object.keys(userAnswers).length === activeParagraph.questions.length;

    return (
      <div className="space-y-6">
        {/* Navigation & Status Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors bg-slate-100 hover:bg-indigo-50 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Paragraflara Dön
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg border border-indigo-100">
              {activeParagraph.category}
            </span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-100">
              {activeParagraph.kur}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
              Doğru: {scoreInfo.correct} / {scoreInfo.total}
            </span>
          </div>
        </div>

        {/* Main Exercise Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* Top Bar: Kur & Question Index */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 px-3.5 py-1 rounded-lg font-black text-sm">
                {activeParagraph.kur}
              </span>
              <h3 className="font-bold text-slate-700 text-sm hidden md:inline-block">
                {activeParagraph.title}
              </h3>
            </div>
            <div className="text-sm font-black text-slate-500">
              Soru {currentQuestionIndex + 1} / {activeParagraph.questions.length}
            </div>
          </div>

          {/* Reading Paragraph Box */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-800 leading-relaxed font-medium text-base md:text-lg">
            "{activeParagraph.paragraphText}"
          </div>

          {/* Question Stem */}
          <div className="pt-2">
            <div className="inline-block px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-md mb-2 border border-amber-200">
              {currentQ.questionType}
            </div>
            <h3 className="font-bold text-slate-900 text-lg md:text-xl">
              {currentQ.questionStem}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              let btnClass = "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 bg-white";
              let badgeClass = "bg-slate-100 text-slate-600";

              if (isAnswered) {
                if (i === currentQ.correctAnswer) {
                  btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm";
                  badgeClass = "bg-emerald-600 text-white";
                } else if (selectedOption === i) {
                  btnClass = "bg-rose-50 border-rose-400 text-rose-800 font-medium";
                  badgeClass = "bg-rose-600 text-white";
                } else {
                  btnClass = "border-slate-200 opacity-50 bg-slate-50 text-slate-400";
                  badgeClass = "bg-slate-200 text-slate-400";
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(i)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all font-medium flex items-start gap-3.5 ${btnClass}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm transition-colors ${badgeClass}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="pt-0.5 text-sm md:text-base leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Card */}
          {isAnswered && (
            <div className={`p-5 rounded-2xl border ${
              selectedOption === currentQ.correctAnswer 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1.5 text-sm">
                {selectedOption === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Tebrikler, doğru cevap!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Doğru Seçenek: {String.fromCharCode(65 + currentQ.correctAnswer)}</span>
                  </>
                )}
              </div>
              <p className="text-xs md:text-sm leading-relaxed opacity-90 pl-7">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-medium">
              Bu kuru geçmek için en fazla 1 yanlış yapabilirsiniz.
            </p>

            <div className="flex items-center gap-3">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevQuestion}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-sm"
                >
                  Önceki Soru
                </button>
              )}

              {isAnswered && !isLastQuestion && (
                <button
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 text-white px-7 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md text-sm flex items-center gap-1.5"
                >
                  <span>Sonraki Soru</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {allQuestionsAnswered && isLastQuestion && (
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50 font-bold hover:bg-indigo-100 transition-colors text-sm flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Tekrar Çöz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. PARAGRAPH BROWSER & SELECTION VIEW
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Book className="text-indigo-600 w-7 h-7" /> Paragraf Okuma
            </h2>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-black rounded-full">
              {ALL_PARAGRAFLAR.length} Paragraf
            </span>
          </div>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Sınavlarda çıkan paragraf soru tipleri ve anlam çözümleme. İstediğiniz paragrafı seçip sorularını çözebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Tamamlanan: {completedParagraphIds.length} / {ALL_PARAGRAFLAR.length}</span>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {PARAGRAF_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                selectedCategory === cat ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Paragraf ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-700"
          />
        </div>
      </div>

      {/* Paragraph Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredParagraphs.map(para => {
          const isDone = completedParagraphIds.includes(para.id);
          return (
            <div
              key={para.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-black rounded-lg border border-indigo-100">
                      {para.category}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-lg">
                      {para.kur}
                    </span>
                  </div>
                  {isDone && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Çözüldü
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-800 text-base mb-2 line-clamp-1">
                  {para.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  "{para.paragraphText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  {para.questions.length} Soru
                </span>

                <button
                  onClick={() => handleSelectParagraph(para)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-colors"
                >
                  <span>Soruları Çöz</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredParagraphs.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <Book className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 text-lg">Eşleşen Paragraf Bulunamadı</h4>
          <p className="text-sm text-slate-500 mt-1">Arama filtrenizi temizleyip tekrar deneyebilirsiniz.</p>
        </div>
      )}
    </div>
  );
}
