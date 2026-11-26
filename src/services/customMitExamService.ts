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

const normalizeClassKey = (cls?: string): string =>
    (cls || '').trim().toUpperCase().replace(/[\s\-_/]/g, '');

// Öğrenciye atanan sınavları filtrele
export const getCustomExamsForStudent = async (studentName: string, studentClass?: string, grade?: number): Promise<CustomMitExam[]> => {
    const all = await getCustomMitExams();
    const cleanStudentName = (studentName || '').trim().toLowerCase();
    const cleanStudentClass = normalizeClassKey(studentClass);

    return all.filter(exam => {
        if (exam.status !== 'active') return false;
        
        // Eğer grade filtresi verilmişse kontrol et
        if (grade && exam.grade !== grade) {
            return false;
        }

        if (exam.targetType === 'all') return true;

        if (exam.targetType === 'class') {
            if (!cleanStudentClass) return true;
            return exam.targetClasses.some(c => normalizeClassKey(c) === cleanStudentClass);
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

// Klasik Test Cevap Anahtarı Ayrıştırıcı ("1-A 2-C 3-B", "1.A 2.C", "ACBD..." vb.)
export const parseClassicAnswerKey = (rawKey: string): Record<number, 'A' | 'B' | 'C' | 'D'> => {
    const map: Record<number, 'A' | 'B' | 'C' | 'D'> = {};
    const cleaned = (rawKey || '').trim().toUpperCase();
    if (!cleaned) return map;

    // 1) Numaralı eşleştirmeler: "1-A", "1. A", "1)A", "1:A"
    const numberedRegex = /(\d+)\s*[-.):\s]\s*([ABCD])(?![A-Z])/g;
    let match: RegExpExecArray | null;
    while ((match = numberedRegex.exec(cleaned)) !== null) {
        const num = Number(match[1]);
        const ans = match[2] as 'A' | 'B' | 'C' | 'D';
        if (num > 0) map[num] = ans;
    }
    if (Object.keys(map).length > 0) return map;

    // 2) Sıralı harf dizisi: "A C B D A" veya "ACBDA"
    const letters = cleaned.match(/[ABCD]/g);
    if (letters) {
        letters.forEach((letter, idx) => {
            map[idx + 1] = letter as 'A' | 'B' | 'C' | 'D';
        });
    }
    return map;
};

// Klasik Test Formatı Ayrıştırıcı (Word / TXT / Kopyala-Yapıştır: "1. Soru... A) ... B) ... C) ... D) ... Cevap: B")
export const parseClassicTestText = (
    rawText: string,
    grade: number = 8,
    bulkAnswerKey: string = ''
): CustomMitQuestion[] => {
    if (!rawText.trim()) return [];

    // Satır sonlarını normalize et
    const normalized = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

    // Eğer metin tab/noktalı virgül tablosu gibiyse tablo ayrıştırıcısına yönlendir
    const nonEmptyLines = normalized.split('\n').filter(l => l.trim().length > 0);
    const tabCount = nonEmptyLines.filter(l => l.includes('\t') || (l.split(';').length >= 6)).length;
    if (nonEmptyLines.length > 0 && tabCount >= Math.max(1, Math.floor(nonEmptyLines.length * 0.6))) {
        return parseBulkQuestionsInput(normalized, 1, grade);
    }

    // Metin içinde en altta "Cevap Anahtarı:" bölümü varsa ayır
    let bodyText = normalized;
    let extractedKeyText = bulkAnswerKey;
    const keySectionMatch = normalized.match(/(?:^|\n)\s*(?:CEVAP\s*ANAHTARI|YANIT\s*ANAHTARI)\s*[:\-]?\s*([\s\S]+)$/i);
    if (keySectionMatch) {
        bodyText = normalized.slice(0, keySectionMatch.index).trim();
        if (!extractedKeyText.trim()) {
            extractedKeyText = keySectionMatch[1].trim();
        }
    }

    const answerKeyMap = parseClassicAnswerKey(extractedKeyText);

    // Soruları numaralandırma desenine göre bloklara ayır ("1.", "1)", "Soru 1:", "1 -")
    const splitRegex = /(?:^|\n)\s*(?:(?:SORU\s*)?(\d+)\s*[.)\-:])\s+/gi;
    const indices: { start: number; contentStart: number; num: number }[] = [];
    let m: RegExpExecArray | null;
    while ((m = splitRegex.exec(bodyText)) !== null) {
        const num = Number(m[1]);
        // Şık veya sayısal satır yerine gerçekten yeni soru mu kontrol et (sıralı veya ilk)
        if (indices.length === 0 || num === indices[indices.length - 1].num + 1 || num > indices[indices.length - 1].num) {
            indices.push({ start: m.index, contentStart: m.index + m[0].length, num });
        }
    }

    const blocks: { num: number; text: string }[] = [];
    if (indices.length > 0) {
        for (let i = 0; i < indices.length; i++) {
            const end = i + 1 < indices.length ? indices[i + 1].start : bodyText.length;
            blocks.push({
                num: indices[i].num,
                text: bodyText.slice(indices[i].contentStart, end).trim()
            });
        }
    } else {
        // Numarasız ama boş satırlarla ayrılmış soru blokları
        const chunks = bodyText.split(/\n{2,}/).map(c => c.trim()).filter(Boolean);
        chunks.forEach((chunk, idx) => blocks.push({ num: idx + 1, text: chunk }));
    }

    const parsed: CustomMitQuestion[] = [];

    blocks.forEach((block, idx) => {
        let blockText = block.text;
        let detectedAns: 'A' | 'B' | 'C' | 'D' | null = null;

        // Blok içindeki "Cevap: B", "Doğru Cevap: C", "Yanıt: A" satırını yakala ve temizle
        const inlineAnsMatch = blockText.match(/(?:^|\n|\s)(?:DOĞRU\s*)?(?:CEVAP|YANIT)\s*[:\-=]\s*([ABCD])\b/i);
        if (inlineAnsMatch) {
            detectedAns = inlineAnsMatch[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
            blockText = blockText.replace(inlineAnsMatch[0], '').trim();
        }

        // Seçenekleri yakala: A) / A. / (A) ... B) ... C) ... D) ...
        // Önce her seçeneğin başlangıç indeksini bul
        const optRegex = /(?:^|\n|\s{2,})[\(\[]?([ABCD])[\)\].:]\s+/g;
        const optMatches: { key: 'A' | 'B' | 'C' | 'D'; matchStart: number; textStart: number }[] = [];
        let om: RegExpExecArray | null;
        while ((om = optRegex.exec(blockText)) !== null) {
            const key = om[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
            // Sıralı A -> B -> C -> D eşleşmesi öncelikli
            const expectedOrder = ['A', 'B', 'C', 'D'];
            if (optMatches.length < 4 && key === expectedOrder[optMatches.length]) {
                optMatches.push({
                    key,
                    matchStart: om.index,
                    textStart: om.index + om[0].length
                });
            }
        }

        let questionText = blockText;
        const options = { A: '', B: '', C: '', D: '' };

        if (optMatches.length >= 2) {
            questionText = blockText.slice(0, optMatches[0].matchStart).trim();
            for (let i = 0; i < optMatches.length; i++) {
                const start = optMatches[i].textStart;
                const end = i + 1 < optMatches.length ? optMatches[i + 1].matchStart : blockText.length;
                options[optMatches[i].key] = blockText.slice(start, end).replace(/\s+/g, ' ').trim();
            }
        }

        // Yalnızca anlamlı soru metni veya şıkları olan blokları ekle
        if (!questionText && !options.A && !options.B) return;

        const qNum = idx + 1;
        const finalAns = detectedAns || answerKeyMap[block.num] || answerKeyMap[qNum] || 'A';

        parsed.push({
            id: qNum,
            questionText: questionText || `Soru ${qNum}`,
            options: {
                A: options.A || 'A Seçeneği',
                B: options.B || 'B Seçeneği',
                C: options.C || 'C Seçeneği',
                D: options.D || 'D Seçeneği'
            },
            correctAnswer: finalAns,
            learningArea: `${grade}. Sınıf Matematik`,
            outcomeCode: `M.${grade}.1`,
            outcomeDescription: 'Klasik test değerlendirme sorusu.',
            distractorAnalysis: {
                A: finalAns === 'A' ? 'Doğru Cevap' : 'Yanlış seçenek',
                B: finalAns === 'B' ? 'Doğru Cevap' : 'Yanlış seçenek',
                C: finalAns === 'C' ? 'Doğru Cevap' : 'Yanlış seçenek',
                D: finalAns === 'D' ? 'Doğru Cevap' : 'Yanlış seçenek'
            },
            cognitiveLevel: 'Klasik Test'
        });
    });

    return parsed;
};

// Excel / TSV / CSV Toplu Veri Ayrıştırıcı (Form 1 & Klasik Test Tablosu)
export const parseBulkQuestionsInput = (rawText: string, startingId = 1, grade = 5): CustomMitQuestion[] => {
    if (!rawText.trim()) return [];

    const lines = rawText.split(/\r?\n/).filter(l => l.trim().length > 0);
    const parsed: CustomMitQuestion[] = [];

    lines.forEach((line) => {
        // Tab, noktalı virgül veya virgüle göre ayır
        let delimiter = '\t';
        if (line.includes('\t')) delimiter = '\t';
        else if (line.includes(';')) delimiter = ';';
        else if (line.includes(',')) delimiter = ',';

        const cols = line.split(delimiter).map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length < 2) return;

        // Başlık satırını atla
        const firstLower = cols[0].toLowerCase();
        if (firstLower.includes('soru no') || firstLower.includes('soru metni') || firstLower === 'no') {
            return;
        }

        let topic = `${grade}. Sınıf Matematik`;
        let qText = '';
        let optA = '';
        let optB = '';
        let optC = '';
        let optD = '';
        let ans: 'A' | 'B' | 'C' | 'D' = 'A';
        let points: number | undefined;

        if (!isNaN(Number(cols[0])) && cols.length >= 8) {
            // Format: Soru No | Konu | Soru Metni | A | B | C | D | Doğru Cevap | (Puan)
            topic = cols[1] || topic;
            qText = cols[2] || '';
            optA = cols[3] || '';
            optB = cols[4] || '';
            optC = cols[5] || '';
            optD = cols[6] || '';
            const rawAns = (cols[7] || 'A').toUpperCase().slice(0, 1);
            if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
            if (cols[8] && !isNaN(Number(cols[8]))) points = Number(cols[8]);
        } else if (!isNaN(Number(cols[0])) && cols.length >= 6) {
            // Format: Soru No | Soru Metni | A | B | C | D | Doğru Cevap
            qText = cols[1] || '';
            optA = cols[2] || '';
            optB = cols[3] || '';
            optC = cols[4] || '';
            optD = cols[5] || '';
            const rawAns = (cols[6] || 'A').toUpperCase().slice(0, 1);
            if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
        } else {
            // Format: Soru Metni | A | B | C | D | Doğru Cevap
            qText = cols[0] || '';
            optA = cols[1] || '';
            optB = cols[2] || '';
            optC = cols[3] || '';
            optD = cols[4] || '';
            const rawAns = (cols[5] || 'A').toUpperCase().slice(0, 1);
            if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
        }

        if (!qText) return;

        parsed.push({
            id: startingId + parsed.length,
            questionText: qText,
            options: {
                A: optA || 'Seçenek A',
                B: optB || 'Seçenek B',
                C: optC || 'Seçenek C',
                D: optD || 'Seçenek D'
            },
            correctAnswer: ans,
            learningArea: topic,
            outcomeCode: `M.${grade}.1`,
            outcomeDescription: 'Temel kavramları ve problem çözme adımlarını uygular.',
            distractorAnalysis: {
                A: ans === 'A' ? 'Doğru Cevap' : 'Kavram yanılgısı / Hatalı çıkarım',
                B: ans === 'B' ? 'Doğru Cevap' : 'İşlem önceliği / Dikkatsizlik',
                C: ans === 'C' ? 'Doğru Cevap' : 'Ters işlem / Kural hatası',
                D: ans === 'D' ? 'Doğru Cevap' : 'Eksik veya hatalı hesaplama'
            },
            cognitiveLevel: 'Orta / Uygulama',
            ...(points ? { points } : {})
        });
    });

    return parsed;
};
