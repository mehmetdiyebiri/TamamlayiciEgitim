import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Award, 
  ListFilter, 
  Users, 
  Trash2,
  Bookmark
} from 'lucide-react';
import { RahleStudentProfile, RahleDailyEntry, RahleDailyStatus } from '../../types/rahle';
import { getStatusBadge } from '../../utils/rahleData';

interface RahleDailyEntryProps {
  profile: RahleStudentProfile;
  allProfiles: Record<string, RahleStudentProfile>;
  selectedClass: string | null;
  onSaveDailyEntry: (studentKey: string, entry: RahleDailyEntry) => void;
  onSaveBulkEntries: (entries: Record<string, RahleDailyEntry>) => void;
  onDeleteDailyEntry: (dateStr: string) => void;
  studentsInClass: string[];
}

export const RahleDailyEntryPanel: React.FC<RahleDailyEntryProps> = ({
  profile,
  allProfiles,
  selectedClass,
  onSaveDailyEntry,
  onSaveBulkEntries,
  onDeleteDailyEntry,
  studentsInClass = []
}) => {
  const [mode, setMode] = useState<'individual' | 'bulk'>('individual');
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Current entry for the selected date if exists
  const existingEntry = profile.dailyEntries?.[selectedDate];

  // Individual Form State
  const [status, setStatus] = useState<RahleDailyStatus>(existingEntry?.status || 'okudu');
  const [cuzNo, setCuzNo] = useState<number>(existingEntry?.cuzNo || 1);
  const [pageNo, setPageNo] = useState<number>(existingEntry?.pageNo || (20 - (profile.kacinciDonuste - 1)));
  const [pageCount, setPageCount] = useState<number>(existingEntry?.pageCount || profile.kacSayfaylaGidiyor || 1);
  const [hamCuz, setHamCuz] = useState<number>(existingEntry?.hamCuz || cuzNo);
  const [hamPage, setHamPage] = useState<number>(existingEntry?.hamPage || pageNo);
  const [hasCuzRange, setHasCuzRange] = useState<string>(existingEntry?.hasCuzRange || `${Math.max(1, cuzNo - 4)}. - ${cuzNo}. Cüz Has`);
  const [mistakeCount, setMistakeCount] = useState<number>(existingEntry?.mistakeCount || 0);
  const [score, setScore] = useState<number>(existingEntry?.score || 90);
  const [teacherNote, setTeacherNote] = useState<string>(existingEntry?.teacherNote || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state when date changes or existing entry changes
  React.useEffect(() => {
    const entry = profile.dailyEntries?.[selectedDate];
    if (entry) {
      setStatus(entry.status);
      setCuzNo(entry.cuzNo || 1);
      setPageNo(entry.pageNo || 20);
      setPageCount(entry.pageCount || 1);
      setHamCuz(entry.hamCuz || entry.cuzNo || 1);
      setHamPage(entry.hamPage || entry.pageNo || 20);
      setHasCuzRange(entry.hasCuzRange || '');
      setMistakeCount(entry.mistakeCount || 0);
      setScore(entry.score || 90);
      setTeacherNote(entry.teacherNote || '');
    } else {
      // Default to okudu or pazar
      const d = new Date(selectedDate);
      if (d.getDay() === 0) {
        setStatus('pazar');
      } else {
        setStatus('okudu');
      }
      setTeacherNote('');
      setMistakeCount(0);
      setScore(90);
    }
  }, [selectedDate, profile]);

  // Bulk entry state for all students in class
  const [bulkList, setBulkList] = useState<Record<string, {
    status: RahleDailyStatus;
    cuzNo: number;
    pageNo: number;
    score: number;
    mistakeCount: number;
    note: string;
  }>>({});

  // Initialize bulk list when entering bulk mode or changing date
  React.useEffect(() => {
    if (mode === 'bulk') {
      const initial: Record<string, any> = {};
      studentsInClass.forEach(stuName => {
        const sKey = `${selectedClass || 'Genel'}_${stuName}`;
        const sProf = allProfiles[sKey];
        const prev = sProf?.dailyEntries?.[selectedDate];
        const isSun = new Date(selectedDate).getDay() === 0;

        initial[stuName] = {
          status: prev?.status || (isSun ? 'pazar' : 'okudu'),
          cuzNo: prev?.cuzNo || 1,
          pageNo: prev?.pageNo || 20,
          score: prev?.score || 90,
          mistakeCount: prev?.mistakeCount || 0,
          note: prev?.teacherNote || ''
        };
      });
      setBulkList(initial);
    }
  }, [mode, selectedDate, selectedClass, studentsInClass, allProfiles]);

  // Navigate date
  const changeDateByDays = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // Save Individual Entry
  const handleSaveIndividual = (e: React.FormEvent, proceedToNext: boolean = false) => {
    e.preventDefault();
    const studentKey = `${profile.className || 'Genel'}_${profile.studentName}`;
    const newEntry: RahleDailyEntry = {
      id: `entry_${selectedDate}`,
      date: selectedDate,
      status,
      donusNo: profile.kacinciDonuste,
      cuzNo: status === 'okudu' || status === 'kaldi' ? cuzNo : undefined,
      pageNo: status === 'okudu' || status === 'kaldi' ? pageNo : undefined,
      pageCount: status === 'okudu' ? pageCount : undefined,
      hamCuz: status === 'okudu' ? hamCuz : undefined,
      hamPage: status === 'okudu' ? hamPage : undefined,
      hasCuzRange: status === 'okudu' ? hasCuzRange : undefined,
      mistakeCount: status === 'okudu' || status === 'kaldi' ? mistakeCount : undefined,
      score: status === 'okudu' ? score : undefined,
      teacherNote: teacherNote.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    onSaveDailyEntry(studentKey, newEntry);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    if (proceedToNext) {
      changeDateByDays(1);
    }
  };

  // Save Bulk Entries
  const handleSaveBulk = () => {
    const entriesToSave: Record<string, RahleDailyEntry> = {};
    Object.entries(bulkList).forEach(([stuName, data]) => {
      const sKey = `${selectedClass || 'Genel'}_${stuName}`;
      entriesToSave[sKey] = {
        id: `entry_${selectedDate}`,
        date: selectedDate,
        status: data.status,
        donusNo: allProfiles[sKey]?.kacinciDonuste || 1,
        cuzNo: data.status === 'okudu' || data.status === 'kaldi' ? data.cuzNo : undefined,
        pageNo: data.status === 'okudu' || data.status === 'kaldi' ? data.pageNo : undefined,
        score: data.status === 'okudu' ? data.score : undefined,
        mistakeCount: data.mistakeCount,
        teacherNote: data.note || undefined,
        createdAt: new Date().toISOString()
      };
    });

    onSaveBulkEntries(entriesToSave);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Check 7-day backward limit
  const daysDiff = Math.round((new Date(todayStr).getTime() - new Date(selectedDate).getTime()) / (1000 * 60 * 60 * 24));
  const canDelete = daysDiff <= 7 && daysDiff >= 0 && !!existingEntry;

  return (
    <div className="space-y-6">
      {/* Top Controls: Mode Switcher & Date Navigation */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setMode('individual')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'individual' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bookmark size={15} /> Bireysel Giriş ({profile.studentName})
          </button>
          <button
            onClick={() => setMode('bulk')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'bulk' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users size={15} /> Toplu Sınıf Girişi ({selectedClass?.replace('_', '') || 'Sınıf'})
          </button>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => changeDateByDays(-1)}
            className="w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
            title="Önceki Gün"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 font-bold text-xs text-gray-800 outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
            />
          </div>

          <button
            onClick={() => changeDateByDays(1)}
            className="w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
            title="Sonraki Gün"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setSelectedDate(todayStr)}
            className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Bugün
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>Ders kaydı başarıyla kaydedildi!</span>
        </div>
      )}

      {/* INDIVIDUAL ENTRY FORM */}
      {mode === 'individual' ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-black text-xl text-gray-900 flex items-center gap-2.5">
                <span>Günlük Ders Girişi</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                  {selectedDate}
                </span>
              </h2>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">
                HETS Kılavuzu uyarınca günlük öğrenci ders ve mazeret girişi
              </p>
            </div>

            {existingEntry && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">Kayıtlı Durum:</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${getStatusBadge(existingEntry.status).bg}`}>
                  {getStatusBadge(existingEntry.status).label}
                  {existingEntry.cuzNo ? ` (${existingEntry.cuzNo}. Cüz)` : ''}
                </span>
                {canDelete && (
                  <button
                    onClick={() => onDeleteDailyEntry(selectedDate)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer ml-2"
                    title="Bu günün kaydını sil (En fazla 7 gün geriye silinebilir)"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            )}
          </div>

          <form onSubmit={(e) => handleSaveIndividual(e, false)} className="space-y-6">
            {/* 1. HETS Status Selector Buttons */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-600 mb-2.5">
                Ders / Devamsızlık Durumu *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {[
                  { id: 'okudu', label: 'Cüz / Sayfa', short: 'Okudu', icon: CheckCircle2, color: 'hover:border-emerald-500 hover:text-emerald-700', active: 'bg-emerald-600 text-white shadow-emerald-600/30' },
                  { id: 'kaldi', label: 'Kaldı', short: '(K)', icon: XCircle, color: 'hover:border-rose-500 hover:text-rose-700', active: 'bg-rose-600 text-white shadow-rose-600/30' },
                  { id: 'tatil', label: 'Tatil', short: '(T)', icon: Calendar, color: 'hover:border-purple-500 hover:text-purple-700', active: 'bg-purple-600 text-white shadow-purple-600/30' },
                  { id: 'izinli', label: 'İzinli', short: '(İ)', icon: Clock, color: 'hover:border-amber-500 hover:text-amber-700', active: 'bg-amber-600 text-white shadow-amber-600/30' },
                  { id: 'hasta', label: 'Hasta', short: '(H)', icon: AlertCircle, color: 'hover:border-orange-500 hover:text-orange-700', active: 'bg-orange-600 text-white shadow-orange-600/30' },
                  { id: 'gelmedi', label: 'Gelmedi', short: '(G)', icon: Users, color: 'hover:border-gray-500 hover:text-gray-800', active: 'bg-gray-700 text-white shadow-gray-700/30' },
                  { id: 'pazar', label: 'Pazar', short: '(P)', icon: Calendar, color: 'hover:border-gray-400', active: 'bg-gray-500 text-white' },
                  { id: 'kayitsiz_sure', label: 'Kayıtsız Süre', short: '(KS)', icon: Bookmark, color: 'hover:border-slate-500', active: 'bg-slate-700 text-white' }
                ].map(item => {
                  const isSelected = status === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setStatus(item.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 shadow-2xs ${
                        isSelected 
                          ? `${item.active} border-transparent font-black shadow-md scale-102` 
                          : `border-gray-200 text-gray-700 bg-white font-bold ${item.color}`
                      }`}
                    >
                      <span className="text-xs leading-none">{item.label}</span>
                      <span className="text-[10px] opacity-75 font-black">{item.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Lesson Details (Shown when 'okudu' or 'kaldi') */}
            {(status === 'okudu' || status === 'kaldi') && (
              <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                  <BookOpen size={16} />
                  <span>Ders Detayları (Ham &amp; Has)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Cüz No */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Okunan Cüz No (1 - 30) *
                    </label>
                    <select
                      value={cuzNo}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setCuzNo(val);
                        setHamCuz(val);
                        setHasCuzRange(`${Math.max(1, val - 4)}. - ${val}. Cüz Has`);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-800 outline-none focus:border-amber-500"
                    >
                      {Array.from({ length: 30 }, (_, i) => i + 1).map(c => (
                        <option key={c} value={c}>{c}. Cüz</option>
                      ))}
                    </select>
                  </div>

                  {/* Sayfa No */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Sayfa No (1 - 20) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={pageNo}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setPageNo(val);
                        setHamPage(val);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-800 outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Kaç Sayfa Okundu */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Okunan Sayfa Sayısı
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={pageCount}
                      onChange={(e) => setPageCount(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-800 outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Has Tekrar Aralığı */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Has (Tekrar) Aralığı
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 1-3. Cüzler Has"
                      value={hasCuzRange}
                      onChange={(e) => setHasCuzRange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-800 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Score & Mistakes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-200/50">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Takılma / Hata Sayısı
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={mistakeCount}
                        onChange={(e) => setMistakeCount(parseInt(e.target.value) || 0)}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-bold text-gray-800 outline-none focus:border-amber-500"
                      />
                      <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                        {mistakeCount === 0 ? '✨ Hatasız' : `${mistakeCount} Hata`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Değerlendirme Puanı (1 - 100)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={score}
                        onChange={(e) => setScore(parseInt(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                      <span className="text-sm font-black px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 shrink-0">
                        {score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Teacher Note */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Öğretici Açıklaması / Değerlendirme Notu
              </label>
              <input
                type="text"
                placeholder="Örn: Mahreçler güzeldi, has tekrarına biraz daha özen gösterilmeli..."
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-gray-900 hover:bg-black text-white font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Save size={16} /> Bu Günü Kaydet
              </button>

              <button
                type="button"
                onClick={(e) => handleSaveIndividual(e, true)}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Kaydet ve Sonraki Güne Geç →
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* BULK CLASS ENTRY TABLE (Hafız Akademi formatı) */
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
            <div>
              <h2 className="font-black text-xl text-gray-900 flex items-center gap-2">
                <span>Toplu Sınıf Ders Girişi</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                  {selectedClass?.replace('_', '')} • {selectedDate}
                </span>
              </h2>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">
                Tüm hafızlık öğrencilerinin günlük derslerini tek ekranda hızlıca girin ve kaydedin.
              </p>
            </div>

            <button
              onClick={handleSaveBulk}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-colors shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Save size={16} /> Tüm Sınıfı Kaydet
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-black text-[11px] border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Öğrenci</th>
                  <th className="py-3 px-3">Durum</th>
                  <th className="py-3 px-3">Okunan Cüz</th>
                  <th className="py-3 px-3">Sayfa</th>
                  <th className="py-3 px-3">Puan</th>
                  <th className="py-3 px-3">Hata</th>
                  <th className="py-3 px-4">Hoca Notu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                {studentsInClass.map((stuName) => {
                  const row = bulkList[stuName] || {
                    status: 'okudu',
                    cuzNo: 1,
                    pageNo: 20,
                    score: 90,
                    mistakeCount: 0,
                    note: ''
                  };

                  return (
                    <tr key={stuName} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3 px-4 font-black text-gray-900 whitespace-nowrap">
                        {stuName}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={row.status}
                          onChange={(e) => setBulkList({
                            ...bulkList,
                            [stuName]: { ...row, status: e.target.value as any }
                          })}
                          className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-bold text-xs"
                        >
                          <option value="okudu">Okudu (Ders)</option>
                          <option value="kaldi">Kaldı (K)</option>
                          <option value="izinli">İzinli (İ)</option>
                          <option value="hasta">Hasta (H)</option>
                          <option value="gelmedi">Gelmedi (G)</option>
                          <option value="tatil">Tatil (T)</option>
                          <option value="pazar">Pazar (P)</option>
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          disabled={row.status !== 'okudu' && row.status !== 'kaldi'}
                          value={row.cuzNo}
                          onChange={(e) => setBulkList({
                            ...bulkList,
                            [stuName]: { ...row, cuzNo: parseInt(e.target.value) || 1 }
                          })}
                          className="px-2 py-1.5 rounded-lg border border-gray-200 bg-white font-bold text-xs disabled:opacity-40"
                        >
                          {Array.from({ length: 30 }, (_, i) => i + 1).map(c => (
                            <option key={c} value={c}>{c}. Cüz</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          disabled={row.status !== 'okudu' && row.status !== 'kaldi'}
                          value={row.pageNo}
                          onChange={(e) => setBulkList({
                            ...bulkList,
                            [stuName]: { ...row, pageNo: parseInt(e.target.value) || 20 }
                          })}
                          className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 font-bold text-xs disabled:opacity-40"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          min="50"
                          max="100"
                          disabled={row.status !== 'okudu'}
                          value={row.score}
                          onChange={(e) => setBulkList({
                            ...bulkList,
                            [stuName]: { ...row, score: parseInt(e.target.value) || 90 }
                          })}
                          className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 font-bold text-xs disabled:opacity-40 text-center"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={row.mistakeCount}
                          onChange={(e) => setBulkList({
                            ...bulkList,
                            [stuName]: { ...row, mistakeCount: parseInt(e.target.value) || 0 }
                          })}
                          className="w-14 px-2 py-1.5 rounded-lg border border-gray-200 font-bold text-xs text-center"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Kısa not..."
                          value={row.note}
                          onChange={(e) => setBulkList({
                            ...bulkList,
                            [stuName]: { ...row, note: e.target.value }
                          })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 font-medium text-xs"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              onClick={handleSaveBulk}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-colors shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer"
            >
              <Save size={16} /> Tüm Sınıfı Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
