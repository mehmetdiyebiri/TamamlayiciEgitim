import { 
  RahleStudentProfile, 
  RahleDailyEntry, 
  RahleDonusRecord, 
  RahlePageStatus, 
  RahleYuzundenRecord,
  RahleDenemeDailyRecord,
  RahleDenemeSettings,
  RahleDenemeSimulationResult
} from '../types/rahle';

// Format seconds into "M dk S sn"
export function formatDurationSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.round(totalSeconds % 60);
  if (mins === 0) return `${secs} sn`;
  if (secs === 0) return `${mins} dk`;
  return `${mins} dk ${secs < 10 ? '0' : ''}${secs} sn`;
}

// Calculate speed score (0 - 40 pts)
// Kılavuz: Hazır öğrenci: 90 - 120 saniye (1.5 - 2 dk), Başlangıç: ~8 dakika (480 sn)
export function calculateSpeedPoints(durationSeconds: number): number {
  if (durationSeconds <= 90) return 40;
  if (durationSeconds <= 120) {
    return Math.round(40 - ((durationSeconds - 90) / 30) * 4); // 40 -> 36
  }
  if (durationSeconds <= 180) {
    return Math.round(36 - ((durationSeconds - 120) / 60) * 8); // 36 -> 28
  }
  if (durationSeconds <= 240) {
    return Math.round(28 - ((durationSeconds - 180) / 60) * 6); // 28 -> 22
  }
  if (durationSeconds <= 360) {
    return Math.round(22 - ((durationSeconds - 240) / 120) * 8); // 22 -> 14
  }
  if (durationSeconds <= 480) {
    return Math.round(14 - ((durationSeconds - 360) / 120) * 8); // 14 -> 6
  }
  if (durationSeconds <= 600) {
    return Math.round(6 - ((durationSeconds - 480) / 120) * 6); // 6 -> 0
  }
  return 0;
}

// Full evaluation calculation
export function calculateYuzundenIndex(
  durationSeconds: number,
  mahrecScore: number,
  tecvidScore: number
): {
  indexScore: number;
  speedPoints: number;
  mahrecPoints: number;
  tecvidPoints: number;
  readinessStatus: 'hazir' | 'yakinda' | 'gelismekte' | 'hazir_degil';
  estimatedTimeToReady: string;
  feedback: string;
} {
  const speedPoints = calculateSpeedPoints(durationSeconds);
  const mahrecPoints = Math.round((Math.max(1, Math.min(5, mahrecScore)) / 5) * 30);
  const tecvidPoints = Math.round((Math.max(1, Math.min(5, tecvidScore)) / 5) * 30);
  const indexScore = Math.min(100, Math.max(0, speedPoints + mahrecPoints + tecvidPoints));

  const durFormatted = formatDurationSeconds(durationSeconds);

  let readinessStatus: 'hazir' | 'yakinda' | 'gelismekte' | 'hazir_degil';
  let estimatedTimeToReady: string;
  let feedback: string;

  // Hazır: Endeks >= 85, Süre <= 120 sn (2 dk), Mahreç >= 4, Tecvid >= 4
  if (indexScore >= 85 && durationSeconds <= 120 && mahrecScore >= 4 && tecvidScore >= 4) {
    readinessStatus = 'hazir';
    estimatedTimeToReady = 'Hafızlığa Hemen Başlayabilir (HAZIR)';
    feedback = `Maşallah! Öğrenci Kur'an-ı Kerim'in 1 sayfasını ${durFormatted} gibi mükemmel bir sürede (hedef 90-120 sn barajında) okumaktadır. Mahreç durumu (${mahrecScore}/5) fasih ve tecvid uygulaması (${tecvidScore}/5) son derece başarılıdır. Hafızlığa 1. cüzden başlaması tavsiye edilir.`;
  } else if (indexScore >= 70 && durationSeconds <= 180 && mahrecScore >= 3 && tecvidScore >= 3) {
    readinessStatus = 'yakinda';
    estimatedTimeToReady = 'Yaklaşık 1 - 2 Ay İçinde Hazır Olabilir';
    feedback = `Hafızlığa başlama aşamasına çok yakın! 1 sayfa okuma süresi ${durFormatted} ile 90-120 saniye hedefine yaklaşmaktadır. Mahreç (${mahrecScore}/5) ve tecvid (${tecvidScore}/5) temelleri sağlam. Günde 3-5 sayfa sesli ve tempolu yüzünden tekrar ile 4-8 hafta içinde hafızlığa başlatılabilir.`;
  } else if (indexScore >= 50 && durationSeconds <= 300) {
    readinessStatus = 'gelismekte';
    estimatedTimeToReady = 'Yaklaşık 3 - 4 Ay Hazırlık Süreci Gerekir';
    feedback = `Hazırlık süreci devam ediyor. 1 sayfa okuma süresi ${durFormatted} seviyesindedir. Hafızlık ezber yükünü rahat kaldırabilmesi için yüzünden okuma hızının en az 2 dakikanın altına düşürülmesi ve tecvid reflekslerinin hızlandırılması gereklidir.`;
  } else {
    readinessStatus = 'hazir_degil';
    estimatedTimeToReady = 'Yaklaşık 5 - 6+ Ay Hazırlık Eğitimi Gerekir';
    feedback = `Hafızlığa başlamak için henüz erken. Harf mahreçleri (${mahrecScore}/5), tecvid kaideleri (${tecvidScore}/5) ve okuma akıcılığı (${durFormatted}) üzerinde yoğunlaşılmalıdır. Günlük heceli okumadan seri kelime okumaya geçiş egzersizleri yapılmalıdır.`;
  }

  return {
    indexScore,
    speedPoints,
    mahrecPoints,
    tecvidPoints,
    readinessStatus,
    estimatedTimeToReady,
    feedback
  };
}

// Realistic 4-month preparation progression
export function generateMockYuzundenRecords(studentName?: string): RahleYuzundenRecord[] {
  return [
    {
      id: 'prep_2023_11',
      monthPeriod: '2023-11',
      date: '2023-11-20',
      durationMinutes: 7.5,
      durationSeconds: 450,
      durationMinutesPart: 7,
      durationSecondsPart: 30,
      pageNumber: 1,
      mahrecScore: 2,
      tecvidScore: 2,
      speedPoints: 8,
      mahrecPoints: 12,
      tecvidPoints: 12,
      indexScore: 32,
      readinessStatus: 'hazir_degil',
      estimatedTimeToReady: 'Yaklaşık 5 - 6+ Ay Hazırlık Eğitimi Gerekir',
      feedback: 'Hazırlığa yeni başlandı. Sayfa okuma 7 dk 30 sn sürdü. Harf mahreçleri ve tecvid uygulamaları pekiştirilmeli.',
      teacherNotes: 'İlk ay seviye tespiti yapıldı. Boğaz ve dil harfleri talimi başlatıldı.',
      createdAt: '2023-11-20'
    },
    {
      id: 'prep_2023_12',
      monthPeriod: '2023-12',
      date: '2023-12-22',
      durationMinutes: 4.8,
      durationSeconds: 288,
      durationMinutesPart: 4,
      durationSecondsPart: 48,
      pageNumber: 20,
      mahrecScore: 3,
      tecvidScore: 3,
      speedPoints: 19,
      mahrecPoints: 18,
      tecvidPoints: 18,
      indexScore: 55,
      readinessStatus: 'gelismekte',
      estimatedTimeToReady: 'Yaklaşık 3 - 4 Ay Hazırlık Süreci Gerekir',
      feedback: 'Belirgin bir hızlanma var; süre 4 dk 48 sn seviyesine indi. Medler ve tenvin kuralları kavranıyor.',
      teacherNotes: 'Günde 2 sayfa sesli okuma ödevi verildi. Akıcılık gelişiyor.',
      createdAt: '2023-12-22'
    },
    {
      id: 'prep_2024_01',
      monthPeriod: '2024-01',
      date: '2024-01-25',
      durationMinutes: 2.7,
      durationSeconds: 162,
      durationMinutesPart: 2,
      durationSecondsPart: 42,
      pageNumber: 15,
      mahrecScore: 4,
      tecvidScore: 4,
      speedPoints: 30,
      mahrecPoints: 24,
      tecvidPoints: 24,
      indexScore: 78,
      readinessStatus: 'yakinda',
      estimatedTimeToReady: 'Yaklaşık 1 - 2 Ay İçinde Hazır Olabilir',
      feedback: 'Çok güzel ilerleme. Sayfa süresi 2 dk 42 saniyeye düştü. Mahreçler netleşti, tecvid uygulaması başarılı.',
      teacherNotes: 'Son düzlüğe girildi. 120 saniye barajı için günde 5 sayfa tempolu okuma yapılıyor.',
      createdAt: '2024-01-25'
    },
    {
      id: 'prep_2024_02',
      monthPeriod: '2024-02',
      date: '2024-02-28',
      durationMinutes: 1.75,
      durationSeconds: 105,
      durationMinutesPart: 1,
      durationSecondsPart: 45,
      pageNumber: 10,
      mahrecScore: 5,
      tecvidScore: 5,
      speedPoints: 38,
      mahrecPoints: 30,
      tecvidPoints: 30,
      indexScore: 98,
      readinessStatus: 'hazir',
      estimatedTimeToReady: 'Hafızlığa Hemen Başlayabilir (HAZIR)',
      feedback: 'Mükemmel netice! 1 sayfa okuma süresi 1 dk 45 sn (105 saniye). Mahreç ve tecvid fasih. Hafızlığa başlamaya tam hazır.',
      teacherNotes: 'Hafızlık hocasıyla görüşüldü, 1. cüzden ezber başlangıcı onaylandı.',
      createdAt: '2024-02-28'
    }
  ];
}

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

// Check if a profile contains sample/mock data
export function hasMockData(profile?: RahleStudentProfile | null): boolean {
  if (!profile) return false;
  const hasMockYuzunden = profile.yuzundenRecords?.some(r => r.id.startsWith('prep_2023_') || r.id.startsWith('prep_2024_'));
  const hasMockCuzProgress = (profile.hamSayisi === 22 && profile.hasSayisi === 60) || 
    (profile.kacinciDonuste === 3 && Object.keys(profile.cuzPageProgress || {}).length > 0 && profile.dailyEntries && Object.keys(profile.dailyEntries).length >= 40);
  const hasMockDaily = Object.keys(profile.dailyEntries || {}).some(k => k.startsWith('entry_') && Object.keys(profile.dailyEntries || {}).length >= 45);
  return Boolean(hasMockYuzunden || hasMockCuzProgress || hasMockDaily);
}

// Clean all sample/mock data from a profile so it starts completely fresh
export function cleanMockProfile(profile: RahleStudentProfile): RahleStudentProfile {
  const isMock = hasMockData(profile);
  
  // Filter out any mock yuzunden records
  const cleanYuzunden = (profile.yuzundenRecords || []).filter(
    r => !r.id.startsWith('prep_2023_') && !r.id.startsWith('prep_2024_01') && !r.id.startsWith('prep_2024_02')
  );

  // If daily entries was the generated mock batch
  let cleanDaily = profile.dailyEntries || {};
  if (Object.keys(cleanDaily).length >= 40 && Object.values(cleanDaily).some(e => e.id.startsWith('entry_'))) {
    cleanDaily = {};
  }

  // If cuzPageProgress was the mock initial progress
  let cleanCuz = profile.cuzPageProgress || {};
  let cleanHam = profile.hamSayisi || 0;
  let cleanHas = profile.hasSayisi || 0;
  let cleanDonus = profile.kacinciDonuste || 1;

  if (isMock || (profile.hamSayisi === 22 && profile.hasSayisi === 60)) {
    cleanCuz = {};
    cleanHam = 0;
    cleanHas = 0;
    cleanDonus = 1;
  }

  let cleanHistory = profile.donusHistory || [];
  if (cleanHistory.length === 3 && cleanHistory[0].startDate === '2023-10-01') {
    cleanHistory = [];
  }

  return {
    ...profile,
    kacinciDonuste: cleanDonus,
    hamSayisi: cleanHam,
    hasSayisi: cleanHas,
    dailyEntries: cleanDaily,
    donusHistory: cleanHistory,
    cuzPageProgress: cleanCuz,
    yuzundenRecords: cleanYuzunden,
    notes: profile.notes === 'Kabiliyetli ve disiplinli bir öğrenci. Has derslerine özen gösteriyor.' ? '' : (profile.notes || ''),
    advisorTeacher: profile.advisorTeacher === 'Hafız Hocası' ? '' : (profile.advisorTeacher || '')
  };
}

// Create a default student profile (Clean and fresh - no mock data)
export function createDefaultRahleProfile(studentName: string, className: string = 'Hafızlık-A'): RahleStudentProfile {
  return {
    studentName,
    className,
    hafizlikBaslamaTarihi: '',
    kacSayfaylaGidiyor: 1,
    kacinciDonuste: 1,
    donusBaslamaTarihi: '',
    hamSayisi: 0,
    hasSayisi: 0,
    status: 'devam_ediyor',
    dailyEntries: {},
    donusHistory: [],
    cuzPageProgress: {},
    yuzundenRecords: [],
    denemeCuzuRecords: [],
    advisorTeacher: '',
    targetCompletionDate: '',
    notes: ''
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
      return { label: 'Gelmedi', short: 'G', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
    case 'pazar':
      return { label: 'Pazar', short: 'P', bg: 'bg-gray-100 text-gray-500 border-gray-200' };
    case 'kayitsiz_sure':
      return { label: 'Kayıtsız Süre', short: 'KS', bg: 'bg-gray-100 text-gray-600 border-gray-200' };
    default:
      return { label: 'Girilmedi', short: '-', bg: 'bg-gray-50 text-gray-400 border-gray-200' };
  }
}

// -------------------------------------------------------------
// DENEME CÜZÜ (TRIAL JUZ) EVALUATION & SIMULATION ENGINE
// -------------------------------------------------------------

// Calculate simulation results based on 1-month Deneme Cüzü records
export function calculateDenemeSimulation(
  records: RahleDenemeDailyRecord[],
  customSettings?: Partial<RahleDenemeSettings>
): RahleDenemeSimulationResult {
  const activeRecords = records || [];
  const totalDaysEvaluated = activeRecords.length;

  if (totalDaysEvaluated === 0) {
    return {
      overallPotentialScore: 0,
      potentialLevel: 'destek_gerekli',
      potentialTitle: 'Henüz Değerlendirme Verisi Girilmedi',
      estimatedCompletionMonthsMin: 24,
      estimatedCompletionMonthsMax: 36,
      estimatedCompletionDate: 'Belirsiz',
      recommendedPagesPerTurn: 1,
      recommendedDailyHours: 4,
      dailyEzberAvg: 0,
      hasRetentionAvg: 0,
      avgGalatCount: 0,
      attendanceRate: 0,
      totalDaysEvaluated: 0,
      strengths: [],
      risksAndSuggestions: ['1 aylık Deneme Cüzü takvimine günlük ders değerlendirmelerini girerek simülasyonu başlatın.'],
      verdictSummary: 'Öğrencinin hafızlık potansiyelini ve tahmini bitirme süresini hesaplamak için en az 7-10 günlük deneme cüzü verisi girilmesi önerilir.'
    };
  }

  // 1. Günlük Ezber Ortalaması (0-100)
  const ezberSum = activeRecords.reduce((acc, r) => acc + (r.dailyEzberScore ?? 0), 0);
  const dailyEzberAvg = Math.round(ezberSum / totalDaysEvaluated);

  // 2. Has Hatırlama Ortalaması (0-100)
  const hasSum = activeRecords.reduce((acc, r) => acc + (r.hasRetentionScore ?? 0), 0);
  const hasRetentionAvg = Math.round(hasSum / totalDaysEvaluated);

  // 3. Ortalama Galat (Hata) Sayısı
  const galatSum = activeRecords.reduce((acc, r) => acc + (r.galatCount ?? 0), 0);
  const avgGalatCount = Number((galatSum / totalDaysEvaluated).toFixed(1));
  // Galat puanı: 0 galat -> 100, her galat ~18 puan kırar, minimum 0
  const galatScore = Math.max(0, Math.min(100, Math.round(100 - avgGalatCount * 18)));

  // 4. Ders Devamlılığı (Tam verdi = 100, Eksik = 60, Mazeretli = 40, Kaldı/Gelmedi = 0)
  const attendedScoreSum = activeRecords.reduce((acc, r) => {
    if (r.attendanceStatus === 'verdi') return acc + 100;
    if (r.attendanceStatus === 'eksik') return acc + 60;
    if (r.attendanceStatus === 'izinli') return acc + 40;
    return acc;
  }, 0);
  const attendanceRate = Math.round(attendedScoreSum / totalDaysEvaluated);

  // Genel Hafızlık Potansiyel Skoru (0-100)
  // Ağırlıklar: Günlük Ezber %30, Has Durumu %30, Galat (Telaffuz Hassasiyeti) %20, Devamlılık %20
  const overallPotentialScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (dailyEzberAvg * 0.30) +
        (hasRetentionAvg * 0.30) +
        (galatScore * 0.20) +
        (attendanceRate * 0.20)
      )
    )
  );

  let potentialLevel: 'ustun' | 'guclu' | 'dengeli' | 'destek_gerekli' | 'hazir_degil';
  let potentialTitle: string;
  let estimatedCompletionMonthsMin: number;
  let estimatedCompletionMonthsMax: number;
  let recommendedPagesPerTurn: number;
  let recommendedDailyHours: number;
  let verdictSummary: string;
  const strengths: string[] = [];
  const risksAndSuggestions: string[] = [];

  // Güçlü yönler analizi
  if (dailyEzberAvg >= 85) strengths.push('Günlük ezber kapasitesi çok yüksek; yeni sayfayı hızlı kavrayıp ezberleyebiliyor.');
  if (hasRetentionAvg >= 85) strengths.push('Has tutma (dünkü dersi hatırlama) refleksi çok kuvvetli; ezber zihnine sağlam yerleşiyor.');
  if (avgGalatCount <= 1.0) strengths.push('Galed (telaffuz hata) sayısı sıfıra yakın; fasih okuma, mahreç ve tecvid disiplini kusursuz.');
  if (attendanceRate >= 90) strengths.push('Ders verme devamlılığı ve disiplini mükemmel; kesintisiz ve firesiz ders veriyor.');
  if (strengths.length === 0) strengths.push('Düzenli rehberlik ve sıkı takip ile gelişim potansiyeli mevcut.');

  // Riskler ve öneriler analizi
  if (hasRetentionAvg < 70) {
    risksAndSuggestions.push('Has (dünkü dersi hatırlama) puanı zayıf seyrediyor. Akşam ezberinden sonra sabah ders vermeden önce en az 2 tam pekiştirme tekrarı yapılmalıdır.');
  }
  if (avgGalatCount >= 2.0) {
    risksAndSuggestions.push(`Sayfa başına ortalama ${avgGalatCount} galed (telaffuz hatası) tespit edildi. Ezbere geçmeden önce hocadan yüzünden talim dinletisi alınmalıdır.`);
  }
  if (attendanceRate < 75) {
    risksAndSuggestions.push('Ders verme devamlılığında aksamalar ve devamsızlıklar var. Hafızlıkta en kritik kural olan "firesiz her gün ders verme" disiplini oturtulmalıdır.');
  }
  if (dailyEzberAvg < 65) {
    risksAndSuggestions.push('Günlük ham ezberi yetiştirmekte zorlanıyor. Günlük çalışma süresi artırılmalı veya sayfa yarım sayfaya bölünerek tempo alıştırılmalıdır.');
  }
  if (risksAndSuggestions.length === 0) {
    risksAndSuggestions.push('Mevcut yüksek temponun korunması ve hafızlık 1. cüzüne güvenle başlanması tavsiye edilir.');
  }

  // Derecelendirme ve Tahmini Süre Projeksiyonu
  if (overallPotentialScore >= 88) {
    potentialLevel = 'ustun';
    potentialTitle = 'Üstün Hafızlık Potansiyeli (Çok Hızlı / Güçlü Hafız)';
    estimatedCompletionMonthsMin = 10;
    estimatedCompletionMonthsMax = 14;
    recommendedPagesPerTurn = 2;
    recommendedDailyHours = 3.5;
    verdictSummary = 'Tebrikler! Öğrenci Deneme Cüzü sürecinde hem günlük ezber kabiliyeti, hem dünkü dersi hatırlama (has) gücü, hem de düşük galat sayısı ile üstün bir başarı sergilemiştir. Hafızlık programına 1. cüzden güvenle başlatılabilir; 2 sayfa usulüne hızla geçiş yapabilir.';
  } else if (overallPotentialScore >= 75) {
    potentialLevel = 'guclu';
    potentialTitle = 'Güçlü / Standart Hızlı Hafızlık Potansiyeli';
    estimatedCompletionMonthsMin = 14;
    estimatedCompletionMonthsMax = 18;
    recommendedPagesPerTurn = 1;
    recommendedDailyHours = 4.0;
    verdictSummary = 'Öğrencinin hafızlık potansiyeli sağlam ve umut verici. Deneme cüzü verileri standart bir tempoda 14-18 ay içerisinde hafızlığını tamamlayabileceğini göstermektedir. 1 sayfa usulüyle başlanıp ilk 5 dönüşten sonra 2 sayfaya yükseltilmesi uygundur.';
  } else if (overallPotentialScore >= 60) {
    potentialLevel = 'dengeli';
    potentialTitle = 'Dengeli / Düzenli Takip Gerektiren Hafızlık Potansiyeli';
    estimatedCompletionMonthsMin = 19;
    estimatedCompletionMonthsMax = 24;
    recommendedPagesPerTurn = 1;
    recommendedDailyHours = 4.5;
    verdictSummary = 'Öğrenci hafızlık yapabilecek kapasitededir ancak ezberin kalıcı olması için Has tekrarlarına ve ders devamlılığına özel ihtimam gösterilmelidir. Yaklaşık 2 yıllık dengeli bir süreç öngörülmektedir.';
  } else if (overallPotentialScore >= 45) {
    potentialLevel = 'destek_gerekli';
    potentialTitle = 'Destek & Takviye Gerektiren Hafızlık Potansiyeli';
    estimatedCompletionMonthsMin = 26;
    estimatedCompletionMonthsMax = 32;
    recommendedPagesPerTurn = 1;
    recommendedDailyHours = 5.0;
    verdictSummary = 'Deneme cüzü sürecinde ezber çıkarma veya dünü hatırlamada zorlanmalar gözlemlenmiştir. Doğrudan ağır hafızlık temposuna girmeden önce 2-3 haftalık ek takviye ve pekiştirme yapılması veya yarım sayfa usulüyle başlanması tavsiye edilir.';
  } else {
    potentialLevel = 'hazir_degil';
    potentialTitle = 'Hafızlığa Henüz Hazır Değil (Hazırlık Tekrarı Tavsiyesi)';
    estimatedCompletionMonthsMin = 34;
    estimatedCompletionMonthsMax = 42;
    recommendedPagesPerTurn = 1;
    recommendedDailyHours = 5.0;
    verdictSummary = 'Öğrencinin mevcut 1 aylık deneme cüzü performansı, tam hafızlık yükünü taşımakta zorlanacağını göstermektedir. Yüzünden okuma akıcılığı, mahreç talimi ve kısa sure ezberleri ile zihinsel hazırlığın bir süre daha sürdürülmesi öğrencinin menfaatinedir.';
  }

  // Tahmini Tamamlama Tarihi (Bugünden itibaren min-max ortalama ay ekle)
  const today = new Date();
  const avgMonths = Math.round((estimatedCompletionMonthsMin + estimatedCompletionMonthsMax) / 2);
  const targetDateObj = new Date(today);
  targetDateObj.setMonth(targetDateObj.getMonth() + avgMonths);
  const estimatedCompletionDate = targetDateObj.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  return {
    overallPotentialScore,
    potentialLevel,
    potentialTitle,
    estimatedCompletionMonthsMin,
    estimatedCompletionMonthsMax,
    estimatedCompletionDate,
    recommendedPagesPerTurn,
    recommendedDailyHours,
    dailyEzberAvg,
    hasRetentionAvg,
    avgGalatCount,
    attendanceRate,
    totalDaysEvaluated,
    strengths,
    risksAndSuggestions,
    verdictSummary
  };
}

// Generate realistic 26-day Amme Cüzü trial records for demonstration
export function generateMockDenemeRecords(studentName?: string): RahleDenemeDailyRecord[] {
  const ammeSurahs = [
    { page: 1, surah: 'Nebe Suresi (1-30)', galat: 0, ezber: 95, has: 90, status: 'verdi' },
    { page: 2, surah: 'Nebe (31-40) & Naziat (1-15)', galat: 1, ezber: 90, has: 85, status: 'verdi' },
    { page: 3, surah: 'Naziat Suresi (16-46)', galat: 1, ezber: 88, has: 85, status: 'verdi' },
    { page: 4, surah: 'Abese Suresi (1-42)', galat: 0, ezber: 95, has: 90, status: 'verdi' },
    { page: 5, surah: 'Tekvir Suresi (1-29)', galat: 0, ezber: 92, has: 90, status: 'verdi' },
    { page: 6, surah: 'İnfitar & Mutaffifin (1-17)', galat: 2, ezber: 80, has: 75, status: 'verdi' },
    { page: 7, surah: 'Mutaffifin Suresi (18-36)', galat: 1, ezber: 85, has: 80, status: 'verdi' },
    { page: 8, surah: 'İnşikak Suresi (1-25)', galat: 0, ezber: 95, has: 90, status: 'verdi' },
    { page: 9, surah: 'Büruc Suresi (1-22)', galat: 1, ezber: 90, has: 88, status: 'verdi' },
    { page: 10, surah: 'Tarık & A\'la Suresi', galat: 0, ezber: 95, has: 92, status: 'verdi' },
    { page: 11, surah: 'Gaşiye & Fecr (1-14)', galat: 1, ezber: 88, has: 85, status: 'verdi' },
    { page: 12, surah: 'Fecr Suresi (15-30)', galat: 0, ezber: 92, has: 90, status: 'verdi' },
    { page: 13, surah: 'Beled & Şems Suresi', galat: 0, ezber: 95, has: 95, status: 'verdi' },
    { page: 14, surah: 'Leyl & Duha Suresi', galat: 1, ezber: 90, has: 88, status: 'verdi' },
    { page: 15, surah: 'İnşirah, Tin, Alak', galat: 2, ezber: 82, has: 80, status: 'verdi' },
    { page: 16, surah: 'Kadir, Beyyine Suresi', galat: 1, ezber: 85, has: 82, status: 'verdi' },
    { page: 17, surah: 'Zilzal, Adiyat, Karia', galat: 0, ezber: 95, has: 90, status: 'verdi' },
    { page: 18, surah: 'Tekasür, Asr, Hümeze, Fil', galat: 0, ezber: 95, has: 95, status: 'verdi' },
    { page: 19, surah: 'Kureyş, Maun, Kevser, Kafirun', galat: 0, ezber: 98, has: 95, status: 'verdi' },
    { page: 20, surah: 'Nasr, Tebbet, İhlas, Felak, Nas', galat: 0, ezber: 100, has: 100, status: 'verdi' },
    { page: 21, surah: 'Genel Haslama 1 (Nebe - İnşikak)', galat: 1, ezber: 90, has: 90, status: 'verdi' },
    { page: 22, surah: 'Genel Haslama 2 (Büruc - Nas)', galat: 0, ezber: 95, has: 95, status: 'verdi' },
    { page: 23, surah: 'Tam Cüz Pişirme Tekrarı', galat: 1, ezber: 92, has: 92, status: 'verdi' },
    { page: 24, surah: 'Komisyon Önü Cüz Dinletisi', galat: 0, ezber: 96, has: 95, status: 'verdi' }
  ];

  const now = new Date();
  const records: RahleDenemeDailyRecord[] = [];

  ammeSurahs.forEach((item, index) => {
    const dayDate = new Date(now);
    dayDate.setDate(dayDate.getDate() - (ammeSurahs.length - index));
    const dateStr = dayDate.toISOString().split('T')[0];

    records.push({
      id: `deneme_${index + 1}_${dateStr}`,
      date: dateStr,
      dayNumber: index + 1,
      juzNo: 30,
      pageNo: item.page,
      surahName: item.surah,
      dailyEzberScore: item.ezber,
      dailyEzberStatus: item.ezber >= 90 ? 'tam' : (item.ezber >= 75 ? 'iyi' : 'yarim'),
      hasRetentionScore: item.has,
      hasStatus: item.has >= 90 ? 'cok_kuvvetli' : (item.has >= 80 ? 'iyi' : 'orta'),
      galatCount: item.galat,
      galatSeverity: item.galat === 0 ? 'yok' : (item.galat === 1 ? 'hafif' : 'orta'),
      galatNotes: item.galat === 0 ? 'Hatasız, fasih okuyuş' : (item.galat === 1 ? '1 ufak med/tutma takılması' : '2 lahn hatası, düzeltildi'),
      attendanceStatus: item.status as any,
      teacherNote: `${index + 1}. gün deneme dersi başarıyla dinlendi. Has durumu dengeli.`,
      evaluatedBy: 'Hafızlık Eğiticisi',
      createdAt: dateStr
    });
  });

  return records;
}
