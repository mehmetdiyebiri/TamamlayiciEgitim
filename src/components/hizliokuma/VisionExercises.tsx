import React, { useState, useEffect } from 'react';
import { Eye, Play, Pause, Maximize, Minimize, MousePointer2, Grid3X3, Hourglass, BoxSelect, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Karel = ({ isPlaying }: { isPlaying: boolean }) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [grid, setGrid] = useState<string[][]>([]);
    const [markedPositions, setMarkedPositions] = useState<{r:number, c:number}[]>([]);
    const [same, setSame] = useState(false);
    const size = 9; // Changed to 9x9 for better mobile/desktop fit
    
    // Adaptive feedback
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const generateGrid = () => {
        const newGrid = [];
        for(let i=0; i<size; i++) {
            const row = [];
            for(let j=0; j<size; j++) {
                row.push(letters[Math.floor(Math.random() * letters.length)]);
            }
            newGrid.push(row);
        }
        
        // Pick two random positions at the edges
        const p1 = { r: Math.random()>0.5 ? 0 : size-1, c: Math.floor(Math.random()*size) };
        const p2 = { r: Math.floor(Math.random()*size), c: Math.random()>0.5 ? 0 : size-1 };
        
        setMarkedPositions([p1, p2]);
        const isSame = Math.random() > 0.5;
        setSame(isSame);

        if(isSame) {
            newGrid[p2.r][p2.c] = newGrid[p1.r][p1.c];
        } else {
            let diffLetter = letters[Math.floor(Math.random() * letters.length)];
            while(diffLetter === newGrid[p1.r][p1.c]) {
                diffLetter = letters[Math.floor(Math.random() * letters.length)];
            }
            newGrid[p2.r][p2.c] = diffLetter;
        }
        setGrid(newGrid);
        setFeedback(null);
    };

    useEffect(() => {
        if(isPlaying && grid.length === 0) generateGrid();
    }, [isPlaying]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(!isPlaying || grid.length === 0 || feedback !== null) return;
            if(e.key === 'ArrowLeft') handleGuess(true);
            if(e.key === 'ArrowRight') handleGuess(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, grid, feedback, same]);

    const handleGuess = (guessSame: boolean) => {
        const isCorrect = guessSame === same;
        setFeedback(isCorrect ? 'correct' : 'wrong');
        setTimeout(() => {
            if (isPlaying) generateGrid();
        }, 500);
    };

    return (
        <div className="w-full h-full bg-slate-50 flex items-center justify-center relative p-8">
            {!isPlaying ? (
                <div className="text-center font-bold text-slate-500 text-xl">Başlatmak için yukarıdaki butona tıklayın</div>
            ) : (
                <div className="flex flex-col items-center gap-8">
                    <div className="grid bg-white p-4 rounded-xl shadow-lg border border-slate-200" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`}}>
                        {grid.map((row, r) => row.map((char, c) => {
                            const isCenter = r === Math.floor(size/2) && c === Math.floor(size/2);
                            const isMarked = markedPositions.some(p => p.r === r && p.c === c);
                            return (
                                <div key={`${r}-${c}`} className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold sm:text-lg rounded m-0.5
                                    ${isCenter ? 'bg-rose-500 text-white shadow-md' : 
                                      isMarked ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400' : 'text-slate-300'}`}>
                                    {isCenter ? '+' : (isMarked ? char : char)}
                                </div>
                            );
                        }))}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => handleGuess(true)} className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-md hover:bg-emerald-400">AYNI (Sol Ok)</button>
                        <button onClick={() => handleGuess(false)} className="px-8 py-3 bg-rose-500 text-white rounded-xl font-bold shadow-md hover:bg-rose-400">FARKLI (Sağ Ok)</button>
                    </div>

                    {feedback && (
                        <div className={`absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold text-white shadow-lg ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {feedback === 'correct' ? 'Doğru!' : 'Yanlış!'}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const KumSaati = ({ isPlaying }: { isPlaying: boolean }) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [level, setLevel] = useState(1);
    const [leftChar, setLeftChar] = useState('');
    const [rightChar, setRightChar] = useState('');
    const [step, setStep] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(s => {
                    const nextStep = (s + 1) % 6; // 0 to 5 width levels
                    if(nextStep === 0) {
                        setLeftChar(letters[Math.floor(Math.random() * letters.length)]);
                        setRightChar(letters[Math.floor(Math.random() * letters.length)]);
                    }
                    return nextStep;
                });
            }, 1000 - (level * 100)); // speed increases with level
        }
        return () => clearInterval(interval);
    }, [isPlaying, level]);

    return (
        <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center relative p-8">
            <div className="absolute top-4 left-4 bg-slate-700 text-white px-4 py-2 rounded-lg font-bold flex gap-2 items-center">
                <span>Hız Seviyesi: {level}</span>
                <input type="range" min="1" max="5" value={level} onChange={e => setLevel(Number(e.target.value))} className="w-24" />
            </div>

            <div className="w-4 h-4 bg-rose-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
            
            <AnimatePresence>
                {isPlaying && (
                    <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 flex justify-between px-8"
                        style={{ width: `${30 + (step * 12)}%` }} // Width gradually increases from 30% to 90%
                        transition={{ duration: 0.2 }}
                    >
                        <span className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg">{leftChar}</span>
                        <span className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg">{rightChar}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AcilanNesneler = ({ isPlaying }: { isPlaying: boolean }) => {
    const emojis = ['🍎','🚗','⚽️','📱','📚','🎸','🎨','🌍','💼','🕶️','📸','🧩','🕹️','🏆','💡','🍔'];
    const [visibleItems, setVisibleItems] = useState<string[]>([]);
    
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                const count = Math.floor(Math.random() * 4) + 3; // 3 to 6
                const selected = [];
                for(let i=0; i<count; i++) {
                    selected.push(emojis[Math.floor(Math.random() * emojis.length)]);
                }
                setVisibleItems(selected);
                setTimeout(() => setVisibleItems([]), 800);
            }, 2000);
        } else {
            setVisibleItems([]);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center relative overflow-hidden">
            <div className="w-full bg-slate-300/30 h-32 absolute top-1/2 -translate-y-1/2 flex items-center justify-center px-8 overflow-hidden">
                <AnimatePresence>
                    {visibleItems.length > 0 && (
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl"
                        >
                            {visibleItems.map((item, idx) => (
                                <span key={idx} className="text-4xl md:text-5xl">{item}</span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const VisionExercises = ({ state, actions }: any) => {
    const [activeEx, setActiveEx] = useState('menu');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const exercises = [
        { id: 'karel', name: 'Karel (Kare Görme Alanı)', icon: <Grid3X3 />, desc: 'Merkeze odaklanıp köşelerdeki harflerin aynı olup olmadığını (SAĞ/SOL ok tuşları ile) test edin.' },
        { id: 'kumsaati', name: 'Kum Saati', icon: <Hourglass />, desc: 'Giderek uzaklaşan harfleri merkezdeki noktadan gözünüzü ayırmadan yakalayın.' },
        { id: 'acilan', name: 'Açılan Nesneler (Yatay)', icon: <BoxSelect />, desc: 'Yatay eksende aniden beliren nesne grubunu çevresel görüşünüzle algılayın.' }
    ];

    if (activeEx === 'menu') {
        return (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 max-w-5xl mx-auto">
                <div>
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <Maximize className="text-indigo-600" size={32} /> Görme Alanı Egzersizleri
                    </h3>
                    <p className="text-slate-500 mt-2 font-medium">Blok okuma yapabilmek için gözün aktif görme alanını genişletmek gerekir.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {exercises.map(ex => (
                        <button key={ex.id} onClick={() => { setActiveEx(ex.id); setIsPlaying(false); }} className="p-6 text-left border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-2xl transition-all group flex flex-col gap-4 shadow-sm">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                {ex.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-700 mb-2">{ex.name}</h4>
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
            case 'karel': return <Karel isPlaying={isPlaying} />;
            case 'kumsaati': return <KumSaati isPlaying={isPlaying} />;
            case 'acilan': return <AcilanNesneler isPlaying={isPlaying} />;
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
                    <div className="w-full max-w-7xl mx-auto flex-1 bg-white rounded-3xl overflow-hidden shadow-2xl">
                        {renderExercise()}
                    </div>
                </div>
            ) : (
                <div className="w-full h-[600px] mx-auto rounded-3xl relative overflow-hidden border border-slate-200 shadow-sm">
                    {renderExercise()}
                </div>
            )}
        </div>
    );
};
