import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Filter, 
  Eye, 
  FileSpreadsheet,
  Award,
  Layers,
  Clock
} from 'lucide-react';
import { RahleStudentProfile, RahleDailyEntry } from '../../types/rahle';
import { getStatusBadge } from '../../utils/rahleData';

interface RahleMatrixCalendarProps {
  profile: RahleStudentProfile;
  onSelectDateToEdit?: (dateStr: string) => void;
}

export const RahleMatrixCalendar: React.FC<RahleMatrixCalendarProps> = ({
  profile,
  onSelectDateToEdit
}) => {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1); // 1-12
  const [activeCellDetail, setActiveCellDetail] = useState<{ date: string; entry?: RahleDailyEntry } | null>(null);

  const months = [
    { num: 1, name: 'Ocak' },
    { num: 2, name: 'Şubat' },
    { num: 3, name: 'Mart' },
    { num: 4, name: 'Nisan' },
    { num: 5, name: 'Mayıs' },
    { num: 6, name: 'Haziran' },
    { num: 7, name: 'Temmuz' },
    { num: 8, name: 'Ağustos' },
    { num: 9, name: 'Eylül' },
    { num: 10, name: 'Ekim' },
    { num: 11, name: 'Kasım' },
    { num: 12, name: 'Aralık' }
  ];

  // Calculate days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // Helper to format date YYYY-MM-DD
  const getDateStr = (year: number, month: number, day: number) => {
    const m = month.toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  // Monthly stats
  let totalDers = 0;
  let totalKaldi = 0;
  let totalPazar = 0;
  let totalTatil = 0;
  let totalIzinli = 0;
  let totalHasta = 0;
  let totalGelmedi = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = getDateStr(selectedYear, selectedMonth, day);
    const entry = profile.dailyEntries?.[dateStr];
    if (entry) {
      if (entry.status === 'okudu') totalDers++;
      else if (entry.status === 'kaldi') totalKaldi++;
      else if (entry.status === 'pazar') totalPazar++;
      else if (entry.status === 'tatil') totalTatil++;
      else if (entry.status === 'izinli') totalIzinli++;
      else if (entry.status === 'hasta') totalHasta++;
      else if (entry.status === 'gelmedi') totalGelmedi++;
    } else {
      const d = new Date(selectedYear, selectedMonth - 1, day);
      if (d.getDay() === 0) totalPazar++;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-black text-xl text-gray-900 flex items-center gap-2.5">
            <CalendarIcon size={22} className="text-amber-600" />
            <span>Ezber Takip Çizelgesi (HETS Matrisi)</span>
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            Diyanet İşleri Başkanlığı HETS resmi aylık/yıllık ders çizelgesi görünümü
          </p>
        </div>

        {/* Year and Month Pickers */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-800 outline-none focus:border-amber-500 shadow-2xs"
          >
            {[2023, 2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y} Yılı</option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-800 outline-none focus:border-amber-500 shadow-2xs"
          >
            {months.map(m => (
              <option key={m.num} value={m.num}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-700 block">Ders Verilen</span>
          <span className="text-xl font-black text-emerald-900">{totalDers} Gün</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-rose-200 shadow-2xs">
          <span className="text-[11px] font-bold text-rose-700 block">Kaldı (K)</span>
          <span className="text-xl font-black text-rose-900">{totalKaldi} Gün</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
          <span className="text-[11px] font-bold text-gray-500 block">Pazar (P)</span>
          <span className="text-xl font-black text-gray-800">{totalPazar} Gün</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-purple-200 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-700 block">Tatil (T)</span>
          <span className="text-xl font-black text-purple-900">{totalTatil} Gün</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-700 block">İzinli (İ)</span>
          <span className="text-xl font-black text-amber-900">{totalIzinli} Gün</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-orange-200 shadow-2xs">
          <span className="text-[11px] font-bold text-orange-700 block">Hasta (H)</span>
          <span className="text-xl font-black text-orange-900">{totalHasta} Gün</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-700 block">Gelmedi (G)</span>
          <span className="text-xl font-black text-slate-900">{totalGelmedi} Gün</span>
        </div>
      </div>

      {/* Official HETS Matrix Table (As in Manual Page 4) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
            {selectedYear} • {months.find(m => m.num === selectedMonth)?.name} Ayı Çizelgesi
          </span>
          <span className="text-xs text-gray-400 font-semibold">
            Detay görmek veya dersi düzenlemek için gün kutucuğuna tıklayın
          </span>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full border-collapse border border-gray-200 text-center text-xs">
            <thead>
              <tr className="bg-gray-100 font-black text-gray-700">
                <th className="border border-gray-200 py-2.5 px-3 whitespace-nowrap">YIL</th>
                <th className="border border-gray-200 py-2.5 px-3 whitespace-nowrap">AY</th>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <th 
                    key={day} 
                    className={`border border-gray-200 py-2.5 px-1 min-w-[34px] ${
                      day > daysInMonth ? 'bg-gray-100/50 text-gray-300' : 'text-gray-800'
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Selected Month Row */}
              <tr className="hover:bg-amber-50/20 transition-colors">
                <td className="border border-gray-200 font-black text-gray-900 bg-gray-50 py-3 px-2">
                  {selectedYear}
                </td>
                <td className="border border-gray-200 font-black text-amber-900 bg-gray-50 py-3 px-2 whitespace-nowrap">
                  {selectedMonth} ({months.find(m => m.num === selectedMonth)?.name.substring(0, 3)})
                </td>

                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  if (day > daysInMonth) {
                    return (
                      <td key={day} className="border border-gray-200 bg-gray-100/40 text-gray-300">
                        -
                      </td>
                    );
                  }

                  const dateStr = getDateStr(selectedYear, selectedMonth, day);
                  const entry = profile.dailyEntries?.[dateStr];
                  const dObj = new Date(selectedYear, selectedMonth - 1, day);
                  const isSunday = dObj.getDay() === 0;

                  // Render cell content
                  let displayContent = '-';
                  let cellBg = 'bg-white text-gray-400';
                  let tooltip = `${dateStr}: Kayıt Yok`;

                  if (entry) {
                    if (entry.status === 'okudu') {
                      displayContent = entry.cuzNo ? `${entry.cuzNo}` : 'D';
                      cellBg = 'bg-emerald-600 text-white font-black hover:bg-emerald-700 shadow-2xs';
                      tooltip = `${dateStr}: ${entry.cuzNo}. Cüz (${entry.pageNo}. sayfa) okundu - Puan: ${entry.score || 90}`;
                    } else if (entry.status === 'kaldi') {
                      displayContent = 'K';
                      cellBg = 'bg-rose-600 text-white font-black hover:bg-rose-700';
                      tooltip = `${dateStr}: Dersten Kaldı`;
                    } else if (entry.status === 'pazar') {
                      displayContent = entry.cuzNo ? `${entry.cuzNo}` : 'P';
                      cellBg = 'bg-gray-200 text-gray-600 font-bold hover:bg-gray-300';
                      tooltip = `${dateStr}: Pazar Günü`;
                    } else if (entry.status === 'tatil') {
                      displayContent = 'T';
                      cellBg = 'bg-purple-600 text-white font-bold hover:bg-purple-700';
                      tooltip = `${dateStr}: Tatil`;
                    } else if (entry.status === 'izinli') {
                      displayContent = 'İ';
                      cellBg = 'bg-amber-500 text-white font-bold hover:bg-amber-600';
                      tooltip = `${dateStr}: İzinli`;
                    } else if (entry.status === 'hasta') {
                      displayContent = 'H';
                      cellBg = 'bg-orange-500 text-white font-bold hover:bg-orange-600';
                      tooltip = `${dateStr}: Hasta / Raporlu`;
                    } else if (entry.status === 'gelmedi') {
                      displayContent = 'G';
                      cellBg = 'bg-gray-800 text-white font-bold hover:bg-gray-900';
                      tooltip = `${dateStr}: Gelmedi (Devamsız)`;
                    } else if (entry.status === 'kayitsiz_sure') {
                      displayContent = 'KS';
                      cellBg = 'bg-slate-500 text-white font-bold';
                      tooltip = `${dateStr}: Kayıtsız Süre`;
                    }
                  } else if (isSunday) {
                    displayContent = 'P';
                    cellBg = 'bg-gray-100 text-gray-400 font-bold';
                    tooltip = `${dateStr}: Pazar`;
                  }

                  return (
                    <td
                      key={day}
                      onClick={() => setActiveCellDetail({ date: dateStr, entry })}
                      title={tooltip}
                      className={`border border-gray-200 py-3 px-1 cursor-pointer transition-transform hover:scale-105 ${cellBg}`}
                    >
                      <span className="text-xs leading-none">{displayContent}</span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend (HETS Kılavuzu Açıklaması) */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-500">HETS Kodları:</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">29</span> Cüz No (Ders Verdi)</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold">K</span> Kaldı</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-gray-300 text-gray-700 text-[9px] flex items-center justify-center font-bold">P</span> Pazar</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-purple-600 text-white text-[9px] flex items-center justify-center font-bold">T</span> Tatil</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-amber-500 text-white text-[9px] flex items-center justify-center font-bold">İ</span> İzinli</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">H</span> Hasta</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-gray-800 text-white text-[9px] flex items-center justify-center font-bold">G</span> Gelmedi</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-slate-500 text-white text-[9px] flex items-center justify-center font-bold">KS</span> Kayıtsız Süre</span>
          </div>

          <div className="text-gray-400 font-medium">
            (HETS 30 Cüz Dönüşlü Klasik Takip Modeli)
          </div>
        </div>
      </div>

      {/* Cell Detail Modal */}
      {activeCellDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-lg text-gray-900">{activeCellDetail.date}</h3>
                <span className="text-xs text-gray-400 font-semibold">Günlük Ders Kayıt Detayı</span>
              </div>
              <button
                onClick={() => setActiveCellDetail(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {activeCellDetail.entry ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-bold">Durum:</span>
                  <span className={`font-black px-2 py-0.5 rounded-lg border ${getStatusBadge(activeCellDetail.entry.status).bg}`}>
                    {getStatusBadge(activeCellDetail.entry.status).label}
                  </span>
                </div>

                {activeCellDetail.entry.cuzNo && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Okunan Cüz:</span>
                    <span className="font-black text-gray-900">{activeCellDetail.entry.cuzNo}. Cüz ({activeCellDetail.entry.pageNo}. Sayfa)</span>
                  </div>
                )}

                {activeCellDetail.entry.hasCuzRange && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Has (Tekrar):</span>
                    <span className="font-bold text-emerald-700">{activeCellDetail.entry.hasCuzRange}</span>
                  </div>
                )}

                {activeCellDetail.entry.score !== undefined && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Puan:</span>
                    <span className="font-black text-amber-700">{activeCellDetail.entry.score} / 100</span>
                  </div>
                )}

                {activeCellDetail.entry.mistakeCount !== undefined && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Hata / Takılma:</span>
                    <span className="font-bold text-gray-900">{activeCellDetail.entry.mistakeCount} adet</span>
                  </div>
                )}

                {activeCellDetail.entry.teacherNote && (
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs">
                    <strong>Hoca Notu:</strong> {activeCellDetail.entry.teacherNote}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 font-semibold text-xs">
                Bu tarihe henüz ders veya devamsızlık girişi yapılmamış.
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              {onSelectDateToEdit && (
                <button
                  onClick={() => {
                    onSelectDateToEdit(activeCellDetail.date);
                    setActiveCellDetail(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
                >
                  Bu Günü Düzenle
                </button>
              )}
              <button
                onClick={() => setActiveCellDetail(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
