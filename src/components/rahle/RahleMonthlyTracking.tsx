import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Award, 
  Users, 
  Bookmark, 
  Layers, 
  Filter, 
  CalendarDays, 
  FileSpreadsheet, 
  Check, 
  X, 
  Printer, 
  Zap,
  Info,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { RahleStudentProfile, RahleDailyEntry, RahleDailyStatus } from '../../types/rahle';
import { getStatusBadge } from '../../utils/rahleData';

interface RahleMonthlyTrackingProps {
  profile: RahleStudentProfile;
  allProfiles: Record<string, RahleStudentProfile>;
  selectedClass: string | null;
  onSaveDailyEntry: (studentKey: string, entry: RahleDailyEntry) => void;
  onSaveMultipleEntries?: (studentKey: string, entries: RahleDailyEntry[]) => void;
  onSaveBulkEntries: (entries: Record<string, RahleDailyEntry>) => void;
  onDeleteDailyEntry: (dateStr: string) => void;
  studentsInClass: string[];
  onSelectStudent?: (student: string) => void;
  onSelectClass?: (className: string) => void;
  classes?: Record<string, string[]>;
  isStudent?: boolean;
}

// Day of week info in Turkish (0: Sunday, 1: Monday, ... 6: Saturday)
const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const SHORT_DAY_NAMES = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const MONTHS = [
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

export type RahleScoreLevel = 'zayif' | 'orta' | 'iyi';

const getScoreLevelFromScore = (score?: number, scoreLevel?: RahleScoreLevel): RahleScoreLevel => {
  if (scoreLevel) return scoreLevel;
  const s = score ?? 95;
  if (s < 65) return 'zayif';
  if (s < 85) return 'orta';
  return 'iyi';
};

const getScoreFromLevel = (level: RahleScoreLevel): number => {
  if (level === 'zayif') return 50;
  if (level === 'orta') return 75;
  return 95;
};

const getScoreLevelMeta = (level: RahleScoreLevel) => {
  if (level === 'zayif') {
    return { label: 'ZAYIF', textClass: 'text-rose-600', activeClass: 'bg-rose-600 text-white border-rose-600 shadow-xs', idleClass: 'bg-rose-50/60 text-rose-600 border-rose-200 hover:bg-rose-100/70' };
  }
  if (level === 'orta') {
    return { label: 'ORTA', textClass: 'text-amber-500', activeClass: 'bg-amber-500 text-white border-amber-500 shadow-xs', idleClass: 'bg-amber-50/60 text-amber-600 border-amber-200 hover:bg-amber-100/70' };
  }
  return { label: 'İYİ', textClass: 'text-emerald-600', activeClass: 'bg-emerald-600 text-white border-emerald-600 shadow-xs', idleClass: 'bg-emerald-50/60 text-emerald-600 border-emerald-200 hover:bg-emerald-100/70' };
};

export interface WeekDayDraft {
  date: string; // YYYY-MM-DD
  dayName: string;
  dayNumber: number; // 1-31
  isSunday: boolean;
  status: RahleDailyStatus;
  cuzNo: number;
  pageNo: number;
  pageCount: number;
  hasCuzRange: string;
  score: number;
  scoreLevel: RahleScoreLevel;
  mistakeCount: number;
  mistakeNotes: string;
  teacherNote: string;
  isSavedInDb: boolean;
  isModified: boolean;
}

export const RahleMonthlyTracking: React.FC<RahleMonthlyTrackingProps> = ({
  profile,
  allProfiles,
  selectedClass,
  onSaveDailyEntry,
  onSaveMultipleEntries,
  onSaveBulkEntries,
  onDeleteDailyEntry,
  studentsInClass = [],
  onSelectStudent,
  onSelectClass,
  classes = {},
  isStudent = false
}) => {
  const currentDate = new Date();
  const todayStr = currentDate.toISOString().split('T')[0];

  // View Mode: 'all' (Tümleşik), 'weekly' (Haftalık Ders Girişi), 'monthly' (Aylık HETS Çizelgesi), 'class_bulk' (Sınıf Haftalık)
  const [viewMode, setViewMode] = useState<'all' | 'weekly' | 'monthly' | 'class_bulk'>('all');

  // Month & Year State
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);

  // Selected Week Index (0..4/5)
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);

  // Active cell detail modal for monthly matrix
  const [activeCellDetail, setActiveCellDetail] = useState<{ date: string; entry?: RahleDailyEntry } | null>(null);

  // Success save toast
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Helper: Format Date YYYY-MM-DD
  const formatDateStr = (y: number, m: number, d: number) => {
    return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
  };

  // Days in selected month
  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth, 0).getDate();
  }, [selectedYear, selectedMonth]);

  // Compute weeks of the selected month
  // A week groups 7 days starting from Monday or beginning of month
  const monthWeeks = useMemo(() => {
    const weeks: { index: number; label: string; startDate: string; endDate: string; dates: string[] }[] = [];
    
    // Divide days into chunks of 7 days (or calendar Monday-to-Sunday weeks)
    let currentChunk: string[] = [];
    let weekCounter = 1;

    for (let day = 1; day <= daysInMonth; day++) {
      const dStr = formatDateStr(selectedYear, selectedMonth, day);
      currentChunk.push(dStr);

      const dObj = new Date(selectedYear, selectedMonth - 1, day);
      const isSunday = dObj.getDay() === 0;

      // Cut at Sunday or end of month
      if (isSunday || day === daysInMonth || currentChunk.length >= 7) {
        const startDay = new Date(currentChunk[0]).getDate();
        const endDay = new Date(currentChunk[currentChunk.length - 1]).getDate();
        const monthName = MONTHS.find(m => m.num === selectedMonth)?.name || '';

        weeks.push({
          index: weekCounter - 1,
          label: `${weekCounter}. Hafta (${startDay} - ${endDay} ${monthName})`,
          startDate: currentChunk[0],
          endDate: currentChunk[currentChunk.length - 1],
          dates: [...currentChunk]
        });

        currentChunk = [];
        weekCounter++;
      }
    }

    return weeks;
  }, [selectedYear, selectedMonth, daysInMonth]);

  // Auto-select week that contains today if in current month/year
  useEffect(() => {
    const todayWeekIdx = monthWeeks.findIndex(w => w.dates.includes(todayStr));
    if (todayWeekIdx !== -1) {
      setSelectedWeekIndex(todayWeekIdx);
    } else {
      setSelectedWeekIndex(0);
    }
  }, [selectedYear, selectedMonth, monthWeeks, todayStr]);

  // Active week object
  const activeWeek = monthWeeks[selectedWeekIndex] || monthWeeks[0] || {
    index: 0,
    label: '1. Hafta',
    startDate: formatDateStr(selectedYear, selectedMonth, 1),
    endDate: formatDateStr(selectedYear, selectedMonth, Math.min(7, daysInMonth)),
    dates: []
  };

  // Draft state for each day in active week
  const [weekDrafts, setWeekDrafts] = useState<Record<string, WeekDayDraft>>({});

  // Sync draft data when active week or profile changes
  useEffect(() => {
    if (!activeWeek || !activeWeek.dates.length) return;

    const drafts: Record<string, WeekDayDraft> = {};
    activeWeek.dates.forEach(dStr => {
      const entry = profile.dailyEntries?.[dStr];
      const dObj = new Date(dStr + 'T12:00:00');
      const isSunday = dObj.getDay() === 0;
      const dayName = DAY_NAMES[dObj.getDay()];
      const dayNum = dObj.getDate();

      if (entry) {
        const resolvedLevel = getScoreLevelFromScore(entry.score, entry.scoreLevel);
        drafts[dStr] = {
          date: dStr,
          dayName,
          dayNumber: dayNum,
          isSunday,
          status: entry.status,
          cuzNo: entry.cuzNo || 1,
          pageNo: entry.pageNo || 20,
          pageCount: entry.pageCount || profile.kacSayfaylaGidiyor || 1,
          hasCuzRange: entry.hasCuzRange || (entry.cuzNo ? `${Math.max(1, entry.cuzNo - 4)}. - ${entry.cuzNo}. Cüz Has` : ''),
          score: entry.score ?? getScoreFromLevel(resolvedLevel),
          scoreLevel: resolvedLevel,
          mistakeCount: entry.mistakeCount ?? 0,
          mistakeNotes: entry.mistakeNotes || '',
          teacherNote: entry.teacherNote || '',
          isSavedInDb: true,
          isModified: false
        };
      } else {
        // Defaults: Sunday -> 'pazar', weekdays -> 'okudu'
        const defStatus: RahleDailyStatus = isSunday ? 'pazar' : 'okudu';
        const defPage = 20 - ((profile.kacinciDonuste || 1) - 1);
        const defCuz = 1;

        drafts[dStr] = {
          date: dStr,
          dayName,
          dayNumber: dayNum,
          isSunday,
          status: defStatus,
          cuzNo: defCuz,
          pageNo: Math.max(1, Math.min(20, defPage)),
          pageCount: profile.kacSayfaylaGidiyor || 1,
          hasCuzRange: `${Math.max(1, defCuz - 4)}. - ${defCuz}. Cüz Has`,
          score: 95,
          scoreLevel: 'iyi',
          mistakeCount: 0,
          mistakeNotes: '',
          teacherNote: '',
          isSavedInDb: false,
          isModified: false
        };
      }
    });

    setWeekDrafts(drafts);
  }, [activeWeek, profile]);

  // Update a field in the draft for a specific date
  const updateDraftField = (dStr: string, fields: Partial<WeekDayDraft>) => {
    setWeekDrafts(prev => {
      const current = prev[dStr];
      if (!current) return prev;
      return {
        ...prev,
        [dStr]: {
          ...current,
          ...fields,
          isModified: true
        }
      };
    });
  };

  // Helper to build a clean RahleDailyEntry from a draft without undefined fields
  const buildCleanEntryFromDraft = (draft: WeekDayDraft): RahleDailyEntry => {
    const isLessonStatus = draft.status === 'okudu' || draft.status === 'kaldi';
    const entry: RahleDailyEntry = {
      id: `entry_${draft.date}`,
      date: draft.date,
      status: draft.status,
      donusNo: profile.kacinciDonuste || 1,
      createdAt: new Date().toISOString()
    };

    if (isLessonStatus) {
      entry.cuzNo = draft.cuzNo;
      entry.pageNo = draft.pageNo;
      entry.mistakeCount = draft.mistakeCount;
      entry.score = draft.score;
      entry.scoreLevel = draft.scoreLevel;
      if (draft.mistakeNotes.trim()) {
        entry.mistakeNotes = draft.mistakeNotes.trim();
      }
    }

    if (draft.status === 'okudu') {
      entry.pageCount = draft.pageCount;
      entry.hamCuz = draft.cuzNo;
      entry.hamPage = draft.pageNo;
      if (draft.hasCuzRange.trim()) {
        entry.hasCuzRange = draft.hasCuzRange.trim();
      }
    }

    if (draft.teacherNote.trim()) {
      entry.teacherNote = draft.teacherNote.trim();
    }

    return entry;
  };

  // Save a single day's entry
  const handleSaveSingleDay = (dStr: string) => {
    const draft = weekDrafts[dStr];
    if (!draft) return;

    const effectiveClass = selectedClass || profile.className || 'Hafızlık Havuzu';
    const studentKey = `${effectiveClass}_${profile.studentName}`;
    const newEntry = buildCleanEntryFromDraft(draft);

    onSaveDailyEntry(studentKey, newEntry);
    setWeekDrafts(prev => ({
      ...prev,
      [dStr]: { ...draft, isSavedInDb: true, isModified: false }
    }));

    setSaveSuccessMsg(`${draft.dayName} (${dStr}) tarihli ders kaydı başarıyla kaydedildi ve listeye eklendi.`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Save ALL days of the active week in one click
  const handleSaveAllWeek = () => {
    const effectiveClass = selectedClass || profile.className || 'Hafızlık Havuzu';
    const studentKey = `${effectiveClass}_${profile.studentName}`;
    const entriesToSave: RahleDailyEntry[] = [];

    Object.values(weekDrafts).forEach(draft => {
      entriesToSave.push(buildCleanEntryFromDraft(draft));
    });

    if (onSaveMultipleEntries) {
      onSaveMultipleEntries(studentKey, entriesToSave);
    } else {
      // Fallback: save one by one
      entriesToSave.forEach(e => onSaveDailyEntry(studentKey, e));
    }

    // Mark all as saved
    setWeekDrafts(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(k => {
        updated[k] = { ...updated[k], isSavedInDb: true, isModified: false };
      });
      return updated;
    });

    setSaveSuccessMsg(`${activeWeek.label} için tüm haftalık ders verileri (${entriesToSave.length} gün) başarıyla kaydedildi!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Auto Fill Week (Smart batch autofill following student's pace)
  const handleAutoFillWeek = () => {
    setWeekDrafts(prev => {
      const updated = { ...prev };
      let curCuz = 1;
      let curPage = 20 - ((profile.kacinciDonuste || 1) - 1);

      // Find the last known cuz/page before this week if available
      const sortedKeys = Object.keys(updated).sort();
      sortedKeys.forEach(dStr => {
        const item = updated[dStr];
        if (item.isSunday) {
          updated[dStr] = {
            ...item,
            status: 'pazar',
            isModified: true
          };
        } else {
          updated[dStr] = {
            ...item,
            status: 'okudu',
            cuzNo: curCuz,
            pageNo: Math.max(1, Math.min(20, curPage)),
            score: 95,
            scoreLevel: 'iyi',
            mistakeCount: 0,
            hasCuzRange: `${Math.max(1, curCuz - 4)}. - ${curCuz}. Cüz Has`,
            isModified: true
          };
          // Increment cuz for next day
          curCuz = curCuz >= 30 ? 1 : curCuz + 1;
        }
      });
      return updated;
    });

    setSaveSuccessMsg('Haftalık dersler öğrencinin usulüne göre otomatik dolduruldu. Değişiklikleri kaydetmek için "Haftalık Verileri Kaydet" düğmesine basınız.');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Auto Mark Sunday as Pazar
  const handleMarkSunday = () => {
    setWeekDrafts(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(dStr => {
        if (updated[dStr].isSunday) {
          updated[dStr] = { ...updated[dStr], status: 'pazar', isModified: true };
        }
      });
      return updated;
    });
  };

  // Monthly stats calculations
  const monthlyStats = useMemo(() => {
    let ders = 0;
    let kaldi = 0;
    let pazar = 0;
    let tatil = 0;
    let izinli = 0;
    let hasta = 0;
    let gelmedi = 0;
    let totalScore = 0;
    let scoreCount = 0;
    let totalMistakes = 0;
    let totalPagesRead = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dStr = formatDateStr(selectedYear, selectedMonth, day);
      const entry = profile.dailyEntries?.[dStr];
      if (entry) {
        if (entry.status === 'okudu') {
          ders++;
          totalPagesRead += entry.pageCount || 1;
          if (entry.score !== undefined) {
            totalScore += entry.score;
            scoreCount++;
          }
          if (entry.mistakeCount) {
            totalMistakes += entry.mistakeCount;
          }
        } else if (entry.status === 'kaldi') {
          kaldi++;
          if (entry.mistakeCount) totalMistakes += entry.mistakeCount;
        } else if (entry.status === 'pazar') pazar++;
        else if (entry.status === 'tatil') tatil++;
        else if (entry.status === 'izinli') izinli++;
        else if (entry.status === 'hasta') hasta++;
        else if (entry.status === 'gelmedi') gelmedi++;
      } else {
        const d = new Date(selectedYear, selectedMonth - 1, day);
        if (d.getDay() === 0) pazar++;
      }
    }

    const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;

    return {
      ders,
      kaldi,
      pazar,
      tatil,
      izinli,
      hasta,
      gelmedi,
      avgScore,
      totalMistakes,
      totalPagesRead,
      totalEntries: ders + kaldi + tatil + izinli + hasta + gelmedi
    };
  }, [selectedYear, selectedMonth, daysInMonth, profile]);

  // Weekly Stats for active week
  const weeklyStats = useMemo(() => {
    let ders = 0;
    let kaldi = 0;
    let pages = 0;
    let scoreSum = 0;
    let scoreCnt = 0;
    let mistakes = 0;

    if (isStudent) {
      activeWeek.dates.forEach(dStr => {
        const entry = profile.dailyEntries?.[dStr];
        if (!entry) return;
        if (entry.status === 'okudu') {
          ders++;
          pages += entry.pageCount || 1;
          if (entry.score !== undefined) {
            scoreSum += entry.score;
            scoreCnt++;
          }
          mistakes += entry.mistakeCount || 0;
        } else if (entry.status === 'kaldi') {
          kaldi++;
          mistakes += entry.mistakeCount || 0;
        }
      });
    } else {
      Object.values(weekDrafts).forEach(d => {
        if (d.status === 'okudu') {
          ders++;
          pages += d.pageCount || 1;
          scoreSum += d.score;
          scoreCnt++;
          mistakes += d.mistakeCount || 0;
        } else if (d.status === 'kaldi') {
          kaldi++;
          mistakes += d.mistakeCount || 0;
        }
      });
    }

    const avg = scoreCnt > 0 ? Math.round(scoreSum / scoreCnt) : 0;
    return { ders, kaldi, pages, avg, mistakes };
  }, [weekDrafts, isStudent, activeWeek, profile.dailyEntries]);

  // Class bulk weekly entries state
  const [classBulkMap, setClassBulkMap] = useState<Record<string, Record<string, {
    status: RahleDailyStatus;
    cuzNo: number;
    pageNo: number;
    score: number;
  }>>>({});

  // Initialize class bulk map when active week changes
  useEffect(() => {
    const map: Record<string, any> = {};
    studentsInClass.forEach(stuName => {
      const sKey = `${selectedClass || 'Genel'}_${stuName}`;
      const sProf = allProfiles[sKey];
      map[stuName] = {};

      activeWeek.dates.forEach(dStr => {
        const entry = sProf?.dailyEntries?.[dStr];
        const isSun = new Date(dStr + 'T12:00:00').getDay() === 0;
        map[stuName][dStr] = {
          status: entry?.status || (isSun ? 'pazar' : 'okudu'),
          cuzNo: entry?.cuzNo || 1,
          pageNo: entry?.pageNo || 20,
          score: entry?.score || 90
        };
      });
    });
    setClassBulkMap(map);
  }, [activeWeek, studentsInClass, selectedClass, allProfiles]);

  // Save class bulk weekly entries
  const handleSaveClassBulk = () => {
    const entriesMap: Record<string, RahleDailyEntry> = {};

    Object.entries(classBulkMap).forEach(([stuName, days]) => {
      const sKey = `${selectedClass || 'Genel'}_${stuName}`;
      const sProf = allProfiles[sKey];
      
      Object.entries(days).forEach(([dStr, data]) => {
        entriesMap[`${sKey}_${dStr}`] = {
          id: `entry_${dStr}`,
          date: dStr,
          status: data.status,
          donusNo: sProf?.kacinciDonuste || 1,
          cuzNo: data.status === 'okudu' || data.status === 'kaldi' ? data.cuzNo : undefined,
          pageNo: data.status === 'okudu' || data.status === 'kaldi' ? data.pageNo : undefined,
          score: data.status === 'okudu' ? data.score : undefined,
          createdAt: new Date().toISOString()
        };
      });
    });

    onSaveBulkEntries(entriesMap);
    setSaveSuccessMsg(`Sınıftaki ${studentsInClass.length} hafızın haftalık ders verileri başarıyla kaydedildi!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & NAVIGATION TOOLBAR */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
              <CalendarDays size={14} className="text-amber-700" />
              <span>HETS • HAFIZLIK EZBER TAKİP SİSTEMİ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span>Aylık Ders Takip Görünümü</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {isStudent
                ? 'Aylık ve haftalık hafızlık ders takip çizelgenizi ve değerlendirme durumunuzu görüntüleyin.'
                : 'Haftalık ders veri girişi ve resmî Diyanet HETS aylık ezber matrisini tek ekranda yönetin.'}
            </p>
          </div>

          {/* Student Profile Pill & Month/Year Pickers */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center">
                {profile.studentName.charAt(0)}
              </div>
              <div>
                <div className="font-black text-xs text-gray-900 leading-tight">
                  {profile.studentName}
                </div>
                <div className="text-[11px] text-amber-800 font-semibold">
                  {profile.className?.replace('_', '') || 'Sınıf'} • {profile.kacinciDonuste}. Dönüş • {profile.kacSayfaylaGidiyor} Sayfa Usulü
                </div>
              </div>
            </div>

            {/* Year Selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              aria-label="Yıl Seçin"
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-800 outline-none focus:border-amber-500 shadow-2xs cursor-pointer"
            >
              {[2023, 2024, 2025, 2026].map(y => (
                <option key={y} value={y}>{y} Yılı</option>
              ))}
            </select>

            {/* Month Selector */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              aria-label="Ay Seçin"
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-800 outline-none focus:border-amber-500 shadow-2xs cursor-pointer"
            >
              {MONTHS.map(m => (
                <option key={m.num} value={m.num}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 p-1 bg-gray-100/80 rounded-2xl">
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles size={14} />
              <span>Tümleşik Görünüm</span>
            </button>

            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'weekly'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarDays size={14} />
              <span>{isStudent ? 'Haftalık Ders Detayım' : 'Haftalık Ders Girişi'}</span>
            </button>

            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'monthly'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon size={14} />
              <span>Aylık HETS Çizelgesi</span>
            </button>

            {!isStudent && (
              <button
                onClick={() => setViewMode('class_bulk')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === 'class_bulk'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users size={14} />
                <span>Sınıf Haftalık Girişi</span>
              </button>
            )}
          </div>

          {/* Quick Info / Print button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              title="Çizelgeyi Yazdır / PDF Al"
            >
              <Printer size={15} />
              <span>Yazdır / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccessMsg && (
        <div className="bg-emerald-500 text-white px-5 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg shadow-emerald-500/20 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} />
            <span>{saveSuccessMsg}</span>
          </div>
          <button 
            onClick={() => setSaveSuccessMsg(null)}
            className="text-emerald-100 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MONTHLY SUMMARY METRICS BADGES */}
      {/* ========================================================================= */}
      {(viewMode === 'all' || viewMode === 'monthly') && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">Ders Verilen</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.ders} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              {monthlyStats.totalPagesRead} sayfa okundu
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">Kaldı (K)</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.kaldi} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Tekrar gerek
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">Pazar (P)</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.pazar} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Haftalık izin
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">Tatil (T)</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.tatil} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Resmî tatiller
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">İzinli (İ)</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.izinli} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Mazeret izni
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">Hasta (H)</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.hasta} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Raporlu
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 block">Gelmedi (G)</span>
            <span className="text-xl font-black text-gray-900">{monthlyStats.gelmedi} Gün</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Devamsız
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. OFFICIAL HETS MONTHLY MATRIX TABLE */}
      {/* ========================================================================= */}
      {(viewMode === 'all' || viewMode === 'monthly') && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-amber-50/30 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-amber-600" />
                <span>Resmî HETS Aylık Ezber Takip Çizelgesi ({MONTHS.find(m => m.num === selectedMonth)?.name} {selectedYear})</span>
              </span>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                Diyanet HETS standardında 1-31 gün matrisi. Bir güne tıklayarak o haftaya geçebilir veya detayı inceleyebilirsiniz.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-white px-3 py-1.5 rounded-xl border border-amber-200">
              <span>Aylık Başarı Ortalaması:</span>
              <span className="font-black text-amber-900">%{monthlyStats.avgScore || 90}</span>
            </div>
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
                <tr className="hover:bg-amber-50/20 transition-colors">
                  <td className="border border-gray-200 font-black text-gray-900 bg-gray-50 py-3 px-2">
                    {selectedYear}
                  </td>
                  <td className="border border-gray-200 font-black text-amber-900 bg-gray-50 py-3 px-2 whitespace-nowrap">
                    {selectedMonth} ({MONTHS.find(m => m.num === selectedMonth)?.name.substring(0, 3)})
                  </td>

                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                    if (day > daysInMonth) {
                      return (
                        <td key={day} className="border border-gray-200 bg-gray-100/40 text-gray-300">
                          -
                        </td>
                      );
                    }

                    const dateStr = formatDateStr(selectedYear, selectedMonth, day);
                    const entry = profile.dailyEntries?.[dateStr];
                    const dObj = new Date(selectedYear, selectedMonth - 1, day);
                    const isSunday = dObj.getDay() === 0;

                    let displayContent = '-';
                    let cellBg = 'bg-white text-gray-400 hover:bg-gray-50';
                    let tooltip = `${dateStr}: Henüz Veri Girilmedi`;

                    if (entry) {
                      if (entry.status === 'okudu') {
                        displayContent = entry.cuzNo ? `${entry.cuzNo}` : 'D';
                        cellBg = 'bg-emerald-50 text-emerald-800 font-black border border-emerald-200/70 hover:bg-emerald-100 shadow-2xs';
                        tooltip = `${dateStr}: ${entry.cuzNo}. Cüz (${entry.pageNo}. sayfa) Okundu - Puan: ${entry.score || 90}`;
                      } else if (entry.status === 'kaldi') {
                        displayContent = 'K';
                        cellBg = 'bg-rose-50 text-rose-800 font-black border border-rose-200/70 hover:bg-rose-100';
                        tooltip = `${dateStr}: Dersten Kaldı`;
                      } else if (entry.status === 'pazar') {
                        displayContent = entry.cuzNo ? `${entry.cuzNo}` : 'P';
                        cellBg = 'bg-gray-50 text-gray-400 font-bold hover:bg-gray-100';
                        tooltip = `${dateStr}: Pazar Tatili`;
                      } else if (entry.status === 'tatil') {
                        displayContent = 'T';
                        cellBg = 'bg-purple-50 text-purple-800 font-bold border border-purple-200/60 hover:bg-purple-100';
                        tooltip = `${dateStr}: Resmî Tatil`;
                      } else if (entry.status === 'izinli') {
                        displayContent = 'İ';
                        cellBg = 'bg-amber-50 text-amber-800 font-bold border border-amber-200/60 hover:bg-amber-100';
                        tooltip = `${dateStr}: İzinli`;
                      } else if (entry.status === 'hasta') {
                        displayContent = 'H';
                        cellBg = 'bg-orange-50 text-orange-800 font-bold border border-orange-200/60 hover:bg-orange-100';
                        tooltip = `${dateStr}: Hasta / Raporlu`;
                      } else if (entry.status === 'gelmedi') {
                        displayContent = 'G';
                        cellBg = 'bg-rose-100 text-rose-900 font-bold border border-rose-300 hover:bg-rose-200';
                        tooltip = `${dateStr}: Gelmedi (Devamsız)`;
                      } else if (entry.status === 'kayitsiz_sure') {
                        displayContent = 'KS';
                        cellBg = 'bg-gray-100 text-gray-600 font-bold';
                        tooltip = `${dateStr}: Kayıtsız Süre`;
                      }
                    } else if (isSunday) {
                      displayContent = 'P';
                      cellBg = 'bg-gray-50 text-gray-400 font-bold';
                      tooltip = `${dateStr}: Pazar`;
                    }

                    // Check if this day is part of active week
                    const isDayInActiveWeek = activeWeek.dates.includes(dateStr);

                    return (
                      <td
                        key={day}
                        onClick={() => {
                          // Find week index containing this day and switch to it
                          const targetWeekIdx = monthWeeks.findIndex(w => w.dates.includes(dateStr));
                          if (targetWeekIdx !== -1) {
                            setSelectedWeekIndex(targetWeekIdx);
                          }
                          setActiveCellDetail({ date: dateStr, entry });
                        }}
                        title={tooltip}
                        className={`border border-gray-200 py-3 px-1 cursor-pointer transition-transform hover:scale-110 relative ${cellBg} ${
                          isDayInActiveWeek ? 'ring-2 ring-amber-500 ring-inset' : ''
                        }`}
                      >
                        <span className="text-xs leading-none">{displayContent}</span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* HETS Codes Legend */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-gray-600">HETS Kılavuz Kodları:</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] flex items-center justify-center font-bold">29</span> Cüz No (Ders Verdi)</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-rose-100 text-rose-800 border border-rose-300 text-[10px] flex items-center justify-center font-bold">K</span> Kaldı</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-gray-100 text-gray-600 border border-gray-200 text-[10px] flex items-center justify-center font-bold">P</span> Pazar</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-purple-100 text-purple-800 border border-purple-200 text-[10px] flex items-center justify-center font-bold">T</span> Tatil</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[10px] flex items-center justify-center font-bold">İ</span> İzinli</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-orange-100 text-orange-800 border border-orange-200 text-[10px] flex items-center justify-center font-bold">H</span> Hasta</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-rose-100 text-rose-900 border border-rose-300 text-[10px] flex items-center justify-center font-bold">G</span> Gelmedi</span>
            </div>
            <div className="text-gray-400 font-semibold text-[11px]">
              Diyanet 30 Cüz Dönüşlü Klasik Takip Modeli
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. HAFTALIK DERS GİRİŞİ (WEEKLY LESSON DATA ENTRY) */}
      {/* ========================================================================= */}
      {(viewMode === 'all' || viewMode === 'weekly') && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-6">
          {/* Week Selection Toolbar & Batch Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700">
                <Bookmark size={15} />
                <span>{isStudent ? 'HAFTALIK DERS DURUMU VE DEĞERLENDİRME ÖZETİ' : 'HAFTALIK VERİ GİRİŞİ VE DEĞERLENDİRME'}</span>
              </div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <span>{activeWeek.label}</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {isStudent
                  ? 'Seçili haftadaki günlük ders durumlarınız, okuduğunuz cüz/sayfa bilgileri ve hoca gözlem notları.'
                  : 'Seçili haftanın tüm günlerinin ders durumlarını, cüz/sayfa numaralarını ve puanlarını haftalık olarak giriniz.'}
              </p>
            </div>

            {/* Week Switcher & Navigation */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedWeekIndex(Math.max(0, selectedWeekIndex - 1))}
                disabled={selectedWeekIndex === 0}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Önceki Hafta"
              >
                <ChevronLeft size={18} />
              </button>

              <select
                value={selectedWeekIndex}
                onChange={(e) => setSelectedWeekIndex(parseInt(e.target.value))}
                aria-label="Hafta Seçin"
                className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50/60 font-black text-xs text-amber-950 outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-2xs"
              >
                {monthWeeks.map(w => (
                  <option key={w.index} value={w.index}>
                    {w.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSelectedWeekIndex(Math.min(monthWeeks.length - 1, selectedWeekIndex + 1))}
                disabled={selectedWeekIndex === monthWeeks.length - 1}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Sonraki Hafta"
              >
                <ChevronRight size={18} />
              </button>

              {!isStudent && (
                <>
                  {/* Quick Batch Actions */}
                  <button
                    onClick={handleAutoFillWeek}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Öğrencinin usulüne göre hafta içi günleri ders verdi olarak doldurur"
                  >
                    <Zap size={15} className="text-amber-700" />
                    <span>Haftalık Otomatik Doldur</span>
                  </button>

                  <button
                    onClick={handleMarkSunday}
                    className="px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
                    title="Pazar gününü 'Pazar' olarak ayarla"
                  >
                    <span>Pazar'ı Ayarla</span>
                  </button>

                  {/* Primary Save Button */}
                  <button
                    onClick={handleSaveAllWeek}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Save size={16} />
                    <span>Haftalık Tüm Verileri Kaydet</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Weekly Summary Stat Banner */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Haftalık Verilen Ders:</span>
                <span className="text-base font-black text-gray-900">{weeklyStats.ders} Gün</span>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Okunan Sayfa:</span>
                <span className="text-base font-black text-gray-900">{weeklyStats.pages} Sayfa</span>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Ortalama Puan:</span>
                <span className="text-base font-black text-gray-900">%{weeklyStats.avg || (isStudent ? 0 : 90)}</span>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Hata / Galed:</span>
                <span className="text-base font-black text-gray-900">{weeklyStats.mistakes} Adet</span>
              </div>
            </div>

            {!isStudent && (
              <div className="text-[11px] text-gray-500 font-medium">
                * Değişiklik yaptığınız günlerin ardından <strong>"Haftalık Tüm Verileri Kaydet"</strong> butonuna basınız.
              </div>
            )}
          </div>

          {/* 7-Day Lesson Cards */}
          <div className="space-y-4">
            {activeWeek.dates.map(dStr => {
              const draft = weekDrafts[dStr];
              if (!draft) return null;

              const isToday = dStr === todayStr;
              const isSunday = draft.isSunday;
              const savedEntry = profile.dailyEntries?.[dStr];

              if (isStudent) {
                const studentBadge = savedEntry ? getStatusBadge(savedEntry.status) : null;
                return (
                  <div
                    key={dStr}
                    className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 space-y-3 ${
                      isToday ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-black ${
                          isSunday ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          <span className="text-sm leading-none">{draft.dayNumber}</span>
                          <span className="text-[9px] uppercase font-bold leading-none mt-0.5">
                            {draft.dayName.substring(0, 3)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-black text-base text-gray-900">{draft.dayName}</h3>
                            <span className="text-xs font-semibold text-gray-400">({draft.date})</span>
                            {isToday && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">
                                Bugün
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        {studentBadge ? (
                          <span className={`text-xs font-black px-3 py-1 rounded-xl border ${studentBadge.bg}`}>
                            {studentBadge.label}
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-gray-100 text-gray-500">
                            {isSunday ? 'Pazar Tatili' : 'Henüz Girilmedi'}
                          </span>
                        )}
                      </div>
                    </div>

                    {savedEntry && (savedEntry.status === 'okudu' || savedEntry.status === 'kaldi') && (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-gray-100 text-xs">
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-[10px] text-gray-400 font-bold block">Cüz / Sayfa</span>
                          <span className="font-black text-gray-900">
                            {savedEntry.cuzNo || 1}. Cüz • {savedEntry.pageNo || 20}. Sayfa
                          </span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-[10px] text-gray-400 font-bold block">Okunan Sayfa</span>
                          <span className="font-black text-gray-900">{savedEntry.pageCount || 1} Sayfa</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-[10px] text-gray-400 font-bold block">Ders Puanı</span>
                          {(() => {
                            const lvl = getScoreLevelFromScore(savedEntry.score, savedEntry.scoreLevel);
                            const meta = getScoreLevelMeta(lvl);
                            return <span className={`font-black ${meta.textClass}`}>{meta.label}</span>;
                          })()}
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-[10px] text-gray-400 font-bold block">Hata / Galed</span>
                          <span className="font-black text-gray-900">{savedEntry.mistakeCount ?? 0} Hata</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-gray-400 font-bold block">Has Aralığı</span>
                          <span className="font-bold text-emerald-700">{savedEntry.hasCuzRange || '-'}</span>
                        </div>
                        {(savedEntry.teacherNote || savedEntry.mistakeNotes) && (
                          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {savedEntry.teacherNote && (
                              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-amber-950 font-medium">
                                <strong className="font-black">Hoca Gözlem Notu:</strong> {savedEntry.teacherNote}
                              </div>
                            )}
                            {savedEntry.mistakeNotes && (
                              <div className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-200/60 text-rose-950 font-medium">
                                <strong className="font-black">Hatalar / Galedler:</strong> {savedEntry.mistakeNotes}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              const badge = getStatusBadge(draft.status);

              return (
                <div
                  key={dStr}
                  className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 space-y-4 ${
                    isToday ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Card Header: Day info & Status Pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-black ${
                        isSunday ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}>
                        <span className="text-sm leading-none">{draft.dayNumber}</span>
                        <span className="text-[9px] uppercase font-bold leading-none mt-0.5">
                          {draft.dayName.substring(0, 3)}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-base text-gray-900">
                            {draft.dayName}
                          </h3>
                          <span className="text-xs font-semibold text-gray-400">
                            ({draft.date})
                          </span>
                          {isToday && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">
                              Bugün
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${badge.bg}`}>
                            {badge.label}
                          </span>
                          {draft.isModified && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                              Kaydedilmemiş Değişiklik
                            </span>
                          )}
                          {draft.isSavedInDb && !draft.isModified && (
                            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 size={12} /> Kayıtlı
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { val: 'okudu', label: 'Okudu (Ders)' },
                        { val: 'kaldi', label: 'Kaldı' },
                        { val: 'pazar', label: 'Pazar' },
                        { val: 'tatil', label: 'Tatil' },
                        { val: 'izinli', label: 'İzinli' },
                        { val: 'hasta', label: 'Hasta' },
                        { val: 'gelmedi', label: 'Gelmedi' }
                      ].map(st => {
                        const isSelected = draft.status === st.val;
                        return (
                          <button
                            key={st.val}
                            type="button"
                            onClick={() => updateDraftField(dStr, { status: st.val as RahleDailyStatus })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200/70'
                            }`}
                          >
                            {st.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lesson Form Fields (Only if 'okudu' or 'kaldi') */}
                  {(draft.status === 'okudu' || draft.status === 'kaldi') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 pt-3 border-t border-gray-100">
                      {/* Cüz No */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Cüz No (1-30)
                        </label>
                        <select
                          value={draft.cuzNo}
                          onChange={(e) => {
                            const c = parseInt(e.target.value);
                            updateDraftField(dStr, { 
                              cuzNo: c,
                              hasCuzRange: `${Math.max(1, c - 4)}. - ${c}. Cüz Has`
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 font-black text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                        >
                          {Array.from({ length: 30 }, (_, i) => i + 1).map(c => (
                            <option key={c} value={c}>{c}. Cüz</option>
                          ))}
                        </select>
                      </div>

                      {/* Sayfa No */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Sayfa No (1-20)
                        </label>
                        <select
                          value={draft.pageNo}
                          onChange={(e) => updateDraftField(dStr, { pageNo: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 font-black text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(p => (
                            <option key={p} value={p}>{p}. Sayfa</option>
                          ))}
                        </select>
                      </div>

                      {/* Sayfa Adedi */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Okunan Sayfa Adedi
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={draft.pageCount}
                          onChange={(e) => updateDraftField(dStr, { pageCount: parseInt(e.target.value) || 1 })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 font-bold text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                        />
                      </div>

                      {/* Ders Puanı (Zayıf / Orta / İyi) */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Ders Puanı
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {(['zayif', 'orta', 'iyi'] as RahleScoreLevel[]).map(lvl => {
                            const meta = getScoreLevelMeta(lvl);
                            const isSelected = draft.scoreLevel === lvl;
                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => updateDraftField(dStr, {
                                  scoreLevel: lvl,
                                  score: getScoreFromLevel(lvl)
                                })}
                                className={`py-2 px-1 rounded-xl border text-[11px] font-black transition-all cursor-pointer ${
                                  isSelected ? meta.activeClass : meta.idleClass
                                }`}
                              >
                                {meta.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hata / Galed Sayısı */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Hata / Galed
                        </label>
                        <select
                          value={draft.mistakeCount}
                          onChange={(e) => updateDraftField(dStr, { mistakeCount: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 font-bold text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                        >
                          <option value={0}>0 (Hatasız)</option>
                          <option value={1}>1 Hata</option>
                          <option value={2}>2 Hata</option>
                          <option value={3}>3 Hata</option>
                          <option value={4}>4 Hata</option>
                          <option value={5}>5+ Hata</option>
                        </select>
                      </div>

                      {/* Has Cüz Aralığı */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Has (Tekrar) Aralığı
                        </label>
                        <input
                          type="text"
                          placeholder="Örn: 25.-29. Cüz Has"
                          value={draft.hasCuzRange}
                          onChange={(e) => updateDraftField(dStr, { hasCuzRange: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 font-bold text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                        />
                      </div>

                      {/* Hoca Günlük Gözlem Notu & Hatalar/Galedler */}
                      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-3.5 items-end">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Hoca Günlük Gözlem Notu
                          </label>
                          <input
                            type="text"
                            placeholder="Örn: Tecvid harfleri fasih, ezber akıcı ve sağlam verildi..."
                            value={draft.teacherNote}
                            onChange={(e) => updateDraftField(dStr, { teacherNote: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] font-bold text-gray-600">
                              Hatalar / Galedler
                            </label>
                            <button
                              type="button"
                              onClick={() => handleSaveSingleDay(dStr)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 cursor-pointer transition-all ${
                                draft.isSavedInDb && !draft.isModified
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                              }`}
                            >
                              {draft.isSavedInDb && !draft.isModified ? (
                                <>
                                  <CheckCircle2 size={13} /> Kaydedildi (Güncelle)
                                </>
                              ) : (
                                <>
                                  <Save size={13} /> Bu Günü Tek Kaydet
                                </>
                              )}
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Öğrencinin yaptığı hataları / galedleri buraya not alın..."
                            value={draft.mistakeNotes}
                            onChange={(e) => updateDraftField(dStr, { mistakeNotes: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-xs text-gray-900 outline-none focus:border-amber-500 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Non-Lesson Note for other statuses */}
                  {draft.status !== 'okudu' && draft.status !== 'kaldi' && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <span className="text-gray-500 font-medium">
                        {draft.status === 'pazar' && 'Haftalık dinlenme günü. Ezber tekrarı tavsiye edilir.'}
                        {draft.status === 'tatil' && 'Resmî tatil günü.'}
                        {draft.status === 'izinli' && 'Öğrenci mazeret iznindedir.'}
                        {draft.status === 'hasta' && 'Öğrenci sağlık mazereti bildirmiştir.'}
                        {draft.status === 'gelmedi' && 'Öğrenci derse katılmadı.'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSaveSingleDay(dStr)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                          draft.isSavedInDb && !draft.isModified
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <Save size={13} />
                        <span>{draft.isSavedInDb && !draft.isModified ? 'Kaydedildi' : 'Bu Günü Tek Kaydet'}</span>
                      </button>
                    </div>
                  )}

                  {/* Saved Entry Inline Confirmation Strip */}
                  {savedEntry && (
                    <div className="mt-2 pt-2.5 border-t border-emerald-100 bg-emerald-50/50 rounded-xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                          <CheckCircle2 size={12} /> Kaydedilen Veri:
                        </span>
                        <span className={`font-black px-2 py-0.5 rounded-md border text-[11px] ${getStatusBadge(savedEntry.status).bg}`}>
                          {getStatusBadge(savedEntry.status).label}
                        </span>
                        {(savedEntry.status === 'okudu' || savedEntry.status === 'kaldi') && (
                          <>
                            <span className="font-bold text-gray-800">
                              {savedEntry.cuzNo || 1}. Cüz • {savedEntry.pageNo || 20}. Sayfa ({savedEntry.pageCount || 1} Sayfa)
                            </span>
                            <span className="text-gray-300">|</span>
                            {(() => {
                              const lvl = getScoreLevelFromScore(savedEntry.score, savedEntry.scoreLevel);
                              const meta = getScoreLevelMeta(lvl);
                              return (
                                <span className={`font-black ${meta.textClass}`}>
                                  Puan: {meta.label}
                                </span>
                              );
                            })()}
                            <span className="text-gray-300">|</span>
                            <span className="font-bold text-gray-700">
                              Hata: {savedEntry.mistakeCount ?? 0}
                            </span>
                            {savedEntry.hasCuzRange && (
                              <>
                                <span className="text-gray-300">|</span>
                                <span className="font-semibold text-emerald-700">Has: {savedEntry.hasCuzRange}</span>
                              </>
                            )}
                          </>
                        )}
                        {savedEntry.teacherNote && (
                          <span className="text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md font-medium text-[11px]">
                            Not: {savedEntry.teacherNote}
                          </span>
                        )}
                        {savedEntry.mistakeNotes && (
                          <span className="text-rose-900 bg-rose-100/70 px-2 py-0.5 rounded-md font-medium text-[11px]">
                            Hatalar/Galedler: {savedEntry.mistakeNotes}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteDailyEntry(dStr)}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer"
                        title="Bu günün kaydını sil"
                      >
                        Kaydı Sil
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Save Bar */}
          {!isStudent && (
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-500 font-semibold">
                * Bu haftaya ait tüm günlerin verileri yukarıdaki kartlardan düzenlendikten sonra kaydedilebilir.
              </span>

              <button
                onClick={handleSaveAllWeek}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Save size={17} />
                <span>Haftalık Tüm Verileri Kaydet ({activeWeek.label})</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* KAYDEDİLEN GÜNLÜK DERS KAYITLARI LİSTESİ (SAVED RECORDS LIST) */}
          {/* ========================================================================= */}
          {(() => {
            const monthPrefix = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-`;
            const savedMonthEntries = Object.values(profile.dailyEntries || {})
              .filter((e): e is RahleDailyEntry => Boolean(e && e.date && e.date.startsWith(monthPrefix)))
              .sort((a, b) => b.date.localeCompare(a.date));

            return (
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span>Kaydedilen Günlük Ders Kayıtları ({MONTHS.find(m => m.num === selectedMonth)?.name} {selectedYear})</span>
                    </span>
                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                      "Bu Günü Tek Kaydet" veya "Haftalık Tüm Verileri Kaydet" ile kaydettiğiniz tüm dersler ve değerlendirme notları aşağıda listelenir.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-xs self-start sm:self-center">
                    Toplam {savedMonthEntries.length} Kayıtlı Gün
                  </span>
                </div>

                {savedMonthEntries.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl border border-gray-200/80 p-6 text-center text-xs text-gray-500 font-semibold">
                    Bu ay ({MONTHS.find(m => m.num === selectedMonth)?.name} {selectedYear}) için henüz kaydedilmiş ders verisi bulunmuyor. Yukarıdaki gün kartlarından <strong>"Bu Günü Tek Kaydet"</strong> veya <strong>"Haftalık Tüm Verileri Kaydet"</strong> butonuna tıklayarak kayıt ekleyebilirsiniz.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-black border-b border-gray-200">
                          <th className="py-3 px-3.5 whitespace-nowrap">Tarih / Gün</th>
                          <th className="py-3 px-3 whitespace-nowrap">Durum</th>
                          <th className="py-3 px-3 whitespace-nowrap">Cüz / Sayfa</th>
                          <th className="py-3 px-3 whitespace-nowrap">Ders Puanı</th>
                          <th className="py-3 px-3 whitespace-nowrap">Hata / Galed</th>
                          <th className="py-3 px-3 whitespace-nowrap">Has (Tekrar)</th>
                          <th className="py-3 px-3">Hoca Gözlem Notu</th>
                          <th className="py-3 px-3">Hatalar / Galedler</th>
                          {!isStudent && <th className="py-3 px-3 text-right whitespace-nowrap">İşlem</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {savedMonthEntries.map(entry => {
                          const dObj = new Date(entry.date + 'T12:00:00');
                          const dayLabel = DAY_NAMES[dObj.getDay()];
                          const statusBadge = getStatusBadge(entry.status);
                          const isLesson = entry.status === 'okudu' || entry.status === 'kaldi';
                          const lvl = getScoreLevelFromScore(entry.score, entry.scoreLevel);
                          const scoreMeta = getScoreLevelMeta(lvl);
                          const isInActiveWeek = activeWeek.dates.includes(entry.date);

                          return (
                            <tr
                              key={entry.date}
                              className={`hover:bg-amber-50/30 transition-colors ${
                                isInActiveWeek ? 'bg-amber-50/15' : ''
                              }`}
                            >
                              <td className="py-3 px-3.5 font-black text-gray-900 whitespace-nowrap">
                                <div>{entry.date}</div>
                                <div className="text-[11px] text-gray-500 font-semibold">{dayLabel}</div>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className={`px-2.5 py-1 rounded-lg border font-black text-[11px] ${statusBadge.bg}`}>
                                  {statusBadge.label}
                                </span>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap font-bold text-gray-900">
                                {isLesson ? (
                                  <span>{entry.cuzNo || 1}. Cüz • {entry.pageNo || 20}. Sayfa ({entry.pageCount || 1} syf)</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                {isLesson ? (
                                  <span className={`font-black px-2.5 py-0.5 rounded-lg border text-[11px] ${scoreMeta.idleClass}`}>
                                    {scoreMeta.label}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap font-bold text-gray-800">
                                {isLesson ? `${entry.mistakeCount ?? 0} Hata` : '-'}
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap font-semibold text-emerald-700">
                                {entry.status === 'okudu' ? (entry.hasCuzRange || '-') : '-'}
                              </td>
                              <td className="py-3 px-3 text-gray-700 max-w-xs">
                                {entry.teacherNote ? (
                                  <span className="font-medium text-amber-950">{entry.teacherNote}</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-gray-700 max-w-xs">
                                {entry.mistakeNotes ? (
                                  <span className="font-medium text-rose-900 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 inline-block">
                                    {entry.mistakeNotes}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              {!isStudent && (
                                <td className="py-3 px-3 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const wIdx = monthWeeks.findIndex(w => w.dates.includes(entry.date));
                                        if (wIdx !== -1) setSelectedWeekIndex(wIdx);
                                        setActiveCellDetail({ date: entry.date, entry });
                                      }}
                                      className="text-amber-700 hover:text-amber-900 font-bold text-[11px] cursor-pointer"
                                    >
                                      Detay
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => onDeleteDailyEntry(entry.date)}
                                      className="text-rose-600 hover:text-rose-800 font-bold text-[11px] cursor-pointer"
                                    >
                                      Sil
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TOPLU SINIF HAFTALIK GİRİŞİ (CLASS-WIDE WEEKLY TABLE) */}
      {/* ========================================================================= */}
      {!isStudent && viewMode === 'class_bulk' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
                <Users size={16} />
                <span>Sınıf Haftalık Toplu Ders Takip Çizelgesi</span>
              </span>
              <h2 className="text-xl font-black text-gray-900 mt-1">
                {selectedClass?.replace('_', '') || 'Tüm Sınıf'} • {activeWeek.label}
              </h2>
            </div>

            <button
              onClick={handleSaveClassBulk}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Save size={16} />
              <span>Tüm Sınıfın Haftasını Kaydet</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-black">
                  <th className="border border-gray-200 py-3 px-3 text-left">Hafız Öğrenci</th>
                  {activeWeek.dates.map(dStr => {
                    const dObj = new Date(dStr + 'T12:00:00');
                    return (
                      <th key={dStr} className="border border-gray-200 py-3 px-2 text-center min-w-[90px]">
                        <div>{DAY_NAMES[dObj.getDay()]}</div>
                        <div className="text-[10px] text-gray-400 font-normal">{dObj.getDate()} {MONTHS.find(m => m.num === selectedMonth)?.name.substring(0, 3)}</div>
                      </th>
                    );
                  })}
                  <th className="border border-gray-200 py-3 px-3 text-center">Haftalık Özet</th>
                </tr>
              </thead>
              <tbody>
                {studentsInClass.map(stuName => {
                  const sKey = `${selectedClass || 'Genel'}_${stuName}`;
                  const stuDays = classBulkMap[stuName] || {};
                  let weeklyOkuduCount = 0;

                  return (
                    <tr key={stuName} className="hover:bg-amber-50/20 transition-colors">
                      <td className="border border-gray-200 py-3 px-3 font-black text-gray-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold">
                            {stuName.charAt(0)}
                          </span>
                          <span>{stuName}</span>
                        </div>
                      </td>

                      {activeWeek.dates.map(dStr => {
                        const dayData = stuDays[dStr] || { status: 'okudu', cuzNo: 1, pageNo: 20, score: 90 };
                        if (dayData.status === 'okudu') weeklyOkuduCount++;

                        return (
                          <td key={dStr} className="border border-gray-200 py-2 px-1 text-center">
                            <select
                              value={dayData.status}
                              onChange={(e) => {
                                const newSt = e.target.value as RahleDailyStatus;
                                setClassBulkMap(prev => ({
                                  ...prev,
                                  [stuName]: {
                                    ...prev[stuName],
                                    [dStr]: { ...prev[stuName]?.[dStr], status: newSt }
                                  }
                                }));
                              }}
                              className={`w-full px-1.5 py-1 rounded-lg font-bold text-[11px] border outline-none cursor-pointer ${
                                dayData.status === 'okudu'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : dayData.status === 'kaldi'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : dayData.status === 'pazar'
                                  ? 'bg-gray-100 text-gray-600 border-gray-300'
                                  : 'bg-white text-gray-700 border-gray-200'
                              }`}
                            >
                              <option value="okudu">Okudu</option>
                              <option value="kaldi">Kaldı</option>
                              <option value="pazar">Pazar</option>
                              <option value="tatil">Tatil</option>
                              <option value="izinli">İzinli</option>
                              <option value="hasta">Hasta</option>
                              <option value="gelmedi">Gelmedi</option>
                            </select>
                          </td>
                        );
                      })}

                      <td className="border border-gray-200 py-3 px-3 text-center font-black">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                          weeklyOkuduCount >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {weeklyOkuduCount} Ders
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CELL DETAIL MODAL (WHEN A DAY IN THE MATRIX IS CLICKED) */}
      {/* ========================================================================= */}
      {activeCellDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-lg text-gray-900">{activeCellDetail.date}</h3>
                <span className="text-xs text-gray-400 font-semibold">Günlük Ders Kayıt Detayı & HETS Durumu</span>
              </div>
              <button
                onClick={() => setActiveCellDetail(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center font-bold cursor-pointer"
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
                    <span className="text-gray-500 font-bold">Okunan Cüz & Sayfa:</span>
                    <span className="font-black text-gray-900">{activeCellDetail.entry.cuzNo}. Cüz ({activeCellDetail.entry.pageNo}. Sayfa)</span>
                  </div>
                )}

                {activeCellDetail.entry.hasCuzRange && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Has (Tekrar):</span>
                    <span className="font-bold text-emerald-700">{activeCellDetail.entry.hasCuzRange}</span>
                  </div>
                )}

                {(activeCellDetail.entry.score !== undefined || activeCellDetail.entry.scoreLevel) && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Ders Puanı:</span>
                    {(() => {
                      const lvl = getScoreLevelFromScore(activeCellDetail.entry.score, activeCellDetail.entry.scoreLevel);
                      const meta = getScoreLevelMeta(lvl);
                      return <span className={`font-black ${meta.textClass}`}>{meta.label}</span>;
                    })()}
                  </div>
                )}

                {activeCellDetail.entry.mistakeCount !== undefined && (
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-bold">Hata / Takılma:</span>
                    <span className="font-bold text-gray-900">{activeCellDetail.entry.mistakeCount} adet</span>
                  </div>
                )}

                {activeCellDetail.entry.mistakeNotes && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-900 text-xs">
                    <strong>Hatalar / Galedler:</strong> {activeCellDetail.entry.mistakeNotes}
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
                Bu tarihe henüz ders veya devamsızlık kaydı girilmemiş.
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              {!isStudent && (
                <button
                  onClick={() => {
                    const targetWeekIdx = monthWeeks.findIndex(w => w.dates.includes(activeCellDetail.date));
                    if (targetWeekIdx !== -1) {
                      setSelectedWeekIndex(targetWeekIdx);
                    }
                    setViewMode('weekly');
                    setActiveCellDetail(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Haftalık Girişte Aç
                </button>
              )}
              <button
                onClick={() => setActiveCellDetail(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
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
