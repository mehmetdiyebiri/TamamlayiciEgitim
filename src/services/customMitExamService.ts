import { CustomMitExam, CustomMitQuestion, CustomMitExamResult } from '../types/customMitExam';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, query, where, orderBy } from 'firebase/firestore';

const LOCAL_STORAGE_EXAMS_KEY = 'mit_custom_exams_v1';
const LOCAL_STORAGE_RESULTS_KEY = 'mit_custom_exam_results_v1';

// PDF'teki örnek soruların eksiksiz şablonu
export const PDF_SAMPLE_QUESTIONS: CustomMitQuestion[] = [
    {
        id: 1,
        questionText: "36 - 12 : 3 + 2³ işleminin sonucu kaçtır?",
        options: {
            A: "16",
            B: "38",
            C: "40",
            D: "24"
        },
        correctAnswer: "C",
        learningArea: "Doğal Sayılarla İşlemler",
        outcomeCode: "M.5.1.1.2",
        outcomeDescription: "İşlem önceliği kurallarını uygular.",
        distractorAnalysis: {
            A: "Soldan sağa sırayla gitme (parantez yok sayma)",
            B: "Üssü tabanla/katsayıyla yanlış çarpma",
            C: "Doğru Cevap",
            D: "İşlem hatası (toplama/çıkarma karıştırma)"
        },
        cognitiveLevel: "Orta / Uygulama"
    },
    {
        id: 2,
        questionText: "3/7, 5/7 ve 1/7 kesirlerinin küçükten büyüğe doğru sıralanışı aşağıdakilerden hangisidir?",
        options: {
            A: "1/7 < 3/7 < 5/7",
            B: "5/7 < 3/7 < 1/7",
            C: "3/7 < 1/7 < 5/7",
            D: "1/7 = 3/7 < 5/7"
        },
        correctAnswer: "A",
        learningArea: "Kesirler",
        outcomeCode: "M.5.2.2.4",
        outcomeDescription: "Paydası eşit kesirleri sıralar.",
        distractorAnalysis: {
            A: "Doğru Cevap",
            B: "Ters mantık kurma (payı küçük-büyük karışıklığı)",
            C: "Sadeleştirme hatası",
            D: "Genişletmede payı sabitleme"
        },
        cognitiveLevel: "Kolay / Kavrama"
    },
    {
        id: 3,
        questionText: "2/5 + 1/10 işleminin sonucu en sade haliyle kaçtır?",
        options: {
            A: "3/10",
            B: "3/15",
            C: "1/10",
            D: "1/2"
        },
        correctAnswer: "D",
        learningArea: "Kesirlerle İşlemler",
        outcomeCode: "M.6.1.4.1",
        outcomeDescription: "Toplama/çıkarma işlemi yapar.",
        distractorAnalysis: {
            A: "Paydayı eşitleyip payı toplamama",
            B: "Pay ve paydayı kendi içinde toplama",
            C: "Ters işlem yapma",
            D: "Doğru Cevap"
        },
        cognitiveLevel: "Orta / Uygulama"
    }
];

export const getDefaultSampleExam = (): CustomMitExam => {
    return {
        id: 'pdf-sample-exam-demo',
        title: 'Örnek Matematik Seviye Tespit & Tanılama Sınavı',
        description: 'Öğretmen tarafından hazırlanan pedagojik çeldirici matrisli örnek seviye tespit sınavı.',
        grade: 5,
        durationMinutes: 30,
        teacherName: 'Matematik Zümresi',
        createdAt: new Date().toISOString().split('T')[0],
        targetType: 'class',
        targetClasses: ['5A'],
        targetStudents: [],
        questions: PDF_SAMPLE_QUESTIONS,
        status: 'active'
    };
};

// Sınavları Getir (Firestore + LocalStorage)
export const getCustomMitExams = async (): Promise<CustomMitExam[]> => {
    let localExams: CustomMitExam[] = [];
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_EXAMS_KEY);
        if (raw) {
            localExams = JSON.parse(raw);
        }
    } catch (e) {
        console.warn('LocalStorage error while reading exams', e);
    }

    // İlk açılışta eğer hiç sınav yoksa örnek sınavı yerleştir
    if (localExams.length === 0) {
        const sample = getDefaultSampleExam();
        localExams = [sample];
        try {
            localStorage.setItem(LOCAL_STORAGE_EXAMS_KEY, JSON.stringify(localExams));
        } catch (_) {}
    }

    try {
        if (db) {
            const snap = await getDocs(collection(db, 'custom_mit_exams'));
            if (!snap.empty) {
                const firestoreExams: CustomMitExam[] = [];
                snap.forEach(d => {
                    firestoreExams.push(d.data() as CustomMitExam);
                });

                // Merge with local exams
                const map = new Map<string, CustomMitExam>();
                localExams.forEach(e => map.set(e.id, e));
                firestoreExams.forEach(e => map.set(e.id, e));
                return Array.from(map.values());
            }
        }
    } catch (err) {
        console.warn('Firestore fetch custom_mit_exams failed, using local', err);
    }

    return localExams;
};

// Sınav Kaydet (Yayınla)
export const saveCustomMitExam = async (exam: CustomMitExam): Promise<boolean> => {
    try {
        // 1. LocalStorage güncelle
        const current = await getCustomMitExams();
        const existingIdx = current.findIndex(e => e.id === exam.id);
        if (existingIdx >= 0) {
            current[existingIdx] = exam;
        } else {
            current.unshift(exam);
        }
        localStorage.setItem(LOCAL_STORAGE_EXAMS_KEY, JSON.stringify(current));

        // 2. Firestore güncelle
        if (db) {
            await setDoc(doc(db, 'custom_mit_exams', exam.id), exam);
        }
        return true;
    } catch (e) {
        console.error('Error saving custom exam:', e);
        return false;
    }
};

// Sınav Sil
export const deleteCustomMitExam = async (examId: string): Promise<boolean> => {
    try {
        const current = await getCustomMitExams();
        const filtered = current.filter(e => e.id !== examId);
        localStorage.setItem(LOCAL_STORAGE_EXAMS_KEY, JSON.stringify(filtered));

        if (db) {
            await deleteDoc(doc(db, 'custom_mit_exams', examId));
        }
        return true;
    } catch (e) {
        console.error('Error deleting custom exam:', e);
        return false;
    }
};

// Öğrenciye atanan sınavları filtrele
export const getCustomExamsForStudent = async (studentName: string, studentClass?: string, grade?: number): Promise<CustomMitExam[]> => {
    const all = await getCustomMitExams();
    const cleanStudentName = (studentName || '').trim().toLowerCase();
    const cleanStudentClass = (studentClass || '').trim().toUpperCase();

    return all.filter(exam => {
        if (exam.status !== 'active') return false;
        
        // Eğer grade filtresi verilmişse kontrol et
        if (grade && exam.grade !== grade) {
            // Sınıf seviyesi tutmuyorsa pas geç
            return false;
        }

        if (exam.targetType === 'all') return true;

        if (exam.targetType === 'class') {
            if (!cleanStudentClass) return true;
            return exam.targetClasses.some(c => c.trim().toUpperCase() === cleanStudentClass);
        }

        if (exam.targetType === 'students') {
            return exam.targetStudents.some(s => s.trim().toLowerCase() === cleanStudentName);
        }

        return false;
    });
};

// Öğrenci Sonucunu Kaydet
export const saveCustomExamSubmission = async (result: CustomMitExamResult): Promise<boolean> => {
    try {
        // 1. LocalStorage
        let results: CustomMitExamResult[] = [];
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);
            if (raw) results = JSON.parse(raw);
        } catch (_) {}

        results.unshift(result);
        localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, JSON.stringify(results.slice(0, 100)));

        // 2. Firestore
        if (db) {
            await setDoc(doc(db, 'custom_mit_results', result.id), result);
        }
        return true;
    } catch (e) {
        console.error('Error saving exam submission:', e);
        return false;
    }
};

// Öğretmen için Sınav Sonuçlarını Getir
export const getCustomExamSubmissions = async (examId?: string): Promise<CustomMitExamResult[]> => {
    let localResults: CustomMitExamResult[] = [];
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);
        if (raw) localResults = JSON.parse(raw);
    } catch (_) {}

    try {
        if (db) {
            const snap = await getDocs(collection(db, 'custom_mit_results'));
            if (!snap.empty) {
                const firestoreResults: CustomMitExamResult[] = [];
                snap.forEach(d => firestoreResults.push(d.data() as CustomMitExamResult));

                const map = new Map<string, CustomMitExamResult>();
                localResults.forEach(r => map.set(r.id, r));
                firestoreResults.forEach(r => map.set(r.id, r));
                const merged = Array.from(map.values());
                return examId ? merged.filter(r => r.examId === examId) : merged;
            }
        }
    } catch (e) {
        console.warn('Firestore results fetch failed', e);
    }

    return examId ? localResults.filter(r => r.examId === examId) : localResults;
};

// Excel / TSV / CSV Toplu Veri Ayrıştırıcı (Form 1 Kopyala-Yapıştır Odaklı)
export const parseBulkQuestionsInput = (rawText: string, startingId = 1): CustomMitQuestion[] => {
    if (!rawText.trim()) return [];

    const lines = rawText.split('\n').filter(l => l.trim().length > 0);
    const parsed: CustomMitQuestion[] = [];

    lines.forEach((line, index) => {
        // Tab, noktalı virgül veya virgüle göre ayır
        let delimiter = '\t';
        if (line.includes('\t')) delimiter = '\t';
        else if (line.includes(';')) delimiter = ';';
        else if (line.includes(',')) delimiter = ',';

        const cols = line.split(delimiter).map(c => c.trim());
        if (cols.length >= 2) {
            // Sütun yapıları:
            // 1) Soru Metni \t A \t B \t C \t D \t Doğru Cevap
            // 2) Soru No \t Soru Metni \t A \t B \t C \t D \t Doğru Cevap
            let qText = '';
            let optA = '';
            let optB = '';
            let optC = '';
            let optD = '';
            let ans: 'A' | 'B' | 'C' | 'D' = 'A';

            if (!isNaN(Number(cols[0])) && cols.length >= 6) {
                // Soru No başta
                qText = cols[1] || '';
                optA = cols[2] || '';
                optB = cols[3] || '';
                optC = cols[4] || '';
                optD = cols[5] || '';
                const rawAns = (cols[6] || 'A').toUpperCase();
                if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
            } else {
                qText = cols[0] || '';
                optA = cols[1] || '';
                optB = cols[2] || '';
                optC = cols[3] || '';
                optD = cols[4] || '';
                const rawAns = (cols[5] || 'A').toUpperCase();
                if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
            }

            parsed.push({
                id: startingId + index,
                questionText: qText,
                options: {
                    A: optA || 'Seçenek A',
                    B: optB || 'Seçenek B',
                    C: optC || 'Seçenek C',
                    D: optD || 'Seçenek D'
                },
                correctAnswer: ans,
                learningArea: 'Genel Matematik',
                outcomeCode: 'M.5.1',
                outcomeDescription: 'Temel kavramları ve problem çözme adımlarını uygular.',
                distractorAnalysis: {
                    A: ans === 'A' ? 'Doğru Cevap' : 'Kavram yanılgısı / Hatalı çıkarım',
                    B: ans === 'B' ? 'Doğru Cevap' : 'İşlem önceliği / Dikkatsizlik',
                    C: ans === 'C' ? 'Doğru Cevap' : 'Ters işlem / Kural hatası',
                    D: ans === 'D' ? 'Doğru Cevap' : 'Eksik veya hatalı hesaplama'
                },
                cognitiveLevel: 'Orta / Uygulama'
            });
        }
    });

    return parsed;
};
