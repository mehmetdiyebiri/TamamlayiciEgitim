import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, 
  RotateCcw, Award, ChevronRight, ChevronLeft, HelpCircle, 
  Sparkles, Target, BookOpen, Check, X, ShieldAlert, Zap,
  Compass, Filter, CheckCircle, BarChart2, Layers, Lightbulb,
  Table as TableIcon, FileText, CheckCheck, TrendingUp
} from 'lucide-react';
import { LGS_TELAFI_SORULARI } from '../../data/lgsTelafiData';
import { 
  LGS_2026_TEST_LIST,
  MEBI_LGS_TEST_LIST,
  LgsTestMeta,
  LgsQuestion,
  LgsTableData
} from '../../data/lgsMebiAnd2026Data';
import { LgsChartRenderer } from './LgsChartRenderer';
import { LgsLogicScenarioRenderer } from './LgsLogicScenarioRenderer';
import { LgsCoordinateGridRenderer } from './LgsCoordinateGridRenderer';

export type LgsCategoryType = '2026_lgs' | 'mebi_lgs' | 'telafi_mantik';

interface LgsTelafiTestPanelProps {
  initialTestType?: '2026_lgs' | 'mebi_lgs' | 'telafi_mantik' | 'all';
  onBack: () => void;
  onComplete?: (score: { correct: number; total: number; percent: number; testName: string }) => void;
  showToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export function LgsTelafiTestPanel({ 
  initialTestType = '2026_lgs', 
  onBack, 
  onComplete, 
  showToast 
}: LgsTelafiTestPanelProps) {
  // Category state: 2026 LGS (10 tests) vs MEBİ (10 tests) vs Telafi
  const [selectedCategory, setSelectedCategory] = useState<LgsCategoryType>(
    initialTestType === 'mebi_lgs' ? 'mebi_lgs' : initialTestType === 'telafi_mantik' ? 'telafi_mantik' : '2026_lgs'
  );

  // Selected test id (default to first test in category)
  const [selectedTestId, setSelectedTestId] = useState<string>(
    initialTestType === 'mebi_lgs' ? 'mebi_test_1' : 'lgs_test_1'
  );

  const [mode, setMode] = useState<'intro' | 'active' | 'review'>('intro');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Completed tests score tracking in localStorage
  const [completedTests, setCompletedTests] = useState<Record<string, { correct: number; total: number; percent: number }>>(() => {
    try {
      const saved = localStorage.getItem('alim_lgs_completed_tests');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Keep category in sync with initial prop if changed
  useEffect(() => {
    if (initialTestType === 'mebi_lgs') {
      setSelectedCategory('mebi_lgs');
      setSelectedTestId('mebi_test_1');
    } else if (initialTestType === 'telafi_mantik') {
      setSelectedCategory('telafi_mantik');
      setSelectedTestId('telafi_test');
    } else {
      setSelectedCategory('2026_lgs');
      setSelectedTestId('lgs_test_1');
    }
  }, [initialTestType]);

  // Current category test list
  const currentCategoryTests = useMemo<LgsTestMeta[]>(() => {
    if (selectedCategory === '2026_lgs') {
      return LGS_2026_TEST_LIST;
    }
    if (selectedCategory === 'mebi_lgs') {
      return MEBI_LGS_TEST_LIST;
    }
    return [];
  }, [selectedCategory]);

  // Current active test configuration
  const currentTestMeta = useMemo<LgsTestMeta | null>(() => {
    if (selectedCategory === 'telafi_mantik') {
      const telafiQuestions: LgsQuestion[] = LGS_TELAFI_SORULARI.map(q => ({
        id: q.id,
        testType: 'telafi_mantik',
        testTitle: 'LGS Sözel Mantık & Anlam Telafi Testi',
        category: q.category,
        konu: q.konu,
        badgeLabel: 'Telafi Sorusu',
        context: q.context,
        tableOrPremises: q.tableOrPremises,
        questionStem: q.questionStem,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        strategyTip: 'Sözel mantık ve çıkarım sorularında metindeki öncülleri sıralı biçimde tabloya dönüştürün.'
      }));

      return {
        id: 'telafi_test',
        testType: '2026_lgs',
        testNumber: 1,
        title: 'LGS Sözel Mantık & Anlam Telafi Testi',
        subtitle: 'Kombinasyon, sıralama ve çıkarım hatalarını telafi edici soru seti',
        description: 'Eksik olduğunuz sözel mantık ve çıkarım konularına özel telafi antrenmanı',
        badge: 'Telafi Testi',
        durationMinutes: 15,
        questionCount: telafiQuestions.length,
        graphicQuestionCount: 3,
        questions: telafiQuestions
      };
    }

    const found = currentCategoryTests.find(t => t.id === selectedTestId);
    return found || currentCategoryTests[0] || null;
  }, [selectedCategory, selectedTestId, currentCategoryTests]);

  // Current questions to solve
  const activeQuestions = useMemo<LgsQuestion[]>(() => {
    return currentTestMeta?.questions || [];
  }, [currentTestMeta]);

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

  const handleStartTest = (testId?: string) => {
    if (testId) {
      setSelectedTestId(testId);
    }
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft((currentTestMeta?.durationMinutes || 15) * 60);
    setIsTimerRunning(true);
    setMode('active');
    if (showToast) {
      showToast(`${currentTestMeta?.title || 'Deneme Sınavı'} başladı. Başarılar!`, 'info');
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
    activeQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const percent = Math.round((correct / (activeQuestions.length || 1)) * 100);
    const testTitle = currentTestMeta?.title || 'Deneme Sınavı';

    // Save to localStorage
    if (currentTestMeta?.id) {
      const updated = {
        ...completedTests,
        [currentTestMeta.id]: {
          correct,
          total: activeQuestions.length,
          percent
        }
      };
      setCompletedTests(updated);
      try {
        localStorage.setItem('alim_lgs_completed_tests', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save test completion', e);
      }
    }

    if (onComplete) {
      onComplete({ 
        correct, 
        total: activeQuestions.length, 
        percent,
        testName: testTitle
      });
    }

    if (showToast) {
      if (percent >= 70) {
        showToast(`Tebrikler! %${percent} başarı ile ${testTitle} tamamlandı!`, 'success');
      } else {
        showToast(`Test tamamlandı. Detaylı çözüm ve strateji ipuçlarını inceleyebilirsiniz.`, 'info');
      }
    }
  };

  const currentQuestion: LgsQuestion = activeQuestions[currentIdx] || activeQuestions[0];
  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = activeQuestions.length;

  // Stats for review
  const correctCount = activeQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const wrongCount = activeQuestions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswer).length;
  const emptyCount = totalQuestions - answeredCount;
  const scorePercent = Math.round((correctCount / (totalQuestions || 1)) * 100);

  // Filtered review questions
  const filteredReviewQuestions = useMemo(() => {
    if (reviewFilter === 'wrong') {
      return activeQuestions.filter(q => userAnswers[q.id] === undefined || userAnswers[q.id] !== q.correctAnswer);
    }
    if (reviewFilter === 'correct') {
      return activeQuestions.filter(q => userAnswers[q.id] === q.correctAnswer);
    }
    return activeQuestions;
  }, [activeQuestions, userAnswers, reviewFilter]);

  // Render Table / Graphic Element
  const renderTableData = (tableData?: LgsTableData, tableMarkdown?: string) => {
    if (tableData && tableData.headers && tableData.headers.length > 0) {
      return (
        <div className="my-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs">
          <div className="bg-slate-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <TableIcon size={14} className="text-indigo-600" />
              Veri Tablosu / Grafik Bilgisi
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {tableData.rows.length} Satır • {tableData.headers.length} Sütun
            </span>
          </div>
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-gray-200 text-slate-700 font-bold">
                  {tableData.headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-3.5 py-2.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
                {tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (tableMarkdown) {
      return (
        <div className="my-3 p-3 bg-slate-50 rounded-xl border border-gray-200 text-xs font-mono whitespace-pre-wrap text-slate-700">
          {tableMarkdown}
        </div>
      );
    }

    return null;
  };

  // Helper to extract clean scenario context without dangling bullet introductions
  const getDisplayContext = (q: LgsQuestion) => {
    let text = q.logicScenario?.setupText || q.context || '';
    if (!text) return '';
    // Strip trailing phrases that were meant to introduce bullets if structured elements or rules follow
    if (q.logicScenario || (q.tableOrPremises && q.tableOrPremises.length > 0)) {
      return text
        .replace(/(?:Kitaplar|Stantlar|Bölümler|Kişiler|Öğrenciler|Ürünler)?\s*şunlardır:?\s*$/i, '')
        .replace(/Aşağıdaki bilgiler verilmiştir\.?\s*$/i, '')
        .replace(/Bilinenler şunlardır:?\s*$/i, '')
        .replace(/Diziliş kuralları şöyledir:?\s*$/i, '')
        .trim();
    }
    return text;
  };

  // -------------------------------------------------------------
  // 1. INTRO / TEST SELECTOR HUB (10 LGS Tests + 10 MEBİ Tests)
  // -------------------------------------------------------------
  if (mode === 'intro') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-10">
        {/* Back and Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button 
            id="btn-lgs-back"
            onClick={onBack} 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-bold px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Antrenör Paneline Dön
          </button>

          <div className="text-xs font-medium text-slate-500">
            Toplam <span className="font-bold text-slate-800">20 Deneme Sınavı</span> • <span className="font-bold text-slate-800">200 Soru</span> (Her Testte Grafik/Tablo Soruları Dahil)
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => {
              setSelectedCategory('2026_lgs');
              setSelectedTestId('lgs_test_1');
            }}
            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedCategory === '2026_lgs'
                ? 'bg-white border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs'
                : 'bg-white border-gray-200 hover:border-gray-300 text-slate-700 shadow-2xs'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  selectedCategory === '2026_lgs' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Sparkles size={12} className="text-indigo-600" /> 10 Deneme Sınavı
                </span>
                <span className="text-[11px] font-bold text-slate-400">100 Soru</span>
              </div>
              <h3 className="font-black text-base text-slate-900">
                2026 LGS Türkçe Denemeleri
              </h3>
              <p className="text-xs text-slate-500">
                Çift metin, grafik/tablo okuryazarlığı ve Maarif modeli odaklı 10 adet 10'ar soruluk deneme.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Testleri Listele</span>
              <ChevronRight size={15} />
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('mebi_lgs');
              setSelectedTestId('mebi_test_1');
            }}
            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedCategory === 'mebi_lgs'
                ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                : 'bg-white border-gray-200 hover:border-gray-300 text-slate-700 shadow-2xs'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  selectedCategory === 'mebi_lgs' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  <BookOpen size={12} className="text-emerald-600" /> 10 Deneme Sınavı
                </span>
                <span className="text-[11px] font-bold text-slate-400">100 Soru</span>
              </div>
              <h3 className="font-black text-base text-slate-900">
                MEBİ LGS Türkçe Denemeleri
              </h3>
              <p className="text-xs text-slate-500">
                MEBİ Bireysel Öğrenme Platformu formatında beceri temelli, grafik ve süreç odaklı 10 test.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Testleri Listele</span>
              <ChevronRight size={15} />
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('telafi_mantik');
              setSelectedTestId('telafi_test');
            }}
            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedCategory === 'telafi_mantik'
                ? 'bg-white border-amber-600 ring-2 ring-amber-600/20 shadow-xs'
                : 'bg-white border-gray-200 hover:border-gray-300 text-slate-700 shadow-2xs'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  selectedCategory === 'telafi_mantik' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Target size={12} className="text-amber-600" /> Özel Telafi
                </span>
                <span className="text-[11px] font-bold text-slate-400">10 Soru</span>
              </div>
              <h3 className="font-black text-base text-slate-900">
                Sözel Mantık Telafi Testi
              </h3>
              <p className="text-xs text-slate-500">
                Kombinasyon, sıralama ve mantıksal çıkarım eksikliklerini kapatmaya yönelik özel test.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Testi İncele</span>
              <ChevronRight size={15} />
            </div>
          </button>
        </div>

        {/* Active Category Header Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                {selectedCategory === '2026_lgs' ? '2026 LGS Kategorisi' : selectedCategory === 'mebi_lgs' ? 'MEBİ Kategorisi' : 'Telafi Modülü'}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {selectedCategory === 'telafi_mantik' ? '1 Test • 10 Soru' : '10 Test • 10\'ar Soru • Her Testte Grafik/Tablo Sorusu'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {selectedCategory === '2026_lgs' 
                ? '2026 LGS Türkçe Yeni Nesil Deneme Havuzu (10 Test)' 
                : selectedCategory === 'mebi_lgs' 
                ? 'MEBİ LGS Türkçe Kazanım & Beceri Denemeleri (10 Test)'
                : 'Sözel Mantık & Anlam Telafi Denemesi'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {selectedCategory === '2026_lgs' 
                ? 'Aşağıdaki 10 denemeden dilediğinizi seçip 15 dakikalık süreyle çözebilir, her denemedeki grafik ve metin sorularını analiz edebilirsiniz.'
                : selectedCategory === 'mebi_lgs'
                ? 'MEBİ platformu benzeri 10 deneme arasından dilediğinizi seçin; süreç, tablo ve çıkarım sorularıyla sınav pratiğinizi artırın.'
                : 'Sözel mantık kuralları, öncül yerleştirme ve sıralama yeteneklerinizi pekiştirin.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-gray-200 text-xs font-bold text-slate-700">
              <BarChart2 size={15} className="text-indigo-600" />
              Her Testte En Az 2 Grafik Sorusu
            </span>
          </div>
        </div>

        {/* 10 Tests Grid (for LGS and MEBİ) */}
        {selectedCategory !== 'telafi_mantik' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCategoryTests.map((test) => {
              const comp = completedTests[test.id];
              const isSelected = selectedTestId === test.id;

              return (
                <div 
                  key={test.id}
                  className={`bg-white rounded-2xl border p-5 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4 ${
                    isSelected ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-gray-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center">
                          {test.testNumber}
                        </span>
                        <span className="font-bold text-xs text-slate-500">
                          {test.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-100 flex items-center gap-1">
                          <BarChart2 size={11} /> {test.graphicQuestionCount} Grafik/Tablo
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-[11px]">
                          <Clock size={11} className="inline mr-1" /> {test.durationMinutes} Dk
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-slate-900 leading-snug">
                        {test.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {test.subtitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {test.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div>
                      {comp ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCheck size={14} />
                          <span>Tamamlandı: {comp.correct}/{comp.total} (%{comp.percent})</span>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          10 Soru • Başlanmadı
                        </span>
                      )}
                    </div>

                    <button
                      id={`btn-start-${test.id}`}
                      onClick={() => handleStartTest(test.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                        selectedCategory === 'mebi_lgs'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {comp ? 'Tekrar Çöz' : 'Teste Başla'} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Telafi Test Single Card */
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-5 text-center max-w-2xl mx-auto shadow-2xs">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
              <Target size={28} />
            </div>
            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black uppercase tracking-wider rounded-full inline-block">
                Özel Sözel Mantık Telafi
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Sözel Mantık & Anlam Telafi Testi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Sıralama, tablo kurma, eşleştirme ve öncülleri yorumlama konularındaki eksikleri gidermek için hazırlanmış 10 soruluk telafi antrenmanı.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleStartTest('telafi_test')}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles size={16} /> Telafi Testine Başla (10 Soru)
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. ACTIVE TEST RUNNER (10 Questions Mode)
  // -------------------------------------------------------------
  if (mode === 'active') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-200">
        {/* Top bar with test title and timer */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 bg-indigo-600 text-white font-black text-xs rounded-xl shadow-2xs">
              Soru {currentIdx + 1} / {totalQuestions}
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-gray-200">
              {currentTestMeta?.title}
            </span>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-xl border border-amber-200">
              {currentQuestion.category}
            </span>
            <span className="hidden md:inline-block text-xs font-medium text-slate-500">
              {currentQuestion.konu}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-xs sm:text-sm border ${
              timeLeft < 180 ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-gray-200'
            }`}>
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
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
            >
              Testi Bitir
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(answeredCount / (totalQuestions || 1)) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 sm:p-7 space-y-6">
          {/* Question Context / Reading Passage */}
          {getDisplayContext(currentQuestion) && (
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 sm:p-5 text-slate-800 leading-relaxed text-sm font-normal">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText size={13} className="text-indigo-600" />
                Metin & Açıklama
              </div>
              <p className="whitespace-pre-line leading-relaxed break-words">{getDisplayContext(currentQuestion)}</p>
            </div>
          )}

          {/* Render Colored Visual Chart if present (Sütun, Pasta, Çubuk, Gruplu) */}
          {currentQuestion.chartData && (
            <LgsChartRenderer chart={currentQuestion.chartData} />
          )}

          {/* Render Table or Graphic Data if present */}
          {renderTableData(currentQuestion.tableData, currentQuestion.tableMarkdown)}

          {/* Sözel Mantık: Gruplandırılmış Unsurlar ve Diziliş Kuralları */}
          {(currentQuestion.logicScenario || (currentQuestion.tableOrPremises && currentQuestion.tableOrPremises.length > 0)) && (
            <LgsLogicScenarioRenderer question={currentQuestion} />
          )}

          {/* Question Stem */}
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {currentQuestion.questionStem}
          </h3>

          {/* Multiple Choice Options */}
          {currentQuestion.gridQuestionData?.optionFigures ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
                const fig = currentQuestion.gridQuestionData!.optionFigures![letter];
                const isSelected = userAnswers[currentQuestion.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    id={`btn-option-${currentQuestion.id}-${optIdx}`}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center gap-2 group ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-600 shadow-xs ring-2 ring-indigo-600/20'
                        : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-800'
                      }`}>
                        {letter}
                      </span>
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-500'}`}>
                        {letter} Seçeneği Çizim Alanı
                      </span>
                    </div>
                    {fig && (
                      <LgsCoordinateGridRenderer
                        figure={fig}
                        optionLetter={letter}
                        selected={isSelected}
                        className="w-full border-0 bg-transparent p-1 shadow-none"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2.5 pt-1">
              {currentQuestion.options.map((opt, optIdx) => {
                const letter = ['A', 'B', 'C', 'D'][optIdx];
                const isSelected = userAnswers[currentQuestion.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    id={`btn-option-${currentQuestion.id}-${optIdx}`}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-600 shadow-2xs ring-2 ring-indigo-600/20'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                    <span className={`text-xs sm:text-sm font-medium pt-0.5 ${isSelected ? 'text-indigo-950 font-bold' : 'text-slate-700'}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation & Question Jump Numbers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <button
            id="btn-prev-question"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            className="w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-xs border border-gray-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Önceki Soru
          </button>

          {/* Quick jump question numbers */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {activeQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;

              return (
                <button
                  key={q.id}
                  id={`btn-jump-q-${idx + 1}`}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-indigo-600 ring-offset-2 bg-indigo-600 text-white shadow-2xs'
                      : isAnswered
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            id="btn-next-question"
            disabled={currentIdx === totalQuestions - 1}
            onClick={() => setCurrentIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
            className="w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            Sonraki Soru <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmFinish && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200 text-center space-y-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto border border-amber-200">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Testi Bitirmek İstiyor musunuz?</h3>
              <p className="text-xs text-slate-600 font-medium">
                {totalQuestions} sorudan <span className="font-bold text-rose-600">{emptyCount} tanesini</span> henüz cevaplamadınız. Sınavı tamamlayıp ayrıntılı çözümleri incelemek istiyor musunuz?
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmFinish(false)}
                  className="px-4 py-2 rounded-xl text-slate-700 font-bold text-xs bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  Sorulara Dön
                </button>
                <button
                  onClick={handleFinishTest}
                  className="px-4 py-2 rounded-xl text-white font-bold text-xs bg-rose-600 hover:bg-rose-700 shadow-2xs cursor-pointer"
                >
                  Evet, Testi Bitir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. REVIEW & SOLUTION ANALYSIS VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Score Summary Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xs ${scorePercent >= 70 ? 'bg-emerald-600' : 'bg-amber-600'}`}>
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold text-[11px] rounded-full border border-indigo-200 uppercase tracking-wider">
                {currentTestMeta?.badge || 'Deneme Tamamlandı'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {currentTestMeta?.title} Sonucu
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {scorePercent >= 70 ? 'Tebrikler! Yüksek başarı oranı sergilediniz.' : 'Eksik konuları aşağıdaki soru çözümleri ve taktik ipuçlarından inceleyin.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setMode('intro');
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Diğer Testleri Seç (20 Test)
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              Antrenöre Dön
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl text-center">
            <div className="text-2xl font-black text-emerald-700">{correctCount}</div>
            <div className="text-xs font-bold text-emerald-800 mt-0.5">Doğru Sayısı</div>
          </div>
          <div className="bg-rose-50/70 border border-rose-200 p-3.5 rounded-xl text-center">
            <div className="text-2xl font-black text-rose-700">{wrongCount}</div>
            <div className="text-xs font-bold text-rose-800 mt-0.5">Yanlış Sayısı</div>
          </div>
          <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl text-center">
            <div className="text-2xl font-black text-amber-700">{emptyCount}</div>
            <div className="text-xs font-bold text-amber-800 mt-0.5">Boş Sayısı</div>
          </div>
          <div className="bg-indigo-50/70 border border-indigo-200 p-3.5 rounded-xl text-center">
            <div className="text-2xl font-black text-indigo-700">%{scorePercent}</div>
            <div className="text-xs font-bold text-indigo-800 mt-0.5">Başarı Yüzdesi</div>
          </div>
        </div>
      </div>

      {/* Review Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="text-indigo-600" size={18} />
          Soru Çözümleri & Taktik Rehberi ({totalQuestions} Soru)
        </h3>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
          <button
            onClick={() => setReviewFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              reviewFilter === 'all' ? 'bg-slate-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tümü ({totalQuestions})
          </button>
          <button
            onClick={() => setReviewFilter('wrong')}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              reviewFilter === 'wrong' ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Yanlış & Boş ({wrongCount + emptyCount})
          </button>
          <button
            onClick={() => setReviewFilter('correct')}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              reviewFilter === 'correct' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doğrular ({correctCount})
          </button>
        </div>
      </div>

      {/* Questions Detailed Solution List */}
      <div className="space-y-5">
        {filteredReviewQuestions.map((q, idx) => {
          const userAnsIdx = userAnswers[q.id];
          const isCorrect = userAnsIdx === q.correctAnswer;
          const isAnswered = userAnsIdx !== undefined;

          return (
            <div 
              key={q.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 space-y-4 shadow-2xs transition-all ${
                !isAnswered 
                  ? 'border-amber-200 ring-1 ring-amber-200/50' 
                  : isCorrect 
                  ? 'border-emerald-200' 
                  : 'border-rose-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs text-white ${
                    !isAnswered ? 'bg-amber-500' : isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                    {q.category}
                  </span>
                  <span className="font-medium text-xs px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {q.konu}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle size={13} /> Doğru
                    </span>
                  ) : isAnswered ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      <XCircle size={13} /> Yanlış (Cevabın: {['A', 'B', 'C', 'D'][userAnsIdx]})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <AlertCircle size={13} /> Boş Bırakıldı
                    </span>
                  )}
                </div>
              </div>

              {/* Context / Text */}
              {getDisplayContext(q) && (
                <div className="bg-slate-50 border border-gray-200 rounded-xl p-3.5 text-slate-800 text-xs sm:text-sm leading-relaxed">
                  <p className="whitespace-pre-line leading-relaxed break-words">{getDisplayContext(q)}</p>
                </div>
              )}

              {/* Render Colored Visual Chart if present in Review */}
              {q.chartData && (
                <LgsChartRenderer chart={q.chartData} />
              )}

              {/* Render Table Data if present */}
              {renderTableData(q.tableData, q.tableMarkdown)}

              {/* Sözel Mantık: Gruplandırılmış Unsurlar ve Diziliş Kuralları (Review) */}
              {(q.logicScenario || (q.tableOrPremises && q.tableOrPremises.length > 0)) && (
                <LgsLogicScenarioRenderer question={q} compact={true} />
              )}

              {/* Stem */}
              <h4 className="text-sm font-black text-slate-900">
                {q.questionStem}
              </h4>

              {/* Options Breakdown */}
              {q.gridQuestionData?.optionFigures ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
                    const fig = q.gridQuestionData!.optionFigures![letter];
                    const isRightAnswer = optIdx === q.correctAnswer;
                    const isUserSelection = userAnsIdx === optIdx;
                    const status = isRightAnswer ? 'correct' : isUserSelection ? 'wrong' : 'default';

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-2xl border flex flex-col items-center gap-2 ${
                          isRightAnswer
                            ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20'
                            : isUserSelection
                            ? 'bg-rose-50/70 border-rose-300'
                            : 'bg-white border-gray-200 opacity-80'
                        }`}
                      >
                        <div className="w-full flex items-center justify-between pb-1 border-b border-gray-100">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                            isRightAnswer ? 'bg-emerald-600 text-white' : isUserSelection ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {letter}
                          </span>
                          {isRightAnswer && (
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                              ✓ Doğru Seçenek
                            </span>
                          )}
                          {isUserSelection && !isRightAnswer && (
                            <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                              ✕ Sizin Cevabınız
                            </span>
                          )}
                        </div>
                        {fig && (
                          <LgsCoordinateGridRenderer
                            figure={fig}
                            optionLetter={letter}
                            status={status}
                            className="w-full border-0 bg-transparent p-0 shadow-none"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const letter = ['A', 'B', 'C', 'D'][optIdx];
                    const isRightAnswer = optIdx === q.correctAnswer;
                    const isUserSelection = userAnsIdx === optIdx;

                    return (
                      <div 
                        key={optIdx}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-start gap-2 ${
                          isRightAnswer
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : isUserSelection
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-gray-200 text-slate-600'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 ${
                          isRightAnswer
                            ? 'bg-emerald-600 text-white'
                            : isUserSelection
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {letter}
                        </span>
                        <span className="pt-0.5">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Explanation & Strategy Tip Box */}
              <div className="bg-slate-50 border border-gray-200 rounded-xl p-3.5 space-y-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-amber-500" />
                  Detaylı Çözüm Açıklaması:
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {q.explanation}
                </p>

                {q.strategyTip && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-indigo-600 shrink-0" />
                    <span>LGS / MEBİ Sınav Taktik İpucu: {q.strategyTip}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
