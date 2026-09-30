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
