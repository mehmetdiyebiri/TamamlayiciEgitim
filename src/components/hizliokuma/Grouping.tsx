import React, { useState, useEffect, useRef } from 'react';
import { List, Play, Pause, RotateCcw, Settings, FileText, Info, Volume2, VolumeX } from 'lucide-react';
import { metronome } from '../../utils/metronome';
import { testTexts } from './speedReadingTexts';

export const Grouping = ({ state, actions }: any) => {
    const [textSource, setTextSource] = useState<'hazir' | 'ozel'>('hazir');
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const [customText, setCustomText] = useState('');
    const [level, setLevel] = useState<1 | 2 | 3 | 4>(2);
    const [wordCount, setWordCount] = useState<2 | 3 | 4 | 5>(3);
    const [mode, setMode] = useState<'silinmeden' | 'silinerek'>('silinmeden');
    const [useMetronome, setUseMetronome] = useState(false);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    // Reset when options change
    useEffect(() => {
        setIsPlaying(false);
        setCurrentIndex(-1);
    }, [textSource, selectedTextIndex, customText, level, wordCount, mode]);

    const activeText = textSource === 'hazir' ? testTexts[selectedTextIndex].text : (customText || 'Lütfen metin giriniz...');
    const words = activeText.split(/\s+/).filter(w => w.length > 0);
    
    const blocks: string[] = [];
    for (let i = 0; i < words.length; i += wordCount) {
        blocks.push(words.slice(i, i + wordCount).join(' '));
    }

    // WPM settings based on level
    const wpmMap = { 1: 150, 2: 250, 3: 400, 4: 600 };
    const currentWpm = wpmMap[level];
    
    // time per group in milliseconds
    const timePerGroup = (wordCount / currentWpm) * 60 * 1000;
    const totalTimeSeconds = (words.length / currentWpm) * 60;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentIndex < blocks.length) {
            interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentIndex(prev => {
                    if (prev + 1 >= blocks.length) {
                        setIsPlaying(false);
                        return prev + 1;
                    }
                    return prev + 1;
                });
            }, timePerGroup);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentIndex, blocks.length, timePerGroup, useMetronome]);

    const handlePlayPause = () => {
        if (currentIndex >= blocks.length) {
            setCurrentIndex(0);
        } else if (currentIndex === -1) {
            setCurrentIndex(0);
        }
        setIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentIndex(-1);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <List className="text-purple-600" /> Gruplama Çalışması
                    </h3>
                </div>
                
                <div className="bg-blue-50 text-blue-800 p-5 rounded-2xl text-sm font-medium leading-relaxed border border-blue-100 flex gap-4 items-start">
                    <Info className="shrink-0 mt-0.5" size={20} />
                    <p>
                        Bu sayfa okuma metinindeki kelimeleri gruplandırarak gölge oluşturulmuş alanı kaldırır. 
                        Hızlı okuma çalışmalarında kelimeler tek tek okunmamalıdır, gruplama çalışması her bakışta 
                        birden fazla kelime okuyabilme kabiliyetini geliştirmeye yöneliktir. Gölgeleme kalktıkça 
                        kelime gruplarının orta noktasını görmeye gayret gösterin. Araç çubuğunda bulunan seçenekleri 
                        değiştirdiğinizde metin okuma süresi ve hızı görüntülenir. Okuma hızınınızın çok üzerinde 
                        çalışmalar yapmayın.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Metin Kaynağı</label>
                        <div className="flex flex-col gap-2">
                            <select 
                                value={textSource} 
                                onChange={(e) => setTextSource(e.target.value as any)} 
                                className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                            >
                                <option value="hazir">Hazır Metin</option>
                                <option value="ozel">Kendi Metnini Yükle</option>
                            </select>
                            {textSource === 'hazir' && (
                                <select 
                                    value={selectedTextIndex} 
                                    onChange={(e) => setSelectedTextIndex(Number(e.target.value))} 
                                    className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                                >
                                    {testTexts.map((t, i) => (
                                        <option key={i} value={i}>{t.title}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Seviye (Hız)</label>
                        <select 
                            value={level} 
                            onChange={(e) => setLevel(Number(e.target.value) as any)} 
                            className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                        >
                            <option value={1}>Seviye 1 (150 Kelime/dk)</option>
                            <option value={2}>Seviye 2 (250 Kelime/dk)</option>
                            <option value={3}>Seviye 3 (400 Kelime/dk)</option>
                            <option value={4}>Seviye 4 (600 Kelime/dk)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Grup Boyutu</label>
                        <select 
                            value={wordCount} 
                            onChange={(e) => setWordCount(Number(e.target.value) as any)} 
                            className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                        >
                            <option value={2}>2 Kelime</option>
                            <option value={3}>3 Kelime</option>
                            <option value={4}>4 Kelime</option>
                            <option value={5}>5 Kelime</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Okuma Modu</label>
                        <select 
                            value={mode} 
                            onChange={(e) => setMode(e.target.value as any)} 
                            className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                        >
                            <option value="silinmeden">Silinmeden</option>
                            <option value="silinerek">Silinerek</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col justify-center bg-purple-50 rounded-xl p-3 border border-purple-100 text-center">
                        <div className="text-[10px] font-bold text-purple-600 uppercase mb-1">Tahmini Süre</div>
                        <div className="text-xl font-black text-purple-900">{totalTimeSeconds.toFixed(1)} sn</div>
                    </div>
                </div>

                {textSource === 'ozel' && (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Metniniz</label>
                        <textarea
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Çalışmak istediğiniz metni buraya yapıştırın..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-medium text-gray-700 outline-none focus:border-purple-500 min-h-[120px]"
                        />
                    </div>
                )}
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handlePlayPause}
                            className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                        >
                            {isPlaying ? <><Pause size={18}/> Duraklat</> : <><Play size={18}/> {currentIndex > -1 ? 'Devam Et' : 'Başlat'}</>}
                        </button>
                        <button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${useMetronome ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            Metronom {useMetronome ? <Volume2 size={18}/> : <VolumeX size={18}/>}
        </button>
                        <button 
                            onClick={handleReset}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                        >
                            <RotateCcw size={18}/> Başa Dön
                        </button>
                    </div>
                    <div className="text-sm font-bold text-gray-500">
                        İlerleme: {Math.min(currentIndex + 1, blocks.length)} / {blocks.length} Grup
                    </div>
                </div>

                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-lg md:text-2xl font-medium leading-loose flex flex-wrap gap-x-2 gap-y-6 min-h-[300px] content-start">
                    {blocks.map((block, i) => {
                        const isPast = i < currentIndex;
                        const isCurrent = i === currentIndex;
                        const isFuture = i > currentIndex;
                        const isNotStarted = currentIndex === -1;

                        let blockClass = "transition-all duration-200 px-2 py-1 rounded-lg ";
                        
                        if (isNotStarted) {
                            blockClass += "bg-transparent text-gray-800";
                        } else if (isCurrent) {
                            blockClass += "bg-white text-gray-900 font-bold shadow-sm z-10";
                        } else if (isPast) {
                            if (mode === 'silinerek') {
                                blockClass += "opacity-0 invisible"; // Completely hide
                            } else {
                                blockClass += "bg-transparent text-gray-800"; // Visible
                            }
                        } else if (isFuture) {
                            blockClass += "text-transparent bg-gray-600 select-none"; // Shadowed/Blurred
                        }

                        return (
                            <span key={i} className={blockClass}>
                                {block}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
