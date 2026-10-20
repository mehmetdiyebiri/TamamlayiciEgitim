export interface PusulaExam {
  id: string;
  name: string;
  date: string;
  type: 'TYT' | 'AYT' | 'LGS' | 'KPSS' | 'AGS' | 'Branş';
  branchType?: string; // e.g. "Matematik", "Türkçe"
  scores: Record<string, number>; // subject -> net
  detailedScores?: Record<string, { d: number; y: number; b?: number; net: number }>; // detailed D/Y/B
  mistakeTopics?: string[]; // topics where questions were lost
  topicMistakesBySubject?: Record<string, string[]>; // subject -> list of topics
  totalNet: number;
  weakAreas?: string[]; // identified weak topics / areas
  feedbackText?: string; // generated / customized coaching feedback
  generatedPlanItems?: PusulaPlanItem[]; // generated study tasks
}

export interface PusulaPlanItem {
  id: string;
  day: 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma' | 'Cumartesi' | 'Pazar';
  subject: string;
  topic?: string;
  resource?: string;
  targetCount?: number; // target questions
  targetMinutes?: number;
  completed?: boolean;
  type: 'routine' | 'study' | 'exam' | 'custom';
  notes?: string;
}

export interface PusulaTopicProgress {
  seen: boolean;
  status: 'unstarted' | 'in_progress' | 'completed' | 'needs_review';
  solvedQuestions: number;
  targetQuestions: number;
  resources: string[];
  resourceStatus?: Record<string, 'done' | 'half' | 'planned' | 'none'>;
}

export interface PusulaCoachingNote {
  id: string;
  date: string;
  title: string;
  sessionType: 'Birebir Koçluk' | 'Hedef & Motivasyon' | 'Deneme Değerlendirmesi' | 'Sınav Kaygısı' | 'Veli Görüşmesi' | 'Genel';
  summary: string;
  actionItems: string[]; // decisions / homework
  nextMeetingDate?: string;
}

export interface PusulaStudentProfile {
  studentName: string;
  className: string;
  targetSchool?: string; // e.g. "Hacettepe Tıp" or "Galatasaray Lisesi"
  targetScoreOrNet?: string; // e.g. "105 Net / 500 Puan"
  weeklyQuestionGoal: number;
  currentCategory: 'YKS' | 'LGS' | '11. Sınıf' | '10. Sınıf' | '9. Sınıf' | 'KPSS' | 'AGS';
  exams: PusulaExam[];
  weeklyPlan: PusulaPlanItem[];
  curriculumProgress: Record<string, Record<string, PusulaTopicProgress>>; // subject -> topicName -> progress
  subjectResources?: Record<string, string[]>; // subject -> list of assigned resource names
  coachingNotes: PusulaCoachingNote[];
  testResults: Record<string, any>;
}

export interface PusulaQuestionAnalysisDef {
  questionNumber: number;
  outcome: string; // Öğrenme Çıktısı / Süreç Bileşeni / Kazanım
  maxScore: number; // Soru Puan Değeri (örn: 10, 12, 16)
}

export interface PusulaStudentExamRow {
  id: string;
  studentNumber: string; // Okul No
  studentName: string; // Ad Soyad
  status: 'girdi' | 'girmedi' | 'kopya'; // Sınav Durumu
  scores: Record<number, number>; // questionNumber -> scored point
  totalScore: number; // calculated total score
}

export interface PusulaSinavAnaliziDoc {
  id: string;
  schoolName: string; // OKUL ADI (örn: GÖYNÜK İMAM HATİP ORTAOKULU)
  academicYear: string; // ÖĞRETİM YILI (örn: 2025-2026)
  term: '1' | '2'; // DÖNEM (1. Dönem / 2. Dönem)
  className: string; // SINIF (örn: 8/A)
  subject: string; // DERS (örn: Temel Dini Bilgiler)
  teacherName: string; // ÖĞRETMEN ADI
  examNumber: number; // SINAV NO (1, 2, 3)
  principalName: string; // OKUL MÜDÜRÜ
  scenarioNumber: string; // SENARYO NO (örn: 1)
  questionCount: number; // Soru Sayısı (varsayılan 10)
  questions: PusulaQuestionAnalysisDef[];
  students: PusulaStudentExamRow[];
  teacherComment: string; // SINAVA-SINIFA ÖĞRETMENİN YORUMU
  createdAt: string;
  updatedAt: string;
}

