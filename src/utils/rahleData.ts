import { RahleStudentProfile, RahleDailyEntry, RahleDonusRecord, RahlePageStatus } from '../types/rahle';

// Generate default 30 cuz with 20 pages each
export function createInitialCuzProgress(kacinciDonus: number = 1, kacSayfayla: number = 1): Record<number, Record<number, RahlePageStatus>> {
  const result: Record<number, Record<number, RahlePageStatus>> = {};
  
  for (let cuz = 1; cuz <= 30; cuz++) {
    result[cuz] = {};
    for (let page = 1; page <= 20; page++) {
      // In classical ottoman method, pages are memorized in turns (usually from page 20 downwards or page 1 upwards)
      if (kacinciDonus > 1) {
        if (page > 20 - (kacinciDonus - 1)) {
          result[cuz][page] = 'has';
        } else if (page === 20 - (kacinciDonus - 1)) {
          result[cuz][page] = 'ham';
        } else {
          result[cuz][page] = 'unmemorized';
        }
      } else {
        if (cuz <= 15 && page === 20) {
          result[cuz][page] = 'ham';
        } else {
          result[cuz][page] = 'unmemorized';
        }
      }
    }
  }
  return result;
}

// Generate realistic mock daily entries for the last 60 days
export function generateMockDailyEntries(studentName: string, kacinciDonus: number = 1): Record<string, RahleDailyEntry> {
  const entries: Record<string, RahleDailyEntry> = {};
  const today = new Date();

  for (let i = 50; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 is Sunday

    if (dayOfWeek === 0) {
      // Pazar
      entries[dateStr] = {
        id: `entry_${dateStr}`,
        date: dateStr,
        status: 'pazar',
        donusNo: kacinciDonus,
        createdAt: dateStr
      };
    } else if (i % 17 === 0) {
      // Tatil
      entries[dateStr] = {
        id: `entry_${dateStr}`,
        date: dateStr,
        status: 'tatil',
        donusNo: kacinciDonus,
        teacherNote: 'Resmi Tatil',
        createdAt: dateStr
      };
    } else if (i % 13 === 0) {
      // İzinli / Hasta
      entries[dateStr] = {
        id: `entry_${dateStr}`,
        date: dateStr,
        status: i % 26 === 0 ? 'hasta' : 'izinli',
        donusNo: kacinciDonus,
        teacherNote: 'Mazeretli devamsızlık',
        createdAt: dateStr
      };
    } else if (i % 19 === 0) {
      // Kaldı
      entries[dateStr] = {
        id: `entry_${dateStr}`,
        date: dateStr,
        status: 'kaldi',
        donusNo: kacinciDonus,
        cuzNo: (50 - i) % 30 + 1,
        pageNo: 20,
        mistakeCount: 4,
        score: 60,
        teacherNote: 'Ezber zayıf, takılma çok oldu. Yarın tekrar verilecek.',
        createdAt: dateStr
      };
    } else {
      // Okudu (Başarılı ders)
      const cuzNo = (50 - i) % 30 + 1;
      entries[dateStr] = {
        id: `entry_${dateStr}`,
        date: dateStr,
        status: 'okudu',
        donusNo: kacinciDonus,
        cuzNo,
        pageNo: 20 - (kacinciDonus - 1),
        pageCount: 1,
        hamCuz: cuzNo,
        hamPage: 20 - (kacinciDonus - 1),
        hasCuzRange: `${Math.max(1, cuzNo - 4)}. - ${cuzNo}. Cüz arası has`,
        mistakeCount: i % 3 === 0 ? 1 : 0,
        score: 85 + (i % 15),
        teacherNote: 'Gayet akıcı okudu, tecvid ve mahreçler güzel.',
        createdAt: dateStr
      };
    }
  }

  return entries;
}

// Generate realistic mock history
export function generateMockDonusHistory(): RahleDonusRecord[] {
  return [
    {
      siraNo: 1,
      startDate: '2023-10-01',
      endDate: '2023-11-15',
      totalDays: 45,
      missedDays: 6,
      activeDays: 39,
      hamCount: 30,
      hasCount: 0,
      pagesPerTurn: 1,
      totalCuz: 30,
      totalPages: 30,
      status: 'tamamlandi',
      note: '1. Dönüş başarıyla tamamlandı (Her cüzün 20. sayfası verildi).'
    },
    {
      siraNo: 2,
      startDate: '2023-11-16',
      endDate: '2023-12-30',
      totalDays: 44,
      missedDays: 5,
      activeDays: 39,
      hamCount: 30,
      hasCount: 30,
      pagesPerTurn: 1,
      totalCuz: 30,
      totalPages: 60,
      status: 'tamamlandi',
      note: '2. Dönüş tamamlandı. Has tekrarları pekiştirildi.'
    },
    {
      siraNo: 3,
      startDate: '2024-01-02',
      endDate: undefined,
      totalDays: 32,
      missedDays: 4,
      activeDays: 28,
      hamCount: 22,
      hasCount: 52,
      pagesPerTurn: 1,
      totalCuz: 22,
      totalPages: 82,
      status: 'devam_ediyor',
      note: '3. Dönüş devam ediyor (18. sayfa veriliyor).'
    }
  ];
}

// Create a default student profile
export function createDefaultRahleProfile(studentName: string, className: string = 'Hafızlık-A'): RahleStudentProfile {
  return {
    studentName,
    className,
    hafizlikBaslamaTarihi: '2023-10-01',
    kacSayfaylaGidiyor: 1,
    kacinciDonuste: 3,
    donusBaslamaTarihi: '2024-01-02',
    hamSayisi: 22,
    hasSayisi: 60,
    status: 'devam_ediyor',
    dailyEntries: generateMockDailyEntries(studentName, 3),
    donusHistory: generateMockDonusHistory(),
    cuzPageProgress: createInitialCuzProgress(3, 1),
    advisorTeacher: 'Hafız Hocası',
    targetCompletionDate: '2025-06-15',
    notes: 'Kabiliyetli ve disiplinli bir öğrenci. Has derslerine özen gösteriyor.'
  };
}

// Calculate total memorized pages and percentage
export function calculateHafizlikStats(profile: RahleStudentProfile) {
  let totalHam = 0;
  let totalHas = 0;
  const cuzProgress = profile.cuzPageProgress || {};

  for (let c = 1; c <= 30; c++) {
    const pages = cuzProgress[c] || {};
    for (let p = 1; p <= 20; p++) {
      if (pages[p] === 'has') totalHas++;
      else if (pages[p] === 'ham') totalHam++;
    }
  }

  // Standard mushaf ~600 pages (30 cüz x 20 pages)
  const totalMemorizedPages = totalHam + totalHas;
  const percentage = Math.min(100, Math.round((totalMemorizedPages / 600) * 100));

  // Count lessons given in daily entries
  const entries = Object.values(profile.dailyEntries || {});
  const totalLessonsGiven = entries.filter(e => e.status === 'okudu').length;
  const totalKaldi = entries.filter(e => e.status === 'kaldi').length;
  const totalAbsent = entries.filter(e => ['gelmedi', 'hasta', 'izinli'].includes(e.status)).length;

  return {
    totalHam,
    totalHas,
    totalMemorizedPages,
    percentage,
    remainingPages: Math.max(0, 600 - totalMemorizedPages),
    totalLessonsGiven,
    totalKaldi,
    totalAbsent
  };
}

// HETS Status label and color helper
export function getStatusBadge(status: string) {
  switch (status) {
    case 'okudu':
      return { label: 'Okudu', short: 'Ders', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'kaldi':
      return { label: 'Kaldı', short: 'K', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
    case 'tatil':
      return { label: 'Tatil', short: 'T', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
    case 'izinli':
      return { label: 'İzinli', short: 'İ', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'hasta':
      return { label: 'Hasta', short: 'H', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
    case 'gelmedi':
      return { label: 'Gelmedi', short: 'G', bg: 'bg-gray-200 text-gray-800 border-gray-400' };
    case 'pazar':
      return { label: 'Pazar', short: 'P', bg: 'bg-gray-100 text-gray-500 border-gray-300' };
    case 'kayitsiz_sure':
      return { label: 'Kayıtsız Süre', short: 'KS', bg: 'bg-slate-100 text-slate-600 border-slate-300' };
    default:
      return { label: 'Girilmedi', short: '-', bg: 'bg-gray-50 text-gray-400 border-gray-200' };
  }
}
