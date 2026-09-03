import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/';

interface HistoryItem {
    q: string;
    a: number;
    input: string;
    correct: boolean;
    time: number;
    perf: string;
}

export const MentalMathView = ({ grade = 8 }: { grade?: number }) => {
    const [gameState, setGameState] = useState<'idle' | 'playing'>('idle');
    const [level, setLevel] = useState(1);
    const [question, setQuestion] = useState({ q: '', a: 0, op: '+', digitsA: 1, digitsB: 1 });
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [successCount, setSuccessCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const getMin = (lvl: number) => Math.pow(10, lvl - 1);
    const getMax = (lvl: number) => Math.pow(10, lvl) - 1;

        const generateQuestion = (currentLevel: number) => {
        const ops: Operation[] = ['+', '-', '*', '/'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        
        let minD = 1, maxD = 2, maxResult = 999;
        if (grade === 5) {
            minD = 1; maxD = 2; maxResult = 999;
        } else if (grade === 6) {
            minD = 1; maxD = 3; maxResult = 9999;
        } else if (grade === 7) {
            minD = 2; maxD = 4; maxResult = 99999;
        } else {
            minD = 3; maxD = 4; maxResult = 99999;
        }

        // Adjust based on level (1 to 4)
        let dA = minD;
        let dB = minD;
        
        if (currentLevel === 2) {
            dA = Math.min(minD + 1, maxD);
            dB = minD;
        } else if (currentLevel === 3) {
            dA = Math.min(minD + 1, maxD);
            dB = Math.min(minD + 1, maxD);
        } else if (currentLevel === 4) {
            dA = maxD;
            dB = Math.min(maxD - 1, maxD);
            if (dB < minD) dB = minD;
        }

        let a = 0, b = 0, ans = 0;
        
        if (op === '+') {
            a = Math.floor(Math.random() * (getMax(dA) - getMin(dA) + 1)) + getMin(dA);
            b = Math.floor(Math.random() * (getMax(dB) - getMin(dB) + 1)) + getMin(dB);
            ans = a + b;
            // Ensure result doesn't exceed maxResult
            if (ans > maxResult) {
                b = Math.floor(b / 10);
                ans = a + b;
            }
        } else if (op === '-') {
            a = Math.floor(Math.random() * (getMax(dA) - getMin(dA) + 1)) + getMin(dA);
            b = Math.floor(Math.random() * (getMax(dB) - getMin(dB) + 1)) + getMin(dB);
            if (b > a) [a, b] = [b, a];
            ans = a - b;
        } else if (op === '*') {
            // Multiplication grows fast, so we might need to reduce dB
            dB = minD; 
            if (currentLevel > 2 && grade >= 6) dB = minD + 1;
            
            a = Math.floor(Math.random() * (getMax(dA) - getMin(dA) + 1)) + getMin(dA);
            b = Math.floor(Math.random() * (getMax(dB) - getMin(dB) + 1)) + getMin(dB);
            ans = a * b;
            if (ans > maxResult) {
                b = Math.floor(b / 10) || 2;
                ans = a * b;
            }
        } else if (op === '/') {
            dB = minD; // divisor is usually smaller
            b = Math.floor(Math.random() * (getMax(dB) - getMin(dB) + 1)) + getMin(dB);
            if (b === 0) b = 2; // avoid div 0
            ans = Math.floor(Math.random() * (getMax(dA) - getMin(dA) + 1)) + getMin(dA);
            a = ans * b;
            if (a > maxResult) {
                ans = Math.floor(ans / 10) || 2;
                a = ans * b;
            }
        }
        
        setQuestion({ q: `${a} ${op} ${b}`, a: ans, op, digitsA: dA, digitsB: dB });
        setInput('');
        setStartTime(Date.now());
    };

    const startGame = () => {
        setLevel(1);
        setSuccessCount(0);
        setHistory([]);
        setGameState('playing');
        generateQuestion(1);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const evaluatePerformance = (duration: number, op: string, lvl: number, digitsA: number, digitsB: number) => {
        const sec = duration / 1000;
        
        // Süre parametreleri sayının basamak olmasına göre (max digit of a or b)
        const maxDig = Math.max(digitsA, digitsB);
        let baseTime = 4;
        let normalTime = 6;
        
        if (maxDig === 1) {
            baseTime = 3; normalTime = 6;
        } else if (maxDig === 2) {
            baseTime = 6; normalTime = 12;
        } else if (maxDig === 3) {
            baseTime = 12; normalTime = 20;
        } else if (maxDig === 4) {
            baseTime = 20; normalTime = 35;
        } else {
            baseTime = 30; normalTime = 50;
        }
        
        if (op === '*') {
            baseTime *= 1.5; normalTime *= 1.5;
        }
        
        if (sec <= baseTime) return 'İyi';
        if (sec <= normalTime) return 'Normal';
        return 'Geliştirilmesi Gereken';
    };

    const handleSubmit = () => {
        if (!input) return;
        const duration = Date.now() - startTime;
        const isCorrect = parseInt(input) === question.a;
        
        const perf = evaluatePerformance(duration, question.op, level, question.digitsA, question.digitsB);
        
        setHistory(prev => [{ q: question.q, a: question.a, input, correct: isCorrect, time: duration, perf }, ...prev]);
        
        if (isCorrect) {
            const newCount = successCount + 1;
            if (newCount >= 5 && level < 4) {
                setLevel(prev => prev + 1);
                setSuccessCount(0);
                generateQuestion(level + 1);
            } else {
                setSuccessCount(newCount);
                generateQuestion(level);
            }
        } else {
            setInput('');
        }
        setTimeout(() => inputRef.current?.focus(), 10);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-3">Zihinden İşlem Pratiği</h2>
                <p className="text-slate-500 font-medium">Doğruluk ve süreye göre kademe atla! (5 Doğru = Sonraki Kademe)</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col gap-10">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                {gameState === 'idle' && (
                    <div className="w-full flex flex-col items-center justify-center z-10 text-center py-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-indigo-100 rotate-3">
                            <Calculator size={48} className="-rotate-3" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-4">Her Soru Süresi Kaydediliyor</h3>
                        <p className="text-slate-500 mb-10 max-w-md text-lg leading-relaxed">
                            Kademe atlamak için 5 ardışık soruyu hızlı ve doğru yanıtlamalısın. Dört işlem hızı sınıf ortalaması ile kıyaslanarak puanlanacaktır.
                        </p>
                        <button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200 active:scale-95 group">
                            Oyunu Başlat
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <>
                        <div className="flex flex-col items-center justify-center z-10 w-full max-w-2xl mx-auto">
                            <div className="w-full flex justify-between items-center mb-10">
                                <div className="bg-indigo-50 px-5 py-2.5 rounded-full font-bold text-indigo-600 border border-indigo-100">
                                    Kademe {level} (Basamak)
                                </div>
                                <div className="flex gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${i < successCount ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-slate-200'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter mb-12 text-slate-800 text-center drop-shadow-sm">
                                {question.q} <span className="text-slate-300">=</span> ?
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <input 
                                    ref={inputRef}
                                    type="number" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Cevap..." 
                                    className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-2xl px-8 py-5 text-4xl font-black text-center text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300" 
                                />
                                <button 
                                    onClick={handleSubmit}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 shrink-0"
                                >
                                    Yanıtla
                                </button>
                            </div>
                        </div>

                        <div className="w-full z-10 mt-6 pt-10 border-t border-slate-100">
                            <h4 className="font-bold text-slate-400 mb-6 uppercase tracking-wider text-sm flex items-center justify-between">
                                Son İşlemler (Son 5)
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                <AnimatePresence>
                                    {history.slice(0, 5).map((h, i) => (
                                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} key={i} className={`p-4 rounded-2xl border ${h.correct ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} flex flex-col justify-between`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="font-mono font-black text-lg text-slate-700">{h.q} = {h.input}</span>
                                                {h.correct && <span className="text-xs font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-md">{(h.time / 1000).toFixed(1)}s</span>}
                                            </div>
                                            {h.correct && (
                                                <div className={`text-xs uppercase font-bold tracking-wider ${h.perf === 'İyi' ? 'text-emerald-600' : h.perf === 'Normal' ? 'text-amber-600' : 'text-rose-600'}`}>
                                                    {h.perf}
                                                </div>
                                            )}
                                            {!h.correct && <div className="text-xs text-rose-600 font-bold uppercase tracking-wider">Hatalı İşlem</div>}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {history.length === 0 && <div className="col-span-full text-sm text-slate-400 py-4 font-medium italic">Henüz işlem yapılmadı</div>}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
