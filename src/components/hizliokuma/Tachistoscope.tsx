import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Maximize2, Minimize2, Check, X, RotateCcw } from 'lucide-react';
import { metronome } from '../../utils/metronome';

const wordsList = ["Kitap", "Gelecek", "Odaklanma", "Gözlem", "Başarı", "Motive", "Hız", "Kelime", "Yetenek", "Zeka"];

export const Tachistoscope = ({ state, actions }: any) => {
    const [speed, setSpeed] = useState(150); // Start at 150ms per specs
    const [status, setStatus] = useState<'idle' | 'flashing' | 'input' | 'result'>('idle');
    const [currentWord, setCurrentWord] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<boolean | null>(null);
    const [useMetronome, setUseMetronome] = useState(false);
    
    // Adaptive Logic
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [consecutiveWrong, setConsecutiveWrong] = useState(0);

    const startFlash = () => {
        const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
        setCurrentWord(randomWord);
        setStatus('flashing');
        
        setTimeout(() => {
            setStatus('input');
            setInputValue('');
        }, speed);
    };

    const checkAnswer = () => {
        if(!inputValue.trim()) return;
        const isCorrect = inputValue.toLowerCase().trim() === currentWord.toLowerCase().trim();
        setResult(isCorrect);
        setStatus('result');

        // Adaptive Algorithm
        if (isCorrect) {
            const nextCorrect = consecutiveCorrect + 1;
            setConsecutiveCorrect(nextCorrect);
            setConsecutiveWrong(0);
            if (nextCorrect >= 3) {
                setSpeed(prev => Math.max(40, prev * 0.95)); // %5 faster
                setConsecutiveCorrect(0);
            }
        } else {
            const nextWrong = consecutiveWrong + 1;
            setConsecutiveWrong(nextWrong);
            setConsecutiveCorrect(0);
            if (nextWrong >= 2) {
                setSpeed(prev => Math.min(1000, prev * 1.05)); // %5 slower
                setConsecutiveWrong(0);
            }
        }
    };

    return (
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-lg space-y-8 max-w-4xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-black text-slate-800">Takistoskop</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                        Kelimeyi anlık flaş patlamasıyla görüp hafızadan yazma egzersizi. Başlangıçta 150ms hızla başlayıp, başarınıza göre %5 oranında adaptif olarak hızlanır veya yavaşlar.
                    </p>
                </div>
                <div className="flex flex-col gap-3 min-w-[200px]">
                    <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                        <span className="text-slate-500 font-bold text-sm">Güncel Hız:</span>
                        <span className="text-indigo-600 font-black">{Math.round(speed)} ms</span>
                    </div>
                    <button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} 
                            className={`px-4 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-sm ${useMetronome ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                        Metronom {useMetronome ? <Volume2 size={18}/> : <VolumeX size={18}/>}
                    </button>
                </div>
            </div>

            <div className="h-80 flex flex-col items-center justify-center bg-slate-800 rounded-3xl relative overflow-hidden shadow-inner">
                {status === 'idle' && (
                    <button onClick={startFlash} className="bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-400 transition-all shadow-lg active:scale-95 text-lg">
                        <Play size={24} /> Egzersizi Başlat
                    </button>
                )}
                
                {status === 'flashing' && (
                    <div className="text-6xl font-black text-white">{currentWord}</div>
                )}
                
                {status === 'input' && (
                    <div className="flex flex-col items-center gap-6 w-full max-w-md px-6 z-10">
                        <p className="font-bold text-slate-300 text-lg">Gördüğünüz kelimeyi yazın:</p>
                        <input 
                            type="text" 
                            autoFocus
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                            className="w-full text-center text-3xl font-black p-4 border-none rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/50 bg-white text-slate-800 shadow-xl"
                        />
                        <button onClick={checkAnswer} className="w-full bg-indigo-500 text-white font-bold py-4 rounded-2xl hover:bg-indigo-400 transition-all text-lg shadow-lg">Kontrol Et (Enter)</button>
                    </div>
                )}

                {status === 'result' && (
                    <div className="flex flex-col items-center gap-6 z-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                        {result ? (
                            <div className="flex items-center gap-3 text-emerald-400 font-black text-3xl">
                                <Check size={40} /> Doğru!
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 text-rose-400 font-black text-3xl mb-3">
                                    <X size={40} /> Yanlış!
                                </div>
                                <div className="text-slate-300 font-medium text-lg">Doğru kelime: <span className="font-black text-white">{currentWord}</span></div>
                            </div>
                        )}
                        <button onClick={startFlash} className="bg-white text-slate-800 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors">
                            <RotateCcw size={20} /> Sonraki Kelime (Enter)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
