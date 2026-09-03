const fs = require('fs');
const file = 'src/components/hizliokuma/ShadowReading.tsx';

const content = `import React, { useState, useEffect } from 'react';
import { Layers, Play, Pause, RotateCcw } from 'lucide-react';
import { testTexts } from './speedReadingTexts';

export const ShadowReading = ({ state, actions }: any) => {
    const [wordCount, setWordCount] = useState(2);
    const [speed, setSpeed] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [words, setWords] = useState<string[]>([]);
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);

    useEffect(() => {
        const text = testTexts[selectedTextIndex].text;
        setWords(text.split(' '));
        setCurrentIndex(-1);
        setIsRunning(false);
    }, [selectedTextIndex]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && currentIndex < words.length) {
            interval = setInterval(() => {
                setCurrentIndex(prev => {
                    const next = prev === -1 ? 0 : prev + wordCount;
                    if (next >= words.length) {
                        setIsRunning(false);
                        return prev; // keep at last
                    }
                    return next;
                });
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentIndex, words.length, speed, wordCount]);

    const handleReset = () => {
        setIsRunning(false);
        setCurrentIndex(-1);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 shrink-0">
                    <Layers className="text-indigo-600" /> Gölgeleme Çalışması
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <select value={selectedTextIndex} onChange={(e) => setSelectedTextIndex(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        {testTexts.map((t, i) => (
                            <option key={i} value={i}>{t.title}</option>
                        ))}
                    </select>
                    <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={1}>1 Kelime</option>
                        <option value={2}>2 Kelime</option>
                        <option value={3}>3 Kelime</option>
                        <option value={4}>4 Kelime</option>
                    </select>
                    <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={1500}>Yavaş (1.5s)</option>
                        <option value={1000}>Normal (1.0s)</option>
                        <option value={600}>Hızlı (0.6s)</option>
                        <option value={300}>Çok Hızlı (0.3s)</option>
                    </select>
                    <button 
                        onClick={() => setIsRunning(!isRunning)} 
                        className={\`px-4 py-2 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 \${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}\`}
                    >
                        {isRunning ? <><Pause size={16}/> Duraklat</> : <><Play size={16}/> {currentIndex > -1 ? 'Devam Et' : 'Başlat'}</>}
                    </button>
                    <button onClick={handleReset} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                        <RotateCcw size={16} /> Başa Dön
                    </button>
                </div>
            </div>

            <div className="bg-slate-100 p-8 rounded-2xl min-h-[400px] border border-gray-200 text-xl md:text-2xl font-medium leading-[2.5] select-none text-justify">
                {words.map((w, idx) => {
                    const isNotStarted = currentIndex === -1;
                    const isActive = isRunning && idx >= currentIndex && idx < currentIndex + wordCount;
                    const isPausedActive = !isRunning && currentIndex !== -1 && idx >= currentIndex && idx < currentIndex + wordCount;
                    
                    let className = "inline-block mr-1.5 px-1 rounded-md transition-all duration-200 ";
                    
                    if (isNotStarted) {
                        className += "text-slate-800"; // All normal before start
                    } else if (isActive || isPausedActive) {
                        className += "bg-white text-slate-900 font-bold shadow-sm z-10 scale-105"; // Highlighted
                    } else {
                        // The rest of the text is blurred out
                        className += "text-slate-400 blur-[3px] opacity-60";
                    }

                    return (
                        <span key={idx} className={className}>
                            {w}
                        </span>
                    );
                })}
            </div>
            
            <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
                <div className="mt-0.5"><Layers size={18} /></div>
                <p>Bu çalışma okuma metnindeki kelimeleri gruplandırarak vurgular. Vurgulanan kelime gruplarının orta noktasını görmeye gayret gösterin. Geri kalan metin odaklanmayı artırmak için flu/blurlu olarak görünür.</p>
            </div>
        </div>
    );
};
`;

fs.writeFileSync(file, content);
console.log('Patched ShadowReading.tsx');
