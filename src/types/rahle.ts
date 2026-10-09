export type RahleDailyStatus = 
  | 'okudu' 
  | 'kaldi' 
  | 'tatil' 
  | 'izinli' 
  | 'hasta' 
  | 'gelmedi' 
  | 'pazar' 
  | 'kayitsiz_sure';

export interface RahleDailyEntry {
  id: string;
  date: string; // YYYY-MM-DD
  status: RahleDailyStatus;
  donusNo: number; // Kaçıncı dönüşte olduğu (HETS parantez içi gösterim)
  cuzNo?: number; // 1 - 30
  pageNo?: number; // 1 - 20
  pageCount?: number; // Kaç sayfa okundu
  hamCuz?: number;
  hamPage?: number;
  hasCuzRange?: string; // Örn: "1. - 3. Cüzler Has"
  mistakeCount?: number; // Takılma / hata sayısı
  score?: number; // 1 - 100 arası değerlendirme puanı
  teacherNote?: string;
  createdAt: string;
}

export interface RahleDonusRecord {
  siraNo: number; // 1, 2, 3...
  startDate: string;
  endDate?: string;
  totalDays: number; // Kaç günde tamamlandı
  missedDays: number; // Ders vermediği gün sayısı
  activeDays: number; // Ders verdiği gün sayısı
  hamCount: number; // Ham sayısı
  hasCount: number; // Has / Pişmiş sayısı
  pagesPerTurn: number; // Kaç sayfayla gidiyor (1..20)
  totalCuz: number; // Okunan cüz sayısı (örn: 30)
  totalPages: number; // Okunan toplam sayfa
  status: 'devam_ediyor' | 'tamamlandi';
  note?: string;
}

export type RahlePageStatus = 'unmemorized' | 'ham' | 'has';

export interface RahleYuzundenRecord {
  id: string;
  monthPeriod: string; // Örn: "2024-03" veya "Mart 2024"
  date: string; // YYYY-MM-DD
  durationMinutes: number; // Ondalıklı dakika (1.0 - 10.0, örn: 1.75 dk)
  durationSeconds: number; // Toplam saniye (örn: 105 sn)
  durationMinutesPart: number; // Dakika kısmı (örn: 1)
  durationSecondsPart: number; // Saniye kısmı (örn: 45)
  pageNumber?: number; // Ölçüm yapılan sayfa no
  mahrecScore: number; // 1 - 5 arasında ölçekli
  tecvidScore: number; // 1 - 5 arasında ölçekli
  indexScore: number; // 0 - 100 arası hesaplanan Hafızlığa Hazırlık Endeks Puanı
  speedPoints: number; // Hız bileşeni (max 40)
  mahrecPoints: number; // Mahreç bileşeni (max 30)
  tecvidPoints: number; // Tecvid bileşeni (max 30)
  readinessStatus: 'hazir' | 'yakinda' | 'gelismekte' | 'hazir_degil';
  estimatedTimeToReady: string; // Örn: "Hafızlığa Hemen Başlayabilir", "1 - 2 Ay İçinde Hazır Olabilir"
  feedback: string; // Öğrenciye özel pedagojik dönüt ve değerlendirme
  teacherNotes?: string; // Öğretmenin özel gözlem notu
  createdAt: string;
}

export interface RahleDenemeDailyRecord {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number; // 1 - 30
  juzNo?: number; // Varsayılan 30 (Amme Cüzü)
  pageNo?: number; // 1 - 20 (Cüz sayfası)
  surahName?: string; // Örn: Nebe, Naziat, Abese...

  // 1. Günlük Ezberini yapabilme (Ham)
  dailyEzberScore: number; // 0 - 100
  dailyEzberStatus: 'tam' | 'iyi' | 'yarim' | 'yapamadi';

  // 2. Bir önceki günkü Ezberini hatırlama düzeyi (Has durumu)
  hasRetentionScore: number; // 0 - 100
  hasStatus: 'cok_kuvvetli' | 'iyi' | 'orta' | 'zayif' | 'okunamadi';

  // 3. Ezberi verirken yaptığı Galed’ler (Telaffuz ve tecvid hata sayısı)
  galatCount: number; // 0, 1, 2, 3, 4, 5+
  galatSeverity?: 'yok' | 'hafif' | 'orta' | 'agir';
  galatNotes?: string;

  // 4. Ders Verebilme Devamlılığı
  attendanceStatus: 'verdi' | 'eksik' | 'kaldi' | 'izinli' | 'gelmedi';

  teacherNote?: string;
  evaluatedBy?: string;
  createdAt: string;
}

export interface RahleDenemeSettings {
  targetJuz: number; // Varsayılan 30 (Amme Cüzü)
  evaluationMonth: string; // Örn: "2024-10" veya "Ekim 2024"
  studyDaysPerWeek: number; // 5 veya 6 gün
  dailyTargetPages: number; // 1 sayfa
  teacherOverallNote?: string; // Hoca / Eğitici genel kanaat ve veli bilgilendirme notu
  commissionNote?: string; // Komisyon / idare onay notu
}

export interface RahleDenemeSimulationResult {
  overallPotentialScore: number; // 0 - 100
  potentialLevel: 'ustun' | 'guclu' | 'dengeli' | 'destek_gerekli' | 'hazir_degil';
  potentialTitle: string;
  estimatedCompletionMonthsMin: number;
  estimatedCompletionMonthsMax: number;
  estimatedCompletionDate: string;
  recommendedPagesPerTurn: number;
  recommendedDailyHours: number;
  dailyEzberAvg: number;
  hasRetentionAvg: number;
  avgGalatCount: number;
  attendanceRate: number;
  totalDaysEvaluated: number;
  strengths: string[];
  risksAndSuggestions: string[];
  verdictSummary: string;
}

export interface RahleStudentProfile {
  studentName: string;
  className: string;
  hafizlikBaslamaTarihi: string; // 1. cüzün 1. sayfasını okuduğu tarih
  hafizlikBitirmeTarihi?: string;
  kacSayfaylaGidiyor: number; // 1, 2, 3...
  kacinciDonuste: number; // 1, 2, 3...
  donusBaslamaTarihi: string;
  donusBitirmeTarihi?: string;
  hamSayisi: number;
  hasSayisi: number;
  status: 'devam_ediyor' | 'mezun' | 'ayrildi' | 'onay_bekliyor';
  dailyEntries: Record<string, RahleDailyEntry>; // Tarih bazlı kayıtlar (YYYY-MM-DD)
  donusHistory: RahleDonusRecord[]; // HETS geçmiş dönüş istatistikleri
  cuzPageProgress?: Record<number, Record<number, RahlePageStatus>>; // cüz (1..30) -> sayfa (1..20)
  yuzundenRecords?: RahleYuzundenRecord[]; // Yüzünden Okuma & Hafızlık Hazırlık Değerlendirmeleri
  denemeCuzuRecords?: RahleDenemeDailyRecord[]; // Deneme Cüzü 1 Aylık Değerlendirme Kayıtları
  denemeCuzuSettings?: RahleDenemeSettings;
  targetCompletionDate?: string;
  advisorTeacher?: string;
  notes?: string;
}

export interface RahleClassStats {
  totalStudents: number;
  activeHafizCount: number;
  averageProgressPercentage: number;
  todayLessonGivenCount: number;
  todayAbsentCount: number;
}
