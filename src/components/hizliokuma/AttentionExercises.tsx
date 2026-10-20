import React, { useState, useEffect } from 'react';
import { Play, Pause, Maximize, Minimize, Search, Hash, Target, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

const MetinArama = ({ isPlaying }: { isPlaying: boolean }) => {
    const defaultText = "Çocuğun gelişiminin olmazsa olmaz parçası anne-baba çocuk etkileşimidir. Çağımız maalesef ebeveynle çocuk arasındaki mesafeyi artıran koşulları beraberinde getirmektedir. Çalışan anne-babalar yorgun argın eve gelip yorgunluklarını gidermek için televizyonun karşısına geçiyor ve bu arada çocuklarını da adeta televizyona emanet ediyorlar. Kendilerine yeterli zaman ve dikkat ayrılmayan çocuklarımız, her zamankinden daha fazla yalnızlığa mahkum bir hayat yaşıyorlar. Anne-babaların çocuklarına ilgisizliği böyle devam ederse bir sonraki yüzyılda insanlığı nasıl bir kuşağın beklediğini tahmin etmek zor değil.";
    const allWords = Array.from(new Set(defaultText.replace(/[.,]/g, '').split(' ').filter(w => w.length > 3)));
    
    const [targetWord, setTargetWord] = useState(allWords[0]);
    const [foundCount, setFoundCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if(isPlaying && timeLeft === 60) {
            setTargetWord(allWords[Math.floor(Math.random() * allWords.length)]);
            setFoundCount(0);
        }
    }, [isPlaying]);

    useEffect(() => {
        let t: NodeJS.Timeout;
        if(isPlaying && timeLeft > 0) {
            t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && isPlaying) {
            alert("Süre doldu! Toplam bulunan kelime: " + foundCount);
        }
        return () => clearInterval(t);
    }, [isPlaying, timeLeft]);

    const handleWordClick = (w: string) => {
        if(!isPlaying || timeLeft === 0) return;
        const cleanW = w.replace(/[.,]/g, '');
        if(cleanW.toLowerCase() === targetWord.toLowerCase()) {
            setFoundCount(prev => prev + 1);
            setTargetWord(allWords[Math.floor(Math.random() * allWords.length)]);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-2">
            <div className="bg-slate-800 text-white rounded-2xl flex items-center justify-between overflow-hidden shadow-lg">
                <div className="flex items-center flex-1">
                    <div className="bg-indigo-600 px-6 py-4 font-black uppercase tracking-wider text-sm">HEDEF KELİME</div>
                    <div className="px-6 py-4 font-bold text-xl text-indigo-300">{targetWord}</div>
                </div>
                <div className="flex items-center">
                    <div className="px-6 py-4 text-sm font-medium text-slate-300">Skor: <span className="font-bold text-white text-lg">{foundCount}</span></div>
                    <div className="bg-slate-900 px-6 py-4 font-mono font-bold text-xl">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
                </div>
            </div>
            <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 text-xl leading-loose font-medium text-slate-700 shadow-sm overflow-y-auto">
                {defaultText.split(' ').map((w, i) => (
                    <span 
                        key={i} 
                        onClick={() => handleWordClick(w)}
                        className={`inline-block mr-2 cursor-pointer rounded px-1 transition-all ${isPlaying && timeLeft > 0 ? 'hover:bg-indigo-100 hover:text-indigo-700' : 'opacity-60 pointer-events-none'}`}
                    >
                        {w}
                    </span>
                ))}
            </div>
        </div>
    );
};

const KelimeArama = ({ isPlaying }: { isPlaying: boolean }) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [target, setTarget] = useState('KALEM');
    const [grid, setGrid] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);

    const generateGrid = () => {
        const words = ['KALEM', 'KİTAP', 'DEFTER', 'SİLGİ', 'ÇANTA', 'OKUL', 'SINIF', 'MASA'];
        const currentTarget = words[Math.floor(Math.random() * words.length)];
        setTarget(currentTarget);
        
        let newGrid = Array(150).fill('');
        for(let i=0; i<150; i++) {
            newGrid[i] = letters[Math.floor(Math.random() * letters.length)];
        }
        // Insert target randomly
        const pos = Math.floor(Math.random() * (150 - currentTarget.length));
        for(let i=0; i<currentTarget.length; i++) {
            newGrid[pos+i] = currentTarget[i];
        }
        setGrid(newGrid);
    };

    useEffect(() => {
        if(isPlaying && timeLeft === 60) {
            generateGrid();
            setScore(0);
        }
    }, [isPlaying]);

    useEffect(() => {
        let t: NodeJS.Timeout;
        if(isPlaying && timeLeft > 0) {
            t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(t);
    }, [isPlaying, timeLeft]);

    return (
        <div className="w-full h-full flex flex-col gap-6 p-2">
            <div className="bg-slate-800 text-white rounded-2xl flex items-center justify-between overflow-hidden shadow-lg">
                <div className="flex items-center flex-1">
                    <div className="bg-indigo-600 px-6 py-4 font-black uppercase tracking-wider text-sm">HEDEF</div>
                    <div className="px-6 py-4 font-bold text-xl text-indigo-300">{target}</div>
                </div>
                <div className="flex items-center">
                    <div className="px-6 py-4 text-sm font-medium text-slate-300">Skor: <span className="font-bold text-white text-lg">{score}</span></div>
                    <div className="bg-slate-900 px-6 py-4 font-mono font-bold text-xl">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
                </div>
            </div>
            
            <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                {!isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 rounded-2xl z-10 backdrop-blur-sm">
                        <span className="text-xl font-bold text-slate-500">Başlatmak için yukarıdaki butona tıklayın</span>
                    </div>
                ) : null}
                <div className="flex flex-wrap gap-2 justify-center leading-loose font-mono text-xl font-bold text-slate-700">
                    {grid.map((char, i) => (
                        <span key={i} className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 px-1 rounded transition-colors" 
                              onClick={() => {
                                  if(char === target[0]) { setScore(prev => prev + 1); generateGrid(); }
                              }}>
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TekCift = ({ isPlaying }: { isPlaying: boolean }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);

    const nextNumber = () => {
        setCurrentNumber(Math.floor(Math.random() * 99) + 1);
    };

    useEffect(() => {
        if(isPlaying && timeLeft === 60) {
            setScore(0);
            nextNumber();
        }
    }, [isPlaying]);

    useEffect(() => {
        let t: NodeJS.Timeout;
        if(isPlaying && timeLeft > 0) {
            t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(t);
    }, [isPlaying, timeLeft]);

    const handleGuess = (type: 'tek'|'cift') => {
        if(!isPlaying || !currentNumber || timeLeft === 0) return;
        const isTek = currentNumber % 2 !== 0;
        if((type === 'tek' && isTek) || (type === 'cift' && !isTek)) {
            setScore(prev => prev + 1);
        } else {
            setScore(prev => Math.max(0, prev - 1));
        }
        nextNumber();
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-2 items-center justify-center">
             <div className="bg-slate-800 text-white rounded-2xl flex items-center justify-between w-full max-w-2xl overflow-hidden shadow-lg mb-8">
                <div className="flex items-center flex-1">
                    <div className="bg-indigo-600 px-6 py-4 font-black uppercase tracking-wider text-sm">SKOR</div>
                    <div className="px-6 py-4 font-bold text-xl text-indigo-300">{score}</div>
                </div>
                <div className="bg-slate-900 px-6 py-4 font-mono font-bold text-xl">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
            </div>

            <div className="text-9xl font-black text-slate-800 mb-12 min-h-[150px] flex items-center justify-center">
                {isPlaying && currentNumber ? currentNumber : '?'}
            </div>

            <div className="flex gap-6">
                <button onClick={() => handleGuess('tek')} disabled={!isPlaying || timeLeft===0} className="px-12 py-6 bg-rose-500 text-white rounded-3xl font-black text-3xl shadow-xl hover:bg-rose-400 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0">TEK (Sol Ok)</button>
                <button onClick={() => handleGuess('cift')} disabled={!isPlaying || timeLeft===0} className="px-12 py-6 bg-emerald-500 text-white rounded-3xl font-black text-3xl shadow-xl hover:bg-emerald-400 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0">ÇİFT (Sağ Ok)</button>
            </div>
        </div>
    );
};

const BenzerKelimeler = ({ isPlaying }: { isPlaying: boolean }) => {
    const pairs = [
        ['EKMEK', 'ERKEK'], ['SABAH', 'SABUN'], ['KİTAP', 'HİTAP'], ['YAZAR', 'PAZAR'], 
        ['MASAL', 'YASAL'], ['KALEM', 'KELAM'], ['SİLGİ', 'BİLGİ'], ['ÇANTA', 'MANTA']
    ];
    
    const [wordList, setWordList] = useState<string[]>([]);
    const [targetWord, setTargetWord] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);

    const generateRound = () => {
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const target = pair[0];
        const distractor = pair[1];
        setTargetWord(target);
        
        const list = Array(24).fill(distractor);
        // Put the target in 3-4 random places
        const count = Math.floor(Math.random() * 2) + 3;
        for(let i=0; i<count; i++) {
            list[Math.floor(Math.random() * 24)] = target;
        }
        setWordList(list);
    };

    useEffect(() => {
        if(isPlaying && timeLeft === 60) {
            setScore(0);
            generateRound();
        }
    }, [isPlaying]);

    useEffect(() => {
        let t: NodeJS.Timeout;
        if(isPlaying && timeLeft > 0) {
            t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(t);
    }, [isPlaying, timeLeft]);

    const handleSelect = (w: string) => {
        if(!isPlaying || timeLeft === 0) return;
        if(w === targetWord) {
            setScore(prev => prev + 1);
            generateRound();
        } else {
            setScore(prev => Math.max(0, prev - 1));
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-2">
            <div className="bg-slate-800 text-white rounded-2xl flex items-center justify-between overflow-hidden shadow-lg">
                <div className="flex items-center flex-1">
                    <div className="bg-indigo-600 px-6 py-4 font-black uppercase tracking-wider text-sm">HEDEFİ BUL</div>
                    <div className="px-6 py-4 font-bold text-xl text-indigo-300">{targetWord}</div>
                </div>
                <div className="flex items-center">
                    <div className="px-6 py-4 text-sm font-medium text-slate-300">Skor: <span className="font-bold text-white text-lg">{score}</span></div>
                    <div className="bg-slate-900 px-6 py-4 font-mono font-bold text-xl">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
                </div>
            </div>

            <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-4 md:grid-cols-6 gap-4 content-start">
                {!isPlaying && (
                    <div className="col-span-full text-center py-20 text-slate-500 font-bold text-xl">
                        Başlatmak için yukarıdaki butona tıklayın
                    </div>
                )}
                {isPlaying && wordList.map((w, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSelect(w)}
                        className="bg-white border-2 border-slate-200 rounded-xl py-3 font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        {w}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const AttentionExercises = ({ state, actions }: any) => {
    const [activeEx, setActiveEx] = useState('menu');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const exercises = [
        { id: 'metin', name: 'Metin İçinde Arama', icon: <Search />, desc: 'İstenen kelimeyi bütün bir paragraf içinde hızlıca bulmaya çalışın.' },
        { id: 'kelime', name: 'Kelime Arama', icon: <Search />, desc: 'Harf karmaşası içinde istenen kelimeyi yakalayın.' },
        { id: 'tekcift', name: 'Tek mi Çift mi?', icon: <Hash />, desc: 'Ekranda beliren sayının tek mi çift mi olduğuna hızlıca karar verin.' },
        { id: 'benzer', name: 'Benzer Kelimeler', icon: <Target />, desc: 'Birbirine benzeyen kelimeler arasından doğru olanı seçin.' }
    ];

    if (activeEx === 'menu') {
        return (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 max-w-5xl mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                            <Target className="text-indigo-600" size={32} /> Dikkat ve Odaklanma
                        </h3>
                        <p className="text-slate-500 mt-2 font-medium">Algı sürenizi kısaltacak ve çevresel görüşünüzü kuvvetlendirecek egzersizler.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exercises.map(ex => (
                        <button key={ex.id} onClick={() => { setActiveEx(ex.id); setIsPlaying(false); }} className="p-6 text-left border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-2xl transition-all group flex gap-4 shadow-sm">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                {ex.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-700 mb-1">{ex.name}</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{ex.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const renderExercise = () => {
        switch(activeEx) {
            case 'metin': return <MetinArama isPlaying={isPlaying} />;
            case 'kelime': return <KelimeArama isPlaying={isPlaying} />;
            case 'tekcift': return <TekCift isPlaying={isPlaying} />;
            case 'benzer': return <BenzerKelimeler isPlaying={isPlaying} />;
            default: return null;
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 max-w-5xl mx-auto">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => { setActiveEx('menu'); setIsPlaying(false); setIsFullscreen(false); }} className="p-2 bg-white rounded-xl text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors shadow-sm">
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            {exercises.find(e => e.id === activeEx)?.icon}
                            {exercises.find(e => e.id === activeEx)?.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">{exercises.find(e => e.id === activeEx)?.desc}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setIsFullscreen(!isFullscreen)} className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm border border-slate-200">
                        {isFullscreen ? <><Minimize size={18}/> Küçült</> : <><Maximize size={18}/> Tam Ekran</>}
                    </button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300' : 'bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-600'}`}>
                        {isPlaying ? <><Pause size={18}/> Duraklat</> : <><Play size={18}/> Egzersizi Başlat</>}
                    </button>
                </div>
            </div>

            {isFullscreen ? (
                <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center p-4">
                    <div className="w-full flex justify-end gap-4 p-4 max-w-7xl mx-auto">
                        <button onClick={() => setIsPlaying(!isPlaying)} className={`px-6 py-3 rounded-xl text-lg font-bold flex items-center gap-2 transition-colors shadow-lg ${isPlaying ? 'bg-amber-400 text-amber-900' : 'bg-indigo-500 text-white'}`}>
                            {isPlaying ? <><Pause size={24}/> Duraklat</> : <><Play size={24}/> Başlat</>}
                        </button>
                        <button onClick={() => setIsFullscreen(false)} className="px-6 py-3 bg-white hover:bg-gray-100 text-slate-800 rounded-xl text-lg font-bold transition-colors shadow-lg flex items-center gap-2">
                            <Minimize size={24}/> Çıkış
                        </button>
                    </div>
                    <div className="w-full max-w-7xl mx-auto flex-1 p-4 bg-white rounded-3xl overflow-hidden shadow-2xl">
                        {renderExercise()}
                    </div>
                </div>
            ) : (
                <div className="w-full h-[600px] mx-auto rounded-3xl relative">
                    {renderExercise()}
                </div>
            )}
        </div>
    );
};
