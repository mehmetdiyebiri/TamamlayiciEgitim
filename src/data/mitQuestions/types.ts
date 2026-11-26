export type DifficultyStage = 'kolay' | 'orta' | 'zor' | 'sinav';

export interface MitStudyQuestion {
    id: string;
    grade: 5 | 6 | 7 | 8;
    topic: string;
    subTopic?: string;
    difficulty: DifficultyStage;
    q: string;
    options: string[];
    ans: string;
    hint: string;
    explanation: string;
    contextText?: string;
    examType?: 'LGS' | 'Bursluluk (İOKBS)' | 'Kazanım İzleme' | 'Beceri Temelli' | 'LGS Ön Hazırlık';
}

export type CompactRow = [
    q: string,
    ans: string,
    w1: string,
    w2: string,
    w3: string,
    hint: string,
    explanation: string,
    contextText?: string
];

function deterministicShuffle(id: string, items: string[]): string[] {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    const copy = [...items];
    let seed = hash || 1337;
    for (let i = copy.length - 1; i > 0; i--) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        const j = seed % (i + 1);
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function packStage(
    grade: 5 | 6 | 7 | 8,
    prefix: string,
    topic: string,
    difficulty: DifficultyStage,
    rows: CompactRow[]
): MitStudyQuestion[] {
    const examType: MitStudyQuestion['examType'] | undefined =
        difficulty === 'sinav' ? (grade === 8 ? 'LGS' : 'Bursluluk (İOKBS)') : undefined;

    return rows.map((row, idx) => {
        const id = `${grade}_${prefix}_${difficulty[0]}${idx + 1}`;
        const [q, ans, w1, w2, w3, hint, explanation, contextText] = row;
        return {
            id,
            grade,
            topic,
            difficulty,
            q,
            options: deterministicShuffle(id, [ans, w1, w2, w3]),
            ans,
            hint,
            explanation,
            contextText,
            examType
        };
    });
}
