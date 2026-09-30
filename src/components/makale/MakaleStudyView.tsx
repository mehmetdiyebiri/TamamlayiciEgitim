import React, { useState } from 'react';
import { MakaleItem } from '../../data/makaleTypes';
import { 
  ArrowLeft, Brain, CheckCircle2, AlertCircle, Sparkles, HelpCircle, 
  Lightbulb, ShieldAlert, Clock, ChevronDown, ChevronUp, Save,
  Check, Eye, BookOpen, Layers, Award
} from 'lucide-react';

interface MakaleStudyViewProps {
  article: MakaleItem;
  onBack: () => void;
  onAddWord: (word: string, contextSentence?: string, articleTitle?: string) => void;
  onCompleteArticle?: (articleId: number) => void;
}

export const MakaleStudyView: React.FC<MakaleStudyViewProps> = ({
  article,
  onBack,
  onAddWord,
  onCompleteArticle
}) => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'quiz' | 'solution'>('workspace');
  
  // Student workspace answers (initialized from saved or empty)
  const [workspaceInput, setWorkspaceInput] = useState({
    konuDedektifi: '',
    hizliOzet: '',
    yazarinAmaci: '',
    soru1: '',
    soru2: '',
    soru3: '',
    anaDusunce: '',
    cikarimYapma: '',
    yardimci1: '',
    yardimci2: '',
    yardimci3: '',
    boslukDoldurma: '',
    anlatimBicimi: '',
    dusunceyiGelistirme: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{
    score?: number;
    feedback?: string;
    isAcceptable?: boolean;
  } | null>(null);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Added words flash state
  const [clickedWord, setClickedWord] = useState<string | null>(null);

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, '');
    if (cleanWord.length > 2) {
      // Find the sentence containing this word
      const sentences = article.text.split(/([.?!]\s+)/);
      let contextSentence = '';
      for (const s of sentences) {
        if (s.toLowerCase().includes(cleanWord.toLowerCase())) {
          contextSentence = s.trim();
          break;
        }
      }
      onAddWord(cleanWord, contextSentence, article.title);
      setClickedWord(cleanWord);
      setTimeout(() => setClickedWord(null), 1500);
    }
  };

  const handleAiCheckAnaFikir = async () => {
    if (!workspaceInput.anaDusunce.trim()) return;
    setAiLoading(true);
    setAiFeedback(null);
    try {
      const res = await fetch('/api/semantic-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentAnswer: workspaceInput.anaDusunce,
          idealAnswer: article.idealAnswer
        })
      });
      const data = await res.json();
      setAiFeedback(data);
    } catch {
      // Fallback local comparison if API offline
      const matches = article.idealAnswer.toLowerCase().split(' ')
        .filter(w => w.length > 4 && workspaceInput.anaDusunce.toLowerCase().includes(w));
      const score = Math.min(95, Math.max(55, matches.length * 20));
      setAiFeedback({
        score,
        isAcceptable: score >= 60,
        feedback: score >= 60 
          ? "Tebrikler! Metnin ana düşüncesini ve temel odak noktasını başarıyla yakaladınız."
          : "Fikir yönü doğru ancak metnin nihai sentezini biraz daha derinleştirip ek anahtar kavramlara yer vermelisiniz."
      });
    }
    setAiLoading(false);
  };

  const handleSaveDraft = () => {
    setSavedSuccess(true);
    if (onCompleteArticle) {
      onCompleteArticle(article.id);
    }
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleQuizOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);
    if (onCompleteArticle && article.quizQuestion.options[idx].isCorrect) {
      onCompleteArticle(article.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Makale Listesine Dön
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wide">
              <span>{article.workshopTitle}</span>
              <span>•</span>
              <span>Makale #{article.articleNumber}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">{article.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100">
            <Clock className="w-3.5 h-3.5" />
            {article.duration} Dakika
          </span>
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100">
            {article.difficulty}
          </span>
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">
            {article.category}
          </span>
        </div>
      </div>

      {/* Word Click Toast notification */}
      {clickedWord && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>"{clickedWord}" sözcük havuzunuza eklendi!</span>
        </div>
      )}

      {/* Main Grid: Reading Text (Left) + Analytical Studio (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Full Academic Text */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Akademik Metin & Çözümleme Alanı</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Sözcük eklemek için kelimeye tıklayın
              </span>
            </div>

            {/* Metin Gövdesi */}
            <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base font-normal select-text">
              <p className="space-x-1">
                {article.text.split(' ').map((word, i) => (
                  <span
                    key={i}
                    onClick={() => handleWordClick(word)}
                    className="cursor-pointer hover:bg-amber-100 hover:text-amber-900 rounded px-0.5 transition-colors"
                    title="Sözcük havuzuna eklemek için tıklayın"
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
            </div>

            {/* Kazanımlar / Skills Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Metnin Bilişsel ve Edebi Odakları
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Tabs (Workspace, Quiz, Expert Solution) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Tab Selector */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'workspace'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>10 Adımlı Analiz</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Analitik Soru</span>
              {quizSubmitted && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('solution')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'solution'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Örnek Çözüm & Rapor</span>
            </button>
          </div>

          {/* TAB 1: 10 ADIMLI ÖĞRENCİ ÇALIŞMA DEFTERİ */}
          {activeTab === 'workspace' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Bilişsel Analiz Çalışma Defteri
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Metni derinlemesine parçalara ayırarak çözümleyin.
                  </p>
                </div>
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition-all"
                >
                  {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{savedSuccess ? 'Kaydedildi!' : 'Taslağı Kaydet'}</span>
                </button>
              </div>

              {/* 1. Konu Dedektifi */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    1
                  </span>
                  Konu Dedektifi (Bu metin neyi anlatıyor?)
                </label>
                <input
                  type="text"
                  placeholder="Metnin ele aldığı temel konuyu kısaca yazın..."
                  value={workspaceInput.konuDedektifi}
                  onChange={(e) =>
                    setWorkspaceInput({ ...workspaceInput, konuDedektifi: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              {/* 2. Hızlı Özet */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    2
                  </span>
                  Hızlı Özet (2-3 cümlelik öz)
                </label>
                <textarea
                  rows={2}
                  placeholder="Metnin çekirdek içeriğini 2-3 cümleyle özetleyin..."
                  value={workspaceInput.hizliOzet}
                  onChange={(e) =>
                    setWorkspaceInput({ ...workspaceInput, hizliOzet: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* 3. Yazarın Amacı */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    3
                  </span>
                  Yazarın Amacı (Bu metin neden yazıldı?)
                </label>
                <input
                  type="text"
                  placeholder="Yazarın bu metni kaleme almaktaki temel hedefi..."
                  value={workspaceInput.yazarinAmaci}
                  onChange={(e) =>
                    setWorkspaceInput({ ...workspaceInput, yazarinAmaci: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              {/* 4. Soru Üretimi (3 Soru) */}
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    4
                  </span>
                  Soru Üretimi (Metinle ilgili 3 soru kurun)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="1. Soru..."
                    value={workspaceInput.soru1}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, soru1: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="2. Soru..."
                    value={workspaceInput.soru2}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, soru2: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="3. Soru..."
                    value={workspaceInput.soru3}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, soru3: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* 5. Ana Düşünce + AI Semantik Kontrol */}
              <div className="space-y-3 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                      5
                    </span>
                    Ana Düşünce (Kapsayıcı temel mesaj)
                  </label>
                  <button
                    onClick={handleAiCheckAnaFikir}
                    disabled={aiLoading || !workspaceInput.anaDusunce.trim()}
                    className="px-3.5 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{aiLoading ? 'Değerlendiriliyor...' : 'Yapay Zeka ile Doğrula'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="Metnin okura iletmek istediği asıl düşünceyi kendi cümlelerinizle yazın..."
                  value={workspaceInput.anaDusunce}
                  onChange={(e) =>
                    setWorkspaceInput({ ...workspaceInput, anaDusunce: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl text-sm font-medium focus:border-indigo-500 outline-none resize-none"
                />

                {aiFeedback && (
                  <div
                    className={`p-4 rounded-xl border text-xs font-medium space-y-2 ${
                      aiFeedback.isAcceptable
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        {aiFeedback.isAcceptable ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        )}
                        {aiFeedback.isAcceptable ? 'Başarılı Ana Fikir Sentezi' : 'Geliştirilmeli'}
                      </span>
                      {aiFeedback.score !== undefined && (
                        <span className="px-2 py-0.5 bg-white rounded-md border text-slate-800">
                          Skor: %{aiFeedback.score}
                        </span>
                      )}
                    </div>
                    <p className="leading-relaxed">{aiFeedback.feedback}</p>
                  </div>
                )}
              </div>

              {/* 6. Çıkarım Yapma */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    6
                  </span>
                  Çıkarım Yapma (Satır arası gizli anlam)
                </label>
                <input
                  type="text"
                  placeholder="Metinde doğrudan söylenmeyen ama ima edilen bir çıkarım..."
                  value={workspaceInput.cikarimYapma}
                  onChange={(e) =>
                    setWorkspaceInput({ ...workspaceInput, cikarimYapma: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              {/* 7. Yardımcı Düşünceler (3 Madde) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    7
                  </span>
                  Yardımcı Düşünceler (Ana fikri destekleyen 3 dayanak)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="1. Yardımcı Düşünce..."
                    value={workspaceInput.yardimci1}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, yardimci1: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="2. Yardımcı Düşünce..."
                    value={workspaceInput.yardimci2}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, yardimci2: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="3. Yardımcı Düşünce..."
                    value={workspaceInput.yardimci3}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, yardimci3: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* 8. Boşluk Doldurma */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                    8
                  </span>
                  Boşluk Doldurma (Metin sonundaki (—-) boşluğunu tamamlayın)
                </label>
                <textarea
                  rows={2}
                  placeholder="Metnin akışına ve düşünce zincirine uygun bir sonuç cümlesi..."
                  value={workspaceInput.boslukDoldurma}
                  onChange={(e) =>
                    setWorkspaceInput({ ...workspaceInput, boslukDoldurma: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              {/* 9 & 10: Anlatım Biçimi ve Düşünceyi Geliştirme Yolları */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                      9
                    </span>
                    Anlatım Biçimi
                  </label>
                  <input
                    type="text"
                    placeholder="Açıklayıcı, Tartışmacı..."
                    value={workspaceInput.anlatimBicimi}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, anlatimBicimi: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                      10
                    </span>
                    Düşünceyi Geliştirme Yolları
                  </label>
                  <input
                    type="text"
                    placeholder="Tanımlama, Karşılaştırma..."
                    value={workspaceInput.dusunceyiGelistirme}
                    onChange={(e) =>
                      setWorkspaceInput({ ...workspaceInput, dusunceyiGelistirme: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ÇOKTAN SEÇMELİ ANALİTİK SORU & ÇELDİRİCİ ANALİZİ */}
          {activeTab === 'quiz' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Akademik Çoktan Seçmeli Soru
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Çeldirici modelleri ve soru tipi çözümlemesi
                  </p>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                  LGS / YKS Formatı
                </span>
              </div>

              {/* Soru Kökü */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-800 text-base leading-relaxed">
                  {article.quizQuestion.stem}
                </p>
              </div>

              {/* Şıklar */}
              <div className="space-y-3">
                {article.quizQuestion.options.map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const showResult = quizSubmitted;
                  
                  let cardStyle = "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-700";
                  if (showResult) {
                    if (opt.isCorrect) {
                      cardStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold shadow-sm";
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = "border-rose-400 bg-rose-50 text-rose-900";
                    } else {
                      cardStyle = "border-slate-100 opacity-60 text-slate-500";
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleQuizOptionSelect(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${cardStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            showResult && opt.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : showResult && isSelected && !opt.isCorrect
                              ? 'bg-rose-500 text-white'
                              : isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {opt.letter}
                        </div>
                        <span className="text-sm leading-relaxed mt-0.5">{opt.text}</span>
                      </div>

                      {/* Çeldirici Türü Etiketi (Cevaplandıktan sonra görünür) */}
                      {showResult && (
                        <span
                          className={`text-2xs uppercase tracking-wider px-2.5 py-1 rounded-md font-bold shrink-0 ${
                            opt.isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {opt.type}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Soru Çözüm Açıklaması */}
              {quizSubmitted && (
                <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-2 animate-in fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Çözüm ve Çeldirici Analizi
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {article.quizQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ÖRNEK ÇÖZÜM & NÖRAL UYARI RAPORU */}
          {activeTab === 'solution' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Uzman Çözüm Raporu & Nöral Uyarı
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Temelden ileri düzeye eksiksiz analitik şablon
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                    Bilişsel Süre: {article.solution.cognitiveTime}
                  </span>
                </div>
              </div>

              {/* Nöral Uyarı (Yapay Zeka Hata Tuzağı) */}
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Nöral Uyarı (Sık Düşülen Anlam Tuzağı)</span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed font-semibold">
                  {article.solution.neuralWarning}
                </p>
              </div>

              {/* Çözüm Parametreleri Listesi */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    1. Konu Dedektifi
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {article.solution.konuDedektifi}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    2. Hızlı Özet
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {article.solution.hizliOzet}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    3. Yazarın Amacı
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {article.solution.yazarinAmaci}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    4. Soru Üretimi (Örnek Sorular)
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-xs font-medium text-slate-800">
                    {article.solution.soruUretimi.map((q, qIdx) => (
                      <li key={qIdx}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-1">
                  <span className="text-xs font-black text-indigo-900 uppercase">
                    5. Ana Düşünce (Kapsayıcı Mesaj)
                  </span>
                  <p className="text-xs font-bold text-indigo-950 leading-relaxed">
                    {article.solution.anaDusunce}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    6. Çıkarım Yapma
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {article.solution.cikarimYapma}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    7. Yardımcı Düşünceler
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-xs font-medium text-slate-800">
                    {article.solution.yardimciDusunceler.map((item, yIdx) => (
                      <li key={yIdx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    8. Boşluk Doldurma (Sonuç Cümlesi)
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed italic">
                    "{article.solution.boslukDoldurma}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-xs font-black text-indigo-700 uppercase">
                      9. Anlatım Biçimi
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {article.solution.anlatimBicimi}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-xs font-black text-indigo-700 uppercase">
                      10. Düşünceyi Geliştirme Yolları
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {article.solution.dusunceyiGelistirme}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
