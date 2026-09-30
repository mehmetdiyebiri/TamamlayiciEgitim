import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Timer, Award, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCw, Star, Layers, Sparkles } from 'lucide-react';

type MathMode = 'digits' | 'multiplication_table' | 'advanced_fractions' | 'exponents';
type ExponentCategory = 'kare' | 'kup' | 'kuvvet' | 'negatif' | 'ozellikler';

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

export const MentalMathView = ({ grade = 5 }: { grade?: number }) => {
    // Mode selection: default to multiplication_table for 5th grade or exponents / digits
    const [mode, setMode] = useState<MathMode>(grade === 5 ? 'multiplication_table' : 'digits');
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
    
    // Digits Mode state (1, 2, 3 basamaklı)
    const [digitLevel, setDigitLevel] = useState<1 | 2 | 3>(1); // 1-digit, 2-digit, 3-digit
    
    // Multiplication Table Mode state (2'ler, 3'ler, ... 9'lar)
    const [multFactor, setMultFactor] = useState<number>(2); // 2 to 9
    const [multSuccessInRow, setMultSuccessInRow] = useState<number>(0); // 7 needed to master
    const [masteredTables, setMasteredTables] = useState<number[]>([]);

    // Exponent Mode state
    const [exponentCat, setExponentCat] = useState<ExponentCategory>('kare');
    const [exponentStreak, setExponentStreak] = useState<number>(0);

    // Shared progress state
    const [successCount, setSuccessCount] = useState(0); // 5 needed to advance digit level
    const [currentQuestion, setCurrentQuestion] = useState<{
        q: string;
        ans: number | string;
        op: '+' | '-' | '*' | '/' | 'frac' | 'root' | 'pow';
        opType: string;
        digitsA: number;
        digitsB: number;
        tip?: string;
    }>({ q: '', ans: 0, op: '+', opType: 'Toplama', digitsA: 1, digitsB: 1 });

    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [lastPerf, setLastPerf] = useState<'İyi' | 'Normal' | 'Geliştirilmesi Gereken' | null>(null);
    const [showLevelUpAlert, setShowLevelUpAlert] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Live Stopwatch timer
    useEffect(() => {
        if (gameState === 'playing') {
            timerRef.current = setInterval(() => {
                setElapsedTime((Date.now() - startTime) / 1000);
            }, 100);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameState, startTime]);

    // Save history to localStorage for teacher reporting
    useEffect(() => {
        if (history.length > 0) {
            try {
                const existing = JSON.parse(localStorage.getItem('mit_mental_math_results') || '[]');
                const latest = history[0];
                const updated = [latest, ...existing].slice(0, 50);
                localStorage.setItem('mit_mental_math_results', JSON.stringify(updated));
            } catch (e) {
                console.error(e);
            }
        }
    }, [history]);

    // Exact speed evaluation matching user specification and feedback:
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

        if (op === '+') {
            const dig = Math.max(digitsA, digitsB);
            if (dig <= 1) {
                if (sec <= 3.5) return 'İyi';
                if (sec <= 5.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else if (dig === 2) {
                if (sec <= 6.5) return 'İyi';
                if (sec <= 8.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else {
                if (sec <= 14.5) return 'İyi';
                if (sec <= 19.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            }
        }

        if (op === '-') {
            const dig = Math.max(digitsA, digitsB);
            if (dig <= 1) {
                if (sec <= 3.5) return 'İyi';
                if (sec <= 5.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else if (dig === 2) {
                if (sec <= 6.5) return 'İyi';
                if (sec <= 8.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else {
                if (sec <= 14.5) return 'İyi';
                if (sec <= 19.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            }
        }

        if (op === '*') {
            if (digitsA === 1 && digitsB === 1) {
                if (sec < 5.5) return 'İyi';
                if (sec <= 8.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else if ((digitsA === 2 && digitsB === 1) || (digitsA === 1 && digitsB === 2)) {
                if (sec <= 10.5) return 'İyi';
                if (sec <= 15.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else {
                if (sec <= 18.5) return 'İyi';
                if (sec <= 25.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            }
        }

        if (op === '/') {
            if (digitsA <= 1) {
                if (sec < 5.5) return 'İyi';
                if (sec <= 8.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else if (digitsA === 2) {
                if (sec <= 20.5) return 'İyi';
                if (sec <= 25.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            } else {
                if (sec <= 28.5) return 'İyi';
                if (sec <= 35.5) return 'Normal';
                return 'Geliştirilmesi Gereken';
            }
        }

        // Rational / Root numbers default
        if (sec <= 8) return 'İyi';
        if (sec <= 16) return 'Normal';
        return 'Geliştirilmesi Gereken';
    };

    // Question generators
    const generateNewQuestion = () => {
        setElapsedTime(0);
        setStartTime(Date.now());
        setInput('');

        // 1) ÜSLÜ İŞLEM MODU (Exponents)
        if (mode === 'exponents') {
            if (exponentCat === 'kare') {
                const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25];
                const b = bases[Math.floor(Math.random() * bases.length)];
                const ans = b * b;
                setCurrentQuestion({
                    q: `${b}²`,
                    ans,
                    op: 'pow',
                    opType: 'Tam Kare Sayılar',
                    digitsA: 1,
                    digitsB: 1,
                    tip: `${b} × ${b} = ${ans}`
                });
                return;
            }

            if (exponentCat === 'kup') {
                const bases = [1, 2, 3, 4, 5, 6, 10];
                const b = bases[Math.floor(Math.random() * bases.length)];
                const ans = b * b * b;
                setCurrentQuestion({
                    q: `${b}³`,
                    ans,
                    op: 'pow',
                    opType: 'Küp Alma',
                    digitsA: 1,
                    digitsB: 1,
                    tip: `${b} × ${b} × ${b} = ${ans}`
                });
                return;
            }

            if (exponentCat === 'kuvvet') {
                const items = [
                    { q: '2³', ans: 8 },
                    { q: '2⁴', ans: 16 },
                    { q: '2⁵', ans: 32 },
                    { q: '2⁶', ans: 64 },
                    { q: '2⁷', ans: 128 },
                    { q: '2⁸', ans: 256 },
                    { q: '3²', ans: 9 },
                    { q: '3³', ans: 27 },
                    { q: '3⁴', ans: 81 },
                    { q: '4³', ans: 64 },
                    { q: '5³', ans: 125 },
                    { q: '10⁴', ans: 10000 }
                ];
                const item = items[Math.floor(Math.random() * items.length)];
                setCurrentQuestion({
                    q: item.q,
                    ans: item.ans,
                    op: 'pow',
                    opType: '2 ve 3\'ün Kuvvetleri',
                    digitsA: 1,
                    digitsB: 1,
                    tip: `${item.q} = ${item.ans}`
                });
                return;
            }

            if (exponentCat === 'negatif') {
                const items = [
                    { q: '(-2)²', ans: 4, tip: 'Parantez içi negatifin çift kuvveti pozitiftir: (-2) × (-2) = +4' },
                    { q: '-2²', ans: -4, tip: 'Parantez olmadığı için kuvvet sadece 2\'ye aittir: -(2²) = -4' },
                    { q: '(-3)²', ans: 9, tip: '(-3) × (-3) = +9' },
                    { q: '-3²', ans: -9, tip: '-(3²) = -9' },
                    { q: '(-2)³', ans: -8, tip: 'Negatif sayının tek kuvveti negatiftir: (-2)³ = -8' },
                    { q: '(-5)²', ans: 25, tip: '(-5) × (-5) = +25' },
                    { q: '-5²', ans: -25, tip: '-(5²) = -25' },
                    { q: '(-1)¹⁴', ans: 1, tip: '(-1)\'in çift kuvveti her zaman +1\'dir' },
                    { q: '(-1)¹⁵', ans: -1, tip: '(-1)\'in tek kuvveti her zaman -1\'dir' },
                    { q: '(-4)²', ans: 16, tip: '(-4) × (-4) = +16' }
                ];
                const item = items[Math.floor(Math.random() * items.length)];
                setCurrentQuestion({
                    q: item.q,
                    ans: item.ans,
                    op: 'pow',
                    opType: 'Negatif Taban ve Parantez',
                    digitsA: 1,
                    digitsB: 1,
                    tip: item.tip
                });
                return;
            }

            // 'ozellikler' (Üslü kurallar & zihinden işlemler)
            const ruleItems = [
                { q: '2³ × 2²', ans: 32, tip: 'Tabanlar aynıysa üsler toplanır: 2⁵ = 32' },
                { q: '3⁴ ÷ 3²', ans: 9, tip: 'Tabanlar aynıysa üsler çıkarılır: 3² = 9' },
                { q: '10² × 10³', ans: 100000, tip: '10⁵ = 100 000 (1 ve ardına 5 sıfır)' },
                { q: '2⁴ ÷ 2²', ans: 4, tip: '2² = 4' },
                { q: '7⁰', ans: 1, tip: 'Sıfır hariç her sayının 0. kuvveti 1\'dir' },
                { q: '1⁴⁵', ans: 1, tip: '1\'in tüm tam sayı kuvvetleri 1\'dir' },
                { q: '0⁹', ans: 0, tip: '0\'ın pozitif kuvvetleri 0\'dır' },
                { q: '12¹', ans: 12, tip: 'Her sayının 1. kuvveti kendisine eşittir' }
            ];
            const rItem = ruleItems[Math.floor(Math.random() * ruleItems.length)];
            setCurrentQuestion({
                q: rItem.q,
                ans: rItem.ans,
                op: 'pow',
                opType: 'Üslü İşlem Kuralları',
                digitsA: 1,
                digitsB: 1,
                tip: rItem.tip
            });
            return;
        }

        // 2) ÇARPIM TABLOSU MODU
        if (mode === 'multiplication_table') {
            const multiplier = Math.floor(Math.random() * 9) + 2; // 2..10
            const ans = multFactor * multiplier;
            setCurrentQuestion({
                q: `${multFactor} × ${multiplier}`,
                ans,
                op: '*',
                opType: `${multFactor}'ler Çarpım Tablosu`,
                digitsA: 1,
                digitsB: multiplier >= 10 ? 2 : 1
            });
            return;
        }

        // 3) RASYONEL VE KÖKLÜ SAYILAR MODU
        if (mode === 'advanced_fractions') {
            const subTypes = ['frac_add', 'frac_mult', 'root_mult', 'simplification'];
            const chosen = subTypes[Math.floor(Math.random() * subTypes.length)];

            if (chosen === 'frac_add') {
                const d = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                const n1 = Math.floor(Math.random() * (d - 1)) + 1;
                const n2 = Math.floor(Math.random() * 3) + 1;
                const ans = (n1 + n2);
                setCurrentQuestion({
                    q: `${n1}/${d} + ${n2}/${d} payı kaçtır?`,
                    ans,
                    op: 'frac',
                    opType: 'Rasyonel Sayılarda Toplama',
                    digitsA: 1,
                    digitsB: 1
                });
            } else if (chosen === 'frac_mult') {
                const a = Math.floor(Math.random() * 4) + 1;
                const b = Math.floor(Math.random() * 4) + 2;
                const c = Math.floor(Math.random() * 3) + 1;
                const ans = a * c;
                setCurrentQuestion({
                    q: `(${a}/${b}) × (${c}/1) işleminin payı kaçtır?`,
                    ans,
                    op: 'frac',
                    opType: 'Rasyonel Çarpma',
                    digitsA: 1,
                    digitsB: 1
                });
            } else if (chosen === 'root_mult') {
                const sq = [4, 9, 16, 25, 36, 49, 64, 81, 100][Math.floor(Math.random() * 9)];
                const ans = Math.round(Math.sqrt(sq));
                setCurrentQuestion({
                    q: `√${sq}`,
                    ans,
                    op: 'root',
                    opType: 'Kareköklü Sayılar',
                    digitsA: 2,
                    digitsB: 1
                });
            } else {
                const mult = Math.floor(Math.random() * 5) + 2;
                const base = Math.floor(Math.random() * 6) + 1;
                const n = base * mult;
                const d = 10 * mult;
                const ans = base;
                setCurrentQuestion({
                    q: `${n}/${d} kesri payda 10 yapılırsa pay kaç olur?`,
                    ans,
                    op: 'frac',
                    opType: 'Kesirlerde Sadeleştirme',
                    digitsA: 2,
                    digitsB: 2
                });
            }
            return;
        }

        // 4) BASAMAKLI DÖRT İŞLEM MODU
        const ops: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/'];
        const op = ops[Math.floor(Math.random() * ops.length)];

        let a = 0;
        let b = 0;
        let ans = 0;
        let digitsA = digitLevel;
        let digitsB = digitLevel;

        const getNum = (digits: number) => {
            if (digits === 1) return Math.floor(Math.random() * 9) + 1;
            if (digits === 2) return Math.floor(Math.random() * 90) + 10;
            return Math.floor(Math.random() * 900) + 100;
        };

        if (op === '+') {
            a = getNum(digitLevel);
            b = getNum(digitLevel);
            ans = a + b;
        } else if (op === '-') {
            a = getNum(digitLevel);
            b = getNum(digitLevel);
            if (b > a) [a, b] = [b, a];
            ans = a - b;
        } else if (op === '*') {
            if (digitLevel === 1) {
                a = getNum(1);
                b = getNum(1);
                digitsA = 1; digitsB = 1;
            } else if (digitLevel === 2) {
                a = getNum(2);
                b = Math.random() > 0.5 ? getNum(1) : Math.floor(Math.random() * 15) + 10;
                digitsA = 2; digitsB = b >= 10 ? 2 : 1;
            } else {
                a = getNum(3);
                b = Math.floor(Math.random() * 8) + 2;
                digitsA = 3; digitsB = 1;
            }
            ans = a * b;
        } else {
            if (digitLevel === 1) {
                b = Math.floor(Math.random() * 8) + 2;
                ans = Math.floor(Math.random() * 8) + 1;
                a = ans * b;
                digitsA = a >= 10 ? 2 : 1;
                digitsB = 1;
            } else if (digitLevel === 2) {
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

        setCurrentQuestion({
            q: `${a} ${displaySymbol} ${b}`,
            ans,
            op,
            opType: `${digitLevel} Basamaklı ${opLabels[op]}`,
            digitsA,
            digitsB
        });
    };

    const startGame = () => {
        setGameState('playing');
        setSuccessCount(0);
        setMultSuccessInRow(0);
        setExponentStreak(0);
        setHistory([]);
        setLastPerf(null);
        generateNewQuestion();
        setTimeout(() => inputRef.current?.focus(), 80);
    };

    const handleSubmit = () => {
        if (!input.trim()) return;

        const duration = (Date.now() - startTime) / 1000;
        const numInput = parseInt(input.trim(), 10);
        const isCorrect = String(numInput) === String(currentQuestion.ans);

        const perf = evaluateSpeed(
            duration,
            currentQuestion.op,
            currentQuestion.digitsA,
            currentQuestion.digitsB
        );

        const newHistoryItem: HistoryItem = {
            id: Date.now().toString(),
            q: currentQuestion.q,
            userAns: input,
            correctAns: currentQuestion.ans,
            correct: isCorrect,
            durationSec: parseFloat(duration.toFixed(1)),
            perf,
            category: currentQuestion.opType,
            tip: currentQuestion.tip
        };

        setHistory(prev => [newHistoryItem, ...prev]);
        setLastPerf(perf);

        if (isCorrect) {
            // Mode-specific progression logic
            if (mode === 'exponents') {
                const nextStreak = exponentStreak + 1;
                setExponentStreak(nextStreak);
                if (nextStreak >= 5) {
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);
                }
            } else if (mode === 'multiplication_table') {
                const nextRow = multSuccessInRow + 1;
                setMultSuccessInRow(nextRow);

                if (nextRow >= 7) {
                    if (!masteredTables.includes(multFactor)) {
                        setMasteredTables(prev => [...prev, multFactor]);
                    }
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);

                    if (multFactor < 9) {
                        setMultFactor(prev => prev + 1);
                        setMultSuccessInRow(0);
                    }
                }
            } else if (mode === 'digits') {
                const nextSuccess = successCount + 1;
                setSuccessCount(nextSuccess);

                if (nextSuccess >= 5 && digitLevel < 3) {
                    setDigitLevel(prev => (prev + 1) as 1 | 2 | 3);
                    setSuccessCount(0);
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);
                }
            } else {
                setSuccessCount(s => s + 1);
            }
        } else {
            if (mode === 'exponents') {
                setExponentStreak(0);
            } else if (mode === 'multiplication_table') {
                setMultSuccessInRow(0);
            } else if (mode === 'digits') {
                setSuccessCount(Math.max(0, successCount - 1));
            }
        }

        generateNewQuestion();
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-black uppercase tracking-wider border border-amber-200">
                    <Zap size={14} className="text-amber-500 fill-amber-500" />
                    MEB MİT Zihinsel Aritmetik & Hız Matrisi
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Zihinden İşlem Antrenörü</h2>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                    İşlem sürenizi anlık olarak ölçün. Dört işlem, çarpım tablosu ve yeni üslü işlem modları ile işlem refleksinizi zirveye taşıyın!
                </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-2xl mx-auto">
                {/* ÜSLÜ İŞLEM MODU (Tüm sınıflar için eklendi) */}
                <button
                    onClick={() => {
                        setMode('exponents');
                        setGameState('idle');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        mode === 'exponents' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <Zap size={14} /> Üslü İşlem Merkezi
                </button>

                {grade === 5 && (
                    <button
                        onClick={() => {
                            setMode('multiplication_table');
                            setGameState('idle');
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                            mode === 'multiplication_table' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Star size={14} /> Çarpım Tablosu (2-9)
                    </button>
                )}
                
                <button
                    onClick={() => {
                        setMode('digits');
                        setGameState('idle');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        mode === 'digits' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <Layers size={14} /> Basamaklı Dört İşlem
                </button>

                {grade >= 7 && (
                    <button
                        onClick={() => {
                            setMode('advanced_fractions');
                            setGameState('idle');
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                            mode === 'advanced_fractions' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Sparkles size={14} /> Rasyonel & Köklü
                    </button>
                )}
            </div>

            {/* Üslü İşlem Alt Kategorileri */}
            {mode === 'exponents' && (
                <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                    <span className="text-xs font-bold text-slate-500 mr-1">Üslü Kategori:</span>
                    {[
                        { id: 'kare', label: 'Tam Kareler (2² - 25²)' },
                        { id: 'kup', label: 'Küp Alma (1³ - 10³)' },
                        { id: 'kuvvet', label: '2 ve 3\'ün Kuvvetleri' },
                        { id: 'negatif', label: 'Negatif Taban & Parantez' },
                        { id: 'ozellikler', label: 'İşlem Kuralları' }
                    ].map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setExponentCat(cat.id as any);
                                setExponentStreak(0);
                                if (gameState === 'playing') generateNewQuestion();
                            }}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
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

            {/* Çarpım Tablosu Alt Butonları */}
            {mode === 'multiplication_table' && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                    <span className="text-xs font-bold text-slate-500 mr-1">Çarpım:</span>
                    {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                        const isMastered = masteredTables.includes(num);
                        const isCurrent = multFactor === num;
                        return (
                            <button
                                key={num}
                                onClick={() => {
                                    setMultFactor(num);
                                    setMultSuccessInRow(0);
                                    if (gameState === 'playing') generateNewQuestion();
                                }}
                                className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center transition-all shrink-0 ${
                                    isCurrent
                                        ? 'bg-amber-500 text-white shadow-md shadow-amber-200 ring-2 ring-amber-400'
                                        : isMastered
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {num}'ler
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
                            onClick={() => {
                                setDigitLevel(lvl);
                                setSuccessCount(0);
                                if (gameState === 'playing') generateNewQuestion();
                            }}
                            className={`px-4 py-1.5 rounded-xl font-black text-xs transition-all ${
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
                                ? `Harika! 5 Başarılı Üslü İşlem ile Seri Yakaladın!`
                                : mode === 'multiplication_table'
                                ? `Tebrikler! ${multFactor - 1}'ler Çarpım Tablosunu 7/7 Başarıyla Kavradın!`
                                : `Harika! 5 Başarılı İşlem ile ${digitLevel}. Basamağa Yükseldin!`}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Interactive Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
                {gameState === 'idle' ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
                        <div className="w-20 h-20 bg-purple-50 border border-purple-100 text-purple-600 rounded-3xl flex items-center justify-center shadow-sm">
                            <Zap size={40} />
                        </div>
                        <div className="space-y-2 max-w-md">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                                {mode === 'exponents'
                                    ? 'Zihinden Üslü İşlem & Kuvvet Antrenmanı'
                                    : mode === 'multiplication_table'
                                    ? `${multFactor}'ler Çarpım Tablosu Testi`
                                    : `${digitLevel} Basamaklı Zihinden İşlem`}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {mode === 'exponents'
                                    ? 'Kareler, küpler, negatif üsler ve parantez kurallarını zihinden hızlıca hesaplayın. Hedef süre: < 3.5 sn!'
                                    : mode === 'multiplication_table'
                                    ? 'Her işlem için süreniz ölçülür. 7 işlemi başarıyla tamamladığınızda bir sonraki sayıya geçersiniz.'
                                    : 'Her soruda harcadığınız anlık süre ölçülür. 5 başarılı yanıtta sonraki basamağa terfi edersiniz.'}
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
                                    <div>&lt; 3.5 sn</div>
                                </div>
                                <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-amber-800 font-bold">
                                    <div className="text-[10px] text-amber-600 uppercase font-black">Normal Hız</div>
                                    <div>3.5 - 6.5 sn</div>
                                </div>
                                <div className="bg-rose-50 border border-rose-200 p-2 rounded-xl text-rose-800 font-bold">
                                    <div className="text-[10px] text-rose-600 uppercase font-black">Geliştirilmeli</div>
                                    <div>&gt; 6.5 sn</div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-black py-4 px-10 rounded-2xl text-base shadow-lg shadow-purple-200 transition-all flex items-center gap-2"
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
                                <Timer size={16} className="animate-spin" />
                                <span>{elapsedTime.toFixed(1)} sn</span>
                            </div>

                            {/* Streak/Progress */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Seri:</span>
                                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1">
                                    <Star size={12} className="fill-amber-500" />
                                    {mode === 'exponents' ? `${exponentStreak}/5` : mode === 'multiplication_table' ? `${multSuccessInRow}/7` : `${successCount}/5`}
                                </span>
                            </div>
                        </div>

                        {/* Question Expression */}
                        <div className="text-center py-6">
                            <div className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
                                {currentQuestion.q} = ?
                            </div>
                        </div>

                        {/* Input and Submit */}
                        <div className="max-w-xs mx-auto space-y-4">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="number"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Sonucu yaz..."
                                    className="flex-1 bg-slate-50 border-2 border-slate-300 focus:border-purple-600 focus:bg-white rounded-2xl py-3.5 px-4 text-center text-2xl font-black text-slate-900 outline-none transition-all shadow-inner"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-black px-6 rounded-2xl shadow-md shadow-purple-200 transition-all flex items-center justify-center text-sm"
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
                            onClick={() => setHistory([])}
                            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-bold"
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
                                        <td className="py-2.5 text-slate-800 font-mono text-sm">{item.q}</td>
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
        </div>
    );
};
