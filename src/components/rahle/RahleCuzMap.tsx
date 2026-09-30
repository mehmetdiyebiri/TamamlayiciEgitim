import React, { useState } from 'react';
import { 
  Grid, 
  BookOpen, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Filter, 
  Layers, 
  Bookmark, 
  Award,
  Clock
} from 'lucide-react';
import { RahleStudentProfile, RahlePageStatus } from '../../types/rahle';

interface RahleCuzMapProps {
  profile: RahleStudentProfile;
  onUpdateCuzProgress: (newProgress: Record<number, Record<number, RahlePageStatus>>) => void;
}

export const RahleCuzMap: React.FC<RahleCuzMapProps> = ({
  profile,
  onUpdateCuzProgress
}) => {
  const [selectedCuz, setSelectedCuz] = useState<number>(1);
  const cuzProgress = profile.cuzPageProgress || {};

  // Toggle page status on click: unmemorized -> ham -> has -> unmemorized
  const handleTogglePage = (cuz: number, page: number) => {
    const current = cuzProgress[cuz]?.[page] || 'unmemorized';
    let next: RahlePageStatus = 'unmemorized';
    if (current === 'unmemorized') next = 'ham';
    else if (current === 'ham') next = 'has';
    else next = 'unmemorized';

    const updated = {
      ...cuzProgress,
      [cuz]: {
        ...(cuzProgress[cuz] || {}),
        [page]: next
      }
    };
    onUpdateCuzProgress(updated);
  };

  // Bulk actions for current cuz
  const setAllPagesInCuz = (status: RahlePageStatus) => {
    const cuzPages: Record<number, RahlePageStatus> = {};
    for (let p = 1; p <= 20; p++) {
      cuzPages[p] = status;
    }
    const updated = {
      ...cuzProgress,
      [selectedCuz]: cuzPages
    };
    onUpdateCuzProgress(updated);
  };

  // Helper stats for a given cuz
  const getCuzStats = (cuz: number) => {
    const pages = cuzProgress[cuz] || {};
    let hamCount = 0;
    let hasCount = 0;
    for (let p = 1; p <= 20; p++) {
      if (pages[p] === 'has') hasCount++;
      else if (pages[p] === 'ham') hamCount++;
    }
    const total = hamCount + hasCount;
    const percentage = Math.round((total / 20) * 100);
    return { hamCount, hasCount, total, percentage };
  };

  const selectedStats = getCuzStats(selectedCuz);

  // Overall totals across 30 cuz
  let grandHas = 0;
  let grandHam = 0;
  for (let c = 1; c <= 30; c++) {
    const s = getCuzStats(c);
    grandHas += s.hasCount;
    grandHam += s.hamCount;
  }
  const grandTotal = grandHas + grandHam;
  const grandPercentage = Math.round((grandTotal / 600) * 100);

  return (
    <div className="space-y-6">
      {/* Header and Overview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-black text-xl text-gray-900 flex items-center gap-2.5">
            <BookOpen size={22} className="text-amber-600" />
            <span>30 Cüz Ezber Haritası &amp; Has (Pekiştirme) Takibi</span>
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            Osmanlı 30 cüz dönüşlü klasik usulde her cüzün 20 sayfası ve sarmal tekrar planı
          </p>
        </div>

        {/* Global Progress Badge */}
        <div className="flex items-center gap-4 bg-amber-50 border border-amber-200/80 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <div className="text-xs font-bold text-gray-500">Genel Ezber:</div>
            <div className="text-sm font-black text-amber-900">{grandTotal} / 600 Sayfa (%{grandPercentage})</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
            %{grandPercentage}
          </div>
        </div>
      </div>

      {/* 30 Cüz Grid Selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-gray-700">
            Cüz Seçin (1 - 30. Cüz)
          </span>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Has ({grandHas})</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" /> Ham ({grandHam})</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-200" /> Boş ({600 - grandTotal})</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 sm:gap-2.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(cuz => {
            const isSelected = selectedCuz === cuz;
            const stats = getCuzStats(cuz);
            const isFullyHas = stats.hasCount === 20;
            const isPartiallyMemorized = stats.total > 0;

            return (
              <button
                key={cuz}
                onClick={() => setSelectedCuz(cuz)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 shadow-2xs ${
                  isSelected
                    ? 'border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-105'
                    : isFullyHas
                      ? 'border-emerald-300 bg-emerald-50/80 text-emerald-900 hover:border-emerald-400'
                      : isPartiallyMemorized
                        ? 'border-blue-200 bg-blue-50/50 text-blue-900 hover:border-blue-400'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-[11px] font-black leading-none">{cuz}. Cüz</span>
                <span className={`text-[10px] font-extrabold ${isSelected ? 'text-amber-100' : 'text-gray-400'}`}>
                  {stats.total}/20
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Cüz 20 Pages Detail & Editor */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-3">
          <div>
            <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
              <span>{selectedCuz}. Cüz Ezber Detayı (20 Sayfa)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                {selectedStats.total}/20 Sayfa • %{selectedStats.percentage}
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">
              Sayfa kutucuklarına tıklayarak Boş ⚪, Ham 🔵 ve Has 🟢 durumları arasında geçiş yapabilirsiniz.
            </p>
          </div>

          {/* Quick Bulk Actions for this cuz */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAllPagesInCuz('has')}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors cursor-pointer"
            >
              Hepsini Has Yap
            </button>
            <button
              onClick={() => setAllPagesInCuz('ham')}
              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200 transition-colors cursor-pointer"
            >
              Hepsini Ham Yap
            </button>
            <button
              onClick={() => setAllPagesInCuz('unmemorized')}
              className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-xs border border-gray-200 transition-colors cursor-pointer"
            >
              Sıfırla
            </button>
          </div>
        </div>

        {/* 20 Pages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(page => {
            const status = cuzProgress[selectedCuz]?.[page] || 'unmemorized';
            const isHas = status === 'has';
            const isHam = status === 'ham';

            return (
              <div
                key={page}
                onClick={() => handleTogglePage(selectedCuz, page)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 shadow-2xs group hover:scale-105 ${
                  isHas
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : isHam
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[10px] font-bold opacity-80">
                  <span>Sayfa</span>
                  <span>#{page}</span>
                </div>

                <div className="text-xl font-black">
                  {page}
                </div>

                <div className="text-[10px] font-black uppercase tracking-wider py-0.5 px-2 rounded-full bg-black/10">
                  {isHas ? 'HAS' : isHam ? 'HAM' : 'BOŞ'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sarmal Tekrar (Has) Otomatik Planı */}
        <div className="mt-6 bg-gradient-to-r from-amber-50/80 to-amber-100/50 rounded-2xl border border-amber-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
              <Sparkles size={18} className="text-amber-600" />
              <span>Sarmal Tekrar (Has) Tavsiye Listesi</span>
            </div>
            <span className="text-xs font-bold text-amber-700">
              Klasik 30'luk Dönüş Modeli
            </span>
          </div>

          <p className="text-xs text-amber-900/80 font-medium">
            Öğrencinin ezber sağlamlığı için her gün yeni ham dersi öncesinde pekiştirilmesi gereken cüzler:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
              <span className="font-bold text-gray-500 block mb-1">Bugünkü Has Tekrarı:</span>
              <strong className="text-emerald-700 text-sm">
                {Math.max(1, selectedCuz - 4)}. - {selectedCuz}. Cüzler Arası
              </strong>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
              <span className="font-bold text-gray-500 block mb-1">Haftalık Büyük Has:</span>
              <strong className="text-amber-800 text-sm">
                {selectedCuz <= 15 ? '1 - 15. Cüzler' : '16 - 30. Cüzler'}
              </strong>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
              <span className="font-bold text-gray-500 block mb-1">Sonraki Ham Hedefi:</span>
              <strong className="text-blue-700 text-sm">
                {selectedCuz === 30 ? '1' : selectedCuz + 1}. Cüz (Sayfa {20 - (profile.kacinciDonuste - 1)})
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
