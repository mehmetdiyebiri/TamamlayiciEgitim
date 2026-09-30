export interface MakaleItem {
  id: number;
  workshopId: 1 | 2;
  workshopTitle: string;
  articleNumber: number;
  title: string;
  category: string;
  duration: number; // in minutes
  difficulty: 'Temel' | 'Orta' | 'İleri' | 'Akademik';
  skills: string[];
  text: string;
  idealAnswer: string;
  // Guided Student Workspace template defaults
  workspace: {
    konuDedektifi: string;
    hizliOzet: string;
    yazarinAmaci: string;
    soruUretimi: string[];
    anaDusunce: string;
    cikarimYapma: string;
    yardimciDusunceler: string[];
    boslukDoldurma: string;
    anlatimBicimi: string;
    dusunceyiGelistirme: string;
  };
  // Expert solution (Temelden Paragraf Analizi)
  solution: {
    konuDedektifi: string;
    hizliOzet: string;
    yazarinAmaci: string;
    soruUretimi: string[];
    anaDusunce: string;
    cikarimYapma: string;
    yardimciDusunceler: string[];
    boslukDoldurma: string;
    anlatimBicimi: string;
    dusunceyiGelistirme: string;
    neuralWarning: string;
    cognitiveTime: string;
  };
  // Quiz question for dynamic test bank
  quizQuestion: {
    stem: string;
    options: { letter: string; text: string; isCorrect: boolean; type: string }[];
    explanation: string;
  };
}
