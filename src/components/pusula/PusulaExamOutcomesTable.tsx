import React, { useState, useMemo } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Plus, 
  Check,
  FileText
} from 'lucide-react';
import { PusulaExamOutcome } from '../../types/pusula';

interface PusulaExamOutcomesTableProps {
  outcomes: PusulaExamOutcome[];
  onAddToWeeklyPlan?: (outcome: PusulaExamOutcome) => void;
  readOnly?: boolean;
  title?: string;
  showSummaryCards?: boolean;
  compact?: boolean;
}

// Helper to map subject name to official SONUÇ BELGESİ category header & display title
function getSubjectMeta(subject: string): {
  categoryLabel: string;
  displayTitle: string;
  order: number;
} {
  const s = (subject || '').trim().toLocaleLowerCase('tr-TR');
  if (s.includes('türkçe') || s.includes('turkce')) {
    return { categoryLabel: 'Sözel (TÜR)', displayTitle: 'Türkçe', order: 1 };
  }
  if (s.includes('sosyal')) {
    return { categoryLabel: 'Sözel (SOS)', displayTitle: 'SOSYAL BİLGİLER', order: 2 };
  }
  if (s.includes('tarih') || s.includes('inkılap') || s.includes('inkilap')) {
    return { categoryLabel: 'Sözel (TAR)', displayTitle: subject, order: 2 };
  }
  if (s.includes('din')) {
    return { categoryLabel: 'Sözel (DİN)', displayTitle: 'Din K.ve A.B.', order: 3 };
  }
  if (s.includes('ingilizce') || s.includes('yabancı')) {
    return { categoryLabel: 'Sözel (İNG)', displayTitle: 'İngilizce', order: 4 };
  }
  if (s.includes('matematik') || s.includes('mat')) {
    return { categoryLabel: 'Sayısal (MAT)', displayTitle: 'Matematik', order: 5 };
  }
  if (s.includes('fen')) {
    return { categoryLabel: 'Sayısal (FEN)', displayTitle: 'Fen', order: 6 };
  }
  if (s.includes('fizik')) {
    return { categoryLabel: 'Sayısal (FİZ)', displayTitle: 'Fizik', order: 7 };
  }
  if (s.includes('kimya')) {
    return { categoryLabel: 'Sayısal (KİM)', displayTitle: 'Kimya', order: 8 };
  }
  if (s.includes('biyoloji')) {
    return { categoryLabel: 'Sayısal (BİY)', displayTitle: 'Biyoloji', order: 9 };
  }
  return { categoryLabel: `Ders (${subject})`, displayTitle: subject || 'Genel', order: 99 };
}

export const PusulaExamOutcomesTable: React.FC<PusulaExamOutcomesTableProps> = ({
  outcomes = [],
  onAddToWeeklyPlan,
  readOnly = false,
  title = "DERSLERE GÖRE ANALİZ",
  showSummaryCards = true,
  compact = false
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('Hepsi');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Unique subjects ordered by standard report card sequence
  const availableSubjects = useMemo(() => {
    const subs = Array.from(new Set(outcomes.map(o => o.subject))).filter(Boolean);
    subs.sort((a, b) => getSubjectMeta(a).order - getSubjectMeta(b).order);
    return ['Hepsi', ...subs];
  }, [outcomes]);

  // Filtered outcomes
  const filteredOutcomes = useMemo(() => {
    return outcomes.filter(item => {
      const matchSub = selectedSubject === 'Hepsi' || item.subject === selectedSubject;
      const matchSearch = !searchTerm.trim() || 
        item.outcome.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        item.subject.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR'));
      return matchSub && matchSearch;
    });
  }, [outcomes, selectedSubject, searchTerm]);

  // Group filtered outcomes by subject in official SONUÇ BELGESİ order
  const groupedBySubject = useMemo(() => {
    const map = new Map<string, PusulaExamOutcome[]>();
    filteredOutcomes.forEach(item => {
      const sub = item.subject || 'Genel';
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(item);
    });

    const groups = Array.from(map.entries()).map(([subject, items]) => {
      const meta = getSubjectMeta(subject);
      const totalS = items.reduce((acc, i) => acc + (i.totalQuestions || 0), 0);
      const totalD = items.reduce((acc, i) => acc + (i.correct || 0), 0);
      const totalY = items.reduce((acc, i) => acc + (i.wrong || 0), 0);
      const avgB = totalS > 0 ? Math.round((totalD / totalS) * 100) : 0;
      return {
        subject,
        categoryLabel: meta.categoryLabel,
        displayTitle: meta.displayTitle,
        order: meta.order,
        items,
        totalS,
        totalD,
        totalY,
        avgB
      };
    });

    groups.sort((a, b) => a.order - b.order);
    return groups;
  }, [filteredOutcomes]);

  // Overall Statistics
  const stats = useMemo(() => {
    const totalOutcomes = outcomes.length;
    const fullyMastered = outcomes.filter(o => o.successPercent === 100).length;
    const criticalNeedsReview = outcomes.filter(o => o.successPercent < 50).length;
    const moderateReview = outcomes.filter(o => o.successPercent >= 50 && o.successPercent < 100).length;
    const totalQuestions = outcomes.reduce((a, b) => a + (b.totalQuestions || 0), 0);
    const totalCorrect = outcomes.reduce((a, b) => a + (b.correct || 0), 0);
    const totalWrong = outcomes.reduce((a, b) => a + (b.wrong || 0), 0);
    const avgSuccess = totalQuestions > 0 
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : (totalOutcomes > 0 ? Math.round(outcomes.reduce((a, b) => a + (b.successPercent || 0), 0) / totalOutcomes) : 0);

    return {
      totalOutcomes,
      fullyMastered,
      criticalNeedsReview,
      moderateReview,
      avgSuccess,
      totalQuestions,
      totalCorrect,
      totalWrong
    };
  }, [outcomes]);

  const handleAddPlan = (outcome: PusulaExamOutcome) => {
    if (onAddToWeeklyPlan) {
      onAddToWeeklyPlan(outcome);
      const key = `${outcome.subject}_${outcome.outcome}`;
      setAddedItems(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [key]: false }));
      }, 3000);
    }
  };

  if (!outcomes || outcomes.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
        <Target size={36} className="mx-auto text-gray-300" />
        <div className="font-bold text-gray-700 text-sm">Kazanım Analiz Verisi Bulunamadı</div>
        <p className="text-xs text-gray-400">
          Bu deneme sınavı sonucuna ait ders kazanım dökümü eklenmemiş veya PDF'ten okunamamış.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2 uppercase tracking-wide">
            <FileText size={19} className="text-purple-600" />
            {title}
          </h3>
          <p className="text-xs font-semibold text-gray-500">
            Derslerin kazanımlarına göre <strong className="text-gray-700">S</strong> (Soru Sayısı), <strong className="text-emerald-700">D</strong> (Doğru Sayısı), <strong className="text-rose-700">Y</strong> (Yanlış Sayısı) ve <strong className="text-purple-700">B%</strong> (Başarı Yüzdesi) dökümü
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Kazanım veya ders ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 pl-9 pr-3 py-1.5 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      {showSummaryCards && !compact && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Toplam Kazanım</span>
            <div className="text-xl font-black text-purple-950">{stats.totalOutcomes} Kazanım</div>
            <p className="text-[10px] text-purple-800 font-semibold">Toplam {stats.totalQuestions} Soru</p>
          </div>

          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Tam Başarılı (%100)</span>
            <div className="text-xl font-black text-emerald-950">{stats.fullyMastered} Kazanım</div>
            <p className="text-[10px] text-emerald-800 font-semibold">Eksiksiz kavranmış</p>
          </div>

          <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider">Öncelikli Telafi (&lt;%50)</span>
            <div className="text-xl font-black text-rose-950">{stats.criticalNeedsReview} Kazanım</div>
            <p className="text-[10px] text-rose-800 font-semibold">Konu tekrarı gerektirir</p>
          </div>

          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Doğru / Yanlış Toplamı</span>
            <div className="text-xl font-black text-blue-950">
              {stats.totalCorrect} D <span className="text-rose-600 text-base">/ {stats.totalWrong} Y</span>
            </div>
            <p className="text-[10px] text-blue-800 font-semibold">Genel Kazanım Başarısı: %{stats.avgSuccess}</p>
          </div>
        </div>
      )}

      {/* Subject Filter Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {availableSubjects.map((sub) => {
          const isSelected = selectedSubject === sub;
          const count = sub === 'Hepsi' ? outcomes.length : outcomes.filter(o => o.subject === sub).length;
          return (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span>{sub}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                isSelected ? 'bg-purple-800 text-purple-100' : 'bg-gray-200 text-gray-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Official SONUÇ BELGESİ - "DERSLERE GÖRE ANALİZ" Grouped Container */}
      <div className="border-2 border-gray-800 rounded-xl overflow-hidden bg-white shadow-xs">
        {/* Top Official Banner Title */}
        <div className="bg-gray-100 border-b-2 border-gray-800 py-2 px-4 text-center">
          <span className="text-sm font-black tracking-wider text-gray-900 uppercase">
            DERSLERE GÖRE ANALİZ
          </span>
        </div>

        {groupedBySubject.length === 0 ? (
          <div className="py-8 text-center text-gray-400 font-semibold text-xs">
            Arama kriterine uygun kazanım bulunamadı.
          </div>
        ) : (
          <div className="divide-y-2 divide-gray-800">
            {groupedBySubject.map((group) => (
              <div key={group.subject} className="bg-white">
                {/* Category Header Row (e.g., "Sözel (TÜR)", "Sözel (SOS)", "Sayısal (MAT)") */}
                <div className="bg-gray-50 border-b border-gray-400 px-3 py-1.5 flex items-center justify-between">
                  <span className="text-xs font-black text-gray-900">
                    {group.categoryLabel}
                  </span>
                  <span className="text-[11px] font-bold text-gray-600">
                    Toplam: <strong className="text-gray-900">{group.totalS}</strong> Soru • <strong className="text-emerald-700">{group.totalD}</strong> Doğru • <strong className="text-rose-700">{group.totalY}</strong> Yanlış • Başarı: <strong className="text-purple-800">%{group.avgB}</strong>
                  </span>
                </div>

                {/* Subject Table with S | D | Y | B% columns */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-400 bg-white text-gray-900 font-black text-[11px]">
                        <th className="py-1.5 px-3 font-black text-gray-900">
                          {group.displayTitle}
                        </th>
                        <th className="py-1.5 px-2 text-center w-12 font-black text-gray-900" title="Soru Sayısı">
                          S
                        </th>
                        <th className="py-1.5 px-2 text-center w-12 font-black text-gray-900" title="Doğru Sayısı">
                          D
                        </th>
                        <th className="py-1.5 px-2 text-center w-12 font-black text-gray-900" title="Yanlış Sayısı">
                          Y
                        </th>
                        <th className="py-1.5 px-2 text-center w-14 font-black text-gray-900" title="Başarı Yüzdesi">
                          B%
                        </th>
                        {!compact && (
                          <th className="py-1.5 px-2 text-center w-28 font-bold text-gray-600 hidden md:table-cell">
                            Durum
                          </th>
                        )}
                        {!readOnly && onAddToWeeklyPlan && !compact && (
                          <th className="py-1.5 px-2 text-center w-28 font-bold text-gray-600 print:hidden">
                            Eylem
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/70">
                      {group.items.map((item, idx) => {
                        const key = `${item.subject}_${item.outcome}`;
                        const isAdded = !!addedItems[key];
                        const is100 = item.successPercent === 100;
                        const isGood = item.successPercent >= 70;
                        const isMedium = item.successPercent >= 40 && item.successPercent < 70;
                        const isShaded = idx % 2 === 0;

                        return (
                          <tr
                            key={idx}
                            className={`${
                              isShaded ? 'bg-gray-200/65' : 'bg-white'
                            } hover:bg-purple-50/60 transition-colors`}
                          >
                            <td className="py-1.5 px-3 font-medium text-gray-900 text-xs leading-snug">
                              {item.outcome}
                            </td>
                            <td className="py-1.5 px-2 text-center font-bold text-gray-900 tabular-nums">
                              {item.totalQuestions}
                            </td>
                            <td className="py-1.5 px-2 text-center font-bold text-emerald-800 tabular-nums">
                              {item.correct}
                            </td>
                            <td className="py-1.5 px-2 text-center font-bold text-rose-700 tabular-nums">
                              {item.wrong}
                            </td>
                            <td className="py-1.5 px-2 text-center font-black tabular-nums">
                              <span
                                className={`inline-block min-w-8 px-1.5 py-0.5 rounded text-[11px] ${
                                  isGood
                                    ? 'text-emerald-900 bg-emerald-100/80'
                                    : isMedium
                                    ? 'text-amber-900 bg-amber-100/80'
                                    : 'text-rose-900 bg-rose-100/80'
                                }`}
                              >
                                {item.successPercent}
                              </span>
                            </td>
                            {!compact && (
                              <td className="py-1.5 px-2 text-center whitespace-nowrap hidden md:table-cell">
                                {is100 ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 size={11} /> Tam
                                  </span>
                                ) : isGood ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    İyi
                                  </span>
                                ) : isMedium ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                    Geliştirilmeli
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                                    <AlertTriangle size={11} /> Telafi
                                  </span>
                                )}
                              </td>
                            )}
                            {!readOnly && onAddToWeeklyPlan && !compact && (
                              <td className="py-1.5 px-2 text-center whitespace-nowrap print:hidden">
                                <button
                                  type="button"
                                  onClick={() => handleAddPlan(item)}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1 ${
                                    isAdded
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-white hover:bg-purple-50 text-purple-800 border border-purple-200'
                                  }`}
                                  title="Bu kazanımı öğrencinin haftalık çalışma planına ekle"
                                >
                                  {isAdded ? (
                                    <>
                                      <Check size={11} /> Eklendi
                                    </>
                                  ) : (
                                    <>
                                      <Plus size={11} /> Plana Ekle
                                    </>
                                  )}
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
