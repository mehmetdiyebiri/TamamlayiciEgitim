export interface PusulaExam {
  id: string;
  name: string;
  date: string;
  type: 'TYT' | 'AYT' | 'LGS' | 'KPSS' | 'AGS' | 'Branş';
  branchType?: string; // e.g. "Matematik", "Türkçe"
  scores: Record<string, number>; // subject -> net
  mistakeTopics?: string[]; // topics where questions were lost
  totalNet: number;
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
