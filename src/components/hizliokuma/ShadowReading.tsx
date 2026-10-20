import React, { useState, useEffect } from 'react';
import { Layers, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { metronome } from '../../utils/metronome';
import { testTexts } from './speedReadingTexts';
import { formatBionicText } from '../../utils/bionicEngine';

export const ShadowReading = ({ state, actions }: any) => {
    const [wordCount, setWordCount] = useState(2);
    const [speed, setSpeed] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [words, setWords] = useState<string[]>([]);
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const [useMetronome, setUseMetronome] = useState(false);

    const [useBionic, setUseBionic] = useState(false);
    const [useAntiRegression, setUseAntiRegression] = useState(true);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const text = testTexts[selectedTextIndex].text;
        setWords(text.split(/\s+/).filter(w => w.length > 0));
        setCurrentIndex(-1);
        setIsRunning(false);
        setShowResult(false);
    }, [selectedTextIndex]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && currentIndex < words.length) {
            interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentIndex(prev => {
                    const next = prev === -1 ? 0 : prev + wordCount;
                    if (next >= words.length) {
                        setIsRunning(false);
                        setShowResult(true);
                        return words.length - 1;
                    }
                    return next;
                });
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentIndex, words.length, wordCount, speed]);

    const renderWord = (word: string, i: number) => {
        const isHighlighted = i >= currentIndex && i < currentIndex + wordCount;
        const isPassed = i < currentIndex;

        let styleClass = "transition-all duration-150 inline-block px-1 rounded ";
        
        if (isHighlighted) {
            styleClass += "bg-indigo-100 text-indigo-700 font-bold scale-105 ";
        } else if (isPassed && useAntiRegression) {
            styleClass += "opacity-5 filter blur-[2px] select-none ";
        } else {
            styleClass += "text-slate-400 ";
        }

        let content = <>{word}</>;
        if (useBionic) {
            const token = formatBionicText(word)[0];
            content = (
                <>
                    <strong className="font-extrabold text-slate-800">{token.prefix}</strong>
                    <span>{token.suffix}</span>
                </>
            );
            if(isHighlighted) {
                content = (
                    <>
                        <strong className="font-extrabold text-indigo-800">{token.prefix}</strong>
                        <span className="text-indigo-600">{token.suffix}</span>
                    </>
                );
            }
        }

        return (
            <span key={i} className={styleClass}>
                {content}{' '}
            </span>
        );
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Layers className="text-indigo-600" /> Gölgeleme & Gruplama
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">Karartılan metin akışında geri dönüşsüz, akıcı okuma pratiği yapın.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <select value={selectedTextIndex} onChange={(e) => setSelectedTextIndex(Number(e.target.value))} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 outline-none shadow-sm">
                        {testTexts.map((t, i) => (
                            <option key={i} value={i}>{t.title}</option>
                        ))}
                    </select>
                    <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 outline-none shadow-sm">
                        <option value={1}>1 Kelime/Grup</option>
                        <option value={2}>2 Kelime/Grup</option>
                        <option value={3}>3 Kelime/Grup</option>
                        <option value={4}>4 Kelime/Grup</option>
                    </select>
                    <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 outline-none shadow-sm">
                        <option value={1000}>1.00 Saniye</option>
                        <option value={750}>0.75 Saniye</option>
                        <option value={500}>0.50 Saniye</option>
                        <option value={250}>0.25 Saniye</option>
                        <option value={150}>0.15 Saniye</option>
                    </select>

                    <button onClick={() => setUseBionic(!useBionic)} className={`px-3 py-2 rounded-xl text-sm font-bold border transition-colors shadow-sm ${useBionic ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>Bionic ORP</button>
                    <button onClick={() => setUseAntiRegression(!useAntiRegression)} className={`px-3 py-2 rounded-xl text-sm font-bold border transition-colors shadow-sm ${useAntiRegression ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>Kaybolan Metin</button>

                    <button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={`px-3 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ${useMetronome ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white text-slate-600 border-slate-200'}`}>
                        {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                    </button>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 relative shadow-inner min-h-[400px] flex flex-col justify-between">
            {showResult && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-2">Egzersiz Tamamlandı!</h3>
                    <p className="text-slate-500 font-medium mb-6">Harika bir iş çıkardınız.</p>
                    <div className="bg-white px-8 py-6 rounded-2xl border border-slate-200 shadow-sm text-center mb-8">
                        <div className="text-sm font-bold text-slate-400 uppercase mb-2">Ortalama Okuma Hızınız</div>
                        <div className="text-4xl font-black text-indigo-600">{Math.round((60000 / speed) * wordCount)} <span className="text-lg text-slate-500 font-medium">kelime/dk</span></div>
                    </div>
                    <button onClick={() => { setShowResult(false); setCurrentIndex(-1); }} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                        Tekrar Başla
                    </button>
                </div>
            )}

                <div className="text-xl md:text-2xl leading-loose font-medium text-slate-800">
                    {words.map((w, i) => renderWord(w, i))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center gap-4">
                    <button onClick={() => { setIsRunning(!isRunning); setShowResult(false); if(currentIndex === words.length - 1) setCurrentIndex(-1); }} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-md">
                        {isRunning ? <><Pause size={20} /> Duraklat</> : <><Play size={20} /> Başlat</>}
                    </button>
                    <button onClick={() => { setIsRunning(false); setCurrentIndex(-1); setShowResult(false); }} className="bg-white text-slate-600 border border-slate-200 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                        <RotateCcw size={20} /> Başa Dön
                    </button>
                </div>
            </div>
        </div>
    );
};
