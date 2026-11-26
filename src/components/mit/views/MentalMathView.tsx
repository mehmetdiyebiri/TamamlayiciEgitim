import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Timer,
    Award,
    ArrowRight,
    Zap,
    RefreshCw,
    Star,
    Layers,
    Sparkles,
    Brain,
    SquareFunction
} from 'lucide-react';
import { MindMapsView } from './MindMapsView';
import { saveMentalMathRecord } from '../../../services/mitAnalyticsService';

type MathMode = 'mind_maps' | 'digits' | 'multiplication_table' | 'exponents' | 'grade_special';
type ExponentCategory = 'kare' | 'kup' | 'kuvvet' | 'negatif' | 'ozellikler';
type SpecialCategory =
    | 'g5_kesir_yuzde'
    | 'g5_ondalik'
    | 'g6_kesir'
    | 'g6_ondalik'
    | 'g7_tam_sayi'
    | 'g7_rasyonel'
    | 'g7_yuzde'
    | 'g8_tam_kare_kok'
    | 'g8_koklu_islem'
    | 'g8_rasyonel_kok';

interface HistoryItem {
    id: string;
    q: string;
    userAns: string;
    correctAns: string | number;
    correct: boolean;
    durationSec: number;
    perf: 'İyi' | 'Normal' | 'Geliştirilmesi Gereken';
    category: string;
    tip?: string;
}

interface QuestionPayload {
    q: string;
    ans: string;
    op: '+' | '-' | '*' | '/' | 'frac' | 'root' | 'pow';
    opType: string;
    digitsA: number;
    digitsB: number;
    tip?: string;
    inputHint?: string;
}

interface GradeTabConfig {
    id: MathMode;
    label: string;
    activeClass: string;
    icon: React.ComponentType<{ size?: number }>;
}

const EXPONENT_CATS_BY_GRADE: Record<5 | 6 | 7 | 8, { id: ExponentCategory; label: string }[]> = {
    5: [
        { id: 'kare', label: 'Doğal Sayıların Karesi (1² – 15²)' },
        { id: 'kup', label: 'Doğal Sayıların Küpü (1³ – 10³)' }
    ],
    6: [
        { id: 'kare', label: 'Tam Kareler (2² – 20²)' },
        { id: 'kup', label: 'Küp Alma (1³ – 10³)' },
        { id: 'kuvvet', label: '2, 3 ve 10’un Kuvvetleri' }
    ],
    7: [
        { id: 'kare', label: 'Tam Kareler (2² – 20²)' },
        { id: 'kup', label: 'Küp Alma (1³ – 10³)' },
        { id: 'kuvvet', label: '2 ve 3’ün Kuvvetleri' },
        { id: 'negatif', label: 'Negatif Taban & Parantez' }
    ],
    8: [
        { id: 'kare', label: 'Tam Kareler (2² – 25²)' },
        { id: 'kup', label: 'Küp Alma (1³ – 10³)' },
        { id: 'kuvvet', label: '2 ve 3’ün Kuvvetleri' },
        { id: 'negatif', label: 'Negatif Taban & Parantez' },
        { id: 'ozellikler', label: 'Üslü İşlem Kuralları' }
    ]
};

const SPECIAL_CATS_BY_GRADE: Record<
    5 | 6 | 7 | 8,
    {
        tabLabel: string;
        heroTitle: string;
        heroDesc: string;
        cats: { id: SpecialCategory; label: string }[];
    }
> = {
    5: {
        tabLabel: 'Kesir & Yüzde',
        heroTitle: '5. Sınıf Zihinden Kesir, Ondalık & Yüzde',
        heroDesc: 'Basit kesir, yüzde ve ondalık dönüşümlerini zihinden hızlıca hesaplayın. Hedef süre: < 5 sn!',
        cats: [
            { id: 'g5_kesir_yuzde', label: 'Kesir & Yüzde Hesabı' },
            { id: 'g5_ondalik', label: 'Ondalık Toplama & Çıkarma' }
        ]
    },
    6: {
        tabLabel: 'Kesir & Ondalık',
        heroTitle: '6. Sınıf Zihinden Kesir & Ondalık İşlemleri',
        heroDesc: 'Kesirlerle çarpma-bölme ve ondalık sayılarla pratik zihinden işlemleri hızlandırın.',
        cats: [
            { id: 'g6_kesir', label: 'Kesirlerle Çarpma & Bölme' },
            { id: 'g6_ondalik', label: 'Ondalık Çarpma & Bölme' }
        ]
    },
    7: {
        tabLabel: 'Tam Sayı, Rasyonel & Yüzde',
        heroTitle: '7. Sınıf Tam Sayı, Rasyonel & Yüzde Antrenmanı',
        heroDesc: '7. sınıf müfredatına özel işaretli tam sayılar, rasyonel işlemler ve hızlı yüzde hesapları.',
        cats: [
            { id: 'g7_tam_sayi', label: 'Tam Sayılar (+, −, ×, ÷)' },
            { id: 'g7_rasyonel', label: 'Rasyonel Sayılarda İşlem' },
            { id: 'g7_yuzde', label: 'Yüzde & Orantı Hesabı' }
        ]
    },
    8: {
        tabLabel: 'Rasyonel & Köklü',
        heroTitle: '8. Sınıf Rasyonel & Kareköklü Zihinden İşlem',
        heroDesc: 'Tam kare kökler, kareköklü çarpma/bölme ve ondalık karekökleri LGS hızında zihinden çözün.',
        cats: [
            { id: 'g8_tam_kare_kok', label: 'Tam Kare Kökler (√4 – √400)' },
            { id: 'g8_koklu_islem', label: 'Köklü Çarpma, Bölme & Toplama' },
            { id: 'g8_rasyonel_kok', label: 'Ondalık & Rasyonel Kök' }
        ]
    }
};

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function normalizeAnswer(raw: string): string {
    return raw.trim().replace(/\s+/g, '').replace(',', '.').replace(/^\+/, '');
}

export const MentalMathView = ({ grade = 5, state }: { grade?: number; state?: any }) => {
    const safeGrade = (grade === 5 || grade === 6 || grade === 7 || grade === 8 ? grade : 8) as 5 | 6 | 7 | 8;
    const studentName = state?.currentUser?.name || state?.currentUser?.username || 'Öğrenci';
    const studentClass = state?.currentUser?.classLevel || state?.currentUser?.class || `${safeGrade}A`;
    const schoolId = state?.activeSchoolId || 'default';

    const exponentCats = EXPONENT_CATS_BY_GRADE[safeGrade];
    const specialConfig = SPECIAL_CATS_BY_GRADE[safeGrade];

    const tabs: GradeTabConfig[] = useMemo(() => {
        const list: GradeTabConfig[] = [
            {
                id: 'mind_maps',
                label: 'Zihin Haritaları',
                activeClass: 'bg-indigo-600 text-white shadow-sm',
                icon: Brain
            }
        ];

        if (safeGrade === 5) {
            list.push({
                id: 'multiplication_table',
                label: 'Çarpım Tablosu (2–9)',
                activeClass: 'bg-amber-500 text-white shadow-sm',
                icon: Star
            });
        }

        list.push(
            {
                id: 'digits',
                label: 'Basamaklı Dört İşlem',
                activeClass: 'bg-indigo-600 text-white shadow-sm',
                icon: Layers
            },
            {
                id: 'exponents',
                label: safeGrade === 5 ? 'Kare & Küp Temelleri' : safeGrade === 6 ? 'Üslü Nicelikler' : 'Üslü İşlem Merkezi',
                activeClass: 'bg-purple-600 text-white shadow-sm',
                icon: Zap
            },
            {
                id: 'grade_special',
                label: specialConfig.tabLabel,
                activeClass: 'bg-emerald-600 text-white shadow-sm',
                icon: Sparkles
            }
        );

        return list;
    }, [safeGrade, specialConfig.tabLabel]);

    const [mode, setMode] = useState<MathMode>(safeGrade >= 6 ? 'grade_special' : safeGrade === 5 ? 'multiplication_table' : 'digits');
    const [gameState, setGameState] = useState<'idle' | 'playing'>('idle');

    // Digits Mode state (1, 2, 3 basamaklı)
    const [digitLevel, setDigitLevel] = useState<1 | 2 | 3>(1);

    // Multiplication Table Mode state (2'ler..9'lar, 5. Sınıf)
    const [multFactor, setMultFactor] = useState<number>(2);
    const [multSuccessInRow, setMultSuccessInRow] = useState<number>(0);
    const [masteredTables, setMasteredTables] = useState<number[]>([]);

    // Exponent Mode state
    const [exponentCat, setExponentCat] = useState<ExponentCategory>(exponentCats[0].id);
    const [exponentStreak, setExponentStreak] = useState<number>(0);

    // Grade-Special Mode state (Kesir/Yüzde/Tam Sayı/Rasyonel & Köklü)
    const [specialCat, setSpecialCat] = useState<SpecialCategory>(specialConfig.cats[0].id);
    const [specialStreak, setSpecialStreak] = useState<number>(0);

    // Shared progress state
    const [successCount, setSuccessCount] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionPayload>({
        q: '',
        ans: '0',
        op: '+',
        opType: 'Toplama',
        digitsA: 1,
        digitsB: 1
    });

    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [lastPerf, setLastPerf] = useState<'İyi' | 'Normal' | 'Geliştirilmesi Gereken' | null>(null);
    const [showLevelUpAlert, setShowLevelUpAlert] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Strictly reset mode and sub-categories whenever grade changes
    useEffect(() => {
        setMode(safeGrade >= 6 ? 'grade_special' : safeGrade === 5 ? 'multiplication_table' : 'digits');
        setGameState('idle');
        setExponentCat(EXPONENT_CATS_BY_GRADE[safeGrade][0].id);
        setSpecialCat(SPECIAL_CATS_BY_GRADE[safeGrade].cats[0].id);
        setSuccessCount(0);
        setExponentStreak(0);
        setSpecialStreak(0);
        setMultSuccessInRow(0);
        setLastPerf(null);
        setInput('');
    }, [safeGrade]);

    // Live Stopwatch timer
    useEffect(() => {
        if (gameState === 'playing') {
            timerRef.current = setInterval(() => {
                setElapsedTime((Date.now() - startTime) / 1000);
            }, 100);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameState, startTime]);

    // Persistence handled per submitted question in handleSubmit via mitAnalyticsService

    const evaluateSpeed = (
        sec: number,
        op: string,
        digitsA: number,
        digitsB: number
    ): 'İyi' | 'Normal' | 'Geliştirilmesi Gereken' => {
        if (op === 'pow') {
            if (sec <= 3.5) return 'İyi';
            if (sec <= 6.5) return 'Normal';
            return 'Geliştirilmesi Gereken';
        }
        if (op === 'root' || op === 'frac') {
            if (sec <= 5.0) return 'İyi';
            if (sec <= 9.0) return 'Normal';
            return 'Geliştirilmesi Gereken';
        }
        if (op === '+' || op === '-') {
            const dig = Math.max(digitsA, digitsB);
            if (dig <= 1) return sec <= 3.5 ? 'İyi' : sec <= 5.5 ? 'Normal' : 'Geliştirilmesi Gereken';
            if (dig === 2) return sec <= 6.5 ? 'İyi' : sec <= 8.5 ? 'Normal' : 'Geliştirilmesi Gereken';
            return sec <= 14.5 ? 'İyi' : sec <= 19.5 ? 'Normal' : 'Geliştirilmesi Gereken';
        }
        if (op === '*') {
            if (digitsA === 1 && digitsB === 1) return sec < 5.5 ? 'İyi' : sec <= 8.5 ? 'Normal' : 'Geliştirilmesi Gereken';
            if ((digitsA === 2 && digitsB === 1) || (digitsA === 1 && digitsB === 2)) {
                return sec <= 10.5 ? 'İyi' : sec <= 15.5 ? 'Normal' : 'Geliştirilmesi Gereken';
            }
            return sec <= 18.5 ? 'İyi' : sec <= 25.5 ? 'Normal' : 'Geliştirilmesi Gereken';
        }
        if (op === '/') {
            if (digitsA <= 1) return sec < 5.5 ? 'İyi' : sec <= 8.5 ? 'Normal' : 'Geliştirilmesi Gereken';
            if (digitsA === 2) return sec <= 20.5 ? 'İyi' : sec <= 25.5 ? 'Normal' : 'Geliştirilmesi Gereken';
            return sec <= 28.5 ? 'İyi' : sec <= 35.5 ? 'Normal' : 'Geliştirilmesi Gereken';
        }
        return sec <= 8 ? 'İyi' : sec <= 16 ? 'Normal' : 'Geliştirilmesi Gereken';
    };

    const buildQuestion = (
        activeMode: MathMode,
        activeExpCat: ExponentCategory,
        activeSpecCat: SpecialCategory,
        activeDigit: 1 | 2 | 3,
        activeMult: number
    ): QuestionPayload => {
        // 1) ÜSLÜ İŞLEM MODU (strictly scoped by grade)
        if (activeMode === 'exponents') {
            if (activeExpCat === 'kare') {
                const bases =
                    safeGrade === 5
                        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                        : safeGrade === 8
                        ? [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25]
                        : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20];
                const b = pickRandom(bases);
                return {
                    q: `${b}²`,
                    ans: String(b * b),
                    op: 'pow',
                    opType: 'Tam Kare Sayılar',
                    digitsA: 1,
                    digitsB: 1,
                    tip: `${b} × ${b} = ${b * b}`
                };
            }

            if (activeExpCat === 'kup') {
                const bases = [1, 2, 3, 4, 5, 6, 7, 10];
                const b = pickRandom(bases);
                return {
                    q: `${b}³`,
                    ans: String(b * b * b),
                    op: 'pow',
                    opType: 'Küp Alma',
                    digitsA: 1,
                    digitsB: 1,
                    tip: `${b} × ${b} × ${b} = ${b * b * b}`
                };
            }

            if (activeExpCat === 'kuvvet') {
                const items = [
                    { q: '2³', ans: '8' },
                    { q: '2⁴', ans: '16' },
                    { q: '2⁵', ans: '32' },
                    { q: '2⁶', ans: '64' },
                    { q: '2⁷', ans: '128' },
                    { q: '2⁸', ans: '256' },
                    { q: '3²', ans: '9' },
                    { q: '3³', ans: '27' },
                    { q: '3⁴', ans: '81' },
                    { q: '4³', ans: '64' },
                    { q: '5³', ans: '125' },
                    { q: '10³', ans: '1000' },
                    { q: '10⁴', ans: '10000' }
                ];
                const item = pickRandom(items);
                return {
                    q: item.q,
                    ans: item.ans,
                    op: 'pow',
                    opType: '2, 3 ve 10’un Kuvvetleri',
                    digitsA: 1,
                    digitsB: 1,
                    tip: `${item.q} = ${item.ans}`
                };
            }

            if (activeExpCat === 'negatif') {
                const items = [
                    { q: '(−2)²', ans: '4', tip: 'Parantezli negatifin çift kuvveti (+): (−2)×(−2) = 4' },
                    { q: '−2²', ans: '-4', tip: 'Parantez yoksa kuvvet sadece 2 ye aittir: −(2²) = −4' },
                    { q: '(−3)²', ans: '9', tip: '(−3) × (−3) = 9' },
                    { q: '−3²', ans: '-9', tip: '−(3²) = −9' },
                    { q: '(−2)³', ans: '-8', tip: 'Negatif sayının tek kuvveti (−): (−2)³ = −8' },
                    { q: '(−3)³', ans: '-27', tip: '(−3) × (−3) × (−3) = −27' },
                    { q: '(−5)²', ans: '25', tip: '(−5) × (−5) = 25' },
                    { q: '−5²', ans: '-25', tip: '−(5²) = −25' },
                    { q: '(−1)¹⁴', ans: '1', tip: '(−1) in çift kuvveti +1 dir' },
                    { q: '(−1)¹⁵', ans: '-1', tip: '(−1) in tek kuvveti −1 dir' },
                    { q: '(−4)²', ans: '16', tip: '(−4) × (−4) = 16' },
                    { q: '(−2)⁴', ans: '16', tip: '(−2)⁴ = +16' }
                ];
                const item = pickRandom(items);
                return {
                    q: item.q,
                    ans: item.ans,
                    op: 'pow',
                    opType: 'Negatif Taban ve Parantez',
                    digitsA: 1,
                    digitsB: 1,
                    tip: item.tip
                };
            }

            // 8. Sınıf: Üslü İşlem Kuralları
            const ruleItems = [
                { q: '2³ × 2²', ans: '32', tip: 'Tabanlar aynıysa üsler toplanır: 2⁵ = 32' },
                { q: '3⁴ ÷ 3²', ans: '9', tip: 'Tabanlar aynıysa üsler çıkarılır: 3² = 9' },
                { q: '2⁻² × 2⁵', ans: '8', tip: '2⁻²⁺⁵ = 2³ = 8' },
                { q: '4³ ÷ 2⁴', ans: '4', tip: '2⁶ ÷ 2⁴ = 2² = 4' },
                { q: '5⁵ ÷ 5³', ans: '25', tip: '5² = 25' },
                { q: '(2²)³', ans: '64', tip: 'Üssün üssü çarpılır: 2⁶ = 64' },
                { q: '7⁰ + 3²', ans: '10', tip: '7⁰ = 1 ve 3² = 9 ⇒ 10' },
                { q: '(1/2)⁻³', ans: '8', tip: 'Ters çevirip pozitif üs al: 2³ = 8' },
                { q: '2³ × 5³', ans: '1000', tip: 'Üsler aynıyken tabanlar çarpılır: 10³ = 1000' },
                { q: '12² ÷ 4²', ans: '9', tip: '(12 ÷ 4)² = 3² = 9' }
            ];
            const rItem = pickRandom(ruleItems);
            return {
                q: rItem.q,
                ans: rItem.ans,
                op: 'pow',
                opType: 'Üslü İşlem Kuralları',
                digitsA: 1,
                digitsB: 1,
                tip: rItem.tip
            };
        }

        // 2) ÇARPIM TABLOSU MODU (5. Sınıf)
        if (activeMode === 'multiplication_table') {
            const multiplier = Math.floor(Math.random() * 9) + 2; // 2..10
            return {
                q: `${activeMult} × ${multiplier}`,
                ans: String(activeMult * multiplier),
                op: '*',
                opType: `${activeMult}'ler Çarpım Tablosu`,
                digitsA: 1,
                digitsB: multiplier >= 10 ? 2 : 1
            };
        }

        // 3) GRADE-SPECIFIC SPECIAL MODE (strictly aligned per grade!)
        if (activeMode === 'grade_special') {
            if (activeSpecCat === 'g5_kesir_yuzde') {
                const pool = [
                    { q: '100’ün %25’i', ans: '25', tip: '100 ÷ 4 = 25' },
                    { q: '80’in %50’si', ans: '40', tip: '%50 yarısı demektir: 80 ÷ 2 = 40' },
                    { q: '60’ın %25’i', ans: '15', tip: '%25 çeyreğidir: 60 ÷ 4 = 15' },
                    { q: '200’ün %10’u', ans: '20', tip: '%10 onda biridir: 200 ÷ 10 = 20' },
                    { q: '50’nin %20’si', ans: '10', tip: '50 ÷ 5 = 10' },
                    { q: '40’ın 3/4’ü', ans: '30', tip: '(40 ÷ 4) × 3 = 30' },
                    { q: '36’nın 2/3’ü', ans: '24', tip: '(36 ÷ 3) × 2 = 24' },
                    { q: '45’in 2/5’i', ans: '18', tip: '(45 ÷ 5) × 2 = 18' },
                    { q: '3/4 kesri % kaçtır?', ans: '75', tip: '3×25 / 4×25 = 75/100 = %75' },
                    { q: '2/5 kesri % kaçtır?', ans: '40', tip: '2×20 / 5×20 = 40/100 = %40' },
                    { q: '1/2’si 18 olan sayı', ans: '36', tip: '18 × 2 = 36' },
                    { q: '1/4’ü 12 olan sayı', ans: '48', tip: '12 × 4 = 48' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '5. Sınıf Kesir & Yüzde', digitsA: 2, digitsB: 1, tip: it.tip };
            }

            if (activeSpecCat === 'g5_ondalik') {
                const pool = [
                    { q: '0,4 + 0,6', ans: '1', tip: '4 onda bir + 6 onda bir = 10 onda bir = 1' },
                    { q: '1,5 + 2,5', ans: '4', tip: '1,5 + 2,5 = 4' },
                    { q: '3,2 + 1,8', ans: '5', tip: '0,2 + 0,8 = 1 ⇒ 3 + 1 + 1 = 5' },
                    { q: '5 − 0,5', ans: '4.5', tip: '5,0 − 0,5 = 4,5' },
                    { q: '2,7 − 1,2', ans: '1.5', tip: '2,7 − 1,2 = 1,5' },
                    { q: '0,25 + 0,75', ans: '1', tip: 'Çeyrek + üç çeyrek = 1 tam' },
                    { q: '4,6 − 2,6', ans: '2', tip: 'Ondalık kısımlar gider: 4 − 2 = 2' },
                    { q: '0,8 + 0,7', ans: '1.5', tip: '8 + 7 = 15 onda bir = 1,5' },
                    { q: '6,5 + 3,5', ans: '10', tip: '6 + 3 + 1 = 10' },
                    { q: '10 − 2,5', ans: '7.5', tip: '10,0 − 2,5 = 7,5' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '5. Sınıf Ondalık İşlemler', digitsA: 2, digitsB: 2, tip: it.tip, inputHint: 'Ondalık için nokta veya virgül kullanabilirsin (örn: 1,5)' };
            }

            if (activeSpecCat === 'g6_kesir') {
                const pool = [
                    { q: '12 × (2/3)', ans: '8', tip: '(12 ÷ 3) × 2 = 8' },
                    { q: '20 × (3/4)', ans: '15', tip: '(20 ÷ 4) × 3 = 15' },
                    { q: '6 ÷ (1/2)', ans: '12', tip: '6 × 2 = 12' },
                    { q: '8 ÷ (1/4)', ans: '32', tip: '8 × 4 = 32' },
                    { q: '15 ÷ (3/2)', ans: '10', tip: '15 × (2/3) = 10' },
                    { q: '(3/4) × (8/3)', ans: '2', tip: '3 ler sadeleşir, 8 ÷ 4 = 2' },
                    { q: '(5/6) × (12/5)', ans: '2', tip: '5 ler sadeleşir, 12 ÷ 6 = 2' },
                    { q: '(4/5) ÷ (2/5)', ans: '2', tip: 'Paydalar eşit: 4 ÷ 2 = 2' },
                    { q: '(9/7) ÷ (3/7)', ans: '3', tip: 'Paydalar eşit: 9 ÷ 3 = 3' },
                    { q: '18 × (5/6)', ans: '15', tip: '(18 ÷ 6) × 5 = 15' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '6. Sınıf Kesir Çarpma & Bölme', digitsA: 2, digitsB: 1, tip: it.tip };
            }

            if (activeSpecCat === 'g6_ondalik') {
                const pool = [
                    { q: '2,5 × 4', ans: '10', tip: '2,5 × 2 = 5 ⇒ 5 × 2 = 10' },
                    { q: '0,5 × 16', ans: '8', tip: '0,5 ile çarpmak yarısını almaktır' },
                    { q: '0,25 × 20', ans: '5', tip: '0,25 ile çarpmak 4 e bölmektir' },
                    { q: '2,4 ÷ 0,6', ans: '4', tip: '24 ÷ 6 = 4' },
                    { q: '3,5 ÷ 0,5', ans: '7', tip: '35 ÷ 5 = 7' },
                    { q: '4,8 ÷ 0,8', ans: '6', tip: '48 ÷ 8 = 6' },
                    { q: '1,2 × 10', ans: '12', tip: '10 ile çarpmada virgül 1 sağa kayar' },
                    { q: '0,36 × 100', ans: '36', tip: '100 ile çarpmada virgül 2 sağa kayar' },
                    { q: '7,2 ÷ 0,9', ans: '8', tip: '72 ÷ 9 = 8' },
                    { q: '1,5 × 6', ans: '9', tip: '1×6 + 0,5×6 = 6 + 3 = 9' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '6. Sınıf Ondalık Çarpma & Bölme', digitsA: 2, digitsB: 2, tip: it.tip };
            }

            if (activeSpecCat === 'g7_tam_sayi') {
                const pool = [
                    { q: '(−8) + (+5)', ans: '-3', tip: '8 − 5 = 3, büyüğün işareti eksi ⇒ −3' },
                    { q: '(−6) − (−10)', ans: '4', tip: '−6 + 10 = +4' },
                    { q: '(−4) × (−7)', ans: '28', tip: 'Aynı işaretli çarpım pozitiftir: +28' },
                    { q: '(−9) × (+6)', ans: '-54', tip: 'Zıt işaretli çarpım negatiftir: −54' },
                    { q: '(−48) ÷ (−6)', ans: '8', tip: '(−) ÷ (−) = (+): +8' },
                    { q: '(+56) ÷ (−7)', ans: '-8', tip: '(+) ÷ (−) = (−): −8' },
                    { q: '|−12| − |−5|', ans: '7', tip: '12 − 5 = 7' },
                    { q: '(−15) + (−9)', ans: '-24', tip: 'İki negatifin toplamı negatiftir: −24' },
                    { q: '12 − (−8)', ans: '20', tip: '12 + 8 = 20' },
                    { q: '(−3) × (−2) × (−5)', ans: '-30', tip: '3 negatifin çarpımı negatiftir: −30' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '7. Sınıf Tam Sayılar', digitsA: 2, digitsB: 1, tip: it.tip };
            }

            if (activeSpecCat === 'g7_rasyonel') {
                const pool = [
                    { q: '(−3/4) × (−8)', ans: '6', tip: '(−)×(−)=(+), (8÷4)×3 = 6' },
                    { q: '(−2/5) × 15', ans: '-6', tip: '(−2) × 3 = −6' },
                    { q: '(−6/7) ÷ (2/7)', ans: '-3', tip: 'Paydalar eşit: (−6) ÷ 2 = −3' },
                    { q: '(1/2) + (3/2)', ans: '2', tip: '4/2 = 2' },
                    { q: '(−5/3) + (2/3)', ans: '-1', tip: '−3/3 = −1' },
                    { q: '(3/4) − (7/4)', ans: '-1', tip: '−4/4 = −1' },
                    { q: '4 ÷ (−1/2)', ans: '-8', tip: '4 × (−2) = −8' },
                    { q: '(−1/3) × (−18)', ans: '6', tip: '18 ÷ 3 = 6' },
                    { q: '(5/2) ÷ (−1/2)', ans: '-5', tip: '5 ÷ (−1) = −5' },
                    { q: '(−4/5) × (−10)', ans: '8', tip: '(10÷5)×4 = 8' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '7. Sınıf Rasyonel Sayılar', digitsA: 2, digitsB: 1, tip: it.tip };
            }

            if (activeSpecCat === 'g7_yuzde') {
                const pool = [
                    { q: '80’in %15’i', ans: '12', tip: '%10 = 8, %5 = 4 ⇒ 8 + 4 = 12' },
                    { q: '200’ün %20 fazlası', ans: '240', tip: '200 + 40 = 240' },
                    { q: '150’nin %20 eksiği', ans: '120', tip: '150 − 30 = 120' },
                    { q: '%25’i 15 olan sayı', ans: '60', tip: '15 × 4 = 60' },
                    { q: '%10’u 14 olan sayı', ans: '140', tip: '14 × 10 = 140' },
                    { q: '300’ün %12’si', ans: '36', tip: '3 × 12 = 36' },
                    { q: '250’nin %40’ı', ans: '100', tip: '25 × 4 = 100' },
                    { q: '40 sayısı 80’in % kaçıdır?', ans: '50', tip: '40 / 80 = 1/2 = %50' },
                    { q: '18 sayısı 60’ın % kaçıdır?', ans: '30', tip: '18 / 60 = 3/10 = %30' },
                    { q: '400 TL’ye %25 indirimli fiyat', ans: '300', tip: '400 − 100 = 300 TL' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'frac', opType: '7. Sınıf Yüzde & Orantı', digitsA: 2, digitsB: 2, tip: it.tip };
            }

            if (activeSpecCat === 'g8_tam_kare_kok') {
                const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400];
                const sq = pickRandom(squares);
                const root = Math.round(Math.sqrt(sq));
                return {
                    q: `√${sq}`,
                    ans: String(root),
                    op: 'root',
                    opType: 'Tam Kare Karekökler',
                    digitsA: 2,
                    digitsB: 1,
                    tip: `${root}² = ${sq} ⇒ √${sq} = ${root}`
                };
            }

            if (activeSpecCat === 'g8_koklu_islem') {
                const pool = [
                    { q: '√3 × √12', ans: '6', tip: '√(3×12) = √36 = 6' },
                    { q: '√2 × √8', ans: '4', tip: '√16 = 4' },
                    { q: '√5 × √20', ans: '10', tip: '√100 = 10' },
                    { q: '√2 × √18', ans: '6', tip: '√36 = 6' },
                    { q: '√72 ÷ √2', ans: '6', tip: '√(72÷2) = √36 = 6' },
                    { q: '√75 ÷ √3', ans: '5', tip: '√25 = 5' },
                    { q: '√98 ÷ √2', ans: '7', tip: '√49 = 7' },
                    { q: '√128 ÷ √2', ans: '8', tip: '√64 = 8' },
                    { q: '√45 ÷ √5', ans: '3', tip: '√9 = 3' },
                    { q: '2√3 × √3', ans: '6', tip: '2 × 3 = 6' },
                    { q: '3√5 × √5', ans: '15', tip: '3 × 5 = 15' },
                    { q: '√64 + √36', ans: '14', tip: '8 + 6 = 14' },
                    { q: '√169 − √49', ans: '6', tip: '13 − 7 = 6' }
                ];
                const it = pickRandom(pool);
                return { q: it.q, ans: it.ans, op: 'root', opType: 'Köklü Çarpma, Bölme & Toplama', digitsA: 2, digitsB: 2, tip: it.tip };
            }

            // g8_rasyonel_kok
            const pool = [
                { q: '√0,36 × 10', ans: '6', tip: '0,6 × 10 = 6' },
                { q: '√1,44 × 10', ans: '12', tip: '1,2 × 10 = 12' },
                { q: '√0,09 × 10', ans: '3', tip: '0,3 × 10 = 3' },
                { q: '√0,25 + √0,25', ans: '1', tip: '0,5 + 0,5 = 1' },
                { q: '√1,21 + √0,81', ans: '2', tip: '1,1 + 0,9 = 2' },
                { q: '√(16/4)', ans: '2', tip: '4 / 2 = 2' },
                { q: '√(100/25)', ans: '2', tip: '10 / 5 = 2' },
                { q: '√(81/9)', ans: '3', tip: '9 / 3 = 3' },
                { q: '√0,64 ÷ √0,04', ans: '4', tip: '0,8 ÷ 0,2 = 4' },
                { q: '√1,69 − √0,09', ans: '1', tip: '1,3 − 0,3 = 1' }
            ];
            const it = pickRandom(pool);
            return { q: it.q, ans: it.ans, op: 'root', opType: 'Ondalık & Rasyonel Kök', digitsA: 2, digitsB: 2, tip: it.tip };
        }

        // 4) BASAMAKLI DÖRT İŞLEM MODU
        const ops: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/'];
        const op = pickRandom(ops);

        let a = 0;
        let b = 0;
        let ans = 0;
        let digitsA = activeDigit;
        let digitsB = activeDigit;

        const getNum = (digits: number) => {
            if (digits === 1) return Math.floor(Math.random() * 9) + 1;
            if (digits === 2) return Math.floor(Math.random() * 90) + 10;
            return Math.floor(Math.random() * 900) + 100;
        };

        if (op === '+') {
            a = getNum(activeDigit);
            b = getNum(activeDigit);
            ans = a + b;
        } else if (op === '-') {
            a = getNum(activeDigit);
            b = getNum(activeDigit);
            if (b > a) [a, b] = [b, a];
            ans = a - b;
        } else if (op === '*') {
            if (activeDigit === 1) {
                a = getNum(1);
                b = getNum(1);
                digitsA = 1;
                digitsB = 1;
            } else if (activeDigit === 2) {
                a = getNum(2);
                b = Math.random() > 0.5 ? getNum(1) : Math.floor(Math.random() * 15) + 10;
                digitsA = 2;
                digitsB = b >= 10 ? 2 : 1;
            } else {
                a = getNum(3);
                b = Math.floor(Math.random() * 8) + 2;
                digitsA = 3;
                digitsB = 1;
            }
            ans = a * b;
        } else {
            if (activeDigit === 1) {
                b = Math.floor(Math.random() * 8) + 2;
                ans = Math.floor(Math.random() * 8) + 1;
                a = ans * b;
                digitsA = a >= 10 ? 2 : 1;
                digitsB = 1;
            } else if (activeDigit === 2) {
                b = Math.floor(Math.random() * 8) + 2;
                ans = Math.floor(Math.random() * 20) + 5;
                a = ans * b;
                digitsA = a >= 100 ? 3 : 2;
                digitsB = 1;
            } else {
                b = Math.floor(Math.random() * 8) + 2;
                ans = Math.floor(Math.random() * 80) + 20;
                a = ans * b;
                digitsA = 3;
                digitsB = 1;
            }
        }

        const opLabels: Record<string, string> = {
            '+': 'Toplama',
            '-': 'Çıkarma',
            '*': 'Çarpma',
            '/': 'Bölme'
        };
        const displaySymbol = op === '*' ? '×' : op === '/' ? '÷' : op;

        return {
            q: `${a} ${displaySymbol} ${b}`,
            ans: String(ans),
            op,
            opType: `${activeDigit} Basamaklı ${opLabels[op]}`,
            digitsA,
            digitsB
        };
    };

    const generateNewQuestion = (overrides?: {
        nextMode?: MathMode;
        nextExpCat?: ExponentCategory;
        nextSpecCat?: SpecialCategory;
        nextDigit?: 1 | 2 | 3;
        nextMult?: number;
    }) => {
        const activeMode = overrides?.nextMode ?? mode;
        const activeExpCat = overrides?.nextExpCat ?? exponentCat;
        const activeSpecCat = overrides?.nextSpecCat ?? specialCat;
        const activeDigit = overrides?.nextDigit ?? digitLevel;
        const activeMult = overrides?.nextMult ?? multFactor;

        let nextQ = buildQuestion(activeMode, activeExpCat, activeSpecCat, activeDigit, activeMult);
        // Avoid immediate consecutive duplicate question
        for (let tries = 0; tries < 6 && nextQ.q === currentQuestion.q; tries++) {
            nextQ = buildQuestion(activeMode, activeExpCat, activeSpecCat, activeDigit, activeMult);
        }

        setElapsedTime(0);
        setStartTime(Date.now());
        setInput('');
        setCurrentQuestion(nextQ);
    };

    const startGame = () => {
        setGameState('playing');
        setSuccessCount(0);
        setMultSuccessInRow(0);
        setExponentStreak(0);
        setSpecialStreak(0);
        setHistory([]);
        setLastPerf(null);
        generateNewQuestion();
        setTimeout(() => inputRef.current?.focus(), 80);
    };

    const handleSubmit = () => {
        if (!input.trim()) return;

        const duration = (Date.now() - startTime) / 1000;
        const isCorrect = normalizeAnswer(input) === normalizeAnswer(currentQuestion.ans);

        const perf = evaluateSpeed(
            duration,
            currentQuestion.op,
            currentQuestion.digitsA,
            currentQuestion.digitsB
        );

        const newHistoryItem: HistoryItem = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            q: currentQuestion.q,
            userAns: input.trim(),
            correctAns: currentQuestion.ans.replace('.', ','),
            correct: isCorrect,
            durationSec: parseFloat(duration.toFixed(1)),
            perf,
            category: currentQuestion.opType,
            tip: currentQuestion.tip
        };

        setHistory((prev) => [newHistoryItem, ...prev]);
        setLastPerf(perf);

        void saveMentalMathRecord({
            ...newHistoryItem,
            schoolId,
            studentName,
            studentClass,
            grade: safeGrade,
            timestampIso: new Date().toISOString()
        });

        let nextDigit = digitLevel;
        let nextMult = multFactor;

        if (isCorrect) {
            if (mode === 'exponents') {
                const nextStreak = exponentStreak + 1;
                setExponentStreak(nextStreak);
                if (nextStreak === 5) {
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);
                }
            } else if (mode === 'grade_special') {
                const nextStreak = specialStreak + 1;
                setSpecialStreak(nextStreak);
                if (nextStreak === 5) {
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);
                }
            } else if (mode === 'multiplication_table') {
                const nextRow = multSuccessInRow + 1;
                setMultSuccessInRow(nextRow);
                if (nextRow >= 7) {
                    if (!masteredTables.includes(multFactor)) {
                        setMasteredTables((prev) => [...prev, multFactor]);
                    }
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);
                    if (multFactor < 9) {
                        nextMult = multFactor + 1;
                        setMultFactor(nextMult);
                        setMultSuccessInRow(0);
                    }
                }
            } else if (mode === 'digits') {
                const nextSuccess = successCount + 1;
                setSuccessCount(nextSuccess);
                if (nextSuccess >= 5 && digitLevel < 3) {
                    nextDigit = (digitLevel + 1) as 1 | 2 | 3;
                    setDigitLevel(nextDigit);
                    setSuccessCount(0);
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);
                }
            }
        } else {
            if (mode === 'exponents') setExponentStreak(0);
            else if (mode === 'grade_special') setSpecialStreak(0);
            else if (mode === 'multiplication_table') setMultSuccessInRow(0);
            else if (mode === 'digits') setSuccessCount(Math.max(0, successCount - 1));
        }

        generateNewQuestion({ nextDigit, nextMult });
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // Launcher card metadata — strictly matched to active mode (ZERO fallthrough!)
    const launcherMeta = useMemo(() => {
        if (mode === 'exponents') {
            const activeLabel = exponentCats.find((c) => c.id === exponentCat)?.label || '';
            return {
                title:
                    safeGrade === 5
                        ? '5. Sınıf Kare & Küp Antrenmanı'
                        : safeGrade === 6
                        ? '6. Sınıf Üslü Nicelikler Antrenmanı'
                        : `${safeGrade}. Sınıf Üslü İşlem Merkezi`,
                desc: `Seçili kategori: ${activeLabel}. Zihinden hızlıca hesaplayarak 5'li seri yakalayın.`,
                iconBg: 'bg-purple-50 border-purple-100 text-purple-600',
                btnBg: 'bg-purple-600 hover:bg-purple-500 shadow-purple-200',
                fast: '< 3.5 sn',
                mid: '3.5 – 6.5 sn',
                slow: '> 6.5 sn'
            };
        }
        if (mode === 'multiplication_table') {
            return {
                title: `${multFactor}'ler Çarpım Tablosu Testi`,
                desc: 'Her işlem için süreniz ölçülür. 7 doğru işlemle bir sonraki çarpım tablosuna geçersiniz.',
                iconBg: 'bg-amber-50 border-amber-100 text-amber-600',
                btnBg: 'bg-amber-500 hover:bg-amber-600 shadow-amber-200',
                fast: '< 5.5 sn',
                mid: '5.5 – 8.5 sn',
                slow: '> 8.5 sn'
            };
        }
        if (mode === 'grade_special') {
            const activeLabel = specialConfig.cats.find((c) => c.id === specialCat)?.label || '';
            return {
                title: specialConfig.heroTitle,
                desc: `Seçili kategori: ${activeLabel}. ${specialConfig.heroDesc}`,
                iconBg: 'bg-emerald-50 border-emerald-100 text-emerald-600',
                btnBg: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-200',
                fast: '< 5.0 sn',
                mid: '5.0 – 9.0 sn',
                slow: '> 9.0 sn'
            };
        }
        return {
            title: `${digitLevel} Basamaklı Zihinden Dört İşlem`,
            desc: 'Her soruda harcadığınız anlık süre ölçülür. 5 başarılı yanıtta sonraki basamağa terfi edersiniz.',
            iconBg: 'bg-indigo-50 border-indigo-100 text-indigo-600',
            btnBg: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200',
            fast: digitLevel === 1 ? '< 3.5 sn' : digitLevel === 2 ? '< 6.5 sn' : '< 14.5 sn',
            mid: digitLevel === 1 ? '3.5 – 5.5 sn' : digitLevel === 2 ? '6.5 – 8.5 sn' : '14.5 – 19.5 sn',
            slow: digitLevel === 1 ? '> 5.5 sn' : digitLevel === 2 ? '> 8.5 sn' : '> 19.5 sn'
        };
    }, [mode, safeGrade, exponentCat, exponentCats, multFactor, specialCat, specialConfig, digitLevel]);

    return (
        <div className="w-full max-w-7xl mx-auto py-4 px-2 sm:px-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-black uppercase tracking-wider border border-amber-200">
                    <Zap size={14} className="text-amber-500 fill-amber-500" />
                    {safeGrade}. Sınıf Zihinsel Aritmetik &amp; Kavram Haritaları
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Zihinden İşlem Antrenörü</h2>
                <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                    {safeGrade}. sınıf müfredatına birebir uyumlu zihinden işlem modları ve sıralamalı kavram haritalarıyla işlem refleksinizi geliştirin.
                </p>
            </div>

            {/* Grade-Aligned Mode Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100 p-2 rounded-2xl max-w-5xl mx-auto shadow-xs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = mode === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => {
                                setMode(tab.id);
                                setGameState('idle');
                                setLastPerf(null);
                            }}
                            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                isActive ? tab.activeClass : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                            }`}
                        >
                            <Icon size={14} /> {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Mind Maps Mode View (All Grades 5-8) */}
            {mode === 'mind_maps' && <MindMapsView grade={safeGrade} />}

            {mode !== 'mind_maps' && (
                <>
                    {/* Üslü İşlem Alt Kategorileri (Sınıf Düzeyine Göre Filtrelenmiş) */}
                    {mode === 'exponents' && (
                        <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                            <span className="text-xs font-bold text-slate-500 mr-1">Kategori:</span>
                            {exponentCats.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => {
                                        setExponentCat(cat.id);
                                        setExponentStreak(0);
                                        if (gameState === 'playing') {
                                            generateNewQuestion({ nextExpCat: cat.id });
                                        }
                                    }}
                                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                        exponentCat === cat.id
                                            ? 'bg-purple-600 text-white shadow-sm'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Sınıfa Özel Alt Kategoriler (Kesir/Yüzde/Tam Sayı/Rasyonel & Köklü) */}
                    {mode === 'grade_special' && (
                        <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                            <span className="text-xs font-bold text-slate-500 mr-1">Alt Konu:</span>
                            {specialConfig.cats.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => {
                                        setSpecialCat(cat.id);
                                        setSpecialStreak(0);
                                        if (gameState === 'playing') {
                                            generateNewQuestion({ nextSpecCat: cat.id });
                                        }
                                    }}
                                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                        specialCat === cat.id
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Çarpım Tablosu Alt Butonları (5. Sınıf) */}
                    {mode === 'multiplication_table' && (
                        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                            <span className="text-xs font-bold text-slate-500 mr-1">Çarpım:</span>
                            {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                                const isMastered = masteredTables.includes(num);
                                const isCurrent = multFactor === num;
                                return (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => {
                                            setMultFactor(num);
                                            setMultSuccessInRow(0);
                                            if (gameState === 'playing') {
                                                generateNewQuestion({ nextMult: num });
                                            }
                                        }}
                                        className={`w-11 h-10 rounded-xl font-black text-xs flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                                            isCurrent
                                                ? 'bg-amber-500 text-white shadow-md shadow-amber-200 ring-2 ring-amber-400'
                                                : isMastered
                                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        {num}&apos;ler
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Basamak Seçici */}
                    {mode === 'digits' && (
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-xs font-bold text-slate-500">Zorluk Basamağı:</span>
                            {([1, 2, 3] as const).map((lvl) => (
                                <button
                                    key={lvl}
                                    type="button"
                                    onClick={() => {
                                        setDigitLevel(lvl);
                                        setSuccessCount(0);
                                        if (gameState === 'playing') {
                                            generateNewQuestion({ nextDigit: lvl });
                                        }
                                    }}
                                    className={`px-4 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                                        digitLevel === lvl
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    {lvl} Basamaklı
                                </button>
                            ))}
                        </div>
                    )}

                    {/* LEVEL UP NOTIFICATION */}
                    <AnimatePresence>
                        {showLevelUpAlert && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                className="bg-emerald-500 text-white p-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 font-black text-center"
                            >
                                <Award size={24} className="animate-bounce" />
                                <span>
                                    {mode === 'exponents'
                                        ? 'Harika! 5 Başarılı Üslü İşlem ile Seri Yakaladın!'
                                        : mode === 'grade_special'
                                        ? `Harika! ${specialConfig.tabLabel} alanında 5’li Seri Yakaladın!`
                                        : mode === 'multiplication_table'
                                        ? `Tebrikler! ${Math.max(2, multFactor - 1)}'ler Çarpım Tablosunu 7/7 Başarıyla Kavradın!`
                                        : `Harika! 5 Başarılı İşlem ile ${digitLevel}. Basamağa Yükseldin!`}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Interactive Card */}
                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
                        {gameState === 'idle' ? (
                            <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
                                <div className={`w-20 h-20 border rounded-3xl flex items-center justify-center shadow-sm ${launcherMeta.iconBg}`}>
                                    {mode === 'grade_special' ? <SquareFunction size={38} /> : <Zap size={38} />}
                                </div>
                                <div className="space-y-2 max-w-lg">
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                                        {launcherMeta.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {launcherMeta.desc}
                                    </p>
                                </div>

                                {/* Benchmark speed table preview */}
                                <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
                                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                                        <Timer size={14} /> MEB Referans Hız Skalası
                                    </h4>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                        <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-emerald-800 font-bold">
                                            <div className="text-[10px] text-emerald-600 uppercase font-black">İyi Hız</div>
                                            <div>{launcherMeta.fast}</div>
                                        </div>
                                        <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-amber-800 font-bold">
                                            <div className="text-[10px] text-amber-600 uppercase font-black">Normal Hız</div>
                                            <div>{launcherMeta.mid}</div>
                                        </div>
                                        <div className="bg-rose-50 border border-rose-200 p-2 rounded-xl text-rose-800 font-bold">
                                            <div className="text-[10px] text-rose-600 uppercase font-black">Geliştirilmeli</div>
                                            <div>{launcherMeta.slow}</div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={startGame}
                                    className={`${launcherMeta.btnBg} text-white font-black py-4 px-10 rounded-2xl text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer`}
                                >
                                    <span>Antrenmanı Başlat</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 py-2">
                                {/* Live Stat Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Kategori:</span>
                                        <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-xl text-xs font-black">
                                            {currentQuestion.opType}
                                        </span>
                                    </div>

                                    {/* Live Timer */}
                                    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-1.5 rounded-2xl font-mono text-sm font-black">
                                        <Timer size={16} />
                                        <span className="tabular-nums">{elapsedTime.toFixed(1)} sn</span>
                                    </div>

                                    {/* Streak/Progress */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Seri:</span>
                                        <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1">
                                            <Star size={12} className="fill-amber-500" />
                                            {mode === 'exponents'
                                                ? `${exponentStreak}/5`
                                                : mode === 'grade_special'
                                                ? `${specialStreak}/5`
                                                : mode === 'multiplication_table'
                                                ? `${multSuccessInRow}/7`
                                                : `${successCount}/5`}
                                        </span>
                                    </div>
                                </div>

                                {/* Question Expression */}
                                <div className="text-center py-6 space-y-2">
                                    <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono">
                                        {currentQuestion.q} = ?
                                    </div>
                                    {currentQuestion.inputHint && (
                                        <p className="text-xs text-slate-400 font-medium">{currentQuestion.inputHint}</p>
                                    )}
                                </div>

                                {/* Input and Submit */}
                                <div className="max-w-sm mx-auto space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            inputMode="decimal"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Sonucu yaz..."
                                            className="flex-1 bg-slate-50 border-2 border-slate-300 focus:border-indigo-600 focus:bg-white rounded-2xl py-3.5 px-4 text-center text-2xl font-black text-slate-900 outline-none transition-all shadow-inner"
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className={`${launcherMeta.btnBg} text-white font-black px-6 rounded-2xl shadow-md transition-all flex items-center justify-center text-sm cursor-pointer`}
                                        >
                                            Cevapla
                                        </button>
                                    </div>
                                </div>

                                {/* Last Performance Badge */}
                                {lastPerf && (
                                    <div className="flex justify-center">
                                        <span
                                            className={`px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                                                lastPerf === 'İyi'
                                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                                    : lastPerf === 'Normal'
                                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                                            }`}
                                        >
                                            <span>Hız Derecesi: {lastPerf}</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Answer History Table */}
                    {history.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-black text-slate-800 text-sm flex items-center justify-between">
                                <span>Son Yapılan Zihinden İşlemler ({history.length})</span>
                                <button
                                    type="button"
                                    onClick={() => setHistory([])}
                                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-bold cursor-pointer"
                                >
                                    <RefreshCw size={12} /> Temizle
                                </button>
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                                            <th className="pb-2">İşlem</th>
                                            <th className="pb-2">Senin Cevabın</th>
                                            <th className="pb-2">Doğru Sonuç</th>
                                            <th className="pb-2">Süre</th>
                                            <th className="pb-2">Hız Durumu</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {history.map((item) => (
                                            <tr key={item.id} className="font-bold">
                                                <td className="py-2.5 text-slate-800 font-mono text-sm">
                                                    <div>{item.q}</div>
                                                    {!item.correct && item.tip && (
                                                        <div className="text-[11px] font-sans font-medium text-indigo-600 mt-0.5">
                                                            💡 {item.tip}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className={`py-2.5 font-mono ${item.correct ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                    {item.userAns}
                                                </td>
                                                <td className="py-2.5 text-slate-600 font-mono">{item.correctAns}</td>
                                                <td className="py-2.5 font-mono text-slate-700">{item.durationSec} sn</td>
                                                <td className="py-2.5">
                                                    <span
                                                        className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                                                            item.perf === 'İyi'
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                : item.perf === 'Normal'
                                                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                        }`}
                                                    >
                                                        {item.perf}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
