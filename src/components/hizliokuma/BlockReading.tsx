import React, { useState, useEffect } from 'react';
import { BookOpen, Play, CheckCircle2, Volume2, VolumeX, Pause, RotateCcw } from 'lucide-react';
import { metronome } from '../../utils/metronome';
import { testTexts } from './speedReadingTexts';
import { formatBionicText } from '../../utils/bionicEngine';

export const BlockReading = ({ state, actions }: any) => {
    const [wordCount, setWordCount] = useState(2);
    const [speed, setSpeed] = useState(1000); 
    const [isRunning, setIsRunning] = useState(false);
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
    const [blocks, setBlocks] = useState<string[]>([]);
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const [useMetronome, setUseMetronome] = useState(false);
    
    const [useBionic, setUseBionic] = useState(false);
    const [useAntiRegression, setUseAntiRegression] = useState(false);
    
    // Adaptive Logic
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [consecutiveWrong, setConsecutiveWrong] = useState(0);

    useEffect(() => {
        const text = testTexts[selectedTextIndex].text;
        const textWords = text.split(/\s+/).filter(w => w.length > 0);
        const newBlocks = [];
        for (let i = 0; i < textWords.length; i += wordCount) {
            newBlocks.push(textWords.slice(i, i + wordCount).join(' '));
        }
        setBlocks(newBlocks);
        setCurrentBlockIndex(0);
    }, [wordCount, selectedTextIndex]);

    useEffect(() => {
        let interval: any;
        if (isRunning && currentBlockIndex < blocks.length) {
            interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentBlockIndex(prev => {
                    if (prev + 1 >= blocks.length) {
                        setIsRunning(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentBlockIndex, blocks.length, speed]);

    const renderBlock = (blockStr: string) => {
        if (useBionic) {
            const tokens = formatBionicText(blockStr);
            return (
                <div className="flex flex-wrap gap-2 justify-center">
                    {tokens.map((token, idx) => (
                        <span key={idx}>
                            <strong className="font-extrabold text-indigo-600">{token.prefix}</strong>
                            <span>{token.suffix}</span>
                        </span>
                    ))}
                </div>
            );
        }
        return blockStr;
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen className="text-indigo-600" /> Blok Okuma 
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">Kelimeleri grup halinde okuyun. İç sesinizi susturmak için metronom kullanın.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <select value={selectedTextIndex} onChange={(e) => setSelectedTextIndex(Number(e.target.value))} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 outline-none shadow-sm">
                        {testTexts.map((t, i) => (
                            <option key={i} value={i}>{t.title}</option>
                        ))}
                    </select>
                    <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 outline-none shadow-sm">
                        <option value={2}>2 Kelime/Blok</option>
                        <option value={3}>3 Kelime/Blok</option>
                        <option value={4}>4 Kelime/Blok</option>
                    </select>
                    <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 outline-none shadow-sm">
                        <option value={1000}>1 Saniye</option>
                        <option value={750}>0.75 Saniye</option>
                        <option value={500}>0.50 Saniye</option>
                        <option value={250}>0.25 Saniye</option>
                    </select>
                    
                    <button onClick={() => setUseBionic(!useBionic)} className={`px-3 py-2 rounded-xl text-sm font-bold border transition-colors shadow-sm ${useBionic ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>Bionic ORP</button>
                    <button onClick={() => setUseAntiRegression(!useAntiRegression)} className={`px-3 py-2 rounded-xl text-sm font-bold border transition-colors shadow-sm ${useAntiRegression ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>Kaybolan Metin</button>
                    <button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={`px-3 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ${useMetronome ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white text-slate-600 border-slate-200'}`}>
                        {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                    </button>
                </div>
            </div>

            <div className="h-[400px] flex flex-col items-center justify-center bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden">
                {!isRunning && currentBlockIndex === 0 && (
                    <button onClick={() => setIsRunning(true)} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-indigo-700 transition-colors shadow-lg active:scale-95">
                        <Play size={24} /> Çalışmayı Başlat
                    </button>
                )}
                
                {isRunning && (
                    <div className="flex flex-col items-center justify-center w-full px-4">
                        <div className={`text-4xl md:text-5xl font-bold text-slate-800 text-center px-10 py-10 leading-relaxed bg-white rounded-3xl shadow-xl w-full max-w-3xl flex items-center justify-center transition-all ${useAntiRegression ? 'animate-pulse' : ''}`}>
                            {blocks[currentBlockIndex] && renderBlock(blocks[currentBlockIndex])}
                        </div>
                    </div>
                )}

                {isRunning && (
                    <button onClick={() => setIsRunning(false)} className="absolute bottom-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-md">
                        <Pause size={18} /> Duraklat
                    </button>
                )}

                {!isRunning && currentBlockIndex > 0 && currentBlockIndex >= blocks.length - 1 && (
                    <div className="text-center space-y-4 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 size={40} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-800">Çalışma Tamamlandı!</h4>
                        <button onClick={() => { setCurrentBlockIndex(0); setIsRunning(true); }} className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-100 transition-colors inline-flex items-center gap-2 mt-4">
                            <RotateCcw size={18} /> Tekrar Oyna
                        </button>
                    </div>
                )}
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                <span>İlerleme: {Math.min(currentBlockIndex + (isRunning ? 1 : 0), blocks.length)} / {blocks.length}</span>
                <div className="w-64 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200">
                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${(currentBlockIndex / Math.max(1, blocks.length - 1)) * 100}%` }}></div>
                </div>
            </div>
        </div>
    );
};
