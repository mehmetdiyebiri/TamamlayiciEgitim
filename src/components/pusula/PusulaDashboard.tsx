import React, { useState, useMemo } from 'react';
import {
  Search,
  Printer,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Award,
  BarChart3,
  PieChart,
  Users,
  Target
} from 'lucide-react';
import { PusulaStudentProfile, PusulaExam } from '../../types/pusula';
import {
  PusulaLevelClass,
  PusulaCategoryColor,
  formatClassScoreRangeLabel,
  usePusulaClassificationConfig
} from '../../lib/pusulaClassificationConfig';

interface PusulaDashboardProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
  onNavigateTab: (tab: string) => void;
  onOpenExamModal: () => void;
  onOpenNoteModal: () => void;
  onOpenGoalModal: () => void;
  readOnly?: boolean;
  activeSchoolId?: string;
  allStudentsList?: Array<{ student: string; className: string }>;
  findProfileForStudent?: (studentName?: string | null, className?: string | null) => PusulaStudentProfile | null;
  selectedStudent?: string | null;
  selectedClass?: string | null;
  onSelectStudent?: (student: string) => void;
  onSelectClass?: (className: string) => void;
  availableClassList?: string[];
  getStudentAttendanceStatus?: (studentName: string, studentUserObj?: any) => 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu';
  studentAttendanceStatuses?: Record<string, 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu'>;
}

interface ClassifiedStudentItem {
  studentName: string;
  className: string;
  score: number | null; // null => GİRMEDİ
  examName: string | null;
  examDate: string | null;
  assignedClassId: string;
}

const getExamScoreValue = (exam: PusulaExam): number | null => {
  if (!exam) return null;
  if (typeof exam.score === 'number' && !isNaN(exam.score) && exam.score > 0) {
    return Number(exam.score);
  }
  const scores = exam.scores || {};
  const hasAnyNet =
    Object.values(scores).some(v => Number(v) !== 0) ||
    (typeof exam.totalNet === 'number' && exam.totalNet > 0);

  if (!hasAnyNet) return null;

  const getSubNet = (matchKeys: string[]) => {
    for (const [subName, netVal] of Object.entries(scores)) {
      const low = subName.toLocaleLowerCase('tr-TR');
      if (matchKeys.some(mk => low.includes(mk))) {
        return Number(netVal || 0);
      }
    }
    return 0;
  };

  const tur = getSubNet(['türkçe', 'turkce', 'tür']);
  const sos = getSubNet(['sosyal', 'inkılap', 'inkilap', 'tarih', 'sos']);
  const din = getSubNet(['din']);
  const ing = getSubNet(['ingilizce', 'yabancı', 'ing']);
  const mat = getSubNet(['matematik', 'mat']);
  const fen = getSubNet(['fen']);

  const raw = 194.75 + tur * 4.34 + mat * 4.25 + fen * 4.12 + sos * 1.66 + din * 1.89 + ing * 1.5;
  return Math.max(100, Math.min(500, Number(raw.toFixed(3))));
};

const formatScoreTr = (score: number): string => {
  return Number(score).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  });
};

const getThemePalette = (theme: PusulaCategoryColor, clsIdx: number) => {
  if (theme === 'emerald') {
    const palettes = [
      {
        headerBg: 'bg-emerald-50/90',
        headerText: 'text-emerald-950',
        badgeBg: 'bg-emerald-600',
        badgeText: 'text-white',
        borderClass: 'border-emerald-200',
        scoreBadgeBg: 'bg-emerald-50 border border-emerald-200',
        scoreBadgeText: 'text-emerald-800'
      },
      {
        headerBg: 'bg-teal-50/90',
        headerText: 'text-teal-950',
        badgeBg: 'bg-teal-600',
        badgeText: 'text-white',
        borderClass: 'border-teal-200',
        scoreBadgeBg: 'bg-teal-50 border border-teal-200',
        scoreBadgeText: 'text-teal-800'
      },
      {
        headerBg: 'bg-cyan-50/90',
        headerText: 'text-cyan-950',
        badgeBg: 'bg-cyan-600',
        badgeText: 'text-white',
        borderClass: 'border-cyan-200',
        scoreBadgeBg: 'bg-cyan-50 border border-cyan-200',
        scoreBadgeText: 'text-cyan-800'
      }
    ];
    return palettes[clsIdx % palettes.length];
  }

  if (theme === 'amber') {
    const palettes = [
      {
        headerBg: 'bg-indigo-50/90',
        headerText: 'text-indigo-950',
        badgeBg: 'bg-indigo-600',
        badgeText: 'text-white',
        borderClass: 'border-indigo-200',
        scoreBadgeBg: 'bg-indigo-50 border border-indigo-200',
        scoreBadgeText: 'text-indigo-800'
      },
      {
        headerBg: 'bg-amber-50/90',
        headerText: 'text-amber-950',
        badgeBg: 'bg-amber-600',
        badgeText: 'text-white',
        borderClass: 'border-amber-200',
        scoreBadgeBg: 'bg-amber-50 border border-amber-200',
        scoreBadgeText: 'text-amber-800'
      },
      {
        headerBg: 'bg-orange-50/90',
        headerText: 'text-orange-950',
        badgeBg: 'bg-orange-600',
        badgeText: 'text-white',
        borderClass: 'border-orange-200',
        scoreBadgeBg: 'bg-orange-50 border border-orange-200',
        scoreBadgeText: 'text-orange-800'
      }
    ];
    return palettes[clsIdx % palettes.length];
  }

  if (theme === 'purple') {
    return {
      headerBg: 'bg-purple-50/90',
      headerText: 'text-purple-950',
      badgeBg: 'bg-purple-600',
      badgeText: 'text-white',
      borderClass: 'border-purple-200',
      scoreBadgeBg: 'bg-purple-50 border border-purple-200',
      scoreBadgeText: 'text-purple-800'
    };
  }

  if (theme === 'blue') {
    return {
      headerBg: 'bg-blue-50/90',
      headerText: 'text-blue-950',
      badgeBg: 'bg-blue-600',
      badgeText: 'text-white',
      borderClass: 'border-blue-200',
      scoreBadgeBg: 'bg-blue-50 border border-blue-200',
      scoreBadgeText: 'text-blue-800'
    };
  }

  if (theme === 'indigo') {
    return {
      headerBg: 'bg-indigo-50/90',
      headerText: 'text-indigo-950',
      badgeBg: 'bg-indigo-600',
      badgeText: 'text-white',
      borderClass: 'border-indigo-200',
      scoreBadgeBg: 'bg-indigo-50 border border-indigo-200',
      scoreBadgeText: 'text-indigo-800'
    };
  }

  return {
    headerBg: 'bg-rose-50/90',
    headerText: 'text-rose-950',
    badgeBg: 'bg-rose-600',
    badgeText: 'text-white',
    borderClass: 'border-rose-200',
    scoreBadgeBg: 'bg-rose-50 border border-rose-200',
    scoreBadgeText: 'text-rose-800'
  };
};

export const PusulaDashboard: React.FC<PusulaDashboardProps> = ({
  activeSchoolId = 'default',
  allStudentsList = [],
  findProfileForStudent,
  selectedStudent,
  selectedClass,
  onSelectStudent,
  onSelectClass,
  availableClassList = [],
  getStudentAttendanceStatus,
  studentAttendanceStatuses = {}
}) => {
  const { config } = usePusulaClassificationConfig(activeSchoolId);
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const normalizeStr = (str: string) =>
    (str || '')
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .replace(/ı/g, 'i')
      .replace(/Ğ/g, 'g')
      .replace(/ğ/g, 'g')
      .replace(/Ü/g, 'u')
      .replace(/ü/g, 'u')
      .replace(/Ş/g, 's')
      .replace(/ş/g, 's')
      .replace(/Ö/g, 'o')
      .replace(/ö/g, 'o')
      .replace(/Ç/g, 'c')
      .replace(/ç/g, 'c')
      .toLowerCase()
      .trim();

  const extractNameOnly = (raw: string) => {
    const trimmed = (raw || '').trim();
    const m = trimmed.match(/^(\d+)\s*[-–.]+\s*(.+)$/);
    return m ? m[2].trim() : trimmed;
  };

  // Deduplicate students and exclude "Sürekli Devamsız" or "Kayıt Dondurdu" students
  const uniqueStudents = useMemo(() => {
    const isExcludedByAttendance = (studentName: string): boolean => {
      if (getStudentAttendanceStatus) {
        const status = getStudentAttendanceStatus(studentName);
        if (status === 'Sürekli Devamsız' || status === 'Kayıt Dondurdu') {
          return true;
        }
      }
      const targetNorm = normalizeStr(studentName);
      const targetPureNorm = normalizeStr(extractNameOnly(studentName));
      for (const [k, v] of Object.entries(studentAttendanceStatuses || {})) {
        if (normalizeStr(k) === targetNorm || (targetPureNorm && normalizeStr(extractNameOnly(k)) === targetPureNorm)) {
          if (v === 'Sürekli Devamsız' || v === 'Kayıt Dondurdu') {
            return true;
          }
        }
      }
      return false;
    };

    const result: Array<{ student: string; className: string }> = [];
    const seen = new Set<string>();

    allStudentsList.forEach(item => {
      if (item.className === 'Hafızlık Havuzu') return;
      if (isExcludedByAttendance(item.student)) return;
      const key = `${normalizeStr(item.className)}_${normalizeStr(extractNameOnly(item.student))}`;
      const nameKey = normalizeStr(extractNameOnly(item.student));
      if (!seen.has(key) && !seen.has(nameKey)) {
        seen.add(key);
        seen.add(nameKey);
        result.push(item);
      }
    });

    allStudentsList.forEach(item => {
      if (isExcludedByAttendance(item.student)) return;
      const nameKey = normalizeStr(extractNameOnly(item.student));
      if (!seen.has(nameKey)) {
        seen.add(nameKey);
        result.push(item);
      }
    });

    return result;
  }, [allStudentsList, getStudentAttendanceStatus, studentAttendanceStatuses]);

  // Flatten all configured level classes in order
  const allConfiguredClasses = useMemo<PusulaLevelClass[]>(() => {
    const list: PusulaLevelClass[] = [];
    (config.categories || []).forEach(cat => {
      (cat.classes || []).forEach(cls => {
        list.push(cls);
      });
    });
    return list;
  }, [config]);

  // Determine which class receives students with score === null ("GİRMEDİ")
  const unenteredTargetClassId = useMemo(() => {
    const explicit = allConfiguredClasses.find(c => c.includeUnentered);
    if (explicit) return explicit.id;
    const gelisimC = allConfiguredClasses.find(
      c => c.name.toLocaleUpperCase('tr-TR').includes('GELİŞİM C')
    );
    if (gelisimC) return gelisimC.id;
    return allConfiguredClasses[allConfiguredClasses.length - 1]?.id || 'cls_gelisim_c';
  }, [allConfiguredClasses]);

  // Match a numeric score against configured classes
  const resolveClassIdForScore = (score: number | null): string => {
    if (score === null) return unenteredTargetClassId;
    if (allConfiguredClasses.length === 0) return 'cls_gelisim_c';

    // Sort candidate classes by minScore descending so higher thresholds match first
    const sortedByMinDesc = [...allConfiguredClasses].sort(
      (a, b) => Number(b.minScore || 0) - Number(a.minScore || 0)
    );

    for (const cls of sortedByMinDesc) {
      const min = Number(cls.minScore || 0);
      const max =
        cls.maxScore !== null && cls.maxScore !== undefined && String(cls.maxScore) !== ''
          ? Number(cls.maxScore)
          : null;
      if (score >= min && (max === null || score < max)) {
        return cls.id;
      }
    }

    // Fallback: if score is above highest maxScore, place in highest minScore class; otherwise lowest minScore class
    const highest = sortedByMinDesc[0];
    const lowest = sortedByMinDesc[sortedByMinDesc.length - 1];
    if (score >= Number(highest.minScore || 0)) return highest.id;
    return lowest.id;
  };

  // Classify every student based on their last attended exam
  const classifiedStudents = useMemo<ClassifiedStudentItem[]>(() => {
    return uniqueStudents.map(({ student, className }) => {
      const prof = findProfileForStudent ? findProfileForStudent(student, className) : null;
      const rawExams = prof?.exams || [];

      const attendedExams = rawExams
        .map((ex, idx) => ({
          exam: ex,
          scoreVal: getExamScoreValue(ex),
          originalIdx: idx
        }))
        .filter(item => item.scoreVal !== null && item.scoreVal > 0)
        .sort((a, b) => {
          const timeA = a.exam.date ? new Date(a.exam.date).getTime() : 0;
          const timeB = b.exam.date ? new Date(b.exam.date).getTime() : 0;
          if (!isNaN(timeA) && !isNaN(timeB) && timeB !== timeA) {
            return timeB - timeA;
          }
          return a.originalIdx - b.originalIdx;
        });

      const latest = attendedExams[0] || null;
      const score = latest ? latest.scoreVal : null;
      const examName = latest ? latest.exam.name : null;
      const examDate = latest ? latest.exam.date : null;

      return {
        studentName: student,
        className,
        score,
        examName,
        examDate,
        assignedClassId: resolveClassIdForScore(score)
      };
    });
  }, [uniqueStudents, findProfileForStudent, allConfiguredClasses, unenteredTargetClassId]);

  // Filter by classFilter and searchQuery
  const filteredClassified = useMemo(() => {
    const q = searchQuery.trim();
    const normQ = normalizeStr(q);
    const lowQ = q.toLocaleLowerCase('tr-TR');

    return classifiedStudents.filter(item => {
      if (classFilter !== 'ALL') {
        const cleanCls = item.className.replace('_', '');
        if (normalizeStr(cleanCls) !== normalizeStr(classFilter.replace('_', ''))) {
          return false;
        }
      }

      if (q) {
        const matchName =
          item.studentName.toLocaleLowerCase('tr-TR').includes(lowQ) ||
          normalizeStr(item.studentName).includes(normQ);
        const cleanCls = item.className.replace('_', '');
        const matchCls =
          cleanCls.toLocaleLowerCase('tr-TR').includes(lowQ) ||
          normalizeStr(cleanCls).includes(normQ);
        if (!matchName && !matchCls) return false;
      }

      return true;
    });
  }, [classifiedStudents, classFilter, searchQuery]);

  // Sort helper: highest score to lowest score; scored students before 'GİRMEDİ'
  const sortByScoreDesc = (list: ClassifiedStudentItem[]) => {
    return [...list].sort((a, b) => {
      if (a.score !== null && b.score !== null) {
        if (b.score !== a.score) return b.score - a.score;
        return a.studentName.localeCompare(b.studentName, 'tr-TR', { numeric: true });
      }
      if (a.score !== null && b.score === null) return -1;
      if (a.score === null && b.score !== null) return 1;
      return a.studentName.localeCompare(b.studentName, 'tr-TR', { numeric: true });
    });
  };

  // Group filtered students by class ID
  const studentsByClassId = useMemo(() => {
    const map: Record<string, ClassifiedStudentItem[]> = {};
    allConfiguredClasses.forEach(cls => {
      map[cls.id] = sortByScoreDesc(
        filteredClassified.filter(s => s.assignedClassId === cls.id)
      );
    });
    return map;
  }, [allConfiguredClasses, filteredClassified]);

  const handleStudentClick = (item: ClassifiedStudentItem) => {
    if (onSelectClass) onSelectClass(item.className);
    if (onSelectStudent) onSelectStudent(item.studentName);
  };

  return (
    <div className="space-y-8">
      {/* Üst Bilgi ve Filtreleme Barı */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black uppercase tracking-wider">
              <Sparkles size={13} />
              PUSULA • GENEL DURUM &amp; ÖZET SINIFLANDIRMASI
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Akademi &amp; Gelişim Sınıflandırma Tablosu
            </h2>
            <p className="text-xs font-semibold text-gray-500">
              Öğrencilerin girdikleri en son deneme sınavı puanına göre oluşturulan seviye sınıfları.
              Son sınava girmeyen öğrencilerin girdikleri son deneme baz alınır; hiç sınava girmeyenler puan sütununda <strong className="text-red-600">GİRMEDİ</strong> olarak yer alır.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap print:hidden">
            {/* Kategori Özet Rozetleri */}
            {(config.categories || []).map((cat, idx) => {
              const catTotal = (cat.classes || []).reduce(
                (sum, cls) => sum + (studentsByClassId[cls.id]?.length || 0),
                0
              );
              const isEmerald = cat.colorTheme === 'emerald' || idx === 0;
              return (
                <div
                  key={cat.id}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border ${
                    isEmerald
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  {isEmerald ? (
                    <GraduationCap size={18} className="text-emerald-600" />
                  ) : (
                    <TrendingUp size={18} className="text-amber-600" />
                  )}
                  <div>
                    <div
                      className={`text-[10px] font-black uppercase leading-none ${
                        isEmerald ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {idx + 1}. Kategori: {cat.name}
                    </div>
                    <div
                      className={`text-sm font-black ${
                        isEmerald ? 'text-emerald-950' : 'text-amber-950'
                      }`}
                    >
                      {catTotal} Öğrenci
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold text-xs transition-all cursor-pointer"
            >
              <Printer size={15} />
              Yazdır
            </button>
          </div>
        </div>

        {/* Sınıf Filtresi ve Hızlı Arama */}
        <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-gray-400 mr-1">Şube Filtresi:</span>
            <button
              type="button"
              onClick={() => setClassFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                classFilter === 'ALL'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tümü ({classifiedStudents.length})
            </button>
            {availableClassList
              .filter(c => c !== 'Hafızlık Havuzu')
              .map(cls => {
                const clean = cls.replace('_', '');
                const isSelected = classFilter === cls;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-xs font-black'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {clean}
                  </button>
                );
              })}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sınıflandırma içinde öğrenci ara..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-4 py-2 text-xs font-semibold outline-none focus:bg-white focus:border-purple-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* KATEGORİLER VE SINIFLAR DİNAMİK LİSTESİ */}
      {(config.categories || []).map((cat, catIdx) => {
        const catTotal = (cat.classes || []).reduce(
          (sum, cls) => sum + (studentsByClassId[cls.id]?.length || 0),
          0
        );
        const isEmerald = cat.colorTheme === 'emerald';
        const isAmber = cat.colorTheme === 'amber';
        const badgeBoxClass = isEmerald
          ? 'bg-emerald-600 shadow-emerald-600/20'
          : isAmber
          ? 'bg-amber-500 shadow-amber-500/20'
          : 'bg-purple-600 shadow-purple-600/20';

        const totalPillClass = isEmerald
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : isAmber
          ? 'bg-amber-50 border-amber-200 text-amber-800'
          : 'bg-purple-50 border-purple-200 text-purple-800';

        return (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center justify-between px-1 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black shadow-sm ${badgeBoxClass}`}
                >
                  {catIdx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">
                    {catIdx + 1}. KATEGORİ : {cat.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-500">
                    Bölümleri:{' '}
                    {(cat.classes || [])
                      .map(c => `${c.name} (${formatClassScoreRangeLabel(c)})`)
                      .join(' • ')}
                  </p>
                </div>
              </div>
              <span className={`px-3.5 py-1.5 rounded-xl border text-xs font-black ${totalPillClass}`}>
                Toplam: {catTotal} Öğrenci
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {(cat.classes || []).map((cls, clsIdx) => {
                const items = studentsByClassId[cls.id] || [];
                const palette = getThemePalette(cat.colorTheme || 'emerald', clsIdx);
                const rangeLabel = formatClassScoreRangeLabel(cls);

                return (
                  <div
                    key={cls.id}
                    className={`bg-white rounded-2xl border ${palette.borderClass} shadow-xs overflow-hidden flex flex-col`}
                  >
                    {/* Sınıf Başlığı */}
                    <div
                      className={`${palette.headerBg} px-5 py-4 border-b ${palette.borderClass} flex items-center justify-between gap-2`}
                    >
                      <div>
                        <h4 className={`text-base font-black tracking-tight ${palette.headerText}`}>
                          {cls.name}
                        </h4>
                        <p className="text-xs font-bold opacity-80 mt-0.5 text-gray-600">
                          {rangeLabel}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-black ${palette.badgeBg} ${palette.badgeText} shrink-0`}
                      >
                        {items.length} Öğrenci
                      </span>
                    </div>

                    {/* Tablo Başlığı */}
                    <div className="grid grid-cols-12 px-4 py-2.5 bg-gray-50/80 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                      <div className="col-span-8">Öğrenci Adı</div>
                      <div className="col-span-4 text-right">Puan</div>
                    </div>

                    {/* Öğrenci Listesi */}
                    <div className="divide-y divide-gray-100 max-h-[420px] overflow-y-auto flex-1">
                      {items.length === 0 ? (
                        <div className="py-10 px-4 text-center text-xs font-semibold text-gray-400">
                          Bu grupta öğrenci bulunmuyor.
                        </div>
                      ) : (
                        items.map((item, idx) => {
                          const isSelected =
                            selectedStudent === item.studentName &&
                            (!selectedClass ||
                              normalizeStr(selectedClass) === normalizeStr(item.className));

                          return (
                            <div
                              key={`${item.className}_${item.studentName}_${idx}`}
                              onClick={() => handleStudentClick(item)}
                              title={
                                item.examName
                                  ? `Baz Alınan Son Deneme: ${item.examName} (${item.examDate || ''})`
                                  : 'Henüz deneme sınavı kaydı bulunmuyor'
                              }
                              className={`grid grid-cols-12 items-center px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-purple-50/90 font-black text-purple-950'
                                  : 'hover:bg-gray-50/90 text-gray-800'
                              }`}
                            >
                              {/* Sütun 1: Sıra + Öğrenci Adı */}
                              <div className="col-span-8 flex items-center gap-2 min-w-0 pr-2">
                                <span className="w-5 h-5 rounded-md bg-gray-100 text-gray-500 font-black text-[10px] flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="font-bold truncate">{item.studentName}</span>
                                {item.className && item.className !== 'Hafızlık Havuzu' && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">
                                    {item.className.replace('_', '')}
                                  </span>
                                )}
                              </div>

                              {/* Sütun 2: Aldığı Puan veya GİRMEDİ */}
                              <div className="col-span-4 text-right">
                                {item.score !== null ? (
                                  <span
                                    className={`inline-block px-2.5 py-1 rounded-lg font-black text-xs ${palette.scoreBadgeBg} ${palette.scoreBadgeText}`}
                                  >
                                    {formatScoreTr(item.score)}
                                  </span>
                                ) : (
                                  <span className="inline-block px-2.5 py-1 rounded-lg font-black text-[11px] bg-red-50 text-red-600 border border-red-200 tracking-wide">
                                    GİRMEDİ
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* AKADEMİ & GELİŞİM SINIFLANDIRMA ANALİZ GRAFİKLERİ */}
      {(() => {
        const totalStudents = filteredClassified.length;
        const attendedList = filteredClassified.filter(s => s.score !== null);
        const unenteredCount = totalStudents - attendedList.length;
        const participationRate = totalStudents > 0 ? (attendedList.length / totalStudents) * 100 : 0;

        const overallAvg =
          attendedList.length > 0
            ? attendedList.reduce((acc, s) => acc + Number(s.score || 0), 0) / attendedList.length
            : 0;

        const sortedScored = [...attendedList].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
        const topStudent = sortedScored[0] || null;
        const lowestScoredStudent = sortedScored[sortedScored.length - 1] || null;

        // Hex color helper for each class card & SVG segments
        const getHexColor = (theme: PusulaCategoryColor, clsIdx: number): string => {
          if (theme === 'emerald') {
            const cols = ['#059669', '#0d9488', '#0891b2'];
            return cols[clsIdx % cols.length];
          }
          if (theme === 'amber') {
            const cols = ['#4f46e5', '#d97706', '#ea580c'];
            return cols[clsIdx % cols.length];
          }
          if (theme === 'purple') return '#9333ea';
          if (theme === 'blue') return '#2563eb';
          if (theme === 'indigo') return '#4f46e5';
          return '#e11d48';
        };

        // Build per-class analytical stats
        const classChartItems: Array<{
          id: string;
          name: string;
          categoryName: string;
          rangeLabel: string;
          count: number;
          scoredCount: number;
          unenteredInClass: number;
          percentage: number;
          avgScore: number | null;
          maxScore: number | null;
          minScore: number | null;
          colorHex: string;
          palette: ReturnType<typeof getThemePalette>;
        }> = [];

        (config.categories || []).forEach(cat => {
          (cat.classes || []).forEach((cls, clsIdx) => {
            const list = studentsByClassId[cls.id] || [];
            const scoredInCls = list.filter(s => s.score !== null);
            const avg =
              scoredInCls.length > 0
                ? scoredInCls.reduce((sum, s) => sum + Number(s.score || 0), 0) / scoredInCls.length
                : null;
            const maxVal =
              scoredInCls.length > 0
                ? Math.max(...scoredInCls.map(s => Number(s.score || 0)))
                : null;
            const minVal =
              scoredInCls.length > 0
                ? Math.min(...scoredInCls.map(s => Number(s.score || 0)))
                : null;

            classChartItems.push({
              id: cls.id,
              name: cls.name,
              categoryName: cat.name,
              rangeLabel: formatClassScoreRangeLabel(cls),
              count: list.length,
              scoredCount: scoredInCls.length,
              unenteredInClass: list.length - scoredInCls.length,
              percentage: totalStudents > 0 ? (list.length / totalStudents) * 100 : 0,
              avgScore: avg,
              maxScore: maxVal,
              minScore: minVal,
              colorHex: getHexColor(cat.colorTheme || 'emerald', clsIdx),
              palette: getThemePalette(cat.colorTheme || 'emerald', clsIdx)
            });
          });
        });

        const maxClassCount = Math.max(1, ...classChartItems.map(c => c.count));

        // Build branch (şube) comparison stats across all school classes
        const branchNames = availableClassList.filter(c => c !== 'Hafızlık Havuzu');
        const branchStats = branchNames
          .map(rawCls => {
            const cleanBranch = rawCls.replace('_', '');
            const branchStudents = classifiedStudents.filter(
              s => normalizeStr(s.className.replace('_', '')) === normalizeStr(cleanBranch)
            );
            const bTotal = branchStudents.length;
            const bScored = branchStudents.filter(s => s.score !== null);
            const bAvg =
              bScored.length > 0
                ? bScored.reduce((sum, s) => sum + Number(s.score || 0), 0) / bScored.length
                : null;

            const byClassCounts = classChartItems.map(ci => ({
              id: ci.id,
              name: ci.name,
              colorHex: ci.colorHex,
              count: branchStudents.filter(s => s.assignedClassId === ci.id).length
            }));

            const firstCatIds = new Set(((config.categories || [])[0]?.classes || []).map(c => c.id));
            const akademiCount = branchStudents.filter(s => firstCatIds.has(s.assignedClassId)).length;
            const akademiRate = bTotal > 0 ? (akademiCount / bTotal) * 100 : 0;

            return {
              rawCls,
              cleanBranch,
              total: bTotal,
              scoredCount: bScored.length,
              avgScore: bAvg,
              akademiCount,
              akademiRate,
              byClassCounts
            };
          })
          .filter(b => b.total > 0);

        // SVG Donut Chart geometry
        const radius = 68;
        const circumference = 2 * Math.PI * radius;
        let cumulativePercent = 0;

        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-8">
            {/* Grafik Bölümü Başlığı */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-sm shadow-purple-600/20 shrink-0">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-purple-600">
                    <span>İSTATİSTİKSEL GÖRSEL ANALİZ</span>
                    <span>•</span>
                    <span>{classFilter === 'ALL' ? 'TÜM ŞUBELER' : `${classFilter.replace('_', '')} ŞUBESİ`}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    Akademi &amp; Gelişim Sınıfları Dağılım ve Başarı Grafiği
                  </h3>
                  <p className="text-xs font-semibold text-gray-500">
                    Sınıflardaki öğrenci yoğunluğu, yüzdelik dağılım oranları, sınıf puan ortalamaları ve şube bazlı karşılaştırma analizi.
                  </p>
                </div>
              </div>

              {/* Kategori Özet Oran Barı */}
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-2.5 shrink-0">
                {(config.categories || []).map((cat, idx) => {
                  const catCount = (cat.classes || []).reduce(
                    (sum, c) => sum + (studentsByClassId[c.id]?.length || 0),
                    0
                  );
                  const pct = totalStudents > 0 ? ((catCount / totalStudents) * 100).toFixed(1) : '0.0';
                  const isEm = cat.colorTheme === 'emerald' || idx === 0;
                  return (
                    <React.Fragment key={cat.id}>
                      {idx > 0 && <div className="w-px h-7 bg-gray-200" />}
                      <div className="text-right sm:text-left">
                        <div className={`text-[10px] font-black uppercase ${isEm ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {cat.name} Oranı
                        </div>
                        <div className="text-sm font-black text-gray-900">
                          %{pct.replace('.', ',')} <span className="text-xs font-bold text-gray-400">({catCount} Öğr.)</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Üst Özet Metrik Kartları (4'lü KPI) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                    DEĞERLENDİRİLEN ÖĞRENCİ
                  </div>
                  <div className="text-xl font-black text-gray-900">{totalStudents} Öğrenci</div>
                  <div className="text-[11px] font-bold text-gray-500">
                    {attendedList.length} Sınava Girdi • {unenteredCount} Girmedi
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    GENEL PUAN ORTALAMASI
                  </div>
                  <div className="text-xl font-black text-gray-900">
                    {attendedList.length > 0 ? formatScoreTr(overallAvg) : '—'}
                  </div>
                  <div className="text-[11px] font-bold text-gray-500">
                    Katılım Oranı: %{participationRate.toFixed(1).replace('.', ',')}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wider text-teal-600">
                    EN YÜKSEK PUAN
                  </div>
                  <div className="text-xl font-black text-gray-900">
                    {topStudent && topStudent.score !== null ? formatScoreTr(topStudent.score) : '—'}
                  </div>
                  <div className="text-[11px] font-bold text-gray-500 truncate">
                    {topStudent ? `${topStudent.studentName} (${topStudent.className.replace('_', '')})` : 'Veri yok'}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <TrendingUp size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                    PUAN MAKASI (MİN - MAKS)
                  </div>
                  <div className="text-base font-black text-gray-900">
                    {lowestScoredStudent?.score !== null && topStudent?.score !== null && lowestScoredStudent && topStudent
                      ? `${formatScoreTr(lowestScoredStudent.score)} – ${formatScoreTr(topStudent.score)}`
                      : '—'}
                  </div>
                  <div className="text-[11px] font-bold text-gray-500 truncate">
                    {lowestScoredStudent && topStudent && lowestScoredStudent.score !== null && topStudent.score !== null
                      ? `Fark: ${formatScoreTr(topStudent.score - lowestScoredStudent.score)} Puan`
                      : 'Henüz sınav verisi yok'}
                  </div>
                </div>
              </div>
            </div>

            {/* Ana Grafikler Grid: Sol Sütun & Oran Grafiği (7 Sütun) + Sağ Halka Dağılım Grafiği (5 Sütun) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* SOL: Seviye Sınıfları Sütun & Ortalama Puan Grafiği */}
              <div className="lg:col-span-7 bg-gray-50/60 rounded-2xl p-5 sm:p-6 border border-gray-200/80 flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
                      <BarChart3 size={16} className="text-purple-600" />
                      Sınıflara Göre Öğrenci Sayısı &amp; Ortalama Puan Grafiği
                    </h4>
                    <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                      Her seviye sınıfındaki mevcut öğrenci adedi, genel içindeki payı ve sınıfın deneme puan ortalaması
                    </p>
                  </div>
                </div>

                {/* Dikey Sütun Grafiği */}
                <div className="pt-6 pb-2 px-2">
                  <div
                    className="grid gap-3 items-end min-h-[230px] border-b border-gray-200 pb-3"
                    style={{
                      gridTemplateColumns: `repeat(${Math.max(1, classChartItems.length)}, minmax(0, 1fr))`
                    }}
                  >
                    {classChartItems.map(item => {
                      const barHeightPx =
                        item.count > 0 ? Math.max(24, Math.round((item.count / maxClassCount) * 165)) : 8;
                      return (
                        <div key={item.id} className="flex flex-col items-center justify-end h-full group">
                          {/* Üst Etiket: Öğrenci Sayısı ve Yüzde */}
                          <div className="text-center mb-2">
                            <div className="text-sm font-black text-gray-900 leading-tight">
                              {item.count}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400">
                              %{item.percentage.toFixed(1).replace('.', ',')}
                            </div>
                          </div>

                          {/* Sütun */}
                          <div className="w-full max-w-[64px] bg-gray-200/60 rounded-t-xl flex items-end justify-center overflow-hidden p-0.5">
                            <div
                              className="w-full rounded-t-lg transition-all duration-500 relative group-hover:brightness-110"
                              style={{
                                height: `${barHeightPx}px`,
                                backgroundColor: item.count > 0 ? item.colorHex : '#cbd5e1'
                              }}
                              title={`${item.name}: ${item.count} Öğrenci (%${item.percentage.toFixed(1)})`}
                            />
                          </div>

                          {/* Ortalama Puan Rozeti */}
                          <div className="mt-2.5 text-center">
                            <span
                              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black text-white shadow-2xs"
                              style={{ backgroundColor: item.colorHex }}
                            >
                              {item.avgScore !== null ? `Ort: ${formatScoreTr(item.avgScore)}` : 'Ort: —'}
                            </span>
                          </div>

                          {/* Sınıf Adı & Puan Aralığı */}
                          <div className="mt-1.5 text-center">
                            <div className="text-xs font-black text-gray-800 tracking-tight truncate max-w-[95px]">
                              {item.name}
                            </div>
                            <div className="text-[9px] font-bold text-gray-400 leading-tight line-clamp-1">
                              {item.rangeLabel}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Alt Sınıf Detay Tablosu (Min / Ort / Maks Puanlar) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {classChartItems.map(item => (
                    <div
                      key={`detail_${item.id}`}
                      className="bg-white rounded-xl p-3 border border-gray-200/80 flex flex-col justify-between gap-1.5"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1.5 text-xs font-black text-gray-900 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          {item.name}
                        </span>
                        <span className="text-[11px] font-black text-gray-600 shrink-0">
                          {item.count} Öğr.
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 border-t border-gray-100 pt-1.5">
                        <span>
                          Ort:{' '}
                          <strong className="text-gray-800">
                            {item.avgScore !== null ? formatScoreTr(item.avgScore) : '—'}
                          </strong>
                        </span>
                        {item.unenteredInClass > 0 ? (
                          <span className="text-red-600 font-black">
                            {item.unenteredInClass} Girmedi
                          </span>
                        ) : (
                          <span>
                            Maks:{' '}
                            <strong className="text-gray-800">
                              {item.maxScore !== null ? formatScoreTr(item.maxScore) : '—'}
                            </strong>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SAĞ: Oransal Halka (Donut) Grafiği & Dağılım Özeti */}
              <div className="lg:col-span-5 bg-gray-50/60 rounded-2xl p-5 sm:p-6 border border-gray-200/80 flex flex-col justify-between space-y-5">
                <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
                    <PieChart size={16} className="text-purple-600" />
                    Seviye Sınıfları Oransal Dağılım Halkası
                  </h4>
                  <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                    Öğrencilerin Akademi ve Gelişim sınıflarındaki yüzdelik ağırlıkları
                  </p>
                </div>

                {/* SVG Donut Chart */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-auto py-2">
                  <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                    <svg className="w-44 h-44 -rotate-90" viewBox="0 0 180 180">
                      <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="22"
                      />
                      {totalStudents > 0 &&
                        classChartItems.map(item => {
                          if (item.count === 0) return null;
                          const pct = item.count / totalStudents;
                          const strokeDasharray = `${pct * circumference} ${circumference}`;
                          const strokeDashoffset = -cumulativePercent * circumference;
                          cumulativePercent += pct;
                          return (
                            <circle
                              key={`donut_${item.id}`}
                              cx="90"
                              cy="90"
                              r={radius}
                              fill="transparent"
                              stroke={item.colorHex}
                              strokeWidth="22"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-500"
                            >
                              <title>{`${item.name}: ${item.count} Öğrenci (%${item.percentage.toFixed(1)})`}</title>
                            </circle>
                          );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        TOPLAM
                      </span>
                      <span className="text-2xl font-black text-gray-900 leading-none mt-0.5">
                        {totalStudents}
                      </span>
                      <span className="text-[10px] font-bold text-purple-600 mt-1">
                        Öğrenci
                      </span>
                    </div>
                  </div>

                  {/* Donut Lejant Listesi */}
                  <div className="w-full space-y-2">
                    {classChartItems.map(item => (
                      <div
                        key={`legend_${item.id}`}
                        className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200/70"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-3 h-3 rounded-md shrink-0"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span className="text-xs font-black text-gray-800 truncate">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-black text-gray-900">
                            {item.count} Öğr.
                          </span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 min-w-[46px] text-right">
                            %{item.percentage.toFixed(1).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yatay Yığılmış Tam Oran Çubuğu */}
                <div className="space-y-1.5 pt-2 border-t border-gray-200/70">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-500">
                    <span>BÜTÜNSEL DAĞILIM ÇUBUĞU</span>
                    <span>%100 ({totalStudents} ÖĞRENCİ)</span>
                  </div>
                  <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex">
                    {totalStudents > 0 &&
                      classChartItems.map(item => {
                        if (item.count === 0) return null;
                        return (
                          <div
                            key={`bar_${item.id}`}
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: item.colorHex
                            }}
                            title={`${item.name}: ${item.count} Öğrenci (%${item.percentage.toFixed(1)})`}
                            className="h-full transition-all duration-500"
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* ALT BÖLÜM: Şube Bazlı Akademi & Gelişim Karşılaştırma Grafiği */}
            {branchStats.length > 1 && (
              <div className="bg-gray-50/60 rounded-2xl p-5 sm:p-6 border border-gray-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
                      <GraduationCap size={17} className="text-purple-600" />
                      Şubelere Göre Akademi &amp; Gelişim Dağılımı ve Şube Ortalamaları
                    </h4>
                    <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                      Okuldaki her şubenin seviye sınıflarına dağılım oranı ve şube bazlı deneme puan ortalaması (Şubeye tıklayarak filtreleyebilirsiniz)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {classChartItems.map(ci => (
                      <span
                        key={`branch_leg_${ci.id}`}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black text-gray-700 bg-white px-2.5 py-1 rounded-lg border border-gray-200"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: ci.colorHex }}
                        />
                        {ci.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {branchStats.map(b => {
                    const isCurrentFilter =
                      classFilter !== 'ALL' &&
                      normalizeStr(classFilter.replace('_', '')) === normalizeStr(b.cleanBranch);
                    return (
                      <div
                        key={b.rawCls}
                        onClick={() => setClassFilter(isCurrentFilter ? 'ALL' : b.rawCls)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isCurrentFilter
                            ? 'bg-purple-50/80 border-purple-300 shadow-xs'
                            : 'bg-white border-gray-200/80 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-xs font-black">
                              {b.cleanBranch}
                            </span>
                            <span className="text-xs font-bold text-gray-600">
                              {b.total} Öğrenci
                            </span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Akademi: %{b.akademiRate.toFixed(0)} ({b.akademiCount})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">
                              Şube Ort:
                            </span>
                            <span className="text-xs font-black text-gray-900">
                              {b.avgScore !== null ? formatScoreTr(b.avgScore) : '—'}
                            </span>
                          </div>
                        </div>

                        {/* Yığılmış Çubuk */}
                        <div className="w-full h-4 bg-gray-100 rounded-lg overflow-hidden flex">
                          {b.byClassCounts.map(seg => {
                            if (seg.count === 0) return null;
                            const wPct = (seg.count / b.total) * 100;
                            return (
                              <div
                                key={`${b.rawCls}_${seg.id}`}
                                style={{
                                  width: `${wPct}%`,
                                  backgroundColor: seg.colorHex
                                }}
                                title={`${b.cleanBranch} • ${seg.name}: ${seg.count} Öğrenci (%${wPct.toFixed(1)})`}
                                className="h-full flex items-center justify-center text-[9px] font-black text-white overflow-hidden"
                              >
                                {wPct >= 12 ? seg.count : ''}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};
