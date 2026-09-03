const fs = require('fs');
const file = 'src/components/hizliokuma/BlockReading.tsx';
let content = fs.readFileSync(file, 'utf-8');

// The file currently uses a hardcoded short text:
// const blockText = "Hızlı okuma becerisi göz kaslarının gelişmesi ile doğru orantılıdır. Bol bol pratik yaparak okuma hızınızı artırabilirsiniz.";
// We will replace it to use the texts from speedReadingTexts.ts

const replacement = `import React, { useState, useEffect } from 'react';
import { BookOpen, Play, CheckCircle2 } from 'lucide-react';
import { testTexts } from './speedReadingTexts';

export const BlockReading = ({ state, actions }: any) => {
    const [wordCount, setWordCount] = useState(2);
    const [speed, setSpeed] = useState(1000); // ms per block
    const [isRunning, setIsRunning] = useState(false);
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
    const [blocks, setBlocks] = useState<string[]>([]);
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
        
    useEffect(() => {
        const text = testTexts[selectedTextIndex].text;
        const words = text.split(' ');
        const newBlocks = [];
        for (let i = 0; i < words.length; i += wordCount) {
            newBlocks.push(words.slice(i, i + wordCount).join(' '));
        }
        setBlocks(newBlocks);
        setCurrentBlockIndex(0);
    }, [wordCount, selectedTextIndex]);

    useEffect(() => {
        let interval: any;
        if (isRunning && currentBlockIndex < blocks.length) {
            interval = setInterval(() => {
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

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-indigo-600" /> Blok Okuma Çalışması
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <select value={selectedTextIndex} onChange={(e) => setSelectedTextIndex(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        {testTexts.map((t, i) => (
                            <option key={i} value={i}>{t.title}</option>
                        ))}
                    </select>
                    <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={2}>2 Kelime</option>
                        <option value={3}>3 Kelime</option>
                        <option value={4}>4 Kelime</option>
                    </select>
                    <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={1500}>Kolay (1.5 sn)</option>
                        <option value={1000}>Orta (1.0 sn)</option>
                        <option value={500}>Zor (0.5 sn)</option>
                        <option value={300}>Çok Zor (0.3 sn)</option>
                    </select>
                </div>
            </div>

            <div className="h-[400px] flex flex-col items-center justify-center bg-slate-100 rounded-2xl border border-gray-200 relative overflow-hidden">
                {!isRunning && currentBlockIndex === 0 && (
                    <button onClick={() => setIsRunning(true)} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md">
                        <Play size={24} /> Çalışmayı Başlat
                    </button>
                )}
                
                {isRunning && (
                    <div className="flex flex-col items-center justify-center w-full px-8">
                        {/* We removed the small box above the main text entirely based on user request */}
                        <div className="text-3xl md:text-5xl font-bold text-slate-800 text-center px-10 py-8 leading-relaxed bg-white rounded-2xl shadow-xl w-full max-w-4xl min-h-[160px] flex items-center justify-center">
                            {blocks[currentBlockIndex]}
                        </div>
                    </div>
                )}

                {!isRunning && currentBlockIndex > 0 && currentBlockIndex === blocks.length - 1 && (
                    <div className="text-center space-y-4 bg-white p-8 rounded-2xl shadow-xl">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 size={40} />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800">Çalışma Tamamlandı!</h4>
                        <button onClick={() => { setCurrentBlockIndex(0); setIsRunning(true); }} className="text-indigo-600 font-bold hover:underline text-lg mt-4 inline-block">Tekrar Oyna</button>
                    </div>
                )}
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                <span>İlerleme: {currentBlockIndex + (isRunning ? 1 : 0)} / {blocks.length}</span>
                <div className="w-64 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-indigo-500 transition-all duration-300 rounded-full" style={{ width: \`\${(currentBlockIndex / Math.max(1, blocks.length - 1)) * 100}%\` }}></div>
                </div>
            </div>
        </div>
    );
};
`;

fs.writeFileSync(file, replacement);
console.log('Patched BlockReading.tsx');
