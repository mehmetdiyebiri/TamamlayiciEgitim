import React, { useState, useEffect } from 'react';
import { Eye, Play, Pause, Minimize, Maximize, MoveUpRight, Focus, Grid, Activity, ArrowRightLeft, ArrowUpDown, GripVertical, Waves, Target, CheckCircle2, Timer, Volume2, VolumeX } from 'lucide-react';
import { metronome } from '../../utils/metronome';
import { motion, AnimatePresence } from 'motion/react';

// 1. Yatay Zikzak
const YatayZikzak = ({ isPlaying, speed = 800, useMetronome = false }: { isPlaying: boolean, speed?: number, useMetronome?: boolean }) => {
    const [pathIndex, setPathIndex] = useState(0);
    const points = [
        { x: '10%', y: '10%' },
        { x: '90%', y: '10%' },
        { x: '10%', y: '20%' },
        { x: '90%', y: '20%' },
        { x: '10%', y: '30%' },
        { x: '90%', y: '30%' },
        { x: '10%', y: '40%' },
        { x: '90%', y: '40%' },
        { x: '10%', y: '50%' },
        { x: '90%', y: '50%' },
        { x: '10%', y: '60%' },
        { x: '90%', y: '60%' },
        { x: '10%', y: '70%' },
        { x: '90%', y: '70%' },
        { x: '10%', y: '80%' },
        { x: '90%', y: '80%' },
        { x: '10%', y: '90%' },
        { x: '90%', y: '90%' }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setPathIndex((prev) => (prev + 1) % points.length);
            }, speed);
                if (useMetronome) metronome.playClick();
        }
        return () => clearInterval(interval);
    }, [isPlaying, points.length]);

    return (
        <div className="w-full h-full relative bg-gray-400 rounded-2xl overflow-hidden p-8">
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                <polyline 
                    points={points.map(p => `${parseFloat(p.x)}%,${parseFloat(p.y)}%`).join(' ')} 
                    fill="none" stroke="#333" strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <motion.div
                className="absolute w-6 h-6 rounded-full bg-blue-600 shadow-md -ml-3 -mt-3"
                animate={{
                    left: points[pathIndex].x,
                    top: points[pathIndex].y
                }}
                transition={{ duration: 0.8, ease: "linear" }}
            />
        </div>
    );
};

// 2. Dikey Zikzak
const DikeyZikzak = ({ isPlaying, speed = 800, useMetronome = false }: { isPlaying: boolean, speed?: number, useMetronome?: boolean }) => {
    const [pathIndex, setPathIndex] = useState(0);
    const points = [
        { x: '10%', y: '10%' },
        { x: '10%', y: '90%' },
        { x: '20%', y: '10%' },
        { x: '20%', y: '90%' },
        { x: '30%', y: '10%' },
        { x: '30%', y: '90%' },
        { x: '40%', y: '10%' },
        { x: '40%', y: '90%' },
        { x: '50%', y: '10%' },
        { x: '50%', y: '90%' },
        { x: '60%', y: '10%' },
        { x: '60%', y: '90%' },
        { x: '70%', y: '10%' },
        { x: '70%', y: '90%' },
        { x: '80%', y: '10%' },
        { x: '80%', y: '90%' },
        { x: '90%', y: '10%' },
        { x: '90%', y: '90%' }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setPathIndex((prev) => (prev + 1) % points.length);
            }, speed);
                if (useMetronome) metronome.playClick();
        }
        return () => clearInterval(interval);
    }, [isPlaying, points.length]);

    return (
        <div className="w-full h-full relative bg-gray-400 rounded-2xl overflow-hidden p-8">
             <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                <polyline 
                    points={points.map(p => `${parseFloat(p.x)}%,${parseFloat(p.y)}%`).join(' ')} 
                    fill="none" stroke="#333" strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <motion.div
                className="absolute w-6 h-6 rounded-full bg-blue-600 shadow-md -ml-3 -mt-3"
                animate={{
                    left: points[pathIndex].x,
                    top: points[pathIndex].y
                }}
                transition={{ duration: 0.8, ease: "linear" }}
            />
        </div>
    );
};

// 3. Kolonlar
const Kolonlar = ({ isPlaying, speed = 800, useMetronome = false }: { isPlaying: boolean, speed?: number, useMetronome?: boolean }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const columns = 3;
    const rows = 10;
    const total = columns * rows;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % total);
            }, speed);
                if (useMetronome) metronome.playClick();
        }
        return () => clearInterval(interval);
    }, [isPlaying, total]);

    return (
        <div className="w-full h-full bg-white rounded-2xl p-12 grid grid-cols-3 gap-y-4 items-center justify-items-center">
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className={`text-sm md:text-lg font-bold transition-colors duration-100 ${i === activeIndex ? 'text-blue-600 scale-110' : 'text-gray-400'}`}>
                    M5 Bilişim
                </div>
            ))}
        </div>
    );
};

// 4. Ponte (Dairesel)
const Ponte = ({ isPlaying, speed = 800, useMetronome = false }: { isPlaying: boolean, speed?: number, useMetronome?: boolean }) => {
    const [pathIndex, setPathIndex] = useState(0);
    const totalPoints = 40;
    const points = Array.from({length: totalPoints}).map((_, i) => {
        const t = i / (totalPoints - 1);
        return {
            x: 50 + Math.sin(t * Math.PI * 4) * 30 + '%',
            y: 10 + t * 80 + '%'
        };
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setPathIndex((prev) => (prev + 1) % points.length);
            }, 200);
        }
        return () => clearInterval(interval);
    }, [isPlaying, points.length]);

    return (
        <div className="w-full h-full relative bg-gray-300 rounded-2xl overflow-hidden p-8">
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                <polyline 
                    points={points.map(p => `${parseFloat(p.x)}%,${parseFloat(p.y)}%`).join(' ')} 
                    fill="none" stroke="#333" strokeWidth="3" 
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <motion.div
                className="absolute w-6 h-6 rounded-full bg-blue-600 shadow-md -ml-3 -mt-3"
                animate={{
                    left: points[pathIndex].x,
                    top: points[pathIndex].y
                }}
                transition={{ duration: 0.2, ease: "linear" }}
            />
        </div>
    );
};

// 5. Büyüyen Şekiller
const BuyuyenSekiller = ({ isPlaying, shape, speed = 800, useMetronome = false }: { isPlaying: boolean, shape: 'kare' | 'elips' | 'dikdortgen' | 'daire' | 'altigen', speed?: number, useMetronome?: boolean }) => {
    return (
        <div className="w-full h-full relative bg-gray-300 rounded-2xl overflow-hidden flex items-center justify-center p-8">
            {Array.from({length: 10}).map((_, i) => {
                const scale = 1 - (i * 0.09);
                return (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0.5 }}
                        animate={isPlaying ? { 
                            borderColor: ['#475569', '#2563eb', '#475569'],
                            borderWidth: [2, 4, 2]
                        } : {}}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                        }}
                        className={`absolute border-2 border-slate-600 ${
                            shape === 'kare' ? 'aspect-square' :
                            shape === 'elips' ? 'w-full h-1/2 rounded-[100%]' :
                            shape === 'dikdortgen' ? 'w-full h-2/3' :
                            shape === 'daire' ? 'aspect-square rounded-full' :
                            shape === 'altigen' ? 'aspect-square' : ''
                        }`}
                        style={{
                            width: shape === 'kare' || shape === 'daire' || shape === 'altigen' ? `${scale * 90}%` : `${scale * 90}%`,
                            height: shape === 'dikdortgen' ? `${scale * 60}%` : undefined,
                            clipPath: shape === 'altigen' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined
                        }}
                    />
                );
            })}
        </div>
    );
}

// 6. 13 Nokta (Star)
const StarPoints = ({ isPlaying, speed = 800, useMetronome = false }: { isPlaying: boolean, speed?: number, useMetronome?: boolean }) => {
    const [activePoint, setActivePoint] = useState(0);
    const points = [
        { x: '50%', y: '50%' }, // Center
        { x: '50%', y: '10%' }, // Top
        { x: '85%', y: '25%' }, // Top Right
        { x: '90%', y: '50%' }, // Right
        { x: '85%', y: '75%' }, // Bottom Right
        { x: '50%', y: '90%' }, // Bottom
        { x: '15%', y: '75%' }, // Bottom Left
        { x: '10%', y: '50%' }, // Left
        { x: '15%', y: '25%' }, // Top Left
        { x: '35%', y: '15%' }, // Inner Top Left
        { x: '65%', y: '15%' }, // Inner Top Right
        { x: '65%', y: '85%' }, // Inner Bottom Right
        { x: '35%', y: '85%' }  // Inner Bottom Left
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setActivePoint((prev) => (prev + 1) % points.length);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, points.length]);

    return (
        <div className="w-full h-full relative bg-gray-300 rounded-2xl overflow-hidden p-8">
             <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                {points.map((p, i) => (
                    <line key={i} x1="50%" y1="50%" x2={p.x} y2={p.y} stroke="#333" strokeWidth="1" />
                ))}
            </svg>
            {points.map((p, i) => (
                <div key={i} className={`absolute w-4 h-4 rounded-full -ml-2 -mt-2 ${i === 0 ? 'bg-slate-800 w-6 h-6 -ml-3 -mt-3' : 'bg-slate-400'}`} style={{ left: p.x, top: p.y }}>
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">{i}</span>
                </div>
            ))}
            <motion.div
                className="absolute w-8 h-8 rounded-full bg-blue-600 shadow-md -ml-4 -mt-4 opacity-50"
                animate={{
                    left: points[activePoint].x,
                    top: points[activePoint].y
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        </div>
    );
};

export const EyeExercises = ({ state, actions }: any) => {
    const [activeEx, setActiveEx] = useState('menu');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const [shapeType, setShapeType] = useState<'kare' | 'elips' | 'dikdortgen' | 'daire' | 'altigen'>('kare');

    const [duration, setDuration] = useState(60);
    const [speed, setSpeed] = useState(800);
    const [useMetronome, setUseMetronome] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    useEffect(() => {
        setTimeLeft(duration);
        setIsPlaying(false);
    }, [duration, activeEx]);

    const exercises = [
        { id: 'yatay', name: 'Yatay Zikzak', icon: <ArrowRightLeft />, desc: 'Yatay eksende hareket eden nesneyi takip edin.' },
        { id: 'dikey', name: 'Dikey Zikzak', icon: <ArrowUpDown />, desc: 'Dikey eksende hareket eden nesneyi takip edin.' },
        { id: 'kolonlar', name: 'Kolonlar', icon: <GripVertical />, desc: 'Gözünüze ritmik hareketler kazandırır.' },
        { id: 'ponte', name: 'Ponte (Dairesel)', icon: <Waves />, desc: 'Dairesel dalgalar şeklinde hareket eden nesneyi izleyin.' },
        { id: 'sekiller', name: 'Büyüyen Şekiller', icon: <Target />, desc: 'Aktif görme alanınızı genişletmek için şekilleri kullanın.' },
        { id: '13nokta', name: '13 Nokta', icon: <Focus />, desc: 'Sıçrama hareketleriyle göz kaslarını çalıştırın.' }
    ];

    if (activeEx === 'menu') {
        return (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                    <Eye className="text-emerald-600" /> Göz Egzersizleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exercises.map(ex => (
                        <button key={ex.id} onClick={() => { setActiveEx(ex.id); setIsPlaying(true); }} className="p-6 text-left border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 rounded-2xl transition-all group flex flex-col gap-3 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                {ex.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 group-hover:text-emerald-700">{ex.name}</h4>
                                <p className="text-sm text-gray-500 font-medium mt-1">{ex.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const renderExercise = () => {
        switch(activeEx) {
            case 'yatay': return <YatayZikzak isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;
            case 'dikey': return <DikeyZikzak isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;
            case 'kolonlar': return <Kolonlar isPlaying={isPlaying} />;
            case 'ponte': return <Ponte isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;
            case 'sekiller': return <BuyuyenSekiller isPlaying={isPlaying} shape={shapeType} />;
            case '13nokta': return <StarPoints isPlaying={isPlaying} />;
            default: return null;
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-100 pb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                        {exercises.find(e => e.id === activeEx)?.icon}
                    </span>
                    {exercises.find(e => e.id === activeEx)?.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                    {activeEx === 'sekiller' && (
                        <select 
                            value={shapeType} 
                            onChange={(e: any) => setShapeType(e.target.value)}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500"
                        >
                            <option value="kare">Kare</option>
                            <option value="elips">Elips</option>
                            <option value="dikdortgen">Dikdörtgen</option>
                            <option value="daire">Daire</option>
                            <option value="altigen">Altıgen</option>
                        </select>
                    )}
                    <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl outline-none font-bold text-sm">
                        <option value={1200}>Yavaş (1.2s)</option>
                        <option value={800}>Normal (0.8s)</option>
                        <option value={600}>Hızlı (0.6s)</option>
                        <option value={400}>Çok Hızlı (0.4s)</option>
                    </select>
                    <button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={`px-3 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ${useMetronome ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                    </button>
                    {activeEx !== 'menu' && (
                        <>
                            <select 
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500"
                            >
                                <option value={30}>30 Saniye</option>
                                <option value={60}>1 Dakika</option>
                                <option value={120}>2 Dakika</option>
                                <option value={300}>5 Dakika</option>
                            </select>
                            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold font-mono">
                                <Timer size={18} />
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className={`relative bg-slate-50 border border-gray-200 rounded-2xl shadow-inner transition-all ${isFullscreen ? 'fixed inset-4 z-50 bg-white' : 'h-[500px]'}`}>
                {renderExercise()}
                {timeLeft === 0 && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-800 mb-2">Egzersiz Tamamlandı!</h3>
                        <p className="text-gray-500 font-medium mb-8">Göz kaslarınızı güçlendirdiniz.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setActiveEx('menu')} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                                Menüye Dön
                            </button>
                            <button onClick={() => setTimeLeft(duration)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">
                                Tekrar Başla
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center pt-4">
                <button onClick={() => { setActiveEx('menu'); setIsPlaying(false); }} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">
                    ← Geri Dön
                </button>
                <div className="flex gap-3">
                    <button onClick={() => setIsFullscreen(!isFullscreen)} className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold flex items-center gap-2">
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                        <span className="hidden sm:inline">{isFullscreen ? 'Küçült' : 'Tam Ekran'}</span>
                    </button>
                    <button onClick={() => setIsPlaying(!isPlaying)} disabled={timeLeft === 0} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md ${timeLeft === 0 ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>
                        {isPlaying ? <><Pause size={20} /> Duraklat</> : <><Play size={20} /> Başlat</>}
                    </button>
                </div>
            </div>
        </div>
    );
};
