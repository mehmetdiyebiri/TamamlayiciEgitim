const fs = require('fs');
const content = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Map, Play, Award, Zap, BookOpen, Clock, Target, TrendingUp, CheckCircle2, AlertTriangle, ChevronRight, XCircle, RotateCcw, Timer, Trophy, Calculator, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- MOCK DATA ---
const FORMULAS = {
    5: [
        { title: 'Dikdörtgenin Alanı', formula: 'A = a × b', desc: 'Kısa kenar ile uzun kenarın çarpımıdır.', example: 'Kenarları 4cm ve 5cm olan dikdörtgenin alanı: 4 × 5 = 20 cm²' },
        { title: 'Kesirlerde Genişletme', formula: '(a×n) / (b×n)', desc: 'Pay ve paydanın aynı sayı ile çarpılmasıdır. Kesrin değeri değişmez.', example: '1/2 kesrini 3 ile genişletelim: (1×3)/(2×3) = 3/6' }
    ],
    6: [
        { title: 'Çarpanlar', formula: 'A = a × b', desc: 'Bir sayıyı kalansız bölen sayılara o sayının çarpanı (böleni) denir.', example: '12 nin çarpanları: 1, 2, 3, 4, 6, 12' },
        { title: 'Kümelerde Kesişim', formula: 'A ∩ B', desc: 'Her iki kümede de ortak olarak bulunan elemanların oluşturduğu kümedir.', example: 'A={1,2,3}, B={3,4,5} ise A ∩ B = {3}' }
    ],
    7: [
        { title: 'Yüzde Hesaplama', formula: 'x\'in %y\\'si = (x × y) / 100', desc: 'Bir sayının belirtilen yüzdesini bulmak için sayıyı yüzde ile çarpıp 100 e böleriz.', example: '40 ın %20 si = (40 × 20) / 100 = 8' },
        { title: 'Çemberin Çevresi', formula: 'Ç = 2 × π × r', desc: 'Bir çemberin uzunluğu, çapı ile pi sayısının çarpımına eşittir.', example: 'Yarıçapı (r) 5 cm olan çemberin çevresi (π=3) = 2 × 3 × 5 = 30 cm' }
    ],
    8: [
        { title: 'Üslü Sayılarda Çarpma', formula: 'a^x × a^y = a^(x+y)', desc: 'Tabanları aynı olan üslü ifadeler çarpılırken üsler toplanır.', example: '2³ × 2⁴ = 2^(3+4) = 2⁷' },
        { title: 'Pisagor Bağıntısı', formula: 'a² + b² = c²', desc: 'Dik üçgende dik kenarların kareleri toplamı, hipotenüsün karesine eşittir.', example: 'Kenarları 3 ve 4 olan dik üçgenin hipotenüsü: 3² + 4² = c² => 9+16 = 25 => c = 5' },
        { title: 'İki Kare Farkı', formula: 'a² - b² = (a-b)(a+b)', desc: 'İki terimin karelerinin farkı, bu terimlerin toplamı ile farkının çarpımına eşittir.', example: 'x² - 16 = (x-4)(x+4)' },
        { title: 'Tam Kare Özdeşliği', formula: '(a+b)² = a² + 2ab + b²', desc: 'İki terimin toplamının karesi özdeşliğidir.', example: '(x+3)² = x² + 6x + 9' }
    ]
};

const QUESTIONS = {
    8: [
        { id: 1, topic: 'Çarpanlar ve Katlar', q: 'A ve B aralarında asal iki sayıdır. EKOK(A,B) = 120 ve A = 8 olduğuna göre B kaçtır?', options: ['10', '12', '15', '20'], ans: '15', hint: 'Aralarında asal iki sayının EKOK\\'u bu sayıların çarpımına eşittir. Yani A × B = 120 olmalı.' },
        { id: 2, topic: 'Üslü İfadeler', q: '2³ + 2³ + 2³ + 2³ işleminin sonucu aşağıdakilerden hangisidir?', options: ['2⁶', '2⁵', '8³', '4³'], ans: '2⁵', hint: 'Elma + Elma + Elma + Elma = 4 Elma mantığını düşün. Burada 4 tane 2³ var. 4 × 2³ işlemi yapmalısın. (4 = 2²)' },
        { id: 3, topic: 'Kareköklü İfadeler', q: '√48 sayısının a√b şeklinde yazılışı hangisidir?', options: ['2√12', '4√3', '3√4', '16√3'], ans: '4√3', hint: '48 sayısını, bir tam kare sayı ile başka bir sayının çarpımı şeklinde yazmayı dene. 48 = 16 × 3 olarak yazılabilir mi?' }
    ],
    7: [
        { id: 1, topic: 'Yüzdeler', q: 'Bir mağazada %20 indirimle 160 TL ye satılan bir ürünün indirimsiz fiyatı kaç TL dir?', options: ['180', '192', '200', '220'], ans: '200', hint: 'Ürün %20 indirimli satılıyorsa, aslında fiyatının %80 i ödeniyordur. Hangi sayının %80 i 160 eder?' },
        { id: 2, topic: 'Denklemler', q: '3x - 5 = 2x + 7 denklemini sağlayan x değeri kaçtır?', options: ['2', '12', '10', '5'], ans: '12', hint: 'Bilinenleri bir tarafa, bilinmeyenleri (x leri) bir tarafa toplamalısın. + lı ve - li geçişlere dikkat et.' }
    ],
    6: [
        { id: 1, topic: 'İşlem Önceliği', q: '12 + 8 ÷ 4 - 2 işleminin sonucu kaçtır?', options: ['3', '12', '10', '14'], ans: '12', hint: 'İşlem önceliği sırasını hatırla: Üslü sayılar, Parantez içi, Çarpma/Bölme, Toplama/Çıkarma. Önce bölmeyi yap!' },
    ],
    5: [
        { id: 1, topic: 'Kesirler', q: '2/5 + 1/10 işleminin sonucu kaçtır?', options: ['3/15', '3/10', '1/2', '5/10'], ans: '1/2', hint: 'Toplama işlemi yapabilmek için önce paydaları (alt kısımları) eşitlemen gerekir. 5 i 2 ile genişletmeyi dene.' },
    ]
};

export const StudentMitPanel = ({ state, actions }: any) => {
    const [grade, setGrade] = useState<5|6|7|8>(8);
    const [activeTab, setActiveTab] = useState('profil');

    const tabs = [
        { id: 'profil', name: 'Gelişim (LGS Yolcusu)', icon: TrendingUp },
        { id: 'calisma', name: 'Çalışma Odası & Antrenör', icon: Brain },
        { id: 'zihin', name: 'Zihinden İşlem Oyunu', icon: Zap },
        { id: 'formul', name: 'Formül Kartları', icon: BookOpen }
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <GraduationCap className="text-indigo-600" size={32} />
                        M.İ.T Ortaokul & LGS
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Matematiği yaşayarak öğren, sınavlara eksiksiz hazırlan.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {[5, 6, 7, 8].map(g => (
                        <button 
                            key={g} 
                            onClick={() => setGrade(g as any)}
                            className={\`px-4 py-2 rounded-lg font-bold transition-all \${grade === g ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}\`}
                        >
                            {g}. Sınıf
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={\`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap \${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}\`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 bg-white/50 rounded-3xl overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'profil' && <ProfileView key="profil" grade={grade} />}
                    {activeTab === 'calisma' && <QuizAndCoachView key="calisma" grade={grade} />}
                    {activeTab === 'zihin' && <MentalMathGame key="zihin" />}
                    {activeTab === 'formul' && <FormulaCardsView key="formul" grade={grade} />}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ProfileView = ({ grade }: { grade: number }) => {
    // Days until LGS (approximate for demo)
    const lgsDate = new Date('2027-06-05');
    const today = new Date();
    const daysLeft = Math.ceil((lgsDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {grade === 8 && (
                <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black flex items-center gap-2"><Target size={24}/> LGS Geri Sayım</h2>
                        <p className="font-medium text-rose-100 mt-1">Hedeflerine ulaşmak için her gün bir adım daha at!</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30 text-center">
                        <div className="text-4xl font-black">{daysLeft > 0 ? daysLeft : 0}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-rose-100">GÜN KALDI</div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <Award size={32} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Güncel Seviyen</div>
                        <div className="text-2xl font-black text-slate-800">LGS Uzmanı</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={32} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Çözülen Soru</div>
                        <div className="text-2xl font-black text-slate-800">1,248</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                        <Zap size={32} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Çalışma Serisi</div>
                        <div className="text-2xl font-black text-slate-800">12 Gün</div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6 text-xl">
                    <Map size={24} className="text-indigo-500"/> {grade}. Sınıf Kazanım Başarı Haritası
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                        { name: grade === 8 ? 'Çarpanlar ve Katlar' : grade === 7 ? 'Tam Sayılar' : 'Kesirler', val: 85, color: 'bg-emerald-500' },
                        { name: grade === 8 ? 'Üslü İfadeler' : grade === 7 ? 'Rasyonel Sayılar' : 'Ondalık Gösterim', val: 70, color: 'bg-indigo-500' },
                        { name: grade === 8 ? 'Kareköklü İfadeler' : grade === 7 ? 'Denklemler' : 'Oran', val: 45, color: 'bg-amber-500' },
                        { name: grade === 8 ? 'Veri Analizi' : grade === 7 ? 'Yüzdeler' : 'Alan Ölçme', val: 30, color: 'bg-rose-500' }
                    ].map(t => (
                        <div key={t.name}>
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-slate-700">{t.name}</span>
                                <span className="text-slate-500">%{t.val}</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: \`\${t.val}%\` }} 
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={\`h-full \${t.color} rounded-full\`} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const QuizAndCoachView = ({ grade }: { grade: number }) => {
    const qList = QUESTIONS[grade as keyof typeof QUESTIONS] || QUESTIONS[8];
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showCoach, setShowCoach] = useState(false);

    const question = qList[qIndex];

    const handleOptionSelect = (opt: string) => {
        if (isAnswered) return;
        setSelectedOption(opt);
        setIsAnswered(true);

        if (opt === question.ans) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } else {
            // Wrong answer, call the coach
            setTimeout(() => setShowCoach(true), 500);
        }
    };

    const handleNext = () => {
        if (qIndex < qList.length - 1) {
            setQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setShowCoach(false);
        } else {
            setQIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
            setShowCoach(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
            
            <div className="flex-1 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                        <div className="h-full bg-indigo-500 transition-all" style={{ width: \`\${((qIndex + 1) / qList.length) * 100}%\` }} />
                    </div>
                    
                    <div className="flex justify-between items-center mb-6 mt-2">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {question.topic}
                        </span>
                        <span className="text-slate-400 font-bold text-sm">Soru {qIndex + 1} / {qList.length}</span>
                    </div>

                    <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
                        {question.q}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {question.options.map((opt, i) => {
                            let btnClass = "p-4 rounded-xl border-2 font-bold text-lg transition-all text-left ";
                            
                            if (!isAnswered) {
                                btnClass += "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 cursor-pointer";
                            } else {
                                if (opt === question.ans) {
                                    btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700"; // Correct answer is always highlighted
                                } else if (selectedOption === opt) {
                                    btnClass += "border-rose-500 bg-rose-50 text-rose-700"; // User selected wrong answer
                                } else {
                                    btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-50 cursor-not-allowed"; // Other options
                                }
                            }

                            return (
                                <button 
                                    key={i}
                                    onClick={() => handleOptionSelect(opt)}
                                    disabled={isAnswered}
                                    className={btnClass}
                                >
                                    <span className="inline-block w-8 h-8 rounded-lg bg-white/50 text-center leading-8 mr-3 shadow-sm border border-black/5">
                                        {['A', 'B', 'C', 'D'][i]}
                                    </span>
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence>
                    {isAnswered && !showCoach && selectedOption === question.ans && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex justify-between items-center">
                            <div className="flex items-center gap-3 text-emerald-700">
                                <CheckCircle2 size={24} />
                                <span className="font-bold text-lg">Harika! Doğru cevap.</span>
                            </div>
                            <button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold transition-colors">
                                Sonraki Soru
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* COACH PANEL - SLIDES IN IF WRONG */}
            <AnimatePresence>
                {showCoach && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className="w-full md:w-80 bg-slate-900 rounded-3xl p-6 text-white flex flex-col shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Brain size={120} />
                        </div>
                        
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Brain size={20} className="text-white" />
                            </div>
                            <h3 className="font-bold text-lg">M.İ.T Antrenörü</h3>
                        </div>

                        <div className="bg-white/10 p-4 rounded-2xl mb-6 relative z-10 border border-white/10">
                            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <AlertTriangle size={14}/> Hata Analizi
                            </h4>
                            <p className="text-sm font-medium leading-relaxed text-slate-200">
                                Görünüşe göre burada küçük bir mantık hatası yaptın. 
                            </p>
                        </div>

                        <div className="flex-1 relative z-10">
                            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Target size={14}/> Antrenörün İpucu
                            </h4>
                            <p className="text-sm font-medium leading-relaxed text-indigo-100 bg-indigo-500/20 p-4 rounded-xl border border-indigo-500/30">
                                {question.hint}
                            </p>
                        </div>

                        <button onClick={handleNext} className="mt-6 w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors relative z-10">
                            İpucunu Anladım, İlerle
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

const MentalMathGame = () => {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [question, setQuestion] = useState({ q: '', a: 0 });
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const generateQuestion = () => {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b, ans;
        if (op === '+') { a = Math.floor(Math.random() * 50) + 10; b = Math.floor(Math.random() * 50) + 10; ans = a + b; }
        else if (op === '-') { a = Math.floor(Math.random() * 50) + 20; b = Math.floor(Math.random() * a); ans = a - b; }
        else { a = Math.floor(Math.random() * 12) + 2; b = Math.floor(Math.random() * 12) + 2; ans = a * b; }
        
        setQuestion({ q: \`\${a} \${op} \${b}\`, a: ans });
        setInput('');
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(60);
        setGameState('playing');
        generateQuestion();
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('over');
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInput(val);
        
        if (parseInt(val) === question.a) {
            // Correct!
            setScore(prev => prev + 10);
            generateQuestion();
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full max-w-3xl mx-auto flex flex-col justify-center py-10">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black text-slate-900">Zihinden İşlem Pratiği</h2>
                <p className="text-slate-500 font-medium">Hızlı düşün, doğru karar ver. 60 saniyede kaç puan toplayacaksın?</p>
            </div>

            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
                
                {gameState === 'idle' && (
                    <div className="text-center z-10">
                        <div className="w-20 h-20 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calculator size={40} />
                        </div>
                        <button onClick={startGame} className="bg-indigo-500 hover:bg-indigo-400 text-white px-10 py-4 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30">
                            Oyunu Başlat
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full h-full flex flex-col items-center justify-center z-10">
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                            <div className="bg-white/10 px-4 py-2 rounded-xl font-mono font-bold text-xl flex items-center gap-2">
                                <Trophy size={20} className="text-amber-400"/> {score} Puan
                            </div>
                            <div className={\`bg-white/10 px-4 py-2 rounded-xl font-mono font-bold text-xl flex items-center gap-2 \${timeLeft <= 10 ? 'text-rose-400 animate-pulse bg-rose-500/20' : ''}\`}>
                                <Timer size={20}/> 00:{timeLeft.toString().padStart(2, '0')}
                            </div>
                        </div>

                        <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter mb-10 drop-shadow-lg text-white">
                            {question.q} <span className="text-slate-500">=</span> ?
                        </div>
                        
                        <input 
                            ref={inputRef}
                            type="number" 
                            value={input}
                            onChange={handleInput}
                            placeholder="Cevap..." 
                            className="bg-white/10 border-2 border-white/20 rounded-2xl px-8 py-5 text-4xl font-black text-center text-white outline-none focus:border-indigo-400 focus:bg-white/20 transition-all w-full max-w-sm backdrop-blur-sm placeholder:text-white/20" 
                        />
                    </div>
                )}

                {gameState === 'over' && (
                    <div className="text-center z-10">
                        <div className="text-indigo-400 font-bold tracking-widest uppercase mb-2">Süre Doldu!</div>
                        <div className="text-6xl font-black mb-6">{score} <span className="text-2xl text-slate-400">Puan</span></div>
                        
                        <button onClick={startGame} className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 mx-auto">
                            <RotateCcw size={18} /> Tekrar Oyna
                        </button>
                    </div>
                )}

                {/* Decorative background shapes */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </motion.div>
    );
};

const FormulaCardsView = ({ grade }: { grade: number }) => {
    const formulas = FORMULAS[grade as keyof typeof FORMULAS] || FORMULAS[8];
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const nextCard = () => {
        setFlipped(false);
        setTimeout(() => setIndex((i) => (i + 1) % formulas.length), 150);
    };

    const prevCard = () => {
        setFlipped(false);
        setTimeout(() => setIndex((i) => (i - 1 + formulas.length) % formulas.length), 150);
    };

    const card = formulas[index];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2 mb-2">
                <h2 className="text-2xl font-black text-slate-900">Kalıp Formül Kartları</h2>
                <p className="text-slate-500 font-medium">Formülleri ezberleme, mantığını kavra. ({grade}. Sınıf Seçkisi)</p>
            </div>

            <div className="w-full aspect-[4/3] perspective-1000 cursor-pointer max-h-[400px]" onClick={() => setFlipped(!flipped)}>
                <motion.div 
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-indigo-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow">
                        <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            {index + 1} / {formulas.length}
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-8">{card.title}</h3>
                        <div className="text-4xl md:text-5xl font-mono font-black text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-8 py-6 rounded-2xl">
                            {card.formula}
                        </div>
                        <div className="absolute bottom-6 text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full">
                            <RotateCcw size={14}/> Detaylar için karta tıkla
                        </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-slate-800 text-white rounded-[2rem] p-10 shadow-xl flex flex-col justify-center" style={{ transform: 'rotateY(180deg)' }}>
                        <div className="bg-white/10 w-16 h-1 bg-white/20 rounded-full mx-auto absolute top-6 left-1/2 -translate-x-1/2"></div>
                        
                        <h4 className="font-bold text-indigo-300 mb-3 uppercase text-sm tracking-wider flex items-center gap-2"><BookOpen size={16}/> Kural</h4>
                        <p className="text-slate-200 font-medium mb-8 text-lg leading-relaxed">{card.desc}</p>
                        
                        <h4 className="font-bold text-emerald-400 mb-3 uppercase text-sm tracking-wider flex items-center gap-2"><Target size={16}/> Çözümlü Örnek</h4>
                        <div className="bg-white/10 p-5 rounded-xl text-emerald-50 text-sm font-mono leading-relaxed border border-white/10">
                            {card.example}
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="flex gap-4 w-full">
                <button onClick={prevCard} className="flex-1 py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">Önceki Kart</button>
                <button onClick={nextCard} className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-200 transition-all active:scale-95">Sonraki Kart</button>
            </div>
        </motion.div>
    );
};
`
fs.writeFileSync('src/components/mit/StudentMitPanel.tsx', content);
console.log('Student panel updated for LGS');
