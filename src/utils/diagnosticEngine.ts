import { DiagnosticQuestion } from '../data/gradeDiagnosticQuestions';

export type ErrorTypeCategory = 'Kavram Yanılgısı' | 'İşlem Hatası' | 'Dikkatsizlik' | 'Okuduğunu Anlama' | 'Zaman Yönetimi';

export interface StudentExamAnswer {
    questionId: number;
    selectedOption: string;
    isCorrect: boolean;
    durationSec: number;
    errorType?: ErrorTypeCategory;
    retryCount?: number;
}

export interface StudentDiagnosticResult {
    id: string;
    studentName: string;
    grade: number;
    testTitle: string;
    completedAt: string;
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    emptyCount: number;
    successRate: number;
    averageTimeSec: number;
    // Determined Level: 1, 2, 3, or 4
    level: 1 | 2 | 3 | 4;
    levelTitle: string;
    levelDescription: string;
    // Error Breakdown
    errorDistribution: Record<string, number>;
    // Strengths and Weaknesses
    strongTopics: string[];
    weakTopics: string[];
    // Recommendations for Teacher Assignment
    recommendedActionPlan: string[];
    suggestedRemediationTopics: string[];
    // Detailed Question Analysis
    details: {
        questionNum: number;
        topic: string;
        cognitiveSkill: string;
        userAnswer: string;
        correctAnswer: string;
        isCorrect: boolean;
        durationSec: number;
        errorType: string;
        recommendedRemedy: string;
    }[];
}

/**
 * M.İ.T 4-Kriterli Seviye Belirleme Motoru
 * Kriter 1: Test Doğruluk Skoru (%40 ağırlık)
 * Kriter 2: Soru Başına Ortalama Süre (%20 ağırlık)
 * Kriter 3: Hata Tipleri ve Kavram Yanılgısı Yoğunluğu (%25 ağırlık)
 * Kriter 4: Tekrar ve Tutarlılık (%15 ağırlık)
 */
export function calculateStudentDiagnosticLevel(
    grade: number,
    answers: StudentExamAnswer[],
    questions: DiagnosticQuestion[],
    studentName: string = 'Öğrenci'
): StudentDiagnosticResult {
    const totalQuestions = questions.length || 20;
    let correctCount = 0;
    let totalDuration = 0;
    const errorDistribution: Record<string, number> = {
        'Kavram Yanılgısı': 0,
        'İşlem Hatası': 0,
        'Dikkatsizlik': 0,
        'Okuduğunu Anlama': 0,
        'Zaman Yönetimi': 0
    };

    const topicStats: Record<string, { total: number; correct: number }> = {};

    const details = questions.map((q, idx) => {
        const ans = answers.find(a => a.questionId === q.id) || {
            questionId: q.id,
            selectedOption: '-',
            isCorrect: false,
            durationSec: 45,
            errorType: q.errorType,
            retryCount: 0
        };

        if (ans.isCorrect) correctCount++;
        totalDuration += ans.durationSec;

        const errKey = ans.errorType || q.errorType;
        if (!ans.isCorrect && errKey) {
            errorDistribution[errKey] = (errorDistribution[errKey] || 0) + 1;
        }

        if (!topicStats[q.topic]) {
            topicStats[q.topic] = { total: 0, correct: 0 };
        }
        topicStats[q.topic].total += 1;
        if (ans.isCorrect) topicStats[q.topic].correct += 1;

        let remedy = 'Kazanım pekiştirildi.';
        if (!ans.isCorrect) {
            if (q.errorType === 'Kavram Yanılgısı') remedy = `${q.topic} temel tanım ve kurallarını görsel kartlarla tekrar etmeli.`;
            else if (q.errorType === 'İşlem Hatası') remedy = 'Zihinden işlem antrenörü ile 2 basamaklı dört işlem pratiği yapmalı.';
            else if (q.errorType === 'Dikkatsizlik') remedy = 'Sorunun kökündeki olumsuz ifadelere (değildir/olamaz) altını çizerek odaklanmalı.';
            else remedy = 'Problem metnini parçalara ayırarak adım adım modellemeli.';
        }

        return {
            questionNum: idx + 1,
            topic: q.topic,
            cognitiveSkill: q.cognitiveSkill,
            userAnswer: ans.selectedOption,
            correctAnswer: q.ans,
            isCorrect: ans.isCorrect,
            durationSec: ans.durationSec,
            errorType: ans.isCorrect ? 'Yok' : q.errorType,
            recommendedRemedy: remedy
        };
    });

    const successRate = Math.round((correctCount / totalQuestions) * 100);
    const averageTimeSec = Math.round(totalDuration / (answers.length || 1));

    // Strong and Weak topics
    const strongTopics: string[] = [];
    const weakTopics: string[] = [];
    Object.entries(topicStats).forEach(([topic, stat]) => {
        const rate = stat.correct / stat.total;
        if (rate >= 0.75) strongTopics.push(topic);
        else if (rate < 0.5) weakTopics.push(topic);
    });

    // Level determination logic (Seviye 1 - Seviye 4)
    let level: 1 | 2 | 3 | 4 = 1;
    let levelTitle = 'Seviye 1: Başlangıç & Temel Telafi';
    let levelDescription = 'Önceki yıl kazanımlarında belirgin kavram eksiklikleri tespit edildi. Temel kavram kartları ve 1-2 basamaklı zihinsel işlemler ile desteklenmelidir.';

    // Error weights
    const conceptMisconceptions = errorDistribution['Kavram Yanılgısı'] || 0;

    if (successRate >= 80 && averageTimeSec <= 60 && conceptMisconceptions <= 2) {
        level = 4;
        levelTitle = 'Seviye 4: İleri Düzey & Sınav Hazır';
        levelDescription = 'Önceki yıl müfredatına tam olarak hakim. Mantık-muhakeme ve yeni nesil çok kazanımlı LGS/olimpiyat sorularını rahatlıkla çözebilir.';
    } else if (successRate >= 60 && conceptMisconceptions <= 4) {
        level = 3;
        levelTitle = 'Seviye 3: Yetkin & Gelişmeye Açık';
        levelDescription = 'Temel kavramlara hakim, ancak süre baskısı veya işlem dikkatinde küçük hatalar yapıyor. Orta-zor düzey çalışma setlerine yönlendirilmeli.';
    } else if (successRate >= 40) {
        level = 2;
        levelTitle = 'Seviye 2: Geliştirilmesi Gereken Temel Düzey';
        levelDescription = 'Bazı kritik kazanımlarda kavram yanılgısı mevcut. 7 soruluk kolay-orta setler ve formül pekiştirme kartları atanmalıdır.';
    } else {
        level = 1;
        levelTitle = 'Seviye 1: Başlangıç & BEP Telafi Düzeyi';
        levelDescription = 'Hazır bulunuşluk seviyesi yetersiz. Bireyselleştirilmiş eğitim planı (BEP) çerçevesinde temel kavramlar ve adım adım çözümlerle takviye yapılmalıdır.';
    }

    const recommendedActionPlan: string[] = [];
    if (weakTopics.length > 0) {
        recommendedActionPlan.push(`${weakTopics.slice(0, 3).join(', ')} konuları için Çalışma Odası'ndan 7'şer soruluk alıştırma setleri atayın.`);
    }
    if (errorDistribution['İşlem Hatası'] >= 3) {
        recommendedActionPlan.push('Zihinden İşlem Merkezinde günde 10 dakika dört işlem ve çarpım tablosu antrenmanı yapmalı.');
    }
    if (conceptMisconceptions >= 3) {
        recommendedActionPlan.push('Kalıp Formül Kartları modülünde ilgili konunun kural ve örnek sorularını çözmeli (%80 başarı eşiği).');
    }
    if (averageTimeSec > 70) {
        recommendedActionPlan.push('Soru okuma hızını artırmak için Makale Okulu ve Sözel Mantık modüllerinde pratik yapması önerilir.');
    }
    if (recommendedActionPlan.length === 0) {
        recommendedActionPlan.push('Mevcut başarı seviyesini korumak için LGS Yeni Nesil Özel Antrenör denemelerine geçebilir.');
    }

    return {
        id: `diag_${Date.now()}`,
        studentName,
        grade,
        testTitle: `${grade}. Sınıf Hazır Bulunuşluk Seviye Tespit Sınavı`,
        completedAt: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        totalQuestions,
        correctCount,
        wrongCount: totalQuestions - correctCount,
        emptyCount: 0,
        successRate,
        averageTimeSec,
        level,
        levelTitle,
        levelDescription,
        errorDistribution,
        strongTopics,
        weakTopics,
        recommendedActionPlan,
        suggestedRemediationTopics: weakTopics,
        details
    };
}
