export interface CustomMitQuestion {
    id: number;
    // Form 1: Soru ve Uygulama Şablonu (Kopyala-Yapıştır Odaklı)
    questionText: string;
    imageUrl?: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: 'A' | 'B' | 'C' | 'D';

    // Form 2: Cevap Anahtarı & Tanılama Matrisi (Pedagojik analiz, kazanım ve çeldirici haritası)
    learningArea: string; // Öğrenme Alanı / Ünite
    outcomeCode: string; // Kazanım Kodu
    outcomeDescription: string; // Kazanım İfadesi
    distractorAnalysis: {
        A: string; // Çeldirici A Tanı Analizi
        B: string; // Çeldirici B Tanı Analizi
        C: string; // Çeldirici C Tanı Analizi
        D: string; // Çeldirici D Tanı Analizi
    };
    cognitiveLevel: string; // Zorluk / Bilişsel Seviye
    points?: number; // Klasik test soru puanı (isteğe bağlı)
}

export type CustomMitExamFormat = 'diagnostic' | 'classic';

export interface CustomMitExam {
    id: string;
    title: string;
    description: string;
    grade: 5 | 6 | 7 | 8;
    examFormat?: CustomMitExamFormat; // 'diagnostic' (Form 1 & 2) veya 'classic' (Klasik Test)
    durationMinutes: number;
    teacherName: string;
    createdAt: string;
    targetType: 'class' | 'students' | 'all';
    targetClasses: string[]; // e.g. ["5A", "6A"]
    targetStudents: string[]; // e.g. ["Ali Çil", "Kaan Aktı"]
    questions: CustomMitQuestion[];
    status: 'active' | 'draft' | 'archived';
}

export interface CustomMitExamAnswer {
    questionId: number;
    selectedOption: 'A' | 'B' | 'C' | 'D' | null;
    isCorrect: boolean;
    durationSec: number;
    learningArea: string;
    outcomeCode: string;
    outcomeDescription: string;
    distractorDiagnose: string;
    cognitiveLevel: string;
}

export interface CustomMitExamResult {
    id: string;
    examId: string;
    examTitle: string;
    schoolId?: string;
    studentName: string;
    studentClass: string;
    grade: number;
    score: number;
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    emptyCount: number;
    completedAt: string;
    completedAtIso?: string;
    timeSpentSeconds: number;
    answers: CustomMitExamAnswer[];
}
