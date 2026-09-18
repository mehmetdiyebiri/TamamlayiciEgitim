import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Timer, Award, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCw, Star, Layers, Sparkles } from 'lucide-react';

type MathMode = 'digits' | 'multiplication_table' | 'advanced_fractions';

interface HistoryItem {
    id: string;
    q: string;
    userAns: string;
    correctAns: string | number;
    correct: boolean;
    durationSec: number;
    perf: 'İyi' | 'Normal' | 'Geliştirilmesi Gereken';
    category: string;
}

export const MentalMathView = ({ grade = 5 }: { grade?: number }) => {
    // Mode selection: default to multiplication_table for 5th grade or digits for others
    const [mode, setMode] = useState<MathMode>(grade === 5 ? 'multiplication_table' : 'digits');
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
    
    // Digits Mode state (1, 2, 3 basamaklı)
    const [digitLevel, setDigitLevel] = useState<1 | 2 | 3>(1); // 1-digit, 2-digit, 3-digit
    
    // Multiplication Table Mode state (2'ler, 3'ler, ... 9'lar)
    const [multFactor, setMultFactor] = useState<number>(2); // 2 to 9
    const [multSuccessInRow, setMultSuccessInRow] = useState<number>(0); // 7 needed to master
    const [masteredTables, setMasteredTables] = useState<number[]>([]);

    // Shared progress state
    const [successCount, setSuccessCount] = useState(0); // 5 needed to advance digit level
    const [currentQuestion, setCurrentQuestion] = useState<{
        q: string;
        ans: number | string;
        op: '+' | '-' | '*' | '/' | 'frac' | 'root';
        opType: string;
        digitsA: number;
        digitsB: number;
        displayQuestion?: string;
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

    // Exact speed evaluation matching the user specification:
    // Toplama:
    // 1 basamaklı: İyi (2-3 sn), Normal (4-5 sn), Geliştirilmeli (6-7 sn+)
    // 2 basamaklı: İyi (5-6 sn), Normal (7-8 sn), Geliştirilmeli (9-11 sn+)
    // 3 basamaklı: İyi (10-14 sn), Normal (15-19 sn), Geliştirilmeli (20-22 sn+)
    // Çıkarma:
    // 1 basamaklı: İyi (2-3 sn), Normal (4-5 sn), Geliştirilmeli (6-7 sn+)
    // 2 basamaklı: İyi (5-6 sn), Normal (7-8 sn), Geliştirilmeli (9-11 sn+)
    // 3 basamaklı: İyi (10-14 sn), Normal (15-19 sn), Geliştirilmeli (20-22 sn+)
    // Çarpma:
    // 1x1: İyi (<5 sn), Normal (6-8 sn), Geliştirilmeli (9-12 sn+)
    // 2x1: İyi (8-10 sn), Normal (12-15 sn), Geliştirilmeli (18-25 sn+)
    // 2x2: İyi (13-18 sn), Normal (20-25 sn), Geliştirilmeli (30-40 sn+)
    // Bölme:
    // 1 basamaklı: İyi (<5 sn), Normal (6-8 sn), Geliştirilmeli (9-12 sn+)
    // 2/1: İyi (18-20 sn), Normal (22-25 sn), Geliştirilmeli (28-35 sn+)
    // 3/1: İyi (23-28 sn), Normal (30-35 sn), Geliştirilmeli (40-50 sn+)
    const evaluateSpeed = (
        sec: number,
        op: string,
        digitsA: number,
        digitsB: number
    ): 'İyi' | 'Normal' | 'Geliştirilmesi Gereken' => {
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

        if (mode === 'multiplication_table') {
            // Factor table question: e.g. multFactor x (1..10)
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

        if (mode === 'advanced_fractions') {
            // 7th and 8th grade math: rational numbers and radicals
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
                    q: `${n}/${d} kesri sadeleşirse payı kaç olur? (Payda 10 yapılırsa)`,
                    ans,
                    op: 'frac',
                    opType: 'Kesirlerde Sadeleştirme',
                    digitsA: 2,
                    digitsB: 2
                });
            }
            return;
        }

        // Standard Digits mode: 1-digit, 2-digit, 3-digit
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
                // 2x1 or 2x2
                a = getNum(2);
                b = Math.random() > 0.5 ? getNum(1) : Math.floor(Math.random() * 15) + 10;
                digitsA = 2; digitsB = b >= 10 ? 2 : 1;
            } else {
                // 3-digit: 3x1 or 2x2
                a = getNum(3);
                b = Math.floor(Math.random() * 8) + 2;
                digitsA = 3; digitsB = 1;
            }
            ans = a * b;
        } else {
            // Division (clean division without remainder)
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
            category: currentQuestion.opType
        };

        setHistory(prev => [newHistoryItem, ...prev]);
        setLastPerf(perf);

        if (isCorrect) {
            // Mode-specific progression logic
            if (mode === 'multiplication_table') {
                const nextRow = multSuccessInRow + 1;
                setMultSuccessInRow(nextRow);

                // User mandate: "O sayı çarpımıyla ilgili 7 işlemi başarılı yapınca kavramış saymalı."
                if (nextRow >= 7) {
                    if (!masteredTables.includes(multFactor)) {
                        setMasteredTables(prev => [...prev, multFactor]);
                    }
                    setShowLevelUpAlert(true);
                    setTimeout(() => setShowLevelUpAlert(false), 2500);

                    // Advance to next factor table if available
                    if (multFactor < 9) {
                        setMultFactor(prev => prev + 1);
                        setMultSuccessInRow(0);
                    }
                }
            } else if (mode === 'digits') {
                const nextSuccess = successCount + 1;
                setSuccessCount(nextSuccess);

                // User mandate: "5 başarılı sonuç bir üst basamağa geçmeli."
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
            // Incorrect answer resets the streak for strict mastery
            if (mode === 'multiplication_table') {
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
                    Her işlem için gerçek çözüm süreniz ölçülür. 5 başarılı işlemle bir üst basamağa geçin; hızınızı 'İyi', 'Normal' veya 'Geliştirilmeli' olarak takip edin.
                </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-2xl mx-auto">
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
                        <Star size={14} /> 5. Sınıf Çarpım Tablosu (2'ler - 9'lar)
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
                    <Layers size={14} /> 1, 2, 3 Basamaklı Dört İşlem
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
                        <Sparkles size={14} /> Rasyonel & Köklü Sayılar
                    </button>
                )}
            </div>

            {/* Sub-selectors (Multiplication factor pills or digit pills) */}
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
                            {mode === 'multiplication_table'
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
                        <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
                            <Calculator size={40} />
                        </div>
                        <div className="space-y-2 max-w-md">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                                {mode === 'multiplication_table'
                                    ? `${multFactor}'ler Çarpım Tablosu Testi`
                                    : `${digitLevel} Basamaklı Zihinden İşlem`}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {mode === 'multiplication_table'
                                    ? "Her işlem için süreniz ölçülür. 7 işlemi başarıyla tamamladığınızda bir sonraki sayıya geçersiniz (Hedef süre: 1x1 için < 5 sn)."
                                    : "Süreyi geri sayan sayaç yerine her soruda harcadığınız anlık süre tutulur. 5 başarılı yanıtta sonraki basamağa terfi edersiniz."}
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
                                    <div>%25+ Hızlı</div>
                                </div>
                                <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-amber-800 font-bold">
                                    <div className="text-[10px] text-amber-600 uppercase font-black">Normal Hız</div>
                                    <div>Ortalama Süre</div>
                                </div>
                                <div className="bg-rose-50 border border-rose-200 p-2 rounded-xl text-rose-800 font-bold">
                                    <div className="text-[10px] text-rose-600 uppercase font-black">Geliştirilmeli</div>
                                    <div>%25+ Yavaş</div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-base shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
                        >
                            Pratiği Başlat <ArrowRight size={18} />
                        </button>
                    </div>
                ) : (
                    /* PLAYING STATE */
                    <div className="space-y-8">
                        {/* Top Status Bar: Live Stopwatch + Level Streak */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            {/* Live Stopwatch (Elapsed time per question) */}
                            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl">
                                <Timer size={18} className="text-indigo-600 animate-pulse" />
                                <span className="text-xs font-bold text-slate-500">Süre:</span>
                                <span className="font-mono font-black text-lg text-slate-800">
                                    {elapsedTime.toFixed(1)} sn
                                </span>
                            </div>

                            {/* Progression Dots */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">
                                    {mode === 'multiplication_table' ? 'Kavrama Eşiği:' : 'Basamak İlerleme:'}
                                </span>
                                <div className="flex gap-1.5">
                                    {mode === 'multiplication_table'
                                        ? [...Array(7)].map((_, i) => (
                                              <div
                                                  key={i}
                                                  className={`w-3 h-3 rounded-full transition-all ${
                                                      i < multSuccessInRow
                                                          ? 'bg-amber-500 shadow-sm'
                                                          : 'bg-slate-200'
                                                  }`}
                                              />
                                          ))
                                        : [...Array(5)].map((_, i) => (
                                              <div
                                                  key={i}
                                                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                                                      i < successCount
                                                          ? 'bg-emerald-500 shadow-sm'
                                                          : 'bg-slate-200'
                                                  }`}
                                              />
                                          ))}
                                </div>
                                <span className="text-xs font-black text-slate-700 ml-1">
                                    {mode === 'multiplication_table'
                                        ? `${multSuccessInRow}/7`
                                        : `${successCount}/5`}
                                </span>
                            </div>
                        </div>

                        {/* Question Prompt */}
                        <div className="text-center space-y-4 py-4">
                            <div className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                                {currentQuestion.opType}
                            </div>
                            <div className="text-5xl sm:text-7xl font-mono font-black text-slate-900 tracking-tight">
                                {currentQuestion.q} <span className="text-slate-300">=</span> ?
                            </div>
                        </div>

                        {/* Input & Submit */}
                        <div className="max-w-md mx-auto flex gap-3">
                            <input
                                ref={inputRef}
                                type="number"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Yanıtınız..."
                                autoFocus
                                className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 text-3xl font-black text-center text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner"
                            />
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-md shadow-indigo-200 active:scale-95 transition-all shrink-0"
                            >
                                Onayla
                            </button>
                        </div>

                        {/* Last Performance Toast */}
                        {lastPerf && (
                            <div className="text-center">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                                        lastPerf === 'İyi'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : lastPerf === 'Normal'
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-rose-100 text-rose-800'
                                    }`}
                                >
                                    Hız Derecesi: {lastPerf}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Performance History Table */}
            {history.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <Timer size={16} className="text-indigo-600" /> Soru Başına Süre & Hız Analizi
                        </h4>
                        <span className="text-xs font-bold text-slate-400">Son {history.length} İşlem</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                                <tr>
                                    <th className="p-3">İşlem</th>
                                    <th className="p-3">Verilen Yanıt</th>
                                    <th className="p-3">Doğru Yanıt</th>
                                    <th className="p-3">Harcanan Süre</th>
                                    <th className="p-3">Hız Değerlendirmesi</th>
                                    <th className="p-3">Kategori</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {history.slice(0, 10).map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50">
                                        <td className="p-3 font-mono font-bold text-slate-800">{item.q}</td>
                                        <td className="p-3">
                                            <span
                                                className={`font-mono font-bold ${
                                                    item.correct ? 'text-emerald-600' : 'text-rose-600 line-through'
                                                }`}
                                            >
                                                {item.userAns}
                                            </span>
                                        </td>
                                        <td className="p-3 font-mono font-bold text-slate-700">{item.correctAns}</td>
                                        <td className="p-3 font-mono font-bold text-indigo-700">{item.durationSec} sn</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                                                    item.perf === 'İyi'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : item.perf === 'Normal'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-rose-100 text-rose-800'
                                                }`}
                                            >
                                                {item.perf}
                                            </span>
                                        </td>
                                        <td className="p-3 text-slate-500">{item.category}</td>
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
